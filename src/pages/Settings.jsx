import { useState } from 'react';
import { User, Watch, Info, ShieldAlert, Code2, Check, X, Shield, Github, Linkedin, ExternalLink } from 'lucide-react';
import SettingsCard from '../components/SettingsCard';

export default function Settings() {
  const [hardware, setHardware] = useState([
    { id: 'sw1', name: 'Apple Watch Series 9', type: 'Smartwatch', connected: true },
    { id: 'fb1', name: 'Fitbit Charge 5', type: 'Fitness Band', connected: false }
  ]);

  const toggleConnection = (id) => {
    setHardware(hardware.map(hw => hw.id === id ? { ...hw, connected: !hw.connected } : hw));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-slate-500 mt-1.5 text-sm sm:text-base font-medium">Manage your profile, hardware integrations, and application metadata.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Section 1: Profile Settings */}
        <SettingsCard title="Profile Preferences" icon={User} theme={{ text: 'text-indigo-600', bg: 'bg-indigo-50' }}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
              <input type="text" defaultValue="Alex Jensen" className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
              <input type="email" defaultValue="alex.jensen@example.com" className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-white transition-all" />
            </div>
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors mt-2">
              Save Profile
            </button>
          </div>
        </SettingsCard>

        {/* Section 2: Wearable Devices */}
        <SettingsCard title="Connected Hardware" icon={Watch} theme={{ text: 'text-emerald-500', bg: 'bg-emerald-50' }}>
          <p className="mb-4 text-slate-500">Sync data automatically from validated hardware trackers.</p>
          <div className="space-y-3">
            {hardware.map(device => (
              <div key={device.id} className="flex items-center justify-between p-3.5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{device.name}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{device.type}</span>
                </div>
                <button 
                  onClick={() => toggleConnection(device.id)}
                  className={`p-2 rounded-xl border transition-all ${device.connected ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'}`}
                  title={device.connected ? 'Disconnect Device' : 'Connect Device'}
                >
                  {device.connected ? <Check size={18} /> : <X size={18} />}
                </button>
              </div>
            ))}
          </div>
        </SettingsCard>

        {/* Section 5: Developer Card */}
        <SettingsCard title="Developed By" icon={Code2} theme={{ text: 'text-rose-500', bg: 'bg-rose-50' }}>
          <div className="flex items-center gap-5 bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-[1.25rem] text-white overflow-hidden relative group shadow-sm">
            
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/40 transition-colors duration-700"></div>

            {/* Avatar block */}
            <div className="relative shrink-0 z-10">
              <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-white/20 p-1">
                <div className="w-full h-full bg-[url('https://ui-avatars.com/api/?name=Sanskar+More&background=2b6cb0&color=fff')] bg-cover rounded-full"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-[3px] border-slate-800 rounded-full"></div>
            </div>

            {/* Metatable */}
            <div className="z-10 relative">
              <h4 className="font-black text-xl tracking-tight leading-none mb-1">Sanskar More</h4>
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary/80 mb-3">Frontend Developer</p>
              
              <div className="flex gap-2">
                <a href="#" className="p-1.5 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg backdrop-blur-md transition-all inline-flex border border-white/5">
                  <Github size={16} />
                </a>
                <a href="#" className="p-1.5 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg backdrop-blur-md transition-all inline-flex border border-white/5">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* Section 3: About Us */}
        <div className="md:col-span-2 xl:col-span-1">
          <SettingsCard title="About Environment" icon={Info} theme={{ text: 'text-primary', bg: 'bg-blue-50' }}>
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col items-center text-center justify-center py-8">
              <div className="w-16 h-16 bg-white shadow-soft rounded-[1.25rem] flex items-center justify-center mb-4 text-primary">
                <ExternalLink size={28} />
              </div>
              <h4 className="font-black text-xl text-slate-800 mb-1 tracking-tight">FitTrack Pro</h4>
              <p className="text-sm font-medium text-slate-500 mb-4 px-4 leading-relaxed">
                This extremely dense analytical fitness dashboard is built utilizing bleeding-edge React architecture structurally styled heavily via Tailwind CSS. 
              </p>
              <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                v1.2.0 • Build ID 49A3B
              </div>
            </div>
          </SettingsCard>
        </div>

        {/* Section 4: Terms & Conditions */}
        <div className="md:col-span-2">
          <SettingsCard title="Legal & Compliance" icon={ShieldAlert} theme={{ text: 'text-amber-500', bg: 'bg-amber-50' }}>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 h-[240px] overflow-y-auto custom-scrollbar relative">
               <div className="flex items-center gap-2 mb-4 sticky top-0 bg-slate-50/90 backdrop-blur-md pb-2 pt-1 border-b border-slate-200 z-10">
                 <Shield size={16} className="text-amber-500" />
                 <h5 className="font-bold text-slate-800 text-sm tracking-tight">Terms & Conditions of Service</h5>
               </div>
               
               <div className="space-y-4 text-[13px] text-slate-500 leading-relaxed font-medium pb-2">
                 <p>1. <strong>Data Collection</strong>: FitTrack Pro processes personal health records locally inside your browser via local storage hooks. We strictly prohibit external telemetry tracking natively.</p>
                 <p>2. <strong>Limitation of Liability</strong>: None of the AI insights, macronutrient calculations, nor systemic hardware outputs rendered by FitTrack Pro qualify strictly as licensed medical advice. Users must expressly solicit verified clinical practitioners before engaging extreme calorific restriction plans.</p>
                 <p>3. <strong>Hardware API Protocols</strong>: Third party Bluetooth hardware integrations require external verification APIs mapping natively to HealthKit or Google Fit. We are not structurally responsible for desync losses.</p>
                 <p>4. <strong>Software Updates</strong>: Revisions and structural patches mapping across FitTrack Pro databases may completely overwrite user arrays depending on standard compliance architecture revisions deployed globally.</p>
                 <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae distinctio aliquid soluta obcaecati sed aut voluptatem hic dolorem recusandae, ex omnis vero est sapiente ut aspernatur iure voluptatibus. Magni, reiciendis.</p>
               </div>
            </div>
          </SettingsCard>
        </div>

      </div>
    </div>
  );
}
