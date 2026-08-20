import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    const consent = localStorage.getItem('cookie-consent-accepted');
    if (!consent) {
      // Delay showing the banner for better UX and performance
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent-accepted', 'true');
    setShowBanner(false);
    
    // Update Google Consent Mode v2 if window.gtag exists
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent-accepted', 'false');
    setShowBanner(false);
    // Google consent remains denied (which is the default)
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner-container">
      <div className="cookie-banner-content">
        <p className="cookie-banner-text">
          Utilizamos cookies propias y de terceros para analizar de forma anónima el tráfico de nuestra web y ofrecerte una mejor experiencia. 
          Al hacer clic en "Aceptar todo", consientes el uso de todas las cookies. También puedes elegir "Rechazar" si así lo deseas. 
          Más información en nuestra <a href="/politica-cookies.html" className="cookie-banner-link">Política de Cookies</a>.
        </p>
        <div className="cookie-banner-actions">
          <button onClick={handleReject} className="cookie-btn btn-reject">
            Rechazar
          </button>
          <button onClick={handleAccept} className="cookie-btn btn-accept">
            Aceptar todo
          </button>
        </div>
      </div>

      <style>{`
        .cookie-banner-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          right: 24px;
          background-color: var(--bg-secondary, #0f172a);
          border: 1px solid var(--border-color, #1e293b);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
          border-radius: var(--border-radius-md, 12px);
          padding: 20px 24px;
          z-index: 9999;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cookie-banner-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
        }

        .cookie-banner-text {
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text-secondary, #94a3b8);
          margin: 0;
          text-align: center;
        }

        .cookie-banner-link {
          color: var(--accent-primary, #38bdf8);
          text-decoration: underline;
          font-weight: 500;
        }

        .cookie-banner-actions {
          display: flex;
          gap: 12px;
          width: 100%;
          justify-content: center;
        }

        .cookie-btn {
          padding: 10px 20px;
          border-radius: var(--border-radius-md, 8px);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          flex: 1;
          max-width: 160px;
          text-align: center;
        }

        .btn-reject {
          background-color: transparent;
          border: 1px solid var(--border-color, #1e293b);
          color: var(--text-primary, #f8fafc);
        }

        .btn-reject:hover {
          background-color: var(--bg-tertiary, #1e293b);
          border-color: var(--accent-primary, #38bdf8);
        }

        .btn-accept {
          background-color: var(--accent-primary, #38bdf8);
          color: #ffffff;
        }

        .btn-accept:hover {
          background-color: var(--accent-primary-hover, #0284c7);
          transform: translateY(-1px);
        }

        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (min-width: 768px) {
          .cookie-banner-container {
            bottom: 32px;
            left: 32px;
            right: 32px;
            padding: 24px 32px;
          }

          .cookie-banner-content {
            flex-direction: row;
            gap: 32px;
          }

          .cookie-banner-text {
            text-align: left;
            flex: 1;
          }

          .cookie-banner-actions {
            width: auto;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}
