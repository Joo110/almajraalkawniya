import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, Package, FileText, Tag, Users,
  LogOut, Menu, X, Globe, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
  { to: '/admin/destinations', label: 'الوجهات', icon: MapPin },
  { to: '/admin/programs', label: 'البرامج', icon: Package },
  { to: '/admin/articles', label: 'المقالات', icon: FileText },
  { to: '/admin/offers', label: 'العروض', icon: Tag },
  { to: '/admin/leads', label: 'العملاء المحتملون', icon: Users },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-charcoal-900 border-l border-white/5 flex flex-col fixed top-0 right-0 h-full z-40`}
      >
        {/* Header */}
        <div className={`flex items-center ${sidebarOpen ? 'justify-between px-5' : 'justify-center px-2'} py-6 border-b border-white/5`}>
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-gradient">جولة Hora</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-sand-500/15 text-sand-400'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-sand-400' : ''}`} />
                {sidebarOpen && (
                  <>
                    <span className="font-sans text-sm flex-1">{item.label}</span>
                    {active && <ChevronRight className="w-4 h-4 opacity-60" />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className={`p-4 border-t border-white/5 ${!sidebarOpen && 'flex justify-center'}`}>
          {sidebarOpen ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-white text-sm font-medium">{user?.email || 'مدير النظام'}</p>
                <p className="font-sans text-white/40 text-xs mt-0.5">مسؤول</p>
              </div>
              <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-16'} min-h-screen p-8 overflow-x-hidden`}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
