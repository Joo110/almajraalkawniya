import React from 'react';
import PublicLayout from '../../components/layout/PublicLayout';

const documents = [
  {
    title: 'رخصة نشاط تجاري',
    file: '/1125818011_file.pdf',
  },
  {
    title: 'وثيقة بيانات المنشأة - المركز السعودي للأعمال',
    file: '/mk.pdf',
  },
];

const Licenses: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-white min-h-screen">
        <section className="relative h-44 md:h-48 flex items-start justify-center overflow-hidden bg-charcoal-900 pt-24 md:pt-28">
          <div className="relative z-10 text-center px-6" dir="rtl">
            <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-2">
              التراخيص <span className="text-gradient">الرسمية</span>
            </h1>
          </div>
        </section>

        <section className="bg-white py-16" dir="rtl">
          <div className="max-w-4xl mx-auto px-5 flex flex-col items-center gap-12">
            {documents.map((doc) => (
              <div key={doc.file} className="w-full flex flex-col items-center">
                <h2 className="font-sans font-bold text-charcoal-900 text-lg mb-4">
                  {doc.title}
                </h2>

                <iframe
                  src={`${doc.file}#toolbar=0&navpanes=0`}
                  title={doc.title}
                  className="hidden md:block w-full max-w-2xl h-[800px] rounded-2xl shadow-lg border border-gray-200"
                />

                <div className="flex items-center gap-3 mt-4">
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-charcoal-900 text-white text-sm font-sans font-semibold hover:opacity-90 transition-opacity"
                  >
                    فتح الملف
                  </a>
                  <a
                    href={doc.file}
                    download
                    className="px-5 py-2.5 rounded-full border border-charcoal-900 text-charcoal-900 text-sm font-sans font-semibold hover:bg-charcoal-900 hover:text-white transition-colors"
                  >
                    تحميل
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Licenses;