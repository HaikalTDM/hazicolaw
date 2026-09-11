import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'

/**
 * Full-screen walnut loader. The parent owns `loaded` state; this component
 * plays the reveal once `loaded` is true and unmounts itself afterwards so
 * body scroll is restored on every path, including reduced motion.
 *
 * Two callbacks, because the page needs them at different moments.
 * `onReveal` fires as the curtain starts lifting, which is the last safe
 * moment to build the pinned sections while the screen is still covered.
 * `onDone` fires once the curtain has gone, when the reveal is over.
 */
export default function Loader({ loaded, reducedMotion, onReveal, onDone }) {
  const panelRef = useRef(null)
  const revealedRef = useRef(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!loaded) return undefined

    const reveal = () => {
      if (revealedRef.current) return
      revealedRef.current = true
      onReveal()
    }

    if (reducedMotion) {
      reveal()
      onDone()
      setGone(true)
      return undefined
    }

    let ctx
    let cancelled = false

    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      ctx = gsap.context(() => {
        gsap
          .timeline({
            onComplete: () => {
              setGone(true)
              onDone()
            },
          })
          .to('.loader__progress-fill', {
            scaleX: 1,
            duration: 0.7,
            ease: 'power2.inOut',
          })
          .add(reveal)
          .to(panelRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.9,
            ease: 'power4.inOut',
          }, '+=0.15')
      }, panelRef)
    })

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
      // If the effect tears down early, still release the page so scroll is
      // never left locked and the hero is never left hidden.
      reveal()
      onDone()
      setGone(true)
    }
  }, [loaded, reducedMotion, onReveal, onDone])

  if (gone) return null

  return (
    <div className="loader" ref={panelRef} aria-hidden="true">
      <div className="loader__inner">
        <Logo className="loader__mark" />
        <p className="loader__word">Haziq Azhari &amp; Co.</p>
        <div className="loader__progress">
          <span className="loader__progress-fill" />
        </div>
      </div>
    </div>
  )
}
