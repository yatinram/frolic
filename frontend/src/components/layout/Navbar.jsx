import React, { useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import {
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useLanguage } from '../../context/LanguageContext';
import s from './Navbar.module.scss';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const { currentLang, changeLang, t, languages } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenAccordion(null);
  }, [location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenAccordion(null);
  };

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const handleSelectLang = (langCode) => {
    changeLang(langCode);
    closeMenu();
  };

  // Language Dropdown Menu (desktop)
  const languageDropdownMenu = (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(245, 130, 31, 0.15)',
        padding: '12px 14px',
        minWidth: 210,
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {languages.map((lang) => {
          const isSelected = currentLang === lang.code;
          return (
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
                backgroundColor: isSelected ? '#FFF8EF' : 'transparent',
                color: isSelected ? '#F5821F' : '#1E293B',
                fontWeight: isSelected ? 700 : 600,
                fontSize: '0.9rem',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#FFF8EF';
                  e.currentTarget.style.color = '#F5821F';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1E293B';
                }
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.1rem' }}>{lang.flag}</span>
                <span style={{ fontWeight: 700 }}>{lang.label}</span>
                <span style={{ fontSize: '0.78rem', color: isSelected ? '#F5821F' : '#94A3B8', fontWeight: 600 }}>
                  ({lang.country} {lang.short})
                </span>
              </span>
              {isSelected && <CheckOutlined style={{ fontSize: '0.82rem', color: '#F5821F' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );

  // More Dropdown Menu (desktop)
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
        {[
          { to: ROUTES.GALLERY, label: t('nav.gallery', 'Campus Gallery') },
          { to: ROUTES.BLOG, label: t('nav.blogs', 'Blogs & Parenting Articles') },
          { to: ROUTES.LOCATE_US, label: t('nav.locate_us', 'Find a Centre') },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
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
            {label}
          </Link>
        ))}
      </div>
    </div>
  );

  const isHome = location.pathname === '/';
  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  // Mobile menu accordion items
  const mobileMenuItems = [
    {
      key: 'home',
      label: t('nav.home', 'Home'),
      to: ROUTES.HOME,
    },
    {
      key: 'about',
      label: t('nav.about', 'About Frolic'),
      to: ROUTES.ABOUT,
    },
    {
      key: 'programs',
      label: t('nav.programs', 'Programs'),
      children: [
        { label: '🌱 Play Group (1.5–2.5Y)', to: ROUTES.PLAY_GROUP },
        { label: '🌸 Nursery (2.5–3.5Y)', to: ROUTES.NURSERY },
        { label: '📘 LKG / Jr. KG (3.5–4.5Y)', to: ROUTES.LKG },
        { label: '⭐ UKG / Sr. KG (4.5–5.5Y)', to: ROUTES.UKG },
        { label: '🔤 Digital English Lab', to: ROUTES.ENGLISH_LAB },
        { label: '🧮 Dual-Brain Maths Lab', to: ROUTES.MATHS_LAB },
        { label: '🏅 Teacher Mentoring Academy', to: ROUTES.TEACHER_TRAINING },
      ],
    },
    {
      key: 'store',
      label: t('nav.store', 'Kits & Store'),
      to: ROUTES.STORE,
    },
    {
      key: 'games',
      label: t('nav.games', 'Kids Games'),
      to: ROUTES.GAMES,
    },
    {
      key: 'more',
      label: t('nav.more', 'More'),
      children: [
        { label: '📸 ' + t('nav.gallery', 'Campus Gallery'), to: ROUTES.GALLERY },
        { label: '📝 ' + t('nav.blogs', 'Parenting Blogs'), to: ROUTES.BLOG },
        { label: '💼 ' + t('nav.franchise', 'Franchise Opportunities'), to: ROUTES.FRANCHISE },
        { label: '📍 ' + t('nav.locateUs', 'Find a Campus'), to: ROUTES.LOCATE_US },
      ],
    },
    {
      key: 'contact',
      label: t('nav.contact', 'Contact Us'),
      to: ROUTES.CONTACT,
    },
    {
      key: 'language',
      label: t('nav.language', 'Language'),
      children: languages.map((lang) => ({
        label: `${lang.flag} ${lang.label} (${lang.short})`,
        action: () => handleSelectLang(lang.code),
        isActive: currentLang === lang.code,
      })),
    },
  ];

  return (
    <>
      {/* ── Floating Island Pill Navbar Wrapper ── */}
      <header className={s.floatingNavWrapper}>
        <div className={`${s.navbarPill} ${isScrolled ? s.scrolled : ''}`}>
          {/* 1. Left Brand Logo */}
          <Link to={ROUTES.HOME} className={s.brandLogo}>
            <img src="/assets/logo.jpeg" alt="Frolic Kids Edu Labs" />
          </Link>

          {/* 2. Center Nav Links (desktop) */}
          <nav className={s.navLinks}>
            <Link to={ROUTES.HOME} className={`${s.navItem} ${isHome ? s.active : ''}`}>
              {t('nav.home', 'Home')}
            </Link>
            <Link to={ROUTES.ABOUT} className={`${s.navItem} ${location.pathname === '/about' ? s.active : ''}`}>
              {t('nav.about', 'About Frolic')}
            </Link>
            <Link to={ROUTES.PROGRAMS} className={`${s.navItem} ${location.pathname.startsWith('/programs') ? s.active : ''}`}>
              {t('nav.programs', 'Programs')}
            </Link>
            <Link to={ROUTES.GAMES} className={`${s.navItem} ${location.pathname === '/games' ? s.active : ''}`}>
              {t('nav.games', 'Kids Games')}
            </Link>
            <Link to={ROUTES.STORE} className={`${s.navItem} ${location.pathname === '/store' ? s.active : ''}`}>
              {t('nav.store', 'Kits & Store')}
            </Link>
            <Link to={ROUTES.FRANCHISE} className={`${s.navItem} ${location.pathname === '/franchise' ? s.active : ''}`}>
              {t('nav.franchise', 'Franchise')}
            </Link>
            <Dropdown popupRender={() => moreDropdownMenu} placement="bottomRight">
              <span
                className={`${s.navItem} ${['/gallery', '/blog', '/locate-us', '/contact'].some((p) => location.pathname.startsWith(p)) ? s.active : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.more', 'More')} <DownOutlined className={s.chevron} />
              </span>
            </Dropdown>
          </nav>

          {/* 3. Right Actions Group */}
          <div className={s.actionsGroup}>
            <Dropdown popupRender={() => languageDropdownMenu} placement="bottomRight">
              <button type="button" className={s.langBtn} aria-label="Select Language">
                <GlobalOutlined style={{ color: '#F7941D', fontSize: '0.95rem' }} />
                <span>{currentLangObj.country || 'IN'} {currentLangObj.short}</span>
                <DownOutlined className={s.chevron} />
              </button>
            </Dropdown>

            <Link to={ROUTES.ADMISSION} className={s.primaryCta}>
              <span>{t('nav.admissionsOpen', 'Admissions Open')}</span>
              <span className={s.arrowCircle}>
                <ArrowRightOutlined />
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className={s.mobileMenuBtn}
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu Overlay ── */}
      {menuOpen && (
        <div className={s.mobileOverlay} onClick={closeMenu}>
          <div className={s.mobileSheet} onClick={(e) => e.stopPropagation()}>

            {/* Top pill — logo + close */}
            <div className={s.mobileSheet__topPill}>
              <Link to={ROUTES.HOME} className={s.brandLogo} onClick={closeMenu}>
                <img src="/assets/logo.jpeg" alt="Frolic Kids Edu Labs" />
              </Link>
              <button
                type="button"
                className={s.mobileSheet__closeBtn}
                onClick={closeMenu}
                aria-label="Close Menu"
              >
                <CloseOutlined />
              </button>
            </div>

            {/* Menu card */}
            <div className={s.mobileSheet__card}>
              <div className={s.mobileSheet__scrollArea}>
                {mobileMenuItems.map((item) => (
                  <div key={item.key}>
                    {item.children ? (
                      /* Accordion item */
                      <>
                        <button
                          type="button"
                          className={s.mobileAccordionBtn}
                          onClick={() => toggleAccordion(item.key)}
                        >
                          <span>{item.label}</span>
                          <DownOutlined
                            className={`${s.mobileAccordionChevron} ${openAccordion === item.key ? s.mobileAccordionChevron__open : ''}`}
                          />
                        </button>
                        {openAccordion === item.key && (
                          <div className={s.mobileAccordionContent}>
                            {item.children.map((child, idx) =>
                              child.action ? (
                                <button
                                  key={idx}
                                  type="button"
                                  className={`${s.mobileAccordionChild} ${child.isActive ? s.mobileAccordionChild__active : ''}`}
                                  onClick={child.action}
                                >
                                  {child.label}
                                  {child.isActive && <CheckOutlined style={{ fontSize: 12, color: '#F5821F' }} />}
                                </button>
                              ) : (
                                <Link
                                  key={idx}
                                  to={child.to}
                                  className={s.mobileAccordionChild}
                                  onClick={closeMenu}
                                >
                                  {child.label}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Simple link item */
                      <Link
                        to={item.to}
                        className={`${s.mobileNavLink} ${location.pathname === item.to ? s.mobileNavLink__active : ''}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className={s.mobileSheet__cta}>
                <Link to={ROUTES.ADMISSION} className={s.mobileSheet__ctaBtn} onClick={closeMenu}>
                  {t('nav.admissionsOpen', 'Admissions Open')} &nbsp;→
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
