export default function StatCard({ label, value, icon: Icon, trend, trendValue, color, secondaryColor }) {
  return (
    <div className="bg-white p-6 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-float hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-[13px] font-semibold uppercase tracking-wider mb-2">{label}</p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-800">{value}</h3>
        </div>
        <div 
          className="p-3.5 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm" 
          style={{ backgroundColor: secondaryColor, color: color }}
        >
          <Icon size={24} />
        </div>
      </div>
      
      <div className="mt-5 flex items-center gap-2 text-[13px]">
        <span 
          className={`font-semibold inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
            trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 
            trend === 'down' ? 'text-amber-700 bg-amber-50' : 
            'text-slate-600 bg-slate-50'
          }`}
        >
          {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
        </span>
        <span className="text-slate-400 font-medium">vs last week</span>
      </div>
    </div>
  );
}
