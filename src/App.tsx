import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/layout/Scrolltotop';
import { Spinner } from './components/ui/index';

// Public Pages (بتتحمل مباشرة لأنها أهم صفحات في الموقع)
import HomePage from './pages/public/HomePage';
import DestinationsPage from './pages/public/DestinationsPage';
import DestinationDetailPage from './pages/public/DestinationDetailPage';
import ProgramsPage from './pages/public/ProgramsPage';
import ProgramDetailPage from './pages/public/ProgramDetailPage';
import OffersPage from './pages/public/OffersPage';
import BlogPage from './pages/public/BlogPage';
import ArticleDetailPage from './pages/public/ArticleDetailPage';
import ContactPage from './pages/public/ContactPage';
import WhereToTravelPage from './pages/public/Wheretotravelpage';
import AboutPage from './pages/public/AboutPage';
import Privacypolicypage from './pages/public/Privacypolicypage';
import Terms from './pages/public/Terms';
import Refundpolicy from './pages/public/Refundpolicy';
import Bankaccounts from './pages/public/Bankaccounts';
import SiteDocumentation from './pages/public/Sitedocumentation';

// Admin Pages — Lazy Loading:
// دول بيتحمّلوا فقط لما حد يفتح مسار /admin فعليًا، مش ضمن الـ bundle
// الأساسي اللي بيحمله أي زائر عادي للموقع. ده بيقلل حجم الـ JS الأولي بشكل كبير.
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminDestinationsPage = lazy(() => import('./pages/admin/AdminDestinationsPage'));
const AdminProgramsPage = lazy(() => import('./pages/admin/AdminProgramsPage'));
const AdminArticlesPage = lazy(() => import('./pages/admin/AdminArticlesPage'));
const AdminOffersPage = lazy(() => import('./pages/admin/AdminOffersPage'));
const AdminLeadsPage = lazy(() => import('./pages/admin/AdminLeadsPage'));

// شاشة تحميل بسيطة تظهر لحظة تحميل كود صفحات الأدمن
const AdminFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
    <Spinner />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<AdminFallback />}>
          <Routes>
            {/* الصفحات العامة */}
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:slug" element={<ProgramDetailPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticleDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/where-to-travel" element={<WhereToTravelPage />} />
            <Route path="/site-documentation" element={<SiteDocumentation />} />
            {/* الصفحات القانونية والمالية */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<Refundpolicy />} />
            <Route path="/bank-accounts" element={<Bankaccounts />} />
            <Route path="/privacy" element={<Privacypolicypage />} />

            {/* لوحة التحكم (Admin) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/destinations"
              element={
                <ProtectedRoute>
                  <AdminDestinationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/programs"
              element={
                <ProtectedRoute>
                  <AdminProgramsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={
                <ProtectedRoute>
                  <AdminArticlesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/offers"
              element={
                <ProtectedRoute>
                  <AdminOffersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/leads"
              element={
                <ProtectedRoute>
                  <AdminLeadsPage />
                </ProtectedRoute>
              }
            />

            {/* أي مسار غير معروف يرجع للصفحة الرئيسية */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;