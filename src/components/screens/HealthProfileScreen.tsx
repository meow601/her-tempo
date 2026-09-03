import React from 'react';
import { 
  ChevronLeft, 
  Moon, 
  Droplet, 
  Calendar as CalendarIcon,
  FileText 
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCycle } from '../../context/CycleContext';

interface HealthProfileScreenProps {
  onBack: () => void;
  onNavigateToExportReport?: () => void;
}

export const HealthProfileScreen: React.FC<HealthProfileScreenProps> = ({ 
  onBack,
  onNavigateToExportReport 
}) => {
  const { settings } = useCycle();

  const cycleDays = settings.cycleLengthDays || 28;
  const periodDays = settings.periodLengthDays || 5;
  const lastPeriodFormatted = 'Oct 12';

  const historicalCycles = [
    { range: 'Sep 14 - Oct 12', duration: '28 days' },
    { range: 'Aug 17 - Sep 14', duration: '28 days' },
    { range: 'Jul 20 - Aug 17', duration: '28 days' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1E191D] pb-32 relative overflow-x-hidden selection:bg-[#DE9E8E]/30">
      {/* Top Header Background Art with Organic Ribbons */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden">
        <img
          src="/assets/health_profile_art_1788066196364.jpg"
          alt="Health profile fluid ribbon artwork"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />

        {/* Back Button */}
        <button
          onClick={onBack}
          id="health_profile_back_btn"
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md border border-white/70 flex items-center justify-center text-[#2A2328] hover:bg-white/80 active:scale-95 transition-all shadow-sm cursor-pointer"
          title="Go back"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
        </button>
      </div>

      {/* Floating Header Title & Metric Cards Overlapping the Artwork */}
      <main className="max-w-md mx-auto px-5 sm:px-6 -mt-72 relative z-10 space-y-4">
        <h1 className="font-serif text-[38px] sm:text-[42px] font-normal text-[#1E191D] tracking-tight leading-tight mb-2">
          Health Profile
        </h1>

        {/* Metric Card 1: Average Cycle Length */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white/60 hover:bg-white/75 backdrop-blur-xl border border-white/80 rounded-[26px] p-4 flex items-center gap-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all"
        >
          <div className="w-13 h-13 rounded-full bg-[#523446] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Moon size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[13px] text-[#4A4348] font-normal tracking-tight">
              Average Cycle Length
            </p>
            <p className="text-[24px] font-bold text-[#1E191D] font-sans leading-tight">
              {cycleDays} Days
            </p>
          </div>
        </motion.div>

        {/* Metric Card 2: Average Period Length */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 hover:bg-white/75 backdrop-blur-xl border border-white/80 rounded-[26px] p-4 flex items-center gap-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all"
        >
          <div className="w-13 h-13 rounded-full bg-[#523446] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Droplet size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[13px] text-[#4A4348] font-normal tracking-tight">
              Average Period Length
            </p>
            <p className="text-[24px] font-bold text-[#1E191D] font-sans leading-tight">
              {periodDays} Days
            </p>
          </div>
        </motion.div>

        {/* Metric Card 3: Last Period Date */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/95 hover:bg-white border border-[#EFE8E3] rounded-[26px] p-4 flex items-center gap-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all"
        >
          <div className="w-13 h-13 rounded-full bg-[#523446] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <CalendarIcon size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[13px] text-[#4A4348] font-normal tracking-tight">
              Last Period Date
            </p>
            <p className="text-[24px] font-bold text-[#1E191D] font-sans leading-tight">
              {lastPeriodFormatted}
            </p>
          </div>
        </motion.div>

        {/* Section: Historical Data */}
        <div className="pt-4 space-y-3">
          <h2 className="font-serif text-[32px] sm:text-[34px] font-normal text-[#1E191D] tracking-tight leading-tight">
            Historical Data
          </h2>

          <div className="space-y-3">
            {historicalCycles.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="bg-white/95 hover:bg-white border border-[#EFE8E3] rounded-[22px] px-6 py-4 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all"
              >
                <span className="text-[15px] font-semibold text-[#1E191D] tracking-tight">
                  {item.range}
                </span>
                <span className="text-sm font-normal text-[#1E191D]">
                  ({item.duration})
                </span>
              </motion.div>
            ))}
          </div>

          {/* Export Health Report Button */}
          {onNavigateToExportReport && (
            <div className="pt-3">
              <button
                type="button"
                onClick={onNavigateToExportReport}
                className="w-full py-4 rounded-full bg-[#523446] text-white text-[15px] font-semibold hover:bg-[#432939] active:scale-[0.99] transition-all shadow-[0_8px_24px_rgba(82,52,70,0.25)] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <FileText size={18} />
                <span>Export Health Report (PDF)</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

