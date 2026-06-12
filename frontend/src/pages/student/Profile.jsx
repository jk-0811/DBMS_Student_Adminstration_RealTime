import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function StudentProfile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    api.get('/students/me').then((res) => setStudent(res.data.student)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="card-glass p-8 rounded-3xl border-slate-200/70 dark:border-slate-700/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Student Profile</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Complete your personal details and guardian information for admissions approval.</p>
          </div>
          <div className="rounded-3xl bg-brand-600 px-5 py-3 text-white">Profile score: {student ? Math.min(100, Math.round((['fullName','dob','gender','mobile','address'].filter(key => student[key]).length / 5) * 100)) : 0}%</div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { label: 'Full Name', value: student?.fullName || '—' },
            { label: 'Email', value: student?.email || '—' },
            { label: 'Mobile', value: student?.mobile || '—' },
            { label: 'Category', value: student?.category || '—' },
            { label: 'Nationality', value: student?.nationality || '—' },
            { label: 'Religion', value: student?.religion || '—' },
            { label: 'Guardian', value: student?.guardianName || '—' },
            { label: 'Emergency Contact', value: student?.emergencyContact || '—' }
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 dark:border-slate-700/70 dark:bg-slate-900/80">
              <h3 className="text-sm text-slate-500 dark:text-slate-400">{item.label}</h3>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
