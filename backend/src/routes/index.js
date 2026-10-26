const express = require('express');
const router = express.Router();

const admissionRoutes = require('./admissionRoutes');
const franchiseRoutes = require('./franchiseRoutes');
const programRoutes = require('./programRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const galleryRoutes = require('./galleryRoutes');
const authRoutes = require('./authRoutes');
const blogRoutes = require('./blogRoutes');
const contactRoutes = require('./contactRoutes');
const centerRoutes = require('./centerRoutes');
const productRoutes = require('./productRoutes');
const kitOrderRoutes = require('./kitOrderRoutes');
const eventRoutes = require('./eventRoutes');
const awardRoutes = require('./awardRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/admissions', admissionRoutes);
router.use('/franchise-enquiries', franchiseRoutes);
router.use('/programs', programRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/gallery', galleryRoutes);
router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/contacts', contactRoutes);
router.use('/centers', centerRoutes);
router.use('/products', productRoutes);
router.use('/orders', kitOrderRoutes);
router.use('/events', eventRoutes);
router.use('/awards', awardRoutes);
router.use('/upload', uploadRoutes);


router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Frolic Kids Edu Labs Enterprise API',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
