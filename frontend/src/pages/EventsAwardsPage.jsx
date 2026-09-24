import React, { useState, useEffect } from 'react';
import {
  CalendarOutlined,
  TrophyOutlined,
  StarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { Spin } from 'antd';
import { FrolicTag } from '../components/ui';
import { eventService, awardService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import WaveDivider from '../components/common/WaveDivider';
import s from './EventsAwardsPage.module.scss';

const DEFAULT_EVENTS = [
  {
    id: 1,
    title: 'Annual Grand Sports Carnival & Little Olympics 2026',
    category: 'Sports & Wellness',
    tagColor: 'green',
    date: '28th February',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop',
    time: '9:00 AM – 1:00 PM',
    location: 'Frolic Flagship Arena, Gandhinagar Campus',
    description:
      'A cheerful day celebrating gross motor skills, teamwork, hurdles, toddler relay races, and parent-child cheer fun!',
  },
  {
    id: 2,
    title: 'STEM & Phonics Discovery Fair 2026',
    category: 'Academic Discovery',
    tagColor: 'blue',
    date: '15th March',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
    time: '10:00 AM – 3:30 PM',
    location: 'All Frolic Centers Across Gujarat',
    description:
      'Interactive live showcases where students present DIEL phoneme theater, abacus speed challenges, and sensory science experiments.',
  },
  {
    id: 3,
    title: 'Little Picasso Annual Art Gala & Craft Expo',
    category: 'Creative Arts',
    tagColor: 'orange',
    date: '14th December',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop',
    time: '11:00 AM – 4:00 PM',
    location: 'Frolic Center Auditorium, Ahmedabad',
    description:
      'Over 200 handmade canvases, clay sculptures, and recycled art installations created entirely by our budding toddler artists.',
  },
  {
    id: 4,
    title: 'Parent-Teacher Pedagogy Workshop: NEP 2020 Readiness',
    category: 'Parent Workshop',
    tagColor: 'purple',
    date: '5th November',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop',
    time: '4:00 PM – 6:30 PM',
    location: 'Virtual Webinar & On-Campus Live Stream',
    description:
      'Keynote session by senior educators on nurturing early literacy, mindful parenting, and balanced digital screen engagement.',
  },
];

const DEFAULT_AWARDS = [
  {
    id: 1,
    iconType: 'Trophy',
    title: 'Best Innovative Preschool Curriculum in Gujarat',
    org: 'National Early Childhood Education Summit (NECE)',
    year: '2025',
    description:
      'Honoured for pioneering the Digital Interactive English Lab (DIEL) and integrated physical-mental abacus maths system.',
  },
  {
    id: 2,
    iconType: 'Star',
    title: 'Excellence in NEP 2020 & NCF 2023 Alignment',
    org: 'All India Progressive School Leadership Conclave',
    year: '2024',
    description:
      'Recognised for our 12-Module Teacher Mentoring Framework designed by Gaurang Oza and experiential multi-sensory classrooms.',
  },
  {
    id: 3,
    iconType: 'Heart',
    title: "Parents' Choice Award: Safest & Most Caring Preschool",
    org: 'Gujarat Parent Community Choice Survey',
    year: '2024',
    description:
      'Awarded top score across 1,000+ participating parents for campus hygiene, CCTV transparency, and nurturing environment.',
  },
  {
    id: 4,
    iconType: 'ShieldCheck',
    title: 'Top Emerging Early Education Franchise Brand',
    org: 'Indian Franchise & Educational Business Awards',
    year: '2023',
    description:
      'Celebrated for structured center onboarding, standard operating excellence, and exceptional franchise return-on-investment.',
  },
];

const renderAwardIcon = (type) => {
  switch (type) {
    case 'Star':
      return <StarOutlined style={{ fontSize: 32 }} />;
    case 'Heart':
      return <HeartOutlined style={{ fontSize: 32 }} />;
    case 'ShieldCheck':
      return <SafetyCertificateOutlined style={{ fontSize: 32 }} />;
    case 'Medal':
      return <CrownOutlined style={{ fontSize: 32 }} />;
    default:
      return <TrophyOutlined style={{ fontSize: 32 }} />;
  }
};

export default function EventsAwardsPage() {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [awards, setAwards] = useState(DEFAULT_AWARDS);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsRes, awardsRes] = await Promise.allSettled([
        eventService.getAll(),
        awardService.getAll(),
      ]);

      if (eventsRes.status === 'fulfilled' && eventsRes.value?.data?.data?.length > 0) {
        setEvents(eventsRes.value.data.data);
      } else {
        setEvents(DEFAULT_EVENTS);
      }

      if (awardsRes.status === 'fulfilled' && awardsRes.value?.data?.data?.length > 0) {
        setAwards(awardsRes.value.data.data);
      } else {
        setAwards(DEFAULT_AWARDS);
      }
    } catch {
      setEvents(DEFAULT_EVENTS);
      setAwards(DEFAULT_AWARDS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.eventsPage}>
      <style>{`
        @keyframes floatBounceEvents {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-14px) rotate(6deg); }
          66%       { transform: translateY(-6px) rotate(-3deg); }
        }
      `}</style>

      {/* ── Banner ── */}
      <section className={s.banner}>
        {/* Dot texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Floating emojis */}
        {['🏆', '🎉', '✨', '⭐', '🏅', '🎨', '🎪', '🌟'].map((e, i) => (
          <span key={i} aria-hidden="true" style={{
            position: 'absolute',
            fontSize: i % 2 === 0 ? '2.2rem' : '1.6rem',
            opacity: 0.15,
            top: `${[10, 20, 55, 65, 30, 40, 75, 8][i]}%`,
            left: i < 4 ? `${[6, 88, 4, 90][i]}%` : undefined,
            right: i >= 4 ? `${[14, 10, 20, 38][i - 4]}%` : undefined,
            animation: `floatBounceEvents ${5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>{e}</span>
        ))}

        <div className="container-xl position-relative" style={{ zIndex: 2, paddingBottom: 40 }}>
          <span className={s.banner__tag}>
            <StarOutlined style={{ fontSize: 14 }} /> {t('eventsAwards.tag', 'Campus Life, Celebrations & Honours')}
          </span>
          <h1 className={s.banner__title}>{t('eventsAwards.title', 'Events & Accolades')}</h1>
          <p className={s.banner__desc}>
            {t('eventsAwards.desc', 'Discover our vibrant campus events, festive workshops, educational discovery fairs, and prestigious recognitions earned across Gujarat.')}
          </p>
        </div>

        {/* Wave bottom — green/orange → cream */}
        <WaveDivider
          variant="wave2"
          topColor="transparent"
          bottomColor="#FFF8EF"
          height={60}
        />
      </section>

      {/* ── Tab Switcher ── */}
      <div className="container-xl">
        <div className={s.tabBar}>
          <button
            className={`${s.tabBtn} ${activeTab === 'events' ? s['tabBtn--active'] : ''}`}
            onClick={() => setActiveTab('events')}
          >
            {t('eventsAwards.upcomingEvents', '📅 Upcoming Events & Workshops')}
          </button>
          <button
            className={`${s.tabBtn} ${activeTab === 'awards' ? s['tabBtn--active'] : ''}`}
            onClick={() => setActiveTab('awards')}
          >
            {t('eventsAwards.awardsAccolades', '🏆 Awards & Recognition')}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spin size="large" />
            <p className="mt-3 text-muted">{t('common.loading', 'Loading...')}</p>
          </div>
        ) : (
          <>
            {/* ── Tab 1: Events Grid ── */}
            {activeTab === 'events' && (
              <div className="row g-4">
                {events.map((ev) => (
                  <div key={ev.id || ev.slug} className="col-lg-6">
                    <div className={s.eventCard}>
                      <div className={s.eventCard__imageWrapper}>
                        <img src={ev.image} alt={ev.title} />
                        <div className={s.eventCard__dateBadge}>
                          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '15px', color: '#F7941D', lineHeight: 1 }}>
                            {ev.date}
                          </div>
                          <div style={{ fontSize: '11px', color: '#7A827A', fontWeight: 700 }}>
                            {ev.year}
                          </div>
                        </div>
                      </div>

                      <div className={s.eventCard__content}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <FrolicTag color={ev.tagColor || 'orange'} size="sm">
                            {ev.category}
                          </FrolicTag>
                          <span style={{ fontSize: '12px', color: '#7A827A', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <ClockCircleOutlined style={{ fontSize: 12 }} /> {ev.time}
                          </span>
                        </div>
                        <h3 className={s.eventCard__title}>{ev.title}</h3>
                        <p className={s.eventCard__desc}>{ev.description}</p>
                        <div className={s.eventCard__location}>
                          <EnvironmentOutlined style={{ fontSize: 14, color: '#F7941D' }} />
                          <span>{ev.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Tab 2: Awards Grid ── */}
            {activeTab === 'awards' && (
              <div className="row g-4">
                {awards.map((aw) => (
                  <div key={aw.id} className="col-lg-6">
                    <div className={s.awardCard}>
                      <div className={s.awardCard__iconCircle}>
                        {renderAwardIcon(aw.iconType)}
                      </div>
                      <FrolicTag color="orange" size="sm" style={{ marginBottom: 10 }}>
                        {aw.year}
                      </FrolicTag>
                      <h3 className={s.awardCard__title}>{aw.title}</h3>
                      <div className={s.awardCard__org}>{aw.org}</div>
                      <p className={s.awardCard__desc}>{aw.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
