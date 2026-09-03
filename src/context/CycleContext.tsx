import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserSettings, 
  DayLog, 
  AppView, 
  CycleCalculationResult, 
  CommunityPost, 
  VideoItem, 
  ArticleItem, 
  DoctorAppointment 
} from '../types';
import { calculateCycleInfo, formatDateToISO, addDays } from '../utils/cycleCalculations';

const STORAGE_KEY_SETTINGS = 'cycle_tracker_user_settings';
const STORAGE_KEY_LOGS = 'cycle_tracker_day_logs';
const STORAGE_KEY_POSTS = 'cycle_tracker_community_posts';
const STORAGE_KEY_TAGS = 'cycle_tracker_custom_tags';

// Compute a default period start date 12 days ago (putting user in Ovulation/Follicular phase)
const defaultLastPeriod = formatDateToISO(addDays(new Date(), -12));

const initialSettings: UserSettings = {
  userName: 'Maya',
  email: 'maya.wellness@gmail.com',
  avatarUrl: '/assets/avatar_sarah_j_1788022610469.jpg',
  cycleLengthDays: 28,
  periodLengthDays: 5,
  lutealPhaseDays: 14,
  lastPeriodStartDate: defaultLastPeriod,
  temperatureUnit: 'Celsius',
  weightUnit: 'kg',
  startDayOfWeek: 'Sunday',
  showWeekNumbers: true,
  language: 'English (US)',
  region: 'United States',
  isPasscodeEnabled: false,
  passcode: '1234',
  isPremium: false,
  selectedGoal: 'PERIOD',
  notifications: {
    periodReminders: true,
    fertileWindowAlerts: true,
    pillReminders: true,
    dailyLogPrompt: true,
    periodReminderDaysBefore: 2,
    pillReminderTime: '08:00 AM'
  },
  birthControl: {
    type: 'Pill',
    brandName: 'Yaz Combo 28',
    packTotalPills: 28,
    currentPillIndex: 14,
    reminderTime: '09:00 AM',
    streakDays: 14
  },
  partnerSync: {
    isEnabled: false,
    partnerCode: 'SYNC-7894-LOVE',
    connectedPartnerName: 'Alex',
    sharePhase: true,
    shareSymptoms: true,
    shareMoods: true,
    shareNotes: false
  }
};

const initialPosts: CommunityPost[] = [
  {
    id: 'post_1',
    authorName: 'Sarah J.',
    authorAvatar: '/assets/avatar_sarah_j_1788022610469.jpg',
    timeAgo: '2 hours ago',
    title: 'Mindful Morning Routine',
    content: "Sharing my updated morning ritual for hormone balance and energy. It includes gentle stretching, a warm lemon water, and a 10-minute meditation. What are your favorite ways to start the day mindfully? Let's inspire each other!",
    tags: ['#CycleTracking', '#HolisticHealth', '#Mindfulness'],
    likesCount: 145,
    isLiked: false,
    isBookmarked: false,
    comments: [
      {
        id: 'c1',
        authorName: 'Emily R.',
        authorAvatar: '/assets/avatar_emily_r_1788022630057.jpg',
        timeAgo: '1 hour ago',
        content: "Love this! I've been trying to incorporate more stretching. Thanks for the reminder."
      },
      {
        id: 'c2',
        authorName: 'Maria G.',
        authorAvatar: '/assets/avatar_maria_g_1788022652361.jpg',
        timeAgo: '45 mins ago',
        content: 'Meditation is a game-changer for me. Do you have any app recommendations?'
      }
    ]
  },
  {
    id: 'post_2',
    authorName: 'Elena Rostova',
    authorAvatar: '/assets/avatar_emily_r_1788022630057.jpg',
    timeAgo: '5 hours ago',
    title: 'Seed Cycling for Luteal Phase',
    content: 'Sunflower and sesame seeds have significantly softened my PMS symptoms this cycle! Anyone else doing seed cycling protocol regularly?',
    tags: ['#Nutrition', '#WellnessTips', '#HolisticHealth'],
    likesCount: 92,
    isLiked: true,
    isBookmarked: true,
    comments: [
      {
        id: 'c3',
        authorName: 'Sarah J.',
        authorAvatar: '/assets/avatar_sarah_j_1788022610469.jpg',
        timeAgo: '3 hours ago',
        content: 'Yes! Combining them into evening oat bowls with pumpkin seeds is wonderful.'
      }
    ]
  }
];

