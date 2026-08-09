import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ParallaxLayer } from '../../motion/ParallaxLayer'
import { RevealText } from '../motion/RevealText'

/* ===========================================================================
   Chapters 02–08.
   Every chapter is a sticky stage with scroll runway behind it, so the page
   reads as one continuous camera move rather than a stack of sections.
   =========================================================================== */

function Backdrop({ src, opacity = 0.4, hue = -14 }: { src: string; opacity?: number; hue?: number }) {
  return (
    <img
      src={src} alt=""
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity,
        filter: `saturate(.7) brightness(.7) hue-rotate(${hue}deg)`,
      }}
    />
  )
}

/** Giant outlined word living behind a scene — typography as environment. */
function GhostWord({ children, top = '48%', left = '-8%' }: { children: string; top?: string; left?: string }) {
  return (
    <div
      className="display"
      style={{
        position: 'absolute', left, top,
        fontSize: 'clamp(80px, 24vw, 420px)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(167,139,250,.15)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  )
}

function Chapter({ id, height = '220svh', children }: { id: string; height?: string; children: ReactNode }) {
  return (
    <section className="chapter" id={id} style={{ height }}>
      <div className="stage">{children}</div>
    </section>
  )
}

/* -- 02 — WHAT IS KAIRO ---------------------------------------------------- */

export function VisionScene() {
  return (
    <Chapter id="vision">
      <ParallaxLayer depth="sky" travel={0.3} scaleTo={1.12}>
        <Backdrop src="/space/nebula.jpg" opacity={0.3} />
      </ParallaxLayer>
      <ParallaxLayer depth="mid" travel={0.7} fade={[0.5, 0.5, 0]}>
        <GhostWord>INTELLIGENCE</GhostWord>
      </ParallaxLayer>

      <div className="wrap" style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center' }}>
        <div className="label" style={{ marginBottom: 28 }}>02 — What is Kairo</div>
        <RevealText as="h2" className="display" stagger={0.07}
          style={{ fontSize: 'clamp(34px, 6.4vw, 108px)', maxWidth: '14ch' }}>
          We build systems that make the future feel closer.
        </RevealText>
        <p style={{ marginTop: 32, maxWidth: '46ch', fontSize: 'clamp(15px,1.2vw,19px)', lineHeight: 1.7, color: 'var(--muted)' }}>
          Kairo Industries is a technology company building intelligent systems —
          starting with education, because that is where the distance between what
          software can do and what people actually get is widest.
        </p>
      </div>
      <div className="vignette" />
    </Chapter>
  )
}

/* -- 03 — THE WORLD WE ARE BUILDING ---------------------------------------- */

const SYSTEMS = [
  { n: '01', t: 'Artificial Intelligence', d: 'Models that reason about a problem instead of pattern-matching a query.' },
  { n: '02', t: 'Education', d: 'Software built for the student in the room, not the institution buying the licence.' },
  { n: '03', t: 'Automation', d: 'Agents that carry out the work rather than describing how it could be done.' },
  { n: '04', t: 'Creative Technology', d: 'Tools that produce finished work, not drafts someone else has to rescue.' },
]

export function SystemsScene() {
  return (
    <Chapter id="systems" height="300svh">
      <ParallaxLayer depth="sky" travel={0.28} scaleTo={1.1}>
        <Backdrop src="/space/milky-way.jpg" opacity={0.26} />
      </ParallaxLayer>
      <ParallaxLayer depth="far" travel={0.5}>
        <GhostWord top="8%" left="4%">SYSTEMS</GhostWord>
      </ParallaxLayer>

      <div className="wrap" style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center', gap: 34 }}>
        <div>
          <div className="label" style={{ marginBottom: 20 }}>03 — The world we are building</div>
          <RevealText as="h2" className="display" style={{ fontSize: 'clamp(28px, 4.6vw, 74px)', maxWidth: '16ch' }}>
            Four systems, one direction.
          </RevealText>
        </div>

        {/* Panels sit at different depths, so scrolling moves them past each
            other — they read as objects at distance, not as a card grid. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 18 }}>
          {SYSTEMS.map((s, i) => (
            <Panel key={s.n} offset={i} {...s} />
          ))}
        </div>
      </div>
      <div className="vignette" />
    </Chapter>
  )
}

function Panel({ n, t, d, offset }: { n: string; t: string; d: string; offset: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 861px)', () => {
        // Staggered depth: each panel drifts at its own rate as the chapter
        // scrolls, which is what separates them in space.
        gsap.to(el, {
          y: -40 - offset * 26,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('.chapter'), start: 'top top', end: 'bottom bottom', scrub: true },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [offset])

  return (
    <div
      ref={ref}
      style={{
        padding: '26px 22px 30px',
        border: '1px solid var(--hair)',
        background: 'linear-gradient(160deg, rgba(167,139,250,.07), rgba(10,8,18,.5))',
        backdropFilter: 'blur(14px)',
        willChange: 'transform',
      }}
    >
      <div className="label mono-num" style={{ color: 'var(--faint)' }}>{n}</div>
      <h3 className="display" style={{ fontSize: 'clamp(16px,1.5vw,21px)', margin: '16px 0 12px', letterSpacing: '.01em' }}>{t}</h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--muted)' }}>{d}</p>
    </div>
  )
}

/* -- 04 — KAIRO TECHNOLOGY -------------------------------------------------- */

export function TechnologyScene() {
  return (
    <Chapter id="technology" height="300svh">
      <ParallaxLayer depth="sky" travel={0.25} scaleTo={1.2}>
        <video
          src="/video/nebula-slow.mp4" autoPlay muted loop playsInline preload="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.34, filter: 'saturate(.6) hue-rotate(-18deg)' }}
        />
      </ParallaxLayer>

      <ParallaxLayer depth="far" travel={0.5} scaleTo={1.5}>
        <div className="glow" style={{ left: '50%', top: '50%', width: '70vw', height: '70vw', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(124,58,237,.3) 0%, transparent 62%)' }} />
      </ParallaxLayer>

      {/* The core: concentric rings that counter-rotate as the chapter scrolls,
          so the object appears to be turning while the camera circles it. */}
      <ParallaxLayer depth={0.35} travel={0.5} rotate={40} scaleTo={1.14} pointer={10}>
        <Core />
      </ParallaxLayer>
      <ParallaxLayer depth={0.3} travel={0.44} rotate={-56} pointer={6}>
        <Core inner />
      </ParallaxLayer>

      <div className="wrap" style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center', justifyItems: 'center', textAlign: 'center' }}>
        <div className="label" style={{ marginBottom: 20 }}>04 — Kairo Technology</div>
        <RevealText as="h2" className="display" style={{ fontSize: 'clamp(30px, 5.4vw, 86px)', maxWidth: '13ch' }}>
          A core that reasons.
        </RevealText>
        <p style={{ marginTop: 26, maxWidth: '42ch', fontSize: 'clamp(15px,1.15vw,18px)', lineHeight: 1.7, color: 'var(--muted)' }}>
          Every Kairo product runs on the same reasoning layer: route the question
          to the right model, keep what matters, discard what doesn't, and answer
          in the time a person is willing to wait.
        </p>
      </div>
      <div className="vignette" />
    </Chapter>
  )
}

function Core({ inner = false }: { inner?: boolean }) {
  const rings = inner
    ? [{ r: 92, w: 0.8, o: 0.5 }, { r: 130, w: 0.5, o: 0.3 }]
    : [{ r: 168, w: 1.4, o: 0.85 }, { r: 214, w: 0.8, o: 0.45 }, { r: 256, w: 0.5, o: 0.24 }]
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <svg viewBox="0 0 560 560" style={{ width: 'clamp(300px, 46vw, 700px)', overflow: 'visible' }} aria-hidden="true">
        {rings.map((r, i) => (
          <circle key={i} cx="280" cy="280" r={r.r} fill="none"
            stroke="rgba(167,139,250,.7)" strokeWidth={r.w} opacity={r.o}
            strokeDasharray={i % 2 ? '3 12' : undefined}
            style={{ filter: 'drop-shadow(0 0 10px rgba(124,58,237,.55))' }} />
        ))}
        {!inner && Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2
          return <circle key={i} cx={280 + Math.cos(a) * 168} cy={280 + Math.sin(a) * 168} r="2.6" fill="#fff" opacity=".85" />
        })}
      </svg>
    </div>
  )
}

/* -- 05 — KAIRO EDUCATION --------------------------------------------------- */

export function EducationScene() {
  return (
    <Chapter id="education" height="280svh">
      <ParallaxLayer depth="sky" travel={0.28}>
        <Backdrop src="/space/planet.jpg" opacity={0.3} />
      </ParallaxLayer>
      <ParallaxLayer depth="far" travel={0.55} fade={[0.55, 0.55, 0]}>
        <GhostWord top="62%" left="-4%">LEARNING</GhostWord>
      </ParallaxLayer>

      {/* Interface fragments at three depths — a system glimpsed, not a mockup. */}
      <ParallaxLayer depth="mid" travel={0.85} driftX={-0.05} pointer={12}>
        <Fragment x="8%" y="24%" w={230} title="Doubt solved" line="Photosynthesis — light-dependent stage" bar={0.82} />
      </ParallaxLayer>
      <ParallaxLayer depth="near" travel={1.05} driftX={0.06} pointer={18}>
        <Fragment x="66%" y="56%" w={252} title="Weak area found" line="Trigonometry · 4 repeated errors" bar={0.41} />
      </ParallaxLayer>
      <ParallaxLayer depth={0.9} travel={0.95} pointer={15}>
        <Fragment x="20%" y="70%" w={210} title="Plan adapted" line="3 chapters before Thursday" bar={0.63} />
      </ParallaxLayer>

      <div className="wrap" style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center' }}>
        <div className="label" style={{ marginBottom: 20 }}>05 — Kairo Education</div>
        <RevealText as="h2" className="display" style={{ fontSize: 'clamp(32px, 6vw, 100px)', maxWidth: '11ch' }}>
          Learning should adapt to you.
        </RevealText>
        <p style={{ marginTop: 28, maxWidth: '44ch', fontSize: 'clamp(15px,1.2vw,19px)', lineHeight: 1.7, color: 'var(--muted)' }}>
          Kyno is our first product: an AI learning system for students preparing
          for the exams that decide the next few years.
        </p>
      </div>
      <div className="vignette" />
    </Chapter>
  )
}

function Fragment({ x, y, w, title, line, bar }: { x: string; y: string; w: number; title: string; line: string; bar: number }) {
  return (
    <div
      style={{
        position: 'absolute', left: x, top: y, width: w,
        padding: '15px 16px 17px',
        border: '1px solid rgba(167,139,250,.22)',
        background: 'linear-gradient(150deg, rgba(167,139,250,.1), rgba(8,6,14,.72))',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 20px 50px -18px rgba(0,0,0,.8)',
      }}
    >
      <div className="label" style={{ fontSize: 8.5, color: 'var(--violet-soft)' }}>{title}</div>
      <div style={{ marginTop: 9, fontSize: 13, lineHeight: 1.45, color: 'rgba(247,245,255,.9)' }}>{line}</div>
      <div style={{ marginTop: 13, height: 2, background: 'rgba(247,245,255,.1)' }}>
        <div style={{ width: `${bar * 100}%`, height: '100%', background: 'linear-gradient(90deg,#a78bfa,#7c3aed)' }} />
      </div>
    </div>
  )
}

/* -- 06 — KAIRO INDUSTRIES -------------------------------------------------- */

export function IndustriesScene() {
  return (
    <Chapter id="industries" height="260svh">
      <ParallaxLayer depth="sky" travel={0.3} scaleTo={1.15}>
        <Backdrop src="/space/deep-field.jpg" opacity={0.28} />
      </ParallaxLayer>

      {/* The wordmark AS the environment: enormous, crossed by the scene. */}
      <ParallaxLayer depth="mid" travel={1.15} driftX={-0.12}>
        <div className="display" style={{ position: 'absolute', top: '34%', left: '2%', fontSize: 'clamp(70px,17vw,300px)', whiteSpace: 'nowrap', color: 'rgba(247,245,255,.94)' }}>
          KAIRO
        </div>
      </ParallaxLayer>
      <ParallaxLayer depth="near" travel={1.35} driftX={0.14}>
        <div className="display" style={{ position: 'absolute', top: '56%', right: '2%', fontSize: 'clamp(34px,8.4vw,150px)', whiteSpace: 'nowrap', color: 'transparent', WebkitTextStroke: '1px rgba(167,139,250,.5)' }}>
          INDUSTRIES
        </div>
      </ParallaxLayer>

      <ParallaxLayer depth="fore" travel={1.5} pointer={20}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {[18, 42, 61, 83].map((l, i) => (
            <span key={i} style={{ position: 'absolute', left: `${l}%`, top: 0, width: 1, height: '100%', background: 'linear-gradient(transparent, rgba(167,139,250,.22), transparent)' }} />
          ))}
        </div>
      </ParallaxLayer>

      <div className="wrap" style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'end', paddingBottom: '10vh' }}>
        <div className="label">06 — Kairo Industries</div>
        <p style={{ marginTop: 18, maxWidth: '40ch', fontSize: 'clamp(15px,1.2vw,19px)', lineHeight: 1.7, color: 'var(--muted)' }}>
          One company, one product at a time, built by the people who use it.
        </p>
      </div>
      <div className="vignette" />
    </Chapter>
  )
}

/* -- 07 — THE FUTURE -------------------------------------------------------- */

export function FutureScene() {
  return (
    <Chapter id="future" height="240svh">
      {/* Almost nothing. After six chapters of motion, stillness is the effect. */}
      <ParallaxLayer depth="sky" travel={0.2} fade={[0.16, 0.16, 0.04]}>
        <Backdrop src="/space/milky-way.jpg" opacity={0.4} />
      </ParallaxLayer>

      <div className="wrap" style={{ position: 'relative', height: '100%', display: 'grid', alignContent: 'center', justifyItems: 'center', textAlign: 'center', gap: 12 }}>
        <div className="label" style={{ marginBottom: 26 }}>07 — The Future</div>
        <RevealText as="h2" className="display" by="word" stagger={0.1}
          style={{ fontSize: 'clamp(34px, 7vw, 120px)' }}>
          The future isn't waiting.
        </RevealText>
        <RevealText as="p" className="display" by="word" stagger={0.1} start="top 64%"
          style={{ fontSize: 'clamp(18px, 3vw, 50px)', color: 'var(--violet-soft)', fontWeight: 400 }}>
          So neither are we.
        </RevealText>
        <img src="/kairo-mark-white.png" alt="" width={72} height={72}
          style={{ marginTop: 48, opacity: 0.85, filter: 'drop-shadow(0 0 22px rgba(167,139,250,.6))' }} />
      </div>
      <div className="vignette" />
    </Chapter>
  )
}

/* -- 08 — BUILD WITH KAIRO -------------------------------------------------- */

export function ContactScene() {
  return (
    <section id="contact" style={{ position: 'relative', minHeight: '100svh', display: 'grid', alignContent: 'center', overflow: 'hidden' }}>
      <div className="glow" style={{ left: '50%', top: '40%', width: '80vw', height: '50vw', transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse, rgba(124,58,237,.26) 0%, transparent 66%)' }} />

      <div className="wrap" style={{ position: 'relative', display: 'grid', justifyItems: 'center', textAlign: 'center', gap: 34 }}>
        <RevealText as="h2" className="display" style={{ fontSize: 'clamp(44px, 11vw, 190px)' }}>
          Build with Kairo.
        </RevealText>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <MagneticButton href="https://kairo-daily-edu.vercel.app" primary>Explore Kyno</MagneticButton>
          <MagneticButton href="mailto:kairoindustries.cor@gmail.com">Contact us</MagneticButton>
        </div>

        {/* Contact block. Real addresses in real anchors — mailto: and the group
            URL — so they are clickable, copyable, and readable by a crawler. */}
        <div
          style={{
            marginTop: 54, display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 30, width: '100%', textAlign: 'left',
            borderTop: '1px solid var(--hair)', paddingTop: 34,
          }}
        >
          <div>
            <div className="label" style={{ marginBottom: 12 }}>Email</div>
            <a
              href="mailto:kairoindustries.cor@gmail.com"
              style={{ color: 'var(--white)', textDecoration: 'none', fontSize: 'clamp(14px,1.15vw,17px)', borderBottom: '1px solid var(--hair)', paddingBottom: 2 }}
            >
              kairoindustries.cor@gmail.com
            </a>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 12 }}>Community</div>
            <a
              href="https://groups.google.com/g/kairo-industries"
              target="_blank" rel="noopener"
              style={{ color: 'var(--white)', textDecoration: 'none', fontSize: 'clamp(14px,1.15vw,17px)', borderBottom: '1px solid var(--hair)', paddingBottom: 2 }}
            >
              Google Group ↗
            </a>
            <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: '28ch' }}>
              Announcements, build notes, and early access to what we ship next.
            </p>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 12 }}>Product</div>
            <a
              href="https://kairo-daily-edu.vercel.app"
              target="_blank" rel="noopener"
              style={{ color: 'var(--white)', textDecoration: 'none', fontSize: 'clamp(14px,1.15vw,17px)', borderBottom: '1px solid var(--hair)', paddingBottom: 2 }}
            >
              Kyno ↗
            </a>
            <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted)', maxWidth: '28ch' }}>
              An AI learning system for students preparing for the exams that matter.
            </p>
          </div>
        </div>

        <footer style={{ marginTop: 44, width: '100%', borderTop: '1px solid var(--hair)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <span className="label">Kairo Industries — Chennai, India</span>
          <span className="label">One product at a time</span>
        </footer>
      </div>
    </section>
  )
}

/**
 * Magnetic button. The element leans toward the cursor while it is inside,
 * then springs back — the pull is what makes it feel physical, and the spring
 * is what stops it feeling sticky.
 */
export function MagneticButton({ children, href, primary = false }: { children: ReactNode; href: string; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return   // no cursor to chase

    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.34)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.44)
    }
    const leave = () => { xTo(0); yTo(0) }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener' : undefined}
      className="label"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '18px 34px', textDecoration: 'none',
        color: primary ? '#0a0714' : 'var(--white)',
        background: primary ? 'var(--white)' : 'var(--glass)',
        border: `1px solid ${primary ? 'transparent' : 'var(--hair)'}`,
        backdropFilter: 'blur(12px)',
        willChange: 'transform',
      }}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  )
}
