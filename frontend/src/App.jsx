import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ROUTES } from './constants/routes';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Common
import AdminLoginModal from './components/common/AdminLoginModal';

// Lazy-Loaded Public Pages (Code Splitting for high performance)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramDetailPage = lazy(() => import('./pages/ProgramDetailPage'));
const EnglishLabPage = lazy(() => import('./pages/EnglishLabPage'));
const MathsLabPage = lazy(() => import('./pages/MathsLabPage'));
const TeacherTrainingPage = lazy(() => import('./pages/TeacherTrainingPage'));
const AdmissionPage = lazy(() => import('./pages/AdmissionPage'));
const FranchisePage = lazy(() => import('./pages/FranchisePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const LocateUsPage = lazy(() => import('./pages/LocateUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const KidsGamesPage = lazy(() => import('./pages/KidsGamesPage'));
const StorePage = lazy(() => import('./pages/StorePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const EventsAwardsPage = lazy(() => import('./pages/EventsAwardsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy-Loaded Admin Pages (Isolated to protect frontend payload)
const Dashboard = lazy(() => import('./admin/Dashboard'));
const AdmissionsList = lazy(() => import('./admin/AdmissionsList'));
const FranchiseList = lazy(() => import('./admin/FranchiseList'));
const ProgramManager = lazy(() => import('./admin/ProgramManager'));
const TestimonialManager = lazy(() => import('./admin/TestimonialManager'));
const GalleryManager = lazy(() => import('./admin/GalleryManager'));
const BlogManager = lazy(() => import('./admin/BlogManager'));
const ProductManager = lazy(() => import('./admin/ProductManager'));
const OrderManager = lazy(() => import('./admin/OrderManager'));

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: '3px solid rgba(247, 148, 29, 0.2)',
          borderTop: '3px solid #F7941D',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainAppRoutes() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Global Keyboard Listener for Secret Admin Shortcut: Ctrl + Shift + L
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        setAdminModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.PROGRAMS} element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage />} />
          <Route path={ROUTES.ENGLISH_LAB} element={<EnglishLabPage />} />
          <Route path={ROUTES.MATHS_LAB} element={<MathsLabPage />} />
          <Route path={ROUTES.TEACHER_TRAINING} element={<TeacherTrainingPage />} />
          <Route path={ROUTES.ADMISSION} element={<AdmissionPage />} />
          <Route path={ROUTES.FRANCHISE} element={<FranchisePage />} />
          <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
          <Route path={ROUTES.LOCATE_US} element={<LocateUsPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path={ROUTES.BLOG_POST} element={<BlogPostPage />} />
          <Route path={ROUTES.GAMES} element={<KidsGamesPage />} />
          <Route path={ROUTES.STORE} element={<StorePage />} />
          <Route path={ROUTES.STORE_ITEM} element={<ProductDetailPage />} />
          <Route path={ROUTES.EVENTS} element={<EventsAwardsPage />} />
          <Route path={ROUTES.AWARDS} element={<EventsAwardsPage />} />

          {/* Protected Admin Routes */}
          <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admissions" element={<AdmissionsList />} />
            <Route path="franchise" element={<FranchiseList />} />
            <Route path="programs" element={<ProgramManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="orders" element={<OrderManager />} />
            <Route path="testimonials" element={<TestimonialManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="blogs" element={<BlogManager />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && <Footer />}

      {/* Secret Admin Login Popup */}
      <AdminLoginModal
        open={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F7941D',
          colorSuccess: '#4CAF50',
          colorInfo: '#2196F3',
          colorWarning: '#FFC107',
          colorError: '#FF5722',
          colorText: '#1A2016',
          colorTextSecondary: '#4A5248',
          colorBgContainer: '#FFFFFF',
          borderRadius: 14,
          borderRadiusLG: 22,
          fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
        },
        components: {
          Button: {
            borderRadius: 9999,
            fontWeight: 700,
            primaryShadow: '0 8px 24px -4px rgba(247,148,29,0.35)',
          },
          Input: {
            borderRadius: 14,
            paddingBlock: 10,
          },
          Select: {
            borderRadius: 14,
          },
          Card: {
            borderRadius: 22,
          },
        },
      }}
    >
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <MainAppRoutes />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
