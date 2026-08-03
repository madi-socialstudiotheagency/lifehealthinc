import React from 'react';

const colorMap = {
  blue:  { bg: 'bg-blue-50',  icon: 'bg-blue-100 text-blue-600',  value: 'text-blue-700' },
  green: { bg: 'bg-green-50', icon: 'bg-green-100 text-green-600', value: 'text-green-700' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-600', value: 'text-amber-700' },
};

export default function MetricCard({ label, value, icon: Icon, color = 'blue' }) {
  const c = colorMap[color];
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-5`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${c.value}`}>{value}</p>
      </div>
    </div>
  );
}