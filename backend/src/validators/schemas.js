const Joi = require('joi');
const { ADMISSION_STATUS, FRANCHISE_STATUS, ROLES } = require('../config/constants');

const admissionSchema = Joi.object({
  childName: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': "Child's name is required",
    'string.empty': "Child's name cannot be empty",
  }),
  dob: Joi.date().iso().allow(null, '').optional(),
  parentName: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': "Parent's name is required",
  }),
  phone: Joi.string().trim().pattern(/^[0-9+ -]{8,15}$/).required().messages({
    'string.pattern.base': 'Please enter a valid phone number',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().allow(null, '').optional(),
  program: Joi.string().trim().required().messages({
    'any.required': 'Please select a program',
  }),
  preferredCenter: Joi.string().trim().default('Gandhinagar'),
  message: Joi.string().allow(null, '').optional(),
});

const updateAdmissionStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(ADMISSION_STATUS)).required(),
  notes: Joi.string().allow(null, '').optional(),
});

const franchiseSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Your name is required',
  }),
  phone: Joi.string().trim().pattern(/^[0-9+ -]{8,15}$/).required().messages({
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
  }),
  city: Joi.string().trim().required().messages({
    'any.required': 'City is required',
  }),
  state: Joi.string().trim().default('Gujarat'),
  spaceAvailableSqft: Joi.string().allow(null, '').optional(),
  investmentCapacity: Joi.string().allow(null, '').optional(),
  experience: Joi.string().allow(null, '').optional(),
  message: Joi.string().allow(null, '').optional(),
});

const updateFranchiseStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(FRANCHISE_STATUS)).required(),
  notes: Joi.string().allow(null, '').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    'any.required': 'Email or Username is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

const contactSchema = Joi.object({
  name: Joi.string().trim().required(),
  phone: Joi.string().allow(null, '').optional(),
  email: Joi.string().email().required(),
  subject: Joi.string().allow(null, '').optional(),
  message: Joi.string().trim().required(),
});

const programSchema = Joi.object({
  title: Joi.string().trim().allow(null, '').optional(),
  name: Joi.string().trim().allow(null, '').optional(),
  slug: Joi.string().trim().required(),
  ageGroup: Joi.string().trim().allow(null, '').optional(),
  badgeText: Joi.string().allow(null, '').optional(),
  category: Joi.string().trim().default('preschool'),
  categoryLabel: Joi.string().allow(null, '').optional(),
  courseCode: Joi.string().allow(null, '').optional(),
  tagline: Joi.string().allow(null, '').optional(),
  accentColor: Joi.string().allow(null, '').optional(),
  gradient: Joi.string().allow(null, '').optional(),
  heroBg: Joi.string().allow(null, '').optional(),
  heroOverlay: Joi.string().allow(null, '').optional(),
  image: Joi.string().allow(null, '').optional(),
  iconType: Joi.string().allow(null, '').optional(),
  icon: Joi.string().allow(null, '').optional(),
  shortDescription: Joi.string().allow(null, '').optional(),
  overview: Joi.string().allow(null, '').optional(),
  fullDescription: Joi.string().allow(null, '').optional(),
  quickSpecs: Joi.object().optional(),
  keyHighlights: Joi.array().optional(),
  pillars: Joi.array().optional(),
  curriculum: Joi.array().optional(),
  milestones: Joi.array().optional(),
  dailyRoutine: Joi.array().optional(),
  features: Joi.array().optional(),
  syllabusContent: Joi.array().optional(),
  sortOrder: Joi.number().integer().default(0),
  isActive: Joi.boolean().default(true),
}).custom((val, helpers) => {
  if (!val.title && !val.name) {
    return helpers.error('any.custom', { message: 'Either title or name is required' });
  }
  return val;
});

const testimonialSchema = Joi.object({
  name: Joi.string().trim().required(),
  role: Joi.string().default('Parent'),
  childName: Joi.string().allow(null, '').optional(),
  program: Joi.string().allow(null, '').optional(),
  rating: Joi.number().integer().min(1).max(5).default(5),
  quote: Joi.string().trim().required(),
  photoUrl: Joi.string().allow(null, '').optional(),
  videoUrl: Joi.string().allow(null, '').optional(),
  isPublished: Joi.boolean().default(true),
  sortOrder: Joi.number().integer().default(0),
});

const blogSchema = Joi.object({
  title: Joi.string().trim().required(),
  slug: Joi.string().trim().required(),
  summary: Joi.string().trim().required(),
  content: Joi.string().required(),
  coverImage: Joi.string().allow(null, '').optional(),
  author: Joi.string().default('Frolic Edu Team'),
  category: Joi.string().default('Early Education'),
  readTime: Joi.string().default('4 min read'),
  isPublished: Joi.boolean().default(true),
});

module.exports = {
  admissionSchema,
  updateAdmissionStatusSchema,
  franchiseSchema,
  updateFranchiseStatusSchema,
  loginSchema,
  contactSchema,
  programSchema,
  testimonialSchema,
  blogSchema,
};
