import { useState } from 'react';
import { MEAL_PLANS } from '../data/mealPlans';
import MealCard from './MealCard';

export default function DietCatalog() {
  const [activeTab, setActiveTab] = useState(MEAL_PLANS[0].id);
  const [filter, setFilter] = useState('all'); // all, veg, nonveg

  const currentCategory = MEAL_PLANS.find(plan => plan.id === activeTab);

  // Derive filtered meals
  let displayMeals = [];
  if (filter === 'all') {
    displayMeals = [...currentCategory.veg, ...currentCategory.nonVeg];
  } else if (filter === 'veg') {
    displayMeals = currentCategory.veg;
  } else {
    displayMeals = currentCategory.nonVeg;
  }

  return (
    <div className="bg-slate-50/50 p-6 sm:p-8 rounded-[2rem] border border-slate-200/50 shadow-inner mt-8 animate-in fade-in duration-700">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dietary Catalog</h2>
          <p className="text-slate-500 font-medium max-w-lg mt-1.5 leading-relaxed">
            Explore curated meals mathematically designed around your exact fitness targets. Switch tabs below to view differing diets.
          </p>
        </div>

        {/* Veg / Non-Veg Toggle Filter */}
        <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden shrink-0">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${filter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
          >
            All Mix
          </button>
          <button 
            onClick={() => setFilter('veg')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${filter === 'veg' ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-md' : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'}`}
          >
            🥦 Veg
          </button>
          <button 
            onClick={() => setFilter('nonVeg')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${filter === 'nonVeg' ? 'bg-orange-500 text-white shadow-orange-500/20 shadow-md' : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'}`}
          >
            🍗 Meat
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-2 scrollbar-hide">
        {MEAL_PLANS.map(plan => (
          <button
            key={plan.id}
            onClick={() => setActiveTab(plan.id)}
            className={`flex items-center gap-2.5 shrink-0 px-6 py-3.5 rounded-[1.25rem] font-bold transition-all duration-300 border ${
              activeTab === plan.id 
                ? 'bg-white border-primary/20 text-primary shadow-soft ring-2 ring-primary/10' 
                : 'bg-white/60 border-slate-200/60 text-slate-500 hover:bg-white hover:border-slate-300 hover:text-slate-700 hover:shadow-sm'
            }`}
          >
            <span className="text-xl">{plan.icon}</span> 
            {plan.title}
          </button>
        ))}
      </div>

      {/* Grid Rendering */}
      <div className="bg-white p-7 rounded-[1.5rem] border border-slate-200/60 shadow-sm min-h-[400px]">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
           <span className="p-3 bg-slate-50 rounded-xl text-2xl filter drop-shadow-sm">{currentCategory.icon}</span>
           <div>
             <h3 className="text-xl font-bold text-slate-800">{currentCategory.title} Focused Meals</h3>
             <p className="text-sm font-medium text-slate-500">{currentCategory.desc} curated options matching your toggle criteria.</p>
           </div>
        </div>

        {displayMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-500">
             {displayMeals.map(meal => (
               <MealCard key={meal.id} meal={meal} />
             ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
            <span className="text-5xl opacity-40 mb-4 tracking-tighter">🤷‍♂️🍲</span>
            <h4 className="text-lg font-bold text-slate-800">No Meals Found</h4>
            <p className="text-slate-500 text-sm max-w-sm mt-1">We couldn't find any specific recipes matching these exact filters yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
