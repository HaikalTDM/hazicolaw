import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import People from './components/Partners.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import PreviewBadge from './components/PreviewBadge.jsx'
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
  const [loaderDone, setLoaderDone] = useState(false)

  // Body scroll stays locked until the loader has fully revealed, on every
  // path including reduced motion and unmount.
  useBodyLock(!loaderDone)

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

  const handleLoaderDone = useCallback(() => setLoaderDone(true), [])

// Lenis smooth scroll drives the page; GSAP ScrollTrigger syncs to it.
  useEffect(() => {
    if (reducedMotion) return undefined
    let raf
    let lenis
    let cancelled = false
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      const rafLoop = (time) => {
        lenis.raf(time)
        raf = requestAnimationFrame(rafLoop)
      }
      raf = requestAnimationFrame(rafLoop)
    })
    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      if (lenis) lenis.destroy()
    }
  }, [reducedMotion])

  // Scoped GSAP choreography: hero entry and the hero→card→gallery pin,
  // the pinned attorney spotlight, and the footer wordmark shift.
  // Reverts on unmount.
  useEffect(() => {
    if (!loaderDone || reducedMotion) return undefined

    let ctx
    let cancelled = false

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.fromTo(
            '[data-hero-line]',
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              stagger: 0.08,
              delay: 0.1,
            }
          )

          // Hero → card → gallery, one pinned sequence. The stage folds
          // down to a card, holds, then opens back out while the practice
          // layer fades in on top, so the card unfolds into the section
          // instead of into empty walnut.
          const stage = document.querySelector('.hero__stage')
          const heroContent = document.querySelector('.hero__content')
          const heroRail = document.querySelector('.hero__rail')
          const heroRipple = document.querySelector('.ripple')
          const heroCard = document.querySelector('.hero__card')
          const practiceLayer = document.querySelector('.hero__stage .practice')
          const practiceRail = document.querySelector('.practice__rail')
          const practiceTrack = document.querySelector('.practice__track')
          const practiceViewport = document.querySelector('.practice__viewport')
          const meterCurrent = document.querySelector('.practice__meter-current')
          const practiceCards = Array.from(document.querySelectorAll('.practice__card'))
          const practiceTicks = Array.from(document.querySelectorAll('.practice__tick'))
          const areaCount = practiceCards.length

          if (stage && heroCard) {
            const cardMetrics = () => {
              const w = window.innerWidth
              const h = window.innerHeight
              const wide = w >= 900
              const width = wide ? Math.min(w * 0.78, 1180) : w * 0.88
              const height = wide ? Math.min(h * 0.34, 260) : Math.min(h * 0.3, 220)
              return { width, height, x: (w - width) / 2, y: (h - height) / 2 }
            }

            const paint = (progress) => {
              if (areaCount === 0) return
              const step = Math.min(
                areaCount,
                Math.max(1, Math.round(progress * (areaCount - 1)) + 1)
              )
              if (meterCurrent) {
                meterCurrent.textContent = String(step).padStart(2, '0')
              }
              practiceCards.forEach((card, i) =>
                card.classList.toggle('is-active', i === step - 1)
              )
              practiceTicks.forEach((tick, i) =>
                tick.classList.toggle('is-passed', i < step)
              )
            }
            paint(0)

            const distance = () =>
              practiceTrack && practiceViewport
                ? Math.max(0, practiceTrack.scrollWidth - practiceViewport.clientWidth)
                : 0

            const restore = () => {
              gsap.set(stage, { clearProps: 'width,height,x,y,borderRadius' })
              gsap.set([heroContent, heroRail, heroRipple, heroCard], {
                clearProps: 'opacity,visibility',
              })
              if (practiceLayer) {
                gsap.set(practiceLayer, { clearProps: 'opacity,visibility' })
              }
              if (practiceRail) {
                gsap.set(practiceRail, { clearProps: 'opacity,transform' })
              }
              if (practiceTrack) {
                gsap.set(practiceTrack, { clearProps: 'transform' })
              }
              paint(0)
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
                onLeaveBack: restore,
              },
            })

            // Phase 1: the hero folds down into the card.
            tl.fromTo(
              stage,
              { width: '100%', height: '100%', x: 0, y: 0, borderRadius: 0 },
              {
                width: () => cardMetrics().width,
                height: () => cardMetrics().height,
                x: () => cardMetrics().x,
                y: () => cardMetrics().y,
                borderRadius: 28,
                ease: 'power2.inOut',
                duration: 0.7,
              },
              0
            )
            tl.to(heroContent, { autoAlpha: 0, ease: 'none', duration: 0.25 }, 0)
            tl.to(heroRail, { autoAlpha: 0, ease: 'none', duration: 0.15 }, 0)
            tl.to(heroRipple, { autoAlpha: 0, ease: 'none', duration: 0.25 }, 0)
            tl.fromTo(
              heroCard,
              { autoAlpha: 0 },
              { autoAlpha: 1, ease: 'none', duration: 0.3 },
              0.35
            )

            // Phase 2: the card opens out and the gallery materialises
            // inside it, sharing the stage's walnut field.
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
            tl.to(heroCard, { autoAlpha: 0, ease: 'none', duration: 0.4 }, 1.0)
            if (practiceLayer) {
              tl.fromTo(
                practiceLayer,
                { autoAlpha: 0 },
                { autoAlpha: 1, ease: 'none', duration: 0.55 },
                1.15
              )
            }
            if (practiceRail) {
              tl.fromTo(
                practiceRail,
                { y: 22, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, ease: 'power2.out', duration: 0.5 },
                1.2
              )
            }

            // Phase 3: the gallery scrubs sideways.
            if (practiceTrack && practiceViewport && areaCount > 0) {
              const trackTween = gsap.to(practiceTrack, {
                x: () => -distance(),
                ease: 'none',
                duration: 1.2,
                onUpdate: () => paint(trackTween.progress()),
              })
              tl.add(trackTween, 1.8)
            }
          }

          // People: three scroll beats inside one pin, the pair, then
          // the left portrait enlarged with its details on the right,
          // then the right portrait enlarged with its details on the
          // left, then back to the pair.
          const people = document.querySelector('.people')
          const mediaA = document.querySelector('[data-media="a"]')
          const mediaB = document.querySelector('[data-media="b"]')
          const detailA = document.querySelector('[data-detail="a"]')
          const detailB = document.querySelector('[data-detail="b"]')
          const portraitA = mediaA ? mediaA.querySelector('.people__portrait') : null
          const portraitB = mediaB ? mediaB.querySelector('.people__portrait') : null

          if (
            window.matchMedia('(min-width: 900px)').matches &&
            people &&
            mediaA &&
            mediaB &&
            detailA &&
            detailB &&
            portraitA &&
            portraitB
          ) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: people,
                start: 'top top',
                end: '+=300%',
                pin: true,
                pinSpacing: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })

            // Beat 1: left grows, its details arrive on the right.
            tl.to(portraitA, { scale: 1.18, ease: 'power2.inOut', duration: 0.5 }, 0.35)
            tl.to(mediaB, { opacity: 0, ease: 'power2.inOut', duration: 0.5 }, 0.35)
            tl.fromTo(
              detailA,
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.45 },
              0.5
            )

            // Beat 2: right takes over, its details arrive on the left.
            tl.to(detailA, { autoAlpha: 0, y: -18, ease: 'power2.in', duration: 0.3 }, 1.15)
            tl.to(mediaA, { opacity: 0, ease: 'power2.inOut', duration: 0.5 }, 1.25)
            tl.to(portraitA, { scale: 1, ease: 'power2.inOut', duration: 0.5 }, 1.25)
            tl.to(portraitB, { scale: 1.18, ease: 'power2.inOut', duration: 0.5 }, 1.25)
            tl.to(mediaB, { opacity: 1, ease: 'power2.inOut', duration: 0.5 }, 1.25)
            tl.fromTo(
              detailB,
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.45 },
              1.4
            )

            // Beat 3: back to the pair.
            tl.to(detailB, { autoAlpha: 0, y: -18, ease: 'power2.in', duration: 0.3 }, 2.15)
            tl.to(mediaA, { opacity: 1, ease: 'power2.inOut', duration: 0.5 }, 2.25)
            tl.to(portraitB, { scale: 1, ease: 'power2.inOut', duration: 0.5 }, 2.25)
          }

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
      if (ctx) ctx.revert()
    }
  }, [loaderDone, reducedMotion])

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
    <>
      {!loaderDone && (
        <Loader loaded={assetsReady} reducedMotion={reducedMotion} onDone={handleLoaderDone} />
      )}
      <Header />
      <main>
        <Hero />
        <People />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {loaderDone && <PreviewBadge />}
    </>
  )
}
