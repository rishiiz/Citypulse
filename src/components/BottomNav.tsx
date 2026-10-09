import React from 'react';
import { Compass, MessageSquare, Navigation, PlusCircle, Activity, Scale, Landmark } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface BottomNavProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  onOpenReportModal: () => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onOpenReportModal,
  language
}) => {
  const t = TRANSLATIONS[language];

  return (
    <nav className="bottom-nav-bar glass-panel">
      <button
        className={`bottom-nav-item ${activeTab === 'explore' ? 'active' : ''}`}
        onClick={() => onChangeTab('explore')}
      >
        <Compass size={20} />
        <span>{t.explore}</span>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'ask' ? 'active' : ''}`}
        onClick={() => onChangeTab('ask')}
      >
        <MessageSquare size={20} />
        <span>{t.askCity}</span>
      </button>

      {/* Centre Prominent Report Button per PRD Section 9 */}
      <button
        className="bottom-nav-center-btn"
        onClick={onOpenReportModal}
        title="Speak-Snap-Send Report in 10s"
      >
        <div className="center-btn-inner">
          <PlusCircle size={26} />
          <span>{t.report}</span>
        </div>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'route' ? 'active' : ''}`}
        onClick={() => onChangeTab('route')}
      >
        <Navigation size={20} />
        <span>{t.safeRoute}</span>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'pulse' ? 'active' : ''}`}
        onClick={() => onChangeTab('pulse')}
      >
        <Activity size={20} />
        <span>{t.pulse}</span>
      </button>
    </nav>
  );
};
