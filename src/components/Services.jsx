import { useCallback, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { splitWords } from '../lib/split'
import { getLenis } from '../hooks/useSmoothScroll'
import { services, LIVE } from '../data/site'
import { WorksWheel } from '@/components/ui/works-wheel'

export default function Services() {
  const root = useRef(null)
  const pinRef = useRef(null)
  const wheelRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = splitWords('.services__title', { wordClass: 'w', innerClass: 'wi' })

      gsap.fromTo(
        titleWords,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.25,
          ease: 'zk-expo',
          stagger: 0.05,
          scrollTrigger: { trigger: '.services__head', start: 'top 82%' },
        }
      )

      gsap.fromTo(
        '.services__lead',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'zk-expo',
          scrollTrigger: { trigger: '.services__head', start: 'top 78%' },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const pin = pinRef.current
    if (!pin || !wheelRef.current) return

    const driver = { turn: 0 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tween = gsap.to(driver, {
      turn: services.length,
      ease: 'none',
      onUpdate: () => wheelRef.current?.setTurn(driver.turn, true),
      scrollTrigger: {
        trigger: pin,
        pin,
        start: 'center center',
        end: () => `+=${services.length * window.innerHeight * (window.innerWidth < 700 ? 0.72 : 0.62)}`,
        scrub: reduced ? true : 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinSpacing: true,
        onLeaveBack: () => wheelRef.current?.setTurn(0, true),
      },
    })

    scrollTriggerRef.current = tween.scrollTrigger
    ScrollTrigger.refresh()

    return () => {
      scrollTriggerRef.current = null
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  const handleTurnRequest = useCallback((turn) => {
    const trigger = scrollTriggerRef.current
    if (!trigger) return

    const destination = trigger.start + (turn / services.length) * (trigger.end - trigger.start)
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(destination, { duration: 1.05 })
    else window.scrollTo({ top: destination, behavior: 'smooth' })
  }, [])

  const wheelItems = services.map((service) => ({
    index: service.index,
    title: service.title,
    image: service.image,
    href: service.href,
    description: service.desc,
    target: '_blank',
  }))

  return (
    <section className="section services" id="services" ref={root}>
      <div className="shell">
        <div className="services__head">
          <h2 className="services__title display h2">
            Everything a growing brand needs, under one roof
          </h2>
          <p className="services__lead lead">
            One team for the website, the app, the brand and the growth engine behind them  so nothing
            gets lost between vendors. Hover a service to preview the work.
          </p>
        </div>

        <div className="services-wheel-track">
          <div className="services-wheel-shell" ref={pinRef}>
            <WorksWheel
              ref={wheelRef}
              items={wheelItems}
              label="Services"
              action="Explore"
              className="services-wheel"
              pageScrollDriven
              onTurnRequest={handleTurnRequest}
            />
            {/* <p className="services-wheel__hint mono dim">
              Scroll to explore · arrow keys supported
            </p> */}
          </div>
        </div>

        {/* <p className="services__foot mono dim">
          Need something custom?{' '}
          <a className="tlink" href={`${LIVE}/pages/services.php`} target="_blank" rel="noreferrer">
            See all services →
          </a>
        </p> */}
      </div>
    </section>
  )
}
