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
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import { centerService } from '../services';
import { FrolicButton, FrolicTag } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import WaveDivider from '../components/common/WaveDivider';
import s from './LocateUsPage.module.scss';

// Comprehensive Gujarat & National branches fallback data
const FALLBACK_CENTERS = [
  // ── Gujarat - Gandhinagar District ──
  {
    id: 1,
    name: 'Frolic Kids Edu Labs — Flagship Campus (Sargasan)',
    slug: 'gandhinagar-sargasan-flagship',
    branchType: 'Flagship Campus',
    address: '109, R Services, Sriprad Aayansh, Near Sargasan Cross Road',
    area: 'Sargasan',
    city: 'Gandhinagar',
    district: 'Gandhinagar',
    taluka: 'Gandhinagar',
    state: 'Gujarat',
    pincode: '382421',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab', 'Teacher Training'],
    facilities: ['CCTV Monitored', 'Smart Digital Classrooms', 'Digital English & Maths Lab', 'Abacus Studio', 'Child-Safe Play Zone'],
    mapQuery: '109 Sriprad Aayansh, Sargasan, Gandhinagar, Gujarat 382421',
    isFlagship: true,
  },
  {
    id: 2,
    name: 'Frolic Kids Edu Labs — Kalol Branch',
    slug: 'gandhinagar-kalol-branch',
    branchType: 'Edu Lab & Preschool',
    address: 'Plot 45, Navjivan Mill Compound, Station Road, Kalol',
    area: 'Station Road',
    city: 'Kalol',
    district: 'Gandhinagar',
    taluka: 'Kalol',
    state: 'Gujarat',
    pincode: '382721',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Audio-Visual Classroom', 'Abacus Math Pods', 'Sand & Water Play'],
    mapQuery: 'Station Road, Kalol, Gandhinagar, Gujarat',
    isFlagship: false,
  },
  {
    id: 3,
    name: 'Frolic Edu Labs — Mansa Campus',
    slug: 'gandhinagar-mansa-branch',
    branchType: 'Learning Studio',
    address: 'Shivalik Complex, Near Gayatri Mandir, Mansa',
    area: 'Gayatri Mandir Area',
    city: 'Mansa',
    district: 'Gandhinagar',
    taluka: 'Mansa',
    state: 'Gujarat',
    pincode: '382845',
    programs: ['Play Group', 'Nursery', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Activity Center', 'Digital Learning Kits'],
    mapQuery: 'Mansa, Gandhinagar, Gujarat',
    isFlagship: false,
  },

  // ── Gujarat - Ahmedabad District ──
  {
    id: 4,
    name: 'Frolic Edu Labs — Ahmedabad Gota Branch',
    slug: 'ahmedabad-gota-branch',
    branchType: 'Edu Lab & Preschool',
    address: 'Shop 204-206, Highline Galleria, Near Gota Cross Road, S.G. Highway',
    area: 'Gota',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    taluka: 'Ghatlodia',
    state: 'Gujarat',
    pincode: '382481',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Smart Interactive Boards', 'Phonics Audio Station', 'Outdoor Toddler Turf'],
    mapQuery: 'Gota, Ahmedabad, Gujarat',
    isFlagship: false,
  },
  {
    id: 5,
    name: 'Frolic Edu Labs — Ahmedabad Satellite Center',
    slug: 'ahmedabad-satellite-center',
    branchType: 'Edu Lab & Preschool',
    address: 'Plot 42, Sunrise Park Road, Opposite Vastrapur Lake Approach, Satellite',
    area: 'Satellite',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    taluka: 'Daskroi',
    state: 'Gujarat',
    pincode: '380015',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Digital English Lab', 'Maths Discovery Hub', 'Art & Craft Studio'],
    mapQuery: 'Satellite, Ahmedabad, Gujarat',
    isFlagship: false,
  },
  {
    id: 6,
    name: 'Frolic Edu Labs — Sanand Campus',
    slug: 'ahmedabad-sanand-branch',
    branchType: 'Edu Lab & Preschool',
    address: '2nd Floor, Royal Arcade, Sanand Main Road, Sanand',
    area: 'Sanand Town',
    city: 'Sanand',
    district: 'Ahmedabad',
    taluka: 'Sanand',
    state: 'Gujarat',
    pincode: '382110',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab'],
    facilities: ['CCTV Monitored', 'Language Lab Pods', 'Play Ground'],
    mapQuery: 'Sanand, Ahmedabad, Gujarat',
    isFlagship: false,
  },

  // ── Gujarat - Surat District ──
  {
    id: 7,
    name: 'Frolic Kids Edu Labs — Surat Vesu Center',
    slug: 'surat-vesu-center',
    branchType: 'Edu Lab & Preschool',
    address: '3rd Floor, Marvel Icon, University-VIP Road, Vesu',
    area: 'Vesu',
    city: 'Surat',
    district: 'Surat',
    taluka: 'Majura',
    state: 'Gujarat',
    pincode: '395007',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Language Lab Pods', 'Maths Manipulatives Table', 'Indoor Soft Play'],
    mapQuery: 'Vesu, Surat, Gujarat',
    isFlagship: false,
  },
  {
    id: 8,
    name: 'Frolic Edu Labs — Surat Adajan Branch',
    slug: 'surat-adajan-branch',
    branchType: 'Edu Lab & Preschool',
    address: 'Prime Arcade, Near Anand Mahal Road, Adajan',
    area: 'Adajan',
    city: 'Surat',
    district: 'Surat',
    taluka: 'Choryasi',
    state: 'Gujarat',
    pincode: '395009',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Interactive Smart Panels', 'Phonics Theatre'],
    mapQuery: 'Adajan, Surat, Gujarat',
    isFlagship: false,
  },

  // ── Gujarat - Vadodara District ──
  {
    id: 9,
    name: 'Frolic Edu Labs — Vadodara Alkapuri Branch',
    slug: 'vadodara-alkapuri-branch',
    branchType: 'Edu Lab & Preschool',
    address: '12, RC Dutt Road, Opp. Express Hotel, Alkapuri',
    area: 'Alkapuri',
    city: 'Vadodara',
    district: 'Vadodara',
    taluka: 'Vadodara Urban',
    state: 'Gujarat',
    pincode: '390007',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Phonics Studio', 'Digital Touch-Screen Lab', 'Toddler Splash Pool'],
    mapQuery: 'Alkapuri, Vadodara, Gujarat',
    isFlagship: false,
  },
  {
    id: 10,
    name: 'Frolic Edu Labs — Padra Branch',
    slug: 'vadodara-padra-branch',
    branchType: 'Edu Lab & Preschool',
    address: 'Station Road, Near Bus Stand, Padra',
    area: 'Station Area',
    city: 'Padra',
    district: 'Vadodara',
    taluka: 'Padra',
    state: 'Gujarat',
    pincode: '391440',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab'],
    facilities: ['CCTV Monitored', 'Phonics Pods', 'Activity Corner'],
    mapQuery: 'Padra, Vadodara, Gujarat',
    isFlagship: false,
  },

  // ── Gujarat - Rajkot District ──
  {
    id: 11,
    name: 'Frolic Kids Edu Labs — Rajkot Kalawad Road',
    slug: 'rajkot-kalawad-road-center',
    branchType: 'Edu Lab & Preschool',
    address: 'Kalawad Road, Near KKV Hall, Pushkar Dham Main Road',
    area: 'Kalawad Road',
    city: 'Rajkot',
    district: 'Rajkot',
    taluka: 'Rajkot Urban',
    state: 'Gujarat',
    pincode: '360005',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Digital Lab Stations', 'Sensory Wall Zone', 'Library Corner'],
    mapQuery: 'Kalawad Road, Rajkot, Gujarat',
    isFlagship: false,
  },
  {
    id: 12,
    name: 'Frolic Edu Labs — Gondal Campus',
    slug: 'rajkot-gondal-branch',
    branchType: 'Edu Lab & Preschool',
    address: 'College Chowk, Near City Bus Stand, Gondal',
    area: 'College Chowk',
    city: 'Gondal',
    district: 'Rajkot',
    taluka: 'Gondal',
    state: 'Gujarat',
    pincode: '360311',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Smart Abacus Lab', 'Toddler Fun Zone'],
    mapQuery: 'Gondal, Rajkot, Gujarat',
    isFlagship: false,
  },

  // ── Gujarat - Bhavnagar District ──
  {
    id: 13,
    name: 'Frolic Edu Labs — Bhavnagar Waghawadi Branch',
    slug: 'bhavnagar-waghawadi-branch',
    branchType: 'Edu Lab & Preschool',
    address: 'Top 3 Complex, Waghawadi Road, Bhavnagar',
    area: 'Waghawadi Road',
    city: 'Bhavnagar',
    district: 'Bhavnagar',
    taluka: 'Bhavnagar Urban',
    state: 'Gujarat',
    pincode: '364002',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Digital Labs', 'Indoor Play Arena'],
    mapQuery: 'Waghawadi Road, Bhavnagar, Gujarat',
    isFlagship: false,
  },

  // ── Gujarat - Anand District ──
  {
    id: 14,
    name: 'Frolic Edu Labs — Anand Vidyanagar Branch',
    slug: 'anand-vidyanagar-branch',
    branchType: 'Edu Lab & Preschool',
    address: 'Near Mota Bazaar, Vallabh Vidyanagar, Anand',
    area: 'Vallabh Vidyanagar',
    city: 'Anand',
    district: 'Anand',
    taluka: 'Anand',
    state: 'Gujarat',
    pincode: '388120',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab', 'Teacher Training'],
    facilities: ['CCTV Monitored', 'Digital Lab Pods', 'Smart Board Classroom'],
    mapQuery: 'Vallabh Vidyanagar, Anand, Gujarat',
    isFlagship: false,
  },

  // ── Maharashtra - Mumbai District ──
  {
    id: 15,
    name: 'Frolic Learning Studio — Mumbai Kandivali Branch',
    slug: 'mumbai-kandivali-studio',
    branchType: 'Learning Studio',
    address: '2nd Floor, Sai Arcade, Mahavir Nagar, Kandivali West',
    area: 'Kandivali West',
    city: 'Mumbai',
    district: 'Mumbai Suburban',
    taluka: 'Borivali',
    state: 'Maharashtra',
    pincode: '400067',
    programs: ['Digital English Lab', 'Maths Lab', 'After-School Phonics'],
    facilities: ['CCTV Monitored', 'Smart Digital Lab Pods', 'Individual Speed-Reading Terminals'],
    mapQuery: 'Mahavir Nagar, Kandivali West, Mumbai, Maharashtra',
    isFlagship: false,
  },
  {
    id: 16,
    name: 'Frolic Edu Labs — Mumbai Thane Center',
    slug: 'mumbai-thane-center',
    branchType: 'Edu Lab & Preschool',
    address: 'Ground Floor, Hiranandani Meadows, Pokhran Road No. 2, Thane West',
    area: 'Thane West',
    city: 'Thane',
    district: 'Thane',
    taluka: 'Thane',
    state: 'Maharashtra',
    pincode: '400610',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Smart Classrooms', 'Abacus & Maths Lab', 'Play Garden'],
    mapQuery: 'Hiranandani Meadows, Thane West, Maharashtra',
    isFlagship: false,
  },

  // ── Rajasthan - Jaipur District ──
  {
    id: 17,
    name: 'Frolic Kids Edu Labs — Jaipur Vaishali Nagar',
    slug: 'jaipur-vaishali-nagar-center',
    branchType: 'Edu Lab & Preschool',
    address: 'Amrapali Circle, Vaishali Nagar, Jaipur',
    area: 'Vaishali Nagar',
    city: 'Jaipur',
    district: 'Jaipur',
    taluka: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302021',
    programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
    facilities: ['CCTV Monitored', 'Smart Classroom', 'Phonics Studio', 'Play Turf'],
    mapQuery: 'Vaishali Nagar, Jaipur, Rajasthan',
    isFlagship: false,
  },
];

export default function LocateUsPage() {
  const [centers, setCenters] = useState(FALLBACK_CENTERS);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useLanguage();

  // Load data from backend API with fallback
  useEffect(() => {
    setLoading(true);
    centerService
      .getAll()
      .then((res) => {
        const data = res?.data?.data || res?.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setCenters(data);
        } else {
          setCenters(FALLBACK_CENTERS);
        }
      })
      .catch(() => {
        setCenters(FALLBACK_CENTERS);
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
                style={{ borderRadius: 12, width: '200%' }}
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
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
