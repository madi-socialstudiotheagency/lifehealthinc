import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Webhook, AlertCircle, Loader2, Settings } from 'lucide-react';

const SETTINGS_DEFS = [
  {
    key: 'client_webhook_url',
    label: 'Client Webhook URL',
    description: 'Outbound POST webhook fired whenever a Client record is created or their status is updated. Payload includes all client fields and GHL_Contact_ID.',
    placeholder: 'https://hooks.zapier.com/hooks/catch/... or https://your-crm.com/webhook',
    icon: Webhook,
  },
];

function SettingRow({ settingDef, initialValue, onSave }) {
  const [value, setValue] = useState(initialValue || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const Icon = settingDef.icon;

  const isDirty = value !== (initialValue || '');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await onSave(settingDef.key, value, settingDef.label, settingDef.description);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e.message);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-900">{settingDef.label}</h3>
          <p className="text-sm text-slate-500 mt-0.5 mb-4">{settingDef.description}</p>

          <div className="flex gap-2">
            <Input
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={settingDef.placeholder}
              className="text-sm font-mono"
            />
            <Button
              onClick={handleSave}
              disabled={saving || !isDirty}
              className="whitespace-nowrap"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Saving…</>
              ) : saved ? (
                <><CheckCircle className="w-4 h-4 mr-1.5 text-green-400" /> Saved!</>
              ) : 'Save'}
            </Button>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}

          {value && !isDirty && (
            <p className="mt-2 text-xs text-green-600 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Webhook URL is configured and active.
            </p>
          )}
          {!value && !isDirty && (
            <p className="mt-2 text-xs text-amber-500 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> No URL set — webhook is inactive.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const [settingsMap, setSettingsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.AppSettings.list().then(rows => {
      const map = {};
      rows.forEach(r => { map[r.key] = r; });
      setSettingsMap(map);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async (key, value, label, description) => {
    const existing = settingsMap[key];
    if (existing) {
      const updated = await base44.entities.AppSettings.update(existing.id, { value });
      setSettingsMap(prev => ({ ...prev, [key]: { ...existing, value } }));
    } else {
      const created = await base44.entities.AppSettings.create({ key, value, label, description });
      setSettingsMap(prev => ({ ...prev, [key]: created }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
            <p className="text-slate-500 text-sm">Configure integrations and system behavior</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Webhook Integrations</p>
            {SETTINGS_DEFS.map(def => (
              <SettingRow
                key={def.key}
                settingDef={def}
                initialValue={settingsMap[def.key]?.value || ''}
                onSave={handleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}