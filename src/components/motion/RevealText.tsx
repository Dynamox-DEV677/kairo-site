import { useLayoutEffect, useRef, type ElementType, type CSSProperties } from 'react'
import gsap from 'gsap'

type Props = {
  children: string
  as?: ElementType
  className?: string
  /** Split unit. Words read better for statements; chars for short display lines. */
  by?: 'word' | 'char' | 'line'
  stagger?: number
  /** Trigger position — later values hold the line back until it's well in view. */
  start?: string
  delay?: number
  style?: CSSProperties
}

/**
 * Line/word/char reveal without SplitText (which is a paid GSAP plugin).
 *
 * Each unit gets a clipping parent and rises from beneath it — the mask is what
 * makes it read as typography arriving rather than text fading in. A blur is
 * released alongside, which is what gives it the cinematic weight; opacity alone
 * looks like a web page, opacity + blur + mask looks like a title card.
 */
export function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  by = 'word',
  stagger = 0.055,
  start = 'top 78%',
  delay = 0,
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  const units =
    by === 'char' ? Array.from(children) : by === 'line' ? [children] : children.split(' ')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el.querySelectorAll('.ru-inner'),
          { yPercent: 118, opacity: 0, filter: 'blur(9px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.15,
            ease: 'power3.out',
            stagger,
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          }
        )
      })
      // Reduced motion: units are already visible via their default styles.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el.querySelectorAll('.ru-inner'), { yPercent: 0, opacity: 1, filter: 'none' })
      })
    }, ref)

    return () => ctx.revert()
  }, [stagger, start, delay, children])

  return (
    <Tag ref={ref} className={className} style={style}>
      {units.map((u, i) => (
        <span
          key={i}
          className="ru"
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span className="ru-inner" style={{ display: 'inline-block', willChange: 'transform' }}>
            {u === ' ' ? ' ' : u}
          </span>
          {by === 'word' && i < units.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
