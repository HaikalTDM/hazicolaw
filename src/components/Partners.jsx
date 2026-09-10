import { PARTNERS } from '../data/content.js'

/**
 * Portraits render as monogram plates until approved photographs are
 * supplied. To swap in a portrait later, set `portrait` on the partner
 * entry in `src/data/content.js`; no layout change needed.
 */
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

function Detail({ partner, index }) {
  return (
    <>
      <p className="people__index" aria-hidden="true">
        {index}
      </p>
      <h3 className="people__name serif">{partner.name}</h3>
      <p className="people__role">{partner.role}</p>
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
    </>
  )
}

/**
 * Three beats, driven by scroll: the pair of portraits, then the left
 * one enlarged with its details on the right, then the right one
 * enlarged with its details on the left, then back to the pair.
 * `data-media` / `data-detail` are the animation anchors.
 */
export default function People() {
  const [left, right] = PARTNERS

  return (
    <section className="people" id="people" aria-labelledby="people-heading">
      <div className="people__head shell">
        <p className="eyebrow">The team</p>
        <h2 id="people-heading">Meet the attorneys.</h2>
      </div>

      <div className="people__stage shell">
        <div className="people__media" data-media="a">
          <Portrait partner={left} />
          <span className="people__tag" aria-hidden="true">
            {left.role}
          </span>
        </div>
        <div className="people__media" data-media="b">
          <Portrait partner={right} />
          <span className="people__tag" aria-hidden="true">
            {right.role}
          </span>
        </div>

        <article className="people__detail" data-detail="a">
          <Detail partner={left} index="01" />
        </article>
        <article className="people__detail" data-detail="b">
          <Detail partner={right} index="02" />
        </article>
      </div>
    </section>
  )
}
