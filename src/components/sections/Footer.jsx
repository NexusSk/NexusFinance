import { useLanguage } from '../../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">N</div>
              <span>NexusFinance</span>
            </div>
            <p className="footer-tagline">
              {t.footer.tagline}
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>{t.footer.product}</h4>
              <ul>
                <li><a href="#">{t.footer.features}</a></li>
                <li><a href="#">{t.footer.pricing}</a></li>
                <li><a href="#">{t.footer.security}</a></li>
                <li><a href="#">{t.footer.roadmap}</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>{t.footer.company}</h4>
              <ul>
                <li><a href="#">{t.footer.about}</a></li>
                <li><a href="#">{t.footer.careers}</a></li>
                <li><a href="#">{t.footer.press}</a></li>
                <li><a href="#">{t.footer.contact}</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>{t.footer.resources}</h4>
              <ul>
                <li><a href="#">{t.footer.documentation}</a></li>
                <li><a href="#">{t.footer.blog}</a></li>
                <li><a href="#">{t.footer.support}</a></li>
                <li><a href="#">{t.footer.api}</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>{t.footer.legal}</h4>
              <ul>
                <li><a href="#">{t.footer.privacy}</a></li>
                <li><a href="#">{t.footer.terms}</a></li>
                <li><a href="#">{t.footer.cookies}</a></li>
                <li><a href="#">{t.footer.licenses}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
