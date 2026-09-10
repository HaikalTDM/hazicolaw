import Reveal from './Reveal.jsx'
import { SERVICES, CAPABILITIES } from '../data/content.js'

export default function Services() {
  return (
    <section className="services section--ivory" id="services" aria-labelledby="services-heading">
      <div className="shell">
        <Reveal className="section-head">
          <p className="eyebrow">How we help</p>
          <h2 id="services-heading">Measured advice. Decisive next steps.</h2>
        </Reveal>

        <div className="services__rows" role="list">
          {SERVICES.map((service) => (
            <Reveal
              as="div"
              key={service.index}
              className="services__row"
              role="listitem"
              tabIndex="0"
            >
              <span className="services__index" aria-hidden="true">
                {service.index}
              </span>
              <h3 className="services__title serif">{service.title}</h3>
              <p className="services__summary">{service.summary}</p>
            </Reveal>
          ))}
        </div>

        <div className="services__cards">
          {CAPABILITIES.map((capability, i) => (
            <Reveal as="article" key={capability.title} className="capability">
              <span className={`capability__motif capability__motif--${i + 1}`} aria-hidden="true" />
              <h3 className="capability__title serif">{capability.title}</h3>
              <p className="capability__summary">{capability.summary}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
