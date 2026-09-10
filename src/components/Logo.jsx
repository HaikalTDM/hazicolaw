import logo from '../assets/logo.png'

/**
 * Firm mark. The supplied artwork is a light mark on a transparent
 * ground, so it reads on the dark walnut surfaces; on light surfaces
 * wrap it in a dark plate (see `.footer__mark-plate`).
 */
export default function Logo({ className = '', alt = '' }) {
  return (
    <img
      className={`logo ${className}`.trim()}
      src={logo}
      alt={alt}
      draggable="false"
    />
  )
}
