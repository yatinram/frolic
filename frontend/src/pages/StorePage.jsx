import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchOutlined,
  ShoppingOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ShopOutlined,
  InboxOutlined,
  TagsOutlined,
  ReadOutlined,
  SkinOutlined,
  AppstoreOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import {
  Input,
  Select,
  Spin,
  Empty,
  Tag,
  Divider,
  Button,
  notification,
} from 'antd';
import { productService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import { getImageUrl } from '../utils/imageUrl';
import s from './StorePage.module.scss';

export default function StorePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const CATEGORY_OPTIONS = [
    { value: 'all', label: t('store.allProducts', 'All Products'), icon: <AppstoreOutlined /> },
    { value: 'kits', label: t('store.completeKits', 'Kits & Bundles'), icon: <InboxOutlined /> },
    { value: 'uniforms', label: t('store.uniforms', 'Uniforms & Apparel'), icon: <SkinOutlined /> },
    { value: 'books', label: t('store.workbooks', 'Books & Phonics'), icon: <ReadOutlined /> },
    { value: 'stationery', label: t('store.stationery', 'Art & Stationery'), icon: <TagsOutlined /> },
    { value: 'digital', label: t('store.digitalTools', 'Digital Lab'), icon: <ShopOutlined /> },
  ];

  // Raw data from backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Instant on-change filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all active products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll({ activeOnly: 'true' });
      const items = res?.data || res || [];
      setProducts(Array.isArray(items) ? items : items?.data || []);
    } catch (err) {
      notification.error({
        title: 'Could not load products',
        description: 'Please check your connection and try again.',
        duration: 4,
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Instant real-time filtering on change
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter((p) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      // Search match across Title, Description, Items, Sizes, Category, Badge
      const matchesSearch =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.badge?.toLowerCase().includes(q) ||
        (Array.isArray(p.items) &&
          p.items.some((item) => item.toLowerCase().includes(q))) ||
        (Array.isArray(p.sizes) &&
          p.sizes.some((size) => size.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const hasActiveFilter = selectedCategory !== 'all' || searchQuery.trim() !== '';

  return (
    <div className={s.storePage}>

      {/* ── Page Header ── */}
      <section className={s.pageHeader}>
        <div className="container-xl">
          <div className={s.pageHeader__inner}>
            <div>
              <span className={s.pageHeader__label}>
                <ShoppingOutlined /> {t('store.tag', 'Official Frolic Student Store')}
              </span>
              <h1 className={s.pageHeader__title}>{t('store.title', 'Kits & Educational Materials')}</h1>
            </div>
            <div className={s.pageHeader__stats}>
              <div className={s.statItem}>
                <span className={s.statValue}>{filteredProducts.length}</span>
                <span className={s.statLabel}>Available</span>
              </div>
              <div className={s.statDivider} />
              <div className={s.statItem}>
                <span className={s.statValue}>100%</span>
                <span className={s.statLabel}>Genuine</span>
              </div>
              <div className={s.statDivider} />
              <div className={s.statItem}>
                <span className={s.statValue}>24–48h</span>
                <span className={s.statLabel}>Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-xl">

        {/* ── Instant On-Change Filter Bar (No Button Required) ── */}
        <div className={s.filterBar}>
          <div className={s.filterBar__fields}>
            <Select
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
              style={{ width: 230 }}
              size="large"
              options={CATEGORY_OPTIONS.map((c) => ({
                value: c.value,
                label: (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {c.icon} {c.label}
                  </span>
                ),
              }))}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefix={<SearchOutlined style={{ color: '#f7941d', fontSize: '16px' }} />}
              placeholder={t('common.search', 'Search by T-Shirt, Bag, Kit, size, book...')}
              allowClear
              size="large"
              style={{ minWidth: 320, flex: 1 }}
            />
          </div>

          <div className={s.filterBar__meta}>
            {hasActiveFilter && (
              <Button
                type="link"
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={handleClearFilters}
                style={{ color: '#ef4444', fontWeight: 700 }}
              >
                {t('common.filter', 'Clear Search')}
              </Button>
            )}
            <span className={s.resultCount}>
              Showing <strong>{filteredProducts.length}</strong> of {products.length} items
            </span>
          </div>
        </div>

  
        <Divider style={{ margin: '0 0 32px' }} />

        {/* ── Products Grid ── */}
        {loading ? (
          <div className={s.loadingState}>
            <Spin size="large" />
            <p>{t('common.loading', 'Loading products from server…')}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={s.emptyState}>
            <Empty
              description={
                <span style={{ fontSize: 14, color: '#64748b' }}>
                  No products matching &quot;{searchQuery || selectedCategory}&quot;.
                  <br />
                  <button onClick={handleClearFilters} className={s.resetLink}>
                    View all {products.length} products
                  </button>
                </span>
              }
            />
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id || product.slug} className="col-xl-3 col-lg-4 col-md-6">
                <ProductCard product={product} navigate={navigate} t={t} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* ── Individual Product Card Component ── */
function ProductCard({ product, navigate, t }) {
  const handleViewDetails = () => {
    navigate(`/store/${product.slug}`);
  };

  return (
    <div className={s.productCard} onClick={handleViewDetails}>
      {/* Image */}
      <div className={s.productCard__image}>
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/assets/kits.jpeg';
          }}
        />
        {product.badge && (
          <span className={s.productCard__badge}>
            {product.badge}
          </span>
        )}
        {product.inStock === false && (
          <span className={s.productCard__outOfStock}>Out of Stock</span>
        )}
      </div>

      {/* Content */}
      <div className={s.productCard__content}>
        <h3 className={s.productCard__title}>{product.title}</h3>
        
        {/* Sizes indicator */}
        {Array.isArray(product.sizes) && product.sizes.length > 0 && (
          <div className={s.productCard__sizeHint}>
            <SkinOutlined style={{ fontSize: 12 }} />
            <span>Available: {product.sizes.join(' · ')}</span>
          </div>
        )}

        {/* Footer */}
        <div className={s.productCard__footer}>
          <div>
            <div className={s.productCard__price}>{product.price}</div>
          </div>

          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className={s.viewBtn}
          >
            {t ? t('common.learnMore', 'View Details') : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  );
}
