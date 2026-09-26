const { sequelize } = require('../config/db');
const AdminUser = require('./AdminUser');
const Admission = require('./Admission');
const FranchiseEnquiry = require('./FranchiseEnquiry');
const Program = require('./Program');
const Testimonial = require('./Testimonial');
const MediaGallery = require('./MediaGallery');
const Blog = require('./Blog');
const ContactMessage = require('./ContactMessage');
const Center = require('./Center');
const Product = require('./Product');
const KitOrder = require('./KitOrder');
const Event = require('./Event');
const Award = require('./Award');

const models = {
  AdminUser,
  Admission,
  FranchiseEnquiry,
  Program,
  Testimonial,
  MediaGallery,
  Blog,
  ContactMessage,
  Center,
  Product,
  KitOrder,
  Event,
  Award,
};


module.exports = {
  sequelize,
  ...models,
};