const initialVideos: VideoItem[] = [
  {
    id: 'vid_1',
    title: 'Hormone Balance Meditation',
    instructor: 'Dr. Anya Sharma',
    duration: '15 min',
    category: 'Meditation',
    thumbnailUrl: '/assets/video_hero_balance_meditation_1788023702575.jpg',
    description: 'A gentle vagus nerve stimulation meditation designed to lower cortisol and encourage balanced progesterone synthesis.'
  },
  {
    id: 'vid_2',
    title: 'Yin Yoga for Luteal Release',
    instructor: 'Clara Hughes',
    duration: '25 min',
    category: 'Yoga',
    thumbnailUrl: '/assets/category_yoga_movement_1788023732115.jpg',
    description: 'Deep hip opening postures to relieve lower back tension and soothe premenstrual cramps.'
  },
  {
    id: 'vid_3',
    title: 'Nutrient-Dense PCOS Kitchen',
    instructor: 'Maya Lin, MS RD',
    duration: '18 min',
    category: 'Nutrition',
    thumbnailUrl: '/assets/category_nutrition_pcos_1788023718517.jpg',
    description: 'Stabilize blood glucose and reduce inflammation with 3 easy anti-inflammatory meals.'
  },
  {
    id: 'vid_4',
    title: 'Diaphragmatic Breath for Cramps',
    instructor: 'Aria Vance',
    duration: '10 min',
    category: 'Mindfulness',
    thumbnailUrl: '/assets/category_mindfulness_breath_1788023746773.jpg',
    description: 'Calm the central nervous system with 4-7-8 breathing patterns and pelvic floor relaxation.'
  }
];

const initialArticles: ArticleItem[] = [
  {
    id: 'art_luteal',
    title: 'Nourishing the Luteal Phase',
    subtitle: 'Holistic nutrition and lifestyle strategies for natural hormone support.',
    author: 'Dr. Elena Vance, ND',
    readTime: '6 min read',
    category: 'Nutrition',
    heroImage: '/assets/luteal_nutrition_tea_hero_1787937745306.jpg',
    content: `The luteal phase represents the second half of your menstrual cycle, following ovulation. Progesterone rises to prepare the uterine lining and naturally increases your resting metabolic rate by roughly 100-300 calories daily.

### Essential Nutrients
1. **Magnesium & Vitamin B6**: Cruciferous greens, pumpkin seeds, dark chocolate (85%+), and avocados help metabolize estrogen smoothly.
2. **Complex Slow-Burning Carbs**: Roasted sweet potatoes, brown rice, and quinoa prevent rapid blood sugar dips that trigger mood swings.
3. **Anti-Inflammatory Herbal Teas**: Cinnamon, fresh ginger, and dandelion root assist liver detox and fluid balance.`
  },
  {
    id: 'art_seed_cycling',
    title: 'Seed Cycling 101',
    subtitle: 'The ancient ritual of synchronizing pumpkin, flax, sunflower, and sesame seeds with your cycle.',
    author: 'Maya Nutritionist',
    readTime: '4 min read',
    category: 'Wellness',
    heroImage: '/assets/article_mood_recipes_thumb_1788023760344.jpg',
    content: `Seed cycling utilizes natural phytoestrogens and essential fatty acids to gently support hormone balance:
- **Days 1-14 (Follicular)**: 1 tbsp ground flax + 1 tbsp pumpkin seeds (supports healthy estrogen).
- **Days 15-28 (Luteal)**: 1 tbsp sunflower seeds + 1 tbsp sesame seeds (supports progesterone).`
  }
];

const initialAppointment: DoctorAppointment = {
  id: 'appt_1',
  doctorName: 'Dr. Anya Sharma, MD',
  specialty: 'Integrative Reproductive Endocrinology',
  clinic: 'Bloom Women\'s Holistic Center',
  date: formatDateToISO(addDays(new Date(), 4)),
  time: '10:30 AM',
  notes: 'Review annual hormone panel, discuss BBT temperature chart fluctuations, and adjust fertility tracking goals.',
  avatarUrl: '/assets/img_doctor_anya_1787819162193.jpg',
  status: 'Confirmed'
};

