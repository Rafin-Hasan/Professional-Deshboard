import React, { useState } from 'react';
import { Users, DollarSign, TrendingUp, Settings, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import CountUp from '../components/CountUp';
import { exportToCSV } from '../utils/exportHelper'; // Import helper

const Overview = () => {
  // State for Time Range
  const [timeRange, setTimeRange] = useState('7'); // '7' or '30'

  // Mock Data Generators (Simulating API changes based on time range)
  const multiplier = timeRange === '30' ? 4 : 1; // Scale numbers if 30 days
  
  const statsData = [
    { title: "Total Revenue", value: 54230 * multiplier, prefix: "$", icon: <DollarSign size={20} className="text-blue-400" />, change: "+12%", isPositive: true },
    { title: "Active Users", value: 2450 * multiplier, prefix: "", icon: <Users size={20} className="text-purple-400" />, change: "+5%", isPositive: true },
    { title: "Bounce Rate", value: 42, prefix: "", suffix: "%", icon: <TrendingUp size={20} className="text-orange-400" />, change: "-2%", isPositive: false },
    { title: "Server Load", value: 34, prefix: "", suffix: "%", icon: <Settings size={20} className="text-green-400" />, change: "+8%", isPositive: false },
  ];

  // Handle Download
  const handleDownload = () => {
    // Format data for CSV
    const csvData = statsData.map(item => ({
      Metric: item.title,
      Value: item.value,
      Change: item.change
    }));
    exportToCSV(csvData, `overview_report_${timeRange}days`);
  };

  return (
    <div className="dashboard-view">
      <div className="page-title-area">
        <div>
          <h2 className="text-2xl font-bold hover-underline-animation">Dashboard Overview</h2>
          <p className="text-gray-400 text-sm mt-1">Welcome back, here is what's happening today.</p>
        </div>
        <button onClick={handleDownload} className="primary-btn">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title} 
            value={<CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix || ""} />} 
            change={stat.change} 
            isPositive={stat.isPositive} 
            icon={stat.icon} 
          />
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Revenue Analytics</h3>
            <select 
              className="dropdown" 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
          {/* Chart Bars (Simulated Change) */}
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

        {/* Keeping Notifications Static for brevity, or reuse your Activity Code here */}
        <div className="chart-card flex items-center justify-center text-gray-500">
           Recent Activity Widget
        </div>
      </div>
    </div>
  );
};

function StatCard({ title, value, change, isPositive, icon }) {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <h4 className="text-2xl font-bold mt-2 text-gray-100">{value}</h4>
        </div>
        <div className="p-2 bg-gray-700/50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-center gap-1 mt-4 text-sm">
        <span className={`flex items-center ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}
        </span>
        <span className="text-gray-500">vs last month</span>
      </div>
    </div>
  );
}

export default Overview;