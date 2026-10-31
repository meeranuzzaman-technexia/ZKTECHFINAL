import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { contact } from '../data/site'
import { scrollToTarget } from '../hooks/useSmoothScroll'
import '../styles/ContactForm.css'

const EMPTY_FORM = {
  name: '',
  email: '',
  website: '',
  message: '',
  company: '',
}

export default function CTA() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.cta__word .wi')

      gsap.fromTo(
        words,
        { yPercent: 116, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.35,
          ease: 'zk-expo',
          stagger: 0.045,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 74%',
          },
        }
      )

      gsap.fromTo(
        '.cta__form, .cta__ctas > *',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'zk-expo',
          stagger: 0.08,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 62%',
          },
        }
      )

      gsap.fromTo(
        '.cta__card',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.95,
          ease: 'zk-expo',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.cta__cards',
            start: 'top 86%',
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitForm = async (event) => {
    event.preventDefault()
    if (sending) return

    setSending(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Your message could not be sent. Please try again.')
      }

      setForm(EMPTY_FORM)
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      })
    } catch (error) {
      const message = error instanceof TypeError
        ? `The email service is currently unavailable. Please email ${contact.email}.`
        : error.message
      setStatus({ type: 'error', message })
    } finally {
      setSending(false)
    }
  }

  const goHome = (event) => {
    event.preventDefault()
    scrollToTarget('#home', { duration: 1.5 })
  }

  return (
    <section className="cta" id="contact" ref={root}>
      <div className="shell">
        <span className="kicker">
          Start a project <span className="slash">/</span>
        </span>

        <h2 className="cta__title" style={{ marginTop: '1.2rem' }}>
          <span className="cta__word w">
            <span className="wi">Ready</span>
          </span>{' '}
          <span className="cta__word w">
            <span className="wi">to</span>
          </span>{' '}
          <span className="cta__word w">
            <span className="wi">
              <em>refocus</em>
            </span>
          </span>{' '}
          <span className="cta__word w">
            <span className="wi">on</span>
          </span>{' '}
          <span className="cta__word w">
            <span className="wi">growth?</span>
          </span>
        </h2>

        <div className="cta__grid">
          <div>
            <form
              className="cta__form"
              id="cta-contact-form"
              action="/api/contact.php"
              method="post"
              onSubmit={submitForm}
              aria-busy={sending}
            >
              <div className="cta-form__row">
                <label className="cta-form__field">
                  <span>Your Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    autoComplete="name"
                    maxLength={120}
                    required
                  />
                </label>

                <label className="cta-form__field">
                  <span>Your Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    autoComplete="email"
                    maxLength={190}
                    required
                  />
                </label>
              </div>

              <label className="cta-form__field">
                <span>Website</span>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={updateField}
                  autoComplete="url"
                  inputMode="url"
                  maxLength={255}
                />
              </label>

              <label className="cta-form__field">
                <span>Your Comment</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  rows={3}
                  maxLength={5000}
                />
              </label>

              <div className="cta-form__hp" aria-hidden="true">
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={updateField}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

            </form>

            <div className="cta__ctas">
              <button
                className="btn split-cta split-cta--primary"
                type="submit"
                form="cta-contact-form"
                disabled={sending}
                data-cursor="contact"
              >
                <span className="split-cta__label">
                  {sending ? 'Sending...' : 'Book a free consultation'}
                </span>
                <span className="split-cta__icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M5 15 15 5M7 5h8v8" />
                  </svg>
                </span>
              </button>

              {/* <a
                className="btn split-cta split-cta--secondary"
                href="#home"
                onClick={goHome}
                data-cursor="pricing"
              >
                <span className="split-cta__label">See pricing</span>
                <span className="split-cta__icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M12 6l4 4-4 4" />
                  </svg>
                </span>
              </a> */}
            </div>

            <p
              className={`cta-form__status${status.type ? ` is-${status.type}` : ''}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          </div>

          <div className="cta__cards">
            <button
              type="button"
              className="cta__card"
              onClick={copy}
              data-cursor={copied ? 'copied' : 'copy'}
            >
              <span>
                <small>Email</small>
                <strong>{contact.email}</strong>
              </span>
              <span className="mono">{copied ? 'Copied ✓' : 'Copy'}</span>
            </button>

            <a
              className="cta__card"
              href={contact.phoneHref}
              data-cursor="call"
            >
              <span>
                <small>Phone</small>
                <strong>{contact.phoneLabel}</strong>
              </span>
              <span className="mono">Call</span>
            </a>

            <a
              className="cta__card"
              href={contact.maps}
              target="_blank"
              rel="noreferrer"
              data-cursor="map"
            >
              <span>
                <small>Studio</small>
                <strong>{contact.address}</strong>
              </span>
              <span className="mono">Map</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
