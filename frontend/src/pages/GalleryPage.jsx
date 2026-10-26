import React, { useState, useEffect, useRef } from 'react';
import { Empty } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { galleryService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import FloatingEnquireBtn from '../components/common/FloatingEnquireBtn';
import WhatsAppBubble from '../components/common/WhatsAppBubble';
import WaveDivider from '../components/common/WaveDivider';
import { getImageUrl } from '../utils/imageUrl';
import s from './GalleryPage.module.scss';

// Curated high-res gallery images
const FALLBACK_GALLERY = [
  { id: 1, imageUrl: '/assets/kits.jpeg' },
  { id: 2, imageUrl: '/assets/teacher_kids.png' },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&auto=format&fit=crop' },
  { id: 4, imageUrl: '/assets/hero_kids_clean.png' },
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop' },
  { id: 6, imageUrl: '/assets/hero_classroom.png' },
  { id: 7, imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop' },
  { id: 8, imageUrl: '/assets/hero_kids_desk.png' },
  { id: 9, imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&auto=format&fit=crop' },
  { id: 10, imageUrl: '/assets/learning_kit.png' },
  { id: 11, imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop' },
  { id: 12, imageUrl: '/assets/life_collage.png' },
];

export default function GalleryPage() {
  const { t } = useLanguage();
  const [galleryItems, setGalleryItems] = useState(FALLBACK_GALLERY);

  // Lightbox & Slider state
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentOffsetRef = useRef(0);

  useEffect(() => {
    galleryService
      .getAll()
      .then((res) => {
        const list = res?.data?.data || res?.data || (Array.isArray(res) ? res : []);
        if (Array.isArray(list)) {
          setGalleryItems(list);
        }
      })
      .catch(() => { });
  }, []);

  // Slider Navigation
  const goToPrev = () => {
    if (galleryItems.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setDragOffset(0);
  };

  const goToNext = () => {
    if (galleryItems.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
    setDragOffset(0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  // Keyboard navigation (Arrow keys & Esc)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryItems.length]);

  // Mouse drag & swipe handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentOffsetRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startXRef.current;
    currentOffsetRef.current = diff;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentOffsetRef.current;
    if (diff > 60) {
      goToPrev();
    } else if (diff < -60) {
      goToNext();
    }
    setDragOffset(0);
    currentOffsetRef.current = 0;
  };

  // Touch swipe handlers (Mobile support)
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentOffsetRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startXRef.current;
    currentOffsetRef.current = diff;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentOffsetRef.current;
    if (diff > 60) {
      goToPrev();
    } else if (diff < -60) {
      goToNext();
    }
    setDragOffset(0);
    currentOffsetRef.current = 0;
  };

  const activeItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div className={s.galleryPage}>
      <style>{`
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-16px) rotate(7deg); }
          66%       { transform: translateY(-7px) rotate(-4deg); }
        }
      `}</style>

      {/* ── Hero Banner ── */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #7B2D8B 0%, #E8453C 100%)',
          color: '#FFFFFF',
          padding: '120px 0 0',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
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
        {['🖼️', '📸', '🎨', '✨', '🏫', '🎭', '🌟', '🎉'].map((e, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              fontSize: i % 2 === 0 ? '2.2rem' : '1.6rem',
              opacity: 0.15,
              top: `${[10, 20, 60, 70, 35, 40, 80, 5][i]}%`,
              left: i < 4 ? `${[5, 88, 3, 90][i]}%` : undefined,
              right: i >= 4 ? `${[12, 10, 20, 40][i - 4]}%` : undefined,
              animation: `floatBounce ${5 + i * 0.6}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {e}
          </span>
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 60 }}>

          <h1
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 900,
              textShadow: '0 4px 24px rgba(0,0,0,0.25)',
              marginBottom: 14,
            }}
          >
            {t('nav.gallery', 'Frolic Gallery')}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.92)',
              maxWidth: 680,
              margin: '0 auto',
              fontSize: '1.15rem',
              lineHeight: 1.7,
              textShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}
          >
            {t('home.life.subtitle', 'A vibrant glimpse into our digital learning labs, creative classrooms, and student activities.')}
          </p>
        </div>

        {/* Wave bottom — purple-red → cream */}
        <WaveDivider
          variant="wave2"
          topColor="transparent"
          bottomColor="#FFF8EF"
          height={64}
        />
      </section>

      {/* ── Main Container (Pure Image Grid without any filters) ── */}
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <h3 style={{ color: "white", fontSize: '1.5rem', fontWeight: 800, border: "2px solid #4E2E55", padding: "10px 20px", borderRadius: "12px", background: 'linear-gradient(135deg, #7B2D8B 0%, #E8453C 100%)' }}>
            {t('nav.gallery', 'Frolic Photo Gallery')}
          </h3>
        </div>
        {galleryItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Empty description={t('common.loading', 'No photos available')} />
          </div>
        ) : (
          <div className={s.imageGrid}>
            {galleryItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className={s.imageCard}
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={getImageUrl(item.imageUrl)}
                  alt=""
                  className={s.cardImg}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800';
                  }}
                />
                <div className={s.cardOverlay}>
                  <div className={s.viewIconBadge}>
                    <EyeOutlined />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Interactive Swipeable / Draggable Lightbox Modal ── */}
      {lightboxIndex !== null && activeItem && (
        <div
          className={s.lightboxModal}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Header Bar */}
          <div className={s.lightboxHeader}>
            <div className={s.counterBadge}>
              {lightboxIndex + 1} / {galleryItems.length}
            </div>
            <button
              type="button"
              className={s.closeBtn}
              onClick={closeLightbox}
              aria-label="Close Preview"
            >
              <CloseOutlined />
            </button>
          </div>

          {/* Previous Arrow Button */}
          <button
            type="button"
            className={`${s.navArrowBtn} ${s.prevBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous Photo"
          >
            <LeftOutlined />
          </button>

          {/* Draggable Image Area (Mouse & Touch Swipe) */}
          <div
            className={`${s.lightboxBody} ${isDragging ? s.isDragging : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={s.lightboxImageContainer}
              style={{
                transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.03}deg)`,
              }}
            >
              <img
                src={getImageUrl(activeItem.imageUrl)}
                alt=""
                className={s.lightboxImage}
              />
            </div>

            <div className={s.dragHint}>
              👆 Drag or swipe with mouse / finger to slide photos
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            className={`${s.navArrowBtn} ${s.nextBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next Photo"
          >
            <RightOutlined />
          </button>

          {/* Bottom Thumbnails Strip */}
          <div className={s.thumbnailStrip}>
            {galleryItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`${s.thumbItem} ${lightboxIndex === idx ? s.activeThumb : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(idx);
                }}
              >
                <img src={item.imageUrl} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}

      <FloatingEnquireBtn />
      <WhatsAppBubble />
    </div>
  );
}
