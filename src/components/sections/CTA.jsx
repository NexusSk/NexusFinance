import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTA({ onGetStarted }) {
  const sectionRef = useRef()
  const contentRef = useRef()
  
  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    )
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-bg">
        <div className="cta-gradient-1"></div>
        <div className="cta-gradient-2"></div>
        <div className="cta-grid-pattern"></div>
      </div>
      <div className="container">
        <div ref={contentRef} className="cta-content">
          <h2 className="cta-title">
            Ready to transform your <span className="gold-text">financial future</span>?
          </h2>
          <p className="cta-subtitle">
            Join thousands of investors who have already discovered the power of NexusFinance.
            Start your journey today with a free account.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large" onClick={onGetStarted}>
              Start Free Trial
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn btn-outline btn-large">
              Schedule Demo
            </button>
          </div>
          <p className="cta-note">No credit card required. Cancel anytime.</p>
        </div>
      </div>
    </section>
  )
}
