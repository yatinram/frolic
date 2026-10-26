import React, { useState } from 'react';
import { notification } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { contactService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import {
  FrolicButton,
  FrolicInput,
  FrolicCard,
  FrolicTag,
  FrolicForm,
} from '../components/ui';
import WaveDivider from '../components/common/WaveDivider';
import s from './ContactPage.module.scss';

export default function ContactPage() {
  const { t } = useLanguage();
  const [form] = FrolicForm.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const res = await contactService.create(values);
      if (res.success) {
        notification.success({
          title: t('contactPage.successMsg', 'Message Sent Successfully! ✉️'),
          description:
            'Thank you for contacting Frolic Kids Edu Labs. We will respond to your message shortly.',
        });
        form.resetFields();
      }
    } catch (err) {
      notification.error({
        title: t('common.error', 'Could not send message'),
        description: err.message || 'Please try again or call us directly at 7575008820.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: <EnvironmentOutlined />,
      label: t('common.address', 'Center Location'),
      value: t('contactPage.addressVal', '109, R Services, Sriprad Aayansh, Sargasan, Gandhinagar, Gujarat 382421'),
      color: '#F7941D',
      bg: '#FFF4E5',
    },
    {
      icon: <PhoneOutlined />,
      label: t('common.phone', 'Phone / WhatsApp'),
      value: t('contactPage.phoneVal', '+91 75750 08820'),
      href: 'tel:+917575008820',
      color: '#4CAF50',
      bg: '#E8F8EA',
    },
    {
      icon: <MailOutlined />,
      label: t('common.email', 'Email Address'),
      value: t('contactPage.emailVal', 'frolickidsedulabs@gmail.com'),
      href: 'mailto:frolickidsedulabs@gmail.com',
      color: '#2196F3',
      bg: '#E8F4FF',
    },
    {
      icon: <ClockCircleOutlined />,
      label: t('contactPage.hours', 'Visiting Hours'),
      value: t('contactPage.hoursVal', 'Monday – Saturday: 9:00 AM – 5:00 PM'),
      color: '#9C27B0',
      bg: '#F9F0FF',
    },
  ];

  return (
    <div className={s.page}>
      <style>{`
        @keyframes floatBounceContact {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-14px) rotate(6deg); }
          66%       { transform: translateY(-6px) rotate(-3deg); }
        }
      `}</style>

      {/* Top Banner */}
      <section className={s.banner}>
        {/* Dot texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Floating emojis */}
        {['📞', '✉️', '📍', '✨', '💬', '🏫', '🌟', '🤝'].map((e, i) => (
          <span key={i} aria-hidden="true" style={{
            position: 'absolute',
            fontSize: i % 2 === 0 ? '2.2rem' : '1.6rem',
            opacity: 0.15,
            top: `${[10, 20, 55, 65, 30, 40, 75, 8][i]}%`,
            left: i < 4 ? `${[6, 88, 4, 90][i]}%` : undefined,
            right: i >= 4 ? `${[14, 10, 20, 38][i - 4]}%` : undefined,
            animation: `floatBounceContact ${5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>{e}</span>
        ))}

        <div className="container-xl position-relative" style={{ zIndex: 2, paddingBottom: 40 }}>
          <span className={s.banner__tag}>📞 {t('contactPage.tag', "We'd Love to Hear From You")}</span>
          <h1 className={s.banner__title}>{t('contactPage.title', 'Contact Frolic Kids Edu Labs')}</h1>
          <p className={s.banner__desc}>
            {t('contactPage.subtitle', 'Reach out for admissions, educator training, franchise inquiries, or campus visits.')}
          </p>
        </div>

        {/* Wave bottom — orange/yellow → cream */}
        <WaveDivider
          variant="wave2"
          topColor="transparent"
          bottomColor="#FFF8EF"
          height={60}
        />
      </section>

      <div className="container-xl mt-5">
        <div className="row g-5">
          {/* Left Column: Contact Cards */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-3">
              {contactCards.map((c) => (
                <FrolicCard key={c.label} variant="contact" {...c} hoverable />
              ))}
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="col-lg-7">
            <div className={s.formCard}>
              <div className="mb-4">
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#1A2016', margin: 0 }}>
                  ✉️ {t('contactPage.formTitle', 'Send Us a Direct Message')}
                </h3>
                <p style={{ color: '#7A827A', fontSize: '0.9rem', margin: '4px 0 0' }}>
                  {t('contactPage.formSubtitle', 'Have a question or want to schedule a visit? Drop your message below.')}
                </p>
              </div>

              <FrolicForm form={form} onFinish={onFinish}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <FrolicForm.Item
                      name="name"
                      rules={[{ required: true, message: t('common.required', 'Please enter your name') }]}
                    >
                      <FrolicInput
                        type="text"
                        label={t('contactPage.name', 'Your Full Name')}
                        placeholder={t('contactPage.namePlaceholder', 'e.g. Rahul Sharma')}
                        prefix={<UserOutlined style={{ color: '#F7941D' }} />}
                        required
                      />
                    </FrolicForm.Item>
                  </div>

                  <div className="col-sm-6">
                    <FrolicForm.Item
                      name="phone"
                      rules={[{ required: true, message: t('common.required', 'Please enter your phone number') }]}
                    >
                      <FrolicInput
                        type="tel"
                        label={t('contactPage.phone', 'Phone Number')}
                        placeholder={t('contactPage.phonePlaceholder', '10-digit mobile number')}
                        prefix={<PhoneOutlined style={{ color: '#4CAF50' }} />}
                        required
                      />
                    </FrolicForm.Item>
                  </div>

                  <div className="col-12">
                    <FrolicForm.Item
                      name="email"
                      rules={[{ type: 'email', message: 'Enter a valid email' }]}
                    >
                      <FrolicInput
                        type="email"
                        label={t('contactPage.email', 'Email Address')}
                        placeholder={t('contactPage.emailPlaceholder', 'you@example.com')}
                        prefix={<MailOutlined style={{ color: '#2196F3' }} />}
                      />
                    </FrolicForm.Item>
                  </div>

                  <div className="col-12">
                    <FrolicForm.Item
                      name="subject"
                      rules={[{ required: true, message: t('common.required', 'Please provide a subject') }]}
                    >
                      <FrolicInput
                        type="text"
                        label={t('contactPage.subject', 'Subject / Purpose')}
                        placeholder={t('contactPage.subjectPlaceholder', 'e.g. Admission Inquiry, Campus Visit, Franchise, Fee Details')}
                        required
                      />
                    </FrolicForm.Item>
                  </div>

                  <div className="col-12">
                    <FrolicForm.Item
                      name="message"
                      rules={[{ required: true, message: t('common.required', 'Please write your message') }]}
                    >
                      <FrolicInput
                        type="textarea"
                        label={t('contactPage.message', 'Your Message')}
                        placeholder={t('contactPage.messagePlaceholder', "Tell us what you'd like to learn about Frolic Kids Edu Labs...")}
                        rows={4}
                        required
                      />
                    </FrolicForm.Item>
                  </div>

                  <div className="col-12 mt-2">
                    <FrolicButton
                      htmlType="submit"
                      variant="primary"
                      size="lg"
                      block
                      loading={submitting}
                      icon={<SendOutlined />}
                    >
                      {submitting ? t('common.submitting', 'Sending...') : t('contactPage.sendBtn', 'Send Message')}
                    </FrolicButton>
                  </div>
                </div>
              </FrolicForm>
            </div>
          </div>
        </div>

        {/* Full-width Map Frame */}
        <div className={s.mapFrame}>
          <iframe
            title="Frolic Campus Location"
            src="https://maps.google.com/maps?q=Sargasan,Gandhinagar,Gujarat&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
