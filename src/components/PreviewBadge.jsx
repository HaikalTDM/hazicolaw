import { useEffect, useRef, useState } from 'react'
import capturaMark from '../assets/captura-mark.png'

// Preview build marker. Shown unless VITE_PREVIEW is set to 'off', so a
// deploy can drop it without touching code. Vite replaces the expression
// at build time, so the early return removes the component and its reads.
const PREVIEW = import.meta.env.VITE_PREVIEW !== 'off'

export default function PreviewBadge() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  if (!PREVIEW) return null

  return (
    <div className="preview" ref={rootRef}>
      <p className="preview__card" id="preview-note" hidden={!open}>
        Preview build by Captura. Content and layout may change before launch.
      </p>
      <button
        type="button"
        ref={buttonRef}
        className="preview__trigger"
        aria-expanded={open}
        aria-controls="preview-note"
        onClick={() => setOpen((current) => !current)}
      >
        <img className="preview__mark" src={capturaMark} alt="" />
        <span className="preview__label">Preview by Captura</span>
      </button>
    </div>
  )
}
