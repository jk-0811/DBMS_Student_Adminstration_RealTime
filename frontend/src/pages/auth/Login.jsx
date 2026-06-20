import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();
  const { login } = useAuth();

 const handleSubmit = async (event) => {

  event.preventDefault();

  setError(null);

  try {

    const user =await login(form);

    if(user.role === "admin"){
      navigate("/admin/dashboard");
    }else{
      navigate("/student/dashboard");
    }

  } catch(err){

    setError(
      err.response?.data?.error ||
      "Login failed"
    );

  }

};  

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md card-glass p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Welcome back</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Sign in to continue your admission journey.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-slate-700 dark:text-slate-200">Email</span>
            <div className={`mt-2 flex items-center gap-3 rounded-3xl border ${validationErrors.some(e => e.path.includes('email')) ? 'border-rose-500' : 'border-slate-200'} bg-white px-4 py-3 shadow-sm focus-within:border-brand-500 dark:border-slate-700 dark:bg-slate-900`}>
              <Mail size={18} className="text-slate-400" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100" placeholder="john.doe@university.edu" />
            </div>
          </label>
          <label className="block">
            <span className="text-slate-700 dark:text-slate-200">Password</span>
            <div className={`mt-2 flex items-center gap-3 rounded-3xl border ${validationErrors.some(e => e.path.includes('password')) ? 'border-rose-500' : 'border-slate-200'} bg-white px-4 py-3 shadow-sm focus-within:border-brand-500 dark:border-slate-700 dark:bg-slate-900`}>
              <Lock size={18} className="text-slate-400" />
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100" placeholder="Enter your password" />
            </div>
          </label>
          <button type="submit" className="w-full rounded-3xl bg-brand-600 px-5 py-3 text-white transition hover:bg-brand-700 font-medium">Sign in</button>
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <AlertCircle size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-rose-800">Login Error</p>
                <p className="text-xs text-rose-700 mt-1">{error}</p>
              </div>
            </div>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">New to SAMS? <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">Create account</Link></p>
      </div>
    </div>
  );
}
