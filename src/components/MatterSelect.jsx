import { useEffect, useRef, useState } from 'react'

/**
 * Custom listbox for the matter type. A native select cannot be styled
 * far enough for this section, so this reimplements the pattern with
 * full keyboard support: arrows, Home/End, type-ahead, Enter/Space to
 * choose, Escape to dismiss, and focus returning to the trigger.
 */
export default function MatterSelect({
  id,
  value,
  options,
  placeholder = 'Select the closest fit',
  onChange,
  invalid = false,
  describedBy,
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)

  const listId = `${id}-listbox`

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const selected = options.indexOf(value)
    setActive(selected >= 0 ? selected : 0)
  }, [open, options, value])

  useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.children[active]
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  // Lenis listens for wheel/touch on the window, so scrolling the menu
  // also drove the page. Stop the event at the menu so it never reaches
  // the smooth-scroll listener; the menu itself still scrolls natively.
  useEffect(() => {
    if (!open) return undefined
    const el = listRef.current
    if (!el) return undefined

    const stop = (event) => event.stopPropagation()
    el.addEventListener('wheel', stop, { passive: true })
    el.addEventListener('touchstart', stop, { passive: true })
    el.addEventListener('touchmove', stop, { passive: true })

    return () => {
      el.removeEventListener('wheel', stop)
      el.removeEventListener('touchstart', stop)
      el.removeEventListener('touchmove', stop)
    }
  }, [open])

  const commit = (index) => {
    const next = options[index]
    if (next !== undefined) onChange(next)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const onKeyDown = (event) => {
    const { key } = event

    if (!open) {
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
        event.preventDefault()
        setOpen(true)
      }
      return
    }

    if (key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => Math.min(options.length - 1, index + 1))
    } else if (key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => Math.max(0, index - 1))
    } else if (key === 'Home') {
      event.preventDefault()
      setActive(0)
    } else if (key === 'End') {
      event.preventDefault()
      setActive(options.length - 1)
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault()
      commit(active)
    } else if (key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    } else if (key === 'Tab') {
      setOpen(false)
    } else if (key.length === 1 && /\S/.test(key)) {
      const match = options.findIndex((option) =>
        option.toLowerCase().startsWith(key.toLowerCase())
      )
      if (match >= 0) setActive(match)
    }
  }

  return (
    <div className="matter" ref={rootRef}>
      <button
        type="button"
        id={id}
        ref={buttonRef}
        className={`matter__trigger${open ? ' is-open' : ''}${
          value ? '' : ' is-placeholder'
        }`}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        <span className="matter__value">{value || placeholder}</span>
        <span className="matter__chevron" aria-hidden="true" />
      </button>

      {open && (
        <ul className="matter__list" id={listId} role="listbox" ref={listRef} data-lenis-prevent>
          {options.map((option, index) => (
            <li
              key={option}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option === value}
              className={`matter__option${index === active ? ' is-active' : ''}${
                option === value ? ' is-selected' : ''
              }`}
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => {
                event.preventDefault()
                commit(index)
              }}
            >
              <span>{option}</span>
              <span className="matter__check" aria-hidden="true" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
