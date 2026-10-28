import { contact, LIVE } from '../data/site'
import { scrollToTarget } from '../hooks/useSmoothScroll'
import '../styles/Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function handleSectionClick(event) {
  // Keep modified clicks and opening links in a new tab working normally.
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  const target = event.currentTarget.hash
  const section = document.querySelector(target)
  if (!section) return

  event.preventDefault()

  if (prefersReducedMotion()) {
    section.scrollIntoView({ behavior: 'instant' })
  } else {
    scrollToTarget(target, { duration: 1.3 })
  }
}

function handleBackToTop() {
  if (prefersReducedMotion()) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else {
    scrollToTarget(0, { duration: 1.6 })
  }
}

export default function Footer() {
  return (
    <footer className="footer" aria-label="Website footer">
      <div className="footer__grid">
        <p className="footer__eyebrow">Get in touch</p>

        <a
          className="footer__headline"
          href="#contact"
          onClick={handleSectionClick}
        >
          Where do you want to take your digital experience?
        </a>

        {/* <button
          className="footer__to-top"
          type="button"
          onClick={handleBackToTop}
          aria-label="Back to top"
          data-cursor="top"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
          </svg>
        </button> */}

        <svg
          className="footer__mark"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="m18.065 8.496-12.125 7" />
          <path d="m5.94 8.504 12.125 7" />
        </svg>

        <a className="footer__email" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>

        <nav className="footer__social" aria-label="Social media">
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </nav>

        <nav className="footer__links" aria-label="Footer navigation">
          <a href={`${LIVE}/pages/about-us.php`}>About</a>
          <a href="#services" onClick={handleSectionClick}>Services</a>
          <a href="#contact" onClick={handleSectionClick}>Contact</a>
        </nav>

        <p className="footer__location">Richmond, TX</p>

        <p className="footer__copyright">
          © {CURRENT_YEAR} Powered by ZK Investment Group LLC | All
          Rights Reserved
        </p>
      </div>
    </footer>
  )
}
