import { RevealText } from '../motion/RevealText'
import { MagneticButton } from './Chapters'

/* ===========================================================================
   08 — TEST KYNO
   Kyno is in closed testing on Google Play, and Google only opens production
   to apps whose testers actually used them for 14 days. This chapter is the
   recruitment desk: three steps in, then a task a day.

   Joining works through the Google Group. Play Console's closed-testing track
   lists the group as its testers, so anyone who joins it can opt in and
   install with no email for anyone to add by hand. If the group is ever
   removed from that list, step 01 stops working: change both together.
   Normal flow, not a sticky stage: this is something to read and act on.
   =========================================================================== */

const GROUP_URL = 'https://groups.google.com/g/kairo-industries'
const OPT_IN_URL = 'https://play.google.com/apps/testing/app.kairo.kyno'

const STEPS = [
  {
    n: '01',
    t: 'Join the group',
    d: 'Join the Kairo Industries Google Group with the Google account on your Android phone. That is what puts you on the tester list.',
  },
  {
    n: '02',
    t: 'Opt in and install',
    d: 'Open the testing link, tap "Become a tester", then install Kyno from the Play Store.',
  },
  {
    n: '03',
    t: 'Stay for 14 days',
    d: 'Keep the test joined for 14 days in a row — leaving resets your days. Use Kyno five minutes a day and report anything odd in Profile → Feedback.',
  },
]

const DAYS = [
  'Sign up and set your class',
  'Ask a doubt from your homework',
  'Do a Practice quiz',
  'Add a note',
  'Open the Reader and add a textbook PDF',
  'Review your flashcards',
  'Make a study Plan',
  'Send feedback: Profile → Feedback',
  'Try a mock test',
  'Check your Performance',
  'Ask another doubt',
  'Flashcards again',
  'Anything you like',
  "Final feedback: what's good, what's broken",
]

export function TestingScene() {
  return (
    <section id="testing" style={{ position: 'relative', padding: '18vh 0 14vh', overflow: 'hidden' }}>
      <div className="glow" style={{ left: '18%', top: '22%', width: '60vw', height: '40vw', transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse, rgba(124,58,237,.2) 0%, transparent 66%)' }} />
      <div className="grid-floor" />

      <div className="wrap" style={{ position: 'relative', display: 'grid', gap: 'clamp(40px, 6vh, 64px)' }}>
        <div>
          <div className="label" style={{ marginBottom: 20 }}>08 — Test Kyno</div>
          <RevealText as="h2" className="display" style={{ fontSize: 'clamp(34px, 7vw, 120px)', maxWidth: '12ch' }}>
            Help us test Kyno.
          </RevealText>
          <p style={{ marginTop: 28, maxWidth: '50ch', fontSize: 'clamp(15px,1.2vw,19px)', lineHeight: 1.7, color: 'var(--muted)' }}>
            Kyno is in closed testing on Google Play. Before it can go public, Google
            needs real students using it for 14 days. Five minutes a day is all it takes.
          </p>
        </div>

        <ol style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {STEPS.map((s) => (
            <li key={s.n} style={{
              padding: '26px 22px 30px',
              border: '1px solid var(--hair)',
              background: 'linear-gradient(160deg, rgba(167,139,250,.07), rgba(10,8,18,.5))',
              backdropFilter: 'blur(14px)',
            }}>
              <div className="label mono-num" style={{ color: 'var(--faint)' }}>{s.n}</div>
              <h3 className="display" style={{ fontSize: 'clamp(16px,1.5vw,21px)', margin: '16px 0 12px', letterSpacing: '.01em', lineHeight: 1.1 }}>{s.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--muted)' }}>{s.d}</p>
            </li>
          ))}
        </ol>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <MagneticButton href={GROUP_URL} primary>Join the group</MagneticButton>
          <MagneticButton href={OPT_IN_URL}>Become a tester</MagneticButton>
        </div>

        <div style={{ borderTop: '1px solid var(--hair)', paddingTop: 34 }}>
          <div className="label" style={{ marginBottom: 22 }}>Your 14 days — one small task each</div>
          <ol style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '14px 28px' }}>
            {DAYS.map((task, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline', paddingBottom: 12, borderBottom: '1px solid var(--hair)' }}>
                <span className="label mono-num" style={{ color: 'var(--violet-soft)', flexShrink: 0 }}>D{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--white)' }}>{task}</span>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 26, fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)' }}>
            You need an Android phone and a Google account. Questions?{' '}
            <a href="mailto:kairoindustries.cor@gmail.com" style={{ color: 'var(--white)', borderBottom: '1px solid var(--hair)', textDecoration: 'none' }}>
              kairoindustries.cor@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
