import { ParallaxLayer } from '../../motion/ParallaxLayer'

/**
 * CHAPTER 01 — THE ARRIVAL
 *
 * Deep space. Seven planes; the camera falls forward through them.
 *
 * The real mark sits at the centre as a physical object — white on transparent,
 * lit from behind by the nebula and ringed by orbits that extend its own
 * geometry outward. The mark is 258px at source, so it is never drawn larger
 * than ~360px: past that it goes soft, and a soft logo is worse than a small one.
 */
export function ArrivalScene() {
  return (
    <section className="chapter" style={{ height: '340svh' }} id="arrival">
      <div className="stage">
        {/* 1 — deep field, held right down. The scene is black space now; the
                stars are texture in the void, not a lit backdrop. */}
        <ParallaxLayer depth="sky" travel={0.3} scaleTo={1.24} pointer={5}>
          <img
            src="/space/deep-field.jpg"
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.24,
              filter: 'saturate(.5) brightness(.5) hue-rotate(-14deg)',
            }}
          />
        </ParallaxLayer>

        {/* 2 — star-trail footage, screened over the stills so the sky has
                genuine motion even when the page is still. Muted + inline so
                it autoplays on mobile; it is decoration, never content. */}
        <ParallaxLayer depth="far" travel={0.42} scaleTo={1.14} fade={[0.34, 0.34, 0.1]}>
          <video
            src="/video/starfield-drift.mp4"
            autoPlay muted loop playsInline preload="metadata"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', mixBlendMode: 'screen', opacity: 0.9,
            }}
          />
        </ParallaxLayer>

        {/* 3 — the lensing halo: the only real light in the scene, and it comes
                from the hole. Everything else is lit by this. */}
        <ParallaxLayer depth="far" travel={0.55} scaleTo={1.85} pointer={7}>
          <div
            className="glow"
            style={{
              left: '50%', top: '50%', width: '78vw', height: '78vw',
              transform: 'translate(-50%,-50%)',
              background:
                'radial-gradient(circle at 50% 50%, rgba(167,139,250,.3) 0%, rgba(124,58,237,.14) 34%, transparent 62%)',
            }}
          />
        </ParallaxLayer>

        {/* 4 — THE BLACK HOLE */}
        <ParallaxLayer depth={0.38} travel={0.6} scaleTo={1.34} pointer={8}>
          <BlackHole />
        </ParallaxLayer>

        {/* 5 — outer orbits, echoing the accretion disk further out */}
        <ParallaxLayer depth={0.44} travel={0.66} scaleTo={1.22} rotate={16} pointer={11}>
          <OrbitRings />
        </ParallaxLayer>

        {/* 6 — THE MARK. Absent at rest: the heading owns the opening frame.
                It arrives only in the second half of the chapter, once the
                wordmark has cleared, so the two never share the centre. */}
        <ParallaxLayer depth={0.46} travel={0.34} scaleTo={1.24} pointer={13} fade={[0, 0.05, 1]}>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <img
              src="/kairo-mark-white.png"
              alt="Kairo Industries"
              style={{
                // Sized to sit INSIDE the event horizon (r=132/600 of a 56vw
                // svg ≈ 24vw across), so the mark reads against black rather
                // than competing with the accretion disk.
                width: 'clamp(112px, 13.5vw, 224px)',
                height: 'auto',
                filter: 'drop-shadow(0 0 26px rgba(255,255,255,.55)) drop-shadow(0 0 70px rgba(167,139,250,.6))',
              }}
            />
          </div>
        </ParallaxLayer>

        {/* 7 — typography. Owns the opening frame, then leaves fastest and is
                fully gone by the chapter's midpoint — that exit is what cues
                the mark to arrive. */}
        <ParallaxLayer depth="type" travel={1.6} fade={[1, 0, 0]}>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center', textAlign: 'center' }}>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(52px, 14.5vw, 260px)',
                margin: 0,
                // backgroundImage, not the `background` shorthand: React warns
                // when a shorthand and its longhand (backgroundClip) are both set.
                backgroundImage: 'linear-gradient(180deg,#fff 10%, #cfc6ec 58%, #7d75a6 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}
            >
              KAIRO
            </h1>
            <div
              className="display"
              style={{
                fontSize: 'clamp(13px, 3.05vw, 56px)', letterSpacing: '.42em',
                fontWeight: 400, marginTop: 'clamp(8px,1.4vw,20px)',
                color: 'rgba(247,245,255,.6)', paddingLeft: '.42em',
              }}
            >
              INDUSTRIES
            </div>
          </div>
        </ParallaxLayer>

        {/* 8 — foreground dust, fastest plane. Sells the depth on the way past. */}
        <ParallaxLayer depth="fore" travel={1.35} pointer={24}>
          <Dust />
        </ParallaxLayer>

        <div className="vignette" />

        <div
          style={{
            position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)',
            display: 'grid', gap: 10, justifyItems: 'center',
          }}
        >
          <span className="label" style={{ fontSize: 9 }}>Scroll to enter</span>
          <span style={{ width: 1, height: 40, background: 'linear-gradient(rgba(167,139,250,.7), transparent)' }} />
        </div>
      </div>
    </section>
  )
}

