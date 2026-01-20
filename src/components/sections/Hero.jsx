import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export function Hero({ isVisible, onGetStarted }) {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  
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
  
  const title = "The Future of Finance"
  const words = title.split(' ')
  
  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Premium Financial Solutions
        </div>
        
        <h1 ref={titleRef} className="hero-title">
          {words.map((word, i) => (
            <span key={i} className="word-wrapper">
              <span className="word">{word}</span>
            </span>
          ))}
        </h1>
        
        <p ref={subtitleRef} className="hero-subtitle">
          Experience next-generation wealth management with cutting-edge technology
          and personalized strategies designed for the modern investor.
        </p>
        
        <div ref={ctaRef} className="hero-cta">
          <button className="btn btn-primary" onClick={onGetStarted}>
            Get Started
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn-secondary">
            Learn More
          </button>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
