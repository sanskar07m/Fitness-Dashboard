import WaterTracker from '../components/WaterTracker';

export default function Water() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Hydration Tracker</h1>
        <p className="text-slate-500 mt-1.5 text-sm sm:text-base">Monitor your daily water intake and stay deeply hydrated.</p>
      </div>

      <div className="w-full max-w-4xl">
        <WaterTracker isCompact={false} />
      </div>
      
      {/* Hydration Facts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-12">
         {/* Simple educational blocks matching the SaaS theme */}
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
           <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 text-cyan-600 font-bold">1</div>
           <div>
             <h4 className="font-bold text-slate-800 mb-1">Boosts Energy</h4>
             <p className="text-sm text-slate-500 font-medium">Dehydration directly impacts stamina, reducing your workout efficiency by up to 20%.</p>
           </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
           <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 text-cyan-600 font-bold">2</div>
           <div>
             <h4 className="font-bold text-slate-800 mb-1">Muscle Recovery</h4>
             <p className="text-sm text-slate-500 font-medium">Water lubricates joints and helps transport vital nutrients specifically required to rebuild torn muscle strings.</p>
           </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
           <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 text-cyan-600 font-bold">3</div>
           <div>
             <h4 className="font-bold text-slate-800 mb-1">Diet Synthesis</h4>
             <p className="text-sm text-slate-500 font-medium">Adequate hydration improves metabolism functionality and helps digest protein intake rapidly.</p>
           </div>
         </div>
      </div>
    </div>
  );
}