/**
 * A black hole.
 *
 * What makes one read as a black hole rather than a glowing ring is the
 * gravitational lensing: light from the FAR side of the accretion disk is bent
 * up and over the event horizon, so you see the underside of the disk arcing
 * above the sphere. That arc is the whole illusion.
 *
 * Draw order matters and is the entire trick:
 *   far disk (behind)  →  lensed arc (over the top)  →  event horizon
 *   →  photon ring  →  near disk (crossing in front)
 *
 * Pure SVG. A shader would be more physical, but this costs nothing, scales to
 * any resolution, and cannot drop a frame.
 */
function BlackHole() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <svg
        viewBox="0 0 600 600"
        style={{ width: 'clamp(360px, 56vw, 900px)', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* Hot inner edge → cooler violet outer. The temperature gradient is
              what stops it looking like a plain neon ring. */}
          <linearGradient id="disk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3d1f6e" stopOpacity=".35" />
            <stop offset="22%" stopColor="#a78bfa" stopOpacity=".95" />
            <stop offset="46%" stopColor="#fff6e8" stopOpacity="1" />
            <stop offset="62%" stopColor="#ffd9a0" stopOpacity=".95" />
            <stop offset="84%" stopColor="#7c3aed" stopOpacity=".7" />
            <stop offset="100%" stopColor="#2a1250" stopOpacity=".28" />
          </linearGradient>

          <radialGradient id="horizonEdge" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="#000" stopOpacity="1" />
            <stop offset="94%" stopColor="#000" stopOpacity="1" />
            <stop offset="100%" stopColor="#1a1030" stopOpacity=".55" />
          </radialGradient>

          <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="softer" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="16" />
          </filter>

          {/* Hides the near half of the far disk so it reads as passing behind. */}
          <clipPath id="behind">
            <rect x="0" y="0" width="600" height="300" />
          </clipPath>
        </defs>

        {/* 1 — far side of the disk, upper half only */}
        <g clipPath="url(#behind)">
          <ellipse cx="300" cy="300" rx="270" ry="62" fill="none"
            stroke="url(#disk)" strokeWidth="30" opacity=".8" filter="url(#soft)" />
          <ellipse cx="300" cy="300" rx="270" ry="62" fill="none"
            stroke="url(#disk)" strokeWidth="11" opacity=".95" />
        </g>

        {/* 2 — the lensed arc: the disk's underside, bent over the top.
               Slightly tighter and flatter than the real disk, because the
               light path is shorter around the near side of the sphere. */}
        <path
          d="M 62 296 A 240 118 0 0 1 538 296"
          fill="none" stroke="url(#disk)" strokeWidth="17"
          opacity=".9" filter="url(#soft)"
        />
        <path
          d="M 62 296 A 240 118 0 0 1 538 296"
          fill="none" stroke="#fff3e2" strokeWidth="4" opacity=".78"
        />

        {/* 3 — event horizon. Genuinely black, with the faintest rim so it
               separates from the page background rather than dissolving. */}
        <circle cx="300" cy="300" r="132" fill="url(#horizonEdge)" />
        <circle cx="300" cy="300" r="132" fill="#000" />

        {/* 4 — photon ring, hugging the horizon */}
        <circle cx="300" cy="300" r="139" fill="none"
          stroke="#ffe9c9" strokeWidth="2.2" opacity=".85" filter="url(#soft)" />
        <circle cx="300" cy="300" r="139" fill="none"
          stroke="#fff" strokeWidth="0.9" opacity=".92" />

        {/* 5 — near side of the disk, crossing IN FRONT of the horizon */}
        <g clipPath="url(#nearHalf)">
          <ellipse cx="300" cy="300" rx="270" ry="62" fill="none"
            stroke="url(#disk)" strokeWidth="30" opacity=".85" filter="url(#soft)" />
          <ellipse cx="300" cy="300" rx="270" ry="62" fill="none"
            stroke="url(#disk)" strokeWidth="12" opacity="1" />
        </g>
        <defs>
          <clipPath id="nearHalf">
            <rect x="0" y="300" width="600" height="300" />
          </clipPath>
        </defs>

        {/* 6 — outer glow bloom */}
        <ellipse cx="300" cy="300" rx="290" ry="76" fill="none"
          stroke="rgba(167,139,250,.3)" strokeWidth="34" filter="url(#softer)" />
      </svg>
    </div>
  )
}