// Seed 30 days of realistic sample day logs
function generateSampleLogs(): Record<string, DayLog> {
  const logs: Record<string, DayLog> = {};
  const today = new Date();

  for (let i = -20; i <= 5; i++) {
    const d = addDays(today, i);
    const dateStr = formatDateToISO(d);
    
    // Period days around 12 days ago (days -12 to -8)
    if (i >= -12 && i <= -8) {
      logs[dateStr] = {
        date: dateStr,
        flow: i === -12 ? 'medium' : i === -11 ? 'heavy' : i === -10 ? 'medium' : 'light',
        moods: ['Tired', 'Calm', 'Sensitive'],
        symptoms: ['Cramps', 'Lower Back Ache', 'Fatigue'],
        bbt: +(36.3 + Math.random() * 0.15).toFixed(2),
        cervicalMucus: 'sticky',
        intimacy: false,
        pillTaken: true,
        notes: 'Resting with heating pad and chamomile tea.'
      };
    } else if (i >= -2 && i <= 1) {
      // Ovulation window
      logs[dateStr] = {
        date: dateStr,
        flow: null,
        moods: ['Energetic', 'Confident', 'Happy'],
        symptoms: ['High Libido', 'Clear Skin', 'Mild Bloating'],
        bbt: +(36.75 + Math.random() * 0.15).toFixed(2),
        cervicalMucus: 'egg_white',
        intimacy: true,
        pillTaken: true,
        notes: 'Feeling vibrant and full of creative energy!'
      };
    } else if (i < -12) {
      logs[dateStr] = {
        date: dateStr,
        flow: null,
        moods: ['Calm', 'Productive'],
        symptoms: ['Normal Appetite'],
        bbt: +(36.4 + Math.random() * 0.15).toFixed(2),
        pillTaken: true
      };
    }
  }

  // Ensure today has a log
  const todayStr = formatDateToISO(today);
  if (!logs[todayStr]) {
    logs[todayStr] = {
      date: todayStr,
      flow: null,
      moods: ['Focused', 'Optimistic'],
      symptoms: ['Energetic'],
      bbt: 36.82,
      cervicalMucus: 'egg_white',
      intimacy: false,
      pillTaken: true,
      notes: 'Morning meditation felt very grounded.'
    };
  }

  return logs;
}

interface CycleContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  dayLogs: Record<string, DayLog>;
  saveDayLog: (date: string, log: Partial<DayLog>) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  currentCycle: CycleCalculationResult;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  posts: CommunityPost[];
  addPost: (title: string, content: string, tags: string[]) => void;
  togglePostLike: (postId: string) => void;
  togglePostBookmark: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  selectedPost: CommunityPost | null;
  setSelectedPost: (post: CommunityPost | null) => void;
  videos: VideoItem[];
  articles: ArticleItem[];
  selectedArticle: ArticleItem | null;
  setSelectedArticle: (article: ArticleItem | null) => void;
  appointment: DoctorAppointment;
  updateAppointment: (appt: Partial<DoctorAppointment>) => void;
  customMoodTags: string[];
  customSymptomTags: string[];
  addCustomTag: (category: 'mood' | 'symptom', tag: string) => void;
  removeCustomTag: (category: 'mood' | 'symptom', tag: string) => void;
  isLogSheetOpen: boolean;
  setIsLogSheetOpen: (open: boolean) => void;
}

const CycleContext = createContext<CycleContextType | undefined>(undefined);

