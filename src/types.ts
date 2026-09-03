export type CyclePhase = 'MENSTRUAL' | 'FOLLICULAR' | 'OVULATION' | 'LUTEAL';

export interface DayLog {
  date: string; // YYYY-MM-DD
  flow?: 'light' | 'medium' | 'heavy' | 'spotting' | null;
  moods: string[];
  symptoms: string[];
  bbt?: number | null; // e.g. 36.6 or 97.8
  cervicalMucus?: 'dry' | 'sticky' | 'creamy' | 'egg_white' | null;
  intimacy?: boolean;
  notes?: string;
  pillTaken?: boolean;
}

export interface UserSettings {
  userName: string;
  email: string;
  avatarUrl?: string;
  cycleLengthDays: number; // e.g. 28
  periodLengthDays: number; // e.g. 5
  lutealPhaseDays: number; // e.g. 14
  lastPeriodStartDate: string; // YYYY-MM-DD
  temperatureUnit: 'Celsius' | 'Fahrenheit';
  weightUnit: 'kg' | 'lb';
  startDayOfWeek: 'Sunday' | 'Monday';
  showWeekNumbers: boolean;
  language: string;
  region: string;
  isPasscodeEnabled: boolean;
  passcode?: string;
  isPremium: boolean;
  selectedGoal: 'PERIOD' | 'OVULATION' | 'PREGNANCY' | 'WELLNESS';
  notifications: {
    periodReminders: boolean;
    fertileWindowAlerts: boolean;
    pillReminders: boolean;
    dailyLogPrompt: boolean;
    periodReminderDaysBefore: number;
    pillReminderTime: string;
  };
  birthControl: {
    type: 'Pill' | 'IUD' | 'Implant' | 'Ring' | 'Patch' | 'Natural';
    brandName: string;
    packTotalPills: number;
    currentPillIndex: number;
    reminderTime: string;
    lastTakenTimestamp?: string;
    streakDays: number;
  };
  partnerSync: {
    isEnabled: boolean;
    partnerCode: string;
    connectedPartnerName?: string;
    sharePhase: boolean;
    shareSymptoms: boolean;
    shareMoods: boolean;
    shareNotes: boolean;
  };
}

export interface CycleCalculationResult {
  currentDayOfCycle: number;
  currentPhase: CyclePhase;
  daysUntilNextPeriod: number;
  nextPeriodStartDate: string;
  nextOvulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  phaseDisplayName: string;
  phaseDescription: string;
  phaseAdvice: string;
  chanceOfPregnancy: 'Low' | 'Medium' | 'High' | 'Very High';
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: CommunityComment[];
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
}

export interface VideoItem {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  category: 'Yoga' | 'Meditation' | 'Nutrition' | 'Mindfulness';
  thumbnailUrl: string;
  description: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  category: string;
  heroImage: string;
  content: string;
}

export interface DoctorAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  notes: string;
  avatarUrl: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export type AppView = 
  | 'HOME'
  | 'CALENDAR'
  | 'INSIGHTS'
  | 'PROFILE'
  | 'BBT_LOG'
  | 'BIRTH_CONTROL'
  | 'PARTNER_SYNC'
  | 'PASSCODE_LOCK'
  | 'PREMIUM'
  | 'APPOINTMENT_DETAIL'
  | 'DOCTORS_CARE_TEAM'
  | 'EMERGENCY_HELP'
  | 'EXPORT_HEALTH_REPORT'
  | 'CUSTOM_TAGS'
  | 'HEALTH_PROFILE'
  | 'NOTIFICATIONS'
  | 'VIDEO_LIBRARY'
  | 'LUTEAL_ARTICLE'
  | 'PERSONALIZED_INSIGHTS'
  | 'COMMUNITY'
  | 'CREATE_POST'
  | 'POST_DETAIL'
  | 'FEELING_TODAY'
  | 'APP_PREFERENCES'
  | 'ONBOARDING_WELCOME'
  | 'ONBOARDING_UNDERSTOOD'
  | 'ONBOARDING_TRACK_EASE'
  | 'ONBOARDING_SUCCESS'
  | 'LOGIN_GATEWAY';
