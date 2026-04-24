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

    // Run slightly after mount/pathname change to ensure DOM is updated
    const timeoutId = setTimeout(triggerAnimations, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathname])

  return null
}

