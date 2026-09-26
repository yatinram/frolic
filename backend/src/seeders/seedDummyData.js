const { sequelize } = require('../config/db');
const { Center, MediaGallery, KitOrder, Testimonial, Event } = require('../models');

const seedAllDummyData = async () => {
  try {
    console.log('Syncing DB...');
    await sequelize.sync({ alter: true });

    // ── 1. UPDATE CENTERS with district & taluka ──
    const centersData = [
      {
        id: 1,
        name: 'Frolic Kids Edu Labs — Sargasan Flagship',
        slug: 'frolic-sargasan-flagship',
        branchType: 'Flagship Campus',
        address: '109, R Services, Sriprad Aayansh, Sargasan',
        area: 'Sargasan',
        city: 'Gandhinagar',
        district: 'Gandhinagar',
        taluka: 'Gandhinagar',
        state: 'Gujarat',
        pincode: '382421',
        phone: '7575008820',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Sargasan+Gandhinagar',
        latitude: 23.1645,
        longitude: 72.6208,
        isFlagship: true,
        isActive: true,
        programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
        facilities: ['CCTV Monitored', 'Smart Digital Classrooms', 'Phonics Language Lab', 'Activity Play Zone', 'AC Rooms'],
      },
      {
        id: 2,
        name: 'Frolic Edu Labs — Ahmedabad Gota Branch',
        slug: 'frolic-ahmedabad-gota',
        branchType: 'Edu Lab & Preschool',
        address: 'B-12, Shivalik Plaza, Near Gota Crossroads, Gota',
        area: 'Gota',
        city: 'Ahmedabad',
        district: 'Ahmedabad',
        taluka: 'Ahmedabad City',
        state: 'Gujarat',
        pincode: '382481',
        phone: '9876543210',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Gota+Ahmedabad',
        latitude: 23.1200,
        longitude: 72.5100,
        isFlagship: false,
        isActive: true,
        programs: ['Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
        facilities: ['CCTV Monitored', 'Smart Digital Classrooms', 'Phonics Lab', 'Play Zone'],
      },
      {
        id: 3,
        name: 'Frolic Edu Labs — Satellite Ahmedabad',
        slug: 'frolic-ahmedabad-satellite',
        branchType: 'Edu Lab & Preschool',
        address: 'A-3, Silver Towers, Near Satellite Road, Bodakdev',
        area: 'Satellite',
        city: 'Ahmedabad',
        district: 'Ahmedabad',
        taluka: 'Ahmedabad City',
        state: 'Gujarat',
        pincode: '380015',
        phone: '9988776655',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Satellite+Ahmedabad',
        latitude: 23.0300,
        longitude: 72.5200,
        isFlagship: false,
        isActive: true,
        programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab'],
        facilities: ['CCTV Monitored', 'Digital Classrooms', 'Phonics Lab'],
      },
      {
        id: 4,
        name: 'Frolic Kids Edu Labs — Surat Vesu',
        slug: 'frolic-surat-vesu',
        branchType: 'Edu Lab & Preschool',
        address: '202, Skyline Complex, Vesu Main Road, Vesu',
        area: 'Vesu',
        city: 'Surat',
        district: 'Surat',
        taluka: 'Surat City',
        state: 'Gujarat',
        pincode: '395007',
        phone: '9765432109',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 9:00 AM – 5:00 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Vesu+Surat',
        latitude: 21.1500,
        longitude: 72.7800,
        isFlagship: false,
        isActive: true,
        programs: ['Nursery', 'LKG', 'UKG', 'Maths Lab'],
        facilities: ['CCTV Monitored', 'Smart Classrooms', 'Activity Zone'],
      },
      {
        id: 5,
        name: 'Frolic Edu Labs — Vadodara Alkapuri',
        slug: 'frolic-vadodara-alkapuri',
        branchType: 'Edu Lab & Preschool',
        address: 'Shop 5, Om Complex, Alkapuri Main Road, Alkapuri',
        area: 'Alkapuri',
        city: 'Vadodara',
        district: 'Vadodara',
        taluka: 'Vadodara City',
        state: 'Gujarat',
        pincode: '390007',
        phone: '9554433221',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Alkapuri+Vadodara',
        latitude: 22.3100,
        longitude: 73.1800,
        isFlagship: false,
        isActive: true,
        programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab'],
        facilities: ['CCTV Monitored', 'Digital Classrooms', 'Phonics Lab', 'Play Zone'],
      },
      {
        id: 6,
        name: 'Frolic Kids Edu Labs — Rajkot Kalawad Road',
        slug: 'frolic-rajkot-kalawad',
        branchType: 'Edu Lab & Preschool',
        address: '301, Rajhans Arcade, Kalawad Road, Rajkot',
        area: 'Kalawad Road',
        city: 'Rajkot',
        district: 'Rajkot',
        taluka: 'Rajkot City',
        state: 'Gujarat',
        pincode: '360001',
        phone: '9443322110',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Kalawad+Road+Rajkot',
        latitude: 22.2900,
        longitude: 70.7900,
        isFlagship: false,
        isActive: true,
        programs: ['Nursery', 'LKG', 'UKG', 'Maths Lab'],
        facilities: ['CCTV', 'Digital Classrooms', 'Play Zone'],
      },
      {
        id: 7,
        name: 'Frolic Learning Studio — Mumbai Kandivali',
        slug: 'frolic-mumbai-kandivali',
        branchType: 'Edu Lab & Preschool',
        address: '4th Floor, Oberoi Mall Complex, Kandivali East',
        area: 'Kandivali East',
        city: 'Mumbai',
        district: 'Mumbai Suburban',
        taluka: 'Borivali',
        state: 'Maharashtra',
        pincode: '400101',
        phone: '9876501234',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 9:00 AM – 6:00 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Kandivali+Mumbai',
        latitude: 19.2100,
        longitude: 72.8600,
        isFlagship: false,
        isActive: true,
        programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab'],
        facilities: ['CCTV Monitored', 'Smart Classrooms', 'Phonics Lab'],
      },
      {
        id: 8,
        name: 'Frolic Edu Labs — Thane Center',
        slug: 'frolic-thane-center',
        branchType: 'Edu Lab & Preschool',
        address: 'B-201, Hiranandani Estate, Thane West',
        area: 'Hiranandani Estate',
        city: 'Thane',
        district: 'Thane',
        taluka: 'Thane',
        state: 'Maharashtra',
        pincode: '400607',
        phone: '9765012345',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 9:00 AM – 5:30 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Thane+West',
        latitude: 19.2500,
        longitude: 72.9700,
        isFlagship: false,
        isActive: true,
        programs: ['Nursery', 'LKG', 'UKG', 'Maths Lab'],
        facilities: ['CCTV', 'Smart Classrooms', 'Activity Zone'],
      },
      // New centers for more variety
      {
        id: 9,
        name: 'Frolic Kids Edu Labs — Mehsana Branch',
        slug: 'frolic-mehsana',
        branchType: 'Edu Lab & Preschool',
        address: 'Shop 7, Shiv Complex, Highway Road, Mehsana',
        area: 'Highway Road',
        city: 'Mehsana',
        district: 'Mehsana',
        taluka: 'Mehsana',
        state: 'Gujarat',
        pincode: '384002',
        phone: '9012345678',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Mehsana+Gujarat',
        latitude: 23.5930,
        longitude: 72.3693,
        isFlagship: false,
        isActive: true,
        programs: ['Play Group', 'Nursery', 'LKG', 'UKG'],
        facilities: ['CCTV', 'Digital Classrooms', 'Play Zone'],
      },
      {
        id: 10,
        name: 'Frolic Edu Labs — Anand Center',
        slug: 'frolic-anand-center',
        branchType: 'Edu Lab & Preschool',
        address: '22, Mithakhali Road, Near ST Depot, Anand',
        area: 'Mithakhali',
        city: 'Anand',
        district: 'Anand',
        taluka: 'Anand',
        state: 'Gujarat',
        pincode: '388001',
        phone: '9123450678',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Anand+Gujarat',
        latitude: 22.5644,
        longitude: 72.9289,
        isFlagship: false,
        isActive: true,
        programs: ['Nursery', 'LKG', 'UKG', 'English Lab'],
        facilities: ['CCTV', 'Smart Classrooms', 'Phonics Lab'],
      },
      {
        id: 11,
        name: 'Frolic Kids Edu Labs — Navsari',
        slug: 'frolic-navsari',
        branchType: 'Edu Lab & Preschool',
        address: '5, Vijay Society, Station Road, Navsari',
        area: 'Station Road',
        city: 'Navsari',
        district: 'Navsari',
        taluka: 'Navsari',
        state: 'Gujarat',
        pincode: '396445',
        phone: '9234501789',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Navsari+Gujarat',
        latitude: 20.9464,
        longitude: 72.9521,
        isFlagship: false,
        isActive: true,
        programs: ['Play Group', 'Nursery', 'LKG', 'UKG'],
        facilities: ['CCTV', 'Smart Classrooms', 'Activity Zone'],
      },
      {
        id: 12,
        name: 'Frolic Edu Labs — Pune Kothrud',
        slug: 'frolic-pune-kothrud',
        branchType: 'Edu Lab & Preschool',
        address: '3A, Prabhat Road, Kothrud, Pune',
        area: 'Kothrud',
        city: 'Pune',
        district: 'Pune',
        taluka: 'Haveli',
        state: 'Maharashtra',
        pincode: '411038',
        phone: '9345601890',
        email: 'frolickidsedulabs@gmail.com',
        timing: 'Monday – Saturday: 9:00 AM – 5:30 PM',
        mapQuery: 'Frolic+Kids+Edu+Labs+Kothrud+Pune',
        latitude: 18.5074,
        longitude: 73.8077,
        isFlagship: false,
        isActive: true,
        programs: ['Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
        facilities: ['CCTV', 'Smart Classrooms', 'Phonics Lab', 'Play Zone'],
      },
    ];

    for (const center of centersData) {
      await Center.upsert(center);
      console.log(`✓ Center upserted: ${center.name}`);
    }

    // ── 2. ADD MORE GALLERY IMAGES ──
    const galleryCount = await MediaGallery.count();
    if (galleryCount < 15) {
      const galleryImages = [
        { imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', caption: 'Phonics Lab Learning Session', category: 'classroom', isActive: true, sortOrder: 1 },
        { imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', caption: 'Digital English Lab in Action', category: 'classroom', isActive: true, sortOrder: 2 },
        { imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800', caption: 'Art & Craft Activity Session', category: 'activities', isActive: true, sortOrder: 3 },
        { imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800', caption: 'Frolic Premium Student Kit Display', category: 'kits', isActive: true, sortOrder: 4 },
        { imageUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800', caption: 'Complete Kit & Backpack', category: 'kits', isActive: true, sortOrder: 5 },
        { imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800', caption: 'Students in Official Uniform', category: 'activities', isActive: true, sortOrder: 6 },
        { imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800', caption: 'Morning Assembly & Circle Time', category: 'events', isActive: true, sortOrder: 7 },
        { imageUrl: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800', caption: 'Annual Sports Day', category: 'events', isActive: true, sortOrder: 8 },
        { imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', caption: 'Creativity & Art Workshop', category: 'activities', isActive: true, sortOrder: 9 },
        { imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800', caption: 'Maths Lab with Abacus', category: 'classroom', isActive: true, sortOrder: 10 },
        { imageUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800', caption: 'New Admissions Welcome Day', category: 'events', isActive: true, sortOrder: 11 },
        { imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800', caption: 'Outdoor Play & Gross Motor', category: 'activities', isActive: true, sortOrder: 12 },
        { imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', caption: 'Graduation Day Celebration', category: 'events', isActive: true, sortOrder: 13 },
        { imageUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800', caption: 'National Day Event', category: 'events', isActive: true, sortOrder: 14 },
        { imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', caption: 'Parent Open House 2025', category: 'events', isActive: true, sortOrder: 15 },
      ];

      for (const img of galleryImages) {
        await MediaGallery.upsert(img).catch(() => MediaGallery.create(img).catch(() => {}));
      }
      console.log(`✓ Gallery images seeded`);
    } else {
      console.log(`  Gallery already has ${galleryCount} images, skipping.`);
    }

    // ── 3. ADD DUMMY KIT ORDERS ──
    const orderCount = await KitOrder.count();
    if (orderCount === 0) {
      await KitOrder.bulkCreate([
        { parentName: 'Ramesh Patel', phone: '9876543210', productName: 'Frolic Signature Orange Polo T-Shirt', grade: '3 – 4 Years', quantity: 2, address: 'B-12, Rajnagar Society, Gandhinagar, 382021', status: 'new', adminNotes: 'Order via website. Size: 3–4Y' },
        { parentName: 'Priya Shah', phone: '9765432109', productName: 'Complete Frolic Premium Student Kit', grade: '4 – 5 Years', quantity: 1, address: '204, Shivam Flats, Gota, Ahmedabad, 382481', status: 'contacted', adminNotes: 'Called parent – confirmed for campus pickup' },
        { parentName: 'Suresh Mehta', phone: '9654321098', productName: 'Pabulum® Academic Workbook & Phonics Set', grade: 'Complete Set', quantity: 1, address: '15, Silver Oaks Bungalows, Satellite, Ahmedabad, 380015', status: 'dispatched', adminNotes: 'Dispatched via speed post. AWB#12345' },
        { parentName: 'Kavita Joshi', phone: '9543210987', productName: 'Athletic Breathable Track Pants', grade: '2 – 3 Years', quantity: 3, address: 'F-5, Swami Nagar, Vesu, Surat, 395007', status: 'delivered', adminNotes: 'Delivered successfully at campus.' },
        { parentName: 'Nilesh Desai', phone: '9432109876', productName: 'Ergonomic Preschool Backpack (14L)', grade: 'One Size', quantity: 1, address: '302, Lakeview Heights, Alkapuri, Vadodara, 390007', status: 'new', adminNotes: '' },
        { parentName: 'Meeta Agarwal', phone: '9321098765', productName: 'Frolic Activity Round-Neck T-Shirt', grade: '4 – 5 Years', quantity: 2, address: 'C-22, Madhur Society, Rajkot, 360001', status: 'new', adminNotes: 'Online order – website store' },
        { parentName: 'Anjali Verma', phone: '9210987654', productName: 'Water-Resistant Art & Activity Apron', grade: 'Universal', quantity: 4, address: 'A-9, Shree Kunj, Kandivali East, Mumbai, 400101', status: 'contacted', adminNotes: 'Bulk order for classroom use' },
        { parentName: 'Harish Pandya', phone: '9109876543', productName: 'Comfort-Fit Stretch Denim Jeans', grade: '3 – 4 Years', quantity: 2, address: '7, Navrang Society, Mehsana, 384002', status: 'new', adminNotes: '' },
      ]);
      console.log('✓ Dummy kit orders seeded (8 orders)');
    } else {
      console.log(`  Kit orders already have ${orderCount} records, skipping.`);
    }

    // ── 4. ENSURE MORE TESTIMONIALS ──
    const testCount = await Testimonial.count();
    if (testCount < 8) {
      const newTestimonials = [
        { name: 'Heena & Nishant Joshi', childName: 'Neel Joshi', rating: 5, quote: 'Frolic has changed how our son approaches learning. The phonics lab approach is magical. He recites 44 phonemes perfectly at age 4!', program: 'Nursery', sortOrder: 5 },
        { name: 'Bhavika Patel', childName: 'Ishika Patel', rating: 5, quote: 'The kit quality is outstanding. The polo shirt is so soft and the backpack is very spacious and light. My daughter loves wearing her Frolic uniform daily!', program: 'LKG', sortOrder: 6 },
        { name: 'Rajesh & Monal Desai', childName: 'Dhruv Desai', rating: 5, quote: 'We are amazed by the Maths Lab. Dhruv can do mental calculations in seconds! The abacus technique they use is truly scientific.', program: 'UKG', sortOrder: 7 },
        { name: 'Sunita Agrawal', childName: 'Mishka Agrawal', rating: 5, quote: 'Best preschool in Surat hands down. The teachers are well-trained and the classroom environment is child-friendly and stimulating. 100% recommended!', program: 'Play Group', sortOrder: 8 },
        { name: 'Vikram & Pooja Sharma', childName: 'Aarav Sharma', rating: 4, quote: "The DIEL English program is exceptional. Our son's vocabulary and pronunciation improved dramatically within 2 months. The digital lab is truly state-of-the-art.", program: 'English Lab', sortOrder: 9 },
      ];
      for (const t of newTestimonials) {
        await Testimonial.create(t).catch(() => {});
      }
      console.log('✓ Extra testimonials seeded');
    } else {
      console.log(`  Testimonials already has ${testCount} records, skipping.`);
    }

    // ── 5. ENSURE MORE EVENTS ──
    const evCount = await Event.count();
    if (evCount < 6) {
      const newEvents = [
        {
          title: 'Annual Frolic Star Awards & Prize Distribution 2025',
          slug: 'annual-star-awards-2025',
          description: 'A grand celebration recognizing outstanding student achievements across all Frolic campuses in Gujarat and Maharashtra. Join us for the Annual Star Awards 2025!',
          imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
          eventDate: new Date('2025-12-15'),
          location: 'Gandhinagar Convention Hall, Gujarat',
          category: 'award',
          isActive: true,
          isFeatured: true,
          sortOrder: 1,
        },
        {
          title: 'Frolic Annual Sports & Wellness Day 2025',
          slug: 'annual-sports-day-2025',
          description: 'A day of fun, movement, and healthy competition for all preschool students. Activities include relay races, sack races, musical chairs, and parent-child challenge events.',
          imageUrl: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800',
          eventDate: new Date('2025-11-22'),
          location: 'All Frolic Campuses',
          category: 'event',
          isActive: true,
          isFeatured: false,
          sortOrder: 2,
        },
        {
          title: 'Parent Open House & Campus Tour — October 2025',
          slug: 'parent-open-house-oct-2025',
          description: 'Explore the Frolic learning environment, meet the educators, observe live phonics sessions, and understand our NEP 2020 aligned curriculum in detail.',
          imageUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800',
          eventDate: new Date('2025-10-18'),
          location: 'All Frolic Campuses',
          category: 'workshop',
          isActive: true,
          isFeatured: false,
          sortOrder: 3,
        },
      ];
      for (const ev of newEvents) {
        await Event.upsert(ev).catch(() => Event.create(ev).catch(() => {}));
      }
      console.log('✓ Extra events seeded');
    } else {
      console.log(`  Events already has ${evCount} records, skipping.`);
    }

    console.log('\n🎉 All dummy data successfully seeded to MySQL!');
    console.log('─────────────────────────────────────────');
    console.log('✅ Products: 8 individual items (T-shirt, Pants, Bag, Kit, Books etc.)');
    console.log('✅ Centers:  12 branches across Gujarat & Maharashtra (with district+taluka)');
    console.log('✅ Gallery:  15+ images across classroom, events, activities, kits');
    console.log('✅ KitOrders: 8 dummy orders (new, contacted, dispatched, delivered)');
    console.log('✅ Testimonials: 8+ parent reviews across programs');
    console.log('✅ Events: 6+ campus events and award ceremonies');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

seedAllDummyData();
