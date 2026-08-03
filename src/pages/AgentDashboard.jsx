import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import MetricCard from '@/components/dashboard/MetricCard';
import ClientTable from '@/components/dashboard/ClientTable';
import ClientDetailPanel from '@/components/dashboard/ClientDetailPanel';
import { Users, DollarSign, Clock , AlertTriangle} from 'lucide-react';

export default function AgentDashboard() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const { data: clients = [], refetch: refetchClients } = useQuery({
    queryKey: ['clients'],
    queryFn: () => base44.entities.Client.list('-created_date', 200),
  });

  const { data: policies = [], refetch: refetchPolicies } = useQuery({
    queryKey: ['policies'],
    queryFn: () => base44.entities.Policy.list('-created_date', 500),
  });

  // Metrics
  const activeClients = clients.filter(c => c.status === 'active').length;
  const monthlyPremium = policies
    .filter(p => p.status === 'active')
    .reduce((sum, p) => {
      const monthly = p.premiumFrequency === 'annual' ? p.premiumAmount / 12
        : p.premiumFrequency === 'semi_annual' ? p.premiumAmount / 6
        : p.premiumFrequency === 'quarterly' ? p.premiumAmount / 3
        : p.premiumAmount;
      return sum + (monthly || 0);
    }, 0);
  const pendingPolicies = policies.filter(p => p.status === 'pending').length;

  // Retention and Renewal Alerts
  const today = new Date();
  const in30 = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const findClientForPolicy = (p) => clients.find(c => c.id === p.clientId || (c.email && c.email === p.clientEmail));
  const renewalAlerts = policies
    .filter(p => p.status === 'active' && p.renewalDate)
      .map(p => ({ ...p, _renewalDate: new Date(p.renewalDate), _client: findClientForPolicy(p) }))
        .filter(p => p._renewalDate >= today && p._renewalDate <= in30)
          .sort((a, b) => a._renewalDate - b._renewalDate)
            .map(p => ({ ...p, _daysLeft: Math.ceil((p._renewalDate - today) / 86400000) }));
            const lapsedAlerts = policies
              .filter(p => p.status === 'lapsed')
                .map(p => ({ ...p, _client: findClientForPolicy(p) }))
                  .slice(0, 10);

  // Filtered clients
  const filtered = clients.filter(c => {
    const q = search.toLowerCase();
    return !q
      || `${c.firstName} ${c.lastName}`.toLowerCase().includes(q)
      || (c.email || '').toLowerCase().includes(q)
      || (c.phone || '').includes(q)
      || (c.state || '').toLowerCase().includes(q);
  });

  const handleClientUpdate = () => {
    refetchClients();
    refetchPolicies();
    // refresh selected client
    if (selectedClient) {
      base44.entities.Client.list('-created_date', 200).then(all => {
        const updated = all.find(c => c.id === selectedClient.id);
        if (updated) setSelectedClient(updated);
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Agent Dashboard</h1>
          <p className="text-slate-500 mt-1">
            {user ? `Welcome back, ${user.full_name}` : 'Manage your clients and policies'}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <MetricCard
            label="Total Active Clients"
            value={activeClients}
            icon={Users}
            color="blue"
          />
          <MetricCard
            label="Monthly Premium Volume"
            value={`$${monthlyPremium.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            label="Pending Policies"
            value={pendingPolicies}
            icon={Clock}
            color="amber"
          />
        </div>

        {/* Retention & Renewal Alerts */}
        {(renewalAlerts.length > 0 || lapsedAlerts.length > 0) && (
        <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-bold text-slate-900">Retention & Renewal Alerts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-sm font-semibold text-slate-500 mb-2">Renewing in the next 30 days ({renewalAlerts.length})</p>
        {renewalAlerts.length === 0 ? (
          <p className="text-sm text-slate-400">No upcoming renewals.</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
          {renewalAlerts.map(p => (
            <button
            key={p.id}
            onClick={() => p._client && setSelectedClient(p._client)}
            className="w-full text-left flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-slate-50 border border-slate-100"
            >
            <span className="text-sm text-slate-800">
            {p._client ? `${p._client.firstName} ${p._client.lastName}` : 'Unknown client'} — {p.carrierName || 'Carrier'} ({p.policyType})
            </span>
            <span className="text-xs font-semibold text-amber-600 whitespace-nowrap">{p._daysLeft}d left</span>
            </button>
          ))}
          </div>
        )}
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-sm font-semibold text-slate-500 mb-2">Recently lapsed policies ({lapsedAlerts.length})</p>
        {lapsedAlerts.length === 0 ? (
          <p className="text-sm text-slate-400">No lapsed policies.</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
          {lapsedAlerts.map(p => (
            <button
            key={p.id}
            onClick={() => p._client && setSelectedClient(p._client)}
            className="w-full text-left flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-slate-50 border border-slate-100"
            >
            <span className="text-sm text-slate-800">
            {p._client ? `${p._client.firstName} ${p._client.lastName}` : 'Unknown client'} — {p.carrierName || 'Carrier'} ({p.policyType})
            </span>
            <span className="text-xs font-semibold text-red-500 whitespace-nowrap">Lapsed</span>
            </button>
          ))}
          </div>
        )}
        </div>
        </div>
        </div>
        )}
          
        {/* Client Table */}
        <ClientTable
          clients={filtered}
          policies={policies}
          search={search}
          onSearchChange={setSearch}
          onSelectClient={setSelectedClient}
          selectedClientId={selectedClient?.id}
        />
      </div>

      {/* Detail Panel */}
      {selectedClient && (
        <ClientDetailPanel
          client={selectedClient}
          policies={policies.filter(p => p.clientId === selectedClient.id)}
          onClose={() => setSelectedClient(null)}
          onUpdate={handleClientUpdate}
        />
      )}
    </div>
  );
}