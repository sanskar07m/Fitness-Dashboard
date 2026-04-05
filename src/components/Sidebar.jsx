import { LayoutDashboard, Activity, Droplet, UtensilsCrossed, Target, User, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, currentPage, setCurrentPage }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Activity, label: 'Activity', id: 'activity' },
    { icon: Droplet, label: 'Water', id: 'water' },
    { icon: UtensilsCrossed, label: 'Diet', id: 'diet' },
    { icon: Target, label: 'Goals', id: 'goals' },
    { icon: User, label: 'Profile', id: 'profile' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 bg-white w-72 border-r border-slate-200/60 flex flex-col z-30 transition-all duration-400 ease-out shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex items-center justify-between px-8 h-20 border-b border-slate-100/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-soft shadow-primary/20">
            F
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            FitLife
          </span>
        </div>
        <button className="md:hidden p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-50 transition-all active:scale-95" onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if(setCurrentPage) setCurrentPage(item.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 group ${
                active
                  ? 'bg-primary text-white shadow-soft shadow-primary/30 translate-x-1'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors duration-300 ${active ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white group-hover:shadow-sm'}`}>
                <Icon size={18} className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-primary'}`} />
              </div>
              <span className="text-[15px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Upgrade Call to action */}
      <div className="p-6 mt-auto">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-float relative overflow-hidden group border border-slate-700">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-colors duration-500"></div>
          <p className="text-sm font-semibold text-slate-300 mb-1">FitLife Pro</p>
          <p className="font-bold text-lg leading-tight mb-4 tracking-tight relative z-10">Get personalized coaching insights</p>
          <button className="w-full bg-white text-slate-900 font-semibold py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md relative z-10 active:scale-95">Upgrade</button>
        </div>
      </div>
    </aside>
  );
}
