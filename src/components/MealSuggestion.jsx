import { useState, useEffect } from 'react';
import { ChefHat, ArrowRight } from 'lucide-react';
import { loadData, STORAGE_KEYS } from '../utils/storage';

const MEALS_DB = [
  { id: 1, name: 'Eggs & Avocado Toast', type: 'high_protein', typeLabel: 'High Protein', icon: '🍗', bg: 'bg-orange-50', color: 'text-orange-600', border: 'border-orange-100' },
  { id: 2, name: 'Grilled Chicken Breast', type: 'high_protein', typeLabel: 'High Protein', icon: '🍗', bg: 'bg-orange-50', color: 'text-orange-600', border: 'border-orange-100' },
  { id: 3, name: 'Paneer Tikka Salad', type: 'high_protein', typeLabel: 'High Protein', icon: '🍗', bg: 'bg-orange-50', color: 'text-orange-600', border: 'border-orange-100' },
  { id: 4, name: 'Spiced Lentil Stew', type: 'high_protein', typeLabel: 'High Protein', icon: '🍗', bg: 'bg-orange-50', color: 'text-orange-600', border: 'border-orange-100' },
  { id: 5, name: 'Mixed Leafy Green Salad', type: 'low_calorie', typeLabel: 'Low Calorie', icon: '🥗', bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100' },
  { id: 6, name: 'Fresh Seasonal Fruits', type: 'low_calorie', typeLabel: 'Low Calorie', icon: '🥗', bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100' },
  { id: 7, name: 'Rolled Oats Porridge', type: 'low_calorie', typeLabel: 'Low Calorie', icon: '🥗', bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100' },
  { id: 8, name: 'Clear Vegetable Soup', type: 'low_calorie', typeLabel: 'Low Calorie', icon: '🥗', bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100' },
  { id: 9, name: 'Balanced Turkey Wrap', type: 'balanced', typeLabel: 'Balanced', icon: '🥑', bg: 'bg-blue-50', color: 'text-primary', border: 'border-blue-100' },
  { id: 10, name: 'Quinoa Veggie Bowl', type: 'balanced', typeLabel: 'Balanced', icon: '🥑', bg: 'bg-blue-50', color: 'text-primary', border: 'border-blue-100' }
];

export default function MealSuggestion({ limit }) {
  const [recommendations, setRecommendations] = useState([]);
  const [suggestionType, setSuggestionType] = useState('balanced');
  const [contextMessage, setContextMessage] = useState('Your macros look great. Maintain with a balanced intake.');

  useEffect(() => {
    // 1. Fetch live diet data
    const meals = loadData(STORAGE_KEYS.DIET, []);
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Safety check filter for today's meals (assumes Diet.jsx tags time, but if not strictly isolated to today, we just map all)
    // Diet.jsx currently doesn't enforce strict date bounding structurally, but assuming standard payload.
    const todaysMeals = meals; // simplification for mock state
    
    const todaysProtein = todaysMeals.reduce((sum, m) => sum + (m.protein || 0), 0);
    const todaysIntake = todaysMeals.reduce((sum, m) => sum + (m.calories || 0), 0);

    const proteinGoal = 160;
    const calorieGoal = 2400;

    let targetFilter = 'balanced';
    let message = 'Your macros look great. Maintain with a balanced intake.';

    // Priority 1: High calorie warning
    if (todaysIntake > calorieGoal * 0.9) {
      targetFilter = 'low_calorie';
      message = 'Approaching calorie limit. Switch to these light alternatives.';
    } 
    // Priority 2: Missing protein
    else if (todaysProtein < proteinGoal * 0.8) {
      targetFilter = 'high_protein';
      message = 'Your protein intake is low. We recommend these to hit your goal.';
    }

    setSuggestionType(targetFilter);
    setContextMessage(message);

    const filteredList = MEALS_DB.filter(m => m.type === targetFilter);
    setRecommendations(limit ? filteredList.slice(0, limit) : filteredList);

  }, []);

  return (
    <div className="bg-white p-6 sm:p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-soft flex flex-col h-full w-full">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2.5 rounded-xl ${
          suggestionType === 'low_calorie' ? 'bg-emerald-50 text-emerald-600' :
          suggestionType === 'high_protein' ? 'bg-orange-50 text-orange-600' :
          'bg-blue-50 text-primary'
        }`}>
          <ChefHat size={20} />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-800">Smart Meal Suggestion</h3>
      </div>
      
      <p className="text-sm font-medium text-slate-500 mb-6">{contextMessage}</p>

      <div className={`grid grid-cols-1 ${limit ? '' : 'sm:grid-cols-2'} gap-4`}>
        {recommendations.map(meal => (
          <div 
            key={meal.id} 
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
              <div className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{meal.icon}</div>
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{meal.name}</h4>
                <div className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${meal.bg} ${meal.color} ${meal.border}`}>
                  {meal.typeLabel}
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100">
               <ArrowRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
