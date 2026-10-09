import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Share2, Copy, Check, X, MapPin, Battery, AlertTriangle } from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCoords?: [number, number];
  locationName?: string;
}

export const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  currentCoords = [18.5204, 73.8567],
  locationName = 'FC Road / Deccan Gymkhana, Pune'
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const liveLink = `https://citypulse.app/live/track?lat=${currentCoords[0]}&lng=${currentCoords[1]}&t=${Date.now()}`;
  const prewrittenSOS = `EMERGENCY ALERT: I am sharing my live CityPulse location from ${locationName}. Coordinates: ${currentCoords[0].toFixed(4)}, ${currentCoords[1].toFixed(4)}. Live track link: ${liveLink}. Please check on me immediately.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(prewrittenSOS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const emergencyContacts = [
    { title: 'National Emergency Helpline', number: '112', desc: 'Police, Fire, Medical, Disaster' },
    { title: 'Women Safety Helpline', number: '1091', desc: '24/7 Nirbhaya / Damini Squad' },
    { title: 'Ambulance Emergency', number: '108', desc: 'Government Medical Response' },
    { title: 'Pune Police Control Room', number: '100', desc: 'Local City Precinct' }
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel-modal sos-modal-box">
        <div className="sos-modal-header">
          <div className="sos-title-badge">
            <ShieldAlert size={24} color="#ef4444" />
            <div>
              <h3 className="sos-modal-heading">Journey Share & Emergency SOS</h3>
              <span className="sos-subtitle">Real-time encrypted tracking link for family & trusted contacts</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="sos-body">
          {/* Live GPS Card */}
          <div className="live-gps-card">
            <div className="gps-row">
              <span className="gps-live-dot"></span>
              <span className="gps-title">Live Geotag Active</span>
              <span className="battery-stat"><Battery size={14} /> 87% Battery</span>
            </div>
            <div className="location-name-line">
              <MapPin size={16} /> <strong>{locationName}</strong>
            </div>
            <div className="coords-line">
              GPS: {currentCoords[0].toFixed(5)}, {currentCoords[1].toFixed(5)} · Accuracy: 3 meters
            </div>
          </div>

          {/* Pre-written message box */}
          <div className="prewritten-box">
            <span className="box-label">Pre-written One-Tap SOS Message:</span>
            <p className="message-content">"{prewrittenSOS}"</p>
            <div className="share-actions-row">
              <button className="copy-link-btn" onClick={handleCopyLink}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy SOS Message & Link'}</span>
              </button>
              <button
                className="whatsapp-btn"
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(prewrittenSOS)}`, '_blank');
                }}
              >
                <Share2 size={16} /> Share via WhatsApp / SMS
              </button>
            </div>
          </div>

          {/* Emergency Helplines per PRD Section 10 */}
          <div className="helpline-section">
            <span className="helpline-title">Direct Emergency Helplines (Pune & National):</span>
            <div className="helplines-grid">
              {emergencyContacts.map((c, i) => (
                <a key={i} href={`tel:${c.number}`} className="helpline-card">
                  <div className="helpline-left">
                    <span className="h-name">{c.title}</span>
                    <span className="h-desc">{c.desc}</span>
                  </div>
                  <div className="helpline-dial-badge">
                    <PhoneCall size={14} />
                    <span>Dial {c.number}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="sos-disclaimer">
            <AlertTriangle size={14} />
            <span>
              Disclaimer: CityPulse provides verified telemetry & safety navigation and is advisory. In critical danger, dial 112 immediately.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
