import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/where-to-travel', label: 'وين أسافر؟', special: true },
  { to: '/destinations', label: 'الوجهات' },
  { to: '/programs', label: 'البرامج' },
  { to: '/offers', label: 'العروض' },
  { to: '/partners', label: 'شركاؤنا الآخرين' },
  { to: '/blog', label: 'المدونة' },
  { to: '/contact', label: 'تواصل معنا' },
];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/40 backdrop-blur-xl shadow-sm shadow-black/10 py-2'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo3.jpeg"
            alt="شعار المجرة الكونية"
            className="w-9 h-9 rounded-full object-cover shadow-md shadow-sand-500/20 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-white tracking-wide">المجرة</span>
            <span className="font-display text-lg font-bold text-gradient tracking-wide">الكونية</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5" dir="rtl">
          {links.map((l) =>
            l.special ? (
              <Link
                key={l.to}
                to={l.to}
                className={`relative flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300 font-sans text-xs font-semibold
                  ${
                    location.pathname === l.to
                      ? 'bg-sand-500 text-white shadow-md shadow-sand-500/30'
                      : 'bg-sand-500/10 text-sand-300 hover:bg-sand-500/25 hover:text-sand-200 border border-sand-500/20'
                  }`}
              >
                <MapPin className="w-3 h-3" />
                <span>{l.label}</span>
              </Link>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-2.5 py-1 text-xs font-semibold font-sans transition-all duration-300 rounded-md
                  ${
                    location.pathname === l.to
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            to="/programs"
            className="btn-primary text-xs py-2 px-5 rounded-full"
          >
            احجز الآن
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="فتح القائمة"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden bg-black/60 backdrop-blur-2xl border-t border-white/10 px-6 py-5 flex flex-col gap-3"
          dir="rtl"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-sans text-base font-medium py-1 transition-colors duration-200 ${
                l.special
                  ? 'text-sand-400 flex items-center gap-2'
                  : location.pathname === l.to
                  ? 'text-sand-400'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              {l.special && <MapPin className="w-3.5 h-3.5" />}
              {l.label}
            </Link>
          ))}
          <Link
            to="/programs"
            className="btn-primary text-center text-sm py-2.5 mt-1 rounded-full"
          >
            احجز الآن
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;