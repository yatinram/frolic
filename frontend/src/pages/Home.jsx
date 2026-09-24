import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StarFilled,
  RocketFilled,
  HeartFilled,
  BulbFilled,
  CheckCircleFilled,
  ArrowRightOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PlayCircleFilled,
  SafetyCertificateFilled,
  TrophyFilled,
  TeamOutlined,
  BookFilled,
  SmileFilled,
  CrownFilled,
  ReadOutlined,
  LaptopOutlined,
  GiftFilled,
  CalendarOutlined,
  RiseOutlined,
  FormatPainterFilled,
  CalculatorFilled,
  ShopFilled,
  PictureFilled,
  ExperimentOutlined,
  TranslationOutlined,
  BookOutlined,
  SmileOutlined,
  CalculatorOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import {
  FrolicButton,
  FrolicInput,
  FrolicCard,
  FrolicTag,
  SectionHeader,
  FrolicModal,
  FrolicForm,
} from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { programService } from '../services';
import { PROGRAMS_DATA } from '../constants/programsData';
import s from './Home.module.scss';

// AntD Icon resolver for Home Page Program cards
function renderHomeProgramIcon(iconName) {
  switch (iconName) {
    case 'SmileOutlined':
    case 'SmileFilled':
      return <SmileFilled />;
    case 'BookOutlined':
    case 'BookFilled':
      return <BookFilled />;
    case 'ReadOutlined':
      return <ReadOutlined />;
    case 'RocketOutlined':
    case 'RocketFilled':
      return <RocketFilled />;
    case 'CalculatorOutlined':
    case 'CalculatorFilled':
      return <CalculatorFilled />;
    case 'CrownFilled':
      return <CrownFilled />;
    case 'ExperimentOutlined':
      return <ExperimentOutlined />;
    case 'TranslationOutlined':
      return <TranslationOutlined />;
    case 'SafetyCertificateOutlined':
    case 'SafetyCertificateFilled':
      return <SafetyCertificateFilled />;
    case 'DesktopOutlined':
      return <DesktopOutlined />;
    default:
      return <ReadOutlined />;
  }
}

