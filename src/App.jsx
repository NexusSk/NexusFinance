import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    // Initial animation - show hero after short delay
    const timer = setTimeout(() => {
      setHeroVisible(true)
    }, 500)
    
    // Create scroll-triggered phases
    const sections = {
      intro: { start: 0, end: 0.15 },
      rotate: { start: 0.15, end: 0.35 },
      toss: { start: 0.35, end: 0.55 },
      land: { start: 0.55, end: 0.7 },
    }
    
    // Main scroll trigger for 3D scene
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '70% top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        setScrollProgress(progress)
        
        // Determine current phase
        if (progress < sections.intro.end) {
          setPhase('intro')
        } else if (progress < sections.rotate.end) {
          setPhase('rotate')
          // Normalize progress for rotate phase
          const rotateProgress = (progress - sections.rotate.start) / (sections.rotate.end - sections.rotate.start)
          setScrollProgress(rotateProgress)
        } else if (progress < sections.toss.end) {
          setPhase('toss')
          // Normalize progress for toss phase
          const tossProgress = (progress - sections.toss.start) / (sections.toss.end - sections.toss.start)
          setScrollProgress(tossProgress)
        } else {
          setPhase('land')
          const landProgress = (progress - sections.land.start) / (sections.land.end - sections.land.start)
          setScrollProgress(Math.min(landProgress, 1))
        }
      }
    })
    
    // Phase indicator texts
    const phases = document.querySelectorAll('.phase-text')
    phases.forEach((phase, index) => {
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
      
      {/* Modals */}
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
      
      {/* Fixed 3D Scene */}
      <div className="scene-container">
        <Scene scrollProgress={scrollProgress} phase={phase} />
      </div>
      
      {/* Scroll Sections */}
      <div className="scroll-content">
        {/* Hero Section with 3D Coin */}
        <section className="scroll-section hero-scroll">
          <Hero isVisible={heroVisible} onGetStarted={() => setSubscriptionModalOpen(true)} />
        </section>
        
        {/* Rotation Phase */}
        <section className="scroll-section rotate-scroll">
          <div className="phase-content">
            <p className="phase-text phase-subtitle">Watch the coin spin</p>
            <h2 className="phase-text phase-title">Precision in Motion</h2>
            <p className="phase-text phase-description">
              Every rotation represents our commitment to accurate, real-time market analysis.
            </p>
          </div>
        </section>
        
        {/* Toss Phase */}
        <section className="scroll-section toss-scroll">
          <div className="phase-content">
            <p className="phase-text phase-subtitle">The coin rises</p>
            <h2 className="phase-text phase-title">Elevate Your Portfolio</h2>
            <p className="phase-text phase-description">
              Take your investments to new heights with our cutting-edge strategies.
            </p>
          </div>
        </section>
        
        {/* Landing Phase */}
        <section className="scroll-section land-scroll">
          <div className="phase-content">
            <p className="phase-text phase-subtitle">A perfect landing</p>
            <h2 className="phase-text phase-title">Secure Returns</h2>
            <p className="phase-text phase-description">
              Land on the winning side with our proven track record of success.
            </p>
          </div>
        </section>
      </div>
      
      {/* Regular Content Sections */}
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
