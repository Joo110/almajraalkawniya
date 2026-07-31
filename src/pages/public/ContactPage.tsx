import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Star } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import { leadsService } from '../../services/otherServices';
import { destinationsService } from '../../services/destinationsService';
import { extractApiError } from '../../services/api';
import { Destination } from '../../types';

type ContactFormState = {
  name: string;
  phone: string;
  travelersCount: number;
  destinationId: string;
  destinationName: string;
  departureCity: string;
  travelDate: string;
  durationDays: number;
  notes: string;
};

type ApiListResponse<T> = {
  items?: T[];
};

function getTomorrowDateInputValue() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    phone: '',
    travelersCount: 1,
    destinationId: '',
    destinationName: '',
    departureCity: '',
    travelDate: getTomorrowDateInputValue(),
    durationDays: 1,
    notes: '',
  });

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadDestinations = async () => {
      try {
        setLoadingDestinations(true);

        const data: unknown = await destinationsService.getAll();

        const list: Destination[] = Array.isArray(data)
          ? (data as Destination[])
          : ((data as ApiListResponse<Destination>)?.items ?? []);

        if (mounted) {
          setDestinations(list);
        }
      } catch (e) {
        if (mounted) {
          setError(extractApiError(e));
          setDestinations([]);
        }
      } finally {
        if (mounted) {
          setLoadingDestinations(false);
        }
      }
    };

    loadDestinations();

    return () => {
      mounted = false;
    };
  }, []);

  const handleDestinationChange = (destinationId: string) => {
    const selected = destinations.find((x) => x.id === destinationId);

    setForm((prev) => ({
      ...prev,
      destinationId,
      destinationName: selected?.name ?? '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        travelersCount: form.travelersCount,
        destinationId: form.destinationId,
        destinationName: form.destinationName.trim() || undefined,
        departureCity: form.departureCity.trim(),
        travelDate: form.travelDate,
        durationDays: form.durationDays,
        notes: form.notes.trim() || undefined,
      };

      await leadsService.create(payload as any);
      setSent(true);
    } catch (e) {
      setError(extractApiError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="bg-white text-stone-800 min-h-screen">
        <section className="relative h-64 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
            alt="contact"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 text-center px-6" dir="rtl">
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-3">
              تواصل <span className="text-gradient">معنا</span>
            </h1>
            <p className="font-accent text-lg text-white/70 italic">
              فريقنا جاهز للإجابة على كل أسئلتك
            </p>
          </div>
        </section>

        <section className="py-20 bg-white" dir="rtl">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl font-bold text-stone-900 mb-8">
                  أرسل لنا طلب حجز
                </h2>

                {sent ? (
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-10 text-center shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="font-display text-2xl font-bold text-stone-900 mb-2">
                      شكراً لك!
                    </h4>
                    <p className="font-sans text-stone-600 text-sm">
                      تم استلام طلبك بنجاح، وسيتواصل معك فريقنا خلال ٢٤ ساعة
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="rounded-xl p-4 border border-red-200 bg-red-50 text-red-700 text-sm leading-7">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                          الاسم *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="محمد أحمد"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                          الهاتف *
                        </label>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+966 5x xxx xxxx"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                          عدد المسافرين *
                        </label>
                        <input
                          required
                          type="number"
                          min={1}
                          max={50}
                          value={form.travelersCount}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              travelersCount: Number(e.target.value),
                            })
                          }
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                          مدة الرحلة بالأيام *
                        </label>
                        <input
                          required
                          type="number"
                          min={1}
                          max={60}
                          value={form.durationDays}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              durationDays: Number(e.target.value),
                            })
                          }
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                        الوجهة *
                      </label>
                      <select
                        required
                        value={form.destinationId}
                        onChange={(e) => handleDestinationChange(e.target.value)}
                        disabled={loadingDestinations}
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm disabled:opacity-60"
                      >
                        <option value="">
                          {loadingDestinations ? 'جاري تحميل الوجهات...' : 'اختر الوجهة'}
                        </option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                        مدينة المغادرة *
                      </label>
                      <input
                        required
                        value={form.departureCity}
                        onChange={(e) =>
                          setForm({ ...form, departureCity: e.target.value })
                        }
                        placeholder="مكة المكرمة"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                        تاريخ السفر *
                      </label>
                      <input
                        required
                        type="date"
                        value={form.travelDate}
                        onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm focus:outline-none focus:border-sand-500/50 transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-stone-600 text-xs uppercase tracking-wider mb-2">
                        ملاحظات
                      </label>
                      <textarea
                        rows={5}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="أخبرنا بأي تفاصيل إضافية"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 font-sans text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:border-sand-500/50 transition-colors resize-none shadow-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
                    </button>
                  </form>
                )}
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold text-stone-900 mb-8">
                  معلومات التواصل
                </h2>

                <div className="space-y-6 mb-10">
                  {[
                    {
                      icon: <Phone className="w-5 h-5" />,
                      label: 'اتصل بنا',
                      value: '+966 54 481 7995',
                      sub: 'الأحد – الخميس: ٩ صباحاً – ٦ مساءً',
                    },
                    {
                      icon: <Mail className="w-5 h-5" />,
                      label: 'راسلنا',
                      value: 'almajara.alkawnia.travel@gmail.com',
                      sub: 'نرد خلال ٢٤ ساعة',
                    },
                    {
                      icon: <MapPin className="w-5 h-5" />,
                      label: 'زورنا',
                       value: 'الرياض حي السويدي شارع الملك عبدالعزيز بن عبدالرحمن سعود الفرعي  رقم المبنى 6249 الرمز البريد 13342',
                      sub: 'المملكة العربية السعودية',
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      label: 'ساعات العمل',
                      value: 'الأحد – الخميس',
                      sub: '٩:٠٠ صباحاً – ٦:٠٠ مساءً',
                    },
                  ].map((info) => (
                    <div
                      key={info.label}
                      className="flex items-start gap-5 bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-sm"
                    >
                      <div className="w-11 h-11 rounded-xl bg-sand-500/15 flex items-center justify-center text-sand-500 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-sans text-stone-500 text-xs uppercase tracking-wider mb-0.5">
                          {info.label}
                        </p>
                        <p className="font-sans text-stone-900 font-medium text-sm">
                          {info.value}
                        </p>
                        <p className="font-sans text-stone-500 text-xs mt-0.5">
                          {info.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* الرقم الضريبي ورقم الترخيص */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-sm mb-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-stone-500 text-xs uppercase tracking-wider">
                      الرقم الضريبي
                    </span>
                    <span className="font-sans text-stone-900 font-medium text-sm" dir="ltr">
                      314643915700003
                    </span>
                  </div>
                  <div className="border-t border-stone-200" />
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-stone-500 text-xs uppercase tracking-wider">
                     رقم السجل التجاري 
                    </span>
                    <span className="font-sans text-stone-900 font-medium text-sm" dir="ltr">
                     7053753773
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;