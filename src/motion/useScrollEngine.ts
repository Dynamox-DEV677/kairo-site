import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * The scroll engine.
 *
 * Lenis owns the scroll position; GSAP reads it. They must not both drive the
 * page or they fight and produce a subtle stutter that is very hard to trace —
 * so Lenis is stepped from GSAP's ticker rather than its own rAF loop, and
 * ScrollTrigger is told to update on every Lenis frame.
 *
 * Mounted exactly once, at the app root.
 */
export function useScrollEngine() {
  useEffect(() => {
    // Dev-only handles so the scroll system can be inspected from the console.
    // Stripped from production builds by the import.meta.env.DEV guard.
    if (import.meta.env.DEV) {
      ;(window as unknown as Record<string, unknown>).__ST = ScrollTrigger
      ;(window as unknown as Record<string, unknown>).__gsap = gsap
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Honour the OS setting: no smoothing, no scrubbed camera work. Native
    // scrolling with plain fades is the accessible experience, not a degraded
    // version of this one.
    if (reduced) {
      ScrollTrigger.normalizeScroll(false)
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out. The long tail is what makes a heavy scene feel
      // like it has mass rather than like it is lagging.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000) // GSAP ticks in seconds
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

/** Global depth constants, so "far" means the same thing in every chapter. */
export const DEPTH = {
  sky: 0.06,
  far: 0.16,
  mid: 0.38,
  near: 0.72,
  fore: 1.15,
  type: 0.52,
} as const

export type DepthName = keyof typeof DEPTH
