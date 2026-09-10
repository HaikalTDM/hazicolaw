import Reveal from './Reveal.jsx'
import { PROCESS_STAGES } from '../data/content.js'

export default function Process() {
  return (
    <section className="process section--walnut" id="process" aria-labelledby="process-heading">
      <div className="shell">
        <Reveal className="section-head">
          <p className="eyebrow">The working relationship</p>
          <h2 id="process-heading">
            A considered process from first signal to next step.
          </h2>
        </Reveal>

        <div className="process__stages">
          <span className="process__progress" aria-hidden="true">
            <span className="process__progress-fill" data-process-progress />
          </span>
          {PROCESS_STAGES.map((stage, index) => (
            <Reveal as="article" key={stage.key} className="process__stage" data-process-stage>
              <span className="process__number serif" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="process__title serif">{stage.title}</h3>
              <p className="process__body">{stage.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="process__note">
          <p>
            The first consultation is for understanding your matter and
            deciding together whether the firm is an appropriate fit. It is not
            a promise of representation or of any particular outcome. Enquiries
            are handled with discretion; solicitor-client confidentiality
            attaches once that relationship is established.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
