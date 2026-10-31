import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { splitWords } from '../lib/split'
import { heroWords } from '../data/site'
import { scrollToTarget } from '../hooks/useSmoothScroll'
import Marquee from './Marquee'

const STOCK_VIDEO_URL = 'https://assets.mixkit.co/videos/35304/35304-720.mp4'
const STOCK_POSTER_URL = 'https://assets.mixkit.co/videos/35304/35304-thumb-720-0.jpg'

const KICKER_WORDS = ['Web Platforms', 'Mobile Apps', 'Digital Growth']
const KICKER_CYCLE = 2800 // ms per word
const PILL_CYCLE = 2400 // ms per service

export default function Hero({ ready }) {
  const root = useRef(null)
  const introRef = useRef(null)
  const videoRef = useRef(null)
  const pillsRef = useRef(null)
  const [kick, setKick] = useState(0)
  const [pill, setPill] = useState(0)
  const [pillHold, setPillHold] = useState(false)

  /* Entrance animation once preloader finishes */
  useLayoutEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'zk-expo' } })
      const introLines = splitWords(introRef.current)

      tl.fromTo('.hero__video-wrap', { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0)
        .fromTo('.hero__kicker-rail', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.2)
        .fromTo(
          '.hero__kicker-window',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.35
        )
        .fromTo('.hero__title', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1.1 }, 0.35)
        .fromTo(introLines, { yPercent: 110 }, { yPercent: 0, duration: 1.05, stagger: 0.03 }, 0.55)
        .fromTo(
          '.hero__ctas > *',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          0.8
        )
        .fromTo('.hero__pills', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0.92)
        // .fromTo('.ticker', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.05)
    }, root)
    return () => ctx.revert()
  }, [ready])

  /* Kicker word cycle */
  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setKick((k) => (k + 1) % KICKER_WORDS.length), KICKER_CYCLE)
    return () => clearInterval(id)
  }, [ready])

  /* Services auto-glide (pauses while hovering) */
  useEffect(() => {
    if (!ready || pillHold) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setPill((p) => (p + 1) % heroWords.length), PILL_CYCLE)
    return () => clearInterval(id)
  }, [ready, pillHold])

  /* Measure the active service so the underline can slide to it */
  useLayoutEffect(() => {
    const el = pillsRef.current
    if (!el) return
    const measure = () => {
      const item = el.querySelectorAll('.hero__pill')[pill]
      if (!item) return
      const track = item.offsetParent
      el.style.setProperty('--x', `${item.offsetLeft}px`)
      el.style.setProperty('--y', `${item.offsetTop}px`)
      el.style.setProperty('--w', `${item.offsetWidth}px`)
      el.style.setProperty('--h', `${item.offsetHeight}px`)
      el.scrollTo({
        left: track.offsetLeft + item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2,
        behavior: 'smooth',
      })
      requestAnimationFrame(() => el.classList.add('is-ready'))
    }
    measure()
    window.addEventListener('resize', measure)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [pill])

  /* Scroll parallax */
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.to('.hero__video', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero__content', {
        y: -50,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  const total = KICKER_WORDS.length

  const goToSection = (target) => (event) => {
    event.preventDefault()
    scrollToTarget(target, { duration: 1.5 })
  }

  return (
    <section className="hero" id="home" ref={root}>
      {/* Background Animated Video */}
      <div className="hero__video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
          poster={STOCK_POSTER_URL}
        >
          <source src={STOCK_VIDEO_URL} type="video/mp4" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero__video-overlay" />
        <div className="hero__grid-overlay" />
      </div>

      {/* Main Hero Content (Left-Aligned) */}
      <div className="hero__content shell">
        <div className="hero__main">
          {/* Kicker */}
          <div
            className="hero__kicker"
            style={{ '--cycle': `${KICKER_CYCLE}ms` }}
            aria-label="Web Platforms, Mobile Apps, Digital Growth"
          >
            <span className="hero__kicker-rail" aria-hidden="true">
              {ready && <i key={kick} className="hero__kicker-fill" />}
            </span>

            <span className="hero__kicker-window" aria-hidden="true">
              {KICKER_WORDS.map((w, i) => {
                const prev = (kick - 1 + total) % total
                const state = i === kick ? 'is-active' : i === prev ? 'is-past' : ''
                return (
                  <span key={w} className={`hero__kicker-word ${state}`}>
                    {w}
                  </span>
                )
              })}
            </span>
          </div>

          <h1 className="hero__title">
            Transforming Ideas Into <br />
            <span className="hero__highlight">High Performance</span> <br />
            Digital Products.
          </h1>

          <p className="hero__desc" ref={introRef}>
            <b>ZK Tech Solutions</b> is the studio founders call when their brand and website need to
            catch up to the business they are building.
          </p>

          <div className="hero__ctas">
            <a
              className="btn split-cta split-cta--primary"
              href="#contact"
              onClick={goToSection('#contact')}
              data-cursor="let's talk"
            >
              <span className="split-cta__label">Start a project</span>
              <span className="split-cta__icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M5 15 15 5M7 5h8v8" />
                </svg>
              </span>
            </a>
            <a
              className="btn split-cta split-cta--secondary"
              href="#work"
              onClick={goToSection('#work')}
              data-cursor="scroll"
            >
              <span className="split-cta__label">See our work</span>
              <span className="split-cta__icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" />
                </svg>
              </span>
            </a>
          </div>

          {/* Service switch: typographic, gliding underline */}
          {/* <div className="hero__pills" ref={pillsRef} onMouseLeave={() => setPillHold(false)}>
            <div className="hero__pills-track">
              <span className="hero__pills-glide" aria-hidden="true" />
              {heroWords.map((w, i) => (
                <span
                  key={w.label}
                  className={`hero__pill${i === pill ? ' is-active' : ''}`}
                  onMouseEnter={() => {
                    setPillHold(true)
                    setPill(i)
                  }}
                >
                  {w.label}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Ticker marquee */}
      {/* <div className="ticker">
        <Marquee items={heroTicker} speed={55} renderItem={(item) => <span className="ticker__item">{item}</span>} />
      </div> */}
    </section>
  )
}
