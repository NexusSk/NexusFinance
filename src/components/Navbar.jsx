import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export function Navbar({ user, onSignInClick, onGetStartedClick, onDashboardClick, onSignOut }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('.user-menu')) {
        setDropdownOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [dropdownOpen])

  const handleMenuItemClick = (tab) => {
    setDropdownOpen(false)
    onDashboardClick(tab)
  }
  
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          <div className="logo-icon">N</div>
          <span>NexusFinance</span>
        </a>
        
        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <a href="#features" className="nav-link">{t.nav.features}</a>
          <a href="#pricing" className="nav-link">{t.nav.pricing}</a>
          <a href="#about" className="nav-link">{t.nav.about}</a>
          <a href="#contact" className="nav-link">{t.nav.contact}</a>
        </div>
        
        <div className="navbar-actions">
          {/* Language Switcher */}
          <button 
            className="language-switcher"
            onClick={toggleLanguage}
            title={language === 'sk' ? 'Switch to English' : 'Prepnúť na slovenčinu'}
          >
            <span className={`lang-flag ${language === 'sk' ? 'active' : ''}`}>🇸🇰</span>
            <span className={`lang-flag ${language === 'en' ? 'active' : ''}`}>🇬🇧</span>
          </button>

          {user ? (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="user-avatar">
                  {user.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user}</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className={`chevron ${dropdownOpen ? 'rotated' : ''}`}
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-avatar large">
                      {user.charAt(0).toUpperCase()}
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-name">{user}</span>
                      <span className="dropdown-email">{t.userMenu.freeAccount}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => handleMenuItemClick('profile')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {t.userMenu.myProfile}
                  </button>
                  <button className="dropdown-item" onClick={() => handleMenuItemClick('dashboard')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {t.userMenu.dashboard}
                  </button>
                  <button className="dropdown-item" onClick={() => handleMenuItemClick('settings')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.896 4.29 19.71C4.10405 19.5243 3.95653 19.3037 3.85588 19.0609C3.75523 18.8181 3.70343 18.5578 3.70343 18.295C3.70343 18.0322 3.75523 17.7719 3.85588 17.5291C3.95653 17.2863 4.10405 17.0657 4.29 16.88L4.35 16.82C4.58054 16.5843 4.73519 16.285 4.794 15.9606C4.85282 15.6362 4.81312 15.3016 4.68 15C4.55324 14.7042 4.34276 14.452 4.07447 14.2743C3.80618 14.0966 3.49179 14.0013 3.17 14H3C2.46957 14 1.96086 13.7893 1.58579 13.4142C1.21071 13.0391 1 12.5304 1 12C1 11.4696 1.21071 10.9609 1.58579 10.5858C1.96086 10.2107 2.46957 10 3 10H3.09C3.42099 9.99229 3.742 9.88512 4.0113 9.69251C4.28059 9.4999 4.48572 9.23074 4.6 8.92C4.73312 8.61838 4.77282 8.28381 4.714 7.95941C4.65519 7.63502 4.50054 7.33568 4.27 7.1L4.21 7.04C4.02405 6.85425 3.87653 6.63368 3.77588 6.39088C3.67523 6.14808 3.62343 5.88783 3.62343 5.625C3.62343 5.36217 3.67523 5.10192 3.77588 4.85912C3.87653 4.61632 4.02405 4.39575 4.21 4.21C4.39575 4.02405 4.61632 3.87653 4.85912 3.77588C5.10192 3.67523 5.36217 3.62343 5.625 3.62343C5.88783 3.62343 6.14808 3.67523 6.39088 3.77588C6.63368 3.87653 6.85425 4.02405 7.04 4.21L7.1 4.27C7.33568 4.50054 7.63502 4.65519 7.95941 4.714C8.28381 4.77282 8.61838 4.73312 8.92 4.6H9C9.29577 4.47324 9.54802 4.26276 9.72569 3.99447C9.90337 3.72618 9.99872 3.41179 10 3.09V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t.userMenu.settings}
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item upgrade" onClick={onGetStartedClick}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t.userMenu.upgradePlan}
                  </button>
                  <button className="dropdown-item signout" onClick={onSignOut}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t.userMenu.signOut}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={onSignInClick}>
                {t.nav.signIn}
              </button>
              <button className="btn btn-primary" onClick={onGetStartedClick}>
                {t.nav.getStarted}
              </button>
            </>
          )}
        </div>
        
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
