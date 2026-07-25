import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, FileText, Tag, Users, ArrowLeft } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { StatCard } from '../../components/ui/index';
import { useAdminDestinations } from '../../hooks/useDestinations';
import { useAdminPrograms } from '../../hooks/usePrograms';
import { useAdminLeads } from '../../hooks/useOffers';
import { useAdminOffers } from '../../hooks/useOffers';
import { BookingStatus } from '../../types';

const AdminDashboard: React.FC = () => {
  const { totalCount: destCount } = useAdminDestinations(1);
  const { programs,  } = useAdminPrograms(100);
  const { leads, totalCount: leadsTotal } = useAdminLeads(100);
  const { offers,  } = useAdminOffers(100);

  const pendingLeads = leads.filter(l => l.status === BookingStatus.Pending).length;
  const activeOffers = offers.filter(o => o.isActive).length;
  const activePrograms = programs.filter(p => p.active).length;

  const quickLinks = [
    { to: '/admin/destinations', icon: <MapPin className="w-5 h-5" />, label: 'إضافة وجهة جديدة' },
    { to: '/admin/programs', icon: <Package className="w-5 h-5" />, label: 'إضافة برنامج جديد' },
    { to: '/admin/articles', icon: <FileText className="w-5 h-5" />, label: 'كتابة مقال جديد' },
    { to: '/admin/offers', icon: <Tag className="w-5 h-5" />, label: 'إضافة عرض جديد' },
  ];

  return (
    <AdminLayout>
      <div dir="rtl">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-black text-white mb-2">لوحة التحكم</h1>
          <p className="font-sans text-white/40 text-sm">مرحباً بك في نظام إدارة جولة Hora</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="الوجهات" value={destCount} icon={<MapPin className="w-5 h-5" />} />
          <StatCard label="البرامج النشطة" value={activePrograms} icon={<Package className="w-5 h-5" />} />
          <StatCard label="العملاء المحتملون" value={leadsTotal} icon={<Users className="w-5 h-5" />} trend={`${pendingLeads} معلق`} />
          <StatCard label="العروض النشطة" value={activeOffers} icon={<Tag className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="font-sans font-semibold text-white/60 text-xs uppercase tracking-widest mb-5">إجراءات سريعة</h2>
            <div className="space-y-3">
              {quickLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center justify-between glass rounded-xl px-5 py-4 hover:border-sand-500/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sand-400">{l.icon}</div>
                    <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">{l.label}</span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-white/20 group-hover:text-sand-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sans font-semibold text-white/60 text-xs uppercase tracking-widest">آخر الطلبات</h2>
              <Link to="/admin/leads" className="text-sand-400 font-sans text-xs hover:text-sand-300 transition-colors">عرض الكل</Link>
            </div>
            <div className="glass rounded-xl overflow-hidden">
              {leads.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-sans text-white/30 text-sm">لا توجد طلبات بعد</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-5 py-3 text-right font-sans text-xs text-white/30 uppercase">الاسم</th>
                      <th className="px-5 py-3 text-right font-sans text-xs text-white/30 uppercase">الهاتف</th>
                      <th className="px-5 py-3 text-right font-sans text-xs text-white/30 uppercase">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.slice(0, 5).map(lead => (
                      <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-5 py-3.5 font-sans text-white text-sm">{lead.name}</td>
                        <td className="px-5 py-3.5 font-sans text-white/50 text-sm">{lead.phone}</td>
                        <td className="px-5 py-3.5">
                          <span className={`font-sans text-xs px-2.5 py-1 rounded-full ${
                            lead.status === BookingStatus.Confirmed
                              ? 'bg-green-500/15 text-green-400'
                              : lead.status === BookingStatus.Cancelled
                              ? 'bg-red-500/15 text-red-400'
                              : 'bg-sand-500/15 text-sand-400'
                          }`}>
                            {lead.status === BookingStatus.Confirmed ? 'مؤكد' : lead.status === BookingStatus.Cancelled ? 'ملغي' : 'معلق'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
