import Reveal from './Reveal.jsx'
import BrandMark from './BrandMark.jsx'

export default function Philosophy() {
  return (
    <section className="philosophy section--ivory" id="approach" aria-labelledby="philosophy-heading">
      <div className="shell philosophy__layout">
        <div className="philosophy__sticky">
          <Reveal>
            <p className="eyebrow">Our perspective</p>
            <h2 id="philosophy-heading" className="philosophy__statement serif">
              The law is rarely only about the law. It is about{' '}
              <em>people</em>, <em>livelihoods</em>, relationships, and{' '}
              <em>what comes next</em>.
            </h2>
          </Reveal>
          <Reveal className="philosophy__support">
            <span className="rule rule--bronze" aria-hidden="true" />
            <p>
              We bring careful analysis, direct communication, and
              partner-level attention to every matter we take on.
            </p>
          </Reveal>
        </div>

        <div className="philosophy__art" aria-hidden="true">
          <div className="document-stack" data-float>
            <span className="document-stack__sheet document-stack__sheet--back" />
            <span className="document-stack__sheet document-stack__sheet--mid" />
            <span className="document-stack__sheet document-stack__sheet--front">
              <BrandMark className="document-stack__mark" tone="dark" />
              <span className="document-stack__line" />
              <span className="document-stack__line document-stack__line--short" />
              <span className="document-stack__seal" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
