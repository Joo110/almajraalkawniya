import React from 'react';
import { Loader2 } from 'lucide-react';

// ─── Spinner ─────────────────────────────────────────
export const Spinner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center py-20 ${className}`}>
    <Loader2 className="w-8 h-8 text-sand-500 animate-spin" />
  </div>
);

// ─── Error Box ────────────────────────────────────────
export const ErrorBox: React.FC<{ message: string }> = ({ message }) => (
  <div className="glass border border-red-500/20 rounded-lg p-6 text-center">
    <p className="text-red-400 font-sans text-sm" dir="rtl">⚠ {message}</p>
  </div>
);

// ─── Section Header ───────────────────────────────────
interface SectionHeaderProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
}
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag, title, highlight, subtitle, center = false,
}) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`} dir="rtl">
    {tag && (
      <span className="font-sans text-sand-400 text-xs uppercase tracking-[0.25em] font-medium mb-4 block">
        — {tag} —
      </span>
    )}
    <h2 className="section-title text-white mb-4">
      {title}{' '}
      {highlight && <span className="text-gradient">{highlight}</span>}
    </h2>
    {subtitle && (
      <p className="section-subtitle text-white/50 max-w-xl">{subtitle}</p>
    )}
  </div>
);

// ─── Badge ─────────────────────────────────────────────
interface BadgeProps {
  label: string;
  color?: 'gold' | 'green' | 'red' | 'blue';
}
export const Badge: React.FC<BadgeProps> = ({ label, color = 'gold' }) => {
  const colors = {
    gold: 'bg-sand-500/15 text-sand-400 border-sand-500/30',
    green: 'bg-green-500/15 text-green-400 border-green-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`font-sans text-xs px-3 py-1 rounded-full border ${colors[color]}`}>
      {label}
    </span>
  );
};

// ─── Empty State ──────────────────────────────────────
export const EmptyState: React.FC<{ message?: string; icon?: React.ReactNode }> = ({
  message = 'لا توجد بيانات بعد',
  icon,
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center" dir="rtl">
    {icon && <div className="mb-4 text-white/20">{icon}</div>}
    <p className="font-sans text-white/40 text-sm">{message}</p>
  </div>
);

// ─── Admin Table ──────────────────────────────────────
interface AdminTableProps {
  headers: string[];
  children: React.ReactNode;
}
export const AdminTable: React.FC<AdminTableProps> = ({ headers, children }) => (
  <div className="overflow-x-auto rounded-xl border border-white/5">
    <table className="w-full" dir="rtl">
      <thead>
        <tr className="bg-white/3 border-b border-white/5">
          {headers.map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-right font-sans text-xs font-semibold text-white/40 uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">{children}</tbody>
    </table>
  </div>
);

// ─── Admin Page Header ────────────────────────────────
interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}
export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-8" dir="rtl">
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-1">{title}</h1>
      {subtitle && <p className="font-sans text-white/40 text-sm">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

// ─── Modal ─────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141420] border border-white/10 rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-display text-xl font-bold text-white mb-6">{title}</h3>
        {children}
      </div>
    </div>
  );
};

// ─── Input Field ──────────────────────────────────────
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export const InputField: React.FC<InputFieldProps> = ({ label, error, ...props }) => (
  <div dir="rtl">
    <label className="block font-sans text-white/60 text-xs uppercase tracking-wider mb-2">{label}</label>
    <input
      {...props}
      className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} 
        rounded-lg px-4 py-2.5 font-sans text-white text-sm placeholder-white/20 
        focus:outline-none focus:border-sand-500/50 transition-colors`}
    />
    {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
  </div>
);

// ─── Textarea ─────────────────────────────────────────
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
export const TextareaField: React.FC<TextareaFieldProps> = ({ label, ...props }) => (
  <div dir="rtl">
    <label className="block font-sans text-white/60 text-xs uppercase tracking-wider mb-2">{label}</label>
    <textarea
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 font-sans text-white text-sm placeholder-white/20 focus:outline-none focus:border-sand-500/50 transition-colors resize-none"
    />
  </div>
);

// ─── Select ───────────────────────────────────────────
interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number; label: string }[];
  error?: string;
}
export const SelectField: React.FC<SelectFieldProps> = ({ label, options, ...props }) => (
  <div dir="rtl">
    <label className="block font-sans text-white/60 text-xs uppercase tracking-wider mb-2">{label}</label>
    <select
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 font-sans text-white text-sm focus:outline-none focus:border-sand-500/50 transition-colors"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-charcoal-900">{o.label}</option>
      ))}
    </select>
  </div>
);

// ─── Confirm Dialog ───────────────────────────────────
interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open, onConfirm, onCancel, message = 'هل أنت متأكد من الحذف؟'
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-[#141420] border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <p className="font-sans text-white text-sm mb-6 text-center">{message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onCancel} className="btn-outline text-xs py-2 px-6">إلغاء</button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-400 text-white font-sans text-xs py-2 px-6 rounded-sm uppercase tracking-wider transition-colors">
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Stat Card ─────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}
export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend }) => (
  <div className="glass rounded-xl p-6" dir="rtl">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-sand-500/15 flex items-center justify-center text-sand-400">
        {icon}
      </div>
      {trend && <span className="font-sans text-green-400 text-xs">{trend}</span>}
    </div>
    <p className="font-display text-3xl font-bold text-white mb-1">{value}</p>
    <p className="font-sans text-white/40 text-sm">{label}</p>
  </div>
);

// ─── Pagination ──────────────────────────────────────
interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}
export const Pagination: React.FC<PaginationProps> = ({
  pageNumber, totalPages, hasPreviousPage, hasNextPage, onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (pageNumber > 3) pages.push('...');
    for (let i = Math.max(2, pageNumber - 1); i <= Math.min(totalPages - 1, pageNumber + 1); i++) {
      pages.push(i);
    }
    if (pageNumber < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 select-none" dir="ltr">
      <button
        onClick={() => hasPreviousPage && onPageChange(pageNumber - 1)}
        disabled={!hasPreviousPage}
        className="px-3 py-1.5 rounded-lg border border-white/10 font-sans text-xs text-white/40 hover:border-sand-500/40 hover:text-sand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-white/20 font-sans text-xs">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg font-sans text-xs transition-all ${
              p === pageNumber
                ? 'bg-sand-500/20 border border-sand-500/40 text-sand-400'
                : 'border border-white/10 text-white/40 hover:border-sand-500/30 hover:text-sand-300'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => hasNextPage && onPageChange(pageNumber + 1)}
        disabled={!hasNextPage}
        className="px-3 py-1.5 rounded-lg border border-white/10 font-sans text-xs text-white/40 hover:border-sand-500/40 hover:text-sand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ›
      </button>
    </div>
  );
};
