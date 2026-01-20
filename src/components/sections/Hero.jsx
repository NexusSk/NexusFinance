import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useLanguage } from '../../i18n/LanguageContext'

export function Hero({ isVisible, onGetStarted }) {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const { t } = useLanguage()
  
  useEffect(() => {
    if (isVisible) {
      const tl = gsap.timeline()
      
      tl.fromTo(
        titleRef.current.querySelectorAll('.word'),
        { y: 100, opacity: 0, rotationX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out'
        }
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
    }
  }, [isVisible])
  
  const words = t.hero.title.split(' ')
  
  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          {t.hero.badge}
        </div>
        
        <h1 ref={titleRef} className="hero-title">
          {words.map((word, i) => (
            <span key={i} className="word-wrapper">
              <span className="word">{word}</span>
            </span>
          ))}
        </h1>
        
        <p ref={subtitleRef} className="hero-subtitle">
          {t.hero.subtitle}
        </p>
        
        <div ref={ctaRef} className="hero-cta">
          <button className="btn btn-primary" onClick={onGetStarted}>
            {t.hero.cta}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn-secondary">
            {t.hero.learnMore}
          </button>
        </div>
        
        <div className="scroll-indicator">
          <span>{t.hero.scrollToExplore}</span>
          <div className="scroll-line">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
