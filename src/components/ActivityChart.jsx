import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', calories: 1200, activeMinutes: 45 },
  { name: 'Tue', calories: 2100, activeMinutes: 90 },
  { name: 'Wed', calories: 1500, activeMinutes: 60 },
  { name: 'Thu', calories: 1800, activeMinutes: 75 },
  { name: 'Fri', calories: 2400, activeMinutes: 110 },
  { name: 'Sat', calories: 2800, activeMinutes: 150 },
  { name: 'Sun', calories: 1100, activeMinutes: 30 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-lg">
        <p className="font-bold text-slate-900 mb-2">{label}</p>
        <p className="text-sm" style={{ color: '#2b6cb0' }}>
          Calories: <span className="font-semibold">{payload[0].value} kcal</span>
        </p>
        <p className="text-sm text-blue-400">
          Duration: <span className="font-semibold">{payload[1].value} mins</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ActivityChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Activity Overview</h3>
        <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-600">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="calories" fill="#2b6cb0" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="activeMinutes" fill="#60a5fa" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
