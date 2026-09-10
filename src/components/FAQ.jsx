import { useId, useState } from 'react'
import Reveal from './Reveal.jsx'
import { FAQ_ITEMS } from '../data/content.js'

/**
 * Accessible one-at-a-time accordion. Each button owns aria-expanded and
 * aria-controls; panels animate height/opacity via CSS grid rows, and in
 * reduced motion all transitions are removed by the global stylesheet.
 */
export default function FAQ() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id)
  const baseId = useId()

  return (
    <section className="faq section--ivory" id="faq" aria-labelledby="faq-heading">
      <div className="shell faq__layout">
        <Reveal className="section-head faq__head">
          <p className="eyebrow">Good questions</p>
          <h2 id="faq-heading">Straight answers before the first meeting.</h2>
        </Reveal>

        <div className="faq__list">
          {FAQ_ITEMS.map((item, index) => {
            const open = openId === item.id
            const panelId = `${baseId}-${item.id}-panel`
            const buttonId = `${baseId}-${item.id}-button`

            return (
              <Reveal as="article" key={item.id} className={`faq__item${open ? ' is-open' : ''}`}>
                <h3 className="faq__question">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="faq__number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="faq__question-text serif">{item.question}</span>
                    <span className="faq__toggle" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>
                <div
                  className="faq__panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                >
                  <div className="faq__panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