export const CycleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [dayLogs, setDayLogs] = useState<Record<string, DayLog>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : generateSampleLogs();
    } catch {
      return generateSampleLogs();
    }
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSTS);
      return saved ? JSON.parse(saved) : initialPosts;
    } catch {
      return initialPosts;
    }
  });

  const [customMoodTags, setCustomMoodTags] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TAGS + '_moods');
      return saved ? JSON.parse(saved) : [
        'Happy', 'Calm', 'Anxiety', 'Sleepy', 'Focused', 'Fatigey', 'Excited', 'Energetic', 'Sad'
      ];
    } catch {
      return ['Happy', 'Calm', 'Anxiety', 'Sleepy', 'Focused', 'Fatigey', 'Excited', 'Energetic', 'Sad'];
    }
  });

  const [customSymptomTags, setCustomSymptomTags] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TAGS + '_symptoms');
      return saved ? JSON.parse(saved) : [
        'Bloating', 'Cramps', 'Headache', 'Acne', 'Fatigue', 'Breast Tenderness', 'Cravings'
      ];
    } catch {
      return ['Bloating', 'Cramps', 'Headache', 'Acne', 'Fatigue', 'Breast Tenderness', 'Cravings'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TAGS + '_moods', JSON.stringify(customMoodTags));
    } catch {}
  }, [customMoodTags]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TAGS + '_symptoms', JSON.stringify(customSymptomTags));
    } catch {}
  }, [customSymptomTags]);

  const [selectedDate, setSelectedDate] = useState<string>(formatDateToISO(new Date()));
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(initialArticles[0]);
  const [appointment, setAppointment] = useState<DoctorAppointment>(initialAppointment);
  const [isLogSheetOpen, setIsLogSheetOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(dayLogs));
    } catch {}
  }, [dayLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
    } catch {}
  }, [posts]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const saveDayLog = (date: string, log: Partial<DayLog>) => {
    setDayLogs(prev => {
      const existing = prev[date] || { date, moods: [], symptoms: [] };
      return {
        ...prev,
        [date]: { ...existing, ...log, date }
      };
    });
  };

  const addPost = (title: string, content: string, tags: string[]) => {
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      authorName: settings.userName || 'Maya',
      authorAvatar: settings.avatarUrl || '/assets/avatar_sarah_j_1788022610469.jpg',
      timeAgo: 'Just now',
      title: title || 'Community Reflection',
      content,
      tags: tags.length > 0 ? tags : ['#CycleTracking'],
      likesCount: 0,
      isLiked: false,
      isBookmarked: false,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const togglePostLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likesCount: !prev.isLiked ? prev.likesCount + 1 : Math.max(0, prev.likesCount - 1)
      } : null);
    }
  };

  const togglePostBookmark = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p));
  };

  const addComment = (postId: string, content: string) => {
    const newComment = {
      id: `c_${Date.now()}`,
      authorName: settings.userName || 'You',
      authorAvatar: settings.avatarUrl || '/assets/avatar_sarah_j_1788022610469.jpg',
      timeAgo: 'Just now',
      content
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null);
    }
  };

  const addCustomTag = (category: 'mood' | 'symptom', tag: string) => {
    if (!tag.trim()) return;
    if (category === 'mood') {
      setCustomMoodTags(prev => prev.includes(tag) ? prev : [...prev, tag]);
    } else {
      setCustomSymptomTags(prev => prev.includes(tag) ? prev : [...prev, tag]);
    }
  };

  const removeCustomTag = (category: 'mood' | 'symptom', tag: string) => {
    if (category === 'mood') {
      setCustomMoodTags(prev => prev.filter(t => t !== tag));
    } else {
      setCustomSymptomTags(prev => prev.filter(t => t !== tag));
    }
  };

  const updateAppointment = (appt: Partial<DoctorAppointment>) => {
    setAppointment(prev => ({ ...prev, ...appt }));
  };

  const currentCycle = calculateCycleInfo(
    settings.lastPeriodStartDate,
    settings.cycleLengthDays,
    settings.periodLengthDays,
    settings.lutealPhaseDays,
    new Date()
  );

  return (
    <CycleContext.Provider value={{
      settings,
      updateSettings,
      dayLogs,
      saveDayLog,
      selectedDate,
      setSelectedDate,
      currentCycle,
      currentView,
      setCurrentView,
      posts,
      addPost,
      togglePostLike,
      togglePostBookmark,
      addComment,
      selectedPost,
      setSelectedPost,
      videos: initialVideos,
      articles: initialArticles,
      selectedArticle,
      setSelectedArticle,
      appointment,
      updateAppointment,
      customMoodTags,
      customSymptomTags,
      addCustomTag,
      removeCustomTag,
      isLogSheetOpen,
      setIsLogSheetOpen
    }}>
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error('useCycle must be used within a CycleProvider');
  }
  return context;
};
