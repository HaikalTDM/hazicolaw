import { useEffect, useRef, useState } from 'react'
import { FEATURED_AREAS, OTHER_AREAS } from '../data/content.js'
import { navigateToSection } from '../utils/scroll.js'
import { BriefToggle } from './BriefCart.jsx'

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
      {area.plain && (
        <p className="practice__plain practice__featured-plain">
          <span className="practice__plain-label">In plain terms</span>
          {area.plain}
        </p>
      )}
      <div className="practice__featured-foot">
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
        <BriefToggle area={area} />
      </div>
    </article>
  )
}

function OtherCard({ area, extra = false }) {
  return (
    <article className={`practice__other${extra ? ' practice__other--extra' : ''}`}>
      <span className="practice__other-index" aria-hidden="true">
        {area.index}
      </span>
      <h3 className="practice__other-title serif">{area.title}</h3>
      <p className="practice__other-summary">{area.summary}</p>
      {area.plain && (
        <p className="practice__plain practice__other-plain">
          <span className="practice__plain-label">In plain terms</span>
          {area.plain}
        </p>
      )}
      <BriefToggle area={area} />
    </article>
  )
}

export default function PracticeAreas() {
  const [showAll, setShowAll] = useState(false)
  const firstRender = useRef(true)
  const moreRef = useRef(null)
  const topBefore = useRef(null)
  const hiddenCount = OTHER_AREAS.length - 2

  // Folding the list changes its height inside the pinned hero, which the
  // scroll choreography has already measured. Ask it to recalculate once the
  // DOM has committed, or the sections below keep a stale offset.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('practice:refresh'))
      // Collapsing removes cards above the button, so keep the button where
      // the visitor just clicked instead of leaving them further down.
      if (!showAll && topBefore.current != null && moreRef.current) {
        const delta = moreRef.current.getBoundingClientRect().top - topBefore.current
        if (Math.abs(delta) > 1) window.scrollBy(0, delta)
      }
      topBefore.current = null
    })
  }, [showAll])

  const toggleShowAll = () => {
    topBefore.current = moreRef.current?.getBoundingClientRect().top ?? null
    setShowAll((value) => !value)
  }

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
        <div
          className={`practice__other-grid${showAll ? ' is-open' : ''}`}
          id="practice-other-grid"
        >
          {OTHER_AREAS.map((area, index) => (
            <OtherCard key={area.id} area={area} extra={index > 1} />
          ))}
        </div>

        {/* Phones fold the list after two entries; the extra cards stay in
            the DOM (and in the markup for search) and are revealed here. */}
        <button
          type="button"
          ref={moreRef}
          className="btn btn--ghost practice__more"
          aria-expanded={showAll}
          aria-controls="practice-other-grid"
          onClick={toggleShowAll}
        >
          {showAll ? 'Show fewer areas' : `See all ${OTHER_AREAS.length} areas (${hiddenCount} more)`}
        </button>
      </div>
    </section>
  )
}
