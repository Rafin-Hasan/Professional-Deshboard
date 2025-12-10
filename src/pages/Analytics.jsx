import React from 'react';
import { Eye, Clock, MousePointer, Globe, Smartphone, Monitor } from 'lucide-react';
import CountUp from '../components/CountUp';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';

const Analytics = () => {
  const { data, loading } = useFetch(api.getAnalytics);
  const stats = data?.stats || {};
  const devices = data?.deviceTraffic || {};
  const pages = data?.topPages || [];

  return (
    <div className="dashboard-view">
      <div className="page-title-area">
        <h2 className="text-2xl font-bold hover-underline-animation">Analytics & Traffic</h2>
        <select className="dropdown"><option>Last 30 Days</option><option>Last 90 Days</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Page Views" loading={loading} value={loading ? 0 : <CountUp end={stats.pageViews} />} icon={<Eye size={20} className="text-blue-400" />} color="blue" />
        <MetricCard title="Avg. Session" loading={loading} value={loading ? "..." : stats.avgSession} icon={<Clock size={20} className="text-green-400" />} color="green" />
        <MetricCard title="Bounce Rate" loading={loading} value={loading ? 0 : <CountUp end={stats.bounceRate} suffix="%" />} icon={<MousePointer size={20} className="text-purple-400" />} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-bold mb-6 text-white">Traffic by Device</h3>
          <div className="space-y-4">
            {loading ? ( <div className="h-32 bg-gray-700/20 rounded animate-pulse"></div> ) : (
              <>
                <ProgressBar label="Desktop" value={`${devices.desktop}%`} icon={<Monitor size={16} />} color="bg-blue-500" />
                <ProgressBar label="Mobile" value={`${devices.mobile}%`} icon={<Smartphone size={16} />} color="bg-purple-500" />
                <ProgressBar label="Tablet" value={`${devices.tablet}%`} icon={<Globe size={16} />} color="bg-green-500" />
              </>
            )}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 min-h-[300px]">
          <h3 className="font-bold mb-4 text-white">Top Pages Visited</h3>
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-white/5 text-gray-200">
              <tr><th className="px-3 py-2 rounded-l-lg">Page URL</th><th className="px-3 py-2 rounded-r-lg text-right">Views</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? ( <tr><td colSpan="2" className="p-8 text-center">Loading data...</td></tr> ) : (
                pages.map((page, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors animate-in slide-in-from-right-4 duration-500">
                    <td className="px-3 py-3 font-mono text-blue-300">{page.path}</td>
                    <td className="px-3 py-3 text-right font-medium text-white"><CountUp end={page.views} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color, loading }) => (
  <div className="glass-card p-6 rounded-xl flex items-center justify-between hover:translate-y-[-5px] transition-transform duration-300">
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      {loading ? ( <div className="h-8 w-24 bg-gray-600 rounded animate-pulse mt-2"></div> ) : ( <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3> )}
    </div>
    <div className={`p-3 rounded-lg bg-${color}-500/10`}>{icon}</div>
  </div>
);

const ProgressBar = ({ label, value, icon, color }) => (
  <div className="animate-in fade-in zoom-in duration-700">
    <div className="flex justify-between items-center mb-1 text-sm text-gray-300">
      <div className="flex items-center gap-2">{icon} <span>{label}</span></div>
      <span>{value}</span>
    </div>
    <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
      <div className={`progress-fill ${color} h-2.5 rounded-full`} style={{ width: value }}></div>
    </div>
  </div>
);

export default Analytics;