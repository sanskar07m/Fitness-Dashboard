import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Utensils, Plus, Trash2, Info } from 'lucide-react';
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage';
import MealSuggestion from '../components/MealSuggestion';
import DietCatalog from '../components/DietCatalog';

const COLORS = ['#2b6cb0', '#10b981', '#f59e0b']; // Protein, Carbs, Fats

export default function Diet() {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  // Load from localStorage
  useEffect(() => {
    setMeals(loadData(STORAGE_KEYS.DIET, []));
  }, []);

  // Save to localStorage
  useEffect(() => {
    saveData(STORAGE_KEYS.DIET, meals);
  }, [meals]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeal = {
      id: Date.now().toString(),
      name: formData.name || 'Custom Meal',
      calories: parseInt(formData.calories) || 0,
      protein: parseInt(formData.protein) || 0,
      carbs: parseInt(formData.carbs) || 0,
      fats: parseInt(formData.fats) || 0,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMeals([newMeal, ...meals]);
    setFormData({ name: '', calories: '', protein: '', carbs: '', fats: '' });
  };

  const handleDelete = (id) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  // Calculations
  const totals = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats,
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const chartData = [
    { name: 'Protein', value: totals.protein || 1 },
    { name: 'Carbs', value: totals.carbs || 1 },
    { name: 'Fats', value: totals.fats || 1 }
  ];

  const isEmpty = totals.calories === 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Diet Tracking</h1>
        <p className="text-slate-500 mt-1.5 text-sm sm:text-base font-medium">Log your meals and monitor your daily macronutrients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Meals List */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Add Meal Card */}
          <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Utensils size={20} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-800">Add a Meal</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 label-text">Meal Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Grilled Chicken Salad"
                    className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:bg-white transition-all text-sm font-medium"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5">Calories (kcal)</label>
                  <input 
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    placeholder="450"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:bg-white transition-all text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 text-primary">Protein (g)</label>
                  <input 
                    type="number"
                    name="protein"
                    value={formData.protein}
                    onChange={handleInputChange}
                    placeholder="35"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:bg-white transition-all text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 text-emerald-600">Carbs (g)</label>
                  <input 
                    type="number"
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleInputChange}
                    placeholder="40"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 focus:bg-white transition-all text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 text-amber-500">Fats (g)</label>
                  <input 
                    type="number"
                    name="fats"
                    value={formData.fats}
                    onChange={handleInputChange}
                    placeholder="15"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/40 focus:bg-white transition-all text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-soft active:scale-[0.98]"
              >
                <Plus size={18} />
                Add Meal
              </button>
            </form>
          </div>

          {/* Meals List */}
          <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-6">Today's Log</h2>
            
            {meals.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-flex p-4 bg-slate-50 rounded-full mb-3 border border-slate-100">
                  <Utensils size={28} className="text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium tracking-wide">No meals logged today yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {meals.map((meal) => (
                  <div key={meal.id} className="group relative flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-slate-200 hover:shadow-soft transition-all duration-300">
                    <div>
                      <p className="font-bold text-slate-800">{meal.name}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-sm">
                        <span className="font-semibold text-orange-600">{meal.calories} kcal</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="font-medium text-slate-500">P: <span className="text-primary">{meal.protein}g</span></span>
                        <span className="font-medium text-slate-500">C: <span className="text-emerald-600">{meal.carbs}g</span></span>
                        <span className="font-medium text-slate-500">F: <span className="text-amber-500">{meal.fats}g</span></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-sm">
                      <span className="text-slate-400 font-medium">{meal.time}</span>
                      <button 
                        onClick={() => handleDelete(meal.id)}
                        className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete meal"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Chart & Totals */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
            <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-2">Macro Distribution</h2>
            <p className="text-sm font-medium text-slate-500 mb-6">Today's breakdown by macronutrient</p>
            
            <div className="flex justify-center items-center h-64 relative">
              {isEmpty ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <PieChart width={240} height={240}>
                    <Pie data={[{value: 1}]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#f1f5f9" dataKey="value" stroke="none" />
                  </PieChart>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 flex flex-col items-center">
                    <Info size={24} className="mb-2" />
                    <span className="text-sm font-medium px-4">Add data to view chart</span>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={6}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)', fontWeight: 'bold' }} 
                      itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                      formatter={(value) => [`${value}g`]}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 600, fontSize: '13px' }}/>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-500 mb-1">Total Calories</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-black tracking-tight text-slate-900">{totals.calories}</p>
                  <span className="text-sm font-semibold text-slate-400">kcal</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-500 mb-1">Target</p>
                <div className="flex items-baseline gap-1 justify-end">
                  <p className="text-xl font-bold tracking-tight text-slate-900">2,400</p>
                  <span className="text-sm font-semibold text-slate-400">kcal</span>
                </div>
              </div>
            </div>
            
            {!isEmpty && (
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-slate-800">{totals.protein}g</p>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mt-0.5">Protein</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{totals.carbs}g</p>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mt-0.5">Carbs</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{totals.fats}g</p>
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-wide mt-0.5">Fats</p>
                </div>
              </div>
            )}
            
          </div>
          
          <div className="mt-8">
            <MealSuggestion />
          </div>
        </div>
      </div>

      {/* Database Integration */}
      <DietCatalog />

    </div>
  );
}
