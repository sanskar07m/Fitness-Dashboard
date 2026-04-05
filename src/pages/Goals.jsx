import { useState, useEffect } from 'react';
import { Target, Footprints, Flame, Scale, TrendingUp, Save } from 'lucide-react';
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage';

export default function Goals() {
  // Goals State
  const [goals, setGoals] = useState({
    steps: 10000,
    calories: 2500,
    weight: 75,
    currentWeight: 78
  });

  // Current Progress State (Calculated from other trackers)
  const [progress, setProgress] = useState({
    steps: 0,
    calories: 0
  });

  const [isSaved, setIsSaved] = useState(false);

  // Load Goals and Progress on Mount
  useEffect(() => {
    // 1. Load Goals
    const savedGoals = loadData(STORAGE_KEYS.GOALS);
    if (savedGoals) {
      setGoals(savedGoals);
    }

    // 2. Calculate Progress from Workouts
    const workouts = loadData(STORAGE_KEYS.ACTIVITY, []);
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const todaysProgress = workouts
      .filter(w => w.date === today)
      .reduce((acc, curr) => ({
        steps: acc.steps + (curr.steps || 0),
        calories: acc.calories + (curr.calories || 0)
      }), { steps: 0, calories: 0 });

    setProgress(todaysProgress);
  }, []);

  const handleInputChange = (e) => {
    setGoals({
      ...goals,
      [e.target.name]: parseInt(e.target.value) || 0
    });
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveData(STORAGE_KEYS.GOALS, goals);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Helper calculation for Weight Progress (assuming getting closer to goal)
  // Progress = Math.max(0, 100 - (abs(current - goal) / goal * 100)) is a bit complex.
  // Instead, let's say user started at (goal + 5kg) arbitrary, or just calculate 
  // percentage of weight lost toward goal if currentWeight > goal
  const calculateWeightProgress = () => {
    if (goals.currentWeight <= goals.weight) return 100;
    // Mocking an initial weight +10kg from goal for visual progress
    const initialWeight = goals.weight + 10; 
    const totalToLose = initialWeight - goals.weight;
    const lostSoFar = initialWeight - goals.currentWeight;
    
    const perc = Math.max(0, Math.min(100, Math.round((lostSoFar / totalToLose) * 100)));
    return perc || 0;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Goal Tracking</h1>
        <p className="text-slate-500 mt-1.5 text-sm sm:text-base font-medium">Set your daily targets and watch your progress soar.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Progress Visualization Column */}
        <div className="space-y-6">
          <ProgressBar 
            title="Daily Steps" 
            icon={Footprints} 
            colorClass="bg-primary"
            bgClass="bg-blue-50"
            iconColorClass="text-primary"
            current={progress.steps} 
            target={goals.steps} 
            unit="steps" 
          />
          <ProgressBar 
            title="Calories Burned" 
            icon={Flame} 
            colorClass="bg-orange-500"
            bgClass="bg-orange-50"
            iconColorClass="text-orange-600"
            current={progress.calories} 
            target={goals.calories} 
            unit="kcal" 
          />
          <ProgressBar 
            title="Target Weight" 
            icon={Scale} 
            colorClass="bg-emerald-500"
            bgClass="bg-emerald-50"
            iconColorClass="text-emerald-600"
            current={calculateWeightProgress()} 
            target={100} 
            unit="%"
            isWeight={true}
            actualCurrent={goals.currentWeight}
            actualGoal={goals.weight}
          />
        </div>

        {/* Set Goals Form */}
        <div>
          <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm sticky top-28 hover:shadow-soft transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                  <Target size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-800">Set Objectives</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 transition-all hover:bg-blue-50">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 tracking-wide mb-3">
                  <Footprints size={16} className="text-primary" /> Daily Step Goal
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" name="steps" value={goals.steps} onChange={handleInputChange} min="0" step="500"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-lg font-bold text-slate-900"
                  />
                  <span className="text-slate-500 font-medium">steps</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100/50 transition-all hover:bg-orange-50">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 tracking-wide mb-3">
                  <Flame size={16} className="text-orange-500" /> Daily Calories to Burn
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" name="calories" value={goals.calories} onChange={handleInputChange} min="0" step="50"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all text-lg font-bold text-slate-900"
                  />
                  <span className="text-slate-500 font-medium">kcal</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 transition-all hover:bg-emerald-50 space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 tracking-wide mb-1">
                  <Scale size={16} className="text-emerald-600" /> Weight Objectives
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide ml-1">Current (kg)</span>
                    <input 
                      type="number" name="currentWeight" value={goals.currentWeight} onChange={handleInputChange} min="0" step="0.1"
                      className="w-full mt-1.5 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-lg font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide ml-1">Target (kg)</span>
                    <input 
                      type="number" name="weight" value={goals.weight} onChange={handleInputChange} min="0" step="0.1"
                      className="w-full mt-1.5 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-lg font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all shadow-soft active:scale-[0.98]"
              >
                {isSaved ? <TrendingUp size={18} className="text-emerald-400" /> : <Save size={18} />}
                {isSaved ? "Objectives Saved!" : "Save Objectives"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

// Subcomponent for exactly styled Progress Bars
function ProgressBar({ title, icon: Icon, colorClass, bgClass, iconColorClass, current, target, unit, isWeight, actualCurrent, actualGoal }) {
  const percentage = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  
  return (
    <div className="bg-white p-6 sm:p-8 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${bgClass} ${iconColorClass} group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={22} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
        </div>
        <span className="text-2xl font-black text-slate-900 tracking-tight">
          {percentage}%
        </span>
      </div>

      <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
        <div 
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 text-sm font-medium">
        <span className="text-slate-500">
          <span className="text-slate-800 font-bold">{isWeight ? actualCurrent : current.toLocaleString()}</span> 
          {' '}{isWeight ? 'kg (Current)' : unit}
        </span>
        <span className="text-slate-400">
          Target: <span className="text-slate-700 font-bold">{isWeight ? actualGoal : target.toLocaleString()}</span> {isWeight ? 'kg' : ''}
        </span>
      </div>
    </div>
  );
}
