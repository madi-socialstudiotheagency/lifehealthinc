import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { Loader2, Download, Upload, Trash2, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const GOLD = '#D4AF37';

export default function ClientDocuments({ documents, loading, onRefresh }) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      await base44.entities.Document.create({
        clientEmail: user.email,
        fileName: file.name,
        fileUrl: file_url,
        fileSize: file.size,
        fileType: file.type,
        category: 'other',
        description: '',
        uploadedBy: user.email,
        uploadedByRole: 'client'
      });

      toast.success('File uploaded successfully');
      onRefresh();
    } catch (err) {
      toast.error('Failed to upload file');
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (docId) => {
    try {
      setDeleting(docId);
      await base44.entities.Document.delete(docId);
      toast.success('Document deleted');
      onRefresh();
    } catch (err) {
      toast.error('Failed to delete document');
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: GOLD }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="rounded-lg border-2 border-dashed border-white/20 p-8 text-center hover:border-white/40 transition-all cursor-pointer"
        onClick={() => document.getElementById('file-upload').click()}>
        <Upload className="w-10 h-10 mx-auto mb-3" style={{ color: GOLD }} />
        <h3 className="font-semibold text-white mb-1">Upload Documents</h3>
        <p className="text-slate-400 text-sm mb-4">Drag and drop or click to select files</p>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
        <Button
          disabled={uploading}
          style={{ backgroundColor: GOLD, color: '#081730' }}
          className="font-bold"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </>
          )}
        </Button>
      </div>

      {/* Documents List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Your Documents ({documents.length})</h3>
        {documents.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <FileText className="w-10 h-10 mx-auto mb-3 text-slate-500" />
            <p className="text-slate-400 text-sm">No documents yet. Upload files to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="rounded-lg border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:border-white/20 transition-all">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 flex-shrink-0" style={{ color: GOLD }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{doc.fileName}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>{(doc.fileSize / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span>{new Date(doc.created_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-3 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-slate-400 hover:text-white"
                  >
                    <a href={doc.fileUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
                    disabled={deleting === doc.id}
                    className="text-slate-400 hover:text-red-400"
                  >
                    {deleting === doc.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}