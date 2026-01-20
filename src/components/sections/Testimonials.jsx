import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "NexusFinance has completely transformed how I manage my investments. The AI-powered insights are incredibly accurate.",
    author: "Sarah Chen",
    role: "Portfolio Manager",
    avatar: "SC"
  },
  {
    quote: "The best financial platform I've ever used. The interface is intuitive and the returns speak for themselves.",
    author: "Michael Roberts",
    role: "Private Investor",
    avatar: "MR"
  },
  {
    quote: "Security and transparency are paramount in finance. NexusFinance delivers on both fronts exceptionally well.",
    author: "Emily Watson",
    role: "CFO, TechCorp",
    avatar: "EW"
  }
]

export function Testimonials() {
  const sectionRef = useRef()
  const cardsRef = useRef([])
  
  useEffect(() => {
    const cards = cardsRef.current
    
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
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
    <section ref={sectionRef} className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">
            Trusted by <span className="gold-text">industry leaders</span>
          </h2>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="testimonial-card"
            >
              <div className="quote-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <span className="author-name">{testimonial.author}</span>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
