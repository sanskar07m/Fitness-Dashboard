import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: 'Mon', burned: 2400, intake: 2100 },
  { day: 'Tue', burned: 2800, intake: 2300 },
  { day: 'Wed', burned: 2100, intake: 2200 },
  { day: 'Thu', burned: 2900, intake: 2000 },
  { day: 'Fri', burned: 3100, intake: 2400 },
  { day: 'Sat', burned: 3500, intake: 2600 },
  { day: 'Sun', burned: 2200, intake: 2100 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur shadow-xl border border-slate-100 p-4 rounded-xl">
        <p className="font-bold text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-sm font-medium text-slate-600">
              {entry.name}: <span className="font-bold text-slate-900">{entry.value} kcal</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function WeeklyProgressChart() {
  return (
    <div className="bg-white p-7 rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-soft transition-all duration-300 w-full group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-800">Weekly Progress</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Calories burned vs intake over the last 7 days</p>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-sm font-medium rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 cursor-pointer transition-all hover:bg-slate-100">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2b6cb0" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2b6cb0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} 
              dy={15} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            
            <Line 
              type="monotone" 
              dataKey="burned" 
              name="Calories Burned" 
              stroke="#2b6cb0" 
              strokeWidth={4}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#2b6cb0' }}
            />
            <Line 
              type="monotone" 
              dataKey="intake" 
              name="Calories Intake" 
              stroke="#10b981" 
              strokeWidth={4}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
