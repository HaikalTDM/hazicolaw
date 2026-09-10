/**
 * Smooth anchor navigation with focus management: after scrolling, the
 * target section receives focus so keyboard and screen-reader users land
 * where the link promised.
 */
export function navigateToSection(id) {
  const target = id === 'top' ? document.body : document.getElementById(id)
  if (!target) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    return
  }

  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1')
  }

  // Targets inside a pinned sequence cannot be reached by their own
  // document position, so they declare an absolute offset in viewport
  // heights (data-scroll-vh) instead.
  const vh = Number(target.dataset.scrollVh)
  if (Number.isFinite(vh) && vh > 0) {
    window.scrollTo({
      top: vh * window.innerHeight,
      behavior: reduced ? 'auto' : 'smooth',
    })
  } else {
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  // Focus after the scroll settles so the browser does not fight the jump.
  window.setTimeout(
    () => target.focus({ preventScroll: true }),
    reduced ? 0 : 600
  )
}
