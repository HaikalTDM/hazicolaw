import RippleWaves from './RippleWaves.jsx'
import PracticeAreas from './PracticeAreas.jsx'
import Logo from './Logo.jsx'
import { FIRM } from '../data/content.js'
import { navigateToSection } from '../utils/scroll.js'

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero__stage">
        <RippleWaves />
        <div className="hero__veil" aria-hidden="true" />

        <div className="hero__inner shell">
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow" data-hero-line>
              {FIRM.designation} · {FIRM.city}
            </p>
            <h1 className="hero__heading" id="hero-heading">
              <span className="hero__line" data-hero-line>
                Clear legal counsel
              </span>
              <span className="hero__line" data-hero-line>
                for life's decisions<em className="hero__dot">.</em>
              </span>
            </h1>
            <p className="hero__body" data-hero-line>
              Haziq Azhari &amp; Co. advises on corporate, property, private
              wealth, and family matters. Plainly, deliberately, and with
              your long view in mind.
            </p>

            <div className="hero__ctas" data-hero-line>
              <a
                className="btn btn--hero-solid"
                href="#contact"
                data-magnetic
                onClick={(event) => {
                  event.preventDefault()
                  navigateToSection('contact')
                }}
              >
                Book a consultation
              </a>
              <a
                className="btn btn--hero-ghost"
                href="#practice"
                onClick={(event) => {
                  event.preventDefault()
                  navigateToSection('practice')
                }}
              >
                See the practice areas
              </a>
            </div>
          </div>
        </div>

        <p className="hero__rail" data-hero-line>
          <span className="hero__rail-line" aria-hidden="true" />
          {FIRM.area}
        </p>

        {/* Shrunken card body: a letterhead. The morph lands on the
            firm's identity rather than previewing the practice section
            that follows. Decorative: the name already appears in the
            header and footer, so it stays out of the accessibility tree. */}
        <div className="hero__card" aria-hidden="true">
          <Logo className="hero__card-mark" />
          <p className="hero__card-name">{FIRM.name}</p>
          <p className="hero__card-meta">
            {FIRM.designation} · {FIRM.city}
          </p>
        </div>

        <PracticeAreas />
      </div>
    </section>
  )
}
