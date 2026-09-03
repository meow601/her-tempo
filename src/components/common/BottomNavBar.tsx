import React from 'react';
import { Home, Calendar, BarChart3, User, Plus } from 'lucide-react';
import { AppView } from '../../types';

interface BottomNavBarProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  onOpenLogModal: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentView,
  onSelectView,
  onOpenLogModal
}) => {
  // Return null if on full-screen onboarding or auth screens
  const hideOnViews: AppView[] = [
    'ONBOARDING_WELCOME',
    'ONBOARDING_UNDERSTOOD',
    'ONBOARDING_TRACK_EASE',
    'ONBOARDING_SUCCESS',
    'LOGIN_GATEWAY',
    'PASSCODE_LOCK'
  ];

  if (hideOnViews.includes(currentView)) {
    return null;
  }

  // Active tab determination supporting subviews
  const getActiveTab = (view: AppView): AppView => {
    if ([
      'PROFILE', 
      'EXPORT_HEALTH_REPORT', 
      'HEALTH_PROFILE', 
      'APP_PREFERENCES', 
      'NOTIFICATIONS', 
      'CUSTOM_TAGS', 
      'PASSCODE_LOCK', 
      'PREMIUM',
      'EMERGENCY_HELP'
    ].includes(view)) {
      return 'PROFILE';
    }
    if ([
      'INSIGHTS', 
      'DOCTORS_CARE_TEAM', 
      'VIDEO_LIBRARY', 
      'LUTEAL_ARTICLE', 
      'PERSONALIZED_INSIGHTS', 
      'APPOINTMENT_DETAIL', 
      'COMMUNITY', 
      'CREATE_POST', 
      'POST_DETAIL'
    ].includes(view)) {
      return 'INSIGHTS';
    }
    if ([
      'CALENDAR', 
      'BBT_LOG', 
      'BIRTH_CONTROL', 
      'PARTNER_SYNC'
    ].includes(view)) {
      return 'CALENDAR';
    }
    return 'HOME';
  };

  const activeTab = getActiveTab(currentView);

  const navItems = [
    { id: 'HOME' as AppView, label: 'Home', icon: Home },
    { id: 'CALENDAR' as AppView, label: 'Calendar', icon: Calendar },
    { id: 'ADD' as any, label: 'Add', icon: null, isAction: true },
    { id: 'INSIGHTS' as AppView, label: 'Insights', icon: BarChart3 },
    { id: 'PROFILE' as AppView, label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-3 sm:pb-4 pointer-events-none">
      <nav
        id="app_bottom_nav_bar"
        className="w-full max-w-[390px] bg-white/95 backdrop-blur-xl border border-[#EDE6E1] shadow-[0_10px_30px_rgba(40,24,35,0.08)] rounded-[32px] px-3 py-1.5 flex items-center justify-around pointer-events-auto transition-all"
      >
        {navItems.map((item) => {
          if (item.isAction) {
            return (
              <button
                key="add_action"
                id="bottom_nav_add_button"
                onClick={onOpenLogModal}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[#543649] text-white shadow-[0_4px_14px_rgba(84,54,73,0.3)] hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-label="Add Daily Log"
              >
                <Plus size={22} strokeWidth={2.4} />
              </button>
            );
          }

          const IconComponent = item.icon!;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav_tab_${item.id.toLowerCase()}`}
              onClick={() => onSelectView(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#543649] font-medium'
                  : 'text-[#8E7E87] hover:text-[#543649]'
              }`}
            >
              {/* Subtle top indicator bar for active tab matching mockup */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-[2.5px] bg-[#543649] rounded-full" />
              )}
              <div className={`p-1 rounded-full transition-colors ${isActive ? 'text-[#543649]' : 'text-[#8E7E87]'}`}>
                <IconComponent size={21} strokeWidth={isActive ? 2.3 : 1.7} />
              </div>
              <span className="text-[10.5px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

