// Pull space imagery + video for the Kairo world from Pexels.
//
// Curated, not random: each slot below names the chapter it serves and the
// search that fits it, and every candidate is checked against its title slug
// before download — a "space" search will happily return a lit candle or a
// person in a hoodie, and a wrong clip in a cinematic scene is worse than none.
//
//   node scripts/fetch-assets.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const OUT_IMG = path.join(ROOT, 'public', 'space')
const OUT_VID = path.join(ROOT, 'public', 'video')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

function readKey() {
  const envPaths = [
    path.join(ROOT, '.env'),
    'C:/Users/sathy/OpenMontage/.env',
  ]
  for (const p of envPaths) {
    try {
      const line = fs.readFileSync(p, 'utf8').split(/\r?\n/).find((l) => l.startsWith('PEXELS_API_KEY='))
      if (line) return line.split('=')[1].trim()
    } catch { /* try next */ }
  }
  throw new Error('PEXELS_API_KEY not found')
}

const KEY = readKey()

// Only accept a result whose own title mentions the subject, and never one that
// mentions a known off-subject noun. Search relevance alone is not enough.
const REQUIRE = ['space', 'galaxy', 'nebula', 'star', 'cosmos', 'universe', 'planet',
                 'earth', 'moon', 'astronomy', 'milky', 'orbit', 'sky', 'night']
const REJECT = ['woman', 'man', 'people', 'person', 'child', 'party', 'food', 'office',
                'wedding', 'dog', 'cat', 'car', 'building', 'city', 'beach', 'flower',
                'candle', 'christmas', 'bokeh light']

const slugOf = (url) => new URL(url).pathname.toLowerCase()
const relevant = (url) => {
  const s = slugOf(url)
  if (REJECT.some((b) => s.includes(b))) return false
  return REQUIRE.some((g) => s.includes(g))
}

const PHOTOS = [
  { name: 'deep-field',  q: 'deep space galaxy stars' },
  { name: 'nebula',      q: 'nebula space colorful' },
  { name: 'milky-way',   q: 'milky way night sky stars' },
  { name: 'planet',      q: 'planet space dark' },
  { name: 'earth-limb',  q: 'earth from space horizon' },
]

const VIDEOS = [
  { name: 'starfield-drift', q: 'stars space night sky timelapse' },
  { name: 'nebula-slow',     q: 'galaxy space nebula' },
]

async function api(url) {
  const r = await fetch(url, { headers: { Authorization: KEY, 'User-Agent': UA } })
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
  return r.json()
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!r.ok) throw new Error(`download ${r.status}`)
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()))
  return fs.statSync(dest).size
}

async function main() {
  fs.mkdirSync(OUT_IMG, { recursive: true })
  fs.mkdirSync(OUT_VID, { recursive: true })
  const manifest = { photos: [], videos: [] }

  for (const slot of PHOTOS) {
    const j = await api(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(slot.q)}&per_page=30&orientation=landscape`
    )
    const pick = (j.photos || []).find((p) => relevant(p.url))
    if (!pick) { console.log(`  ${slot.name}: no relevant photo`); continue }
    const dest = path.join(OUT_IMG, `${slot.name}.jpg`)
    const kb = Math.round((await download(pick.src.large2x, dest)) / 1024)
    console.log(`  ${slot.name}: ${kb}KB  <- ${slugOf(pick.url).replace('/photo/', '').slice(0, 44)}`)
    manifest.photos.push({ slot: slot.name, file: `space/${slot.name}.jpg`, credit: pick.photographer, url: pick.url })
  }

  for (const slot of VIDEOS) {
    const j = await api(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(slot.q)}&per_page=30&orientation=landscape`
    )
    const pick = (j.videos || []).find((v) => relevant(v.url) && v.duration >= 8)
    if (!pick) { console.log(`  ${slot.name}: no relevant video`); continue }
    // ~1080p: big enough to fill a hero, small enough to autoplay politely.
    const file =
      pick.video_files.filter((f) => f.height && f.height <= 1080).sort((a, b) => b.height - a.height)[0] ??
      pick.video_files[0]
    const dest = path.join(OUT_VID, `${slot.name}.mp4`)
    const mb = ((await download(file.link, dest)) / 1048576).toFixed(1)
    console.log(`  ${slot.name}: ${mb}MB ${file.width}x${file.height} <- ${slugOf(pick.url).replace('/video/', '').slice(0, 40)}`)
    manifest.videos.push({ slot: slot.name, file: `video/${slot.name}.mp4`, credit: pick.user?.name, url: pick.url })
  }

  fs.writeFileSync(path.join(ROOT, 'public', 'assets-manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`\n${manifest.photos.length} photos, ${manifest.videos.length} videos — Pexels License, free for commercial use`)
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
