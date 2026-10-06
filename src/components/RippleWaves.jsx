import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

/**
 * Layered ripple rings expanding from the hero's lower-right, in the
 * spirit of the 21st.dev / HeroUI ripple backgrounds: a few concentric
 * rings that scale out and fade on a staggered loop.
 *
 * The rings are large and their Web Animations repaint every frame, which
 * fights the hero's pinned scroll morph. They only belong to the top of the
 * page, so they are dropped from paint the moment the page is scrolled.
 */
const RINGS = 5
const STAGGER = 1.1
const DURATION = 5.5

export default function RippleWaves() {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`ripple${atTop ? '' : ' is-hidden'}`} aria-hidden="true">
      {Array.from({ length: RINGS }, (_, i) => (
        <motion.span
          key={i}
          className="ripple__ring"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 0.9, 0] }}
          transition={{
            duration: DURATION,
            delay: i * STAGGER,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
