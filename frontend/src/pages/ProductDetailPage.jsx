import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  LeftOutlined,
  RightOutlined,
  ShoppingOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  SkinOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Button, Modal, Form, Input, Select, notification, Spin, Empty } from 'antd';
import confetti from 'canvas-confetti';
import { productService, orderService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import s from './ProductDetailPage.module.scss';
import { FrolicButton } from '../components/ui';
import { ROUTES } from '../constants/routes';

const STATE_OPTIONS = [
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Other', label: 'Other State' },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form] = Form.useForm();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const timerRef = useRef(null);

  // 1. Fetch product by slug from backend
  useEffect(() => {
    fetchProductDetails();
  }, [slug]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await productService.getBySlug(slug);
      const prod = res?.data || res;
      if (prod && (prod.title || prod.slug)) {
        setProduct(prod);

        // Normalize images array (at least 1 image)
        const allImages =
          Array.isArray(prod.images) && prod.images.length > 0
            ? prod.images
            : [prod.image];
        prod._imageList = allImages;

        // Set initial selected size if available
        if (Array.isArray(prod.sizes) && prod.sizes.length > 0) {
          setSelectedSize(prod.sizes[0]);
        }
      } else {
        setProduct(null);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // 2. Auto-sliding 2-second carousel
  const images = product?._imageList || [];

  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, isPaused]);

  const handleNextSlide = () => {
    if (images.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevSlide = () => {
    if (images.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleSelectThumbnail = (index) => {
    setCurrentSlide(index);
  };

  // 3. Purchase Modal Handlers
  const handleOpenPurchaseModal = () => {
    form.setFieldsValue({
      parentName: '',
      phone: '',
      state: 'Gujarat',
      city: '',
      address: '',
    });
    setIsModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOrderSubmit = async (values) => {
    try {
      setSubmitting(true);
      const payload = {
        parentName: values.parentName,
        phone: values.phone,
        productName: product.title,
        grade: selectedSize || 'Standard',
        quantity: 1,
        address: `${values.address}, ${values.city}, ${values.state}`,
        status: 'new',
        adminNotes: `Order from website store. Selected size: ${selectedSize || 'N/A'}. Price: ${product.price}`,
      };

      await orderService.create(payload);

      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      notification.success({
        message: 'Order Enquiry Received Successfully!',
        description: `Thank you, ${values.parentName}! Your order for "${product.title}" (${selectedSize ? `Size: ${selectedSize}` : ''}) has been registered. Our campus team will contact you shortly on ${values.phone}.`,
        duration: 6,
      });

      handleClosePurchaseModal();
    } catch (err) {
      console.error('Error placing order:', err);
      notification.error({
        message: 'Could not complete order',
        description: 'Please check your connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={s.productDetailPage}>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={s.productDetailPage}>
        <div className={s.contentWrapper} style={{ paddingTop: 60, textAlign: 'center' }}>
          <Empty description="Product not found" />
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/store')}
            style={{ marginTop: 20 }}
          >
            Back to Store
          </Button>
        </div>
      </div>
    );
  }

  const currentImage = images[currentSlide] || product.image;

  return (
    <div className={s.productDetailPage}>
      {/* ── Breadcrumb Navigation ── */}
      <div className={s.breadcrumbContainer}>
        <div className={s.contentWrapper}>
          <div className={s.breadcrumbNav}>
            <Link to="/">Home</Link>
            <span className={s.separator}>/</span>
            <Link to="/store">Store</Link>
            <span className={s.separator}>/</span>
            <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
            <span className={s.separator}>/</span>
            <span className={s.current}>{product.title}</span>
          </div>
        </div>
      </div>

      <div className={s.contentWrapper}>

        <div className={s.mainCard}>
          <div style={{display:"flex",justifyContent:"end",paddingBottom:"25px"}}>
            <FrolicButton to={ROUTES.STORE} variant="secondary" size="small" style={{ fontWeight: 600, padding: '6px 16px', fontSize: '0.9rem' }}>
              <ArrowLeftOutlined />  Back to Articles
            </FrolicButton>
          </div>
          <div className={s.productGrid}>

            {/* ── LEFT COLUMN: 2-SECOND AUTO-SLIDE CAROUSEL ── */}
            <div
              className={s.galleryColumn}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className={s.carouselFrame}>
                <img
                  src={currentImage}
                  alt={product.title}
                  className={s.mainImage}
                />

                {product.badge && (
                  <span className={s.badgeTag}>{product.badge}</span>
                )}

                {/* 2-Second Progress Bar */}
                {images.length > 1 && !isPaused && (
                  <div className={s.timerProgressBar}>
                    <div key={currentSlide} className={s.timerProgressFill} />
                  </div>
                )}

                {/* Manual Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${s.navArrow} ${s.prevArrow}`}
                      onClick={handlePrevSlide}
                      aria-label="Previous slide"
                    >
                      <LeftOutlined />
                    </button>
                    <button
                      type="button"
                      className={`${s.navArrow} ${s.nextArrow}`}
                      onClick={handleNextSlide}
                      aria-label="Next slide"
                    >
                      <RightOutlined />
                    </button>
                  </>
                )}
              </div>

              {/* Carousel Meta / Auto-slide indicator */}
              <div className={s.carouselMeta}>
                <span className={s.autoSlideNotice}>
                  <span className={s.liveDot} />
                  {isPaused ? 'Paused on hover' : 'Auto-sliding every 2 seconds'}
                </span>
                <span className={s.slideCounter}>
                  Image {currentSlide + 1} of {images.length}
                </span>
              </div>

              {/* 3 to 4 Clickable Thumbnails */}
              {images.length > 1 && (
                <div className={s.thumbnailStrip}>
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`${s.thumbItem} ${idx === currentSlide ? s.activeThumb : ''}`}
                      onClick={() => handleSelectThumbnail(idx)}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {/* Child Safety & Quality Guarantee */}
              <div className={s.trustBox}>
                <SafetyCertificateOutlined className={s.trustIcon} />
                <div className={s.trustText}>
                  <h4>Certified Child-Safe Quality</h4>
                  <p>
                    Non-toxic, hypoallergenic, and bio-washed materials ensuring zero skin irritation during daily preschool activities.
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: DETAILS, SIZES & PURCHASE ── */}
            <div className={s.detailsColumn}>
              <div>
                <div className={s.headerInfo}>
                  <div className={s.topRow}>
                    <span className={s.categoryBadge}>{product.category}</span>
                    <span className={s.skuText}>SKU: FRLC-{product.id?.toString().padStart(3, '0')}</span>
                  </div>

                  <h1 className={s.title}>{product.title}</h1>

                  <div className={s.pricingBlock}>
                    <span className={s.mainPrice}>{product.price}</span>
                    {product.subPrice && (
                      <span className={s.subPrice}>{product.subPrice}</span>
                    )}
                  </div>

                  <p className={s.description}>{product.description}</p>
                </div>

                {/* Size Selector for Apparel / T-Shirts */}
                {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                  <div className={s.sizeSection}>
                    <div className={s.sizeHeader}>
                      <span className={s.sizeLabel}>Select Child's Age / Size *</span>
                      <span className={s.selectedNotice}>Selected: {selectedSize}</span>
                    </div>
                    <div className={s.sizeGrid}>
                      {product.sizes.map((sizeOption) => (
                        <button
                          key={sizeOption}
                          type="button"
                          className={`${s.sizeBtn} ${selectedSize === sizeOption ? s.activeSize : ''}`}
                          onClick={() => setSelectedSize(sizeOption)}
                        >
                          {sizeOption}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications Key-Value Grid */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className={s.specsSection}>
                    <h4 className={s.specsHeading}>Material &amp; Specifications</h4>
                    <div className={s.specsGrid}>
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className={s.specRow}>
                          <span className={s.specKey}>{key}:</span>
                          <span className={s.specVal}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions / Highlights Checklist */}
                {Array.isArray(product.items) && product.items.length > 0 && (
                  <div className={s.itemsSection}>
                    <h4 className={s.itemsHeading}>Product Features &amp; Inclusions</h4>
                    <div className={s.itemsList}>
                      {product.items.map((item, idx) => (
                        <div key={idx} className={s.itemBullet}>
                          <CheckCircleOutlined className={s.bulletIcon} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Call-To-Action */}
              <div className={s.ctaContainer}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  className={s.purchaseBtn}
                  onClick={handleOpenPurchaseModal}
                >
                  {t('store.orderKit', 'Purchase This Item')} ({product.price})
                </Button>

                <div className={s.guaranteeRow}>
                  <span>
                    <SafetyCertificateOutlined /> Official Frolic Genuine
                  </span>
                  <span>
                    <SkinOutlined /> 100% Skin-Safe
                  </span>
                  <span>
                    <EnvironmentOutlined /> Direct Campus Collection / Courier
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── PURCHASE ORDER MODAL ── */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleClosePurchaseModal}
        footer={null}
        centered
        width={520}
        destroyOnClose
      >
        <div style={{ textAlign: 'center', marginBottom: 20, paddingTop: 10 }}>
          <ShoppingOutlined style={{ fontSize: 32, color: '#f7941d' }} />
          <h3 style={{ margin: '8px 0 2px', fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
            {t('store.orderModalTitle', 'Complete Your Order')}
          </h3>
        </div>

        {/* Customer Input Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOrderSubmit}
          initialValues={{ state: 'Gujarat' }}
        >
          <Form.Item
            name="parentName"
            label={<span style={{ fontWeight: 700, fontSize: 12 }}>{t('store.parentName', 'Parent / Customer Full Name')}</span>}
            rules={[{ required: true, message: t('common.required', 'Please enter your full name') }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
              placeholder="e.g. Rajesh Patel"
              size="large"
            />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Form.Item
              name="phone"
              label={<span style={{ fontWeight: 700, fontSize: 12 }}>{t('store.contactPhone', 'Mobile / WhatsApp No.')}</span>}
              rules={[
                { required: true, message: t('common.required', 'Please enter mobile number') },
                { pattern: /^[0-9]{10}$/, message: 'Must be 10 digits' },
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: '#94a3b8' }} />}
                placeholder="10-digit number"
                size="large"
                maxLength={10}
              />
            </Form.Item>

            <Form.Item
              name="state"
              label={<span style={{ fontWeight: 700, fontSize: 12 }}>State</span>}
              rules={[{ required: true, message: 'Please select state' }]}
            >
              <Select
                size="large"
                options={STATE_OPTIONS}
                suffixIcon={<GlobalOutlined />}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="city"
            label={<span style={{ fontWeight: 700, fontSize: 12 }}>{t('admissionPage.city', 'City / Town / Nearest Campus')}</span>}
            rules={[{ required: true, message: t('common.required', 'Please enter city') }]}
          >
            <Input
              prefix={<EnvironmentOutlined style={{ color: '#94a3b8' }} />}
              placeholder="e.g. Gandhinagar, Sargasan"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="address"
            label={<span style={{ fontWeight: 700, fontSize: 12 }}>{t('store.deliveryAddress', 'Full Delivery Address & Pincode')}</span>}
            rules={[{ required: true, message: t('common.required', 'Please enter full delivery address') }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="Flat/House No., Society/Street, Landmark, Pincode"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={submitting}
            style={{
              height: 48,
              fontSize: 15,
              fontWeight: 800,
              background: '#10b981',
              borderColor: '#10b981',
              marginTop: 10,
            }}
          >
            {submitting ? t('common.submitting', 'Placing Order...') : `${t('store.submitOrder', 'Confirm & Place Order')} (${product.price})`}
          </Button>

          <p style={{ margin: '12px 0 0', fontSize: 11, textAlign: 'center', color: '#94a3b8' }}>
            Zero upfront advance required. Direct campus handover or verified doorstep courier.
          </p>
        </Form>
      </Modal>
    </div>
  );
}
