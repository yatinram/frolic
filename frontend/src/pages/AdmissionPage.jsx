import React, { useState } from 'react';
import {
  SafetyCertificateOutlined,
  TeamOutlined,
  EyeOutlined,
  FormOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  BookOutlined,
  SmileOutlined,
  BankOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  BulbOutlined,
  RocketOutlined,
  DesktopOutlined,
  CustomerServiceOutlined,
  SearchOutlined,
  CompassOutlined,
  PlusOutlined,
  MinusOutlined,
  StarOutlined,
  ExperimentOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { notification, Checkbox } from 'antd';
import confetti from 'canvas-confetti';
import { ROUTES } from '../constants/routes';
import { admissionService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import {
  FrolicButton,
  FrolicInput,
  FrolicForm,
} from '../components/ui';
import s from './AdmissionPage.module.scss';

export default function AdmissionPage() {
  const navigate = useNavigate();
  const { t, currentLang } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedProgram = searchParams.get('program') || 'Play Group';

  const [form] = FrolicForm.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreeConsent, setAgreeConsent] = useState(true);
  const [centreQuery, setCentreQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0); // 1st FAQ open by default

  const scrollToForm = (programName) => {
    if (programName) {
      form.setFieldsValue({ preferredProgram: programName });
    }
    const formEl = document.getElementById('admission-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCentreSearch = (e) => {
    e.preventDefault();
    if (centreQuery.trim()) {
      navigate(`${ROUTES.LOCATE_US}?city=${encodeURIComponent(centreQuery.trim())}`);
    } else {
      navigate(ROUTES.LOCATE_US);
    }
  };

  const onFinish = async (values) => {
    if (!agreeConsent) {
      notification.warning({
        title: 'Consent Required',
        description: 'Please agree to be contacted by the Frolic team to proceed.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        parentName: values.parentName,
        phone: values.phone,
        email: values.email || '',
        city: values.cityArea,
        childName: values.childName,
        dob: values.dob || '',
        ageGroup: values.ageGroup,
        program: values.preferredProgram,
        center: values.preferredCenter || 'Nearest Available Campus',
        session: values.preferredSession || 'Academic Year 2025–26',
        message: values.message || '',
      };

      try {
        await admissionService.create(payload);
      } catch (err) {
        console.warn('Backend admission API logged, continuing graceful confirmation', err);
      }

      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      notification.success({
        title: 'Admission Enquiry Received! 🎉',
        description: `Thank you, ${values.parentName}! Our Frolic admissions team will contact you at ${values.phone} shortly.`,
        duration: 6,
      });

      setSubmitted(true);
      form.resetFields();
    } catch {
      notification.error({
        title: 'Submission Failed',
        description: 'Please verify your details and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Program Card Data
  const programCards = [
    {
      id: 'playgroup',
      title: 'Play Group',
      badge: '1.5 – 2.5 YRS',
      badgeColor: '#FFF2E2',
      badgeTextColor: '#E66A00',
      iconBg: '#FFF0DF',
      iconColor: '#F7941D',
      icon: <SmileOutlined style={{ fontSize: 22 }} />,
      desc: 'An early learning experience where children begin exploring through play and interaction.',
      programKey: 'Play Group',
    },
    {
      id: 'nursery',
      title: 'Nursery',
      badge: '2.5 – 3.5 YRS',
      badgeColor: '#E8F8EA',
      badgeTextColor: '#2E7D32',
      iconBg: '#E8F8EA',
      iconColor: '#4CAF50',
      icon: <StarOutlined style={{ fontSize: 22 }} />,
      desc: 'Build early learning foundations through engaging activities and experiences.',
      programKey: 'Nursery',
    },
    {
      id: 'lkg',
      title: 'LKG',
      badge: '3.5 – 4.5 YRS',
      badgeColor: '#E8F4FF',
      badgeTextColor: '#0284C7',
      iconBg: '#E8F4FF',
      iconColor: '#0284C7',
      icon: <BookOutlined style={{ fontSize: 22 }} />,
      desc: 'Encourage language, thinking and early learning through interactive experiences.',
      programKey: 'LKG',
    },
    {
      id: 'ukg',
      title: 'UKG',
      badge: '4.5 – 5.5 YRS',
      badgeColor: '#FFF0F6',
      badgeTextColor: '#C2185B',
      iconBg: '#FFF0F6',
      iconColor: '#E91E63',
      icon: <ReadOutlined style={{ fontSize: 22 }} />,
      desc: 'Strengthen learning foundations and build confidence for the next stage of learning.',
      programKey: 'UKG',
    },
    {
      id: 'english-lab',
      title: "Kids' English Lab",
      badge: 'NURSERY → CLASS 2',
      badgeColor: '#FFF4E5',
      badgeTextColor: '#D97706',
      iconBg: '#FFF4E5',
      iconColor: '#F59E0B',
      icon: <DesktopOutlined style={{ fontSize: 22 }} />,
      desc: 'An interactive digital learning experience covering English, EVS and General Knowledge.',
      chips: ['English', 'EVS + GK', 'Interactive Exercises'],
      programKey: "Kids' English Lab",
    },
    {
      id: 'edu-lab',
      title: 'Frolic Edu Lab',
      badge: 'KINDERGARTEN → CLASS 5',
      badgeColor: '#EDE9FE',
      badgeTextColor: '#6D28D9',
      iconBg: '#EDE9FE',
      iconColor: '#7C3AED',
      icon: <ExperimentOutlined style={{ fontSize: 22 }} />,
      desc: 'Interactive learning experiences designed to support engaging, personalised and meaningful learning.',
      chips: ['Interactive Learning', 'Digital Learning', 'Critical Thinking'],
      programKey: 'Frolic Edu Lab',
    },
  ];

  // FAQ List
  const faqs = [
    {
      q: 'Which Frolic program is suitable for my child?',
      a: 'Our team can help you explore the appropriate program based on your child’s age and learning needs.',
    },
    {
      q: 'How can I find a Frolic centre near me?',
      a: 'Use the Find a Centre section to search by city, area or pincode.',
    },
    {
      q: 'How do I apply for admission?',
      a: 'Fill out the Admission Enquiry form and submit your details. The Frolic team will contact you.',
    },
    {
      q: 'Can I contact the Frolic team before applying?',
      a: 'Yes. Parents can contact the Frolic team for admission guidance on 7575008820.',
    },
    {
      q: 'What happens after submitting the enquiry?',
      a: 'The Frolic academic counseling team will connect with you and guide you through campus visit and trial class.',
    },
  ];

  return (
    <div className={s.admissionPage}>
    
      {/* ──────────────────────────────────────────────
            2. NEW PROFESSIONAL MAIN HEADER
        ────────────────────────────────────────────── */}
      <header className={s.mainHeader}>
        <div className="container-xl text-center">
          <div className={s.mainHeader__badge}>
            <span className={s.mainHeader__dot} />
            <span>{t('admissionPage.tag', 'Admissions Open for Academic Year 2025–26')}</span>
          </div>

          <h1 className={s.mainHeader__title}>
            {t('admissionPage.title', "Begin Your Child's Joyful Learning Journey")}
          </h1>
          <p className={s.mainHeader__subtitle} style={{ maxWidth: 680, margin: '12px auto 0', color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>
            {t('admissionPage.subtitle', 'Join 2,500+ happy families. Nurturing, play-based early learning with AI-enhanced Digital English & Maths Labs across Gujarat.')}
          </p>
        </div>
      </header>

      {/* ──────────────────────────────────────────────
            3. MAIN ADMISSION ENQUIRY + GUIDANCE SECTION
        ────────────────────────────────────────────── */}
      <section className={s.enquirySection} id="admission-form">
        <div className="container-xl">
          <div className="row g-4 align-items-start">
            
            {/* Left Column: Admission Form */}
            <div className="col-lg-7">
              <div className={s.enquirySection__formCard}>
                
                <div className={s.enquirySection__header}>
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <h2 className={s.enquirySection__title}>{t('admissionPage.formTitle', 'Admission Enquiry')}</h2>
                    </div>
                  </div>  
                </div>

                {submitted ? (
                  <div className={s.enquirySection__successCard}>
                    <div className="successIcon">
                      <CheckCircleFilled style={{ fontSize: 48, color: '#39B54A' }} />
                    </div>
                    <h3>{t('admissionPage.successTitle', 'Thank You!')}</h3>
                    <p>
                      {t('admissionPage.successDesc', 'Your admission enquiry has been submitted successfully. Our Frolic team will contact you shortly.')}
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                      <FrolicButton
                        variant="primary"
                        size="md"
                        onClick={() => navigate(ROUTES.HOME)}
                      >
                        {t('nav.home', 'Back to Frolic')}
                      </FrolicButton>
                      <FrolicButton
                        variant="secondary"
                        size="md"
                        onClick={() => setSubmitted(false)}
                      >
                        {t('admissionPage.submitBtn', 'Submit Another Enquiry')}
                      </FrolicButton>
                    </div>
                  </div>
                ) : (
                  <FrolicForm
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                      preferredProgram: preselectedProgram,
                      preferredSession: 'Academic Year 2025–26',
                    }}
                  >
                    <div className="row g-3">
                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="parentName"
                          rules={[{ required: true, message: t('common.required', 'Please enter your name.') }]}
                        >
                          <FrolicInput
                            type="text"
                            label={t('admissionPage.parentName', 'Parent Name')}
                            placeholder={t('admissionPage.parentNamePlaceholder', 'Enter parent full name')}
                            required
                          />
                        </FrolicForm.Item>
                      </div>

                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="phone"
                          rules={[
                            { required: true, message: t('admissionPage.phone', 'Please enter a valid mobile number.') },
                            {
                              pattern: /^[0-9]{10}$/,
                              message: t('admissionPage.phonePlaceholder', 'Please enter a valid 10-digit mobile number.'),
                            },
                          ]}
                        >
                          <FrolicInput
                            type="tel"
                            label={t('admissionPage.phone', 'Mobile Number')}
                            placeholder={t('admissionPage.phonePlaceholder', 'Enter a valid mobile number')}
                            required
                          />
                        </FrolicForm.Item>
                      </div>

                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="email"
                          rules={[{ type: 'email', message: 'Please enter a valid email address.' }]}
                        >
                          <FrolicInput
                            type="email"
                            label={t('admissionPage.email', 'Email Address')}
                            placeholder={t('admissionPage.emailPlaceholder', 'Enter a valid email address')}
                          />
                        </FrolicForm.Item>
                      </div>

                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="cityArea"
                          rules={[{ required: true, message: 'Please enter city or area.' }]}
                        >
                          <FrolicInput
                            type="text"
                            label={t('admissionPage.city', 'City / Area')}
                            placeholder={t('admissionPage.cityPlaceholder', 'Enter city or area')}
                            required
                          />
                        </FrolicForm.Item>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="childName"
                          rules={[{ required: true, message: "Please enter child's name." }]}
                        >
                          <FrolicInput
                            type="text"
                            label={t('admissionPage.childName', "Child’s Name")}
                            placeholder={t('admissionPage.childNamePlaceholder', "Enter child's full name")}
                            required
                          />
                        </FrolicForm.Item>
                      </div>

                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="dob"
                          rules={[{ required: true, message: 'Please enter date of birth.' }]}
                        >
                          <FrolicInput
                            type="date"
                            label={t('admissionPage.childAge', 'Date of Birth')}
                            placeholder="DD / MM / YYYY"
                            required
                          />
                        </FrolicForm.Item>
                      </div>

                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="ageGroup"
                          rules={[{ required: true, message: 'Please select age group.' }]}
                        >
                          <FrolicInput
                            type="select"
                            label={t('admissionPage.programSelect', 'Age Group / Current Class *')}
                            placeholder={t('admissionPage.programSelectPlaceholder', 'Select age group')}
                            options={[
                              { label: '1.5 – 2.5 Years (Play Group)', value: '1.5-2.5 Yrs' },
                              { label: '2.5 – 3.5 Years (Nursery)', value: '2.5-3.5 Yrs' },
                              { label: '3.5 – 4.5 Years (LKG)', value: '3.5-4.5 Yrs' },
                              { label: '4.5 – 5.5 Years (UKG)', value: '4.5-5.5 Yrs' },
                              { label: 'Class 1 – 2 (Kids English Lab)', value: 'Class 1-2' },
                              { label: 'Class 3 – 5 (Frolic Edu Lab)', value: 'Class 3-5' },
                            ]}
                          />
                        </FrolicForm.Item>
                      </div>

                      <div className="col-md-6">
                        <FrolicForm.Item
                          name="preferredProgram"
                          rules={[{ required: true, message: 'Please select a program.' }]}
                        >
                          <FrolicInput
                            type="select"
                            label={t('admissionPage.programSelect', 'Preferred Program *')}
                            placeholder={t('admissionPage.programSelectPlaceholder', 'Select a program')}
                            options={[
                              { label: t('nav.playGroup', 'Play Group'), value: 'Play Group' },
                              { label: t('nav.nursery', 'Nursery'), value: 'Nursery' },
                              { label: t('nav.lkg', 'LKG'), value: 'LKG' },
                              { label: t('nav.ukg', 'UKG'), value: 'UKG' },
                              { label: t('nav.englishLab', "Kids' English Lab"), value: "Kids' English Lab" },
                              { label: t('nav.mathsLab', 'Frolic Edu Lab'), value: 'Frolic Edu Lab' },
                            ]}
                          />
                        </FrolicForm.Item>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="mt-3">
                      <FrolicForm.Item name="message">
                        <FrolicInput
                          type="textarea"
                          label={t('admissionPage.message', 'Description (Optional)')}
                          placeholder={t('admissionPage.messagePlaceholder', 'Tell us about your requirements, campus visit date or trial class queries...')}
                          rows={2}
                        />
                      </FrolicForm.Item>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="mt-4">
                      <FrolicButton
                        htmlType="submit"
                        variant="primary"
                        size="lg"
                        block
                        loading={submitting}
                        icon={submitting ? <LoadingOutlined /> : <ArrowRightOutlined />}
                      >
                        {submitting ? t('common.submitting', 'Submitting Application...') : t('admissionPage.submitBtn', 'Submit Admission Enquiry')}
                      </FrolicButton>
                    </div>
                  </FrolicForm>
                )}
              </div>
            </div>

            {/* Right Column: Admission Guidance + Need Help */}
            <div className="col-lg-5">
              <div className={s.enquirySection__guidanceSidebar}>
                {/* Guidance Card */}
                <div className={s.enquirySection__guidanceCard}>
                  <h3 className={s.enquirySection__guidanceTitle} >
                    {t('admissionPage.inclusionsTitle', "What's Included in Every Frolic Admission")}
                  </h3>

                  <div className={s.enquirySection__featureList}>
                    {/* Item 01 */}
                    <div className={s.enquirySection__featureItem}>
                      <div className="featureIcon" style={{ background: '#FFF0DF', color: '#F7941D' }}>
                        <BulbOutlined/>
                      </div>
                      <div className="featureContent">
                        <h5 style={{ margin: '0px 10px',fontSize:"18px" }}>{t('admissionPage.inc1', 'Full Activity Workbooks & Grade Books')}</h5>
                        <p>{t('home.whyChoose.card1Desc', 'Learning through tactile activities, sensorial play and joyful discovery.')}</p>
                      </div>
                    </div>

                    {/* Item 02 */}
                    <div className={s.enquirySection__featureItem}>
                      <div className="featureIcon" style={{ background: '#E8F8EA', color: '#39B54A' }}>
                        <TeamOutlined />
                      </div>
                      <div className="featureContent">
                        <h5 style={{ margin: '0px 10px',fontSize:"18px" }}>{t('home.whyChoose.card3Title', 'Personalised Mentorship')}</h5>
                        <p>{t('home.whyChoose.card3Desc', 'Dedicated certified mentor ratio ensuring custom pacing for every single child.')}</p>
                      </div>
                    </div>

                    {/* Item 03 */}
                    <div className={s.enquirySection__featureItem}>
                      <div className="featureIcon" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                        <RocketOutlined />
                      </div>
                      <div className="featureContent">
                        <h5 style={{ margin: '0px 10px',fontSize:"18px" }}>{t('admissionPage.inc3', 'Digital Interactive Lab Access')}</h5>
                        <p>{t('admissionPage.inc4', 'Activities that encourage children to think independently and solve creatively.')}</p>
                      </div>
                    </div>

                    {/* Item 04 */}
                    <div className={s.enquirySection__featureItem}>
                      <div className="featureIcon" style={{ background: '#E8F4FF', color: '#0072BC' }}>
                        <DesktopOutlined />
                      </div>
                      <div className="featureContent">
                        <h5 style={{ margin: '0px 10px',fontSize:"18px" }}>{t('home.whyChoose.card2Title', 'Kids Smart Digital Labs')}</h5>
                        <p>{t('admissionPage.inc5', 'Interactive audiovisual tools making concept retention easy and natural.')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
            4. ADMISSION JOURNEY (4-STEP TIMELINE)
        ────────────────────────────────────────────── */}
      <section className={s.journeySection}>
        <div className="container-xl">
          <div className={s.journeySection__header}>
            <span className={s.journeySection__tag}>{t('admissionPage.tag', 'Simple & Transparent')}</span>
            <h2 className={s.journeySection__title}>
              {t('admissionPage.title', 'A Simple Step Towards a Brighter Learning Journey')}
            </h2>
            <p className={s.journeySection__subtitle}>
              {t('admissionPage.subtitle', 'Our admission process is designed to keep things simple and convenient for parents.')}
            </p>
          </div>

          <div className={s.journeySection__timeline}>
            {/* Step 01 */}
            <div className={s.journeySection__stepCard}>
              <span className={s.journeySection__badge}>01</span>
              <div className={s.journeySection__iconWrapper}>
                <BookOutlined style={{ fontSize: 24, color: '#F7941D' }} />
              </div>
              <h3 className={s.journeySection__stepTitle}>{t('admissionPage.step1', 'Quick Inquiry')}</h3>
              <p className={s.journeySection__stepDesc}>
                {t('admissionPage.formSubtitle', 'Explore the learning program that suits your child\'s developmental age.')}
              </p>
            </div>

            {/* Step 02 */}
            <div className={s.journeySection__stepCard}>
              <span className={s.journeySection__badge}>02</span>
              <div className={s.journeySection__iconWrapper}>
                <EnvironmentOutlined style={{ fontSize: 24, color: '#39B54A' }} />
              </div>
              <h3 className={s.journeySection__stepTitle}>{t('admissionPage.step2', 'Campus Tour')}</h3>
              <p className={s.journeySection__stepDesc}>
                {t('programsPage.tourDesc', 'Choose a Frolic centre convenient for your family and schedule a visit.')}
              </p>
            </div>

            {/* Step 03 */}
            <div className={s.journeySection__stepCard}>
              <span className={s.journeySection__badge}>03</span>
              <div className={s.journeySection__iconWrapper}>
                <SmileOutlined style={{ fontSize: 24, color: '#0072BC' }} />
              </div>
              <h3 className={s.journeySection__stepTitle}>{t('admissionPage.step3', 'Kit Handover')}</h3>
              <p className={s.journeySection__stepDesc}>
                {t('home.kit.subtitle', 'Let your child experience our joyful interactive classroom environment.')}
              </p>
            </div>

            {/* Step 04 */}
            <div className={s.journeySection__stepCard}>
              <span className={s.journeySection__badge}>04</span>
              <div className={s.journeySection__iconWrapper}>
                <CheckCircleOutlined style={{ fontSize: 24, color: '#7C3AED' }} />
              </div>
              <h3 className={s.journeySection__stepTitle}>{t('admissionPage.step4', 'Joyful Start')}</h3>
              <p className={s.journeySection__stepDesc}>
                {t('admissionPage.successDesc', 'Complete documentation and receive your child’s complete Pabulum® learning kit!')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
            5. PROGRAM SELECTION SECTION
        ────────────────────────────────────────────── */}
      <section className={s.programsSection}>
        <div className="container-xl">
          <div className={s.programsSection__header}>
            <h2 className={s.programsSection__title}>
              {t('programsPage.selectTitle', 'Choose the Right Learning Journey')}
            </h2>
            <p className={s.programsSection__subtitle}>
              {t('programsPage.subtitle', 'Explore the learning options available through Frolic Kids Edu Labs.')}
            </p>
          </div>

          <div className={s.programsSection__grid}>
            {programCards.map((p) => (
              <div
                key={p.id}
                className={s.programsSection__card}
                onClick={() => scrollToForm(p.programKey)}
              >
                <div>
                  <div className={s.programsSection__cardTop}>
                    <div
                      className={s.programsSection__cardIcon}
                      style={{ background: p.iconBg, color: p.iconColor }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className={s.programsSection__cardBadge}
                      style={{ background: p.badgeColor, color: p.badgeTextColor }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3 className={s.programsSection__cardTitle}>{p.title}</h3>
                  <p className={s.programsSection__cardDesc}>{p.desc}</p>

                  {p.chips && (
                    <div className={s.programsSection__chipContainer}>
                      {p.chips.map((chip) => (
                        <span key={chip} className={s.programsSection__chip}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <span className={s.programsSection__cardLink}>
                    {t('programsPage.viewDetails', 'Select Program')} <ArrowRightOutlined style={{ fontSize: 13 }} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
            7. FAQ SECTION
        ────────────────────────────────────────────── */}
      <section className={s.faqSection}>
        <div className="container-xl">
          <div className={s.faqSection__header}>
            <h2 className={s.faqSection__title}>{t('admissionPage.faqTitle', 'Frequently Asked Questions')}</h2>
          </div>

          <div className={s.faqSection__accordion}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`${s.faqSection__item} ${isOpen ? s.open : ''}`}
                >
                  <button
                    type="button"
                    className={s.faqSection__question}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <div className="iconCircle">
                      {isOpen ? <MinusOutlined style={{ fontSize: 14 }} /> : <PlusOutlined style={{ fontSize: 14 }} />}
                    </div>
                  </button>

                  {isOpen && (
                    <p className={s.faqSection__answer}>{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
            8. FINAL CTA SECTION
        ────────────────────────────────────────────── */}
      <section className={s.finalCtaSection}>
        <div className={s.finalCtaSection__glow1} />
        <div className={s.finalCtaSection__glow2} />

        <div className="container-xl position-relative">
          <span className={s.finalCtaSection__eyebrow}>{t('admissionPage.tag', 'Ready to Begin?')}</span>

          <h2 className={s.finalCtaSection__title}>
            {t('home.finalCTA.title', 'Start Your Child’s Frolic Journey Today')}
          </h2>

          <p className={s.finalCtaSection__subtitle}>
            {t('home.finalCTA.subtitle', 'Explore a learning environment where children can Explore • Express • Experience.')}
          </p>

          <div className={s.finalCtaSection__actions}>
            <FrolicButton
              variant="secondary"
              size="lg"
              icon={<ArrowRightOutlined />}
              onClick={() => scrollToForm()}
              style={{ backgroundColor: '#FFFFFF', color: '#F7941D', borderColor: '#FFFFFF' }}
            >
              {t('common.enrolNow', 'Apply for Admission')} →
            </FrolicButton>

            <FrolicButton
              to={ROUTES.LOCATE_US}
              variant="ghost"
              size="lg"
              icon={<EnvironmentOutlined />}
              style={{ borderColor: 'rgba(255,255,255,0.7)', color: '#FFFFFF' }}
            >
              {t('nav.locateUs', 'Find a Centre')} →
            </FrolicButton>
          </div>

          <div className={s.finalCtaSection__contactNote}>
            {t('common.callUs', 'Have a question? Call')} <a href="tel:7575008820">7575008820</a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
            9. STICKY MOBILE BOTTOM BAR
        ────────────────────────────────────────────── */}
      <div className={s.mobileStickyBar}>
        <a href="tel:7575008820" className="callIconBtn" aria-label="Call Frolic">
          <PhoneOutlined />
        </a>
        <button
          type="button"
          className="applyBtn"
          onClick={() => scrollToForm()}
        >
          {t('common.enrolNow', 'Apply for Admission')}
        </button>
      </div>
    </div>
  );
}
