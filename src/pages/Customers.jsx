import React, { useState } from 'react';
import { Search, MoreVertical, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';

const Customers = () => {
  const { data: customers, loading } = useFetch(api.getCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  // Search Logic
  const filteredCustomers = customers?.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-view">
      <div className="page-title-area">
        <h2 className="text-2xl font-bold hover-underline-animation">Customers</h2>
        <div className="search-bar group">
           <Search className="search-icon" size={18} />
           <input 
             type="text" 
             placeholder="Search customers..." 
             className="search-input" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-3">
            <Loader2 size={32} className="animate-spin text-blue-500" />
            <p>Loading customers...</p>
          </div>
        ) : filteredCustomers?.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No customers found.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-700/50 text-gray-100 font-medium uppercase">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Spent</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-700/30 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <td className="p-4 font-medium text-white">{customer.name}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${customer.color}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-gray-300">${customer.spent.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button className="p-1 hover:text-white hover:bg-gray-700 rounded transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;