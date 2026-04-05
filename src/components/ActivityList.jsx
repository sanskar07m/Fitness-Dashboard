import { Play, Clock, Flame, Footprints, Calendar, Trash2 } from 'lucide-react';

export default function ActivityList({ activities, onDelete, limit }) {
  // Option to slice if its rendered on the dashboard
  const displayActivities = limit ? activities.slice(0, limit) : activities;

  if (!displayActivities || displayActivities.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-12 bg-slate-50/50 rounded-[1.25rem] border border-slate-100 shadow-sm">
        <img 
          src="/empty_activity.png" 
          alt="No activities logged" 
          className="w-48 h-48 object-contain mb-4 rounded-3xl"
        />
        <h3 className="text-xl font-bold text-slate-800 mb-2">No activities logged yet</h3>
        <p className="text-sm text-slate-500 max-w-sm font-medium">Use the form to add your first workout and start tracking progress.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {displayActivities.map((workout) => (
        <div 
          key={workout.id} 
          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-soft hover:border-slate-200 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Subtle gradient bar on the left indicating type */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 opacity-60"></div>

          <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0 ml-2">
            <div className="w-12 h-12 rounded-[1rem] bg-indigo-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-sm border border-indigo-100/50">
              <Play size={20} className="ml-0.5 fill-primary" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 tracking-tight leading-tight mb-1">{workout.name}</h4>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Calendar size={12} className="text-primary/70" /> {workout.date || 'Today'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 pl-14 sm:pl-0">
            <div className="flex flex-col gap-0.5 text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 sm:justify-end">
                <Clock size={10} /> Time
              </span>
              <span className="text-sm font-bold text-slate-700">{workout.duration}m</span>
            </div>
            
            <div className="flex flex-col gap-0.5 text-left sm:text-right w-16">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400/80 flex items-center gap-1 sm:justify-end">
                <Flame size={10} /> Cals
              </span>
              <span className="text-sm font-bold text-orange-600">{workout.calories}</span>
            </div>
            
            <div className="flex flex-col gap-0.5 text-left sm:text-right w-16">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 flex items-center gap-1 sm:justify-end">
                <Footprints size={10} /> Steps
              </span>
              <span className="text-sm font-bold text-emerald-600">{workout.steps}</span>
            </div>

            {/* Smart Delete Hook */}
            {onDelete && (
              <button 
                onClick={() => onDelete(workout.id)} 
                className="ml-2 sm:ml-4 p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 rounded-xl transition-all shadow-sm active:scale-95"
                title="Delete workout"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
