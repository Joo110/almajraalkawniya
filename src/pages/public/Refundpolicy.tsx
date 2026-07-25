import React from 'react';
import PublicLayout from '../../components/layout/PublicLayout';

const refundItems: string[] = [
  'تخضع تذاكر الطيران لشروط وأحكام شركة الطيران الناقلة، حيث قد تكون بعض التذاكر غير قابلة للإلغاء أو الاسترجاع، والشركة غير مسؤولة عن أي تغييرات أو إلغاءات تصدر من شركات الطيران.',
  'تخضع حجوزات الفنادق لسياسات الإلغاء والتعديل الخاصة بكل فندق، حيث قد يسمح بعضها بالإلغاء المجاني ضمن فترة زمنية محددة، بينما قد يفرض البعض الآخر رسومًا قد تصل إلى كامل قيمة الحجز. كما أن حجوزات الأكواخ والشقق والمنتجعات غير قابلة للاسترجاع نهائيًا.',
  'يحق للعميل التعديل على الفنادق التي تم حجزها، على أن يتحمل العميل كافة الغرامات المقررة وفقًا لنوع الخدمة المراد تعديلها، وتعتمد نتيجة التعديل على الإمكانية المتاحة خلال تلك الفترة.',
  'في حالة استرداد أي مبلغ مالي، يتم ذلك خلال مدة تتراوح من 10 إلى 21 يوم عمل على الأقل من تاريخ طلب الإلغاء. وفي حال الدفع باستخدام البطاقات الإلكترونية (فيزا / ماستر كارد)، يتم رد المبالغ إلى البطاقة وفقًا للفترة الزمنية التي يحددها البنك.',
  'في حالة إرجاع المسافر أو منعه من السفر لأي سبب كان، فإن المكتب غير مسؤول عن استرداد مبلغ الرحلة أو أي تكاليف أخرى مترتبة على ذلك، مع إمكانية مساعدة العميل في حجز رحلة بديلة أو تخفيف الغرامات قدر الإمكان.',
  'في حالة الإلغاء أثناء تنفيذ الرحلة، يتم خصم كامل المبلغ ولا يحق للعميل استرداد أي مبالغ.',
];

const RefundPolicy: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-white min-h-screen">
        <section className="relative h-44 md:h-48 flex items-start justify-center overflow-hidden bg-charcoal-900 pt-24 md:pt-28">
          <div className="relative z-10 text-center px-6" dir="rtl">
            <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">
              سياسة <span className="text-gradient">الاسترجاع</span>
            </h1>    
          </div>
        </section>

        <section className="bg-white py-16" dir="rtl">
          <div className="max-w-3xl mx-auto px-5">
            <ul className="space-y-5">
              {refundItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded-xl px-5 py-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-500 mt-2 flex-shrink-0" />
                  <p className="font-sans text-stone-700 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>

            <p className="font-sans text-stone-400 text-xs text-center mt-10 leading-relaxed">
              للمزيد من التفاصيل حول شروط الحجز والسفر، يرجى مراجعة صفحة الشروط والأحكام.
            </p>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default RefundPolicy;