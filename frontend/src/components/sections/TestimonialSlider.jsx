import React, { useState, useEffect } from 'react';
import { Carousel, Card, Rate, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SectionHeading from '../common/SectionHeading';
import { testimonialService } from '../../services';

const FALLBACK_TESTIMONIALS = [
  {
    name: 'Pooja & Jignesh Patel',
    role: 'Parent of Aarav (UKG)',
    rating: 5,
    quote: 'Frolic is not a typical preschool; it is truly an educational lab! Aarav started reading English storybooks independently at age 5. The DIEL digital software and Pabulum workbooks made a tremendous difference.',
  },
  {
    name: 'Meghna Shah',
    role: 'Parent of Ananya (LKG)',
    rating: 5,
    quote: 'The Maths Lab with abacus has given Ananya incredible confidence in numbers. She visualizes beads and calculates mentally faster than we expected. Outstanding teaching methodology!',
  },
  {
    name: 'Dr. Hardik Vyas',
    role: 'Franchise Partner, Gandhinagar Center',
    rating: 5,
    quote: 'Partnering with Frolic Education was the best decision. The curriculum backing from Manovikas Mulyankan Sanstha, comprehensive teacher training, and complete branding support made center operations seamless.',
  },
  {
    name: 'Ritu & Sanjay Sharma',
    role: 'Parent of Kabir (Nursery)',
    rating: 5,
    quote: 'The warmth and safety at Frolic Gandhinagar gave us immense peace of mind. Kabir loves the sensory activities and looks forward to going to school every single morning!',
  },
];

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    testimonialService
      .getAll()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setTestimonials(res.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Voices of Frolic Family"
          title="What Parents & Partners"
          highlight="Love About Us"
          subtitle="Real stories from parents witnessing accelerated linguistic fluency, numerical confidence, and joyful curiosity."
        />

        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <Carousel autoplay autoplaySpeed={4000} dots={{ className: 'custom-carousel-dots' }}>
            {testimonials.map((item, idx) => (
              <div key={idx} style={{ padding: '12px 8px' }}>
                <Card
                  style={{
                    borderRadius: 28,
                    border: '1.5px solid rgba(245, 130, 31, 0.2)',
                    background: 'linear-gradient(180deg, #FFF8EF 0%, #FFFFFF 100%)',
                    boxShadow: '0 16px 40px rgba(245, 130, 31, 0.1)',
                    textAlign: 'center',
                    padding: '24px 20px',
                  }}
                  styles={{ body: { padding: '24px 16px' } }}
                >
                  <div style={{ fontSize: '3rem', color: '#F5821F', opacity: 0.3, lineHeight: 1, marginBottom: 8 }}>
                    “
                  </div>

                  <p
                    style={{
                      fontSize: '1.12rem',
                      fontStyle: 'italic',
                      color: '#444444',
                      lineHeight: 1.8,
                      marginBottom: 24,
                      maxWidth: 680,
                      marginInline: 'auto',
                    }}
                  >
                    {item.quote}
                  </p>

                  <Rate disabled defaultValue={item.rating || 5} style={{ color: '#FDB913', fontSize: '1.1rem', marginBottom: 16 }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    <Avatar
                      size={50}
                      icon={<UserOutlined />}
                      style={{
                        background: 'linear-gradient(135deg, #F5821F, #FDB913)',
                        boxShadow: '0 4px 12px rgba(245, 130, 31, 0.35)',
                      }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#222222' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#777777', fontWeight: 600 }}>
                        {item.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
