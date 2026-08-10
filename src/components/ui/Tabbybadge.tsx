import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTabbyPreview, createTabbyCheckout } from '../../services/Paymentsservice';

interface TabbyBadgeProps {
  itemType: 'Program' | 'Offer';
  itemId: string;
}

/**
 * شعار "قسّطها مع تابي" — يظهر قيمة القسط الشهري تلقائيًا بجانب السعر،
 * وزر اختياري لبدء الدفع الفعلي (يفتح صفحة تابي لإدخال بيانات العميل والدفع).
 */
const TabbyBadge: React.FC<TabbyBadgeProps> = ({ itemType, itemId }) => {
  const { t } = useTranslation();
  const [amountPerInstalment, setAmountPerInstalment] = useState<number | null>(null);
  const [instalments, setInstalments] = useState<number>(4);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getTabbyPreview(itemType, itemId)
      .then((data) => {
        if (!mounted) return;
        setAmountPerInstalment(data.amountPerInstalment);
        setInstalments(data.instalments);
      })
      .catch(() => {
        // فشل صامت — الشعار ببساطة ما يظهرش لو الـ API مش متاح
      });
    return () => {
      mounted = false;
    };
  }, [itemType, itemId]);

  const handlePay = async () => {
    setError(null);
    if (!form.firstName || !form.lastName || !form.phone) {
      setError(t('paymentBadge.fillNamePhone'));
      return;
    }
    setLoadingCheckout(true);
    try {
      const result = await createTabbyCheckout(itemType, itemId, form);
      window.location.href = result.checkoutUrl;
    } catch (err: any) {
      const detail = err?.response?.data?.detail || err?.response?.data?.message;
      setError(detail ? t('paymentBadge.paymentFailedDetail', { detail }) : t('paymentBadge.paymentFailedTabby'));
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (amountPerInstalment === null) return null;

  return (
    <div className="mt-4 border border-stone-200 rounded-xl p-4 bg-white">
      <div className="flex items-center gap-2 text-sm text-stone-700">
        <span className="font-semibold">{t('paymentBadge.installWith')}</span>
        <span className="font-bold text-[#5A31F4]">tabby</span>
        <span className="text-stone-500">
          — {amountPerInstalment.toLocaleString('ar-SA')} {t('offersPage.currency')} × {instalments} {t('paymentBadge.installmentsNoInterest')}
        </span>
      </div>

      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-3 w-full py-2.5 rounded-lg border border-[#5A31F4] text-[#5A31F4] font-semibold text-sm hover:bg-[#5A31F4]/5 transition"
        >
          {t('paymentBadge.payWithTabby')}
        </button>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              className="border border-stone-300 rounded-lg px-3 py-2 text-sm"
              placeholder={t('paymentBadge.firstName')}
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              className="border border-stone-300 rounded-lg px-3 py-2 text-sm"
              placeholder={t('paymentBadge.lastName')}
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <input
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
            placeholder={t('paymentBadge.mobileNumber')}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
            placeholder={t('paymentBadge.emailOptional')}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="button"
            onClick={handlePay}
            disabled={loadingCheckout}
            className="w-full py-2.5 rounded-lg bg-[#5A31F4] text-white font-semibold text-sm disabled:opacity-60"
          >
            {loadingCheckout ? t('paymentBadge.redirecting') : t('paymentBadge.continuePayment')}
          </button>
        </div>
      )}
    </div>
  );
};

export default TabbyBadge;