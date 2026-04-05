export default function MealCard({ meal }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-soft hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img 
          src={meal.img} 
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Badges Floating Top Right */}
        {meal.badges && meal.badges.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {meal.badges.map((badge, idx) => {
              const bg = badge.includes('Low Cal') ? 'bg-emerald-500' : 
                         badge.includes('Protein') ? 'bg-orange-500' :
                         badge.includes('High Cal') ? 'bg-rose-500' :
                         'bg-primary';
              return (
                <span key={idx} className={`text-[10px] uppercase tracking-wider font-bold text-white px-2.5 py-1 ${bg} shadow-md rounded-md backdrop-blur-sm backdrop-filter backdrop-saturate-200`}>
                  {badge}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{meal.name}</h4>
        
        <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-xl border border-slate-100 w-fit">
          <span className="text-xl font-black text-slate-800 tracking-tight">{meal.cals}</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Kcal</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-center gap-2">
           <div className="flex-1 bg-blue-50/50 p-2 rounded-xl group-hover:bg-blue-50 transition-colors">
             <p className="text-sm font-bold text-slate-700">{meal.prot}g</p>
             <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-0.5">Protein</p>
           </div>
           <div className="flex-1 bg-emerald-50/50 p-2 rounded-xl group-hover:bg-emerald-50 transition-colors">
             <p className="text-sm font-bold text-slate-700">{meal.carbs}g</p>
             <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mt-0.5">Carbs</p>
           </div>
           <div className="flex-1 bg-amber-50/50 p-2 rounded-xl group-hover:bg-amber-50 transition-colors">
             <p className="text-sm font-bold text-slate-700">{meal.fat}g</p>
             <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mt-0.5">Fat</p>
           </div>
        </div>
      </div>
    </div>
  );
}
