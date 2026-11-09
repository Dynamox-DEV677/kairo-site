import { RevealText } from '../motion/RevealText'
import { MagneticButton } from './Chapters'
import { WHOP_URL } from '../../links'

/* ===========================================================================
   07 — JUDGE-READY
   Kairo's first paid product: a builder's handbook plus a tested code package,
   sold on Whop. Normal flow, like First Safety: something to read and buy.
   The store link lives in src/links.ts.
   =========================================================================== */

const BUILDS = [
  ['Wireless intruder alarm', 'Two ESP32 boards talking over ESP-NOW, with a tamper heartbeat'],
  ['RFID smart door lock', 'Card reader and servo latch — the hotel key-card idea, on a breadboard'],
  ['Visitor feedback box', 'Rating buttons and an OLED screen; votes survive a power cut'],
  ['Gas & smoke leak alarm', 'A heated MQ-2 sensor that learns its room before it watches it'],
  ['Laser tripwire alarm', 'A self-calibrating beam that latches the alarm until it is reset'],
]

const INSIDE = [
  { n: '39', t: 'Page handbook', d: 'Wiring tables, block diagrams, the science behind every part.' },
  { n: '7', t: 'Tested code files', d: 'Ready-to-open Arduino sketches, every one compile-tested.' },
  { n: '7', t: 'Day sprint', d: 'A working version by Day 4, then testing, explaining and display.' },
  { n: '20', t: 'Evaluator questions', d: 'With answers, a 60-second pitch and a display-board layout.' },
]

export function JudgeReadyScene() {
  return (
    <section id="judge-ready" style={{ position: 'relative', padding: '18vh 0 14vh', overflow: 'hidden' }}>
      <div className="glow" style={{ left: '-12%', top: '25%', width: '55vw', height: '42vw', background: 'radial-gradient(ellipse, rgba(124,58,237,.2) 0%, transparent 66%)' }} />

      <div className="wrap" style={{ position: 'relative', display: 'grid', gap: 'clamp(36px, 6vh, 60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(36px, 5vw, 80px)', alignItems: 'center' }}>
          <div>
            <div className="label" style={{ marginBottom: 20 }}>07 — Judge-Ready</div>
            <RevealText as="h2" className="display" style={{ fontSize: 'clamp(34px, 6.4vw, 110px)', maxWidth: '12ch' }}>
              Working projects, on deadline.
            </RevealText>
            <p style={{ marginTop: 28, maxWidth: '50ch', fontSize: 'clamp(15px,1.2vw,19px)', lineHeight: 1.7, color: 'var(--muted)' }}>
              <span style={{ color: 'var(--white)' }}>Judge-Ready in 7 Days</span> is our builder's handbook for
              students, teachers and makers who need a working Arduino or ESP32 project — and need to
              explain it well. Three of its five builds were run in front of visitors at a live school
              exhibition before we wrote a word.
            </p>

            {/* Where to buy, stated plainly: the store is on Whop. */}
            <div style={{
              marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
              padding: '14px 20px', border: '1px solid rgba(167,139,250,.24)',
              background: 'linear-gradient(150deg, rgba(167,139,250,.09), rgba(8,6,14,.6))', backdropFilter: 'blur(14px)',
            }}>
              <span className="display" style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', lineHeight: 1 }}>Now on Whop</span>
              <span className="label" style={{ color: 'var(--violet-soft)' }}>Instant download · PDF + code package</span>
            </div>

            <div style={{ marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <MagneticButton href={WHOP_URL} primary>Get it on Whop</MagneticButton>
            </div>
          </div>

          {/* The real cover, lit from behind rather than boxed in. */}
          <div style={{ position: 'relative', justifySelf: 'center', width: 'min(420px, 80vw)' }}>
            <div className="glow" style={{ inset: '10% -10% -5% -10%', background: 'radial-gradient(ellipse, rgba(167,139,250,.35) 0%, transparent 62%)' }} />
            <img
              src="/judge-ready/cover.jpg" alt="Judge-Ready in 7 Days — handbook cover"
              width={900} height={1273} loading="lazy"
              style={{ position: 'relative', display: 'block', width: '100%', height: 'auto', border: '1px solid var(--hair)', boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}
            />
          </div>
        </div>

        <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
          {INSIDE.map((f) => (
            <li key={f.t} style={{
              padding: '26px 22px 30px', border: '1px solid var(--hair)',
              background: 'linear-gradient(160deg, rgba(167,139,250,.07), rgba(10,8,18,.5))', backdropFilter: 'blur(14px)',
            }}>
              <div className="display mono-num" style={{ fontSize: 'clamp(34px, 3.6vw, 54px)', letterSpacing: '-.02em' }}>{f.n}</div>
              <h3 className="label" style={{ margin: '14px 0 10px', color: 'var(--white)' }}>{f.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--muted)' }}>{f.d}</p>
            </li>
          ))}
        </ul>

        <div>
          <div className="label" style={{ marginBottom: 18 }}>The five builds</div>
          <ol style={{ listStyle: 'none', display: 'grid', borderTop: '1px solid var(--hair)' }}>
            {BUILDS.map(([t, d], i) => (
              <li key={t} style={{ display: 'grid', gridTemplateColumns: 'minmax(44px, auto) 1fr', gap: '6px 22px', padding: '18px 0', borderBottom: '1px solid var(--hair)' }}>
                <span className="label mono-num" style={{ color: 'var(--violet-soft)', paddingTop: 4 }}>{String.fromCharCode(65 + i)}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 'clamp(16px,1.4vw,20px)', fontWeight: 600 }}>{t}</span>
                  <span style={{ fontSize: 14.5, color: 'var(--muted)' }}>{d}</span>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 22, fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: '64ch' }}>
            Low-voltage projects, built from standard parts. Designed for school exhibitions, science fairs
            and project reviews.
          </p>
        </div>
      </div>
    </section>
  )
}
