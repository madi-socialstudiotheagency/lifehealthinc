import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Shield, LogOut, FileText, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PolicyGrid from '@/components/portal/PolicyGrid';
import BrokerCard from '@/components/portal/BrokerCard';
import DocumentUpload from '@/components/portal/DocumentUpload';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [agent, setAgent] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingPolicies, setLoadingPolicies] = useState(true);
  const [loadingAgent, setLoadingAgent] = useState(true);
  const [loadingDocs, setLoadingDocs] = useState(true);

  // Auth
  useEffect(() => {
    base44.auth.me()
      .then(u => { setUser(u); })
      .catch(() => base44.auth.redirectToLogin(window.location.pathname))
      .finally(() => setLoadingAuth(false));
  }, []);

  // Client record + policies + agent + docs — fetch after auth
  useEffect(() => {
    if (!user) return;

    // Policies for this client email
    base44.entities.Policy.filter({ clientEmail: user.email })
      .then(setPolicies)
      .finally(() => setLoadingPolicies(false));

    // Client record to find assigned agent
    base44.entities.Client.filter({ email: user.email })
      .then(async (clients) => {
        const c = clients?.[0];
        setClient(c);
        if (c?.assignedAgentEmail) {
          const agents = await base44.entities.Agent.filter({ email: c.assignedAgentEmail });
          setAgent(agents?.[0] || null);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingAgent(false));

    // Documents
    base44.entities.Document.filter({ clientEmail: user.email })
      .then(setDocuments)
      .finally(() => setLoadingDocs(false));
  }, [user]);

  const refreshDocs = useCallback(() => {
    if (!user) return;
    base44.entities.Document.filter({ clientEmail: user.email }).then(setDocuments);
  }, [user]);

  if (loadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const firstName = user.full_name?.split(' ')[0] || 'Client';

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ─── Top Nav Bar ─── */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-sm" style={{ color: DARK1 }}>LifeHealthInc</span>
            <span className="hidden sm:block text-slate-300 text-sm">·</span>
            <span className="hidden sm:block text-xs font-semibold text-slate-400 uppercase tracking-widest">Client Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-500">{user.email}</span>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-700 gap-1.5"
              onClick={() => base44.auth.logout('/')}>
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ─── Greeting ─── */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: DARK3 }}>Welcome Back</p>
          <h1 className="text-4xl font-black" style={{ color: DARK1 }}>
            {firstName} <span className="text-slate-300">👋</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Here's a summary of your coverage and account.</p>
        </div>

        {/* ─── Main Layout: content + sidebar ─── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ─── Left / Main ─── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Active Policies */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5" style={{ color: DARK2 }} />
                <h2 className="text-lg font-black" style={{ color: DARK1 }}>Active Policies</h2>
              </div>
              <PolicyGrid policies={policies} loading={loadingPolicies} />
            </section>

            {/* Document Upload */}
            <section>
              <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FileText className="w-5 h-5" style={{ color: DARK2 }} />
                  <h2 className="text-lg font-black" style={{ color: DARK1 }}>My Documents</h2>
                </div>
                <DocumentUpload
                  user={user}
                  documents={documents}
                  loadingDocs={loadingDocs}
                  onRefresh={refreshDocs}
                />
              </div>
            </section>
          </div>

          {/* ─── Right / Sidebar ─── */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-5">

            {/* Broker Card */}
            <BrokerCard agent={agent} loading={loadingAgent} />

            {/* Account summary */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: DARK3 }}>Account Summary</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name</span>
                  <span className="font-semibold text-slate-700">{user.full_name || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email</span>
                  <span className="font-semibold text-slate-700 truncate ml-2">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Policies</span>
                  <span className="font-semibold" style={{ color: DARK2 }}>
                    {loadingPolicies ? '—' : policies.filter(p => p.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Documents</span>
                  <span className="font-semibold" style={{ color: DARK2 }}>
                    {loadingDocs ? '—' : documents.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Need help */}
            <div className="rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
              <p className="font-black mb-1">Need Help?</p>
              <p className="text-sm text-slate-300 mb-4">Our team is always available to assist with your coverage.</p>
              <a href="tel:9545430853"
                className="block text-center py-2.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 transition-colors">
                📞 (954) 543-0853
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}