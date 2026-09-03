import React, { useState } from 'react';
import { 
  Sparkles, 
  Droplets, 
  Heart, 
  Thermometer, 
  Pill, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Smile, 
  Users, 
  Lock,
  RefreshCw,
  Plus,
  HeartHandshake,
  ShieldAlert
} from 'lucide-react';
import { useCycle } from '../../context/CycleContext';
import { AppView } from '../../types';
import { formatDateToISO } from '../../utils/cycleCalculations';

interface HomeScreenProps {
  onNavigate: (view: AppView) => void;
  onOpenLogModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenLogModal }) => {
  const { currentCycle, settings, dayLogs, setSelectedDate } = useCycle();
  const [aiInsight, setAiInsight] = useState<any | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const todayStr = formatDateToISO(new Date());
  const todayLog = dayLogs[todayStr];

  // Fetch AI-powered cycle insights
  const fetchAiInsight = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/cycle-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPhase: currentCycle.phaseDisplayName,
          dayOfCycle: currentCycle.currentDayOfCycle,
          symptoms: todayLog?.symptoms || [],
          moods: todayLog?.moods || [],
          bbt: todayLog?.bbt
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiInsight(data);
      }
    } catch (err) {
      console.error('Failed to fetch AI cycle insight', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Phase colors and styling
  const phaseTheme = {
    MENSTRUAL: {
      bg: 'from-[#6E3544] via-[#522935] to-[#3B1C26]',
      accent: '#DE9E8E',
      badge: 'bg-[#DE9E8E]/20 text-[#FFD1C9]',
      glow: 'shadow-[0_12px_40px_rgba(110,53,68,0.3)]'
    },
    FOLLICULAR: {
      bg: 'from-[#556F62] via-[#415C4C] to-[#2E4336]',
      accent: '#9BC0A8',
      badge: 'bg-[#9BC0A8]/20 text-[#D7EADE]',
      glow: 'shadow-[0_12px_40px_rgba(85,111,98,0.3)]'
    },
    OVULATION: {
      bg: 'from-[#8C6036] via-[#6F4928] to-[#4E321B]',
      accent: '#E4B67C',
      badge: 'bg-[#E4B67C]/20 text-[#FFE5C4]',
      glow: 'shadow-[0_12px_40px_rgba(140,96,54,0.3)]'
    },
    LUTEAL: {
      bg: 'from-[#54384B] via-[#432A39] to-[#2C1925]',
      accent: '#C79CB7',
      badge: 'bg-[#C79CB7]/20 text-[#F0D5E4]',
      glow: 'shadow-[0_12px_40px_rgba(84,56,75,0.3)]'
    }
  }[currentCycle.currentPhase];

  return (
    <div className="min-h-screen pb-28 pt-4 px-4 max-w-lg mx-auto space-y-5">
      {/* Top Header */}
      <header className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('PROFILE')}
            className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={settings.avatarUrl || '/assets/avatar_sarah_j_1788022610469.jpg'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
          <div>
            <p className="text-xs font-medium text-[#7A6C74] uppercase tracking-wider">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="text-xl font-serif font-bold text-[#20171D]">
              Hello, {settings.userName || 'Maya'}
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate('NOTIFICATIONS')}
          className="p-2.5 rounded-full bg-white/80 border border-[#EDE4DE] text-[#523446] shadow-sm hover:bg-white transition-colors"
          title="Alerts & Reminders"
        >
          <Sparkles size={18} />
        </button>
      </header>

      {/* Main Cycle Status Hero Card */}
      <div
        id="hero_cycle_phase_card"
        className={`relative overflow-hidden rounded-[36px] bg-gradient-to-br ${phaseTheme.bg} text-white p-6 sm:p-7 ${phaseTheme.glow} transition-all`}
      >
        {/* Subtle background wave overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Phase Badge */}
          <span className={`px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${phaseTheme.badge}`}>
            {currentCycle.phaseDisplayName}
          </span>

          {/* Central Circular Cycle Dial */}
          <div className="relative flex items-center justify-center w-40 h-40 my-2">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Active Progress Arc */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={phaseTheme.accent}
                strokeWidth="6"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * currentCycle.currentDayOfCycle) / settings.cycleLengthDays}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
                Day {currentCycle.currentDayOfCycle}
              </span>
              <span className="text-[11px] text-white/70 tracking-wide font-medium mt-0.5">
                of {settings.cycleLengthDays} days
              </span>
            </div>
          </div>

          {/* Pregnancy Probability & Period Countdown */}
          <div className="grid grid-cols-2 gap-3 w-full pt-1 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <p className="text-[11px] text-white/70">Chance of Pregnancy</p>
              <p className="text-sm font-semibold text-white mt-0.5">{currentCycle.chanceOfPregnancy}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <p className="text-[11px] text-white/70">Period In</p>
              <p className="text-sm font-semibold text-white mt-0.5">
                {currentCycle.daysUntilNextPeriod} {currentCycle.daysUntilNextPeriod === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* Phase Guidance text */}
          <p className="text-xs text-white/80 leading-relaxed max-w-sm pt-1">
            {currentCycle.phaseDescription}
          </p>

          {/* Fast Log Button inside hero */}
          <button
            onClick={onOpenLogModal}
            className="w-full py-3 px-6 rounded-full bg-white text-[#20171D] font-semibold text-sm shadow-lg hover:bg-stone-50 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={18} className="text-[#523446]" />
            {todayLog ? 'Update Today’s Log' : 'Log Today’s Symptoms'}
          </button>
        </div>
      </div>

      {/* 4 Feature Action Shortcuts */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={() => onNavigate('BBT_LOG')}
          className="p-3 bg-white rounded-2xl border border-[#EDE4DE] shadow-sm flex flex-col items-center text-center hover:border-[#7D9688] hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#EBF1ED] text-[#415C4C] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Thermometer size={20} />
          </div>
          <span className="text-[11px] font-semibold text-[#20171D]">BBT Log</span>
          <span className="text-[9px] text-[#8E7E87]">
            {todayLog?.bbt ? `${todayLog.bbt}°` : 'Track'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('BIRTH_CONTROL')}
          className="p-3 bg-white rounded-2xl border border-[#EDE4DE] shadow-sm flex flex-col items-center text-center hover:border-[#523446] hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F2E8EC] text-[#523446] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Pill size={20} />
          </div>
          <span className="text-[11px] font-semibold text-[#20171D]">Pill Pack</span>
          <span className="text-[9px] text-[#8E7E87]">
            {settings.birthControl.currentPillIndex}/{settings.birthControl.packTotalPills}
          </span>
        </button>

        <button
          onClick={() => onNavigate('PARTNER_SYNC')}
          className="p-3 bg-white rounded-2xl border border-[#EDE4DE] shadow-sm flex flex-col items-center text-center hover:border-[#DE9E8E] hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#FDF0EC] text-[#DE9E8E] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Users size={20} />
          </div>
          <span className="text-[11px] font-semibold text-[#20171D]">Partner</span>
          <span className="text-[9px] text-[#8E7E87]">
            {settings.partnerSync.isEnabled ? 'Synced' : 'Connect'}
          </span>
        </button>

        <button
          onClick={() => onNavigate('FEELING_TODAY')}
          className="p-3 bg-white rounded-2xl border border-[#EDE4DE] shadow-sm flex flex-col items-center text-center hover:border-[#E4B67C] hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#FCF4EB] text-[#C48C48] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Smile size={20} />
          </div>
          <span className="text-[11px] font-semibold text-[#20171D]">Mood</span>
          <span className="text-[9px] text-[#8E7E87]">
            {todayLog?.moods?.length ? todayLog.moods[0] : 'Check in'}
          </span>
        </button>
      </div>

      {/* AI Hormone & Holistic Wellness Coach */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE4DE] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#F2E8EC] rounded-xl text-[#523446]">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#20171D]">AI Cycle Guidance</h3>
              <p className="text-[11px] text-[#7A6C74]">Tailored to Day {currentCycle.currentDayOfCycle} ({currentCycle.phaseDisplayName})</p>
            </div>
          </div>

          <button
            onClick={fetchAiInsight}
            disabled={isLoadingAi}
            className="p-2 rounded-full hover:bg-stone-100 text-[#523446] transition-colors"
            title="Refresh AI Insights"
          >
            <RefreshCw size={16} className={isLoadingAi ? 'animate-spin' : ''} />
          </button>
        </div>

        {aiInsight ? (
          <div className="space-y-2.5 pt-1 text-xs">
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE0D9]">
              <span className="font-semibold text-[#523446] block mb-1">🌿 Phase Overview</span>
              <p className="text-stone-700 leading-relaxed">{aiInsight.phaseInsight}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-[#EBF1ED] rounded-xl text-[#334D3F]">
                <span className="font-semibold block mb-0.5">🥑 Nutrition</span>
                <p className="text-[11px] leading-snug">{aiInsight.nutritionTip}</p>
              </div>
              <div className="p-2.5 bg-[#FDF0EC] rounded-xl text-[#6B3B30]">
                <span className="font-semibold block mb-0.5">🧘 Movement</span>
                <p className="text-[11px] leading-snug">{aiInsight.movementSuggestion}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EDE4DE] flex items-center justify-between">
            <p className="text-xs text-stone-600">
              Get personalized nutrition and energy tips for your {currentCycle.phaseDisplayName.toLowerCase()}.
            </p>
            <button
              onClick={fetchAiInsight}
              disabled={isLoadingAi}
              className="ml-3 px-3.5 py-1.5 rounded-full bg-[#523446] text-white text-xs font-medium whitespace-nowrap hover:bg-[#412737] transition-all"
            >
              {isLoadingAi ? 'Analyzing...' : 'Generate'}
            </button>
          </div>
        )}
      </div>

      {/* Today's Log Summary Card */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE4DE] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#20171D]">Today's Wellness Record</h3>
          <button
            onClick={() => {
              setSelectedDate(todayStr);
              onNavigate('CALENDAR');
            }}
            className="text-xs font-medium text-[#523446] hover:underline flex items-center gap-0.5"
          >
            View Calendar <ChevronRight size={14} />
          </button>
        </div>

        {todayLog && (todayLog.flow || todayLog.moods.length > 0 || todayLog.symptoms.length > 0 || todayLog.bbt || todayLog.notes) ? (
          <div className="space-y-2 text-xs">
            {todayLog.flow && (
              <div className="flex items-center gap-2">
                <span className="text-[#8E7E87] w-20">Flow:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-medium capitalize">
                  {todayLog.flow}
                </span>
              </div>
            )}

            {todayLog.bbt && (
              <div className="flex items-center gap-2">
                <span className="text-[#8E7E87] w-20">BBT:</span>
                <span className="font-semibold text-[#415C4C]">{todayLog.bbt}° {settings.temperatureUnit === 'Celsius' ? 'C' : 'F'}</span>
              </div>
            )}

            {todayLog.moods.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-[#8E7E87] w-20 pt-0.5">Moods:</span>
                <div className="flex flex-wrap gap-1 flex-1">
                  {todayLog.moods.map(m => (
                    <span key={m} className="px-2 py-0.5 bg-[#F2E8EC] text-[#523446] rounded-md text-[11px]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {todayLog.symptoms.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-[#8E7E87] w-20 pt-0.5">Symptoms:</span>
                <div className="flex flex-wrap gap-1 flex-1">
                  {todayLog.symptoms.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-[#EBF1ED] text-[#415C4C] rounded-md text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {todayLog.notes && (
              <div className="pt-2 border-t border-[#F0EAE5] text-stone-600 italic">
                "{todayLog.notes}"
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DDD0C8]">
            <p className="text-xs text-stone-500 mb-2">No symptoms or moods logged for today yet.</p>
            <button
              onClick={onOpenLogModal}
              className="px-4 py-1.5 bg-[#523446] text-white text-xs font-semibold rounded-full hover:bg-[#432A39]"
            >
              + Quick Log
            </button>
          </div>
        )}
      </div>

      {/* Next Cycle Events Timeline */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE4DE] shadow-sm">
        <h3 className="text-sm font-semibold text-[#20171D] mb-3">Predicted Milestones</h3>
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FCF4EB] text-[#633F17]">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D9822B]" />
              <div>
                <span className="font-semibold block">Fertile Window</span>
                <span className="text-[11px] text-stone-600">
                  {currentCycle.fertileWindowStart} to {currentCycle.fertileWindowEnd}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-medium">Ovulation ~ {currentCycle.nextOvulationDate}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF0EC] text-[#6E3544]">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DE9E8E]" />
              <div>
                <span className="font-semibold block">Next Period</span>
                <span className="text-[11px] text-stone-600">Expected start date</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold">{currentCycle.nextPeriodStartDate}</span>
          </div>
        </div>
      </div>

      {/* Quick Care & Support Cards */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => onNavigate('DOCTORS_CARE_TEAM')}
          className="bg-white hover:bg-[#FDFCFB] active:scale-[0.98] rounded-3xl p-4 border border-[#EDE4DE] shadow-xs flex flex-col justify-between text-left transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-[#F4EDE8] text-[#543649] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <HeartHandshake size={20} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#1E191D] leading-snug">
              Care Team
            </h4>
            <p className="text-[11px] text-[#7A6C74] font-medium mt-0.5">
              Consult specialists & book visits
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('EMERGENCY_HELP')}
          className="bg-white hover:bg-[#FDFCFB] active:scale-[0.98] rounded-3xl p-4 border border-[#EDE4DE] shadow-xs flex flex-col justify-between text-left transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-[#EAEFEA] text-[#557A64] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#1E191D] leading-snug">
              Emergency
            </h4>
            <p className="text-[11px] text-[#7A6C74] font-medium mt-0.5">
              Crisis lines & direct doctor dial
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
