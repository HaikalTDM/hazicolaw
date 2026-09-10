import { useInView } from '../hooks/useInView.js'

/**
 * IntersectionObserver-driven fade-and-rise reveal wrapper. In reduced
 * motion the content renders visible immediately with no transition.
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