/* ─────────────────── ANIMATION COUNTER HOOK ─────────────────── */
function useCountUp(target, inView) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [target, inView]);
  return val;
}

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const v = useCountUp(value, inView);
  return (
    <span ref={ref}>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════════════ */
function HeroSection() {
  const { t } = useLanguage();

  const bullets = [
    { icon: <BulbFilled />, color: '#F7941D', text: t('home.hero.bullet1', 'Play-based NEP 2020-aligned curriculum') },
    { icon: <LaptopOutlined />, color: '#2196F3', text: t('home.hero.bullet2', 'Digital Interactive English & Maths Labs') },
    { icon: <GiftFilled />, color: '#4CAF50', text: t('home.hero.bullet3', 'Complete branded learning kit included') },
  ];

  const marqueeItems = [
    { icon: <ShopFilled />, text: t('home.hero.marquee1', 'Play Group – UKG Admissions Open 2025–26') },
    { icon: <LaptopOutlined />, text: t('home.hero.marquee2', 'Digital English Lab | KG to Class 5') },
    { icon: <CalculatorFilled />, text: t('home.hero.marquee3', 'Maths Lab with Manipulatives & AI Tools') },
    { icon: <SafetyCertificateFilled />, text: t('home.hero.marquee4', 'NEP 2020 Aligned Curriculum') },
    { icon: <TrophyFilled />, text: t('home.hero.marquee5', 'Teacher Training Program Enrolling Now') },
  ];

  return (
    <section className={s.heroSection}>
      <div className={s.heroSection__glowOrange} />
      <div className={s.heroSection__glowGreen} />

      <div className="container-xl">
        <div className={`row align-items-center ${s.heroSection__content}`}>
          {/* Left Column */}
          <div className="col-lg-6"style={{display: 'flex', justifyContent: 'center'}}>
            <div className={s.heroSection_maindata}>
            <div className={s.heroSection__tagWrapper}>
              <FrolicTag color="orange" icon={<SafetyCertificateFilled />}>
                {t('home.hero.tag', 'NEP 2020 Aligned Premier School')}
              </FrolicTag>
            </div>

            <h1 className={s.heroSection__title}>
              <span className={s.heroSection__titleGradient}>{t('home.hero.title1', 'Explore, Enrich,')}</span>
              <br />
              <span className={s.heroSection__titleGradient}>{t('home.hero.title2', 'Experience')}</span>
            </h1>

            <p className={s.heroSection__subtitle}>
              {t(
                'home.hero.subtitle',
                "India's premium preschool + Digital English & Maths Lab program. Nurturing curious minds from Play Group through Class 5 with certified educators and cutting-edge technology."
              )}
            </p>

            {/* Bullets */}
            <div className={s.heroSection__bullets}>
              {bullets.map(({ icon, color, text }) => (
                <div key={text} className={s.heroSection__bulletItem}>
                  <span
                    className={s.heroSection__bulletIcon}
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {icon}
                  </span>
                  <span className={s.heroSection__bulletText}>{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className={s.heroSection__actions}>
              <FrolicButton to={ROUTES.ADMISSION} variant="primary" size="lg" icon={<ArrowRightOutlined />}>
                {t('home.hero.enrolBtn', 'Enrol Your Child')}
              </FrolicButton>
              <FrolicButton to={ROUTES.PROGRAMS} variant="secondary" size="lg" icon={<PlayCircleFilled />} iconPosition="left">
                {t('home.hero.exploreBtn', 'Explore Programs')}
              </FrolicButton>
            </div>

            {/* Trust Metrics */}
            <div className={s.heroSection__trustRow}>
              {[
                { num: t('home.hero.metric1Num', '2,500+'), label: t('home.hero.metric1Label', 'Happy Families') },
                { num: t('home.hero.metric2Num', '10+'), label: t('home.hero.metric2Label', 'Years Excellence') },
                { num: t('home.hero.metric3Num', '15+'), label: t('home.hero.metric3Label', 'Centre Network') },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className={s.heroSection__trustNum}>{num}</div>
                  <div className={s.heroSection__trustLabel}>{label}</div>
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Right Column — Image */}
          <div className="col-lg-6">
            <div className={s.heroSection__imageContainer}>
              
              <div className={s.heroSection__imageFrame}>
                <img src="/assets/hero_classroom.png" alt="Frolic Kids Learning" loading="lazy" decoding="async" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className={s.heroSection__marquee}>
        <div className={s.heroSection__marqueeTrack}>
          {[...Array(3)].flatMap(() => marqueeItems).map(({ icon, text }, i) => (
            <span key={i} className={s.heroSection__marqueeItem}>
              {icon} {text} <span className={s.heroSection__marqueeDivider}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — WHY CHOOSE
═══════════════════════════════════════════════════════ */
function WhyChooseSection() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: <BulbFilled />,
      iconColor: '#F7941D',
      iconBg: '#FFF4E5',
      title: t('home.whyChoose.card1Title', 'Play-Based Learning'),
      desc: t('home.whyChoose.card1Desc', 'NEP 2020-aligned curriculum blending structured academics with hands-on joyful exploration at every developmental stage.'),
      bg: 'peach',
    },
    {
      icon: <LaptopOutlined />,
      iconColor: '#2196F3',
      iconBg: '#E8F4FF',
      title: t('home.whyChoose.card2Title', 'Digital Interactive Labs'),
      desc: t('home.whyChoose.card2Desc', 'Dedicated English Phonics Lab and Maths Lab with AI-powered interactive content for KG to Class 5 students.'),
      bg: 'sky',
    },
    {
      icon: <SafetyCertificateFilled />,
      iconColor: '#4CAF50',
      iconBg: '#E8F8EA',
      title: t('home.whyChoose.card3Title', 'Certified Teachers'),
      desc: t('home.whyChoose.card3Desc', 'B.Ed. & Montessori-trained educators with ongoing professional development and certified teacher training programs.'),
      bg: 'mint',
    },
    {
      icon: <GiftFilled />,
      iconColor: '#FF5722',
      iconBg: '#FFF0EC',
      title: t('home.whyChoose.card4Title', 'Complete Learning Kit'),
      desc: t('home.whyChoose.card4Desc', 'Every child receives a full Frolic branded kit — books, uniform, stationery, school bag — zero extra cost to parents.'),
      bg: 'white',
    },
  ];

  return (
    <section className={s.sectionWhite}>
      <div className="container-xl">
        <SectionHeader
          center
          tag={t('home.whyChoose.tag', 'Our Advantages')}
          tagColor="orange"
          tagIcon={<StarFilled style={{ fontSize: 10 }} />}
          title={t('home.whyChoose.title', 'Why Choose Frolic Kids Edu Labs?')}
          subtitle={t('home.whyChoose.subtitle', 'Everything a modern child needs — play, technology, certified educators, and branded learning kits — all under one roof.')}
        />

        <div className="row g-4">
          {cards.map(({ icon, iconColor, iconBg, title, desc, bg }) => (
            <div key={title} className="col-lg-3 col-md-6">
              <FrolicCard
                variant="feature"
                icon={icon}
                iconColor={iconColor}
                iconBg={iconBg}
                title={title}
                description={desc}
                bg={bg}
                hoverable
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className={s.sectionWaveBottom}>
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,24 C320,64 640,-8 960,32 C1200,56 1360,16 1440,28 L1440,64 L0,64 Z" fill="#F8FBF8" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 3 — PROGRAMS / GROWTH STAGE
═══════════════════════════════════════════════════════ */
function ProgramsSection() {
  const { t } = useLanguage();
  const [programs, setPrograms] = useState(PROGRAMS_DATA);
  const [loading, setLoading] = useState(false);

  // Live fetch from backend API with fallback to PROGRAMS_DATA
  useEffect(() => {
    let isMounted = true;
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const res = await programService.getAll({ activeOnly: 'true' });
        const list = res?.data?.data || res?.data || res;
        if (isMounted && Array.isArray(list) && list.length > 0) {
          setPrograms(list);
        }
      } catch (err) {
        console.warn('Fallback to static programs in Home', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrograms();
    return () => {
      isMounted = false;
    };
  }, []);

  // For progression bar, take preschool programs or first 4
  const progressionPrograms = useMemo(() => {
    const preschools = programs.filter((p) => p.category === 'preschool');
    return preschools.length > 0 ? preschools : programs.slice(0, 4);
  }, [programs]);

  return (
    <section className={s.sectionCanvas}>
      <div className="container-xl">
        <SectionHeader
          tag={t('home.programs.tag', 'Our Programs')}
          tagColor="green"
          title={t('home.programs.title', 'Nurturing Every Growth Stage')}
          subtitle={t('home.programs.subtitle', 'From their very first steps into learning to primary school excellence — Frolic is with your child every step of the journey.')}
        />

        {/* Progression Stepper */}
        {progressionPrograms.length > 0 && (
          <div className={s.progressionBar}>
            {progressionPrograms.map((prog, i) => {
              const color = prog.accentColor || '#F7941D';
              const nextColor = progressionPrograms[i + 1]?.accentColor || '#4CAF50';
              return (
                <React.Fragment key={prog.id || prog.slug || i}>
                  <div className={s.progressNode}>
                    <div
                      className={s.progressNode__circle}
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 4px 12px ${color}55`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span className={s.progressNode__label} style={{ color }}>
                      {prog.title || prog.name}
                    </span>
                  </div>
                  {i < progressionPrograms.length - 1 && (
                    <div
                      className={s.progressLine}
                      style={{
                        background: `linear-gradient(90deg, ${color} 0%, ${nextColor} 100%)`,
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Dynamic Program Cards */}
        <div className="row g-4">
          {programs.map((prog) => {
            const title = prog.title || prog.name;
            const age = prog.ageGroup || prog.badgeText;
            const color = prog.accentColor || '#F7941D';
            const desc = prog.shortDescription || prog.tagline;
            const to = `/programs/${prog.slug || prog.id}`;
            const icon = renderHomeProgramIcon(prog.iconType);

            return (
              <div key={prog.id || prog.slug} className="col-lg-4 col-md-6">
                <FrolicCard
                  variant="program"
                  icon={icon}
                  title={title}
                  badge={age}
                  color={color}
                  description={desc}
                  to={to}
                  hoverable
                />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-5">
          <FrolicButton to={ROUTES.PROGRAMS} variant="primary" size="lg" icon={<ArrowRightOutlined />}>
            {t('home.programs.viewAllBtn', 'View All Programs')}
          </FrolicButton>
        </div>
      </div>

      {/* Wave Divider */}
      
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4 — LEARNING KIT
═══════════════════════════════════════════════════════ */
function KitSection() {
  const { t } = useLanguage();

  const items = [
    { icon: <BookFilled />, color: '#F7941D', text: t('home.kit.item1', 'Branded Activity Books & Grade Workbooks') },
    { icon: <GiftFilled />, color: '#4CAF50', text: t('home.kit.item2', 'Frolic Uniform Set — Cap, Apron & Bottle') },
    { icon: <ReadOutlined />, color: '#2196F3', text: t('home.kit.item3', 'Complete Stationery & Art Supply Set') },
    { icon: <ShopFilled />, color: '#9C27B0', text: t('home.kit.item4', 'Ergonomic Frolic Branded School Bag') },
    { icon: <LaptopOutlined />, color: '#F7941D', text: t('home.kit.item5', 'Digital Lab Access Pass & Login Card') },
  ];

  return (
    <section className={s.sectionWhite}>
      <div className="container-xl">
        <div className="row g-5 align-items-center">
          {/* Image Column */}
          <div className="col-lg-6">
            <div className={s.kitImageWrapper}>
              <div className={s.kitImageWrapper__frame}>
                <img src="/assets/learning_kit.png" alt="Frolic Learning Kit" loading="lazy" decoding="async" />
              </div>
             
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-6">
            <FrolicTag color="orange" bg="#FFF4E5">
              <GiftFilled style={{ fontSize: 10 }} /> {t('home.kit.tag', 'FROLIC KITS')}
            </FrolicTag>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#1A2016', margin: '16px 0 12px' }}>
              {t('home.kit.title', 'Every Child Gets a Complete Frolic Learning Kit')}
            </h2>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, color: '#4A5248', lineHeight: 1.75, margin: '0 0 28px', maxWidth: 480 }}>
              {t(
                'home.kit.subtitle',
                'Every Frolic child starts their learning journey fully equipped — no hidden costs, no extra shopping trips. Our complete branded kit is fully included in the admission fee.'
              )}
            </p>

            <div className={s.checkList}>
              {items.map(({ icon, color, text }) => (
                <div key={text} className={s.checkList__item}>
                  <div
                    className={s.checkList__icon}
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {icon}
                  </div>
                  <span className={s.checkList__text}>{text}</span>
                  <CheckCircleFilled style={{ color: '#4CAF50', fontSize: 18, flexShrink: 0 }} />
                </div>
              ))}
            </div>

            <FrolicButton to={ROUTES.ADMISSION} variant="primary" size="lg" icon={<GiftFilled />}>
              {t('home.kit.ctaBtn', 'Enrol & Claim Your Kit')}
            </FrolicButton>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className={s.sectionWaveBottom}>
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,24 C320,64 640,-8 960,32 C1200,56 1360,16 1440,28 L1440,64 L0,64 Z" fill="#F4F8FF" />
        </svg>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════════════
   SECTION 6 — LIFE AT FROLIC
═══════════════════════════════════════════════════════ */
function LifeSection() {
  const { t } = useLanguage();

  const tiles = [
    { icon: <FormatPainterFilled />, color: '#FF5722', bg: '#FFF0EC', label: t('home.life.tile1Title', 'Art & Craft'), desc: t('home.life.tile1Desc', 'Creative expression every day') },
    { icon: <BookFilled />, color: '#F7941D', bg: '#FFF4E5', label: t('home.life.tile2Title', 'Story Time'), desc: t('home.life.tile2Desc', 'Building language & imagination') },
    { icon: <CalculatorFilled />, color: '#2196F3', bg: '#E8F4FF', label: t('home.life.tile3Title', 'Maths Lab'), desc: t('home.life.tile3Desc', 'Hands-on numeracy mastery') },
    { icon: <LaptopOutlined />, color: '#4CAF50', bg: '#E8F8EA', label: t('home.life.tile4Title', 'English Lab'), desc: t('home.life.tile4Desc', 'AI-powered phonics & reading') },
    { icon: <SmileFilled />, color: '#9C27B0', bg: '#F9F0FF', label: t('home.life.tile5Title', 'Outdoor Play'), desc: t('home.life.tile5Desc', 'Physical development & teamwork') },
    { icon: <TrophyFilled />, color: '#FFC107', bg: '#FFFDE7', label: t('home.life.tile6Title', 'Events & Shows'), desc: t('home.life.tile6Desc', 'Annual Day, Sports Day & more') },
  ];

  return (
    <section className={s.sectionCream}>
      <div className="container-xl">
        <SectionHeader
          center
          tag={t('home.life.tag', 'Campus Life')}
          tagColor="coral"
          tagIcon={<PictureFilled style={{ fontSize: 10 }} />}
          title={t('home.life.title', 'A Glimpse into Life at Frolic')}
          subtitle={t('home.life.subtitle', 'Every day is packed with discovery, creativity, friendship, and digital exploration.')}
        />

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-6">
            <div className={s.lifeCollageFrame}>
              <img src="/assets/life_collage.png" alt="Life at Frolic" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              {tiles.map(({ icon, color, bg, label, desc }) => (
                <div key={label} className="col-sm-6">
                  <FrolicCard
                    variant="activity"
                    icon={icon}
                    label={label}
                    description={desc}
                    color={color}
                    iconBg={bg}
                    hoverable
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <FrolicButton to={ROUTES.GALLERY} variant="secondary" size="md" icon={<ArrowRightOutlined />}>
            {t('home.life.galleryBtn', 'View Full Gallery')}
          </FrolicButton>
        </div>
      </div>
    </section>
  );
}

function FranchiseSection() {
  const { t } = useLanguage();

  const stats = [
    { icon: <ShopFilled />, value: 15, suffix: '+', label: t('home.franchise.stat1Label', 'Active Centres'), color: '#F7941D' },
    { icon: <RiseOutlined />, value: 40, suffix: '%', label: t('home.franchise.stat2Label', 'YoY Growth'), color: '#4CAF50' },
    { icon: <CrownFilled />, value: 18, suffix: ' Months', label: t('home.franchise.stat3Label', 'Avg ROI Timeline'), color: '#FFC107' },
    { icon: <TeamOutlined />, value: 100, suffix: '%', label: t('home.franchise.stat4Label', 'Setup Support'), color: '#E91E63' },
  ];

  return (
    <section className={s.franchiseSection}>
      <div className={s.franchiseSection__glowOrange} />
      <div className={s.franchiseSection__glowGreen} />

      <div className="container-xl position-relative">
        <div className={s.franchiseSection__header}>
          <FrolicTag style={{color:"white",backgroundColor:"#f38400a"}}>
            <ShopFilled style={{ fontSize: 10 }} /> {t('home.franchise.tag', 'Franchise Opportunity')}
          </FrolicTag>
          <h2 className={s.franchiseSection__title}>
            {t('home.franchise.titlePart1', 'Become a Frolic Partner — ')}
            <span style={{ color: '#F7941D' }}>{t('home.franchise.titleHighlight', 'Own a High-Growth')}</span>
            <br />
            {t('home.franchise.titlePart2', 'Preschool in Your City')}
          </h2>
          <p className={s.franchiseSection__subtitle}>
            {t(
              'home.franchise.subtitle',
              "Join India's fastest-growing preschool franchise. Low investment, high returns, full operational support, and a brand thousands of parents trust."
            )}
          </p>
        </div>

        <div className="row g-4 mb-5">
          {stats.map(({ icon, value, suffix, label, color }) => (
            <div key={label} className="col-lg-3 col-md-6">
              <div className={s.franchiseSection__statBox}>
                <span style={{ fontSize: 30, color, display: 'block', marginBottom: 10 }}>{icon}</span>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 32, color: '#FFFFFF', lineHeight: 1 }}>
                  <CountUp value={value} suffix={suffix} />
                </div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.60)', marginTop: 6, fontWeight: 600 }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={s.franchiseSection__actions}>
          <FrolicButton to={ROUTES.FRANCHISE} variant="primary" size="lg" icon={<ArrowRightOutlined />}>
            {t('home.franchise.applyBtn', 'Apply for Franchise')}
          </FrolicButton>
          <FrolicButton href="tel:+917575008820" variant="ghost" size="lg" icon={<PhoneOutlined />} iconPosition="left">
            {t('home.franchise.talkBtn', 'Talk to Our Team')}
          </FrolicButton>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 9 — LOCATION
═══════════════════════════════════════════════════════ */
function LocationSection() {
  const { t } = useLanguage();

  const contacts = [
    {
      icon: <EnvironmentOutlined />,
      color: '#4CAF50',
      bg: '#E8F8EA',
      label: t('home.location.addressLabel', 'Our Address'),
      value: t('home.location.addressVal', '109, R Services, Sriprad Aayansh, Sargasan, Gandhinagar, Gujarat — 382421'),
    },
    {
      icon: <PhoneOutlined />,
      color: '#F7941D',
      bg: '#FFF4E5',
      label: t('home.location.phoneLabel', 'Call / WhatsApp'),
      value: t('home.location.phoneVal', '+91 75750 08820'),
      href: 'tel:+917575008820',
    },
    {
      icon: <MailOutlined />,
      color: '#2196F3',
      bg: '#E8F4FF',
      label: t('home.location.emailLabel', 'Email Us'),
      value: t('home.location.emailVal', 'frolickidsedulabs@gmail.com'),
      href: 'mailto:frolickidsedulabs@gmail.com',
    },
    {
      icon: <CalendarOutlined />,
      color: '#9C27B0',
      bg: '#F9F0FF',
      label: t('home.location.hoursLabel', 'Visiting Hours'),
      value: t('home.location.hoursVal', 'Monday – Saturday: 9:00 AM – 5:00 PM'),
    },
  ];

  return (
    <section className={s.sectionCanvas}>
      <div className="container-xl">
        <SectionHeader
          center
          tag={t('home.location.tag', 'Find Us')}
          tagColor="blue"
          tagIcon={<EnvironmentOutlined style={{ fontSize: 10 }} />}
          title={t('home.location.title', 'Visit Our Flagship Campus')}
          subtitle={t('home.location.subtitle', "We'd love to give you a guided tour. Come see why Frolic is Gujarat's most loved preschool.")}
        />

        <div className="row g-4" style={{display:"flex", justifyContent:"center"}}>
          <div style={{width:"50%" ,display:"flex", justifyContent:"center"}}>
            <div className="d-flex flex-column gap-3">
              {contacts.map((c) => (
                <FrolicCard key={c.label} variant="contact" {...c} hoverable />
              ))}

              <div className="d-flex gap-2 flex-wrap mt-2">
                <FrolicButton to={ROUTES.ADMISSION} variant="primary" size="md" icon={<CalendarOutlined />}>
                  {t('home.location.bookVisitBtn', 'Book Free Visit')}
                </FrolicButton>
                <FrolicButton to={ROUTES.CONTACT} variant="secondary" size="md">
                  {t('home.location.sendMsgBtn', 'Send a Message')}
                </FrolicButton>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 10 — FINAL CTA
═══════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════ */
export default function Home() {
  const [adminModal, setAdminModal] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fn = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        setAdminModal(true);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <div className={s.homePage}>
      <HeroSection />
      <WhyChooseSection />
      <ProgramsSection />
      <KitSection />
     
      <LifeSection />
     
      <FranchiseSection />
      <LocationSection />
  

      {/* Admin Login Modal (Ctrl + Shift + L) using FrolicModal & FrolicInput */}
      <FrolicModal
        open={adminModal}
        onCancel={() => setAdminModal(false)}
        title={
          <div className="text-center">
            <CrownFilled style={{ fontSize: 36, color: '#F7941D', display: 'block', margin: '0 auto 10px' }} />
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, color: '#1A2016', margin: 0 }}>
              {t('home.adminModal.title', 'Admin Access')}
            </h3>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: '#7A827A', margin: '6px 0 0' }}>
              {t('home.adminModal.subtitle', 'Frolic Kids Edu Labs Dashboard')}
            </p>
          </div>
        }
      >
        <AdminForm onClose={() => setAdminModal(false)} />
      </FrolicModal>
    </div>
  );
}

/* ─── Admin Login Form using FrolicInput & FrolicButton ─── */
function AdminForm({ onClose }) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('frolic_admin_token', data.token);
        onClose();
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.message || t('home.adminModal.invalidCreds', 'Invalid credentials'));
      }
    } catch {
      setError(t('home.adminModal.connError', 'Connection error. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <FrolicForm onFinish={handleLogin}>
      <FrolicInput
        type="text"
        label={t('home.adminModal.usernameLabel', 'Username')}
        placeholder={t('home.adminModal.usernamePlaceholder', 'Enter admin username')}
        value={username}
        onChange={setUsername}
        required
      />
      <FrolicInput
        type="password"
        label={t('home.adminModal.passwordLabel', 'Password')}
        placeholder={t('home.adminModal.passwordPlaceholder', 'Enter password')}
        value={password}
        onChange={setPassword}
        error={error}
        required
      />
      <FrolicButton
        htmlType="submit"
        variant="primary"
        size="lg"
        block
        loading={loading}
        className="mt-2 mb-2"
      >
        {t('home.adminModal.signInBtn', 'Sign In to Dashboard')}
      </FrolicButton>
      <FrolicButton
        variant="link"
        size="md"
        block
        onClick={onClose}
      >
        {t('home.adminModal.cancelBtn', 'Cancel')}
      </FrolicButton>
    </FrolicForm>
  );
}
