export default function SettingsCard({ title, icon: Icon, children, theme = { text: 'text-primary', bg: 'bg-blue-50' } }) {
  return (
    <div className="bg-white p-7 rounded-[1.5rem] border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col h-full group">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-[1rem] ${theme.bg} ${theme.text} transition-transform group-hover:scale-105`}>
          <Icon size={22} className="opacity-90" />
        </div>
        <h3 className="text-[1.3rem] font-bold tracking-tight text-slate-800">{title}</h3>
      </div>
      <div className="flex-1 text-slate-600 font-medium text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
