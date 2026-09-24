import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOutlined,
  StarFilled,
  SmileOutlined,
  CompassOutlined,
  SearchOutlined,
  BulbOutlined,
  MessageOutlined,
  AppstoreOutlined,
  RiseOutlined,
  RocketOutlined,
  TabletOutlined,
  AimOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  TrophyOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  EnvironmentOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import { FrolicButton, FrolicTag } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import s from './About.module.scss';

export default function About() {
  const { t } = useLanguage();

  /* ────────────────────────────────────────────────────────
     01 — ABOUT HERO
  ──────────────────────────────────────────────────────── */
  const renderHero = () => (
    <section className={s.hero}>
      <div className={s.hero__shapeTopRight} />
      <div className={s.hero__shapeBottomLeft} />

      <div className={s.container}>
        <div className="row align-items-center g-5">
          {/* Left Content */}
          <div className="col-lg-6">
            <div className={s.hero__tagWrapper}>
              <FrolicTag color="orange" size="md" icon={<StarFilled style={{ fontSize: 12 }} />}>
                {t('about.tag', '⭐ About Frolic Kids Edu Labs')}
              </FrolicTag>
            </div>

            <h1 className={s.hero__heading}>
              {t('about.title', 'Inspiring Curiosity, Confidence & Character')}
            </h1>

            <div className={s.hero__philosophyBadge}>
              <StarFilled style={{ fontSize: 13, color: '#F7941D' }} /> {t('common.tagline', 'Explore • Express • Experience')}
            </div>

            <p className={s.hero__subtext}>
              {t(
                'about.desc',
                'Founded on the principles of child-centric experiential learning and backed by Manovikas Mulyankan Sanstha pedagogy.'
              )}
            </p>

            <div className={s.hero__actions}>
              <FrolicButton
                to={ROUTES.PROGRAMS}
                variant="primary"
                size="lg"
                icon={<ArrowRightOutlined />}
              >
                {t('nav.programs', 'Explore Programs')}
              </FrolicButton>
              <FrolicButton
                to={ROUTES.LOCATE_US}
                variant="secondary"
                size="lg"
                icon={<EnvironmentOutlined />}
                iconPosition="left"
              >
                {t('nav.locateUs', 'Find a Centre')}
              </FrolicButton>
            </div>
          </div>

          {/* Right Visual */}
          <div className="col-lg-6">
            <div className={s.hero__visualWrapper}>
              <div className={s.hero__imageCard}>
                <img
                  src="/assets/hero_classroom.png"
                  alt="Happy children learning in Frolic classroom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  /* ────────────────────────────────────────────────────────
     02 — WHO WE ARE
  ──────────────────────────────────────────────────────── */
  const renderWhoWeAre = () => {
    const pillars = [
      {
        icon: <BookOutlined style={{ fontSize: 28, color: '#F7941D' }} />,
        bg: '#FFF4E5',
        title: t('about.pillar1', 'Play & Experiential Learning'),
        text: t('about.pillar1Desc', 'Hands-on discovery through sensory games, blocks, and tactile explorations.'),
      },
      {
        icon: <ExperimentOutlined style={{ fontSize: 28, color: '#2196F3' }} />,
        bg: '#E8F4FF',
        title: t('about.pillar2', 'Digital Phonics & Math Labs'),
        text: t('about.pillar2Desc', 'Early linguistic fluency and numerical visualization using proprietary interactive tech.'),
      },
      {
        icon: <SmileOutlined style={{ fontSize: 28, color: '#4CAF50' }} />,
        bg: '#E8F8EA',
        title: t('about.pillar3', 'Emotional & Social Intelligence'),
        text: t('about.pillar3Desc', 'Nurturing empathy, sharing habits, positive self-esteem, and group collaboration.'),
      },
    ];

    return (
      <section className={s.whoWeAre}>
        <div className={s.container}>
          <div className={s.whoWeAre__header}>
            <h2 className={s.whoWeAre__title}>{t('about.approachTitle', 'Our 4-Pillar Pedagogical Framework')}</h2>
            <p className={s.whoWeAre__lead}>
              {t('about.visionDesc', 'To provide a stimulating learning environment where every child feels valued, capable, and excited to explore the world.')}
            </p>
            <p className={s.whoWeAre__sublead}>
              {t('about.missionDesc', 'Bridging foundational early education with interactive multi-sensory labs that prepare young learners for lifelong success.')}
            </p>
          </div>

          <div className="row g-4">
            {pillars.map(({ icon, bg, title, text }) => (
              <div key={title} className="col-lg-4 col-md-6">
                <div className={s.whoWeAre__card}>
                  <div className={s.whoWeAre__iconSquircle} style={{ backgroundColor: bg }}>
                    {icon}
                  </div>
                  <h3 className={s.whoWeAre__cardTitle}>{title}</h3>
                  <p className={s.whoWeAre__cardText}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  /* ────────────────────────────────────────────────────────
     03 — OUR PHILOSOPHY
  ──────────────────────────────────────────────────────── */
  const renderPhilosophy = () => {
    const steps = [
      {
        num: '01',
        title: 'CURIOUS',
        desc: 'Ask and wonder.',
        icon: <CompassOutlined style={{ fontSize: 22 }} />,
        bg: '#F7941D',
      },
      {
        num: '02',
        title: 'EXPLORE',
        desc: 'Discover new ideas.',
        icon: <SearchOutlined style={{ fontSize: 22 }} />,
        bg: '#FF8C00',
      },
      {
        num: '03',
        title: 'DISCOVER',
        desc: 'Find new possibilities.',
        icon: <BulbOutlined style={{ fontSize: 22 }} />,
        bg: '#2196F3',
      },
      {
        num: '04',
        title: 'EXPRESS',
        desc: 'Share thoughts and ideas.',
        icon: <MessageOutlined style={{ fontSize: 22 }} />,
        bg: '#9C27B0',
      },
      {
        num: '05',
        title: 'EXPERIENCE',
        desc: 'Learn by doing.',
        icon: <AppstoreOutlined style={{ fontSize: 22 }} />,
        bg: '#4CAF50',
      },
      {
        num: '06',
        title: 'GROW',
        desc: 'Build confidence.',
        icon: <RiseOutlined style={{ fontSize: 22 }} />,
        bg: '#2E7D32',
      },
    ];

    return (
      <section className={s.philosophy}>
        <div className={s.container}>
          <div className={s.philosophy__header}>
            <div className={s.philosophy__tag}>
              <FrolicTag color="green" size="md" icon={<SafetyCertificateOutlined style={{ fontSize: 13 }} />}>
                {t('common.tagline', 'Our Philosophy')}
              </FrolicTag>
            </div>
            <h2 className={s.philosophy__statement}>{t('common.tagline', 'Explore • Express • Experience')}</h2>
            <p className={s.philosophy__supportingText}>
              {t('home.hero.subtitle', 'We believe children should have the freedom to explore ideas, express themselves and experience learning without the fear of making mistakes.')}
            </p>
          </div>

          <div className={s.philosophy__journeyGrid}>
            {steps.map(({ num, title, desc, icon, bg }) => (
              <div key={title} className={s.philosophy__journeyStep}>
                <span className={s.philosophy__stepNumber}>{num}</span>
                <div className={s.philosophy__stepIcon} style={{ backgroundColor: bg }}>
                  {icon}
                </div>
                <h4 className={s.philosophy__stepTitle}>{title}</h4>
                <p className={s.philosophy__stepDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  /* ────────────────────────────────────────────────────────
     04 — WHAT MAKES FROLIC DIFFERENT
  ──────────────────────────────────────────────────────── */
  const renderDifference = () => {
    const differences = [
      {
        icon: <RocketOutlined style={{ fontSize: 24, color: '#F7941D' }} />,
        bg: '#FFF4E5',
        title: t('home.whyChoose.card1Title', 'Interactive Learning'),
        desc: t('home.whyChoose.card1Desc', 'Children actively participate instead of only memorising.'),
      },
      {
        icon: <BulbOutlined style={{ fontSize: 24, color: '#2196F3' }} />,
        bg: '#E8F4FF',
        title: t('home.whyChoose.card2Title', 'Digital Interactive Labs'),
        desc: t('home.whyChoose.card2Desc', 'Activities encourage children to think, solve and discover.'),
      },
      {
        icon: <ReadOutlined style={{ fontSize: 24, color: '#9C27B0' }} />,
        bg: '#F9F0FF',
        title: t('nav.englishLab', 'Communication & Phonics'),
        desc: 'Listening, speaking, reading and writing develop progressively through 44 phonemes.',
      },
      {
        icon: <TabletOutlined style={{ fontSize: 24, color: '#4CAF50' }} />,
        bg: '#E8F8EA',
        title: t('nav.mathsLab', 'Maths & Mental Abacus'),
        desc: 'Visual bead calculations and concrete manipulatives make math joyful.',
      },
      {
        icon: <AimOutlined style={{ fontSize: 24, color: '#FF5722' }} />,
        bg: '#FFF0EC',
        title: t('home.whyChoose.card4Title', 'Complete Learning Kit'),
        desc: t('home.whyChoose.card4Desc', 'Every child receives a full branded kit with zero hidden costs.'),
      },
      {
        icon: <TeamOutlined style={{ fontSize: 24, color: '#FFC107' }} />,
        bg: '#FFFDE7',
        title: t('home.whyChoose.card3Title', 'Certified Educators'),
        desc: t('home.whyChoose.card3Desc', 'B.Ed & Montessori certified educators trained with international pedagogy.'),
      },
    ];

    return (
      <section className={s.difference}>
        <div className={s.container}>
          <div className={s.difference__header}>
            <h2 className={s.difference__title}>{t('home.whyChoose.title', 'Why Choose Frolic Kids Edu Labs?')}</h2>
            <p className={s.difference__subtitle}>
              {t('home.whyChoose.subtitle', 'Interactive learning that encourages children to participate, explore, practise and think.')}
            </p>
          </div>

          <div className="row g-4">
            {differences.map(({ icon, bg, title, desc }) => (
              <div key={title} className="col-lg-4 col-md-6">
                <div className={s.difference__card}>
                  <div className={s.difference__iconRow}>
                    <div className={s.difference__iconContainer} style={{ backgroundColor: bg }}>
                      {icon}
                    </div>
                    <ArrowRightOutlined className={s.difference__arrowIcon} style={{ fontSize: 16 }} />
                  </div>
                  <h3 className={s.difference__cardTitle}>{title}</h3>
                  <p className={s.difference__cardDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  /* ────────────────────────────────────────────────────────
     05 — OUR LEARNING LABS
  ──────────────────────────────────────────────────────── */
  const renderLearningLabs = () => (
    <section className={s.learningLabs}>
      <div className={s.container}>
        <div className={s.learningLabs__header}>
          <h2 className={s.learningLabs__title}>{t('nav.learningLabs', 'Specialized Learning Labs')}</h2>
          <p className={s.learningLabs__subtitle}>
            {t('home.hero.subtitle', 'Explore Frolic interactive learning experiences.')}
          </p>
        </div>

        <div className="row g-4">
          {/* Card 01: English Lab */}
          <div className="col-lg-6">
            <div className={s.learningLabs__labCard}>
              <div className={s.learningLabs__topHeader}>
                <FrolicTag color="blue" size="md">
                  Nursery → Class 2
                </FrolicTag>
                <ReadOutlined style={{ fontSize: 24, color: '#2196F3' }} />
              </div>

              <h3 className={s.learningLabs__labTitle}>{t('nav.digitalEnglishLab', 'Digital English Lab (D.I.E.L.)')}</h3>

              <p className={s.learningLabs__labDesc}>
                {t('home.programs.step5Desc', 'AI-powered phonics, vocabulary, reading comprehension, and spoken English in an immersive digital lab.')}
              </p>

              <div className={s.learningLabs__pillContainer}>
                {['44 Phonemes', 'EVS + GK', 'Interactive Stories', 'Pronunciation Drills'].map((p) => (
                  <span key={p} className={s.learningLabs__featurePill}>
                    <CheckCircleOutlined style={{ fontSize: 12, color: '#2196F3' }} /> {p}
                  </span>
                ))}
              </div>

              <div className={s.learningLabs__statsGrid}>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal}>8,000+</div>
                  <div className={s.learningLabs__statLabel}>Words Library</div>
                </div>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal}>150+</div>
                  <div className={s.learningLabs__statLabel}>Interactive Stories</div>
                </div>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal}>25,000+</div>
                  <div className={s.learningLabs__statLabel}>Audio Drills</div>
                </div>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal}>18</div>
                  <div className={s.learningLabs__statLabel}>Pabulum Workbooks</div>
                </div>
              </div>

              <div className={s.learningLabs__footerAction}>
                <FrolicButton
                  to={ROUTES.ENGLISH_LAB}
                  variant="primary"
                  size="md"
                  block
                  icon={<ArrowRightOutlined />}
                >
                  {t('common.learnMore', 'Explore English Lab')}
                </FrolicButton>
              </div>
            </div>
          </div>

          {/* Card 02: Maths Lab */}
          <div className="col-lg-6">
            <div className={s.learningLabs__labCard}>
              <div className={s.learningLabs__topHeader}>
                <FrolicTag color="green" size="md">
                  KG → Class 5
                </FrolicTag>
                <ExperimentOutlined style={{ fontSize: 24, color: '#4CAF50' }} />
              </div>

              <h3 className={s.learningLabs__labTitle}>{t('nav.mathsLab', 'Dual-Brain Maths Lab (Abacus)')}</h3>

              <p className={s.learningLabs__labDesc}>
                {t('home.programs.step6Desc', 'Interactive manipulatives, visual problem-solving, and concept mastery through discovery-based maths.')}
              </p>

              <div className={s.learningLabs__pillContainer}>
                {['17-Rod Abacus', 'Speed Math', 'Mental Visualization', 'Dual-Brain Stimulation'].map((p) => (
                  <span key={p} className={s.learningLabs__featurePill}>
                    <CheckCircleOutlined style={{ fontSize: 12, color: '#4CAF50' }} /> {p}
                  </span>
                ))}
              </div>

              <div className={s.learningLabs__statsGrid}>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal} style={{ color: '#4CAF50' }}>
                    17-Rod
                  </div>
                  <div className={s.learningLabs__statLabel}>Soroban Abacus</div>
                </div>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal} style={{ color: '#4CAF50' }}>
                    3 Echelons
                  </div>
                  <div className={s.learningLabs__statLabel}>Graded Roadmap</div>
                </div>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal} style={{ color: '#4CAF50' }}>
                    Visual
                  </div>
                  <div className={s.learningLabs__statLabel}>Spatial Thinking</div>
                </div>
                <div className={s.learningLabs__statItem}>
                  <div className={s.learningLabs__statVal} style={{ color: '#4CAF50' }}>
                    100%
                  </div>
                  <div className={s.learningLabs__statLabel}>Math Confidence</div>
                </div>
              </div>

              <div className={s.learningLabs__footerAction}>
                <FrolicButton
                  to={ROUTES.MATHS_LAB}
                  variant="green"
                  size="md"
                  block
                  icon={<ArrowRightOutlined />}
                >
                  {t('common.learnMore', 'Explore Maths Lab')}
                </FrolicButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  /* ────────────────────────────────────────────────────────
     06 — OUR TEACHERS
  ──────────────────────────────────────────────────────── */
  const renderTeachers = () => {
    const teacherItems = [
      { num: '01', title: t('home.educators.cert1Title', 'Teaching Strategies') },
      { num: '02', title: t('home.educators.cert3Title', 'Child Psychology') },
      { num: '03', title: t('home.educators.cert2Title', 'Classroom Management') },
      { num: '04', title: t('home.educators.cert4Title', 'Child-Centred Assessment') },
    ];

    return (
      <section className={s.teachers}>
        <div className={s.container}>
          <div className="row g-5 align-items-center">
            {/* Left: Illustration */}
            <div className="col-lg-6">
              <div className={s.teachers__imageContainer}>
                <img
                  src="/assets/teacher_kids.png"
                  alt="Certified Frolic teacher engaging with students"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className={`col-lg-6 ${s.teachers__content}`}>
              <div className={s.teachers__label}>
                <FrolicTag color="orange" size="md">
                  {t('home.educators.tag', 'OUR TEACHERS')}
                </FrolicTag>
              </div>

              <h2 className={s.teachers__title}>{t('home.educators.title', 'Passionate Educators, Certified Excellence')}</h2>

              <p className={s.teachers__lead}>
                {t('home.educators.subtitle', 'Every Frolic educator is handpicked for their passion for early childhood development and commitment to continuous professional growth.')}
              </p>

              <div className={s.teachers__grid}>
                {teacherItems.map(({ num, title }) => (
                  <div key={title} className={s.teachers__item}>
                    <div className={s.teachers__itemNumber}>{num}</div>
                    <div className={s.teachers__itemName}>{title}</div>
                  </div>
                ))}
              </div>

              <p className={s.teachers__supportLine}>
                {t('home.educators.quote', '"A great teacher doesn\'t just teach — they ignite curiosity, nurture confidence, and plant seeds of lifelong learning."')}
              </p>

              <div>
                <FrolicButton
                  to={ROUTES.TEACHER_TRAINING}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRightOutlined />}
                >
                  {t('home.educators.ctaBtn', 'Teacher Training Program')}
                </FrolicButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* ────────────────────────────────────────────────────────
     07 — EDUCATIONAL EXPERTISE
  ──────────────────────────────────────────────────────── */
  const renderExpertise = () => (
    <section className={s.expertise}>
      <div className={s.container}>
        <div className={s.expertise__header}>
          <h3 className={s.expertise__title}>{t('about.founderTitle', 'Message from Curriculum Architect — Gaurang Oza')}</h3>
          <p className={s.expertise__text}>
            {t('about.founderRole', 'Founder & Early Childhood Pedagogy Director')}
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className={s.expertise__card}>
              <div className={s.expertise__icon}>
                <TrophyOutlined style={{ fontSize: 24, color: '#F7941D' }} />
              </div>
              <div>
                <h4 className={s.expertise__cardName}>Manovikas Mulyankan Sanstha</h4>
                <p className={s.expertise__cardDesc}>
                  {t('about.desc', 'Pedagogical collaboration supporting educational assessment and early learning frameworks.')}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-6">
            <div className={s.expertise__card}>
              <div className={s.expertise__icon} style={{ background: 'rgba(33, 150, 243, 0.12)', color: '#2196F3' }}>
                <FileTextOutlined style={{ fontSize: 24 }} />
              </div>
              <div>
                <h4 className={s.expertise__cardName}>Pabulum Eduhub / Pabulum English Lab</h4>
                <p className={s.expertise__cardDesc}>
                  Interactive English curriculum, phonics methodology and structured workbook frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  /* ────────────────────────────────────────────────────────
     08 — PARENT + FRANCHISE SPLIT CTA
  ──────────────────────────────────────────────────────── */
  const renderSplitCTA = () => (
    <section className={s.splitCTA}>
      <div className={s.container}>
        <div className="row g-4">
          {/* For Parents */}
          <div className="col-lg-6">
            <div className={`${s.splitCTA__card} ${s['splitCTA__card--parent']}`}>
              <div>
                <div className={s.splitCTA__badge}>
                  <FrolicTag color="orange" size="md">
                    {t('footer.forParents', 'For Parents')}
                  </FrolicTag>
                </div>
                <h3 className={s.splitCTA__cardTitle}>
                  {t('admissionPage.title', 'A Joyful Learning Journey for Every Child')}
                </h3>
                <p className={s.splitCTA__cardText}>
                  {t('admissionPage.subtitle', 'Explore our programs and discover the right learning experience for your child.')}
                </p>
              </div>
              <div>
                <FrolicButton
                  to={ROUTES.ADMISSION}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRightOutlined />}
                >
                  {t('common.enrolNow', 'Apply for Admission')}
                </FrolicButton>
              </div>
            </div>
          </div>

          {/* For Partners */}
          <div className="col-lg-6">
            <div className={`${s.splitCTA__card} ${s['splitCTA__card--partner']}`}>
              <div>
                <div className={s.splitCTA__badge}>
                  <FrolicTag color="green" size="md">
                    {t('footer.partnersHeading', 'For Partners')}
                  </FrolicTag>
                </div>
                <h3 className={s.splitCTA__cardTitle}>{t('franchisePage.title', 'Bring Frolic to Your City')}</h3>
                <p className={s.splitCTA__cardText}>
                  {t('franchisePage.subtitle', 'Create a joyful learning space for children with Frolic.')}
                </p>
              </div>
              <div>
                <FrolicButton
                  to={ROUTES.FRANCHISE}
                  variant="green"
                  size="lg"
                  icon={<ArrowRightOutlined />}
                >
                  {t('franchisePage.applyTitle', 'Become a Frolic Partner')}
                </FrolicButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className={s.aboutPage}>
      {renderHero()}
      {renderWhoWeAre()}
      {renderPhilosophy()}
      {renderDifference()}
      {renderLearningLabs()}
      {renderTeachers()}
      {renderExpertise()}
      {renderSplitCTA()}
    </div>
  );
}
