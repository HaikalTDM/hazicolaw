/**
 * Swappable interlocking "HA" monogram.
 *
 * Replace this component's artwork (or drop the source asset into `public/`
 * and render it here) once the firm's original logo file is available.
 * The mark must stay legible on walnut, ivory, black, and transparent
 * backgrounds.
 */
export default function BrandMark({ className = '', tone = 'light', title }) {
  const ink = tone === 'light' ? '#f4f0e8' : '#2b1710'
  const accent = '#a56a3a'

  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox="0 0 96 96"
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g
        fill="none"
        stroke={ink}
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* H */}
        <path d="M18 14v68" />
        <path d="M46 14v68" />
        <path d="M18 48h28" />
        {/* A, interlocked through the H crossbar */}
        <path d="M60 14 40 82" />
        <path d="M60 14l20 68" />
        <path d="M48 60h24" stroke={accent} />
      </g>
    </svg>
  )
}
