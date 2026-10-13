import { RevealText } from '../motion/RevealText'
import { MagneticButton } from './Chapters'

/* ===========================================================================
   06 — FIRST SAFETY
   Kairo's award-winning web app for the first minutes after a dog bite, and
   for learning how rabies is prevented. Normal flow, not a sticky stage: it
   is something to read and open.

   This page DESCRIBES the app; it never gives first-aid instructions itself.
   The steps live in First Safety, where every screen cites its source. Keep
   it that way -- medical guidance written here would have no source and no
   review behind it.
   =========================================================================== */

const APP_URL = 'https://first-safety.vercel.app'

const FEATURES = [
  {
    t: 'Step-by-step first aid',
    d: 'A guided flow that puts the most urgent step first, with a timer — no walls of text to read in a panic.',
  },
  {
    t: 'Myths, answered',
    d: 'Cards on the home remedies people reach for after a bite, each one answered with its source.',
  },
  {
    t: 'Ready for the doctor',
    d: 'Three optional questions, saved so you can show them at the clinic. Skip them if you are busy with first aid.',
  },
  {
    t: 'Sourced, not guessed',
    d: 'Every screen cites WHO and NCDC India guidance. Opens instantly, works with no signal, no account, no tracking.',
  },
]

export function FirstSafetyScene() {
  return (
    <section id="first-safety" style={{ position: 'relative', padding: '18vh 0 14vh', overflow: 'hidden' }}>
      <div className="glow" style={{ right: '-10%', top: '30%', width: '55vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(124,58,237,.18) 0%, transparent 66%)' }} />

      <div className="wrap" style={{ position: 'relative', display: 'grid', gap: 'clamp(36px, 6vh, 60px)' }}>
        <div>
          <div className="label" style={{ marginBottom: 20 }}>06 — First Safety</div>
          <RevealText as="h2" className="display" style={{ fontSize: 'clamp(34px, 7vw, 120px)', maxWidth: '12ch' }}>
            When every minute counts.
          </RevealText>
          <p style={{ marginTop: 28, maxWidth: '52ch', fontSize: 'clamp(15px,1.2vw,19px)', lineHeight: 1.7, color: 'var(--muted)' }}>
            First Safety is a free web app for the first minutes after a dog bite, and
            for learning how rabies is prevented. It is our answer to a simple problem:
            in a panic, people reach for the wrong thing, and the right steps are buried
            in long articles nobody can read with a wound to look after.
          </p>
        </div>

        {/* The award, stated plainly: a judged category, not a participation badge. */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
          padding: 'clamp(18px, 2.4vw, 26px)', border: '1px solid rgba(167,139,250,.24)',
          background: 'linear-gradient(150deg, rgba(167,139,250,.09), rgba(8,6,14,.6))', backdropFilter: 'blur(14px)',
        }}>
          <div className="display" style={{ fontSize: 'clamp(22px, 2.6vw, 38px)', lineHeight: 1 }}>
            Excellence in Social Impact
          </div>
          <div className="label" style={{ color: 'var(--violet-soft)' }}>AnimalHack 2026 · Judged award</div>
        </div>

        <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {FEATURES.map((f) => (
            <li key={f.t} style={{
              padding: '26px 22px 30px',
              border: '1px solid var(--hair)',
              background: 'linear-gradient(160deg, rgba(167,139,250,.07), rgba(10,8,18,.5))',
              backdropFilter: 'blur(14px)',
            }}>
              <h3 className="display" style={{ fontSize: 'clamp(16px,1.5vw,21px)', margin: '0 0 12px', letterSpacing: '.01em', lineHeight: 1.1 }}>{f.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--muted)' }}>{f.d}</p>
            </li>
          ))}
        </ul>

        <div style={{ display: 'grid', gap: 22 }}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <MagneticButton href={APP_URL} primary>Open First Safety</MagneticButton>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: '60ch' }}>
            First Safety gives first-aid guidance. It does not replace a doctor: after any
            animal bite, get medical care as soon as you can.
          </p>
        </div>
      </div>
    </section>
  )
}
