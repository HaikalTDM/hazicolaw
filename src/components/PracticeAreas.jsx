import { PRACTICE_AREAS } from '../data/content.js'

const TOTAL = String(PRACTICE_AREAS.length).padStart(2, '0')

export default function PracticeAreas() {
  return (
    <section
      className="practice"
      id="practice"
      data-scroll-vh="1.8"
      aria-labelledby="practice-heading"
    >
      <div className="practice__inner shell">
        <div className="practice__rail">
          <div className="practice__head">
            <p className="eyebrow">Our practice</p>
            <h2 id="practice-heading">Ten practice areas, one partner-led firm.</h2>
          </div>

          <div className="practice__meter" aria-hidden="true">
            <p className="practice__count">
              <span className="practice__meter-current">01</span>
              <span className="practice__count-total">/ {TOTAL}</span>
            </p>
            <ol className="practice__ticks">
              {PRACTICE_AREAS.map((area) => (
                <li key={area.index} className="practice__tick">
                  <span />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="practice__viewport">
          <ul className="practice__track">
            {PRACTICE_AREAS.map((area) => (
              <li key={area.index} className="practice__card">
                <span className="practice__watermark" aria-hidden="true">
                  {area.index}
                </span>
                <span className="practice__index" aria-hidden="true">
                  {area.index}
                </span>
                <h3 className="practice__title serif">{area.title}</h3>
                <p className="practice__desc">{area.summary}</p>
                <span className="practice__rule" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
