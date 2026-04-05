export default function DietMacros() {
  const macros = [
    { label: 'Protein', current: 120, target: 160, color: 'bg-primary' },
    { label: 'Carbs', current: 200, target: 250, color: 'bg-emerald-500' },
    { label: 'Fats', current: 45, target: 70, color: 'bg-amber-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Today's Macros</h3>
        <button className="text-sm text-primary font-medium hover:underline">Log Meal</button>
      </div>

      <div className="space-y-6">
        {macros.map((macro) => {
          const percentage = Math.min(100, Math.round((macro.current / macro.target) * 100));
          
          return (
            <div key={macro.label}>
              <div className="flex justify-between items-end mb-2">
                <span className="font-semibold text-slate-700">{macro.label}</span>
                <span className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">{macro.current}g</span> / {macro.target}g
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${macro.color}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Calories Consumed</p>
          <p className="text-xl font-bold text-slate-900">1,640 <span className="text-sm font-normal text-slate-500">/ 2,400 kcal</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Remaining</p>
          <p className="text-xl font-bold text-emerald-600">760 kcal</p>
        </div>
      </div>
    </div>
  );
}
