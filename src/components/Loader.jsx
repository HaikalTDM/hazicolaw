import { useEffect, useRef } from 'react'
import Logo from './Logo.jsx'

/**
 * Full-screen walnut loader. The parent owns `loaded` state; this component
 * plays the reveal once `loaded` is true and always unmounts afterwards so
 * body scroll is restored on every path, including reduced motion.
 */
export default function Loader({ loaded, reducedMotion, onDone }) {
  const panelRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!loaded) return undefined

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      onDone()
    }

    if (reducedMotion) {
      finish()
      return undefined
    }

    let ctx
    let cancelled = false

    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      ctx = gsap.context(() => {
        gsap
          .timeline({ onComplete: finish })
          .to('.loader__progress-fill', {
            scaleX: 1,
            duration: 0.7,
            ease: 'power2.inOut',
          })
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
      // If the effect is torn down before the timeline completes, still
      // guarantee the loader unmounts so scroll is never left locked.
      finish()
    }
  }, [loaded, reducedMotion, onDone])

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
