import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * -----------
 * React Router (وأي SPA) ما بيرجعش لفوق الصفحة تلقائيًا عند تغيير الـ route.
 * الكومبونينت ده بيراقب الـ pathname، وكل ما يتغير (يعني كل ما تنتقل لصفحة جديدة
 * عبر <Link> أو navigate())، بيعمل scroll فوري لأعلى الصفحة.
 *
 * طريقة الاستخدام:
 * ضعه مباشرة تحت <BrowserRouter> في App.tsx، قبل الـ <Routes>.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

export default ScrollToTop;