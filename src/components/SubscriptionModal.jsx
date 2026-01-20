import { useState, useEffect } from 'react'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'Perfect for beginners exploring investment',
    features: [
      'Basic portfolio tracking',
      'Market news feed',
      '5 watchlist slots',
      'Email support',
      'Mobile app access'
    ],
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    period: 'month',
    description: 'For serious investors seeking growth',
    features: [
      'Advanced analytics dashboard',
      'Real-time market data',
      'Unlimited watchlists',
      'AI-powered insights',
      'Priority support',
      'API access',
      'Custom alerts'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    description: 'Full suite for professional traders',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'Advanced risk analytics',
      'Team collaboration tools',
      'Compliance reporting',
      'SLA guarantee'
    ],
    popular: false
  }
]

export function SubscriptionModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  const handleSubscribe = (planId) => {
    alert(`Thank you for choosing the ${plans.find(p => p.id === planId).name} plan! This is a demo - no payment will be processed.`)
    handleClose()
  }

  const getPrice = (basePrice) => {
    if (billingCycle === 'yearly') {
      return Math.round(basePrice * 0.8) // 20% discount for yearly
    }
    return basePrice
  }

  if (!isOpen && !isClosing) return null

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className={`modal-content subscription-modal ${isClosing ? 'closing' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="subscription-header">
          <h2>Choose Your Plan</h2>
          <p>Select the perfect plan to accelerate your financial journey</p>
          
          <div className="billing-toggle">
            <button 
              className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <span className="save-badge">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{getPrice(plan.price)}</span>
                <span className="period">/{billingCycle === 'yearly' ? 'mo' : 'month'}</span>
              </div>

              {billingCycle === 'yearly' && (
                <p className="yearly-total">
                  Billed ${getPrice(plan.price) * 12}/year
                </p>
              )}

              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-full`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSubscribe(plan.id)
                }}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        <div className="subscription-footer">
          <div className="guarantee">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>30-day money-back guarantee</span>
          </div>
          <div className="guarantee">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Secure payment processing</span>
          </div>
          <div className="guarantee">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}
