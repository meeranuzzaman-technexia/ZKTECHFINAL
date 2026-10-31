import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger } from './lib/gsap'
import useSmoothScroll, { scrollToTarget } from './hooks/useSmoothScroll'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import WorkPanel from './components/WorkPanel'
import Services from './components/Services'
import Process from './components/Process'
import Awards from './components/Awards'
import Proof from './components/Proof'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { ToTop } from './components/Utilities'
import ThemeToggle from './components/ThemeToggle'

const THEME_STORAGE_KEY = 'zk-theme-preference-v4'

function getInitialTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#050505' : '#f7f7f7')
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // The theme still works when storage is unavailable.
    }
  }, [theme])

  useSmoothScroll()

  /* lock the page while the loader runs, then hand over to the hero intro */
  useEffect(() => {
    document.body.classList.add('is-locked')
    window.scrollTo(0, 0)
  }, [])

  /* deep link support (#contact etc.): the preloader locks the body while it
     runs, so a hash scroll fired on mount gets swallowed. Wait until `ready`
     (loader done + body unlocked), glide to the target with Lenis, then keep
     re-aiming while lazy images / fonts shift the layout — and hard-land once
     everything has settled, unless the user takes over scrolling. */
  useEffect(() => {
    if (!ready) return
    const hash = window.location.hash
    if (!hash) return

    const findEl = () => {
      try {
        return document.querySelector(hash)
      } catch {
        return null
      }
    }
    if (!findEl()) return

    let userTookOver = false
    const events = ['wheel', 'touchstart', 'keydown']
    const mark = () => {
      userTookOver = true
    }
    events.forEach((ev) => window.addEventListener(ev, mark, { passive: true, once: true }))

    const glide = (duration) => scrollToTarget(hash, { duration })
    const first = window.setTimeout(() => glide(1.4), 400)

    const interval = window.setInterval(() => {
      if (userTookOver) {
        window.clearInterval(interval)
        return
      }
      const el = findEl()
      if (!el) return
      if (Math.abs(el.getBoundingClientRect().top) < 120) {
        window.clearInterval(interval)
        return
      }
      glide(0.9)
    }, 700)

    const settle = window.setTimeout(() => {
      window.clearInterval(interval)
      if (userTookOver) return
      const el = findEl()
      if (!el) return
      if (Math.abs(el.getBoundingClientRect().top) > 120) {
        scrollToTarget(hash, { immediate: true })
      }
    }, 6000)

    return () => {
      window.clearTimeout(first)
      window.clearTimeout(settle)
      window.clearInterval(interval)
      events.forEach((ev) => window.removeEventListener(ev, mark))
    }
  }, [ready])

  const handleLoaded = useCallback(() => {
    document.body.classList.remove('is-locked')
    setReady(true)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    window.setTimeout(() => ScrollTrigger.refresh(), 900)
  }, [])

  useEffect(() => {
    /* re-measure on resize / font swap */
    const onChange = () => ScrollTrigger.refresh()
    window.addEventListener('load', onChange)
    return () => window.removeEventListener('load', onChange)
  }, [])

  /* soft fade-in of the whole document once mounted */
  useEffect(() => {
    gsap.fromTo('#root', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
  }, [])

  return (
    <>
      <Preloader onDone={handleLoaded} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      {/* <ScrollProgress /> */}
      <Nav />
      <Hero/>
      <Manifesto/>
       <WorkPanel/>
       <Services/>
       <Process/>
        <Awards/>
        <Proof/>
        <CTA/>
      <Footer />
      <ToTop />
      <ThemeToggle theme={theme} onToggle={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} />
    </>
  )
}
