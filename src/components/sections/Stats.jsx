import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 2.5, suffix: 'B+', label: 'Assets Under Management', prefix: '$' },
  { value: 150, suffix: 'K+', label: 'Active Users', prefix: '' },
  { value: 99.9, suffix: '%', label: 'Uptime Guarantee', prefix: '' },
  { value: 24, suffix: '/7', label: 'Customer Support', prefix: '' }
]

function AnimatedNumber({ value, suffix, prefix, inView }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    if (inView) {
      let start = 0
      const duration = 2000
      const increment = value / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(start)
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [value, inView])
  
  return (
    <span className="stat-value">
      {prefix}{displayValue.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
    </span>
  )
}

export function Stats() {
  const sectionRef = useRef()
  const [inView, setInView] = useState(false)
  
  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => setInView(true),
    })
    
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="stats-section">
      <div className="stats-bg">
        <div className="stats-gradient"></div>
      </div>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <AnimatedNumber
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                inView={inView}
              />
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
