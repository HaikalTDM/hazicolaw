import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import People from './components/Partners.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import PreviewBadge from './components/PreviewBadge.jsx'
import { BriefProvider, BriefDock } from './components/BriefCart.jsx'
import { useReducedMotion } from './hooks/useReducedMotion.js'

function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const [assetsReady, setAssetsReady] = useState(false)
  const [stageReady, setStageReady] = useState(false)
  const [loaderDone, setLoaderDone] = useState(false)

  // Body scroll stays locked until the loader has fully revealed, on every
  // path including reduced motion and unmount.
  useBodyLock(!loaderDone)

  // The hero copy is held back while the curtain covers it, so it can play
  // its entrance once the reveal is done instead of appearing early and then
  // restarting. The timeout is a backstop in case a script never lands.
  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.add('is-revealing')
    const safety = window.setTimeout(() => root.classList.remove('is-revealing'), 6000)
    return () => {
      window.clearTimeout(safety)
      root.classList.remove('is-revealing')
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const ready = () => {
      if (!cancelled) setAssetsReady(true)
    }
    if (document.readyState === 'complete') {
      ready()
    } else {
      window.addEventListener('load', ready, { once: true })
      // Safety: never hold the loader hostage to a slow asset.
      const fallback = window.setTimeout(ready, 2500)
      return () => {
        cancelled = true
        window.clearTimeout(fallback)
        window.removeEventListener('load', ready)
      }
    }
    return () => {
      cancelled = true
      window.removeEventListener('load', ready)
    }
  }, [])

  // Stage work runs as the curtain starts to lift, so the pinned sections
  // are built while the screen is still covered and the page never visibly
  // grows or shifts. `loaderDone` marks the reveal itself being over.
  const handleLoaderReveal = useCallback(() => setStageReady(true), [])
  const handleLoaderDone = useCallback(() => setLoaderDone(true), [])

  // Lenis smooth scroll drives the page. GSAP's ticker drives Lenis and
  // ScrollTrigger.update fires on every Lenis scroll, so the pinned/scrubbed
  // sections move on the same frame as the scroll position (a second rAF
  // loop here is what makes pinned content look jittery).
  useEffect(() => {
    if (reducedMotion) return undefined
    let cancelled = false
    let lenis
    let gsapRef
    let ticker
    let heightWatcher

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        gsapRef = gsap

        lenis = new Lenis({
          duration: 1.1,
          smoothWheel: true,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        lenis.on('scroll', ScrollTrigger.update)
        ticker = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(ticker)
        // Let Lenis own the frame clock instead of GSAP chasing a stalled one.
        gsap.ticker.lagSmoothing(0)

        // Lenis caches the page height (and so its maximum scroll). Content
        // that arrives later (the lazy map iframe, images, the reveals) makes
        // the page taller than that cache, which left the last screenful
        // unreachable until a window resize. Re-measure when the document
        // height actually changes.
        heightWatcher = new ResizeObserver(() => lenis.resize())
        heightWatcher.observe(document.body)
      }
    )

    return () => {
      cancelled = true
      if (heightWatcher) heightWatcher.disconnect()
      if (lenis) lenis.destroy()
      if (gsapRef && ticker) {
        gsapRef.ticker.remove(ticker)
        gsapRef.ticker.lagSmoothing(500, 33)
      }
    }
  }, [reducedMotion])


  // Scoped GSAP choreography: hero entry and the hero→card→gallery pin,
  // the pinned attorney spotlight, and the footer wordmark shift.
  // Reverts on unmount.
  // Hero copy enters once the curtain has gone.
  useEffect(() => {
    if (!loaderDone) return undefined

    const root = document.documentElement

    if (reducedMotion) {
      root.classList.remove('is-revealing')
      return undefined
    }

    let ctx
    let cancelled = false

    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      ctx = gsap.context(() => {
        gsap.set('[data-hero-line]', { y: 32, opacity: 0 })
        root.classList.remove('is-revealing')
        gsap.to('[data-hero-line]', {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.1,
        })
      })
    })

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [loaderDone, reducedMotion])

  useEffect(() => {
    if (!stageReady || reducedMotion) return undefined

    let ctx
    let cancelled = false
    let refreshLayout

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        // The practice list can change height after load ("See all areas"),
        // which invalidates the pinned hero's measurements. Recalculate when
        // it asks so the pin spacer and the sections below stay in sync.
        refreshLayout = () => ScrollTrigger.refresh()
        window.addEventListener('practice:refresh', refreshLayout)

        ctx = gsap.context(() => {
          // Hero → letterhead card: the stage shrinks and centres while
          // the hero copy fades out and the firm's identity fades in.
          // The pin then releases into the standalone practice section.
          const stage = document.querySelector('.hero__stage')
          const heroContent = document.querySelector('.hero__content')
          const heroRail = document.querySelector('.hero__rail')
          const heroCard = document.querySelector('.hero__card')
          const practiceLayer = document.querySelector('.hero__stage > .practice')

          if (stage && heroCard) {
            const cardMetrics = () => {
              const w = window.innerWidth
              const h = window.innerHeight
              const wide = w >= 900
              const width = wide ? Math.min(w * 0.78, 1180) : w * 0.88
              const height = wide ? Math.min(h * 0.34, 260) : Math.min(h * 0.3, 220)
              return { width, height, x: (w - width) / 2, y: (h - height) / 2 }
            }

            const restore = () => {
              gsap.set(stage, { clearProps: 'width,height,x,y,borderRadius' })
              gsap.set([heroContent, heroRail, heroCard, practiceLayer], {
                clearProps: 'opacity,visibility,transform',
              })
              stage.classList.remove('is-revealed')
            }

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '+=300%',
                scrub: 0.6,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onLeave: () => {
                  stage.classList.add('is-revealed')
                  // The stage grows to auto-height; recalc so the pin-spacer
                  // and everything below it shift down correctly.
                  setTimeout(() => ScrollTrigger.refresh(), 0)
                },
                onEnterBack: () => stage.classList.remove('is-revealed'),
                onLeaveBack: restore,
              },
            })

            tl.fromTo(
              stage,
              {
                // Explicit viewport size, not '100%': the hero section grows
                // to fit the revealed practice section, and a percentage here
                // would resolve against that inflated height so the stage
                // never shrank back after scrolling down and up again.
                width: () => document.documentElement.clientWidth,
                height: () => window.innerHeight,
                x: 0,
                y: 0,
                borderRadius: 0,
              },
              {
                width: () => cardMetrics().width,
                height: () => cardMetrics().height,
                x: () => cardMetrics().x,
                y: () => cardMetrics().y,
                borderRadius: 28,
                ease: 'power2.inOut',
                duration: 0.6,
              },
              0
            )
            tl.to(heroContent, { autoAlpha: 0, ease: 'none', duration: 0.2 }, 0)
            tl.to(heroRail, { autoAlpha: 0, ease: 'none', duration: 0.12 }, 0)
            tl.fromTo(
              heroCard,
              { autoAlpha: 0 },
              { autoAlpha: 1, ease: 'none', duration: 0.25 },
              0.3
            )

            // Phase 2: the card opens back out to full screen. The letterhead
            // rides the growth, then the practice section slides up over it
            // like a page turning. A crossfade left the letterhead ghosted on
            // top of the practice text, so the hand-off is a solid wipe
            // instead: the practice is opaque and covers the letterhead as it
            // rises, so the two are never superimposed.
            const handoffAt = 1.4
            const handoffDuration = 0.3
            tl.to(
              stage,
              {
                width: () => window.innerWidth,
                height: () => window.innerHeight,
                x: 0,
                y: 0,
                borderRadius: 0,
                ease: 'power2.inOut',
                duration: 0.7,
              },
              1.0
            )
            if (practiceLayer) {
              tl.fromTo(
                practiceLayer,
                { autoAlpha: 1, y: () => window.innerHeight },
                {
                  y: 0,
                  ease: 'power2.inOut',
                  duration: handoffDuration,
                },
                handoffAt
              )
            }
          }

          // People: two always-visible cards expand on click (see
          // People/Partners component). No scroll animation here.

          gsap.fromTo(
            '[data-footer-word]',
            { xPercent: -4 },
            {
              xPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        })
      }
    )

    return () => {
      cancelled = true
      if (refreshLayout) window.removeEventListener('practice:refresh', refreshLayout)
      if (ctx) ctx.revert()
    }
  }, [stageReady, reducedMotion])

  // Magnetic CTAs run only for fine pointers with motion allowed.
  useEffect(() => {
    if (reducedMotion) return undefined
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return undefined

    const cleanups = []

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = 14
      const onMove = (event) => {
        const rect = el.getBoundingClientRect()
        const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 2
        el.style.transform = `translate(${dx * strength * 0.4}px, ${dy * strength * 0.4}px)`
      }
      const onLeave = () => {
        el.style.transform = ''
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
        el.style.transform = ''
      })
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [reducedMotion, loaderDone])

  return (
    <BriefProvider>
      <Loader
        loaded={assetsReady}
        reducedMotion={reducedMotion}
        onReveal={handleLoaderReveal}
        onDone={handleLoaderDone}
      />
      <Header />
      <main>
        <Hero />
        <People />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {loaderDone && <PreviewBadge />}
      {loaderDone && <BriefDock />}
    </BriefProvider>
  )
}
