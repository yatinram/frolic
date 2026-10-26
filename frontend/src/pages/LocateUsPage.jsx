import React, { useState, useEffect, useMemo } from 'react';
import { Select, Input, Empty, Spin } from 'antd';
import {
  EnvironmentOutlined,
  BankOutlined,
  CompassOutlined,
  CalendarOutlined,
  StarOutlined,
  SearchOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  BookOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import { centerService } from '../services';
import { FrolicButton, FrolicTag } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import WaveDivider from '../components/common/WaveDivider';
import s from './LocateUsPage.module.scss';

export default function LocateUsPage() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  // Load data directly from backend database API
  useEffect(() => {
    setLoading(true);
    centerService
      .getAll()
      .then((res) => {
        const data = res?.data?.data || res?.data || [];
        if (Array.isArray(data)) {
          setCenters(data);
        } else {
          setCenters([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load centers from database:', err);
        setCenters([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  // Reset all filters to default
  const resetFilters = () => {
    
    setSearchQuery('');
  };

  const filteredCenters = useMemo(() => {
    return centers.filter((center) => {
     
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = center.name?.toLowerCase().includes(q);
        const matchesArea = center.area?.toLowerCase().includes(q);
        const matchesCity = center.city?.toLowerCase().includes(q);
        const matchesDistrict = center.district?.toLowerCase().includes(q);
        const matchesTaluka = center.taluka?.toLowerCase().includes(q);
        const matchesState = center.state?.toLowerCase().includes(q);
        const matchesPin = center.pincode?.includes(q);
        const matchesAddress = center.address?.toLowerCase().includes(q);
        const matchesPrograms = Array.isArray(center.programs)
          ? center.programs.some((p) => p.toLowerCase().includes(q))
          : false;

        return (
          matchesName ||
          matchesArea ||
          matchesCity ||
          matchesDistrict ||
          matchesTaluka ||
          matchesState ||
          matchesPin ||
          matchesAddress ||
          matchesPrograms
        );
      }
      return true;
    });
  }, [centers,searchQuery]);

  return (
    <div className={s.locatePage}>
      <style>{`
        @keyframes floatBounceLocate {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-14px) rotate(6deg); }
          66%       { transform: translateY(-6px) rotate(-3deg); }
        }
      `}</style>

      {/* ── 1. Hero Banner ── */}
      <section className={s.banner}>
        <div className={s.banner__glowOrange} />
        <div className={s.banner__glowGreen} />

        {/* Dot texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Floating emojis */}
        {['📍', '🏫', '🗺️', '✨', '🏢', '🧭', '🌟', '🎒'].map((e, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              fontSize: i % 2 === 0 ? '2.2rem' : '1.6rem',
              opacity: 0.15,
              top: `${[10, 20, 55, 65, 30, 40, 75, 8][i]}%`,
              left: i < 4 ? `${[6, 88, 4, 90][i]}%` : undefined,
              right: i >= 4 ? `${[14, 10, 20, 38][i - 4]}%` : undefined,
              animation: `floatBounceLocate ${5 + i * 0.6}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {e}
          </span>
        ))}

        <div className="container-xl position-relative" style={{ zIndex: 2, paddingBottom: 40 }}>
          
          <h1 className={s.banner__title}>{t('locateUs.title', 'Locate Your Nearest Frolic Campus')}</h1>
          <p className={s.banner__desc}>
            {t('locateUs.desc', 'Explore our authorized Frolic Preschools, Digital English Labs, and Maths Labs by State, District, and Taluka.')}
          </p>
        </div>

        {/* Wave bottom — green → cream */}
        <WaveDivider
          variant="wave2"
          topColor="transparent"
          bottomColor="#FFF8EF"
          height={60}
        />
      </section>

      {/* ── 2. Main Container ── */}
      <div className="container-xl">
        {/* ── Filter Card (State -> District -> Taluka -> Search) ── */}
        <div className={s.filterCard}>
          <div className={s.filterCard__row}>
            {/* 4. Search Area / School Name */}
            <div className={s.filterCard__filterGroup}>
              <label className={s.filterCard__label}>
                 {t('locateUs.selectCity', 'Search Frolic Branch')}
              </label>
              <Input
                placeholder={t('locateUs.selectCity', 'Search Frolic Branch')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="large"
                prefix={<SearchOutlined style={{ fontSize: 16, color: '#94A3B8' }} />}
                allowClear
                style={{ borderRadius: 12, width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* ── 3. Branch School Cards Grid ── */}
        {loading ? (
          <div className="text-center py-5">
            <Spin size="large" />
            <p className="mt-3 text-muted">{t('common.loading', 'Loading Frolic campus branches...')}</p>
          </div>  
        ) : filteredCenters.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 p-5 shadow-sm border mt-4">
            <Empty
              description={
                <div>
                  <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#1E293B' }}>
                    No Frolic Branch Found
                  </h4>
                  <p style={{ color: '#64748B', fontSize: '14px', maxWidth: 460, margin: '8px auto 20px' }}>
                    {t('locateUs.desc', 'We are rapidly expanding across Gujarat and India.')}
                  </p>
                  <FrolicButton variant="secondary" size="md" onClick={resetFilters}>
                    {t('common.viewAll', 'View All Branches')}
                  </FrolicButton>
                </div>
              }
            />
          </div>
        ) : (
          <div className={s.branchesGrid}>
            {filteredCenters.map((center) => (
              <div key={center.slug || center.id} className={s.schoolCard}>
                {/* Header with Title & Badges */}
                <div>
                  <div className={s.schoolCard__header}>
                    <h3 className={s.schoolCard__title}>{center.name}</h3>
                  </div>

                  {/* District & Taluka Location Badge */}
                  <div className={s.schoolCard__locationTag}>
                    <EnvironmentOutlined style={{ fontSize: 13 }} />
                    <span>
                      {center.district || center.city}
                      {center.taluka ? ` • Taluka: ${center.taluka}` : ''}
                      {` (${center.state})`}
                    </span>
                  </div>

                  {/* Address Box */}
                  <div className={s.schoolCard__addressBox}>
                    <EnvironmentOutlined className={s.schoolCard__addressIcon} />
                    <p className={s.schoolCard__addressText}>
                      {center.address}, {center.city}, {center.state} — <strong>{center.pincode}</strong>
                    </p>
                  </div>

                  {/* Programs / Categories Offered */}
                  {center.programs && center.programs.length > 0 && (
                    <div className={s.schoolCard__programsSection}>
                      <div className={s.schoolCard__sectionLabel}>
                        <BookOutlined style={{ fontSize: 13, color: '#F7941D' }} /> {t('nav.programs', 'Programs & Categories Offered')}
                      </div>
                      <div className={s.schoolCard__pillsWrapper}>
                        {center.programs.map((prog) => (
                          <span key={prog} className={s.schoolCard__programPill}>
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Campus Facilities */}
                  {center.facilities && center.facilities.length > 0 && (
                    <div className={s.schoolCard__programsSection}>
                      <div className={s.schoolCard__sectionLabel}>
                        <StarOutlined style={{ fontSize: 13, color: '#047857' }} /> {t('locateUs.facilities', 'Campus Facilities')}
                      </div>
                      <div className={s.schoolCard__pillsWrapper}>
                        {center.facilities.map((fac) => (
                          <span key={fac} className={s.schoolCard__facilityPill}>
                            <CheckCircleOutlined style={{ fontSize: 11, color: '#10B981' }} /> {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact & Directions Footer */}
                  <div
                    style={{
                      marginTop: 18,
                      paddingTop: 14,
                      borderTop: '1px dashed #E2E8F0',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {center.phone && (
                        <a
                          href={`tel:${center.phone}`}
                          style={{
                            color: '#166534',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            textDecoration: 'none',
                          }}
                        >
                          <PhoneOutlined style={{ color: '#16A34A' }} /> {center.phone}
                        </a>
                      )}
                      {center.timing && (
                        <span style={{ color: '#64748B', fontSize: '0.78rem' }}>
                          ⏰ {center.timing}
                        </span>
                      )}
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        center.mapQuery || `${center.name}, ${center.address}, ${center.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 14px',
                        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
                        color: '#EA580C',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        borderRadius: 20,
                        border: '1px solid rgba(234, 88, 12, 0.3)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <CompassOutlined /> Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
