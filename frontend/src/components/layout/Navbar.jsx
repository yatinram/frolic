import React, { useState, useEffect } from 'react';
import { Drawer, Dropdown } from 'antd';
import {
  MenuOutlined,
  PhoneOutlined,
  DownOutlined,
  ArrowRightOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  CheckOutlined,
  SmileOutlined,
  ReadOutlined,
  BookOutlined,
  RocketOutlined,
  SoundOutlined,
  CalculatorOutlined,
  TeamOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useLanguage } from '../../context/LanguageContext';
import s from './Navbar.module.scss';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { currentLang, changeLang, t, languages } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          setDrawerVisible((prev) => (prev ? false : false));
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDrawer = () => setDrawerVisible(false);

  const handleSelectLang = (langCode) => {
    changeLang(langCode);
    closeDrawer();
  };

  // Language Dropdown Menu
  const languageDropdownMenu = (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(245, 130, 31, 0.15)',
        padding: '8px 10px',
        minWidth: 190,
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
      }}
    >
      {languages.map((lang) => (
        <div
          key={lang.code}
          onClick={() => handleSelectLang(lang.code)}
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            backgroundColor: currentLang === lang.code ? '#FFF4E6' : 'transparent',
            color: currentLang === lang.code ? '#F5821F' : '#1E293B',
            fontWeight: currentLang === lang.code ? 700 : 500,
            fontSize: '0.9rem',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (currentLang !== lang.code) {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
            }
          }}
          onMouseLeave={(e) => {
            if (currentLang !== lang.code) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{lang.flag}</span>
            <span style={{ fontWeight: 700 }}>{lang.label}</span>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>({lang.country} {lang.short})</span>
          </span>
          {currentLang === lang.code && <CheckOutlined style={{ fontSize: '0.82rem', color: '#F5821F' }} />}
        </div>
      ))}
    </div>
  );

  // More Dropdown Menu
  const moreDropdownMenu = (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(245, 130, 31, 0.15)',
        padding: '16px 20px',
        minWidth: 240,
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link
          to={ROUTES.GALLERY}
          style={{
            textDecoration: 'none',
            color: '#1E293B',
            fontSize: '0.92rem',
            fontWeight: 600,
            padding: '6px 8px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFF8EF';
            e.currentTarget.style.color = '#F5821F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#1E293B';
          }}
        >
          {t('nav.gallery', 'Campus Gallery')}
        </Link>

        <Link
          to={ROUTES.BLOG}
          style={{
            textDecoration: 'none',
            color: '#1E293B',
            fontSize: '0.92rem',
            fontWeight: 600,
            padding: '6px 8px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFF8EF';
            e.currentTarget.style.color = '#F5821F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#1E293B';
          }}
        >
          {t('nav.blogs', 'Blogs & Parenting Articles')}
        </Link>
        
        <Link
          to={ROUTES.LOCATE_US  }
          style={{
            textDecoration: 'none',
            color: '#1E293B',
            fontSize: '0.92rem',
            fontWeight: 600,
            padding: '6px 8px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFF8EF';
            e.currentTarget.style.color = '#F5821F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#1E293B';
          }}
        >
           {t('nav.locate_us', 'Find a Centre')}
        </Link>
      </div>
    </div>
  );

  const isHome = location.pathname === '/';
  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <>
      {/* ── Floating Island Pill Navbar Wrapper ── */}
      <header className={s.floatingNavWrapper}>
        <div className={`${s.navbarPill} ${isScrolled ? s.scrolled : ''}`}>
          {/* 1. Left Brand Logo */}
          <Link to={ROUTES.HOME} className={s.brandLogo}>
            <img src="/assets/logo.jpeg" alt="Frolic Kids Edu Labs" />
          </Link>

          {/* 2. Center Nav Links */}
          <nav className={s.navLinks}>
            {/* Home */}
            <Link
              to={ROUTES.HOME}
              className={`${s.navItem} ${isHome ? s.active : ''}`}
            >
              {t('nav.home', 'Home')}
            </Link>

            {/* About Frolic */}
            <Link
              to={ROUTES.ABOUT}
              className={`${s.navItem} ${location.pathname === '/about' ? s.active : ''}`}
            >
              {t('nav.about', 'About Frolic')}
            </Link>

            {/* Programs Link (Direct Click - No Dropdown) */}
            <Link
              to={ROUTES.PROGRAMS}
              className={`${s.navItem} ${location.pathname.startsWith('/programs') ? s.active : ''}`}
            >
              {t('nav.programs', 'Programs')}
            </Link>

            {/* Kids Games */}
            <Link
              to={ROUTES.GAMES}
              className={`${s.navItem} ${location.pathname === '/games' ? s.active : ''}`}
            >
              {t('nav.games', 'Kids Games')}
            </Link>

            {/* Store & Kits */}
            <Link
              to={ROUTES.STORE}
              className={`${s.navItem} ${location.pathname === '/store' ? s.active : ''}`}
            >
              {t('nav.store', 'Kits & Store')}
            </Link>

            {/* Find a Centre */}
            <Link
              to={ROUTES.FRANCHISE}
              className={`${s.navItem} ${location.pathname === '/franchise' ? s.active : ''}`}
            >
              {t('nav.franchise', 'Frenchise')}
            </Link>

            {/* More Dropdown */}
            <Dropdown popupRender={() => moreDropdownMenu} placement="bottomRight">
              <span
                className={`${s.navItem} ${['/gallery', '/blog', '/awards', '/franchise'].some((p) => location.pathname.startsWith(p)) ? s.active : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.more', 'More')} <DownOutlined className={s.chevron} />
              </span>
            </Dropdown>
          </nav>

          {/* 3. Right Actions Group */}
          <div className={s.actionsGroup}>
            {/* Language Switcher Dropdown Button (Exact Match to Reference Image) */}
            <Dropdown popupRender={() => languageDropdownMenu} placement="bottomRight" trigger={['click']}>
              <button type="button" className={s.langBtn} aria-label="Select Language">
                <GlobalOutlined style={{ color: '#F7941D', fontSize: '0.95rem' }} />
                <span>{currentLangObj.country || 'GB'} {currentLangObj.short}</span>
                <DownOutlined style={{ fontSize: '0.62rem', color: '#64748B' }} />
              </button>
            </Dropdown>
            {/* Primary Rounded Pill CTA Button (Matches Reference Image) */}
            <Link to={ROUTES.ADMISSION} className={s.primaryCta}>
              <span>{t('nav.admissionsOpen', 'Admissions Open')}</span>
              <span className={s.arrowCircle}>
                <ArrowRightOutlined />
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={s.mobileMenuBtn}
              onClick={() => setDrawerVisible(true)}
              aria-label="Open Menu"
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <Drawer
        title={
          <img src="/assets/logo.jpeg" alt="Logo" style={{ height: 38, objectFit: 'contain' }} />
        }
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={300}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
          {/* Mobile Language Switcher Dropdown */}
          <div style={{ paddingBottom: 10, borderBottom: '1px solid #F1F5F9' }}>
            <Dropdown popupRender={() => languageDropdownMenu} placement="bottomLeft" trigger={['click']}>
              <button
                type="button"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #F7941D',
                  backgroundColor: '#FFF7EE',
                  color: '#F7941D',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <GlobalOutlined />
                  <span>{currentLangObj.flag} {currentLangObj.label} ({currentLangObj.country} {currentLangObj.short})</span>
                </span>
                <DownOutlined style={{ fontSize: '0.7rem' }} />
              </button>
            </Dropdown>
          </div>

          <Link to={ROUTES.HOME} onClick={closeDrawer} style={{ color: '#F5821F', textDecoration: 'none' }}>{t('nav.home', 'Home')}</Link>
          <Link to={ROUTES.ABOUT} onClick={closeDrawer} style={{ color: '#334155', textDecoration: 'none' }}>{t('nav.about', 'About Frolic')}</Link>
          <Link to={ROUTES.PROGRAMS} onClick={closeDrawer} style={{ color: '#334155', textDecoration: 'none' }}>{t('nav.programs', 'All Programs & Labs')}</Link>
          <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.84rem' }}>
            <Link to={ROUTES.PLAY_GROUP} onClick={closeDrawer} style={{ color: '#FF5252', textDecoration: 'none' }}>• Play Group (1.5–2.5Y)</Link>
            <Link to={ROUTES.NURSERY} onClick={closeDrawer} style={{ color: '#10AC84', textDecoration: 'none' }}>• Nursery (2.5–3.5Y)</Link>
            <Link to={ROUTES.LKG} onClick={closeDrawer} style={{ color: '#1E90FF', textDecoration: 'none' }}>• LKG / Jr. KG (3.5–4.5Y)</Link>
            <Link to={ROUTES.UKG} onClick={closeDrawer} style={{ color: '#F5821F', textDecoration: 'none' }}>• UKG / Sr. KG (4.5–5.5Y)</Link>
            <Link to={ROUTES.ENGLISH_LAB} onClick={closeDrawer} style={{ color: '#00A8FF', textDecoration: 'none' }}>• Digital English Lab (D.I.E.L.)</Link>
            <Link to={ROUTES.MATHS_LAB} onClick={closeDrawer} style={{ color: '#F1C40F', textDecoration: 'none' }}>• Dual-Brain Maths Lab (Abacus)</Link>
            <Link to={ROUTES.TEACHER_TRAINING} onClick={closeDrawer} style={{ color: '#8E44AD', textDecoration: 'none' }}>• Teacher Mentoring Academy</Link>
          </div>
          <Link to={ROUTES.STORE} onClick={closeDrawer} style={{ color: '#F5821F', textDecoration: 'none' }}>🎒 {t('nav.store', 'Kits & Store')}</Link>
          <Link to={ROUTES.GAMES} onClick={closeDrawer} style={{ color: '#9C27B0', textDecoration: 'none' }}>🎮 {t('nav.games', 'Kids Games')}</Link>
          <Link to={ROUTES.FRANCHISE} onClick={closeDrawer} style={{ color: '#334155', textDecoration: 'none' }}>💼 {t('nav.franchise', 'Franchise Opportunities')}</Link>
          <Link to={ROUTES.LOCATE_US} onClick={closeDrawer} style={{ color: '#334155', textDecoration: 'none' }}>📍 {t('nav.locateUs', 'Find a Campus')}</Link>
          <Link to={ROUTES.GALLERY} onClick={closeDrawer} style={{ color: '#334155', textDecoration: 'none' }}>📸 {t('nav.gallery', 'Campus Gallery')}</Link>
          <Link to={ROUTES.BLOG} onClick={closeDrawer} style={{ color: '#334155', textDecoration: 'none' }}>📝 {t('nav.blogs', 'Parenting Blogs')}</Link>
          <Link to={ROUTES.CONTACT} onClick={closeDrawer} style={{ color: '#334155', textDecoration: 'none' }}>{t('nav.contact', 'Contact Us')}</Link>

          <div style={{ marginTop: 16 }}>
            <Link
              to={ROUTES.ADMISSION}
              onClick={closeDrawer}
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#F5821F',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: 50,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(245, 130, 31, 0.35)',
              }}
            >
              {t('nav.admissionsOpen', 'Admissions Open')} →
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
}
