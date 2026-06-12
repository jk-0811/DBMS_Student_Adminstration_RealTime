import { useEffect, useState } from 'react';
import api from '../../api/api';
import { CheckCircle2, FileText, Shield, Bell } from 'lucide-react';

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/students/dashboard').then((res) => setStats(res.data.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Application Status', value: stats?.applicationStatus || 'Draft', icon: FileText, tint: 'from-brand-500 to-sky-400' },
          { title: 'Documents Uploaded', value: stats?.documentsUploaded || 0, icon: CheckCircle2, tint: 'from-emerald-500 to-emerald-400' },
          { title: 'Verification Progress', value: stats?.verificationProgress || 'Pending', icon: Shield, tint: 'from-violet-500 to-fuchsia-500' },
          { title: 'Notifications', value: stats?.notifications?.length || 0, icon: Bell, tint: 'from-slate-600 to-slate-400' }
        ].map((card) => (
          <div key={card.title} className="card-glass p-6 rounded-3xl shadow-xl border-slate-200/70 dark:border-slate-700/70">
            <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${card.tint} p-3 text-white`}>
              <card.icon size={20} />
            </div>
            <h3 className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{card.title}</h3>
            <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="card-glass p-6 rounded-3xl border-slate-200/70 dark:border-slate-700/70">
          <h2 className="text-xl font-semibold">Application Progress</h2>
          <div className="mt-6 space-y-4">
            {['Draft', 'Submitted', 'Under Review', 'Document Verification', 'Approved / Rejected'].map((step, idx) => {
              const active = stats?.applicationStatus?.toLowerCase().includes(step.toLowerCase()) || (idx === 0 && stats?.applicationStatus === 'Draft');
              return (
                <div key={step} className="flex items-center gap-4">
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl ${active ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>{idx + 1}</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{step}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{active ? 'Current stage' : 'Upcoming stage'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-glass p-6 rounded-3xl border-slate-200/70 dark:border-slate-700/70">
          <h2 className="text-xl font-semibold">Profile Completion</h2>
          <div className="mt-6 rounded-3xl bg-slate-200 p-1 dark:bg-slate-800">
            <div className="h-4 rounded-3xl bg-brand-600" style={{ width: `${stats?.profileCompletion || 0}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{stats?.profileCompletion || 0}% complete</p>
          <div className="mt-6 space-y-3">
            {stats?.notifications?.map((notification) => (
              <article key={notification.id} className="rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/70">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{notification.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{notification.message}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
