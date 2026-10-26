const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Program = sequelize.define('Program', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'preschool', // 'preschool', 'lab', 'training'
  },
  categoryLabel: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Preschool Foundation',
  },
  ageGroup: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '1.5 – 6 Years',
  },
  badgeText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tagline: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accentColor: {
    type: DataTypes.STRING,
    defaultValue: '#F7941D',
  },
  gradient: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  heroBg: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/assets/hero_kids_clean.png',
  },
  heroOverlay: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  iconType: {
    type: DataTypes.STRING,
    defaultValue: 'BookOutlined',
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  overview: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quickSpecs: {
    type: DataTypes.JSON,
    defaultValue: {},
    // { schedule, ratio, kit, safety, duration }
  },
  keyHighlights: {
    type: DataTypes.JSON,
    defaultValue: [],
    // [{ title, desc }]
  },
  pillars: {
    type: DataTypes.JSON,
    defaultValue: [],
    // [{ number, title, icon, color, desc }]
  },
  curriculum: {
    type: DataTypes.JSON,
    defaultValue: [],
    // [{ step, details }]
  },
  milestones: {
    type: DataTypes.JSON,
    defaultValue: [],
    // ["Speaks in full sentences", ...]
  },
  dailyRoutine: {
    type: DataTypes.JSON,
    defaultValue: [],
    // [{ time, title, icon, desc }]
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  translations: {
    type: DataTypes.JSON,
    defaultValue: {},
    // e.g. { gu: { title, tagline, shortDescription, overview }, hi: { ... } }
  },
}, {
  tableName: 'programs',
  timestamps: true,
  hooks: {
    beforeValidate: (program) => {
      if (program.title && !program.name) {
        program.name = program.title;
      } else if (program.name && !program.title) {
        program.title = program.name;
      }
    }
  }
});

module.exports = Program;
