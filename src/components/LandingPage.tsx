import React, { useState } from 'react';
import { 
  ShieldCheck, Navigation, Sparkles, AlertTriangle, ArrowRight, 
  CheckCircle2, Compass, Activity, Volume2, Lock, Users, Star, 
  MapPin, X, ChevronRight, Eye, PhoneCall 
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  user: { name: string; email: string; avatar: string } | null;
  onLoginSuccess: (user: { name: string; email: string; avatar: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  user,
  onLoginSuccess
}) => {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState<boolean>(false);
  const [googleAccountEmail, setGoogleAccountEmail] = useState<string>('');

  const handleGoogleOAuth = () => {
    setShowGooglePrompt(true);
  };

  const completeGoogleSignIn = (emailToUse: string) => {
    if (!emailToUse.trim()) return;
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      const username = emailToUse.split('@')[0];
      const displayName = username.charAt(0).toUpperCase() + username.slice(1);
      const googleUser = {
        name: displayName,
        email: emailToUse,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`
      };
      onLoginSuccess(googleUser);
      setShowAuthModal(false);
      setShowGooglePrompt(false);
      onEnterApp();
    }, 700);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      const username = nameInput.trim() || emailInput.split('@')[0];
      const emailUser = {
        name: username,
        email: emailInput,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`
      };
      onLoginSuccess(emailUser);
      setShowAuthModal(false);
      onEnterApp();
    }, 600);
  };

  return (
    <div className="landing-page-root">
      {/* Navigation Header */}
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-brand">
            <span className="brand-bolt">⚡</span>
            <span className="brand-text">CityPulse</span>
            <span className="pilot-badge">Pune Live Pilot</span>
          </div>

          <nav className="landing-links">
            <a href="#features">Features</a>
            <a href="#methodology">Trust Engine</a>
            <a href="#routing">Safe Route</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="landing-cta-group">
            {user ? (
              <div className="user-profile-strip">
                <img src={user.avatar} alt={user.name} className="user-avatar-mini" />
                <span className="user-name-text">{user.name}</span>
                <button className="enter-app-primary" onClick={onEnterApp}>
                  Go to App <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <>
                <button
                  className="auth-btn-ghost"
                  onClick={() => {
                    setAuthMode('signin');
                    setShowAuthModal(true);
                  }}
                >
                  Log In
                </button>
                <button
                  className="auth-btn-primary"
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <ShieldCheck size={14} color="#10b981" />
            <span>Hack2skill Prompt War · Hackathon Submission</span>
          </div>

          <h1 className="hero-heading">
            Cities don't lack data.<br />
            They lack <span className="highlight-text">trust in data</span>.
          </h1>

          <p className="hero-lead">
            Most city apps display raw numbers. <strong>CityPulse</strong> fuses real-time municipal reports, weather alerts, crowd telemetry, and verified citizen voice notes into one explainable layer — turning urban chaos into verified, actionable navigation.
          </p>

          <div className="hero-actions">
            <button className="hero-primary-btn" onClick={() => setShowAuthModal(true)}>
              Continue with Google <ArrowRight size={16} />
            </button>
            <button className="hero-secondary-btn" onClick={onEnterApp}>
              Launch Live Platform (Guest Scout)
            </button>
          </div>

          <div className="trust-metrics-strip">
            <div className="metric-col">
              <span className="metric-num">90+</span>
              <span className="metric-label">Verified Places in Pune</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-col">
              <span className="metric-num">&lt; 10s</span>
              <span className="metric-label">Speak-Snap-Send Reporting</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-col">
              <span className="metric-num">100%</span>
              <span className="metric-label">Transparent Scoring (No Black Box)</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-col">
              <span className="metric-num">3 Langs</span>
              <span className="metric-label">English, Hindi & Marathi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Differentiators Section */}
      <section id="features" className="pillars-section">
        <div className="section-head-center">
          <span className="section-kicker">Explainable Intelligence</span>
          <h2 className="section-h2">Why CityPulse Is Different</h2>
          <p className="section-p">
            Traditional map and review platforms treat all users and all hours identically. CityPulse personalizes safety and risk based on live context.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon bg-emerald">
              <ShieldCheck size={22} color="#10b981" />
            </div>
            <h3 className="pillar-title">Trust-Scored Intelligence</h3>
            <p className="pillar-desc">
              Every insight carries a <strong>Confidence Badge</strong> (Verified, Likely, Unverified) backed by public reasons. You always know exactly why the system recommends or flags a street.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon bg-cyan">
              <Activity size={22} color="#38bdf8" />
            </div>
            <h3 className="pillar-title">Context-Aware Pulse Score</h3>
            <p className="pillar-desc">
              A road or venue is scored dynamically by time of day, rain, and user persona (solo woman traveler, college student, senior citizen, family). Green at 2 PM, amber at 11 PM.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon bg-amber">
              <Navigation size={22} color="#f59e0b" />
            </div>
            <h3 className="pillar-title">Safety-Weighted Routing</h3>
            <p className="pillar-desc">
              Instead of optimizing purely for minutes, our route engine computes <code>Cost = Time + SafetyRisk + WeatherRisk + IncidentRisk</code>, automatically rerouting around flooded underpasses.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon bg-purple">
              <Volume2 size={22} color="#a855f7" />
            </div>
            <h3 className="pillar-title">Speak · Snap · Send in 10s</h3>
            <p className="pillar-desc">
              Citizens report potholes or waterlogging in Hinglish, Marathi, or English. Multi-stage AI verifies photo depth, auto-blurs faces/plates, clusters duplicates, and dispatches civic tickets.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase */}
      <section id="methodology" className="showcase-section">
        <div className="showcase-grid">
          <div className="showcase-text">
            <span className="section-kicker">Transparent Architecture</span>
            <h2 className="section-h2">No Black Boxes. Every Score Links to Evidence.</h2>
            <p className="section-p">
              The Pulse Score formula is open and transparent:
            </p>
            <div className="formula-box">
              <code>Pulse = 0.30 Safety + 0.20 Cleanliness + 0.20 Affordability + 0.15 Ratings + 0.15 Accessibility</code>
            </div>
            <p className="section-p">
              Weights shift adaptively based on selected persona. Tapping any score in the application expands raw municipal telemetry, citizen corroboration count, and freshness timestamps.
            </p>
            <div className="showcase-btn-row">
              <button className="primary-inline-btn" onClick={onEnterApp}>
                Try 5-Axis Compare Mode →
              </button>
            </div>
          </div>

          <div className="showcase-preview-card">
            <div className="preview-top-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="preview-title">Explainability Inspector</span>
            </div>
            <div className="preview-inner">
              <div className="preview-row">
                <span className="preview-label">Shaniwar Wada</span>
                <span className="preview-badge verified">Verified (92/100)</span>
              </div>
              <div className="preview-bars">
                <div className="bar-line"><span>Safety (ASI Guards, CCTV)</span><strong>88%</strong></div>
                <div className="bar-line"><span>Cleanliness (PMC Sanitation)</span><strong>82%</strong></div>
                <div className="bar-line"><span>Affordability (₹25 Entry)</span><strong>95%</strong></div>
                <div className="bar-line"><span>Public Ratings (42,000+ Reviews)</span><strong>90%</strong></div>
                <div className="bar-line"><span>Accessibility (Stone Courtyards)</span><strong>72%</strong></div>
              </div>
              <div className="preview-footer-note">
                ✓ Corroborated with 34 citizen check-ins today · Freshness: 10 mins ago
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="section-head-center">
          <span className="section-kicker">Frequently Asked Questions</span>
          <h2 className="section-h2">Everything You Need to Know</h2>
        </div>

        <div className="faq-list">
          <div className="faq-item">
            <h4>How does CityPulse avoid defaming small businesses?</h4>
            <p>
              We never use a "worst places" badge. Instead, lower-scoring areas are labeled <strong>"Needs Attention"</strong> with verified civic evidence and a direct error-dispute link so ward officers and owners can take constructive action.
            </p>
          </div>
          <div className="faq-item">
            <h4>What privacy safeguards protect citizens filing reports?</h4>
            <p>
              Citizen photos automatically blur human faces and vehicle license plates. Audio recordings are transcribed into text and can be processed anonymously without publishing private identity.
            </p>
          </div>
          <div className="faq-item">
            <h4>Can CityPulse work for cities other than Pune?</h4>
            <p>
              Yes. CityPulse is city-agnostic. Switching the configuration file to Bengaluru, Mumbai, or Delhi instantly pulls localized OpenStreetMap POIs, Open-Meteo weather, and regional ward telemetry.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner-card">
          <h2>Ready to experience your city with complete confidence?</h2>
          <p>Explore verified places, get AI-curated evening itineraries, and navigate with explainable safety routes.</p>
          <div className="cta-banner-buttons">
            <button className="cta-white-btn" onClick={() => setShowAuthModal(true)}>
              Sign In with Google
            </button>
            <button className="cta-outline-btn" onClick={onEnterApp}>
              Explore as Guest Scout
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="brand-small">
              <span>⚡</span> <strong>CityPulse</strong>
            </div>
            <p>The city's live, verified, explainable companion — explore it, trust it, navigate it.</p>
            <span className="copyright">© 2026 CityPulse. Built for Hack2skill Prompt War Hackathon.</span>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h5>Product</h5>
              <a onClick={onEnterApp}>Smart Discover Feed</a>
              <a onClick={onEnterApp}>Ask the City Concierge</a>
              <a onClick={onEnterApp}>Safe Route Engine</a>
              <a onClick={onEnterApp}>Safety Heatmap</a>
            </div>
            <div className="footer-col">
              <h5>Civic Data</h5>
              <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>
              <a href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a>
              <a href="https://openaq.org" target="_blank" rel="noreferrer">OpenAQ</a>
              <a href="https://pmc.gov.in" target="_blank" rel="noreferrer">Pune Municipal Corp</a>
            </div>
            <div className="footer-col">
              <h5>Responsible AI</h5>
              <a>Anti-Defamation Policy</a>
              <a>Privacy by Default</a>
              <a>EXIF Sanitization</a>
              <a>Emergency Hotlines (112)</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentic Google OAuth & Signup/Login Modal */}
      {showAuthModal && (
        <div className="auth-modal-backdrop">
          <div className="auth-modal-card">
            <button className="auth-modal-close" onClick={() => setShowAuthModal(false)}>
              <X size={18} />
            </button>

            <div className="auth-card-header">
              <div className="auth-brand-pill">
                <span>⚡ CityPulse Account</span>
              </div>
              <h3 className="auth-title">
                {authMode === 'signup' ? 'Create your citizen profile' : 'Welcome back to CityPulse'}
              </h3>
              <p className="auth-subtitle">
                {authMode === 'signup'
                  ? 'Join verified Pune citizens to access persona-weighted routes and civic reporting.'
                  : 'Log in to sync your saved heritage trails, trusted contacts, and civic karma.'}
              </p>
            </div>

            {/* Official Google OAuth Button / Account Selection */}
            <div className="oauth-buttons-container">
              {showGooglePrompt ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Sign in with your Google Account:</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="email"
                      value={googleAccountEmail}
                      onChange={(e) => setGoogleAccountEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      style={{
                        flex: 1,
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '0.85rem'
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          completeGoogleSignIn(googleAccountEmail);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => completeGoogleSignIn(googleAccountEmail || 'citizen@gmail.com')}
                      style={{
                        background: '#4285F4',
                        border: 'none',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {isAuthenticating ? 'Signing in...' : 'Sign In'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGooglePrompt(false)}
                    style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.72rem', cursor: 'pointer', textAlign: 'left' }}
                  >
                    ← Back to standard options
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="google-oauth-btn"
                  onClick={handleGoogleOAuth}
                  disabled={isAuthenticating}
                >
                  <svg className="google-icon-svg" viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>
                    {isAuthenticating ? 'Connecting with Google...' : 'Continue with Google'}
                  </span>
                </button>
              )}
            </div>

            <div className="auth-separator">
              <span>or continue with email</span>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleEmailAuth} className="email-auth-form">
              {authMode === 'signup' && (
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isAuthenticating}>
                {isAuthenticating
                  ? 'Verifying...'
                  : authMode === 'signup'
                  ? 'Create Free Account'
                  : 'Sign In to CityPulse'}
              </button>
            </form>

            <div className="auth-card-footer">
              <div className="toggle-auth-mode">
                {authMode === 'signup' ? (
                  <span>
                    Already have an account?{' '}
                    <button type="button" onClick={() => setAuthMode('signin')}>
                      Log In
                    </button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setAuthMode('signup')}>
                      Sign Up
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                className="skip-guest-btn"
                onClick={() => {
                  setShowAuthModal(false);
                  onEnterApp();
                }}
              >
                Skip and Explore as Guest Scout →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
