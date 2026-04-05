import { useState, useEffect } from 'react';
import { Trophy, Flame, Footprints, Lock, Medal } from 'lucide-react';
import { loadData, STORAGE_KEYS } from '../utils/storage';

export default function Achievements() {
  const [badges, setBadges] = useState({
    streak: false,
    steps10k: false,
    goal: false
  });

  useEffect(() => {
    const workouts = loadData(STORAGE_KEYS.ACTIVITY, []);
    const goals = loadData(STORAGE_KEYS.GOALS, { steps: 10000 });
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // 1. Calculate 10k Steps Milestone (Any Day)
    const stepsPerDay = {};
    workouts.forEach(w => {
      if (!stepsPerDay[w.date]) stepsPerDay[w.date] = 0;
      stepsPerDay[w.date] += Number(w.steps) || 0;
    });
    const has10k = Object.values(stepsPerDay).some(val => val >= 10000);

    // 2. Goal Achieved Today
    const todaysSteps = stepsPerDay[todayStr] || 0;
    const hasGoal = todaysSteps > 0 && todaysSteps >= (goals.steps || 10000);

    // 3. 7-Day Streak Check
    const uniqueDates = Object.keys(stepsPerDay);
    let streakCount = 0;
    let trackDate = new Date();
    
    for (let i = 0; i < 30; i++) {
      const dStr = trackDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      if (uniqueDates.includes(dStr)) { 
        streakCount++; 
      } else if (i !== 0) { 
        // We break the sequence if a day is missing (tolerating 'today' missing if user hasn't logged yet)
        break; 
      }
      trackDate.setDate(trackDate.getDate() - 1);
    }
    
    // For pure UI demonstration purposes on new accounts with no data, we can unlock '10k' if they hit it, etc.
    setBadges({
      streak: streakCount >= 7,
      steps10k: has10k,
      goal: hasGoal
    });

  }, []);

  const badgeArray = [
    {
      id: 'streak',
      title: '7-Day Streak',
      desc: 'Workout consecutively',
      icon: Flame,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-200/50',
      unlocked: badges.streak
    },
    {
      id: 'steps',
      title: '10k Club',
      desc: 'Log 10,000 steps',
      icon: Footprints,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200/50',
      unlocked: badges.steps10k
    },
    {
      id: 'goal',
      title: 'Goal Crusher',
      desc: 'Hit today\'s target',
      icon: Trophy,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200/50',
      unlocked: badges.goal
    }
  ];

  return (
    <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-soft flex flex-col h-full w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl">
          <Medal size={20} className="fill-yellow-600/20" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">Trophy Room</h2>
          <p className="text-sm font-medium text-slate-500">Your unlocked SaaS milestones</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        {badgeArray.map(badge => {
          const Icon = badge.icon;
          const isUnlocked = badge.unlocked;

          return (
            <div 
              key={badge.id}
              className={`flex items-center gap-4 p-4 rounded-[1rem] border transition-all duration-300 ${isUnlocked ? `bg-white hover:shadow-md hover:-translate-y-0.5 ${badge.border}` : 'bg-slate-50/50 border-slate-100 opacity-75 grayscale hover:grayscale-0 hover:opacity-100'}`}
            >
              <div className={`relative p-3.5 rounded-xl shrink-0 ${isUnlocked ? `${badge.bg} ${badge.color}` : 'bg-slate-200 text-slate-400'}`}>
                <Icon size={22} className={isUnlocked ? `fill-current opacity-20` : ''} />
                
                {!isUnlocked && (
                  <div className="absolute -bottom-1.5 -right-1.5 bg-slate-100 border-2 border-white text-slate-500 rounded-full p-0.5">
                    <Lock size={10} />
                  </div>
                )}
                {isUnlocked && (
                  <div className="absolute -inset-1 bg-current opacity-[0.15] blur-md rounded-full pointer-events-none"></div>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-bold leading-tight ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>{badge.title}</h4>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{badge.desc}</p>
              </div>

              {isUnlocked && (
                <span className="text-[10px] font-black uppercase text-white bg-slate-900 px-2 py-1 rounded-md shadow-sm">
                  Unlocked
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
