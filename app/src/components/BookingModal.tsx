import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Video, Globe, ChevronLeft, ChevronRight, X, Check, Loader2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // General details
  const userName = "Muhammad Anas";
  const avatarUrl = "/images/hero-portrait.jpg";

  // System states
  const [currentDate, setCurrentDate] = useState(new Date()); // Used for calendar navigation
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    // Default selected date: tomorrow or today depending on time
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    return tom;
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');
  const [timezone, setTimezone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "Asia/Karachi";
    }
  });

  // Step state: 'select' (date/time selection) | 'form' (booking details form) | 'success' (confirmation)
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select');

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Today reference (for disabling past dates and showing the dot indicator)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate calendar days for the current view month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    // 0 is Sunday, 1 is Monday, etc. Adjusting to Mon-Sun
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // 0=Mon, 6=Sun
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const totalDays = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Calendar dates grid array
  const calendarDays: (Date | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    calendarDays.push(new Date(year, month, d));
  }

  // Handle month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Check if a day is selectable (today or future, and not a weekend if you want to block weekends, but here we just block past days)
  const isSelectable = (date: Date | null) => {
    if (!date) return false;
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() >= today.getTime();
  };

  // Check if it is today
  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  // Format date helper for the header (e.g. June 2026)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekdayNamesShort = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // Available times list (mocked slots)
  const allTimeSlots = [
    "12:00pm", "12:30pm", "1:00pm", "1:30pm",
    "2:00pm", "2:30pm", "3:00pm", "3:30pm",
    "4:00pm", "4:30pm", "5:00pm", "5:30pm"
  ];

  const formatSlot = (slot12h: string) => {
    if (timeFormat === '12h') return slot12h;
    // Convert 12h slot to 24h format
    const isPm = slot12h.includes('pm');
    let [hoursStr, minutesStr] = slot12h.replace(/am|pm/, '').split(':');
    let hours = parseInt(hoursStr);
    if (isPm && hours !== 12) hours += 12;
    if (!isPm && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutesStr}`;
  };

  // Format selected date (e.g. Mon 22)
  const getSelectedDateHeader = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${days[selectedDate.getDay()]} ${selectedDate.getDate()}`;
  };

  const getFullSelectedDateString = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[selectedDate.getDay()]}, ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
  };

  // Form submission handler
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  // Reset modal state on close/open
  useEffect(() => {
    if (isOpen) {
      setStep('select');
      setSelectedTime(null);
      setName('');
      setEmail('');
      setNotes('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative z-10 w-full max-w-4xl bg-white text-neutral-900 rounded-[24px] shadow-2xl overflow-hidden border border-neutral-200 flex flex-col md:flex-row md:max-h-[85vh] max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div
              key="select-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden"
            >
              {/* Left Column: Details */}
              <div className="md:w-[28%] w-full p-6 border-b md:border-b-0 md:border-r border-neutral-100 flex flex-col justify-between shrink-0">
                <div className="space-y-5">
                  {/* User info */}
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200">
                      <img
                        src={avatarUrl}
                        alt={userName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initial avatar
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${userName}`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-neutral-500">{userName}</span>
                  </div>

                  {/* Meeting Details */}
                  <div className="space-y-3">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                      30 Min Meeting
                    </h2>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 text-neutral-500 text-sm font-medium">
                        <Clock className="w-4 h-4 text-neutral-400" />
                        <span>30m</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-neutral-500 text-sm font-medium">
                        <Video className="w-4 h-4 text-neutral-400" />
                        <span>Cal Video</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timezone Selector at bottom */}
                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-neutral-500 text-xs font-semibold">
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="truncate">{timezone}</span>
                </div>
              </div>

              {/* Middle Column: Calendar */}
              <div className="md:w-[47%] w-full p-6 border-b md:border-b-0 md:border-r border-neutral-100 shrink-0">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-base font-bold text-neutral-800">
                    {monthNames[month]} {year}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevMonth}
                      disabled={month === today.getMonth() && year === today.getFullYear()}
                      className="p-1.5 text-neutral-600 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-1.5 text-neutral-600 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekdays Row */}
                <div className="grid grid-cols-7 gap-1 text-center mb-3">
                  {weekdayNamesShort.map((dayName) => (
                    <span key={dayName} className="text-[10px] font-bold text-neutral-400 tracking-wider">
                      {dayName}
                    </span>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
                  {calendarDays.map((date, index) => {
                    if (!date) return <div key={`empty-${index}`} />;

                    const selectable = isSelectable(date);
                    const selected = isSelected(date);
                    const current = isToday(date);

                    return (
                      <div key={date.toISOString()} className="relative aspect-square flex flex-col items-center justify-center">
                        <button
                          onClick={() => selectable && setSelectedDate(date)}
                          disabled={!selectable}
                          className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all relative ${
                            selected
                              ? 'bg-neutral-900 text-white font-bold shadow-sm'
                              : selectable
                              ? 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                              : 'text-neutral-400 font-normal cursor-not-allowed opacity-40'
                          }`}
                        >
                          <span>{date.getDate()}</span>
                          {/* Underline dot for today */}
                          {current && (
                            <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                              selected ? 'bg-white' : 'bg-neutral-900'
                            }`} />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Time Slots */}
              <div className="md:w-[25%] w-full p-6 flex flex-col h-[400px] md:h-auto overflow-hidden">
                {/* Header info */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-bold text-neutral-800">
                    {getSelectedDateHeader()}
                  </span>
                  
                  {/* Time format selector */}
                  <div className="flex bg-neutral-100 p-0.5 rounded-md text-[10px] font-bold">
                    <button
                      onClick={() => setTimeFormat('12h')}
                      className={`px-2 py-0.5 rounded-sm transition-all ${
                        timeFormat === '12h' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      12h
                    </button>
                    <button
                      onClick={() => setTimeFormat('24h')}
                      className={`px-2 py-0.5 rounded-sm transition-all ${
                        timeFormat === '24h' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      24h
                    </button>
                  </div>
                </div>

                {/* Time Slots List */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[320px] scrollbar-thin">
                  {allTimeSlots.map((slot) => {
                    const formatted = formatSlot(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedTime(formatted);
                          setStep('form');
                        }}
                        className="w-full py-3 px-4 border border-neutral-200 hover:border-neutral-900 rounded-xl text-xs font-semibold text-neutral-800 hover:text-neutral-900 bg-white hover:bg-neutral-50/50 transition-all flex items-center justify-center text-center shadow-xs"
                      >
                        {formatted}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div
              key="form-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden"
            >
              {/* Left Column: Meeting Details Summary */}
              <div className="md:w-[35%] w-full p-8 border-b md:border-b-0 md:border-r border-neutral-100 flex flex-col justify-between shrink-0">
                <div className="space-y-6">
                  {/* Back button */}
                  <button
                    onClick={() => setStep('select')}
                    className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to slots
                  </button>

                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200">
                      <img
                        src={avatarUrl}
                        alt={userName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${userName}`;
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{userName}</span>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                        30 Min Meeting
                      </h2>
                    </div>

                    <div className="space-y-2.5 pt-3">
                      <div className="flex items-center gap-2.5 text-neutral-600 text-sm font-semibold">
                        <Clock className="w-4.5 h-4.5 text-neutral-400" />
                        <span>30m</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-neutral-600 text-sm font-semibold">
                        <Video className="w-4.5 h-4.5 text-neutral-400" />
                        <span>Cal Video</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-neutral-900 text-sm font-semibold">
                        <span className="w-4.5 h-4.5 flex items-center justify-center text-neutral-400 mt-0.5">🗓️</span>
                        <div className="flex flex-col">
                          <span>{selectedTime}</span>
                          <span className="text-neutral-500 text-xs font-normal">{getFullSelectedDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-neutral-500 text-xs font-semibold">
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{timezone}</span>
                </div>
              </div>

              {/* Right Column: User Info Form */}
              <div className="flex-1 p-8 flex flex-col justify-center overflow-y-auto">
                <form onSubmit={handleConfirmBooking} className="space-y-5 max-w-md w-full mx-auto">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Enter Details</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-white shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-white shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1.5 uppercase tracking-wide">
                      Additional Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Please share anything that will help prepare for our meeting."
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-white resize-none shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !email}
                    className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming...</span>
                      </>
                    ) : (
                      <span>Schedule Meeting</span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]"
            >
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-bounce">
                <Check className="w-8 h-8" strokeWidth={3} />
              </div>

              <div className="space-y-2 max-w-md">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                  This meeting is scheduled
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  We sent a confirmation email with calendar invites to <strong className="text-neutral-800">{email}</strong>.
                </p>
              </div>

              {/* Event card details */}
              <div className="w-full max-w-sm border border-neutral-200 rounded-2xl p-5 text-left bg-neutral-50/50 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Scheduled Event</span>
                  <h4 className="text-sm font-bold text-neutral-900">30 Min Meeting with {userName}</h4>
                </div>

                <div className="space-y-2 border-t border-neutral-200/60 pt-3 text-xs font-semibold text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 text-neutral-400 flex items-center justify-center">🗓️</span>
                    <span>{selectedTime}, {getFullSelectedDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>30 minutes (Timezone: {timezone})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-neutral-400" />
                    <span>Cal Video (Link in invite)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
