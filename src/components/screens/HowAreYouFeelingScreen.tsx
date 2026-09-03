import React, { useState } from 'react';
import { 
  Smile, 
  Moon, 
  AlertTriangle, 
  Target, 
  Zap, 
  Sparkles, 
  Check,
  ChevronLeft
} from 'lucide-react';
import { useCycle } from '../../context/CycleContext';
import { formatDateToISO } from '../../utils/cycleCalculations';

interface HowAreYouFeelingScreenProps {
  onBack: () => void;
}

// Custom Calm Icon with wave & crescent moon styling
const CalmIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    <path d="M3 19c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
  </svg>
);

// Custom Tired Face Icon with Zzz
const TiredIcon: React.FC<{ size?: number; className?: string }> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 15s1.5 2 4 2 4-2 4-2" />
    <line x1="8" y1="9.5" x2="10" y2="9.5" />
    <line x1="14" y1="9.5" x2="16" y2="9.5" />
    <path d="M16 4.5h2.5l-2.5 3h2.5" />
  </svg>
);

export const HowAreYouFeelingScreen: React.FC<HowAreYouFeelingScreenProps> = ({ onBack }) => {
  const { dayLogs, saveDayLog } = useCycle();
  const todayStr = formatDateToISO(new Date());
  const existingLog = dayLogs[todayStr] || { moods: [] };

  const [selectedMood, setSelectedMood] = useState<string>(existingLog.moods?.[0] || 'Calm');
  const [reflectionText, setReflectionText] = useState<string>(existingLog.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  const moodOptions = [
    { 
      id: 'Calm', 
      label: 'Calm', 
      icon: CalmIcon, 
      bg: 'bg-[#F2ECEE]' 
    },
    { 
      id: 'Happy', 
      label: 'Happy', 
      icon: Smile, 
      bg: 'bg-[#E8F0EA]' 
    },
    { 
      id: 'Tired', 
      label: 'Tired', 
      icon: TiredIcon, 
      bg: 'bg-[#E6F0EE]' 
    },
    { 
      id: 'Anxious', 
      label: 'Anxious', 
      icon: AlertTriangle, 
      bg: 'bg-[#FCEAE8]' 
    },
    { 
      id: 'Focused', 
      label: 'Focused', 
      icon: Target, 
      bg: 'bg-[#FEF5E7]' 
    },
    { 
      id: 'Energized', 
      label: 'Energized', 
      icon: Zap, 
      bg: 'bg-[#FAF0E6]' 
    }
  ];

  const handleSave = () => {
    saveDayLog(todayStr, {
      moods: [selectedMood],
      notes: reflectionText
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onBack();
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center p-3 sm:p-6 pb-28 sm:pb-32 selection:bg-[#DE9E8E]/30">
      {/* Mobile Card Container matching mockup */}
      <div className="w-full max-w-[390px] min-h-[760px] bg-[#FAF9F7] rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#EDE6E1] overflow-hidden flex flex-col justify-between relative">
        
        {/* Top Organic Embrace Circular Artwork */}
        <div className="relative w-full h-[360px] sm:h-[380px] overflow-hidden flex-shrink-0">
          <img
            src="/assets/feeling_embrace_circle_1788068519158.jpg"
            alt="Organic abstract figures embracing artwork"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />

          {/* Floating Back Button */}
          <button
            onClick={onBack}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/70 backdrop-blur-md text-[#1E191D] hover:bg-white transition-all shadow-xs cursor-pointer z-20"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Floating White Card Overlapping Artwork */}
        <div className="relative -mt-36 z-20 px-5 sm:px-6">
          <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-6 border border-[#EDE6E1] shadow-[0_10px_30px_rgba(0,0,0,0.04)] min-h-[220px] flex flex-col justify-between">
            <h1 className="font-serif text-[32px] sm:text-[34px] font-normal text-[#1E191D] leading-[1.15] tracking-tight">
              How are you feeling<br />
              today?
            </h1>

            {/* Optional Reflection / Journaling Input area */}
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Add personal notes or thoughts here..."
              rows={3}
              className="w-full bg-[#FAF9F7] border border-[#EDE6E1] rounded-2xl p-3 text-xs text-[#1E191D] placeholder:text-[#9E9099] focus:outline-none focus:ring-1 focus:ring-[#543649] transition-all resize-none mt-3"
            />
          </div>
        </div>

        {/* Mood Selection Row & Save Button */}
        <div className="flex-1 px-5 sm:px-6 pt-5 pb-8 flex flex-col justify-between space-y-4">
          {/* Horizontal Scrollable Mood Icons Grid/Row */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;

              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  id={`mood_option_${mood.id.toLowerCase()}`}
                  className={`flex flex-col items-center justify-center w-[60px] sm:w-[64px] h-[68px] sm:h-[72px] rounded-[20px] flex-shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#543649] bg-[#FAF4F7] shadow-sm scale-105'
                      : `${mood.bg} border border-[#EDE6E1] hover:scale-102 opacity-90 hover:opacity-100`
                  }`}
                >
                  <Icon 
                    size={22} 
                    className={`${isSelected ? 'text-[#543649]' : 'text-[#362732]'}`} 
                  />
                  <span className={`text-[12px] sm:text-[13px] font-medium mt-1 tracking-tight ${
                    isSelected ? 'text-[#543649] font-bold' : 'text-[#362732]'
                  }`}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Button: Save Entry */}
          <div className="w-full pt-2">
            <button
              onClick={handleSave}
              id="save_feeling_entry_btn"
              className="w-full py-4.5 bg-[#543649] hover:bg-[#432939] active:scale-[0.98] text-white font-sans font-medium text-[18px] rounded-full shadow-[0_10px_28px_rgba(84,54,73,0.32)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check size={20} />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Entry</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

