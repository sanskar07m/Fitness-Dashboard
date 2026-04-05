import { useState, useEffect } from 'react';
import { Lightbulb, Utensils, Footprints, Flame } from 'lucide-react';
import { loadData, STORAGE_KEYS } from '../utils/storage';

export default function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // 1. Fetch Goals
    const goals = loadData(STORAGE_KEYS.GOALS, { steps: 10000, calories: 2500 });
    
    // Intake Goal (from Diet tracker defaults)
    const intakeGoal = 2400; 
    const proteinTarget = 160; // Standard goal

    // 2. Fetch Activity (Steps & Calories Burned)
    const workouts = loadData(STORAGE_KEYS.ACTIVITY, []);
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const todaysWorkouts = workouts.filter(w => w.date === today);
    const todaysSteps = todaysWorkouts.reduce((sum, w) => sum + (w.steps || 0), 0);

    // 3. Fetch Diet (Calories Intake & Protein)
    const meals = loadData(STORAGE_KEYS.DIET, []);
    const todaysIntake = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const todaysProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);

    // 4. Generate Logic
    const newSuggestions = [];

    // Rule 1: Calorie constraints
    if (todaysIntake >= intakeGoal * 0.9) {
      // NEW RULE: Calories High -> Suggest Low Calorie
      newSuggestions.push({
        id: 'cals_high',
        icon: Utensils,
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        title: 'Approaching Calorie Limit',
        desc: `You are nearing your ${intakeGoal} kcal limit. Switch to low-calorie meals like salads, fresh fruits, or clear soups.`
      });
    } else if (todaysIntake < intakeGoal * 0.8) {
      const remaining = intakeGoal - todaysIntake;
      newSuggestions.push({
        id: 'cals',
        icon: Utensils,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        title: "You're under your calorie target",
        desc: `You need ${remaining} more kcal today. Eat healthy snacks like nuts, avocado, or smoothies.`
      });
    }

    // Rule 2: Protein is Low
    if (todaysProtein < proteinTarget * 0.8) {
      newSuggestions.push({
        id: 'prot',
        icon: Flame,
        color: 'text-rose-500',
        bg: 'bg-rose-50',
        title: 'Boost your protein intake',
        desc: `You've only consumed ${todaysProtein}g of protein. Focus on high-protein meals like eggs, chicken breast, or paneer.`
      });
    }

    // Rule 3: Steps < Goal
    if (todaysSteps < goals.steps) {
      const missing = goals.steps - todaysSteps;
      newSuggestions.push({
        id: 'step',
        icon: Footprints,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        title: "Let's get moving!",
        desc: `You are ${missing.toLocaleString()} steps away from your daily goal. A brisk 20-minute walk could help close the gap.`
      });
    }

    // Default Suggestion if doing great
    if (newSuggestions.length === 0) {
      newSuggestions.push({
        id: 'great',
        icon: Lightbulb,
        color: 'text-primary',
        bg: 'bg-blue-50',
        title: "You're crushing it today!",
        desc: "Your steps and nutrition are perfectly on track. Keep up the fantastic work and make sure to stay hydrated."
      });
    }

    setSuggestions(newSuggestions);
  }, []);

  return (
    <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl">
          <Lightbulb size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">Smart AI Insights</h2>
          <p className="text-sm font-medium text-slate-500">Personalized suggestions based on today's data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {suggestions.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-soft hover:border-slate-200 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1 leading-tight">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
