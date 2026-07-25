import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { extractApiError } from '../../services/api';

const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('مرحباً بك في لوحة التحكم');
      navigate('/admin');
    } catch (err) {
      toast.error(extractApiError(err) || 'بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ocean-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10" dir="rtl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-black text-white">
            <span className="text-gradient">المجرة</span> الكونية
          </h1>
          <p className="font-sans text-white/40 text-sm mt-2">لوحة تحكم المسؤول</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-white mb-6 text-center">تسجيل الدخول</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans text-white/50 text-xs uppercase tracking-wider mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@gawlahora.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-white text-sm placeholder-white/20 focus:outline-none focus:border-sand-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block font-sans text-white/50 text-xs uppercase tracking-wider mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 font-sans text-white text-sm placeholder-white/20 focus:outline-none focus:border-sand-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
