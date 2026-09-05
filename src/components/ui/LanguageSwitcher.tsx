import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const LANGS: { code: 'ar' | 'en' | 'fr' | 'tr' | 'ru'; label: string; short: string }[] = [
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'ru', label: 'Русский', short: 'RU' },
];

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'light' }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === i18n.resolvedLanguage) || LANGS[0];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  const isDark = variant === 'dark';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
          isDark
            ? 'text-neutral-700 border-neutral-300 hover:bg-neutral-100'
            : 'text-white/80 border-white/20 hover:bg-white/10 hover:text-white'
        }`}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{current.short}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute mt-2 min-w-[130px] rounded-xl shadow-lg overflow-hidden z-50 ${
            isDark ? 'bg-white border border-neutral-200' : 'bg-neutral-900/95 backdrop-blur-xl border border-white/10'
          } end-0`}
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => changeLanguage(l.code)}
              className={`w-full text-start px-4 py-2.5 text-sm font-sans transition-colors duration-150 flex items-center justify-between ${
                l.code === current.code
                  ? isDark
                    ? 'bg-sand-500/10 text-sand-600 font-semibold'
                    : 'bg-sand-500/20 text-sand-300 font-semibold'
                  : isDark
                  ? 'text-neutral-700 hover:bg-neutral-100'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
