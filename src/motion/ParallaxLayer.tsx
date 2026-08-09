import { useLayoutEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { DEPTH, type DepthName } from './useScrollEngine'

type Props = {
  children: ReactNode
  /** Named depth, or a raw multiplier. Higher = closer to camera = moves more. */
  depth?: DepthName | number
  /** Vertical travel across the chapter, as a fraction of viewport height. */
  travel?: number
  /** Scale at the end of the chapter — >1 reads as moving toward the camera. */
  scaleTo?: number
  /** Degrees of rotation across the chapter. */
  rotate?: number
  /** Opacity keyframes across the chapter: [start, end] or [start, mid, end]. */
  fade?: [number, number] | [number, number, number]
  /** Horizontal travel, as a fraction of viewport width. */
  driftX?: number
  /** How strongly the pointer moves this layer, in px. 0 disables. */
  pointer?: number
  className?: string
  style?: CSSProperties
  /** Overrides the ancestor .chapter as the ScrollTrigger trigger. */
  triggerSelector?: string
}

/**
 * One depth plane inside a chapter.
 *
 * Every layer derives its motion from the SAME scroll progress, so depth is
 * systematic rather than hand-tuned per element: give a layer a depth and it
 * moves correctly relative to every other layer, in this chapter and every
 * other one.
 *
 * All motion is transform + opacity only — nothing here can trigger layout.
 */
export function ParallaxLayer({
  children,
  depth = 'mid',
  travel = 1,
  scaleTo,
  rotate,
  fade,
  driftX,
  pointer = 0,
  className = '',
  style,
  triggerSelector,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const d = typeof depth === 'number' ? depth : DEPTH[depth]

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 861px)',
          mobile: '(max-width: 860px)',
        },
        (context) => {
          const { motion, mobile } = context.conditions as Record<string, boolean>
          if (!motion) return // reduced motion: layer renders static

          const trigger = triggerSelector
            ? (el.closest(triggerSelector) as HTMLElement) ?? el
            : (el.closest('.chapter') as HTMLElement) ?? el

          // Mobile keeps the narrative but halves the travel — full-strength
          // parallax on a short viewport reads as jitter, not depth.
          const amp = mobile ? 0.5 : 1

          const to: gsap.TweenVars = {
            ease: 'none',
            y: `${-travel * d * 100 * amp}svh`,
          }
          if (driftX) to.x = `${driftX * d * 100 * amp}vw`
          if (scaleTo !== undefined) to.scale = 1 + (scaleTo - 1) * amp
          if (rotate) to.rotate = rotate * amp

          gsap.to(el, {
            ...to,
            scrollTrigger: {
              trigger,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,   // true, not a number: the layer IS the scrollbar
            },
          })

          if (fade) {
            gsap.fromTo(
              el,
              { opacity: fade[0] },
              {
                opacity: fade[fade.length - 1],
                ...(fade.length === 3 ? { keyframes: { opacity: [fade[0], fade[1], fade[2]] } } : {}),
                ease: 'none',
                scrollTrigger: { trigger, start: 'top top', end: 'bottom bottom', scrub: true },
              }
            )
          }

          // Pointer response. Written to a CSS variable rather than to the
          // transform, so it composes with the scroll transform instead of
          // overwriting it — two systems writing `transform` is the classic way
          // parallax and pointer-follow break each other.
          if (pointer && !mobile) {
            const quickX = gsap.quickTo(el, '--px', { duration: 0.8, ease: 'power3.out' })
            const quickY = gsap.quickTo(el, '--py', { duration: 0.8, ease: 'power3.out' })
            const onMove = (e: PointerEvent) => {
              const nx = (e.clientX / window.innerWidth - 0.5) * 2
              const ny = (e.clientY / window.innerHeight - 0.5) * 2
              quickX(nx * pointer)
              quickY(ny * pointer * 0.6)
            }
            window.addEventListener('pointermove', onMove, { passive: true })
            return () => window.removeEventListener('pointermove', onMove)
          }
        }
      )
    }, ref)

    return () => ctx.revert() // kills tweens AND ScrollTriggers created inside
  }, [depth, travel, scaleTo, rotate, driftX, pointer, triggerSelector, fade])

  return (
    <div
      ref={ref}
      className={`layer ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        willChange: 'transform',
        translate: 'var(--px, 0px) var(--py, 0px)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
