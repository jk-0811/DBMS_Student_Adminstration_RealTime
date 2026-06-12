import { useEffect, useState } from 'react';
import api from '../../api/api';
import { UploadCloud, Download, FileText } from 'lucide-react';

export default function Documents() {
  const [files, setFiles] = useState({});
  const [uploaded, setUploaded] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/documents/my-list').then((res) => setUploaded(res.data.documents)).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleUpload = async () => {
    const form = new FormData();
    Object.entries(files).forEach(([field, file]) => {
      if (file) form.append(field, file);
    });

    if (!form.has('photograph')) {
      setStatus('Select at least one file.');
      return;
    }

    const response = await api.post('/documents/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setUploaded(response.data.documents);
    setStatus('Documents uploaded successfully.');
  };

  return (
    <div className="space-y-6">
      <section className="card-glass p-8 rounded-3xl border-slate-200/70 dark:border-slate-700/70">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Document Vault</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Upload your documents securely for admin verification.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-brand-600 px-4 py-3 text-white">
            <UploadCloud size={18} /> Supported: PDF, JPG, PNG
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {['photograph','aadhaar','sscMemo','intermediateMemo','transferCertificate','incomeCertificate','casteCertificate','bonafideCertificate','rankCard','signature'].map((name) => (
            <label key={name} className="block rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700 transition hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <span className="font-semibold capitalize">{name.replace(/([A-Z])/g, ' $1')}</span>
              <input type="file" name={name} accept="application/pdf,image/jpeg,image/png" onChange={handleChange} className="mt-4 w-full text-slate-600 dark:text-slate-300" />
            </label>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <button onClick={handleUpload} className="rounded-3xl bg-brand-600 px-6 py-3 text-white transition hover:bg-brand-700">Upload files</button>
          {status && <span className="text-sm text-slate-500 dark:text-slate-400">{status}</span>}
        </div>
      </section>
      <section className="grid gap-4">
        <h3 className="text-xl font-semibold">Uploaded documents</h3>
        <div className="grid gap-4">
          {uploaded.map((doc) => (
            <article key={doc.id} className="card-glass flex items-center justify-between gap-4 p-5 rounded-3xl border-slate-200/70 dark:border-slate-700/70">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{doc.documentType.replace(/([A-Z])/g, ' $1')}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{doc.fileName}</p>
              </div>
              <a href={`http://localhost:4000${doc.filePath}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800">
                <Download size={16} /> Download
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
