import { motion } from 'motion/react'

/**
 * Layered ripple rings expanding from the hero's lower-right, in the
 * spirit of the 21st.dev / HeroUI ripple backgrounds: a few concentric
 * rings that scale out and fade on a staggered loop.
 */
const RINGS = 5
const STAGGER = 1.1
const DURATION = 5.5

export default function RippleWaves() {
  return (
    <div className="ripple" aria-hidden="true">
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
