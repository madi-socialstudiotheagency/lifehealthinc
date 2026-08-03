import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight } from 'lucide-react';

const statusColors = {
  active:   'bg-green-100 text-green-700',
  prospect: 'bg-blue-100 text-blue-700',
  inactive: 'bg-slate-100 text-slate-600',
  lost:     'bg-red-100 text-red-600',
};

export default function ClientTable({ clients, policies, search, onSearchChange, onSelectClient, selectedClientId }) {
  const getPolicyCount = (clientId) =>
    policies.filter(p => p.clientId === clientId && p.status === 'active').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-800">Clients</h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name, email, state…"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">State</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Active Policies</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  No clients found.
                </td>
              </tr>
            )}
            {clients.map(client => (
              <tr
                key={client.id}
                onClick={() => onSelectClient(client)}
                className={`border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 ${
                  selectedClientId === client.id ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {client.firstName} {client.lastName}
                </td>
                <td className="px-6 py-4 text-slate-600">{client.email}</td>
                <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{client.phone || '—'}</td>
                <td className="px-6 py-4 text-slate-600">{client.state || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[client.status] || 'bg-slate-100 text-slate-600'}`}>
                    {client.status || 'prospect'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">{getPolicyCount(client.id)}</td>
                <td className="px-4 py-4 text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 text-xs text-slate-400 border-t border-slate-100">
        {clients.length} client{clients.length !== 1 ? 's' : ''} shown
      </div>
    </div>
  );
}