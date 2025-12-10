import React, { useState } from 'react';
import { 
  Users, DollarSign, TrendingUp, Settings, ArrowUpRight, ArrowDownRight, 
  Bell, ChevronLeft, ChevronRight, MessageSquare, AlertCircle, CheckCircle, Loader2 
} from 'lucide-react';
import CountUp from '../components/CountUp';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import { exportToCSV } from '../utils/exportHelper'; 

const Overview = () => {
  const { data: stats, loading: statsLoading } = useFetch(api.getOverviewStats);
  const { data: notifications, loading: notifLoading } = useFetch(api.getNotifications);
  const [timeRange, setTimeRange] = useState('7');
  
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const safeNotifications = notifications || [];
  const totalPages = Math.ceil(safeNotifications.length / itemsPerPage);
  const currentNotifications = safeNotifications.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNext = () => { if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1); };
  const handlePrev = () => { if (currentPage > 0) setCurrentPage(prev => prev - 1); };
  const handleDownload = () => { if (stats) exportToCSV([stats], 'overview_report'); };

  const getIcon = (type) => {
    switch(type) {
        case 'alert': return <AlertCircle size={16} />;
        case 'sale': return <DollarSign size={16} />;
        case 'message': return <MessageSquare size={16} />;
        case 'success': return <CheckCircle size={16} />;
        default: return <Users size={16} />;
    }
  };

  return (
    <div className="dashboard-view">
      <div className="page-title-area">
        <div>
          <h2 className="text-2xl font-bold hover-underline-animation">Dashboard Overview</h2>
          <p className="text-gray-400 text-sm mt-1">Welcome back, here is what's happening today.</p>
        </div>
        <button onClick={handleDownload} className="primary-btn">Download Report</button>
      </div>

      {/* --- STATS GRID --- */}
      <div className="stats-grid">
        <StatCard title="Total Revenue" isLoading={statsLoading} value={stats ? <CountUp end={stats.revenue} prefix="$" /> : "0"} change="+12%" isPositive={true} icon={<DollarSign size={20} className="text-blue-400" />} />
        <StatCard title="Active Users" isLoading={statsLoading} value={stats ? <CountUp end={stats.users} /> : "0"} change="+5%" isPositive={true} icon={<Users size={20} className="text-purple-400" />} />
        <StatCard title="Bounce Rate" isLoading={statsLoading} value={stats ? <CountUp end={stats.bounceRate} suffix="%" /> : "0"} change="-2%" isPositive={false} icon={<TrendingUp size={20} className="text-orange-400" />} />
        <StatCard title="Server Load" isLoading={statsLoading} value={stats ? <CountUp end={stats.serverLoad} suffix="%" /> : "0"} change="+8%" isPositive={false} icon={<Settings size={20} className="text-green-400" />} />
      </div>

      <div className="charts-grid">
        {/* --- MAIN CHART CONTAINER (Uses glass-card) --- */}
        <div className="glass-card rounded-2xl p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-white">Revenue Analytics</h3>
            <select className="dropdown" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
          <div className="chart-placeholder">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="bar-container group" style={{ height: `${timeRange === '30' ? h * 0.8 + 10 : h}%` }}>
                <div className="tooltip">${timeRange === '30' ? (h * 4) : h}k</div>
                <div className="bar-fill" style={{ height: `${h/2}%` }}></div>
              </div>
            ))}
          </div>
          <div className="chart-labels">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* --- NOTIFICATION PANEL (Uses glass-card) --- */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-[400px]">
          
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-white">
              <Bell size={18} className="text-blue-400" /> Notifications
            </h3>
            {!notifLoading && <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">{safeNotifications.length} Total</span>}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {notifLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2"><Loader2 size={24} className="animate-spin text-blue-500" /><span className="text-xs">Fetching updates...</span></div>
            ) : currentNotifications.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">No notifications</div>
            ) : (
                currentNotifications.map((item) => (
                <div key={item.id} className="activity-item group animate-in slide-in-from-right-4 duration-300 hover:bg-white/5 rounded-xl p-3">
                    <div className={`activity-icon shrink-0 ${item.color} text-white shadow-lg`}>{getIcon(item.type)}</div>
                    <div><p className="text-sm font-medium text-gray-200 group-hover:text-blue-300 transition-colors">{item.text}</p><p className="text-xs text-gray-500">{item.time}</p></div>
                </div>
                ))
            )}
          </div>

          {!notifLoading && safeNotifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center shrink-0">
                <button onClick={handlePrev} disabled={currentPage === 0} className={`secondary-btn flex items-center gap-1 text-xs px-3 py-2 transition-opacity duration-200 ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}><ChevronLeft size={14} /> Previous</button>
                <span className="text-xs text-gray-500 font-mono">{currentPage + 1} / {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`primary-btn flex items-center gap-1 text-xs px-3 py-2 transition-opacity duration-200 ${currentPage === totalPages - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>Next <ChevronRight size={14} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- STAT CARD (Inherits .glass-card via prop or wrapper) ---
function StatCard({ title, value, change, isPositive, icon, isLoading }) {
  return (
    // Applied glass-card class here
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          {isLoading ? <div className="h-8 w-32 bg-gray-600 rounded animate-pulse mt-2 shadow-inner"></div> : <h4 className="text-2xl font-bold mt-2 text-gray-100">{value}</h4>}
        </div>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">{icon}</div>
      </div>
      {!isLoading && (
        <div className="flex items-center gap-1 mt-4 text-sm animate-in fade-in duration-500">
            <span className={`flex items-center ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>{isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}{change}</span>
            <span className="text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
}

export default Overview;