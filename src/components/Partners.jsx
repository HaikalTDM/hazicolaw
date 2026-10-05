import { useState } from 'react'
import { PARTNERS } from '../data/content.js'

function Portrait({ partner }) {
  if (partner.portrait) {
    return (
      <img
        className="people__portrait"
        src={partner.portrait}
        alt={`Portrait of ${partner.name}`}
        loading="lazy"
      />
    )
  }
  return (
    <div className="people__portrait people__portrait--placeholder" aria-hidden="true">
      <span className="people__monogram serif">{partner.monogram}</span>
      <span className="people__portrait-note">Portrait to follow</span>
    </div>
  )
}

function BioList({ items }) {
  if (!items || items.length === 0) return null
  return (
    <ul className="people__bio-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

function PartnerBio({ partner }) {
  const bio = partner.bio || {}
  return (
    <>
      {bio.education?.length > 0 && (
        <div className="people__bio-block">
          <h4 className="people__bio-title">Education</h4>
          <BioList items={bio.education} />
        </div>
      )}
      {bio.focus?.length > 0 && (
        <div className="people__bio-block">
          <h4 className="people__bio-title">Focus</h4>
          <BioList items={bio.focus} />
        </div>
      )}
      {bio.highlights?.length > 0 && (
        <div className="people__bio-block">
          <h4 className="people__bio-title">{bio.highlightsLabel || 'Selected experience'}</h4>
          <BioList items={bio.highlights} />
        </div>
      )}
      {bio.journey && (
        <div className="people__bio-block">
          <h4 className="people__bio-title">Legal journey</h4>
          <p className="people__bio-text">{bio.journey}</p>
        </div>
      )}
      {bio.aspiration && (
        <div className="people__bio-block">
          <h4 className="people__bio-title">Aspiration</h4>
          <p className="people__bio-text">{bio.aspiration}</p>
        </div>
      )}
    </>
  )
}

function PartnerCard({ partner, expanded, onToggle }) {
  const panelId = `people-bio-${partner.id}`
  return (
    <article className={`people__card${expanded ? ' is-expanded' : ''}`}>
      <button
        type="button"
        className="people__card-trigger"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <div className="people__media">
          <Portrait partner={partner} />
          <span className="people__tag" aria-hidden="true">
            {partner.role}
          </span>
        </div>
        <div className="people__card-head">
          <h3 className="people__name serif">{partner.name}</h3>
          <p className="people__role">{partner.role}</p>
          {partner.teaser && <p className="people__teaser">{partner.teaser}</p>}
          <span className="people__toggle" aria-hidden="true">
            {expanded ? 'Close' : 'View profile'}
          </span>
        </div>
      </button>

      <div className="people__bio" id={panelId}>
        <div className="people__bio-inner">
          <PartnerBio partner={partner} />
          <ul className="people__contacts">
            <li>
              <a href={partner.phoneHref}>{partner.phone}</a>
            </li>
            <li>
              <a href={partner.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function People() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <section className="people" id="people" aria-labelledby="people-heading">
      <div className="shell">
        <div className="people__head">
          <p className="eyebrow">The team</p>
          <h2 id="people-heading" className="people__heading">
            Meet the attorneys.
          </h2>
        </div>

        <div className="people__stage">
          {PARTNERS.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              expanded={expandedId === partner.id}
              onToggle={() =>
                setExpandedId(expandedId === partner.id ? null : partner.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
