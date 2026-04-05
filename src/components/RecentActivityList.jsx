import { useState, useEffect } from 'react';
import { Play, Clock, Flame, Footprints, Calendar } from 'lucide-react';
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage';

export default function RecentActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // 1. Fetch live activity list
    const existingWorkouts = loadData(STORAGE_KEYS.ACTIVITY, []);

    // 2. Mock fallback logic if totally empty
    if (existingWorkouts.length === 0) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const mockData = [
        {
          id: Date.now() + 1,
          name: 'Morning Power Walk',
          duration: 45,
          calories: 320,
          steps: 4500,
          date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },
        {
          id: Date.now() + 2,
          name: 'Evening HIIT Routine',
          duration: 30,
          calories: 450,
          steps: 2300,
          date: yesterday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },
        {
          id: Date.now() + 3,
          name: 'Light Recovery Jog',
          duration: 20,
          calories: 210,
          steps: 3250,
          date: yesterday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
      ];
      
      saveData(STORAGE_KEYS.ACTIVITY, mockData);
      setActivities(mockData);
    } else {
      // Show up to 4 most recent activities on the dashboard
      setActivities(existingWorkouts.slice(-4).reverse());
    }
  }, []);

  return (
    <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
            <Play size={20} className="fill-primary/20" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">Recent Activity</h2>
            <p className="text-sm font-medium text-slate-500">Your latest logged workouts</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((workout) => (
          <div 
            key={workout.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-soft hover:border-slate-200 transition-all duration-300 group"
          >
            <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 rounded-[1rem] bg-indigo-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-sm border border-indigo-100/50">
                <Play size={20} className="ml-0.5 fill-primary" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 tracking-tight leading-tight mb-1">{workout.name}</h4>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Calendar size={12} className="text-primary/70" /> {workout.date}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 sm:gap-8 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 pl-16 sm:pl-0">
              <div className="flex flex-col gap-0.5 text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 sm:justify-end">
                  <Clock size={10} /> Time
                </span>
                <span className="text-sm font-bold text-slate-700">{workout.duration}m</span>
              </div>
              
              <div className="flex flex-col gap-0.5 text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400/80 flex items-center gap-1 sm:justify-end">
                  <Flame size={10} /> Cals
                </span>
                <span className="text-sm font-bold text-orange-600">{workout.calories}</span>
              </div>
              
              <div className="flex flex-col gap-0.5 text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 flex items-center gap-1 sm:justify-end">
                  <Footprints size={10} /> Steps
                </span>
                <span className="text-sm font-bold text-emerald-600">{workout.steps}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
