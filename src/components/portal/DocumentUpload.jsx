import { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, FileText, Loader2, Download, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DARK1 = '#081730';
const DARK2 = '#1A3586';
const DARK3 = '#3D6B9E';

export default function DocumentUpload({ user, documents, loadingDocs, onRefresh }) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const inputRef = useRef();

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    await base44.entities.Document.create({
      clientEmail: user.email,
      fileName: file.name,
      fileUrl: file_url,
      fileSize: file.size,
      fileType: file.type,
      category: 'other',
      uploadedBy: user.email,
      uploadedByRole: 'client',
    });
    toast.success('Document uploaded successfully');
    onRefresh();
    setUploading(false);
  };

  const handleFileInput = async (e) => {
    const file = e.target.files?.[0];
    if (file) await handleUpload(file);
    e.target.value = '';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleUpload(file);
  };

  const handleDelete = async (docId) => {
    setDeleting(docId);
    await base44.entities.Document.delete(docId);
    toast.success('Document removed');
    onRefresh();
    setDeleting(null);
  };

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
          dragging ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40'
        }`}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={handleFileInput}
          accept=".pdf,.jpg,.jpeg,.png,.heic,.doc,.docx" disabled={uploading} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: DARK2 }} />
            <p className="text-sm font-semibold text-slate-600">Uploading securely...</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
              <Upload className="w-6 h-6 text-white" />
            </div>
            <p className="font-bold text-slate-700 mb-1">Drop files here or click to upload</p>
            <p className="text-xs text-slate-400">PDF, JPG, PNG, HEIC, DOC — max 25 MB</p>
          </>
        )}
      </div>

      {/* Documents list */}
      {loadingDocs ? (
        <div className="space-y-2">
          {[1, 2].map(i => <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />)}
        </div>
      ) : documents.length === 0 ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 text-center">
          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No documents uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {documents.map(doc => (
            <div key={doc.id}
              className="rounded-xl border border-slate-100 bg-white p-4 flex items-center gap-3 hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${DARK1}, ${DARK2})` }}>
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{doc.fileName}</p>
                <p className="text-xs text-slate-400">{(doc.fileSize / 1024).toFixed(1)} KB · {new Date(doc.created_date).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-slate-700">
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"><Download className="w-4 h-4" /></a>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}
                  disabled={deleting === doc.id} className="text-slate-400 hover:text-red-500">
                  {deleting === doc.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}