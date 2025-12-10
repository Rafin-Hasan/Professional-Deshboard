import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import CountUp from '../components/CountUp'; 
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import { exportToCSV } from '../utils/exportHelper';

const Sales = () => {
  const { data, loading } = useFetch(api.getSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);

  const finance = data?.financials || {};
  const transactions = data?.transactions || [];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.id.toString().includes(searchTerm) || tx.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showOnlyCompleted ? tx.status === 'Completed' : true;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => { exportToCSV(filteredTransactions, 'sales_transactions'); };

  return (
    <div className="dashboard-view">
      <div className="page-title-area">
        <h2 className="text-2xl font-bold hover-underline-animation">Sales & Revenue</h2>
        <div className="flex gap-2">
            <button onClick={() => setShowOnlyCompleted(!showOnlyCompleted)} className={`secondary-btn flex items-center gap-2 ${showOnlyCompleted ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' : ''}`}><Filter size={16} /> {showOnlyCompleted ? 'Show All' : 'Filter Completed'}</button>
            <button onClick={handleExport} className="primary-btn flex items-center gap-2"><Download size={16} /> Export CSV</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard loading={loading} label="Net Profit" value={finance.netProfit} prefix="$" highlight={true} />
        <StatCard loading={loading} label="Gross Revenue" value={finance.grossRevenue} prefix="$" />
        <StatCard loading={loading} label="Avg. Order Value" value={finance.avgOrder} prefix="$" suffix=".00" />
        <StatCard loading={loading} label="Refunds" value={finance.refunds} suffix="%" />
      </div>

      <div className="glass-card rounded-xl overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <input type="text" placeholder="Search ID or Name..." className="search-input py-1 px-3 text-sm w-48" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-gray-200 border-b border-white/10">
            <tr><th className="p-4">Invoice ID</th><th className="p-4">Customer</th><th className="p-4">Date</th><th className="p-4">Amount</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? ( <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading transactions...</td></tr> ) : (
              filteredTransactions.map((tx, index) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors animate-in slide-in-from-bottom-2 duration-500">
                  <td className="p-4 font-mono text-blue-400">#INV-{tx.id}</td>
                  <td className="p-4 text-white font-medium">{tx.user}</td>
                  <td className="p-4">{tx.date}</td>
                  <td className="p-4 text-white font-bold"><CountUp end={tx.amount} prefix="$" suffix={Number.isInteger(tx.amount) ? ".00" : ""} /></td>
                  <td className="p-4"><span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : tx.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>{tx.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ loading, label, value, prefix, suffix, highlight }) => (
  <div className={`rounded-xl p-6 border shadow-lg hover:-translate-y-1 transition-transform duration-300 ${highlight ? 'bg-blue-600 border-transparent text-white shadow-blue-900/20' : 'glass-card'}`}>
      <p className={`text-sm font-medium ${highlight ? 'text-blue-100' : 'text-gray-400'}`}>{label}</p>
      {loading ? ( <div className={`h-8 w-24 rounded animate-pulse mt-2 ${highlight ? 'bg-blue-400/50' : 'bg-gray-600'}`}></div> ) : ( <h3 className="text-3xl font-bold mt-2"><CountUp end={value} prefix={prefix} suffix={suffix} /></h3> )}
  </div>
);

export default Sales;