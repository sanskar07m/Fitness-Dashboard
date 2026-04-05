import { useState, useEffect } from 'react';
import { Activity as ActivityIcon, Save, Calendar, Clock, Flame, Footprints } from 'lucide-react';
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage';
import ActivityList from '../components/ActivityList';

export default function Activity() {
  const [workouts, setWorkouts] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    steps: '',
    calories: ''
  });

  // Load from localStorage on mount and mock if empty
  useEffect(() => {
    const rawData = loadData(STORAGE_KEYS.ACTIVITY, []);
    
    if (rawData.length === 0) {
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      const defaultData = [
        { id: Date.now() + 1, name: 'Morning Run', duration: 30, calories: 250, steps: 4000, date: today },
        { id: Date.now() + 2, name: 'Gym Workout', duration: 45, calories: 350, steps: 3000, date: today },
        { id: Date.now() + 3, name: 'Evening Walk', duration: 20, calories: 150, steps: 2500, date: yesterday }
      ];
      
      saveData(STORAGE_KEYS.ACTIVITY, defaultData);
      setWorkouts(defaultData);
    } else {
      setWorkouts(rawData);
    }
  }, []);

  // Save to localStorage whenever workouts change
  useEffect(() => {
    saveData(STORAGE_KEYS.ACTIVITY, workouts);
  }, [workouts]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.duration) {
      const payload = {
        id: Date.now(),
        name: formData.name,
        duration: parseInt(formData.duration) || 0,
        calories: parseInt(formData.calories) || 0,
        steps: parseInt(formData.steps) || 0,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      // Prepend to array
      setWorkouts([payload, ...workouts]);
      setFormData({ name: '', duration: '', calories: '', steps: '' });
    }
  };

  const handleDelete = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Activity Tracking</h1>
        <p className="text-slate-500 mt-1.5 text-sm sm:text-base">Log your daily workouts, steps, and calories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Form Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
                <ActivityIcon size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Log New Activity</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Workout Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Morning Run, Weightlifting"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-sm"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Duration (min)</label>
                  <input 
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="45"
                    min="1"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Calories Burned</label>
                  <input 
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    placeholder="350"
                    min="0"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Steps Taken</label>
                <input 
                  type="number"
                  name="steps"
                  value={formData.steps}
                  onChange={handleInputChange}
                  placeholder="e.g. 5000"
                  min="0"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-sm"
                />
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30"
              >
                <Save size={18} />
                Save Activity
              </button>
            </form>
          </div>
        </div>

        {/* History Table Card */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-[1.25rem] border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-soft flex flex-col h-full">
            <h3 className="text-xl font-bold tracking-tight text-slate-800 mb-6">Activity Log</h3>
            <ActivityList activities={workouts} onDelete={handleDelete} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
