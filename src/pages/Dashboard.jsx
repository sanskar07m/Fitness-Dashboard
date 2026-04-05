import { useState, useEffect } from 'react';
import { Footprints, Flame, Utensils, Play, Target, ChevronRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import WeeklyProgressChart from '../components/WeeklyProgressChart';
import BMICalculator from '../components/BMICalculator';
import SmartSuggestions from '../components/SmartSuggestions';
import ActivityList from '../components/ActivityList';
import WaterTracker from '../components/WaterTracker';
import Achievements from '../components/Achievements';
import { loadData, STORAGE_KEYS } from '../utils/storage';

export default function Dashboard({ setCurrentPage }) {
  const [stats, setStats] = useState({ steps: 0, calories: 0, goalProgress: 0 });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let workouts = loadData(STORAGE_KEYS.ACTIVITY, []);
    const goals = loadData(STORAGE_KEYS.GOALS, { steps: 10000 });
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const todaysWorkouts = workouts.filter(w => w.date === today);
    const steps = todaysWorkouts.reduce((sum, w) => sum + (w.steps || 0), 0);
    const calories = todaysWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    const progress = Math.min(100, Math.round((steps / (goals.steps || 10000)) * 100));

    setStats({ steps, calories, goalProgress: progress || 0 });
    setActivities(workouts.reverse()); // Set full list for child slicing
  }, []);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Premium Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1e3a8a] to-primary rounded-[2rem] p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(43,108,176,0.4)] group">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-400/40 transition-colors duration-700 flex-shrink-0"></div>

        <div className="relative z-10 w-full lg:w-3/5 text-center lg:text-left mb-10 lg:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Your Daily Briefing
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            Ready to crush it today,<br className="hidden sm:block" /> <span className="text-blue-200">Alex?</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mt-8">
            <button 
              onClick={() => setCurrentPage && setCurrentPage('activity')}
              className="flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-2xl font-bold tracking-tight shadow-[0_10px_20px_-10px_rgba(255,255,255,0.6)] hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
            >
              <Play size={18} className="fill-primary" /> Start Workout
            </button>
            <button 
              onClick={() => setCurrentPage && setCurrentPage('goals')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-2xl font-bold tracking-tight backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
               View Objectives <ChevronRight size={18} />
            </button>
          </div>

          {/* Quick Stats Integrated */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-12">
            <div className="text-left">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Footprints size={14}/> Steps</p>
              <p className="text-3xl font-black text-white tracking-tight">{stats.steps.toLocaleString()}</p>
            </div>
            <div className="text-left">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Flame size={14}/> Burned</p>
              <p className="text-3xl font-black text-white tracking-tight">{stats.calories.toLocaleString()} <span className="text-sm font-medium text-white/60">kcal</span></p>
            </div>
            <div className="text-left">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Target size={14}/> Goal Progress</p>
              <p className="text-3xl font-black text-white tracking-tight">{stats.goalProgress}%</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full lg:w-2/5 flex justify-center lg:justify-end pt-8 lg:pt-0">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105 hover:-translate-y-2 group/img border-4 border-white/10">
            <img 
              src="/hero_illustration.png" 
              alt="Analytics Dashboard Illustration" 
              className="w-56 sm:w-72 lg:w-80 object-cover bg-white transition-transform duration-700 group-hover/img:scale-110" 
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem] pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* 3 Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Steps Today" 
          value="8,432" 
          icon={Footprints} 
          trend="down" 
          trendValue="3%" 
          color="#2b6cb0"
          secondaryColor="#eff6ff"
        />
        <StatCard 
          label="Calories Burned" 
          value="1,240 kcal" 
          icon={Flame} 
          trend="up" 
          trendValue="12%" 
          color="#ea580c"
          secondaryColor="#ffedd5"
        />
        <StatCard 
          label="Calories Intake" 
          value="1,650 kcal" 
          icon={Utensils} 
          trend="up" 
          trendValue="5%" 
          color="#10b981"
          secondaryColor="#d1fae5"
        />
      </div>

      {/* Main Charts & Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyProgressChart />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <WaterTracker isCompact={true} />
          <BMICalculator />
        </div>
      </div>

      {/* AI Insights & Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
        <div className="lg:col-span-2 bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
                <Footprints size={20} className="fill-primary/20" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-800">Recent Activity</h2>
                <p className="text-sm font-medium text-slate-500">Your latest logged workouts</p>
              </div>
            </div>
          </div>
          <ActivityList activities={activities} limit={4} />
        </div>
        
        <div className="lg:col-span-1">
          <Achievements />
        </div>
      </div>

      {/* AI Insights */}
      <div className="pb-6">
        <SmartSuggestions />
      </div>
    </div>
  );
}
