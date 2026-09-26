const { sequelize } = require('../config/db');
const { Product } = require('../models');

const seedModularProducts = async () => {
  try {
    console.log('Synchronizing Product model...');
    await sequelize.sync({ alter: true });
    console.log('✅ Product table altered with images, sizes, and specifications columns.');

    const productsData = [
      {
        id: 1,
        title: 'Frolic Signature Orange Polo T-Shirt',
        slug: 'frolic-signature-polo-tshirt',
        category: 'uniforms',
        badge: 'Official Uniform',
        badgeColor: 'orange',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop'
        ],
        sizes: ['2 – 3 Years', '3 – 4 Years', '4 – 5 Years', '5 – 6 Years'],
        price: '₹399',
        subPrice: 'MRP: ₹549 (Inclusive of all taxes)',
        description: 'Official preschool uniform polo t-shirt crafted from 100% bio-washed pique cotton. Features an anti-curl reinforced collar, scratch-free inner neck tag, and embroidered Frolic crest. Engineered for all-day comfort and play.',
        specifications: {
          material: '100% Bio-Washed Pique Combed Cotton',
          fit: 'Regular Ergonomic Fit for Toddlers',
          collar: 'Non-Roll Ribbed Knit Collar',
          care: 'Machine Wash Cold, Gentle Cycle',
          certifications: 'OEKO-TEX Certified Skin-Safe & Azo-Free Dyes'
        },
        items: [
          'Signature Frolic Golden-Orange Colorway',
          'Embroidered Shield Crest with High-Density Thread',
          'Breathable Honeycomb Pique Weave',
          'Double-Stitched Reinforced Hemlines'
        ],
        inStock: true,
        sortOrder: 1,
        isActive: true,
      },
      {
        id: 2,
        title: 'Frolic Activity Round-Neck T-Shirt',
        slug: 'frolic-activity-roundneck-tee',
        category: 'uniforms',
        badge: 'Play Lab Tee',
        badgeColor: 'blue',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop'
        ],
        sizes: ['2 – 3 Years', '3 – 4 Years', '4 – 5 Years', '5 – 6 Years'],
        price: '₹349',
        subPrice: 'MRP: ₹499 (Inclusive of all taxes)',
        description: 'Lightweight and super-soft sky blue cotton activity t-shirt. Ideal for sensory play sessions, outdoor discovery labs, and messy art experiments. Quick-drying and hypoallergenic.',
        specifications: {
          material: '100% Super-Combed Ring-Spun Cotton',
          neckline: 'Flexible Ribbed Crew Neck for Easy Wear',
          weight: '180 GSM Featherlight Fabric',
          care: 'Machine Wash Safe, Colorfast',
          suitability: 'Preschool Active Play & Sports Lab'
        },
        items: [
          'Sky Blue Cheerful Activity Palette',
          'Soft Stretchable Ribbed Collar (No Head Squeeze)',
          'Hypoallergenic Screen-Printed Frolic Logo',
          'Sweat-Absorbent Natural Cotton Fibers'
        ],
        inStock: true,
        sortOrder: 2,
        isActive: true,
      },
      {
        id: 3,
        title: 'Athletic Breathable Track Pants',
        slug: 'athletic-track-pants',
        category: 'uniforms',
        badge: 'Comfort Fit',
        badgeColor: 'green',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop'
        ],
        sizes: ['2 – 3 Years', '3 – 4 Years', '4 – 5 Years', '5 – 6 Years'],
        price: '₹399',
        subPrice: 'MRP: ₹549 (Inclusive of all taxes)',
        description: 'Ultra-flexible navy blue athletic track pants designed with toddler movements in mind. Features a wide non-pinching elastic waistband, functional drawstring, and ribbed ankle cuffs preventing drag.',
        specifications: {
          material: '95% Combed Cotton, 5% Spandex Stretch',
          waistband: 'Soft Encased Elastic + Internal Drawstring',
          cuffs: 'Ribbed Ankle Grip (Anti-Trip)',
          care: 'Machine Wash Normal',
          durability: 'Double-Layered Reinforced Knee Panels'
        },
        items: [
          'Flexible Stretch Fabric for Climbing & Sitting',
          'Anti-Pinch Encased Waistband',
          'Ankle Rib Cuffs for Snug Shoe Fit',
          'Deep Side Pockets for Little Treasures'
        ],
        inStock: true,
        sortOrder: 3,
        isActive: true,
      },
      {
        id: 4,
        title: 'Comfort-Fit Stretch Denim Jeans',
        slug: 'comfort-denim-jeans',
        category: 'uniforms',
        badge: 'Daily Wear',
        badgeColor: 'blue',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop'
        ],
        sizes: ['2 – 3 Years', '3 – 4 Years', '4 – 5 Years', '5 – 6 Years'],
        price: '₹499',
        subPrice: 'MRP: ₹699 (Inclusive of all taxes)',
        description: 'Super-soft washed denim engineered specifically for preschool learners. No harsh metal buttons or tight zippers — uses an easy pull-on soft waistband that children can manage independently.',
        specifications: {
          material: 'Lightweight 8.5 oz Stretch Knitted Denim',
          closure: 'Pull-On Full Elastic Waist (No Zip/Metal Snaps)',
          wash: 'Enzyme Bio-Washed for Feather Softness',
          care: 'Machine Wash Cold, Hang Dry'
        },
        items: [
          'Easy Pull-On Waist Supporting Toilet Independence',
          'Zero Scratchy Metal Hardware',
          'Reinforced Triple-Stitched Seams',
          'Versatile Dark Indigo Shade'
        ],
        inStock: true,
        sortOrder: 4,
        isActive: true,
      },
      {
        id: 5,
        title: 'Ergonomic Preschool Backpack (14L)',
        slug: 'ergonomic-school-backpack-14l',
        category: 'kits',
        badge: 'Waterproof 14L',
        badgeColor: 'purple',
        image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop'
        ],
        sizes: ['One Size (14 Litres)'],
        price: '₹699',
        subPrice: 'MRP: ₹999 (Inclusive of all taxes)',
        description: 'Spine-supportive, featherlight school backpack built with water-resistant 600D ballistic polyester. Features contoured honeycomb-padded straps, twin water bottle mesh pockets, safety reflective trims, and a clear name card holder.',
        specifications: {
          capacity: '14 Litres (Holds books, apron, lunchbox)',
          weight: 'Only 320 grams empty',
          material: '600D Water-Repellent High-Density Oxford',
          zippers: 'Chunky Child-Friendly Smooth Glide Zips',
          safety: 'Reflective Night Strips on Both Straps'
        },
        items: [
          'Contoured S-Shape Padded Shoulder Straps',
          'Dual Mesh Beverage & Umbrella Side Sleeves',
          'Moisture-Proof Wipe-Clean Inner Lining',
          'Built-In Interior Divider for Workbooks'
        ],
        inStock: true,
        sortOrder: 5,
        isActive: true,
      },
      {
        id: 6,
        title: 'Water-Resistant Art & Activity Apron',
        slug: 'water-resistant-art-apron',
        category: 'stationery',
        badge: 'Mess-Proof',
        badgeColor: 'green',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop'
        ],
        sizes: ['Universal Toddler Size (Ages 2–6)'],
        price: '₹199',
        subPrice: 'MRP: ₹299 (Inclusive of all taxes)',
        description: 'Waterproof and stain-resistant activity smock protecting classroom uniforms from paints, water play, and clay. Features adjustable velcro neck closures and long sleeves with soft elastic wrists.',
        specifications: {
          material: 'BPA-Free Waterproof Polyurethane Fabric',
          closure: 'Back Velcro Quick-Release',
          pockets: '3 Front Storage Pockets for Brushes',
          care: 'Wipe with Damp Sponge or Gentle Machine Rinse'
        },
        items: [
          'Full-Front & Sleeve Protection',
          'Lightweight Breathable Membrane',
          'Easy Wipe-Clean Surface',
          'Front Pouches for Art Brushes & Crayons'
        ],
        inStock: true,
        sortOrder: 6,
        isActive: true,
      },
      {
        id: 7,
        title: 'Complete Frolic Premium Student Kit',
        slug: 'frolic-premium-student-kit',
        category: 'kits',
        badge: 'All-in-One 9-Pack',
        badgeColor: 'orange',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&auto=format&fit=crop'
        ],
        sizes: ['2 – 3 Years', '3 – 4 Years', '4 – 5 Years', '5 – 6 Years'],
        price: '₹2,499',
        subPrice: 'MRP: ₹3,200 (Bundle Savings ₹701)',
        description: 'The complete starter kit containing all official school uniforms, gear, and daily essentials. Includes 14L backpack, orange polo shirt, round-neck activity tee, soft denim jeans, track pants, sun visor cap, waterproof apron, ankle socks, and ID card cover.',
        specifications: {
          itemsCount: '9 Official Campus Essentials Included',
          uniformFabric: '100% Pique Combed Cotton',
          backpack: '14L Waterproof Ballistic Polyester',
          safety: 'Zero Harsh Chemicals, 100% Child Certified'
        },
        items: [
          'Ergonomic 14L School Backpack',
          'Frolic Signature Orange Polo Shirt',
          'Casual Round-Neck Activity T-Shirt',
          'Comfort-Fit Stretch Denim Jeans',
          'Breathable Athletic Track Pants',
          'Embroidered Sun Visor Cap',
          'Water-Resistant Art Smock Apron',
          '2 Pairs of Cotton Ankle Socks',
          'Frolic Campus Lanyard & ID Card Cover'
        ],
        inStock: true,
        sortOrder: 7,
        isActive: true,
      },
      {
        id: 8,
        title: 'Pabulum® Academic Workbook & Phonics Set',
        slug: 'pabulum-academic-workbook-phonics-set',
        category: 'books',
        badge: 'Curriculum Core',
        badgeColor: 'blue',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop'
        ],
        sizes: ['Complete Academic Set (4 Volumes)'],
        price: '₹1,299',
        subPrice: 'Full Academic Year Pack',
        description: 'Structured 4-volume preschool curriculum workbooks featuring 44 phonemes, guided pencil tracings, shape sequencing, cognitive logic drills, and 100+ milestone achievement stickers.',
        specifications: {
          volumes: '4 Complete Bound Workbooks',
          pages: '320 High-GSM Heavy Activity Paper',
          binding: 'Spiral Lay-Flat Binding for Easy Writing',
          curriculum: 'Aligned with NEP 2020 & NCF-FS Foundational Standards'
        },
        items: [
          'Volume 1: Phonemic Sounds & Pre-Writing Strokes',
          'Volume 2: CVC Words & Early Vocabulary Building',
          'Volume 3: Number Sense & Spatial Reasoning',
          'Volume 4: Environmental Discovery (EVS)',
          'Over 100 Reward Activity Stickers'
        ],
        inStock: true,
        sortOrder: 8,
        isActive: true,
      }
    ];

    for (const p of productsData) {
      await Product.upsert(p);
      console.log(`✓ Seeded/Updated product: ${p.title} (${p.slug})`);
    }

    console.log('✅ All modular products successfully seeded to MySQL!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedModularProducts();
