import React, { useState } from 'react';
import { notification, Result, Collapse } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  RiseOutlined,
  TeamOutlined,
  BookOutlined,
  GiftOutlined,
  ShopOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import confetti from 'canvas-confetti';
import { franchiseService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import {
  FrolicButton,
  FrolicInput,
  FrolicForm,
} from '../components/ui';
import s from './FranchisePage.module.scss';

export default function FranchisePage() {
  const { t, currentLang } = useLanguage();
  const [form] = FrolicForm.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const res = await franchiseService.create(values);
      if (res.success || res.status === 200 || res.status === 201) {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        notification.success({
          message: 'Franchise Application Received! 🏢',
          description:
            'Thank you for your interest in partnering with Frolic Kids Edu Labs. Our Expansion Directorate will contact you within 24 hours.',
          duration: 6,
        });
        setSubmitted(true);
        form.resetFields();
      }
    } catch (err) {
      notification.error({
        message: 'Submission Error',
        description: err.message || 'Please verify your contact information and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const investmentOptions = [
    { label: '₹8 Lakhs – ₹12 Lakhs (Mini Learning Studio / Lab Pod)', value: '8-12 Lakhs' },
    { label: '₹12 Lakhs – ₹18 Lakhs (Standard Preschool + Edu Labs)', value: '12-18 Lakhs' },
    { label: '₹18 Lakhs – ₹25 Lakhs+ (Regional Flagship Campus)', value: '18-25 Lakhs+' },
    { label: 'Existing School Upgradation (Curriculum & Lab Tech)', value: 'School Upgradation' },
  ];

  const spaceOptions = [
    { label: 'Own Commercial Property (1,000+ sq.ft)', value: 'Own Property' },
    { label: 'Rented / Leased Commercial Space Available', value: 'Rented Space' },
    { label: 'Space Currently Being Identified', value: 'Identifying Space' },
  ];

  const benefits = [
    {
      icon: <BookOutlined />,
      color: '#F7941D',
      bg: '#FFF4E5',
      title: t('franchisePage.benefit2', 'Proven D.I.E.L. Curriculum License'),
      desc: t('franchisePage.benefit2Desc', 'Full rights to our 44 phonemes, 8,000+ words English Lab software and 18 Pabulum workbooks.'),
    },
    {
      icon: <TeamOutlined />,
      color: '#10B981',
      bg: '#ECFDF5',
      title: t('franchisePage.benefit3', '12-Module Educator Mentoring'),
      desc: t('franchisePage.benefit3Desc', 'Hands-on staff recruitment guidance and NCF 2023 certified teacher mentoring by industry experts.'),
    },
    {
      icon: <RiseOutlined />,
      color: '#0284C7',
      bg: '#E0F2FE',
      title: t('franchisePage.benefit1', '3-in-1 Multi-Stream Revenue'),
      desc: t('franchisePage.benefit1Desc', 'Earn year-round revenue from morning Preschool, evening English Labs, and Maths Labs.'),
    },
    {
      icon: <GiftOutlined />,
      color: '#8B5CF6',
      bg: '#F5F3FF',
      title: t('franchisePage.benefit4', 'Turnkey Branding & Launch Kit'),
      desc: t('franchisePage.benefit4Desc', 'Branded student uniforms, school stationery, brochure kits, signage, and localized digital campaigns.'),
    },
    {
      icon: <DollarCircleOutlined />,
      color: '#EF4444',
      bg: '#FEF2F2',
      title: t('home.franchise.stat3Label', 'Low Setup & Quick Breakeven'),
      desc: 'Optimized space requirements (800 – 2000 sq.ft) with fast return on investment within 18–24 months.',
    },
    {
      icon: <ShopOutlined />,
      color: '#F59E0B',
      bg: '#FFFBEB',
      title: 'Protected Territory Exclusivity',
      desc: 'Exclusive pin-code catchment radius ensuring zero competition from other Frolic centers in your area.',
    },
  ];

  return (
    <div className={s.page}>
      {/* ── 1. Top Section: Direct Form Focus (NO Hero Banner) ── */}
      <section className={s.topSection}>
        <div className={s.topGlowRight} />
        <div className={s.topGlowLeft} />

        <div className="container-xl">
          <div className="row g-5 align-items-center">
            
              {/* Right Column: Prominent Enquiry Form (THE MAIN FOCUS) */}
            <div className="col-lg-6">
              <div className={s.formCard} id="franchise-form">
                {submitted ? (
                  <Result
                    status="success"
                    title={t('franchisePage.successTitle', 'Franchise Application Received! 🏢')}
                    subTitle={t('franchisePage.successDesc', 'Thank you for your interest. Our Head of Franchise Expansion will contact you directly within 24 hours.')}
                    extra={[
                      <FrolicButton
                        key="reset"
                        variant="primary"
                        size="lg"
                        onClick={() => setSubmitted(false)}
                      >
                        {t('franchisePage.submitBtn', 'Submit Another Application')}
                      </FrolicButton>,
                    ]}
                  />
                ) : (
                  <>
                    <div className={s.formCard__header}>
                      <h2 className={s.formCard__title}>
                        {t('franchisePage.applyTitle', 'Franchise Application Form')}
                      </h2>
                    </div>

                    <FrolicForm form={form} onFinish={onFinish}>
                      <div className="row">
                        <div style={{margin: '0 0 10px 0', fontSize: '14px', color: '#475569'}}>
                          <FrolicForm.Item
                            name="name"
                            rules={[{ required: true, message: t('common.required', 'Please enter your full name') }]}
                            style={{marginBottom:"5px"}}
                          >
                            <FrolicInput
                              type="text"
                              label={t('franchisePage.name', 'Full Name')}
                              placeholder={t('franchisePage.namePlaceholder', 'Enter your full name')}
                              required
                            />
                          </FrolicForm.Item>
                        </div>

                        <div style={{margin: '0 0 10px 0', fontSize: '14px', color: '#475569'}}>
                          <FrolicForm.Item
                            name="phone"
                            rules={[{ required: true, message: t('franchisePage.phone', 'Please enter your contact number') }]}
                            style={{marginBottom: "5px"}}
                          >
                            <FrolicInput
                              type="tel"
                              label={t('franchisePage.phone', 'Mobile Number')}
                              placeholder={t('franchisePage.phonePlaceholder', 'Enter your mobile number')}
                              required
                            />
                          </FrolicForm.Item>
                        </div>

                        <div style={{margin: '0 0 10px 0', fontSize: '14px', color: '#475569'}}>
                          <FrolicForm.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
                            style={{marginBottom:"5px"}}
                          >
                            <FrolicInput
                              type="email"
                              label={t('franchisePage.email', 'Email Address')}
                              placeholder={t('franchisePage.emailPlaceholder', 'Enter your email address')}
                              required
                            />
                          </FrolicForm.Item>
                        </div>

                        <div style={{margin: '0 0 10px 0', fontSize: '14px', color: '#475569'}}>
                          <FrolicForm.Item
                            name="city"
                            rules={[{ required: true, message: t('common.required', 'Please specify target city') }]}
                            style={{marginBottom: "5px"}}
                          >
                            <FrolicInput
                              type="text"
                              label={t('franchisePage.city', 'City & State')}
                              placeholder={t('franchisePage.cityPlaceholder', 'Enter a valid state & city')}
                              required
                            />
                          </FrolicForm.Item>
                        </div>
                        <div className="col-12">
                          <FrolicForm.Item name="message">
                            <FrolicInput
                              type="textarea"
                              label={t('franchisePage.message', 'Description')}
                              placeholder={t('franchisePage.messagePlaceholder', 'Enter any questions related to the Franchise')}
                              rows={2}
                            />
                          </FrolicForm.Item>
                        </div>

                        <div className="col-12 mt-1">
                          <FrolicButton
                            htmlType="submit"
                            variant="primary"
                            size="lg"
                            block
                            loading={submitting}
                          >
                            {submitting ? t('common.submitting', 'Submitting...') : t('franchisePage.submitBtn', 'Submit')}
                          </FrolicButton>
                        </div>
                      </div>
                    </FrolicForm>
                  </>
                )}
              </div>
            </div>
            {/* Left Column: Value Pitch & Quick Metrics */}
            <div className={`col-lg-6 ${s.leadCol}`}>
              <h1 className={s.mainTitle}>
                {t('franchisePage.title', "Partner with India's Fastest Growing Edu Lab & Preschool Network")}
              </h1>

              <p className={s.mainSubtitle}>
                {t('franchisePage.subtitle', 'Launch an authorized Frolic preschool & digital learning lab in your city. Experience industry-leading breakeven with 3-in-1 recurring revenue streams and turnkey setup support.')}
              </p>

              {/* 4 Quick Stat Cards */}
              <div className={s.metricsGrid}>
                <div className={s.metricCard}>
                  <div className={s.metricCard__val}>3-in-1</div>
                  <div className={s.metricCard__lbl}>{t('home.franchise.stat1Label', 'Revenue Streams (Preschool + English + Maths)')}</div>
                </div>
                <div className={s.metricCard}>
                  <div className={s.metricCard__val}>18-24 Mo</div>
                  <div className={s.metricCard__lbl}>{t('home.franchise.stat3Label', 'Average Capital ROI & Breakeven')}</div>
                </div>
                <div className={s.metricCard}>
                  <div className={s.metricCard__val}>100%</div>
                  <div className={s.metricCard__lbl}>{t('home.franchise.stat4Label', 'Turnkey Tech, Kits & Training Support')}</div>
                </div>
                <div className={s.metricCard}>
                  <div className={s.metricCard__val}>Pin-Code</div>
                  <div className={s.metricCard__lbl}>Protected Territory Catchment Radius</div>
                </div>
              </div>

              {/* Key Partner Checklist */}
              <div className={s.checklist}>
                <div className={s.checkItem}>
                  <CheckCircleOutlined className={s.checkIcon} />
                  <span>NCF 2023 &amp; NEP 2020 Aligned Interactive Labs</span>
                </div>
                <div className={s.checkItem}>
                  <CheckCircleOutlined className={s.checkIcon} />
                  <span>12-Module Educator Mentorship by Industry Leaders</span>
                </div>
                <div className={s.checkItem}>
                  <CheckCircleOutlined className={s.checkIcon} />
                  <span>Turnkey Hardware, Software &amp; Uniform Kit Supply</span>
                </div>
                <div className={s.checkItem}>
                  <CheckCircleOutlined className={s.checkIcon} />
                  <span>Centralized Digital Marketing &amp; Direct Student Leads</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── 3. Section: 6 Core Value Pillars (Why Partner) ── */}
      <section className={s.contentSection} style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container-xl">
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionPill}>{t('franchisePage.tag', 'Why Frolic')}</span>
            <h2 className={s.sectionTitle}>{t('franchisePage.statsTitle', 'The Turnkey Frolic Advantage')}</h2>
            <p className={s.sectionSubtitle}>
              {t('franchisePage.applySubtitle', 'We equip our partners with end-to-end academic, technical, and operational resources for sustainable long-term profitability.')}
            </p>
          </div>

          <div className={s.pillarsGrid}>
            {benefits.map(({ icon, color, bg, title, desc }) => (
              <div key={title} className={s.pillarCard}>
                <div className={s.pillarCard__iconWrapper} style={{ background: bg, color }}>
                  {icon}
                </div>
                <h3 className={s.pillarCard__title}>{title}</h3>
                <p className={s.pillarCard__desc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Section: 4-Step Launch Pathway ── */}
      <section className={s.contentSection}>
        <div className="container-xl">
          <div className={s.sectionHeaderCenter}>
            <span className={s.sectionPill}>Streamlined Process</span>
            <h2 className={s.sectionTitle}>Your 4-Step Pathway to Launch</h2>
            <p className={s.sectionSubtitle}>
              From preliminary application to your grand launch day, our experienced project managers guide every step.
            </p>
          </div>

          <div className={s.stepsRow}>
            <div className={s.stepCard}>
              <div className={s.stepCard__num}>1</div>
              <h4 className={s.stepCard__title}>Application Review</h4>
              <p className={s.stepCard__desc}>
                Submit your preliminary application form and review the official Franchise Disclosure Prospectus &amp; financial model.
              </p>
            </div>

            <div className={s.stepCard}>
              <div className={s.stepCard__num}>2</div>
              <h4 className={s.stepCard__title}>Location Approval</h4>
              <p className={s.stepCard__desc}>
                Demographic feasibility analysis of your site, territory exclusivity reservation, and formal franchise agreement execution.
              </p>
            </div>

            <div className={s.stepCard}>
              <div className={s.stepCard__num}>3</div>
              <h4 className={s.stepCard__title}>Fitout &amp; Teacher Training</h4>
              <p className={s.stepCard__desc}>
                Architectural layout implementation, lab technology installation, and 12-Module teacher certification workshops.
              </p>
            </div>

            <div className={s.stepCard}>
              <div className={s.stepCard__num}>4</div>
              <h4 className={s.stepCard__title}>Grand Launch Drive</h4>
              <p className={s.stepCard__desc}>
                Head-office supported digital marketing launch, experiential open-house sessions, and first batch student onboardings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
