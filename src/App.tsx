import React, { useState } from 'react';
import { CycleProvider, useCycle } from './context/CycleContext';
import { BottomNavBar } from './components/common/BottomNavBar';
import { LogEntryModal } from './components/common/LogEntryModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { BbtLogScreen } from './components/screens/BbtLogScreen';
import { BirthControlScreen } from './components/screens/BirthControlScreen';
import { PartnerSyncScreen } from './components/screens/PartnerSyncScreen';
import { PasscodeLockScreen } from './components/screens/PasscodeLockScreen';
import { PremiumSubscriptionScreen } from './components/screens/PremiumSubscriptionScreen';
import { AppointmentDetailScreen } from './components/screens/AppointmentDetailScreen';
import { DoctorsCareTeamScreen } from './components/screens/DoctorsCareTeamScreen';
import { EmergencyHelpScreen } from './components/screens/EmergencyHelpScreen';
import { ExportHealthReportScreen } from './components/screens/ExportHealthReportScreen';
import { CustomTagsScreen } from './components/screens/CustomTagsScreen';
import { HealthProfileScreen } from './components/screens/HealthProfileScreen';
import { NotificationAlertsScreen } from './components/screens/NotificationAlertsScreen';
import { DiscoveryVideoLibraryScreen } from './components/screens/DiscoveryVideoLibraryScreen';
import { LutealNutritionArticleScreen } from './components/screens/LutealNutritionArticleScreen';
import { PersonalizedInsightsScreen } from './components/screens/PersonalizedInsightsScreen';
import { CommunityGatewayScreen } from './components/screens/CommunityGatewayScreen';
import { CreatePostScreen } from './components/screens/CreatePostScreen';
import { CommunityPostDetailScreen } from './components/screens/CommunityPostDetailScreen';
import { HowAreYouFeelingScreen } from './components/screens/HowAreYouFeelingScreen';
import { AppPreferencesScreen } from './components/screens/AppPreferencesScreen';
import { EmpowerWelcomeScreen } from './components/screens/EmpowerWelcomeScreen';
import { YourCycleUnderstoodScreen } from './components/screens/YourCycleUnderstoodScreen';
import { TrackWithEaseScreen } from './components/screens/TrackWithEaseScreen';
import { OnboardingSuccessScreen } from './components/screens/OnboardingSuccessScreen';
import { LoginGatewayScreen } from './components/screens/LoginGatewayScreen';
import { AppView } from './types';
import { formatDateToISO } from './utils/cycleCalculations';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView, selectedDate, setSelectedDate, settings } = useCycle();
  const [modalDate, setModalDate] = useState<string>(formatDateToISO(new Date()));
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const openLogForDate = (dateStr: string) => {
    setModalDate(dateStr);
    setIsLogModalOpen(true);
  };

  const openLogForToday = () => {
    setModalDate(formatDateToISO(new Date()));
    setIsLogModalOpen(true);
  };

  // If passcode is enabled and locked, display passcode screen
  if (settings.isPasscodeEnabled && isLocked) {
    return (
      <PasscodeLockScreen
        onBack={() => {}}
        isEnforcingLock={true}
        onUnlocked={() => setIsLocked(false)}
      />
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <HomeScreen
            onNavigate={(view) => setCurrentView(view)}
            onOpenLogModal={openLogForToday}
          />
        );

      case 'CALENDAR':
        return (
          <CalendarScreen
            onOpenLogModal={(dStr) => openLogForDate(dStr)}
          />
        );

      case 'INSIGHTS':
        return (
          <InsightsScreen
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'PROFILE':
        return (
          <ProfileScreen
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'BBT_LOG':
        return (
          <BbtLogScreen
            onBack={() => setCurrentView('HOME')}
          />
        );

      case 'BIRTH_CONTROL':
        return (
          <BirthControlScreen
            onBack={() => setCurrentView('PROFILE')}
          />
        );

      case 'PARTNER_SYNC':
        return (
          <PartnerSyncScreen
            onBack={() => setCurrentView('PROFILE')}
          />
        );

      case 'PASSCODE_LOCK':
        return (
          <PasscodeLockScreen
            onBack={() => setCurrentView('PROFILE')}
            isEnforcingLock={false}
          />
        );

      case 'PREMIUM':
        return (
          <PremiumSubscriptionScreen
            onBack={() => setCurrentView('PROFILE')}
          />
        );

      case 'APPOINTMENT_DETAIL':
        return (
          <AppointmentDetailScreen
            onBack={() => setCurrentView('INSIGHTS')}
            onNavigateToCareTeam={() => setCurrentView('DOCTORS_CARE_TEAM')}
          />
        );

      case 'DOCTORS_CARE_TEAM':
        return (
          <DoctorsCareTeamScreen
            onBack={() => setCurrentView('INSIGHTS')}
            onSelectDoctorAppointment={() => setCurrentView('APPOINTMENT_DETAIL')}
          />
        );

      case 'EMERGENCY_HELP':
        return (
          <EmergencyHelpScreen
            onBack={() => setCurrentView('PROFILE')}
            onOpenHealthProfile={() => setCurrentView('HEALTH_PROFILE')}
          />
        );

      case 'EXPORT_HEALTH_REPORT':
        return (
          <ExportHealthReportScreen
            onBack={() => setCurrentView('PROFILE')}
            onNavigateToProfile={() => setCurrentView('PROFILE')}
          />
        );

      case 'CUSTOM_TAGS':
        return (
          <CustomTagsScreen
            onBack={() => setCurrentView('PROFILE')}
          />
        );

      case 'HEALTH_PROFILE':
        return (
          <HealthProfileScreen
            onBack={() => setCurrentView('PROFILE')}
            onNavigateToExportReport={() => setCurrentView('EXPORT_HEALTH_REPORT')}
          />
        );

      case 'NOTIFICATIONS':
        return (
          <NotificationAlertsScreen
            onBack={() => setCurrentView('PROFILE')}
          />
        );

      case 'VIDEO_LIBRARY':
        return (
          <DiscoveryVideoLibraryScreen
            onBack={() => setCurrentView('INSIGHTS')}
          />
        );

      case 'LUTEAL_ARTICLE':
        return (
          <LutealNutritionArticleScreen
            onBack={() => setCurrentView('INSIGHTS')}
          />
        );

      case 'PERSONALIZED_INSIGHTS':
        return (
          <PersonalizedInsightsScreen
            onBack={() => setCurrentView('INSIGHTS')}
          />
        );

      case 'COMMUNITY':
        return (
          <CommunityGatewayScreen
            onBack={() => setCurrentView('INSIGHTS')}
            onNavigate={(v) => setCurrentView(v)}
          />
        );

      case 'CREATE_POST':
        return (
          <CreatePostScreen
            onBack={() => setCurrentView('COMMUNITY')}
          />
        );

      case 'POST_DETAIL':
        return (
          <CommunityPostDetailScreen
            onBack={() => setCurrentView('COMMUNITY')}
          />
        );

      case 'FEELING_TODAY':
        return (
          <HowAreYouFeelingScreen
            onBack={() => setCurrentView('HOME')}
          />
        );

      case 'APP_PREFERENCES':
        return (
          <AppPreferencesScreen
            onBack={() => setCurrentView('PROFILE')}
          />
        );

      case 'ONBOARDING_WELCOME':
        return (
          <EmpowerWelcomeScreen
            onNext={() => setCurrentView('ONBOARDING_UNDERSTOOD')}
            onSkip={() => setCurrentView('HOME')}
          />
        );

      case 'ONBOARDING_UNDERSTOOD':
        return (
          <YourCycleUnderstoodScreen
            onNext={() => setCurrentView('ONBOARDING_TRACK_EASE')}
            onBack={() => setCurrentView('ONBOARDING_WELCOME')}
          />
        );

      case 'ONBOARDING_TRACK_EASE':
        return (
          <TrackWithEaseScreen
            onNext={() => setCurrentView('ONBOARDING_SUCCESS')}
            onBack={() => setCurrentView('ONBOARDING_UNDERSTOOD')}
          />
        );

      case 'ONBOARDING_SUCCESS':
        return (
          <OnboardingSuccessScreen
            onFinish={() => setCurrentView('HOME')}
          />
        );

      case 'LOGIN_GATEWAY':
        return (
          <LoginGatewayScreen
            onSuccess={() => setCurrentView('HOME')}
          />
        );

      default:
        return (
          <HomeScreen
            onNavigate={(view) => setCurrentView(view)}
            onOpenLogModal={openLogForToday}
          />
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#20171D] relative font-sans selection:bg-[#EBD7D9] selection:text-[#523446]">
      {renderCurrentView()}

      {/* Floating Bottom Navigation Bar */}
      <BottomNavBar
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        onOpenLogModal={openLogForToday}
      />

      {/* Global Log Entry Bottom Sheet Modal */}
      <LogEntryModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        dateStr={modalDate}
      />
    </main>
  );
};

export default function App() {
  return (
    <CycleProvider>
      <MainAppContent />
    </CycleProvider>
  );
}
