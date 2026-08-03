import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Phone, Mail, FileText, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const policyStatusColors = {
  active:     'bg-green-100 text-green-700',
  pending:    'bg-amber-100 text-amber-700',
  lapsed:     'bg-red-100 text-red-700',
  cancelled:  'bg-slate-100 text-slate-600',
  surrendered:'bg-slate-100 text-slate-600',
  matured:    'bg-blue-100 text-blue-700',
};

const policyTypeLabels = {
  term_life: 'Term Life', whole_life: 'Whole Life', iul: 'IUL',
  medicare_advantage: 'Medicare Advantage', medicare_supplement: 'Medicare Supplement',
  medicare_part_d: 'Medicare Part D', health_aca: 'Health (ACA)',
  final_expense: 'Final Expense', annuity: 'Annuity',
  mortgage_protection: 'Mortgage Protection', disability: 'Disability',
  dental: 'Dental', vision: 'Vision', other: 'Other',
};

function PolicyCard({ policy, onStatusChange }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(policy.status);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.Policy.update(policy.id, { status });
    onStatusChange();
    setSaving(false);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        onClick={() => setOpen(v => !v)}
      >
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {policyTypeLabels[policy.policyType] || policy.policyType}
            </p>
            <p className="text-xs text-slate-500">{policy.carrierName || 'Unknown Carrier'} · #{policy.policyNumber || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${policyStatusColors[policy.status] || ''}`}>
            {policy.status}
          </span>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-4 py-4 space-y-3 bg-white">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500 text-xs">Premium</p>
              <p className="font-semibold text-slate-800">
                ${policy.premiumAmount?.toLocaleString()} / {policy.premiumFrequency?.replace('_', ' ') || 'mo'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Face Amount</p>
              <p className="font-semibold text-slate-800">
                {policy.faceAmount ? `$${policy.faceAmount.toLocaleString()}` : '—'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Effective Date</p>
              <p className="font-semibold text-slate-800">{policy.effectiveDate || '—'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Renewal Date</p>
              <p className="font-semibold text-slate-800">{policy.renewalDate || '—'}</p>
            </div>
          </div>

          {/* Status Update */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2">Update Status</p>
            <div className="flex gap-2">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-8 text-xs flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['pending','active','lapsed','cancelled','surrendered','matured'].map(s => (
                    <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleSave} disabled={saving || status === policy.status} className="h-8 text-xs">
                {saving ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientDetailPanel({ client, policies, onClose, onUpdate }) {
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [clientStatus, setClientStatus] = useState(client.status || 'prospect');
  const [savingStatus, setSavingStatus] = useState(false);

  const handleSaveNote = async () => {
    if (!note.trim()) return;
    setSavingNote(true);
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
    const existing = client.notes || '';
    const newNotes = `[${timestamp}] ${note.trim()}\n\n${existing}`.trim();
    await base44.entities.Client.update(client.id, { notes: newNotes });
    setNote('');
    onUpdate();
    setSavingNote(false);
  };

  const handleSaveStatus = async () => {
    setSavingStatus(true);
    await base44.entities.Client.update(client.id, { status: clientStatus });
    onUpdate();
    setSavingStatus(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-900 text-white">
          <div>
            <h2 className="text-xl font-bold">{client.firstName} {client.lastName}</h2>
            <p className="text-slate-400 text-sm mt-0.5">{client.email}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Contact Info */}
          <div className="flex flex-wrap gap-3">
            {client.phone && (
              <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
                <Phone className="w-4 h-4" /> {client.phone}
              </a>
            )}
            {client.email && (
              <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
                <Mail className="w-4 h-4" /> {client.email}
              </a>
            )}
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['State', client.state],
              ['City', client.city],
              ['Date of Birth', client.dateOfBirth],
              ['GHL Contact ID', client.ghl_contact_id],
            ].map(([label, val]) => val ? (
              <div key={label}>
                <p className="text-slate-400 text-xs">{label}</p>
                <p className="font-medium text-slate-800">{val}</p>
              </div>
            ) : null)}
          </div>

          {/* Client Status */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Client Status</p>
            <div className="flex gap-2">
              <Select value={clientStatus} onValueChange={setClientStatus}>
                <SelectTrigger className="h-9 text-sm flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['prospect','active','inactive','lost'].map(s => (
                    <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleSaveStatus} disabled={savingStatus || clientStatus === client.status} className="h-9">
                {savingStatus ? 'Saving…' : 'Update'}
              </Button>
            </div>
          </div>

          {/* Policies */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Policies ({policies.length})
            </p>
            {policies.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No policies on file.</p>
            ) : (
              <div className="space-y-2">
                {policies.map(p => (
                  <PolicyCard key={p.id} policy={p} onStatusChange={onUpdate} />
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Call Notes
            </p>
            {/* Log new note */}
            <Textarea
              placeholder="Log a call note…"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="text-sm h-20 resize-none mb-2"
            />
            <Button size="sm" onClick={handleSaveNote} disabled={savingNote || !note.trim()} className="w-full">
              {savingNote ? 'Saving…' : 'Add Note'}
            </Button>

            {/* Past notes */}
            {client.notes && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto border border-slate-100">
                {client.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}