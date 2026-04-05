import { useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      
      let category = '';
      let colorClass = '';
      let bgClass = '';
      
      if (bmiValue < 18.5) {
        category = 'Underweight';
        colorClass = 'text-amber-600';
        bgClass = 'bg-amber-50';
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        category = 'Normal';
        colorClass = 'text-emerald-600';
        bgClass = 'bg-emerald-50';
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        category = 'Overweight';
        colorClass = 'text-orange-500';
        bgClass = 'bg-orange-50';
      } else {
        category = 'Obese';
        colorClass = 'text-rose-600';
        bgClass = 'bg-rose-50';
      }

      setResult({ value: bmiValue, category, colorClass, bgClass });
    }
  };

  return (
    <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
          <Activity size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">BMI Calculator</h2>
          <p className="text-sm font-medium text-slate-500">Body Mass Index checker</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Form Section */}
        <form onSubmit={calculateBMI} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 label-text">Height (cm)</label>
            <input 
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 175"
              step="1"
              min="50"
              max="300"
              className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:bg-white transition-all text-sm font-medium"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 tracking-wide mb-1.5 label-text">Weight (kg)</label>
            <input 
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
              step="0.1"
              min="20"
              max="500"
              className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:bg-white transition-all text-sm font-medium"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-2 flex items-center justify-between px-5 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-soft active:scale-[0.98] group"
          >
            Calculate BMI
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Result Section */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-center items-center text-center relative overflow-hidden">
          {result ? (
            <div className="animate-in zoom-in-95 duration-300">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Your Result</p>
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-5xl font-black text-slate-900 tracking-tight">{result.value}</span>
                <span className="text-lg font-bold text-slate-400 mb-1">BMI</span>
              </div>
              <div className={`mt-4 inline-flex items-center px-4 py-1.5 rounded-full ${result.bgClass}`}>
                <span className={`text-sm font-bold uppercase tracking-wide ${result.colorClass}`}>
                  {result.category}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-slate-400">
              <Activity size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">Enter your height and weight to calculate your BMI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
