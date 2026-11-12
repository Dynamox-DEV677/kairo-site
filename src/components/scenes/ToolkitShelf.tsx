import { useMemo, useState } from 'react'
import { TOOLKITS, TOOLKIT_CATEGORIES, TOOLKIT_PRICE, type Toolkit } from '../../toolkits'
import { WHOP_STORE_URL } from '../../links'

/* ===========================================================================
   The Kairo toolkit shelf — 30 printable trackers & planners on Whop.
   Lives inside the Judge-Ready chapter (the store chapter), so the page's
   chapter list and navigation stay unchanged. Data: src/toolkits.ts.
   =========================================================================== */

const PREVIEW = 6

export function ToolkitShelf() {
  const [cat, setCat] = useState<string>('All')
  const [expanded, setExpanded] = useState(false)
  const filtered = useMemo<Toolkit[]>(() => (cat === 'All' ? TOOLKITS : TOOLKITS.filter((t) => t.category === cat)), [cat])
  // "All" starts with a short preview so the page stays a sensible length on phones.
  const collapsed = cat === 'All' && !expanded && filtered.length > PREVIEW
  const shown = collapsed ? filtered.slice(0, PREVIEW) : filtered

  return (
    <div id="toolkits" style={{ display: 'grid', gap: 26 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px 24px' }}>
        <div>
          <div className="label" style={{ marginBottom: 12 }}>The toolkit shelf</div>
          <h3 className="display" style={{ fontSize: 'clamp(26px, 3.4vw, 52px)', lineHeight: 1.05 }}>
            {TOOLKITS.length} printable toolkits. ${TOOLKIT_PRICE.toFixed(2)} each.
          </h3>
          <p style={{ marginTop: 14, maxWidth: '60ch', fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: 1.7, color: 'var(--muted)' }}>
            Trackers, calculators and planners for traders, resellers, creators, founders and students.
            Tools for keeping your own records. No signals, no picks, no income promises. US Letter and A4, instant download.
          </p>
        </div>
        <a href={WHOP_STORE_URL} target="_blank" rel="noreferrer" className="label" style={{ color: 'var(--violet-soft)', textDecoration: 'none' }}>
          Whole store on Whop →
        </a>
      </div>

      <div role="tablist" aria-label="Toolkit categories" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {['All', ...TOOLKIT_CATEGORIES].map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            style={{
              padding: '9px 14px', fontSize: 13, letterSpacing: '.04em', cursor: 'pointer', borderRadius: 999,
              border: `1px solid ${cat === c ? 'rgba(167,139,250,.7)' : 'var(--hair)'}`,
              background: cat === c ? 'rgba(167,139,250,.16)' : 'transparent',
              color: cat === c ? 'var(--white)' : 'var(--muted)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))', gap: 16 }}>
        {shown.map((t) => (
          <li key={t.slug}>
            <a
              href={t.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit',
                border: '1px solid var(--hair)', background: 'linear-gradient(160deg, rgba(167,139,250,.06), rgba(10,8,18,.55))',
              }}
            >
              <img
                src={`/toolkits/${t.slug}.jpg`} alt={`${t.title} preview`} width={480} height={360} loading="lazy"
                style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover', borderBottom: '1px solid var(--hair)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 16px 18px', flex: 1 }}>
                <span className="label" style={{ fontSize: 11, color: 'var(--violet-soft)' }}>{t.category}</span>
                <span style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.3 }}>{t.title}</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted)', flex: 1 }}>{t.headline}</span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
                  <span className="display mono-num" style={{ fontSize: 20 }}>${TOOLKIT_PRICE.toFixed(2)}</span>
                  <span className="label" style={{ color: 'var(--violet-soft)' }}>Get it on Whop →</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {collapsed && (
        <button
          onClick={() => setExpanded(true)}
          style={{
            justifySelf: 'center', padding: '13px 22px', fontSize: 14, letterSpacing: '.04em', cursor: 'pointer',
            border: '1px solid rgba(167,139,250,.5)', background: 'rgba(167,139,250,.1)', color: 'var(--white)',
          }}
        >
          Show all {filtered.length} toolkits
        </button>
      )}
    </div>
  )
}
