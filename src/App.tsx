import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollEngine } from './motion/useScrollEngine'
import { ArrivalScene } from './components/scenes/ArrivalScene'
import {
  VisionScene, SystemsScene, TechnologyScene,
  EducationScene, IndustriesScene, FutureScene, ContactScene,
} from './components/scenes/Chapters'
import { TestingScene } from './components/scenes/TestingScene'

const CHAPTERS = [
  { id: 'arrival', n: '01' },
  { id: 'vision', n: '02' },
  { id: 'systems', n: '03' },
  { id: 'technology', n: '04' },
  { id: 'education', n: '05' },
  { id: 'industries', n: '06' },
  { id: 'future', n: '07' },
  { id: 'testing', n: '08' },
  { id: 'contact', n: '09' },
]

export default function App() {
  useScrollEngine()

  return (
    <>
      <Loader />
      <Nav />
      <ChapterIndicator />
      <main>
        <ArrivalScene />
        <VisionScene />
        <SystemsScene />
        <TechnologyScene />
        <EducationScene />
        <IndustriesScene />
        <FutureScene />
        <TestingScene />
        <ContactScene />
      </main>
    </>
  )
}

/**
 * Loading sequence. Deliberately short and self-terminating — a loader that
 * outlives the page it is covering is worse than no loader. It counts to 100
 * over ~1.1s and leaves, regardless of what else is still streaming in.
 */
function Loader() {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setGone(true); return }
    const obj = { v: 0 }
    const tl = gsap.timeline()
    tl.to(obj, {
      v: 100, duration: 1.1, ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(obj.v)),
    })
    tl.to(ref.current, {
      opacity: 0, duration: 0.6, ease: 'power2.inOut',
      onComplete: () => setGone(true),
    })
    return () => { tl.kill() }
  }, [])

  if (gone) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', inset: 0, zIndex: 8000, background: 'var(--void)',
        display: 'grid', placeContent: 'center', justifyItems: 'center', gap: 22,
      }}
    >
      <img src="/kairo-mark-white.png" alt="" width={54} height={54} style={{ opacity: 0.9 }} />
      <div className="label" style={{ fontSize: 10 }}>Kairo Industries</div>
      <div style={{ width: 180, height: 1, background: 'rgba(247,245,255,.12)' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--violet-soft)' }} />
      </div>
      <div className="label mono-num" style={{ fontSize: 9, color: 'var(--faint)' }}>
        Initializing experience — {String(pct).padStart(3, '0')}
      </div>
    </div>
  )
}

function Nav() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Glass only once you've left the hero — over the hero it should be invisible.
    const st = ScrollTrigger.create({
      start: 'top -80',
      onToggle: (self) => {
        gsap.to(el, {
          backgroundColor: self.isActive ? 'rgba(5,5,7,.6)' : 'rgba(5,5,7,0)',
          backdropFilter: self.isActive ? 'blur(16px)' : 'blur(0px)',
          borderBottomColor: self.isActive ? 'rgba(247,245,255,.08)' : 'rgba(247,245,255,0)',
          duration: 0.45, ease: 'power2.out',
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <nav
      ref={ref}
      style={{
        position: 'fixed', inset: '0 0 auto 0', zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px max(20px, 4vw)',
        borderBottom: '1px solid rgba(247,245,255,0)',
      }}
    >
      <a href="#arrival" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img src="/kairo-mark-white.png" alt="" width={24} height={24} style={{ display: 'block' }} />
        <span className="label" style={{ color: 'var(--white)', letterSpacing: '.3em', fontSize: 10 }}>Kairo</span>
      </a>
      {/* Five links don't fit a phone (they ran under the logo and off the
          edge), so on small screens only the tester call stays: that's the
          one a student arriving from a link actually needs. */}
      <div className="nav-links" style={{ display: 'flex', gap: 24 }}>
        {[['Systems', 'systems'], ['Technology', 'technology'], ['Education', 'education'], ['Test Kyno', 'testing'], ['Contact', 'contact']].map(
          ([label, id]) => (
            <a key={id} href={`#${id}`} className={id === 'testing' ? 'label nav-cta' : 'label'}
              style={{ color: 'var(--white)', opacity: id === 'testing' ? 0.9 : 0.55, textDecoration: 'none', fontSize: 9.5 }}>
              {label}
            </a>
          )
        )}
      </div>
    </nav>
  )
}

/** Chapter rail. Present, never loud — the current number simply lights. */
function ChapterIndicator() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const triggers = CHAPTERS.map((c, i) => {
      const el = document.getElementById(c.id)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => self.isActive && setActive(i),
      })
    })
    return () => triggers.forEach((t) => t?.kill())
  }, [])

  return (
    <div
      aria-hidden="true"
      className="chapter-rail"
      style={{
        position: 'fixed', right: 'max(16px, 2.2vw)', top: '50%',
        transform: 'translateY(-50%)', zIndex: 400,
        display: 'grid', gap: 11, justifyItems: 'end',
      }}
    >
      {CHAPTERS.map((c, i) => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="label mono-num"
            style={{
              fontSize: 8.5,
              color: i === active ? 'var(--white)' : 'var(--faint)',
              opacity: i === active ? 1 : 0.5,
              transition: 'color .4s var(--ease), opacity .4s var(--ease)',
            }}
          >
            {c.n}
          </span>
          <span
            style={{
              width: i === active ? 18 : 7, height: 1,
              background: i === active ? 'var(--violet-soft)' : 'var(--faint)',
              transition: 'width .45s var(--ease), background .45s var(--ease)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
