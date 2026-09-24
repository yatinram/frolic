import React from 'react';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useLanguage } from '../../context/LanguageContext';
import s from './Footer.module.scss';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={s.footerWrapper}>
      <div className={s.footerContainer}>
        {/* Top Categorized Navigation Grid */}
        <div className={s.topGrid}>
          {/* Column 1: Programs & Labs */}
          <div className={s.colGroup}>
            <div className={s.mainHeading}>
              {t('footer.programsHeading', 'PROGRAMS & LABS')}
            </div>
            <div className={s.subHeading}>{t('footer.preschool', 'Preschool')}</div>
            <ul className={s.linkList}>
              <li><Link to={ROUTES.PLAY_GROUP}>{t('nav.playGroup', 'Play Group (1.5 - 2.5y)')}</Link></li>
              <li><Link to={ROUTES.NURSERY}>{t('nav.nursery', 'Nursery (2.5 - 3.5y)')}</Link></li>
              <li><Link to={ROUTES.LKG}>{t('nav.lkg', 'LKG (3.5 - 4.5y)')}</Link></li>
              <li><Link to={ROUTES.UKG}>{t('nav.ukg', 'UKG (4.5 - 5.5y)')}</Link></li>
            </ul>
            <div className={s.subHeading} style={{ marginTop: 14 }}>{t('footer.specialLabs', 'Skill Labs')}</div>
            <ul className={s.linkList}>
              <li><Link to={ROUTES.ENGLISH_LAB}>{t('nav.englishLab', 'Digital English Lab')}</Link></li>
              <li><Link to={ROUTES.MATHS_LAB}>{t('nav.mathsLab', 'Interactive Maths Lab')}</Link></li>
            </ul>
          </div>

          {/* Column 2: Explore Frolic */}
          <div className={s.colGroup}>
            <div className={s.mainHeading}>
              {t('footer.exploreHeading', 'EXPLORE FROLIC')}
            </div>
            <div className={s.subHeading}>{t('footer.aboutUs', 'About Us')}</div>
            <ul className={s.linkList}>
              <li><Link to={ROUTES.ABOUT}>{t('nav.about', 'Our Philosophy & Mission')}</Link></li>
              <li><Link to={ROUTES.ABOUT}>{t('footer.whyChoose', 'Why Choose Frolic')}</Link></li>
              <li><Link to={ROUTES.STORE}>{t('nav.store', 'Frolic Branded Kits')}</Link></li>
              <li><Link to={ROUTES.GALLERY}>{t('nav.gallery', 'Campus Photo Gallery')}</Link></li>
              <li><Link to={ROUTES.EVENTS}>{t('nav.eventsAwards', 'Events & Awards')}</Link></li>
              <li><Link to={ROUTES.GAMES}>{t('nav.games', 'Kids Fun Games')}</Link></li>
              <li><Link to={ROUTES.BLOG}>{t('nav.blog', 'Parenting & Education Blog')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Admissions & Process */}
          <div className={s.colGroup}>
            <div className={s.mainHeading}>
              {t('footer.admissionHeading', 'ADMISSIONS')}
            </div>
            <div className={s.subHeading}>{t('footer.forParents', 'For Parents')}</div>
            <ul className={s.linkList}>
              <li><Link to={ROUTES.ADMISSION}>{t('nav.admission', 'Admission Enquiry')}</Link></li>
              <li><Link to={ROUTES.ADMISSION}>{t('footer.admissionSteps', '4-Step Admission Journey')}</Link></li>
              <li><Link to={ROUTES.ADMISSION}>{t('footer.feeInclusions', 'Kit & Fee Inclusions')}</Link></li>
              <li><Link to={ROUTES.LOCATE_US}>{t('nav.locateUs', 'Find a Centre Near You')}</Link></li>
              <li><Link to={ROUTES.ADMISSION}>{t('footer.faqs', 'Parent FAQs & Queries')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Partners & Franchise */}
          <div className={s.colGroup}>
            <div className={s.mainHeading}>
              {t('footer.partnersHeading', 'PARTNER WITH US')}
            </div>
            <div className={s.subHeading}>{t('footer.growth', 'Business & Growth')}</div>
            <ul className={s.linkList}>
              <li><Link to={ROUTES.FRANCHISE}>{t('nav.franchise', 'Franchise Opportunity')}</Link></li>
              <li><Link to={ROUTES.FRANCHISE}>{t('footer.franchiseModels', 'Franchise ROI & Models')}</Link></li>
              <li><Link to={ROUTES.TEACHER_TRAINING}>{t('nav.teacherTraining', 'Teacher Training (CPD)')}</Link></li>
              <li><Link to={ROUTES.FRANCHISE}>{t('footer.labSetup', 'Edu Lab Setup for Schools')}</Link></li>
              <li><Link to={ROUTES.CONTACT}>{t('footer.partnerSupport', 'Corporate & Partner Desk')}</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact & Reach */}
          <div className={s.colGroup}>
            <div className={s.mainHeading}>
              {t('footer.contactHeading', 'CONTACT & CENTRES')}
            </div>
            <div className={s.subHeading}>{t('footer.helpline', 'Central Helpline')}</div>
            <ul className={s.linkList}>
              <li>
                <a href="tel:7575008820" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                  <PhoneOutlined style={{ color: '#2ECC71', marginRight: 8 }} />
                  7575008820
                </a>
              </li>
              <li>
                <a href="mailto:frolickidsedulabs@gmail.com">
                  <MailOutlined style={{ color: '#2ECC71', marginRight: 8 }} />
                  frolickidsedulabs@gmail.com
                </a>
              </li>
              <li>
                <span style={{ display: 'inline-flex', alignItems: 'flex-start', color: '#9BB0A8', fontSize: '0.86rem' }}>
                  <EnvironmentOutlined style={{ color: '#2ECC71', marginRight: 8, marginTop: 3 }} />
                  109, R Services, Sriprad Aayansh, Sargasan, Gandhinagar, Gujarat - 382421
                </span>
              </li>
              <li>
                <span style={{ display: 'inline-flex', alignItems: 'center', color: '#9BB0A8', fontSize: '0.86rem' }}>
                  <ClockCircleOutlined style={{ color: '#2ECC71', marginRight: 8 }} />
                  Mon - Sat: 8:30 AM - 6:30 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Brand, What We Do & Social Media Row */}
        <div className={s.middleDivider}>
          {/* Brand & Logo */}
          <div className={s.brandCol}>
            <div className={s.logoRow}>
              <img src="/assets/logo.jpeg" alt="Frolic Kids Edu Labs" />
              <div className={s.brandName}>
                FROLIC KIDS
                <span>EDU LABS</span>
              </div>
            </div>
            <div className={s.tagline}>
              {t('footer.tagline', 'Explore • Express • Experience')}
            </div>
          </div>

          {/* What We Do Summary */}
          <div className={s.whatWeDoCol}>
            <h4>{t('footer.whatWeDoHeading', 'What We Do')}</h4>
            <p>
              {t(
                'footer.whatWeDoText',
                'FROLIC KIDS EDU LABS is a pioneer in early childhood and experiential education. We nurture foundational curiosity through activity-based learning kits, AI-enhanced English and Maths digital labs, and Montessori-certified educator excellence across Gujarat.'
              )}
            </p>
          </div>

          {/* Follow Us */}
          <div className={s.socialCol}>
            <h4>{t('footer.followUsHeading', 'Follow Us')}</h4>
            <div className={s.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookFilled />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <TwitterOutlined />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramFilled />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinFilled />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <YoutubeFilled />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className={s.bottomBar}>
          <div>
            Welcome to FROLIC KIDS EDU LABS. All rights reserved by frolickids.com &copy; {new Date().getFullYear()}
          </div>
          <div className={s.legalLinks}>
            <Link to={ROUTES.ABOUT}>About Brand</Link>
            <Link to={ROUTES.FRANCHISE}>Partner Network</Link>
            <Link to={ROUTES.LOCATE_US}>Centres</Link>
            <Link to={ROUTES.CONTACT}>Privacy Statement</Link>
            <Link to={ROUTES.CONTACT}>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
