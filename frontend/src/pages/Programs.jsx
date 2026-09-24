import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  AppstoreOutlined,
  ReadOutlined,
  ExperimentOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { PROGRAMS_DATA } from '../constants/programsData';
import { ROUTES } from '../constants/routes';
import { programService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import s from './Programs.module.scss';

export default function Programs() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [programs, setPrograms] = useState(PROGRAMS_DATA);
  const [loading, setLoading] = useState(false);

  // Fetch live programs from backend API with fallback to static constants
  useEffect(() => {
    let isMounted = true;
    const loadPrograms = async () => {
      try {
        setLoading(true);
        const res = await programService.getAll({ activeOnly: 'true' });
        const list = res?.data?.data || res?.data || res;
        if (isMounted && Array.isArray(list) && list.length > 0) {
          setPrograms(list);
        }
      } catch (err) {
        console.warn('Using static fallback for programs list', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPrograms();
    return () => {
      isMounted = false;
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { all: programs.length, preschool: 0, lab: 0, training: 0 };
    programs.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [programs]);

  const categoryTabs = useMemo(() => [
    { key: 'all', label: `${t('programsPage.tabAll', 'All Programs')} (${categoryCounts.all})`, icon: <AppstoreOutlined /> },
    { key: 'preschool', label: `${t('programsPage.tabPreschool', 'Preschool Foundation')} (${categoryCounts.preschool})`, icon: <ReadOutlined /> },
    { key: 'lab', label: `${t('programsPage.tabLab', 'Specialized Edu Labs')} (${categoryCounts.lab})`, icon: <ExperimentOutlined /> },
    { key: 'training', label: `${t('programsPage.tabTraining', 'Teacher Academy')} (${categoryCounts.training})`, icon: <TeamOutlined /> },
  ], [categoryCounts, t]);

  const filteredPrograms = useMemo(() => {
    if (activeTab === 'all') return programs;
    return programs.filter((p) => p.category === activeTab);
  }, [programs, activeTab]);

  const handleProgramClick = (prog) => {
    navigate(`/programs/${prog.slug || prog.id}`);
  };

  return (
    <div className={s.programsPage}>

      {/* ── 1. Hero Banner with Kids Artwork Background ── */}
      <section className={s.heroBanner}>
        <div
          className={s.heroBanner__bg}
          style={{ backgroundImage: `url('/assets/hero_kids_clean.png')` }}
        />
        <div className={s.heroBanner__overlay} />

        <div className="container-xl" style={{ marginTop: '5%' }}>
          <div className={s.heroBanner__content}>
            <div className={s.heroBanner__badge}>
              <SafetyCertificateOutlined /> {t('programsPage.badge', 'NEP 2020 & NCF-FS Foundational Curriculum')}
            </div>

            <h1 className={s.heroBanner__title}>
              {t('programsPage.title', 'Our Learning Programs & Specialized Edu Labs')}
            </h1>

            <p className={s.heroBanner__subtitle}>
              {t(
                'programsPage.subtitle',
                'From early sensory discovery at 1.5 years to foundational phonics, 44-phoneme Digital English Labs, and abacus mental arithmetic up to Class 5.'
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="container-xl">

        {/* ── 2. Filter Bar & Section Title ── */}
        <div className={s.hubHeader}>
          <div>
            <h2 className={s.hubHeader__title}>{t('programsPage.selectTitle', 'Select a Program to Explore')}</h2>
          </div>

          <div className={s.categoryTabs}>
            {categoryTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`${s.tabBtn} ${activeTab === tab.key ? s.tabBtnActive : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── 3. All Programs Displayed as Cards ── */}
        {loading && programs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Spin size="large" />
          </div>
        ) : (
          <div className="row g-4">
            {filteredPrograms.map((prog) => (
              <div key={prog.id || prog.slug} className="col-xl-4 col-md-6">
                <div
                  className={s.programCard}
                  onClick={() => handleProgramClick(prog)}
                >
                  <div>
                    {/* Card Image with Age Badge */}
                    <div className={s.programCard__image}>
                      <img src={prog.image || '/assets/hero_kids_clean.png'} alt={prog.title || prog.name} loading="lazy" />

                      <div
                        className={s.programCard__ageBadge}
                        style={{ backgroundColor: prog.accentColor || '#0f172a' }}
                      >
                        <CalendarOutlined />
                        <span>{prog.ageGroup}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className={s.programCard__content}>
                      <div
                        className={s.programCard__category}
                        style={{ color: prog.accentColor || '#f7941d' }}
                      >
                        {prog.categoryLabel || prog.category?.toUpperCase()}
                      </div>

                      <h3 className={s.programCard__title}>{prog.title || prog.name}</h3>

                      <p
                        className={s.programCard__tagline}
                        style={{ color: prog.accentColor || '#ea580c' }}
                      >
                        {prog.tagline}
                      </p>

                      <p className={s.programCard__desc}>{prog.shortDescription}</p>

                      {/* Key Highlights Checklist */}
                      {Array.isArray(prog.keyHighlights) && prog.keyHighlights.length > 0 && (
                        <div className={s.programCard__highlights}>
                          {prog.keyHighlights.slice(0, 3).map((hl, idx) => (
                            <div key={idx} className={s.programCard__highlightRow}>
                              <CheckCircleOutlined className={s.checkIcon} />
                              <span>{typeof hl === 'string' ? hl : hl.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer with Dedicated Action Button */}
                  <div className={s.programCard__footer}>
                    <Button
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      className={s.viewDetailBtn}
                      style={{
                        backgroundColor: prog.accentColor || '#f7941d',
                        borderColor: prog.accentColor || '#f7941d',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgramClick(prog);
                      }}
                    >
                      {t('programsPage.viewDetails', 'View Full Program Details')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 4. Campus Tour & Admission Callout Banner ── */}
        <section className={s.tourCallout}>
          <div>
            <span className={s.tourCallout__tag}>{t('programsPage.tourTag', 'Admissions Open 2025–26')}</span>
            <h3 className={s.tourCallout__title}>
              {t('programsPage.tourTitle', 'Schedule a Campus Visit & Free 1-Day Trial Class')}
            </h3>
            <p className={s.tourCallout__desc}>
              {t(
                'programsPage.tourDesc',
                'Experience our sensory playrooms, Digital Interactive English Lab (D.I.E.L.), and safe CCTV campus firsthand.'
              )}
            </p>
          </div>

          <div className={s.tourCallout__actions}>
            <Button
              type="primary"
              size="large"
              icon={<EnvironmentOutlined />}
              onClick={() => navigate(ROUTES.LOCATE_US)}
              style={{
                backgroundColor: '#f7941d',
                borderColor: '#f7941d',
                fontWeight: 800,
                height: 48,
                borderRadius: 12,
                padding: '0 24px',
              }}
            >
              {t('programsPage.locateBtn', 'Locate Nearest Campus')}
            </Button>
            <Button
              size="large"
              icon={<PhoneOutlined />}
              onClick={() => navigate(ROUTES.ADMISSION)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                fontWeight: 700,
                height: 48,
                borderRadius: 12,
                padding: '0 24px',
              }}
            >
              {t('programsPage.applyBtn', 'Apply for Admission')}
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
