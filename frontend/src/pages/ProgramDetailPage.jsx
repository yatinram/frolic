import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CalendarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  FormOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
  ExperimentOutlined,
  SoundOutlined,
  SmileOutlined,
  TrophyOutlined,
  CalculatorOutlined,
  DesktopOutlined,
  GlobalOutlined,
  PictureOutlined,
  EditOutlined,
  AppleOutlined,
  HeartOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  RocketOutlined,
  TranslationOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Button, Empty, Spin } from 'antd';
import { PROGRAMS_DATA } from '../constants/programsData';
import { ROUTES } from '../constants/routes';
import { FrolicButton } from '../components/ui';
import { programService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import { useLocalizedProgram, useLocalizedPrograms } from '../utils/programLocalization';
import s from './ProgramDetailPage.module.scss';

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Find initial fallback program from static constants
  const initialProgram = useMemo(() => {
    if (!slug) return PROGRAMS_DATA[0];
    return (
      PROGRAMS_DATA.find((p) => p.slug === slug || p.id === slug) ||
      PROGRAMS_DATA[0]
    );
  }, [slug]);

  const [rawProgram, setRawProgram] = useState(initialProgram);
  const [rawAllPrograms, setRawAllPrograms] = useState(PROGRAMS_DATA);
  const [loading, setLoading] = useState(false);

  // Localize current program and program list based on active language
  const program = useLocalizedProgram(rawProgram);
  const allPrograms = useLocalizedPrograms(rawAllPrograms);

  // Fetch program detail and all programs list from backend API
  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await programService.getBySlug(slug);
        const data = res?.data?.data || res?.data || res;
        if (isMounted && data && (data.title || data.name)) {
          setRawProgram(data);
        }
      } catch (err) {
        console.warn('Fallback to static program data for slug:', slug);
        const local = PROGRAMS_DATA.find((p) => p.slug === slug || p.id === slug);
        if (isMounted && local) setRawProgram(local);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Fetch all programs for bottom switcher
  useEffect(() => {
    let isMounted = true;
    programService.getAll({ activeOnly: 'true' })
      .then((res) => {
        const list = res?.data?.data || res?.data || res;
        if (isMounted && Array.isArray(list) && list.length > 0) {
          setRawAllPrograms(list);
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!program) {
    return (
      <div className="container-xl text-center py-5">
        <Empty description="Program not found" />
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(ROUTES.PROGRAMS)}
          style={{ marginTop: 16 }}
        >
          {t('programDetail.backToPrograms', 'Back to All Programs')}
        </Button>
      </div>
    );
  }

  const handleApplyClick = () => {
    navigate(`${ROUTES.ADMISSION}?program=${program.slug || program.id}`);
  };

  const handleTourClick = () => {
    navigate(ROUTES.LOCATE_US);
  };

  const displayTitle = program.title || program.name;

  return (
    <div className={s.detailPage}>

      {/* ── 1. Hero Banner ── */}
      <section className={s.hero}>
        <div
          className={s.hero__bg}
          style={{ backgroundImage: `url('${program.heroBg || program.image || '/assets/hero_kids_clean.png'}')` }}
        />
        <div
          className={s.hero__overlay}
          style={{ background: program.heroOverlay || program.gradient || 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.92) 100%)' }}
        />

        <div className="container-xl" style={{ marginTop: '5%' }}>
          <div className={s.hero__content}>
            <div className={s.hero__inner}>
              <div>
                <div className={s.hero__ageBadge}>
                  <CalendarOutlined />
                  <span>{program.ageGroup}</span>
                  {program.courseCode && (
                    <span>• {program.courseCode}</span>
                  )}
                </div>

                <h1 className={s.hero__title}>{displayTitle}</h1>
                <p className={s.hero__tagline}>{program.tagline}</p>
              </div>

              <div className={s.hero__actions}>
                <Button
                  type="primary"
                  size="large"
                  icon={<FormOutlined />}
                  onClick={handleApplyClick}
                  style={{
                    backgroundColor: '#ffffff',
                    color: program.accentColor || '#0f172a',
                    fontWeight: 800,
                    height: 48,
                    borderRadius: 12,
                    border: 'none',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {t('programDetail.applyNow', 'Apply for Admission')}
                </Button>
                <Button
                  size="large"
                  icon={<EnvironmentOutlined />}
                  onClick={handleTourClick}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    color: '#ffffff',
                    fontWeight: 700,
                    height: 48,
                    borderRadius: 12,
                  }}
                >
                  {t('programDetail.bookTour', 'Book Campus Tour')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-xl">

        {/* ── 2. Master 2-Column Layout ── */}
        <div className={`row g-4 ${s.masterLayout}`}>
          <div className="col-12" style={{ marginBottom: 8 }}>
            <FrolicButton
              to={ROUTES.PROGRAMS}
              variant="secondary"
              size="small"
              style={{ fontWeight: 600, padding: '6px 16px', fontSize: '0.9rem' }}
            >
              <ArrowLeftOutlined /> {t('programDetail.backToPrograms', 'Back to All Programs')}
            </FrolicButton>
          </div>

          {/* Left Column: Specifications Card & Quick Contact */}
          <div>
            <div className={s.specsCard__container} >
              <div className={s.specsCard}>
                {program.image && (
                  <img
                    src={program.image}
                    alt={displayTitle}
                    className={s.specsCard__image}
                    loading="lazy"
                  />
                )}

                <h4 className={s.specsCard__title}>{t('programDetail.specsTitle', 'Program Specifications')}</h4>

                <div className={s.specsCard__row}>
                  <span className={s.specsCard__label}>{t('programDetail.targetAge', 'Target Age')}</span>
                  <span className={s.specsCard__value}>{program.ageGroup}</span>
                </div>

                {program.quickSpecs?.schedule && (
                  <div className={s.specsCard__row}>
                    <span className={s.specsCard__label}>{t('programDetail.dailySchedule', 'Daily Schedule')}</span>
                    <span className={s.specsCard__value}>{program.quickSpecs.schedule}</span>
                  </div>
                )}

                {program.quickSpecs?.ratio && (
                  <div className={s.specsCard__row}>
                    <span className={s.specsCard__label}>{t('programDetail.mentorRatio', 'Mentor Ratio')}</span>
                    <span className={s.specsCard__value}>{program.quickSpecs.ratio}</span>
                  </div>
                )}

                {program.quickSpecs?.kit && (
                  <div className={s.specsCard__row}>
                    <span className={s.specsCard__label}>{t('programDetail.workbooksKit', 'Workbooks / Kit')}</span>
                    <span className={s.specsCard__value}>{program.quickSpecs.kit}</span>
                  </div>
                )}

                {program.quickSpecs?.safety && (
                  <div className={s.specsCard__row}>
                    <span className={s.specsCard__label}>{t('programDetail.safety', 'Campus Safety')}</span>
                    <span className={s.specsCard__value} style={{ color: '#166534' }}>
                      {program.quickSpecs.safety}
                    </span>
                  </div>
                )}

                {program.quickSpecs?.duration && (
                  <div className={s.specsCard__row}>
                    <span className={s.specsCard__label}>{t('programDetail.duration', 'Duration')}</span>
                    <span className={s.specsCard__value}>{program.quickSpecs.duration}</span>
                  </div>
                )}

                <div className={s.specsCard__ctaBox}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<FormOutlined />}
                    onClick={handleApplyClick}
                    style={{
                      backgroundColor: program.accentColor || '#f7941d',
                      borderColor: program.accentColor || '#f7941d',
                      fontWeight: 800,
                      height: 44,
                      borderRadius: 12,
                    }}
                  >
                    {t('programDetail.applyNow', 'Apply for Admission')}
                  </Button>
                  <Button
                    block
                    icon={<PhoneOutlined />}
                    onClick={() => { window.location.href = 'tel:7575008820'; }}
                    style={{ fontWeight: 700, height: 40, borderRadius: 10 }}
                  >
                    {t('programDetail.callCounselor', 'Call Counselor: 7575008820')}
                  </Button>
                </div>
              </div>
              <div>
                {/* Overview & Philosophy */}
                {program.overview && (
                  <div className={s.overviewSection}>
                    <h3 className={s.overviewSection__title}>
                      {t('programDetail.overviewTitle', 'Program Overview & Pedagogical Approach')}
                    </h3>
                    <p className={s.overviewSection__text}>{program.overview}</p>

                    {/* 4 Core Learning Pillars */}
                    {Array.isArray(program.pillars) && program.pillars.length > 0 && (
                      <div>
                        <h4 className={s.overviewSection__subheading}>
                          {t('programDetail.learningDomains', 'Core Learning Domains (NEP 2020 Aligned)')}
                        </h4>
                        <div className="row g-3">
                          {program.pillars.map((pill, idx) => (
                            <div key={idx} className="col-sm-6">
                              <div className={s.pillarCard}>
                                <div className={s.pillarCard__header}>
                                  <div
                                    className={s.pillarCard__number}
                                    style={{ backgroundColor: pill.color || program.accentColor || '#0f172a' }}
                                  >
                                    {pill.number || idx + 1}
                                  </div>
                                  <h5 className={s.pillarCard__title}>{pill.title}</h5>
                                </div>
                                <p className={s.pillarCard__desc}>{pill.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* End of Year Milestones */}
                {Array.isArray(program.milestones) && program.milestones.length > 0 && (
                  <div className={s.milestonesSection}>
                    <h3 className={s.milestonesSection__title}>
                      {t('programDetail.milestonesTitle', 'End-of-Year Developmental Milestones')}
                    </h3>
                    <p className={s.milestonesSection__subtitle}>
                      {t('programDetail.milestonesSubtitle', 'Measurable skill milestones your child achieves before progressing to the next grade.')}
                    </p>

                    <div className={s.milestonesSection__grid}>
                      {program.milestones.map((ms, idx) => (
                        <div key={idx} className={s.milestonesSection__item}>
                          <CheckCircleOutlined style={{ color: '#16a34a', fontSize: 16 }} />
                          <span>{typeof ms === 'string' ? ms : ms.title || ms.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
            {/* Right Column: Pedagogical Overview, Pillars, Curriculum, Milestones, Daily Routine */}
            <div className="col-lg-7 " style={{ width: '100%' }}>
              <div className={s.rightColumn}>

                {/* 4-Term Thematic Curriculum */}
                {Array.isArray(program.curriculum) && program.curriculum.length > 0 && (
                  <div className={s.curriculumSection}>
                    <h3 className={s.curriculumSection__title}>
                      {t('programDetail.curriculumTitle', 'Curriculum Modules & Thematic Terms')}
                    </h3>
                    <p className={s.curriculumSection__subtitle}>
                      {t('programDetail.curriculumSubtitle', 'Structured developmental terms designed for zero-pressure joyful discovery and concept retention.')}
                    </p>

                    <div>
                      {program.curriculum.map((curr, idx) => (
                        <div key={idx} className={s.termRow}>
                          <span
                            className={s.termRow__badge}
                            style={{ backgroundColor: program.accentColor || '#f7941d' }}
                          >
                            Term {idx + 1}
                          </span>
                          <div>
                            <h5 className={s.termRow__step}>{curr.step}</h5>
                            <p className={s.termRow__details}>{curr.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Daily Routine Timeline ("A Joyful Day in Our Classroom") */}
                {Array.isArray(program.dailyRoutine) && program.dailyRoutine.length > 0 && (
                  <div className={s.routineSection}>
                    <h3 className={s.routineSection__title}>
                      {t('programDetail.dailyRoutineTitle', 'A Joyful Day in Our Classroom (Daily Schedule)')}
                    </h3>
                    <p className={s.routineSection__subtitle}>
                      {t('programDetail.dailyRoutineSubtitle', 'Structured daily rhythm balancing sensory discovery, movement, nutrition, and creative rest.')}
                    </p>

                    <div className="row g-3">
                      {program.dailyRoutine.map((rout, idx) => (
                        <div key={idx} className="col-md-6">
                          <div className={s.routineCard}>
                            <div>
                              <span className={s.routineCard__time}>
                                <ClockCircleOutlined /> {rout.time}
                              </span>
                              <h5 className={s.routineCard__title}>{rout.title}</h5>
                              <p className={s.routineCard__desc}>{rout.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>





            </div>

          </div>



        </div>


      </div>
    </div>
  );
}
