'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ClientAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    // Reveal text animation for elements with data-reveal attribute
    const triggerAnimations = () => {
      const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]')
      
      revealElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible')
        }, index * 100)
      })

      // Intersection Observer for scroll animations
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      const animatedElements = document.querySelectorAll('.animate-on-scroll')
      animatedElements.forEach(el => observer.observe(el))
    }

    // Scroll Progress Bar
    const updateScrollProgress = () => {
      const scrollProgress = document.querySelector<HTMLElement>('.scroll-progress')
      if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = (window.scrollY / totalHeight) * 100
        scrollProgress.style.width = `${progress}%`
      }
    }

    // Magnetic Elements (Buttons and Text)
    const handleMagnetic = (e: MouseEvent) => {
      const magnetics = document.querySelectorAll<HTMLElement>('.btn-magnetic, .magnetic-text')
      magnetics.forEach(target => {
        const rect = target.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        const dist = Math.sqrt(x * x + y * y)
        const threshold = target.classList.contains('magnetic-text') ? 150 : 100
        const power = target.classList.contains('magnetic-text') ? 0.15 : 0.3
        
        if (dist < threshold) {
          target.style.transform = `translate(${x * power}px, ${y * power}px)`
        } else {
          target.style.transform = ''
        }
      })

      // Spotlight Movement
      const spotlights = document.querySelectorAll<HTMLElement>('.spotlight')
      spotlights.forEach(spotlight => {
        const container = spotlight.parentElement
        if (container) {
          const rect = container.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          spotlight.style.left = `${x}px`
          spotlight.style.top = `${y}px`
        }
      })
    }

    // Parallax Effect
    const handleScroll = () => {
      updateScrollProgress()
      const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]')
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.05')
        const rect = el.getBoundingClientRect()
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        
        if (scrollPercent >= 0 && scrollPercent <= 1) {
          const yPos = (scrollPercent - 0.5) * 100 * speed
          el.style.setProperty('--parallax-y', `${yPos}%`)
          el.style.transform = `translateY(var(--parallax-y, 0))`
        }
      })
    }

    // Run slightly after mount/pathname change to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      triggerAnimations()
      handleScroll()
    }, 100)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMagnetic)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMagnetic)
    }
  }, [pathname])

  return <div className="scroll-progress" />
}

