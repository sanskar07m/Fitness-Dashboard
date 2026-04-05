import { useState, useEffect } from 'react';
import { User, Mail, Shield, Smartphone, Star, CheckCircle, Edit2, Save, X, Activity, Scale, Calendar, Target } from 'lucide-react';
import { loadData, saveData, STORAGE_KEYS } from '../utils/storage';

const PROFILE_KEY = 'fitlife_profile';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Jensen',
    email: 'alex.jensen@example.com',
    phone: '+1 (555) 123-4567',
    height: 175,
    weight: 75,
    age: 28,
    goal: 'Build Muscle & Tone'
  });

  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    const savedProfile = loadData(PROFILE_KEY);
    
    if (savedProfile) {
      setProfile(savedProfile);
      setFormData(savedProfile);
    } else {
      // Sync initial weight from goals if available just as a nice touch
      const goalsData = loadData(STORAGE_KEYS.GOALS);
      if (goalsData && goalsData.currentWeight) {
        setProfile(p => ({ ...p, weight: goalsData.currentWeight }));
        setFormData(p => ({ ...p, weight: goalsData.currentWeight }));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setProfile(formData);
    saveData(PROFILE_KEY, formData);
    
    // Also quietly sync weight across to goals just to be nice
    const savedGoals = loadData(STORAGE_KEYS.GOALS);
    if (savedGoals) {
      saveData(STORAGE_KEYS.GOALS, { ...savedGoals, currentWeight: parseInt(formData.weight) || savedGoals.currentWeight });
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Header Image Banner */}
      <div className="relative w-full h-64 md:h-80 rounded-[1.25rem] overflow-hidden shadow-soft group">
        <img 
          src="/profile_header.png" 
          alt="Profile Header" 
          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-[2s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
          <div className="relative">
            <img 
              src={`https://ui-avatars.com/api/?name=${profile.name.replace(' ', '+')}&background=2b6cb0&color=fff&size=512`} 
              alt={profile.name} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl hover:-translate-y-1 transition-transform"
            />
            <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center" title="Online">
              <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-black text-white tracking-tight">{profile.name}</h1>
            <p className="text-blue-200 font-medium tracking-wide flex items-center justify-center md:justify-start gap-1">
              <Star size={16} className="fill-blue-200" /> Pro Member
            </p>
          </div>
          
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold tracking-tight shadow-md hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Personal Metrics */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white rounded-[1.25rem] p-7 border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="p-2 bg-blue-50 text-primary rounded-lg shrink-0">
                <User size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Personal Details</h3>
            </div>

            {isEditing ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 whitespace-nowrap">Full Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 whitespace-nowrap">Fitness Goal</label>
                    <input 
                      type="text" name="goal" value={formData.goal} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 whitespace-nowrap">Height (cm)</label>
                    <input 
                      type="number" name="height" value={formData.height} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 whitespace-nowrap">Weight (kg)</label>
                    <input 
                      type="number" name="weight" value={formData.weight} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 whitespace-nowrap">Age</label>
                    <input 
                      type="number" name="age" value={formData.age} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 whitespace-nowrap">Email</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={handleSave} className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-soft active:scale-[0.98]">
                    <Save size={18} /> Save Details
                  </button>
                  <button onClick={handleCancel} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all active:scale-[0.98]">
                    <X size={18} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 animate-in zoom-in-95 duration-300">
                <MetricDisplay icon={Target} colorClass="text-purple-500" bgClass="bg-purple-50" label="Fitness Goal" value={profile.goal} />
                <MetricDisplay icon={Activity} colorClass="text-primary" bgClass="bg-blue-50" label="Height" value={`${profile.height} cm`} />
                <MetricDisplay icon={Scale} colorClass="text-emerald-500" bgClass="bg-emerald-50" label="Weight" value={`${profile.weight} kg`} />
                <MetricDisplay icon={Calendar} colorClass="text-orange-500" bgClass="bg-orange-50" label="Age" value={`${profile.age} years`} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Account Meta & Security */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-[1.25rem] p-7 border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-5 tracking-tight border-b border-slate-100 pb-3">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-600 hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 whitespace-nowrap">Email Address</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-600 hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Smartphone size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 whitespace-nowrap">Phone Number</p>
                  <p className="text-sm font-semibold text-slate-700">{profile.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[1.25rem] p-7 border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
              <Shield className="text-slate-700" size={20} />
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Security</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 rounded-2xl transition-all shadow-sm">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Two-Factor Auth</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Extra layer of security</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
                  <CheckCircle size={14} />
                  <span className="text-xs font-bold uppercase tracking-wide">On</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 rounded-2xl transition-all shadow-sm">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Public Profile</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Shared community stats</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricDisplay({ icon: Icon, colorClass, bgClass, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${bgClass} ${colorClass}`}>
        <Icon size={22} />
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</h4>
        <p className="text-lg font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
