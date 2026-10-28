import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { splitPlainWords } from '../lib/split'
import { manifesto, LIVE } from '../data/site'

/* SECTION 2 — Distinctive Brand Identity & Timely Service Delivery
   Features word-by-word scroll reveal, smaller refined font, and animated check bullets. */
export default function Manifesto() {
  const root = useRef(null)
  const media = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header entrance */
      gsap.fromTo(
        ['.manifesto__kicker', '.manifesto__heading'],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'zk-expo',
          scrollTrigger: { trigger: '.manifesto__header', start: 'top 88%' },
        }
      )

      /* Media: smooth scale-down clip reveal + parallax drift */
      if (media.current) {
        gsap.fromTo(
          media.current,
          { scale: 1.12, yPercent: 4 },
          {
            scale: 1,
            yPercent: 0,
            duration: 1.4,
            ease: 'zk-expo',
            scrollTrigger: { trigger: media.current, start: 'top 86%' },
          }
        )
        gsap.to('.manifesto__media img', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: media.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }

      /* Word-by-word highlight on scroll */
      gsap.utils.toArray('.manifesto__line').forEach((line) => {
        const words = splitPlainWords(line)
        gsap.fromTo(
          words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.5,
            scrollTrigger: {
              trigger: line,
              start: 'top 82%',
              end: 'bottom 50%',
              scrub: true,
            },
          }
        )
      })

      /* Animated bullet points with checkmark pop */
      gsap.fromTo(
        '.manifesto__bullet',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'zk-expo',
          scrollTrigger: { trigger: '.manifesto__bullets', start: 'top 86%' },
        }
      )

      gsap.fromTo(
        '.manifesto__check',
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: '.manifesto__bullets', start: 'top 86%' },
        }
      )

      /* Trust strip fade */
      gsap.fromTo(
        '.manifesto__trust',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'zk-expo',
          scrollTrigger: { trigger: '.manifesto__trust', start: 'top 92%' },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section manifesto" id="manifesto" ref={root}>
      <div className="shell">
        {/* Section Header: Sub-heading then Main Heading */}
        <div className="manifesto__header">
          <div className="manifesto__kicker">
            <span className="manifesto__kicker-text">{manifesto.kicker}</span>
          </div>
          <h2 className="manifesto__heading">{manifesto.title}</h2>
        </div>

        {/* Section Grid: Left Media + Right Animated Content & Bullets */}
        <div className="manifesto__grid">
          <div className="manifesto__media" ref={media}>
            <img src={manifesto.media} alt="Create A Distinctive Brand Identity" loading="lazy" />
            {/* <div className="manifesto__badge">
              <i />
              Strategic Brand Partners
            </div> */}
          </div>

          <div className="manifesto__copy">
            {/* Animated word-by-word paragraph content (smaller font) */}
            <div className="manifesto__lines">
              {manifesto.lines.map((line, i) => (
                <p className="manifesto__line" key={i}>
                  {line}
                </p>
              ))}
            </div>

            {/* Animated Bullet Points */}
            <div className="manifesto__bullets">
              {manifesto.bullets.map((bullet, i) => (
                <div className="manifesto__bullet" key={i}>
                  <span className="manifesto__check" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#3752a5" />
                      <path
                        d="M6 10.5L8.8 13.2L14.2 7.5"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="manifesto__bullet-text">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Trusted by Organizations */}
            <div className="manifesto__trust">
              <p className="manifesto__trust-text">
                Trusted By The World&apos;s{' '}
                <a className="tlink" href={`${LIVE}/pages/about-us.php`} data-cursor="about">
                  Best Organizations
                </a>
              </p>
              <div className="manifesto__clients">
                <img src="/images/clients/c-1.webp" alt="Client organization" loading="lazy" />
                <img src="/images/clients/c-2.webp" alt="Client organization" loading="lazy" />
                <img src="/images/clients/c-3.webp" alt="Client organization" loading="lazy" />
                <img src="/images/clients/c-4.webp" alt="Client organization" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
