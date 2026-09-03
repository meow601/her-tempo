import React, { useState } from 'react';
import { ChevronLeft, Clock, MapPin, Check, Calendar, Trash2 } from 'lucide-react';
import { useCycle } from '../../context/CycleContext';

interface AppointmentDetailScreenProps {
  onBack: () => void;
  onNavigateToCareTeam?: () => void;
}

export const AppointmentDetailScreen: React.FC<AppointmentDetailScreenProps> = ({ 
  onBack,
  onNavigateToCareTeam 
}) => {
  const { appointment, updateAppointment } = useCycle();
  const [noteInput, setNoteInput] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [tempDate, setTempDate] = useState(appointment?.date || '2023-10-26');
  const [tempTime, setTempTime] = useState(appointment?.time || '10:00 AM');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteInput.trim()) {
      const existing = appointment?.notes ? `${appointment.notes}\n• ${noteInput.trim()}` : `• ${noteInput.trim()}`;
      updateAppointment({ notes: existing });
      setNoteInput('');
    }
  };

  const handleSaveReschedule = () => {
    updateAppointment({
      date: tempDate,
      time: tempTime,
      status: 'Confirmed'
    });
    setShowRescheduleModal(false);
  };

  const handleCancelAppt = () => {
    updateAppointment({
      status: 'Pending'
    });
    setShowRescheduleModal(false);
  };

  const doctorName = appointment?.doctorName || 'Dr. Anya Sharma';
  const specialty = appointment?.specialty || 'OB/GYN & Holistic Wellness Specialist';
  const clinic = appointment?.clinic || 'Willow Creek Medical Center, Suite 405';
  const dateStr = appointment?.date || 'Oct 26, 2023';
  const timeStr = appointment?.time || '10:00 AM';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#241C22] pb-32 relative overflow-x-hidden selection:bg-[#DE9E8E]/30">
      {/* Top Header Background with Golden Foliage & Wave Art */}
      <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden">
        <img
          src="/assets/img_appt_header_bg_1787819183710.jpg"
          alt="Appointment Botanical Header Artwork"
          className="w-full h-full object-cover object-top"
        />
        {/* Soft bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFBF7]" />

        {/* Circular Back Button */}
        <button
          onClick={onBack}
          id="appt_detail_back_btn"
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center text-[#2A2328] hover:bg-white/90 active:scale-95 transition-all shadow-sm cursor-pointer"
          title="Go back"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto px-5 sm:px-6 space-y-4 -mt-16 relative z-10">
        {/* Title */}
        <h1 className="font-serif text-[38px] sm:text-[42px] text-[#20141E] leading-tight tracking-tight text-left pb-1">
          Appointment Details
        </h1>

        {/* Card 1: Doctor Profile & Appointment Logistics */}
        <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-6 border border-[#EDE4DE] shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-5">
          {/* Doctor Header */}
          <div className="flex items-center gap-4">
            <img
              src={appointment?.avatarUrl || '/assets/img_doctor_anya_1787819162193.jpg'}
              alt={doctorName}
              className="w-18 h-18 rounded-full object-cover shadow-sm border border-[#F0EAE5] flex-shrink-0"
            />
            <div className="space-y-0.5">
              <h2 className="text-[20px] font-semibold text-[#20141E] leading-snug">
                {doctorName}
              </h2>
              <p className="text-xs text-[#52444F] font-normal leading-relaxed">
                {specialty}
              </p>
            </div>
          </div>

          {/* Specialty Subtitle & Clinic Floor */}
          <div className="text-center pb-1 space-y-1 border-t border-[#F5EFEA] pt-4">
            <p className="text-[15px] font-normal text-[#20141E]">
              OB/GYN & Holistic <span className="font-semibold">Wellness Specialist</span>
            </p>
            <p className="text-xs text-[#6E606B]">
              Cycle & Hormone Clinic, 4th Floor
            </p>
          </div>

          {/* Date & Time Row */}
          <div className="flex items-center justify-between pt-2">
            <span className="font-serif text-[26px] font-normal text-[#20141E]">
              {dateStr}
            </span>
            <div className="flex items-center gap-2 text-right">
              <Clock size={18} className="text-[#4A3845] flex-shrink-0" />
              <div className="text-xs text-[#20141E] font-medium leading-tight text-left">
                <span>Time</span>
                <span className="block">{timeStr}</span>
              </div>
            </div>
          </div>

          {/* Location Row */}
          <div className="flex items-center gap-2 text-xs font-normal text-[#4A3A46] pt-1">
            <MapPin size={16} className="text-[#4A3845] flex-shrink-0" />
            <span>{clinic}</span>
          </div>
        </div>

        {/* Card 2: Notes for Doctor */}
        <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-5 border border-[#EDE4DE] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3">
          <h3 className="text-[17px] font-semibold text-[#20141E] tracking-tight">
            Notes for Doctor
          </h3>

          <form onSubmit={handleAddNote} className="relative flex items-center">
            <input
              type="text"
              placeholder="Add notes or questions for Dr. Sharma..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full bg-white border border-[#DDD4CC] rounded-xl px-4 py-3 text-xs text-[#20141E] placeholder:text-[#8E808A] focus:outline-none focus:ring-1 focus:ring-[#523446] pr-20"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-1.5 bg-[#523446] hover:bg-[#3E2434] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Add
            </button>
          </form>

          {appointment?.notes && (
            <div className="space-y-1 bg-[#FAF8F5] p-3 rounded-xl border border-[#EDE4DE]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#523446]">Saved Notes:</span>
                <button
                  onClick={() => updateAppointment({ notes: '' })}
                  className="text-stone-400 hover:text-rose-600 transition-colors"
                  title="Clear notes"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <p className="text-xs text-[#52444F] whitespace-pre-line leading-relaxed">
                {appointment.notes}
              </p>
            </div>
          )}
        </div>

        {/* Reschedule / Cancel Button & Care Team Link */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={() => setShowRescheduleModal(true)}
            className="w-full py-4 bg-[#523446] hover:bg-[#3F2535] text-white font-medium text-[16px] rounded-full shadow-[0_8px_20px_rgba(82,52,70,0.25)] flex items-center justify-center transition-all cursor-pointer active:scale-98"
          >
            Reschedule / Cancel
          </button>

          {onNavigateToCareTeam && (
            <button
              type="button"
              onClick={onNavigateToCareTeam}
              className="w-full py-3 bg-white hover:bg-[#FDFCFB] text-[#523446] border border-[#EDE6E1] font-medium text-[14px] rounded-full shadow-xs flex items-center justify-center transition-all cursor-pointer"
            >
              Browse All Doctors & Care Team
            </button>
          )}
        </div>
      </main>

      {/* Reschedule / Cancel Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#EDE4DE] shadow-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#20141E]">
              Manage Appointment
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-medium text-[#7A6C74] block mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD4CC] rounded-xl px-3 py-2 text-sm text-[#20141E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#7A6C74] block mb-1">
                  Time Slot
                </label>
                <select
                  value={tempTime}
                  onChange={(e) => setTempTime(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD4CC] rounded-xl px-3 py-2 text-sm text-[#20141E]"
                >
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveReschedule}
                className="w-full py-2.5 bg-[#523446] text-white text-xs font-semibold rounded-full hover:bg-[#3E2434] transition-all"
              >
                Confirm New Date & Time
              </button>
              <button
                type="button"
                onClick={handleCancelAppt}
                className="w-full py-2 text-rose-600 text-xs font-semibold hover:underline"
              >
                Mark as Pending / Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="w-full py-2 text-stone-500 text-xs hover:text-stone-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