function OrbitRings() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <svg viewBox="0 0 500 500" style={{ width: 'clamp(340px, 52vw, 820px)', overflow: 'visible' }} aria-hidden="true">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity=".85" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity=".55" />
            <stop offset="100%" stopColor="#4c2f8a" stopOpacity=".12" />
          </linearGradient>
        </defs>
        {[
          { rx: 232, ry: 96, rot: -22, w: 1.5, o: 1 },
          { rx: 196, ry: 74, rot: 26, w: 1, o: 0.55 },
          { rx: 158, ry: 150, rot: 8, w: 0.7, o: 0.28 },
        ].map((r, i) => (
          <ellipse
            key={i} cx="250" cy="250" rx={r.rx} ry={r.ry}
            fill="none" stroke="url(#ring)" strokeWidth={r.w} opacity={r.o}
            transform={`rotate(${r.rot} 250 250)`}
            style={{ filter: 'drop-shadow(0 0 14px rgba(124,58,237,.5))' }}
          />
        ))}
        {/* A body on the outer orbit — small, but it implies the system turns. */}
        <circle cx="482" cy="250" r="3.4" fill="#fff" transform="rotate(-22 250 250)"
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,.9))' }} />
      </svg>
    </div>
  )
}

function Dust() {
  const bits = Array.from({ length: 26 }, (_, i) => {
    const a = Math.sin(i * 91.7) * 43758.5453
    const b = Math.sin(i * 27.3) * 12345.678
    return {
      x: (a - Math.floor(a)) * 100,
      y: (b - Math.floor(b)) * 100,
      s: 1 + (a - Math.floor(a)) * 2.4,
      o: 0.15 + (b - Math.floor(b)) * 0.4,
    }
  })
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {bits.map((d, i) => (
        <span
          key={i}
          style={{
            position: 'absolute', left: `${d.x}%`, top: `${d.y}%`,
            width: d.s, height: d.s, borderRadius: '50%',
            background: '#cbbdf5', opacity: d.o,
            boxShadow: '0 0 6px rgba(167,139,250,.8)',
          }}
        />
      ))}
    </div>
  )
}
