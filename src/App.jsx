import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from './i18n/LanguageContext'
import { Scene } from './components/Scene'
import { Navbar } from './components/Navbar'
import { SignInModal } from './components/SignInModal'
import { SubscriptionModal } from './components/SubscriptionModal'
import { DashboardModal } from './components/DashboardModal'
import { Hero } from './components/sections/Hero'
import { Features } from './components/sections/Features'
import { Stats } from './components/sections/Stats'
import { Testimonials } from './components/sections/Testimonials'
import { CTA } from './components/sections/CTA'
import { Footer } from './components/sections/Footer'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [phase, setPhase] = useState('intro')
  const [heroVisible, setHeroVisible] = useState(false)
  const { t } = useLanguage()
  
  // User and modal states
  const [user, setUser] = useState(null)
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false)
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false)
  const [dashboardTab, setDashboardTab] = useState('dashboard')
  
  const handleSignIn = (name) => {
    setUser(name)
  }

  const handleSignOut = () => {
    setUser(null)
  }

  const handleDashboardClick = (tab) => {
    setDashboardTab(tab)
    setDashboardModalOpen(true)
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true)
    }, 500)
    
    const sections = {
      intro: { start: 0, end: 0.15 },
      rotate: { start: 0.15, end: 0.35 },
      toss: { start: 0.35, end: 0.55 },
      land: { start: 0.55, end: 0.7 },
    }
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '70% top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        setScrollProgress(progress)
        
        if (progress < sections.intro.end) {
          setPhase('intro')
        } else if (progress < sections.rotate.end) {
          setPhase('rotate')
          const rotateProgress = (progress - sections.rotate.start) / (sections.rotate.end - sections.rotate.start)
          setScrollProgress(rotateProgress)
        } else if (progress < sections.toss.end) {
          setPhase('toss')
          const tossProgress = (progress - sections.toss.start) / (sections.toss.end - sections.toss.start)
          setScrollProgress(tossProgress)
        } else {
          setPhase('land')
          const landProgress = (progress - sections.land.start) / (sections.land.end - sections.land.start)
          setScrollProgress(Math.min(landProgress, 1))
        }
      }
    })
    
    const phases = document.querySelectorAll('.phase-text')
    phases.forEach((phase) => {
      gsap.fromTo(
        phase,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: phase,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
    })
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div ref={containerRef} className="app">
      <Navbar 
        user={user}
        onSignInClick={() => setSignInModalOpen(true)}
        onGetStartedClick={() => setSubscriptionModalOpen(true)}
        onDashboardClick={handleDashboardClick}
        onSignOut={handleSignOut}
      />
      
      <SignInModal 
        isOpen={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />
      <SubscriptionModal 
        isOpen={subscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
      />
      <DashboardModal 
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        user={user}
        initialTab={dashboardTab}
      />
      
      <div className="scene-container">
        <Scene scrollProgress={scrollProgress} phase={phase} />
      </div>
      
      <div className="scroll-content">
        <section className="scroll-section hero-scroll">
          <Hero isVisible={heroVisible} onGetStarted={() => setSubscriptionModalOpen(true)} />
        </section>
        
        <section className="scroll-section rotate-scroll">
          <div className="phase-content">
            <p className="phase-text phase-subtitle">{t.phases.rotate.subtitle}</p>
            <h2 className="phase-text phase-title">{t.phases.rotate.title}</h2>
            <p className="phase-text phase-description">{t.phases.rotate.description}</p>
          </div>
        </section>
        
        <section className="scroll-section toss-scroll">
          <div className="phase-content">
            <p className="phase-text phase-subtitle">{t.phases.toss.subtitle}</p>
            <h2 className="phase-text phase-title">{t.phases.toss.title}</h2>
            <p className="phase-text phase-description">{t.phases.toss.description}</p>
          </div>
        </section>
        
        <section className="scroll-section land-scroll">
          <div className="phase-content">
            <p className="phase-text phase-subtitle">{t.phases.land.subtitle}</p>
            <h2 className="phase-text phase-title">{t.phases.land.title}</h2>
            <p className="phase-text phase-description">{t.phases.land.description}</p>
          </div>
        </section>
      </div>
      
      <div className="main-content">
        <Features />
        <Stats />
        <Testimonials />
        <CTA onGetStarted={() => setSubscriptionModalOpen(true)} />
        <Footer />
      </div>
    </div>
  )
}

export default App
