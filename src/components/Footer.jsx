import Logo from './Logo.jsx'
import { NAV_LINKS, FIRM } from '../data/content.js'
import { navigateToSection } from '../utils/scroll.js'

export default function Footer() {
  return (
    <footer className="footer section--ivory">
      <div className="shell">
        <div className="footer__top">
          <a
            className="footer__brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              navigateToSection('top')
            }}
          >
            <span className="footer__mark-plate">
              <Logo className="footer__mark" />
            </span>
            <span className="sr-only">{FIRM.name}, back to top</span>
          </a>

          <nav className="footer__nav" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  navigateToSection(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
            <a href={FIRM.instagram} target="_blank" rel="noopener noreferrer">
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>

          <div className="footer__contact">
            <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
            <p>{FIRM.address}</p>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          <span data-footer-word>Haziq Azhari &amp; Co.</span>
        </div>

        <div className="footer__meta">
          <p>Solaris Dutamas · Kuala Lumpur, Malaysia</p>
          <p>© {FIRM.year} Haziq Azhari &amp; Co.</p>
        </div>

        <p className="footer__disclaimer">
          This website provides general information only. It is not legal
          advice, and viewing it or contacting the firm through it does not
          create a solicitor-client relationship. Engagements are subject to
          consultation and conflict checks.
        </p>
      </div>
    </footer>
  )
}
