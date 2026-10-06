import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FEATURED_AREAS, OTHER_AREAS, FIRM } from '../data/content.js'

const BRIEF_AREAS = [...FEATURED_AREAS, ...OTHER_AREAS]

const BriefContext = createContext(null)

export function useBrief() {
  const context = useContext(BriefContext)
  if (!context) throw new Error('useBrief must be used within BriefProvider')
  return context
}

export function BriefProvider({ children }) {
  const [selected, setSelected] = useState({})
  const [note, setNote] = useState('')

  const toggle = useCallback((area) => {
    setSelected((current) => {
      const next = { ...current }
      if (next[area.id]) delete next[area.id]
      else next[area.id] = true
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setSelected({})
    setNote('')
  }, [])

  const value = useMemo(() => {
    const chosen = BRIEF_AREAS.filter((area) => selected[area.id])
    return {
      note,
      setNote,
      toggle,
      clear,
      isSelected: (id) => Boolean(selected[id]),
      chosen,
      count: chosen.length,
    }
  }, [selected, note, toggle, clear])

  return <BriefContext.Provider value={value}>{children}</BriefContext.Provider>
}

export function buildBriefMessage(chosen, note) {
  const lines = [`Hello ${FIRM.name}, I'd like to ask about:`]
  chosen.forEach((area, index) => {
    lines.push(`${index + 1}. ${area.title}`)
  })
  const trimmed = note.trim()
  if (trimmed) {
    lines.push('', `Anything specific: ${trimmed}`)
  }
  return lines.join('\n')
}

export function BriefDock() {
  const { note, setNote, toggle, clear, isSelected, chosen, count } = useBrief()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const dockRef = useRef(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const items = panelRef.current?.querySelectorAll(
        'button:not([disabled]), textarea, a[href]'
      )
      if (!items || items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      dockRef.current?.focus()
    }
  }, [open])

  const send = () => {
    if (chosen.length === 0) return
    const url = `https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent(
      buildBriefMessage(chosen, note)
    )}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <>
      <button
        type="button"
        ref={dockRef}
        className={`brief-dock${count > 0 ? ' has-items' : ''}`}
        aria-expanded={open}
        aria-controls="brief-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="brief-dock__label">Your brief</span>
        <span className="brief-dock__count" aria-hidden="true">
          {count}
        </span>
      </button>

      <p className="sr-only" aria-live="polite">
        {count === 0
          ? 'Your brief is empty.'
          : `${count} practice ${count === 1 ? 'area' : 'areas'} in your brief.`}
      </p>

      {open && (
        <>
          <div className="brief__backdrop" onClick={() => setOpen(false)} />
          <section
            id="brief-panel"
            ref={panelRef}
            className="brief-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="brief-panel-title"
          >
            <header className="brief-panel__head">
              <h3 id="brief-panel-title" className="brief-panel__title serif">
                Your brief
              </h3>
              <button
                type="button"
                ref={closeRef}
                className="brief-panel__close"
                onClick={() => setOpen(false)}
                aria-label="Close your brief"
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            {chosen.length === 0 ? (
              <p className="brief-panel__empty">
                Nothing added yet. Pick the practice areas that apply and they
                will gather here.
              </p>
            ) : (
              <ul className="brief-panel__list">
                {chosen.map((area) => (
                  <li key={area.id} className="brief-panel__item">
                    <span className="brief-panel__item-title">{area.title}</span>
                    <button
                      type="button"
                      className="brief-panel__remove"
                      onClick={() => toggle(area)}
                      aria-label={`Remove ${area.title} from your brief`}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <label className="brief-panel__note-label" htmlFor="brief-note">
              Anything specific? <span>(optional)</span>
            </label>
            <textarea
              id="brief-note"
              className="brief-panel__note"
              rows="3"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="A sentence about your situation helps us prepare."
            />

            <button
              type="button"
              className="btn btn--solid brief-panel__send"
              onClick={send}
              disabled={chosen.length === 0}
            >
              Send my brief
            </button>

            <div className="brief-panel__foot">
              {sent && (
                <p className="brief-panel__status" aria-live="polite">
                  Opened WhatsApp with your brief. Send it from there and we
                  will respond.
                </p>
              )}
              {chosen.length > 0 && (
                <button
                  type="button"
                  className="brief-panel__clear"
                  onClick={clear}
                >
                  Clear brief
                </button>
              )}
            </div>
          </section>
        </>
      )}
    </>
  )
}

export function BriefToggle({ area }) {
  const { isSelected, toggle } = useBrief()
  const active = isSelected(area.id)

  return (
    <button
      type="button"
      className={`brief-toggle${active ? ' is-active' : ''}`}
      aria-pressed={active}
      onClick={() => toggle(area)}
    >
      <span className="brief-toggle__mark" aria-hidden="true">
        {active ? '✓' : '+'}
      </span>
      {active ? 'In your brief' : 'Add to brief'}
    </button>
  )
}
