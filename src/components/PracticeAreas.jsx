import { FEATURED_AREAS, OTHER_AREAS } from '../data/content.js'
import { navigateToSection } from '../utils/scroll.js'

function FeaturedCard({ area }) {
  return (
    <article className="practice__featured">
      <span className="practice__featured-index" aria-hidden="true">
        {area.index}
      </span>
      <h3 className="practice__featured-title serif">{area.title}</h3>
      <p className="practice__featured-summary">{area.summary}</p>
      <ul className="practice__featured-points">
        {area.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="practice__featured-partner">
        Led by{' '}
        <a
          href="#people"
          onClick={(event) => {
            event.preventDefault()
            navigateToSection('people')
          }}
        >
          {area.partner}
        </a>
      </p>
    </article>
  )
}

function OtherCard({ area }) {
  return (
    <article className="practice__other">
      <span className="practice__other-index" aria-hidden="true">
        {area.index}
      </span>
      <h3 className="practice__other-title serif">{area.title}</h3>
      <p className="practice__other-summary">{area.summary}</p>
    </article>
  )
}

export default function PracticeAreas() {
  return (
    <section className="practice" id="practice" aria-labelledby="practice-heading">
      <div className="shell">
        <div className="practice__head">
          <p className="eyebrow">Our practice</p>
          <h2 id="practice-heading" className="practice__heading">
            Two areas of focus, and the breadth to back them.
          </h2>
        </div>

        <div className="practice__featured-grid">
          {FEATURED_AREAS.map((area) => (
            <FeaturedCard key={area.id} area={area} />
          ))}
        </div>

        <h3 className="practice__other-heading">Also practising</h3>
        <div className="practice__other-grid">
          {OTHER_AREAS.map((area) => (
            <OtherCard key={area.index} area={area} />
          ))}
        </div>
      </div>
    </section>
  )
}
