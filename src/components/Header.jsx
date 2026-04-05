import { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, Droplet, Target, X } from 'lucide-react';
import { loadData, STORAGE_KEYS } from '../utils/storage';

export default function Header({ onMenuClick }) {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute live notifications
  useEffect(() => {
    const checkNotifications = () => {
      const goals = loadData(STORAGE_KEYS.GOALS, { steps: 10000 });
      const workouts = loadData(STORAGE_KEYS.ACTIVITY, []);
      const water = loadData(STORAGE_KEYS.WATER, { intake: 0, goal: 3000 });
      
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const todaysWorkouts = workouts.filter(w => (w.date === today || w.date === undefined));
      const steps = todaysWorkouts.reduce((sum, w) => sum + (w.steps || 0), 0);
  
      const alerts = [];
      
      // Step Goal Logic
      if (steps < (goals.steps || 10000)) {
        alerts.push({
          id: '1',
          icon: Target,
          title: 'Keep Moving!',
          message: `You missed your step goal today. You are ${((goals.steps || 10000) - steps).toLocaleString()} steps short.`,
          color: 'text-amber-500',
          bg: 'bg-amber-50',
          border: 'border-amber-100'
        });
      }
  
      // Hydration Logic
      if (water.intake < water.goal) {
        alerts.push({
          id: '2',
          icon: Droplet,
          title: 'Hydration Alert',
          message: 'Time to drink water! Stay hydrated to crush your workout.',
          color: 'text-cyan-500',
          bg: 'bg-cyan-50',
          border: 'border-cyan-100'
        });
      }
  
      setNotifications(alerts);
    };

    checkNotifications();
    // Re-check periodically when focused
    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-6 sm:px-8 lg:px-10 fixed top-0 right-0 left-0 md:left-72 z-20 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2.5 -ml-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-all active:scale-95">
          <Menu size={24} />
        </button>
        <div className="relative hidden sm:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" size={18} />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="pl-12 pr-4 py-2.5 bg-slate-100/50 hover:bg-slate-100 border border-transparent focus:border-primary/30 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 w-64 focus:w-80 transition-all duration-300 placeholder:text-slate-400 font-medium text-slate-700 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Notification Engine */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`relative p-2.5 transition-all rounded-xl active:scale-95 ${isDropdownOpen ? 'bg-blue-50 text-primary' : 'text-slate-400 hover:text-primary hover:bg-slate-50 hover:rotate-12'}`}
          >
            <Bell size={22} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm animate-pulse-slow"></span>
            )}
          </button>

          {/* Dropdown Panel */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 tracking-tight">Notifications</h3>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {notifications.length} New
                </span>
              </div>
              
              <div className="max-h-[350px] overflow-y-auto p-2 space-y-1">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 font-medium">
                    <p>All caught up!</p>
                  </div>
                ) : (
                  notifications.map((note) => {
                    const Icon = note.icon;
                    return (
                      <div key={note.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className={`p-2.5 rounded-xl h-fit shrink-0 border ${note.bg} ${note.color} ${note.border}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 mb-0.5 group-hover:text-primary transition-colors">{note.title}</h4>
                          <p className="text-xs font-medium text-slate-500 leading-relaxed">{note.message}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                  <button 
                    onClick={() => setNotifications([])}
                    className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-all"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="w-px h-8 bg-slate-200/80 hidden sm:block"></div>
        
        <button className="flex items-center gap-3.5 p-1.5 pl-4 group focus:outline-none focus:ring-4 focus:ring-primary/10 rounded-full sm:rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all duration-300">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors tracking-tight">Alex Jensen</p>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Pro Member</p>
          </div>
          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Alex+Jensen&background=2b6cb0&color=fff"
              alt="Profile"
              className="w-10 h-10 rounded-full ring-2 ring-white shadow-soft group-hover:shadow-md transition-all duration-300"
            />
            <div className="absolute bottom-0 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
        </button>
      </div>
    </header>
  );
}
