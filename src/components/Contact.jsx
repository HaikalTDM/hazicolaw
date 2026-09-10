import { useState } from 'react'
import Reveal from './Reveal.jsx'
import MatterSelect from './MatterSelect.jsx'
import { FIRM, PARTNERS, MATTER_TYPES } from '../data/content.js'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  matter: '',
  message: '',
  consent: false,
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please let us know your name.'
  if (!values.email.trim()) {
    errors.email = 'An email address is needed so we can respond.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'That email address does not look complete.'
  }
  if (!values.matter) errors.matter = 'Please choose the closest matter type.'
  if (!values.message.trim()) {
    errors.message = 'A brief description helps us prepare for the conversation.'
  }
  if (!values.consent) {
    errors.consent = 'Please acknowledge the note before sending.'
  }
  return errors
}

function buildMailto(values) {
  const subject = `Consultation enquiry, ${values.matter || 'General'}: ${values.name}`
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || 'Not provided'}`,
    `Matter type: ${values.matter}`,
    '',
    'Brief description:',
    values.message,
  ]
  return `mailto:${FIRM.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

export default function Contact() {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | pending | success | error

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const update = (field) => (event) => {
    const value = field === 'consent' ? event.target.checked : event.target.value
    setField(field, value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('pending')

    if (ENDPOINT) {
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            matter: values.matter,
            message: values.message,
          }),
        })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        setStatus('success')
        setValues(INITIAL)
      } catch {
        setStatus('error')
      }
      return
    }

    // Default adapter: nothing is transmitted silently. The enquiry opens
    // as a draft in the visitor's own mail client, addressed to the firm.
    window.location.href = buildMailto(values)
    setStatus('success')
  }

  const fieldError = (field) =>
    errors[field] ? (
      <p className="form__error" id={`contact-${field}-error`}>
        {errors[field]}
      </p>
    ) : null

  return (
    <section className="contact section--walnut" id="contact" aria-labelledby="contact-heading">
      <div className="shell contact__layout">
        <div className="contact__intro">
          <Reveal>
            <p className="eyebrow">Consultation</p>
            <h2 id="contact-heading" className="contact__heading serif">
              There is always a first conversation.{' '}
              <span>
                Let us understand <em>what matters next</em>.
              </span>
            </h2>
          </Reveal>

          <Reveal className="contact__details">
            <p>
              Share a few lines about your situation and we will respond to
              arrange a time. Every engagement is subject to consultation and
              conflict checks.
            </p>
            <ul className="contact__list">
              <li>
                <span className="contact__label">Email</span>
                <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
              </li>
              {PARTNERS.map((partner) => (
                <li key={partner.id}>
                  <span className="contact__label">{partner.name}</span>
                  <a href={partner.phoneHref}>{partner.phone}</a>
                </li>
              ))}
              <li>
                <span className="contact__label">Address</span>
                <span className="contact__address">{FIRM.address}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="contact__form-wrap">
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="form__field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={update('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {fieldError('name')}
            </div>

            <div className="form__field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={update('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {fieldError('email')}
            </div>

            <div className="form__field">
              <label htmlFor="contact-phone">
                Phone <span className="form__optional">(optional, recommended)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={update('phone')}
              />
            </div>

            <div className="form__field">
              <label htmlFor="contact-matter">Matter type</label>
              <MatterSelect
                id="contact-matter"
                value={values.matter}
                options={MATTER_TYPES}
                onChange={(value) => setField('matter', value)}
                invalid={Boolean(errors.matter)}
                describedBy={errors.matter ? 'contact-matter-error' : undefined}
              />
              {fieldError('matter')}
            </div>

            <div className="form__field">
              <label htmlFor="contact-message">Brief description</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                required
                value={values.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {fieldError('message')}
            </div>

            <div className="form__field form__field--consent">
              <label className="form__consent" htmlFor="contact-consent">
                <input
                  id="contact-consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={update('consent')}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                />
                <span>
                  I understand that submitting this form does not create a
                  solicitor-client relationship, and that the firm will review
                  the enquiry before responding.
                </span>
              </label>
              {fieldError('consent')}
            </div>

            <button
              className="btn btn--solid form__submit"
              type="submit"
              disabled={status === 'pending'}
            >
              {status === 'pending' ? 'Sending…' : 'Request a consultation'}
            </button>

            <div className="form__status" aria-live="polite">
              {status === 'success' && (
                <p className="form__status--success">
                  Thank you. {ENDPOINT
                    ? 'Your enquiry has been sent. We will respond as soon as the partners’ schedule allows.'
                    : 'Your enquiry has opened as a draft in your mail application, addressed to the firm. Send it from there and we will respond.'}
                </p>
              )}
              {status === 'error' && (
                <p className="form__status--error">
                  Something went wrong while sending. Please email us directly
                  at <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a> or call
                  one of the numbers listed alongside.
                </p>
              )}
            </div>

            <p className="form__privacy">
              Your details are used only to review and respond to this enquiry.
              Nothing on this site is legal advice, and no information here
              creates a solicitor-client relationship.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
