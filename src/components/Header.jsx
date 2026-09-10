import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { NAV_LINKS, FIRM } from '../data/content.js'
import { navigateToSection } from '../utils/scroll.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    navigateToSection(id)
  }

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__row">
        <div className="site-header__pill site-header__pill--brand glass-surface">
          <a
            className="site-header__brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              setOpen(false)
              navigateToSection('top')
            }}
          >
            <Logo className="site-header__mark" />
            <span className="site-header__name">{FIRM.shortName}</span>
          </a>
        </div>

        <nav
          className="site-header__pill site-header__pill--nav glass-surface"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => {
                event.preventDefault()
                go(link.id)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__pill site-header__pill--cta glass-surface">
          <a
            className="site-header__cta"
            href="#contact"
            data-magnetic
            onClick={(event) => {
              event.preventDefault()
              go('contact')
            }}
          >
            Book a consultation
          </a>
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
            <span className="sr-only"> navigation</span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`site-header__mobile${open ? ' is-open' : ''}`}
        aria-label="Mobile"
        hidden={!open}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => {
              event.preventDefault()
              go(link.id)
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          className="site-header__mobile-cta"
          href="#contact"
          onClick={(event) => {
            event.preventDefault()
            go('contact')
          }}
        >
          Book a consultation
        </a>
      </nav>
    </header>
  )
}
