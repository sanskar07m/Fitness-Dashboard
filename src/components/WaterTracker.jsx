import { useState, useEffect } from 'react';
import { Droplet, Plus, Minus, RotateCcw, Settings, Check, X } from 'lucide-react';
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage';

export default function WaterTracker({ isCompact }) {
  const [waterData, setWaterData] = useState({ intake: 0, goal: 3000, date: '' });
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(3000);

  useEffect(() => {
    const rawData = loadData(STORAGE_KEYS.WATER, { intake: 0, goal: 3000, date: '' });
    const today = new Date().toLocaleDateString();

    // Auto-reset daily logic
    if (rawData.date !== today) {
      const resetData = { intake: 0, goal: rawData.goal || 3000, date: today };
      saveData(STORAGE_KEYS.WATER, resetData);
      setWaterData(resetData);
      setTempGoal(resetData.goal);
    } else {
      setWaterData(rawData);
      setTempGoal(rawData.goal);
    }
  }, []);

  const addWater = (amount) => {
    const newIntake = Math.min(waterData.intake + amount, 10000); // hard cap logic
    const payload = { ...waterData, intake: newIntake };
    setWaterData(payload);
    saveData(STORAGE_KEYS.WATER, payload);
  };

  const resetWater = () => {
    const payload = { ...waterData, intake: 0 };
    setWaterData(payload);
    saveData(STORAGE_KEYS.WATER, payload);
  };

  const saveGoal = () => {
    const safeGoal = Math.max(500, parseInt(tempGoal) || 3000);
    const payload = { ...waterData, goal: safeGoal };
    setWaterData(payload);
    saveData(STORAGE_KEYS.WATER, payload);
    setIsEditingGoal(false);
  };

  const percentage = Math.min(100, Math.round((waterData.intake / waterData.goal) * 100));
  const remaining = Math.max(0, waterData.goal - waterData.intake);
  const isComplete = waterData.intake >= waterData.goal;

  // ------------------------------------------------------------- //
  // MODE 1: COMPACT DASHBOARD CARD
  // ------------------------------------------------------------- //
  if (isCompact) {
    return (
      <div className="bg-white p-7 rounded-[1.25rem] border border-cyan-100 shadow-sm hover:shadow-soft transition-all duration-300 relative overflow-hidden group">
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-50 rounded-full blur-[40px] pointer-events-none transition-all group-hover:bg-cyan-100/50"></div>
        
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl transition-colors duration-500 ${isComplete ? 'bg-emerald-50 text-emerald-500' : 'bg-cyan-50 text-cyan-500'}`}>
              <Droplet size={20} className={isComplete ? 'fill-emerald-500' : 'fill-cyan-500/20'} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-800">Hydration</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">Today's Intake</p>
            </div>
          </div>
          <button 
            onClick={() => addWater(250)}
            className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-90 flex items-center justify-center shrink-0"
            title="Quick add 250ml"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-black text-slate-900 tracking-tight">{(waterData.intake / 1000).toFixed(2)}</span>
              <span className="text-sm font-bold text-slate-400 ml-1 tracking-wide">/ {(waterData.goal / 1000).toFixed(1)}L</span>
            </div>
            <span className={`text-sm font-bold ${isComplete ? 'text-emerald-500' : 'text-cyan-600'}`}>{percentage}%</span>
          </div>
          
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isComplete ? 'bg-emerald-500' : 'bg-cyan-500'}`}
              style={{ width: `${percentage}%` }}
            >
               <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------- //
  // MODE 2: FULL DETAILED PAGE TRACKER
  // ------------------------------------------------------------- //
  // SVG Circle variables
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-[1.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-10 md:gap-16 items-center">
      
      {/* Visual Ring Section */}
      <div className="relative w-64 h-64 flex shrink-0 items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
          <circle 
            cx="100" 
            cy="100" 
            r={radius} 
            fill="transparent" 
            stroke={isComplete ? '#10b981' : '#06b6d4'} 
            strokeWidth="16" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
          <Droplet size={32} className={`mb-2 transition-colors duration-500 ${isComplete ? 'text-emerald-500 fill-emerald-500/20' : 'text-cyan-500 fill-cyan-500/10'}`} />
          <span className="text-4xl font-black text-slate-800 tracking-tight relative">
            {percentage}
            <span className="text-lg font-bold text-slate-400 absolute top-1 -right-4">%</span>
          </span>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Daily Goal</p>
        </div>
      </div>

      {/* Control Section */}
      <div className="flex-1 w-full space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-2">Hydration Tracker</h2>
            <p className="text-sm font-medium text-slate-500">Log your glasses to hit your {waterData.goal / 1000}L daily minimum.</p>
          </div>
          <button onClick={resetWater} title="Reset for the day" className="p-2.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Dynamic Meta Data Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-600/70 mb-1">Current Intake</p>
            <p className="text-2xl font-bold text-cyan-700">{(waterData.intake / 1000).toFixed(2)}<span className="text-sm font-medium text-cyan-600/60 ml-1">L</span></p>
          </div>
          <div className={`p-4 rounded-2xl border transition-colors ${isComplete ? 'bg-emerald-50/50 border-emerald-100/50' : 'bg-slate-50 border-slate-100'}`}>
            <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${isComplete ? 'text-emerald-600/70' : 'text-slate-400'}`}>Remaining</p>
            <p className={`text-2xl font-bold ${isComplete ? 'text-emerald-700' : 'text-slate-700'}`}>
               {isComplete ? 'Completed!' : `${(remaining / 1000).toFixed(2)}`}
               {!isComplete && <span className="text-sm font-medium opacity-60 ml-1">L</span>}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Log Activity</p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => addWater(250)}
              className="flex-1 min-w-[120px] bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Plus size={16} className="text-cyan-400" /> 250 ml <span className="text-[10px] font-medium text-slate-400">(Glass)</span>
            </button>
            <button 
              onClick={() => addWater(500)}
              className="flex-1 min-w-[120px] bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Plus size={16} className="text-primary" /> 500 ml <span className="text-[10px] font-medium text-slate-500">(Bottle)</span>
            </button>
          </div>
        </div>

        {/* Goal Settings inline row */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-4">
            {isEditingGoal ? (
              <div className="flex flex-1 items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <input 
                  type="number" 
                  value={tempGoal} 
                  onChange={(e) => setTempGoal(e.target.value)}
                  className="flex-1 bg-transparent px-2 font-bold text-slate-700 focus:outline-none"
                  min="500" step="100"
                />
                <span className="text-sm font-bold text-slate-400 pr-2">ml</span>
                <button onClick={saveGoal} className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg shadow-sm">
                  <Check size={16} />
                </button>
                <button onClick={() => { setIsEditingGoal(false); setTempGoal(waterData.goal); }} className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditingGoal(true)}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
              >
                <Settings size={14} /> Adjust Daily Minimum Goal ({waterData.goal}ml)
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
