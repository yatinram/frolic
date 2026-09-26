const bcrypt = require('bcryptjs');
const { AdminUser, Program, Testimonial, MediaGallery, Blog, Center, Product, Event, Award } = require('../models');
const { ROLES, PROGRAM_CATEGORIES } = require('../config/constants');
const logger = require('../utils/logger');


const seedInitialData = async () => {
  try {
    // 1. Seed Admin User
    const adminCount = await AdminUser.count();
    if (adminCount === 0) {
      const passwordHash = await bcrypt.hash('frolic@2025', 10);
      await AdminUser.create({
        name: 'Super Admin',
        email: 'admin@frolic.com',
        passwordHash,
        role: ROLES.SUPER_ADMIN,
        isActive: true,
      });
      logger.info('✅ Initial Admin user created (admin@frolic.com / frolic@2025)');
    }

    // 2. Seed / Sync Rich Programs
    const { seedProgramsData } = require('./seedPrograms');
    await seedProgramsData();

    // 3. Seed Testimonials
    const testCount = await Testimonial.count();
    if (testCount === 0) {
      await Testimonial.bulkCreate([
        {
          name: 'Pooja & Jignesh Patel',
          role: 'Parent of Aarav (UKG)',
          childName: 'Aarav Patel',
          program: 'UKG & English Lab',
          rating: 5,
          quote: 'Frolic is not a typical preschool; it is truly an educational lab! Aarav started reading English storybooks independently at age 5. The DIEL digital software and Pabulum workbooks made a tremendous difference.',
          sortOrder: 1,
        },
        {
          name: 'Meghna Shah',
          role: 'Parent of Ananya (LKG)',
          childName: 'Ananya Shah',
          program: 'LKG & Maths Lab',
          rating: 5,
          quote: 'The Maths Lab with abacus has given Ananya incredible confidence in numbers. She visualizes beads and calculates mentally faster than we expected. Outstanding teaching methodology!',
          sortOrder: 2,
        },
        {
          name: 'Dr. Hardik Vyas',
          role: 'Franchise Partner, Gandhinagar Center',
          childName: null,
          program: 'Franchise Owner',
          rating: 5,
          quote: 'Partnering with Frolic Education was the best decision. The curriculum backing from Manovikas Mulyankan Sanstha, comprehensive teacher training, and complete branding support made center operations seamless.',
          sortOrder: 3,
        },
        {
          name: 'Ritu & Sanjay Sharma',
          role: 'Parent of Kabir (Nursery)',
          childName: 'Kabir Sharma',
          program: 'Nursery',
          rating: 5,
          quote: 'The warmth and safety at Frolic Gandhinagar gave us immense peace of mind. Kabir loves the sensory activities and looks forward to going to school every single morning!',
          sortOrder: 4,
        },
      ]);
      logger.info('✅ Initial Testimonials seeded');
    }

    // 4. Seed Media Gallery
    const galleryCount = await MediaGallery.count();
    if (galleryCount === 0) {
      await MediaGallery.bulkCreate([
        {
          title: 'Official Student Uniform & Kit',
          imageUrl: '/assets/kits.jpeg',
          category: 'kits',
          altText: 'Frolic Kids Edu Labs official student bag, cap, polo, apron, jeans, and socks',
          isFeatured: true,
          sortOrder: 1,
        },
        {
          title: 'Interactive English Lab Session',
          imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
          category: 'classroom',
          altText: 'Students engaged in interactive digital listening and reading practice',
          isFeatured: true,
          sortOrder: 2,
        },
        {
          title: 'Abacus Maths Lab in Action',
          imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop',
          category: 'activities',
          altText: 'Children working on mental mathematics and counting beads',
          isFeatured: true,
          sortOrder: 3,
        },
        {
          title: 'Creative Art & Sensory Play',
          imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop',
          category: 'activities',
          altText: 'Toddlers painting and exploring tactile materials',
          isFeatured: true,
          sortOrder: 4,
        },
        {
          title: 'Annual Day Celebrations & Graduation',
          imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop',
          category: 'events',
          altText: 'Frolic annual performance and student awards ceremony',
          isFeatured: true,
          sortOrder: 5,
        },
      ]);
      logger.info('✅ Initial Media Gallery seeded');
    }

    // 5. Seed Starter SEO Blogs
    const blogCount = await Blog.count();
    if (blogCount === 0) {
      await Blog.bulkCreate([
        {
          title: 'Why Digital Interactive Learning Works for Preschoolers',
          slug: 'why-digital-interactive-learning-works-for-preschoolers',
          summary: 'Explore how multi-sensory interactive education outperforms passive screen time and traditional rote learning in early childhood.',
          content: `
            <p>In today's fast-evolving world, early childhood education is undergoing a fundamental transformation. Rather than relying solely on passive blackboard instruction or rote memorization, leading educational research emphasizes <strong>multi-sensory interactive experiences</strong>.</p>
            <h3>1. Active vs Passive Engagement</h3>
            <p>Traditional rote learning often leaves young minds disengaged. When children interact with tactile materials, responsive digital phonetics, and colorful contextual challenges, neural pathways associated with linguistic and logical retention fire much more effectively.</p>
            <h3>2. The Science of Phonemic Awareness</h3>
            <p>At Frolic Kids Edu Labs, our English Lab introduces 44 phonemes through Digital Interactive Oral Exercises (D.I.E.L.). Children learn to associate smallest units of sound with visual graphemes, accelerating sight-word recognition and reading speed.</p>
            <h3>3. Confidence through Non-Judgmental Learning</h3>
            <p>Children learn best when freed from the fear of making mistakes. Interactive labs allow children to retry exercises at their personal pace until mastery is attained, fostering high self-esteem and a lifelong love for learning.</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
          category: 'Pedagogy',
          readTime: '4 min read',
          isPublished: true,
        },
        {
          title: 'Play Group vs Nursery vs LKG — What is the Difference?',
          slug: 'play-group-vs-nursery-vs-lkg-difference',
          summary: 'A comprehensive age-wise milestone roadmap for parents seeking the right starting point for their little learner.',
          content: `
            <p>Choosing the right preschool program for your toddler is one of the most critical foundational decisions parents make. Here is how developmental milestones map to each program stage:</p>
            <h3>Play Group (Ages 1.5 – 2.5 Years)</h3>
            <p>Focused on separation comfort, sensory stimulation, basic vocabulary through songs, and fine/gross motor coordination through structured play.</p>
            <h3>Nursery (Ages 2.5 – 3.5 Years)</h3>
            <p>Introduction to phonics, numerical grouping, color recognition, structured routines, and social-emotional cooperative interaction.</p>
            <h3>LKG & UKG (Ages 3.5 – 5.5 Years)</h3>
            <p>Integration of structured English & Maths Labs, reading short stories, mental arithmetic, and holistic preparation for primary schooling.</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
          category: 'Parenting Guide',
          readTime: '5 min read',
          isPublished: true,
        },
        {
          title: 'The Dual-Brain Benefit of Abacus-Integrated Maths Labs',
          slug: 'dual-brain-benefit-abacus-maths-labs',
          summary: 'How combining physical bead movement with mental visualization stimulates both left and right cerebral hemispheres.',
          content: `
            <p>Mathematics is often feared when taught merely as abstract symbols on paper. When young children use an abacus, numerical concepts transform into tangible, visual, and spatial entities.</p>
            <p>While the left brain computes logical sequencing and arithmetic rules, the right brain visualizes the beads and patterns. This dual-brain synchronization enhances photographic memory, concentration, and rapid mental math capabilities.</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
          category: 'Cognitive Science',
          readTime: '4 min read',
          isPublished: true,
        }
      ]);
      logger.info('✅ Initial Blog posts seeded');
    }

    // 6. Seed Centers / Branches
    const centerCount = await Center.count();
    if (centerCount === 0) {
      await Center.bulkCreate([
        // ── Gujarat - Gandhinagar District ──
        {
          name: 'Frolic Kids Edu Labs — Flagship Campus (Sargasan)',
          slug: 'gandhinagar-sargasan-flagship',
          branchType: 'Flagship Campus',
          address: '109, R Services, Sriprad Aayansh, Near Sargasan Cross Road',
          area: 'Sargasan',
          city: 'Gandhinagar',
          district: 'Gandhinagar',
          taluka: 'Gandhinagar',
          state: 'Gujarat',
          pincode: '382421',
          phone: '+91 75750 08820',
          email: 'frolickidsedulabs@gmail.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab', 'Teacher Training'],
          facilities: ['CCTV Monitored', 'Smart Digital Classrooms', 'Digital English & Maths Lab', 'Abacus Studio', 'Child-Safe Play Zone', 'Transport Facility'],
          mapQuery: '109 Sriprad Aayansh, Sargasan, Gandhinagar, Gujarat 382421',
          latitude: 23.1895,
          longitude: 72.6322,
          isFlagship: true,
          isActive: true,
        },
        {
          name: 'Frolic Kids Edu Labs — Kalol Branch',
          slug: 'gandhinagar-kalol-branch',
          branchType: 'Edu Lab & Preschool',
          address: 'Plot 45, Navjivan Mill Compound, Station Road, Kalol',
          area: 'Station Road',
          city: 'Kalol',
          district: 'Gandhinagar',
          taluka: 'Kalol',
          state: 'Gujarat',
          pincode: '382721',
          phone: '+91 75750 08828',
          email: 'kalol@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Audio-Visual Classroom', 'Abacus Math Pods', 'Sand & Water Play'],
          mapQuery: 'Station Road, Kalol, Gandhinagar, Gujarat',
          latitude: 23.2384,
          longitude: 72.4967,
          isFlagship: false,
          isActive: true,
        },
        {
          name: 'Frolic Edu Labs — Mansa Campus',
          slug: 'gandhinagar-mansa-branch',
          branchType: 'Learning Studio',
          address: 'Shivalik Complex, Near Gayatri Mandir, Mansa',
          area: 'Gayatri Mandir Area',
          city: 'Mansa',
          district: 'Gandhinagar',
          taluka: 'Mansa',
          state: 'Gujarat',
          pincode: '382845',
          phone: '+91 75750 08829',
          email: 'mansa@frolic.com',
          timing: 'Monday – Saturday: 9:00 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Activity Center', 'Digital Learning Kits'],
          mapQuery: 'Mansa, Gandhinagar, Gujarat',
          latitude: 23.4258,
          longitude: 72.6611,
          isFlagship: false,
          isActive: true,
        },

        // ── Gujarat - Ahmedabad District ──
        {
          name: 'Frolic Edu Labs — Ahmedabad Gota Branch',
          slug: 'ahmedabad-gota-branch',
          branchType: 'Edu Lab & Preschool',
          address: 'Shop 204-206, Highline Galleria, Near Gota Cross Road, S.G. Highway',
          area: 'Gota',
          city: 'Ahmedabad',
          district: 'Ahmedabad',
          taluka: 'Ghatlodia',
          state: 'Gujarat',
          pincode: '382481',
          phone: '+91 75750 08821',
          email: 'gota@frolic.com',
          timing: 'Monday – Saturday: 9:00 AM – 5:00 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Smart Interactive Boards', 'Phonics Audio Station', 'Outdoor Toddler Turf'],
          mapQuery: 'Gota, Ahmedabad, Gujarat',
          latitude: 23.1065,
          longitude: 72.5358,
          isFlagship: false,
          isActive: true,
        },
        {
          name: 'Frolic Edu Labs — Ahmedabad Satellite Center',
          slug: 'ahmedabad-satellite-center',
          branchType: 'Edu Lab & Preschool',
          address: 'Plot 42, Sunrise Park Road, Opposite Vastrapur Lake Approach, Satellite',
          area: 'Satellite',
          city: 'Ahmedabad',
          district: 'Ahmedabad',
          taluka: 'Daskroi',
          state: 'Gujarat',
          pincode: '380015',
          phone: '+91 75750 08822',
          email: 'satellite@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Digital English Lab', 'Maths Discovery Hub', 'Art & Craft Studio'],
          mapQuery: 'Satellite, Ahmedabad, Gujarat',
          latitude: 23.0305,
          longitude: 72.5186,
          isFlagship: false,
          isActive: true,
        },
        {
          name: 'Frolic Edu Labs — Sanand Campus',
          slug: 'ahmedabad-sanand-branch',
          branchType: 'Edu Lab & Preschool',
          address: '2nd Floor, Royal Arcade, Sanand Main Road, Sanand',
          area: 'Sanand Town',
          city: 'Sanand',
          district: 'Ahmedabad',
          taluka: 'Sanand',
          state: 'Gujarat',
          pincode: '382110',
          phone: '+91 75750 08830',
          email: 'sanand@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab'],
          facilities: ['CCTV Monitored', 'Language Lab Pods', 'Play Ground'],
          mapQuery: 'Sanand, Ahmedabad, Gujarat',
          latitude: 22.9868,
          longitude: 72.3814,
          isFlagship: false,
          isActive: true,
        },

        // ── Gujarat - Surat District ──
        {
          name: 'Frolic Kids Edu Labs — Surat Vesu Center',
          slug: 'surat-vesu-center',
          branchType: 'Edu Lab & Preschool',
          address: '3rd Floor, Marvel Icon, University-VIP Road, Vesu',
          area: 'Vesu',
          city: 'Surat',
          district: 'Surat',
          taluka: 'Majura',
          state: 'Gujarat',
          pincode: '395007',
          phone: '+91 75750 08823',
          email: 'surat.vesu@frolic.com',
          timing: 'Monday – Saturday: 9:00 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Language Lab Pods', 'Maths Manipulatives Table', 'Indoor Soft Play'],
          mapQuery: 'Vesu, Surat, Gujarat',
          latitude: 21.1442,
          longitude: 72.7712,
          isFlagship: false,
          isActive: true,
        },
        {
          name: 'Frolic Edu Labs — Surat Adajan Branch',
          slug: 'surat-adajan-branch',
          branchType: 'Edu Lab & Preschool',
          address: 'Prime Arcade, Near Anand Mahal Road, Adajan',
          area: 'Adajan',
          city: 'Surat',
          district: 'Surat',
          taluka: 'Choryasi',
          state: 'Gujarat',
          pincode: '395009',
          phone: '+91 75750 08831',
          email: 'adajan@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Interactive Smart Panels', 'Phonics Theatre'],
          mapQuery: 'Adajan, Surat, Gujarat',
          latitude: 21.1969,
          longitude: 72.7933,
          isFlagship: false,
          isActive: true,
        },

        // ── Gujarat - Vadodara District ──
        {
          name: 'Frolic Edu Labs — Vadodara Alkapuri Branch',
          slug: 'vadodara-alkapuri-branch',
          branchType: 'Edu Lab & Preschool',
          address: '12, RC Dutt Road, Opp. Express Hotel, Alkapuri',
          area: 'Alkapuri',
          city: 'Vadodara',
          district: 'Vadodara',
          taluka: 'Vadodara Urban',
          state: 'Gujarat',
          pincode: '390007',
          phone: '+91 75750 08824',
          email: 'vadodara@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Phonics Studio', 'Digital Touch-Screen Lab', 'Toddler Splash Pool'],
          mapQuery: 'Alkapuri, Vadodara, Gujarat',
          latitude: 22.3107,
          longitude: 73.1705,
          isFlagship: false,
          isActive: true,
        },
        {
          name: 'Frolic Edu Labs — Padra Branch',
          slug: 'vadodara-padra-branch',
          branchType: 'Edu Lab & Preschool',
          address: 'Station Road, Near Bus Stand, Padra',
          area: 'Station Area',
          city: 'Padra',
          district: 'Vadodara',
          taluka: 'Padra',
          state: 'Gujarat',
          pincode: '391440',
          phone: '+91 75750 08832',
          email: 'padra@frolic.com',
          timing: 'Monday – Saturday: 9:00 AM – 5:00 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab'],
          facilities: ['CCTV Monitored', 'Phonics Pods', 'Activity Corner'],
          mapQuery: 'Padra, Vadodara, Gujarat',
          latitude: 22.2407,
          longitude: 73.0844,
          isFlagship: false,
          isActive: true,
        },

        // ── Gujarat - Rajkot District ──
        {
          name: 'Frolic Kids Edu Labs — Rajkot Kalawad Road',
          slug: 'rajkot-kalawad-road-center',
          branchType: 'Edu Lab & Preschool',
          address: 'Kalawad Road, Near KKV Hall, Pushkar Dham Main Road',
          area: 'Kalawad Road',
          city: 'Rajkot',
          district: 'Rajkot',
          taluka: 'Rajkot Urban',
          state: 'Gujarat',
          pincode: '360005',
          phone: '+91 75750 08825',
          email: 'rajkot@frolic.com',
          timing: 'Monday – Saturday: 9:00 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Digital Lab Stations', 'Sensory Wall Zone', 'Library Corner'],
          mapQuery: 'Kalawad Road, Rajkot, Gujarat',
          latitude: 22.2858,
          longitude: 70.7718,
          isFlagship: false,
          isActive: true,
        },
        {
          name: 'Frolic Edu Labs — Gondal Campus',
          slug: 'rajkot-gondal-branch',
          branchType: 'Edu Lab & Preschool',
          address: 'College Chowk, Near City Bus Stand, Gondal',
          area: 'College Chowk',
          city: 'Gondal',
          district: 'Rajkot',
          taluka: 'Gondal',
          state: 'Gujarat',
          pincode: '360311',
          phone: '+91 75750 08833',
          email: 'gondal@frolic.com',
          timing: 'Monday – Saturday: 9:00 AM – 5:00 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Smart Abacus Lab', 'Toddler Fun Zone'],
          mapQuery: 'Gondal, Rajkot, Gujarat',
          latitude: 21.9619,
          longitude: 70.7997,
          isFlagship: false,
          isActive: true,
        },

        // ── Gujarat - Bhavnagar District ──
        {
          name: 'Frolic Edu Labs — Bhavnagar Waghawadi Branch',
          slug: 'bhavnagar-waghawadi-branch',
          branchType: 'Edu Lab & Preschool',
          address: 'Top 3 Complex, Waghawadi Road, Bhavnagar',
          area: 'Waghawadi Road',
          city: 'Bhavnagar',
          district: 'Bhavnagar',
          taluka: 'Bhavnagar Urban',
          state: 'Gujarat',
          pincode: '364002',
          phone: '+91 75750 08834',
          email: 'bhavnagar@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Digital Labs', 'Indoor Play Arena'],
          mapQuery: 'Waghawadi Road, Bhavnagar, Gujarat',
          latitude: 21.7583,
          longitude: 72.1465,
          isFlagship: false,
          isActive: true,
        },

        // ── Gujarat - Anand District ──
        {
          name: 'Frolic Edu Labs — Anand Vidyanagar Branch',
          slug: 'anand-vidyanagar-branch',
          branchType: 'Edu Lab & Preschool',
          address: 'Near Mota Bazaar, Vallabh Vidyanagar, Anand',
          area: 'Vallabh Vidyanagar',
          city: 'Anand',
          district: 'Anand',
          taluka: 'Anand',
          state: 'Gujarat',
          pincode: '388120',
          phone: '+91 75750 08835',
          email: 'anand@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:00 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab', 'Teacher Training'],
          facilities: ['CCTV Monitored', 'Digital Lab Pods', 'Smart Board Classroom'],
          mapQuery: 'Vallabh Vidyanagar, Anand, Gujarat',
          latitude: 22.5539,
          longitude: 72.9238,
          isFlagship: false,
          isActive: true,
        },

        // ── Maharashtra - Mumbai District ──
        {
          name: 'Frolic Learning Studio — Mumbai Kandivali Branch',
          slug: 'mumbai-kandivali-studio',
          branchType: 'Learning Studio',
          address: '2nd Floor, Sai Arcade, Mahavir Nagar, Kandivali West',
          area: 'Kandivali West',
          city: 'Mumbai',
          district: 'Mumbai Suburban',
          taluka: 'Borivali',
          state: 'Maharashtra',
          pincode: '400067',
          phone: '+91 75750 08826',
          email: 'mumbai.kandivali@frolic.com',
          timing: 'Monday – Saturday: 9:00 AM – 6:00 PM',
          programs: ['Digital English Lab', 'Maths Lab', 'After-School Phonics'],
          facilities: ['CCTV Monitored', 'Smart Digital Lab Pods', 'Individual Speed-Reading Terminals'],
          mapQuery: 'Mahavir Nagar, Kandivali West, Mumbai, Maharashtra',
          latitude: 19.2081,
          longitude: 72.8402,
          isFlagship: false,
          isActive: true,
        },
        {
          name: 'Frolic Edu Labs — Mumbai Thane Center',
          slug: 'mumbai-thane-center',
          branchType: 'Edu Lab & Preschool',
          address: 'Ground Floor, Hiranandani Meadows, Pokhran Road No. 2, Thane West',
          area: 'Thane West',
          city: 'Thane',
          district: 'Thane',
          taluka: 'Thane',
          state: 'Maharashtra',
          pincode: '400610',
          phone: '+91 75750 08827',
          email: 'thane@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Smart Classrooms', 'Abacus & Maths Lab', 'Play Garden'],
          mapQuery: 'Hiranandani Meadows, Thane West, Maharashtra',
          latitude: 19.2312,
          longitude: 72.9691,
          isFlagship: false,
          isActive: true,
        },

        // ── Rajasthan - Jaipur District ──
        {
          name: 'Frolic Kids Edu Labs — Jaipur Vaishali Nagar',
          slug: 'jaipur-vaishali-nagar-center',
          branchType: 'Edu Lab & Preschool',
          address: 'Amrapali Circle, Vaishali Nagar, Jaipur',
          area: 'Vaishali Nagar',
          city: 'Jaipur',
          district: 'Jaipur',
          taluka: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302021',
          phone: '+91 75750 08836',
          email: 'jaipur@frolic.com',
          timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
          programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
          facilities: ['CCTV Monitored', 'Smart Classroom', 'Phonics Studio', 'Play Turf'],
          mapQuery: 'Vaishali Nagar, Jaipur, Rajasthan',
          latitude: 26.9054,
          longitude: 75.7422,
          isFlagship: false,
          isActive: true,
        }
      ]);
      logger.info('✅ Initial Centers/Branches seeded with District and Taluka hierarchy');
    }

    // 7. Seed Products / Kits Store
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate([
        {
          title: 'Complete Frolic Premium Student Kit',
          slug: 'frolic-premium-student-kit',
          category: 'kits',
          badge: 'Most Popular',
          badgeColor: 'orange',
          image: '/assets/kits.jpeg',
          price: '₹2,499',
          subPrice: 'Inclusive of All Taxes',
          description: 'Official complete learner kit containing durable school bag, branded polo & cotton t-shirt, jeans, track pant, cap, apron, socks, and custom ID badge.',
          items: [
            'Ergonomic School Backpack with Cushioned Straps',
            'Frolic Signature Orange Polo Shirt (Premium Pique Cotton)',
            'Casual Round-Neck Frolic Activity T-Shirt',
            'Comfort-Fit Denim Jeans (Soft Elastic Waist)',
            'Breathable Athletic Track Pants',
            'Embroidered Sun Visor Cap',
            'Water-Resistant Art & Activity Apron',
            '2 Pairs of Cotton Ankle Socks',
            'Official Frolic Lanyard & ID Card Cover'
          ],
          inStock: true,
          sortOrder: 1,
          isActive: true,
        },
        {
          title: 'Pabulum® Academic Workbook & Phonics Set',
          slug: 'pabulum-academic-workbook-phonics-set',
          category: 'books',
          badge: 'Curriculum Core',
          badgeColor: 'blue',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
          price: '₹1,299',
          subPrice: 'Full Academic Year Pack',
          description: 'Structured foundational workbooks with 44 phonemes, guided pencil-grip tracings, vocabulary drills, and interactive sticker milestones.',
          items: [
            'Volume 1: Phonemic Awareness & Alphabet Strokes',
            'Volume 2: CVC Words & Sight Word Building',
            'Volume 3: Number Exploration & Logic Puzzles',
            'Volume 4: Environmental Studies (EVS) Journey',
            '100+ Reward Stickers & Activity Cutouts'
          ],
          inStock: true,
          sortOrder: 2,
          isActive: true,
        },
        {
          title: 'Frolic Dual-Uniform Set (Polo + Denim + Track)',
          slug: 'frolic-dual-uniform-set',
          category: 'uniforms',
          badge: 'Essential',
          badgeColor: 'green',
          image: '/assets/kits.jpeg',
          price: '₹1,499',
          subPrice: '2 Tops + 2 Bottoms',
          description: 'High-grade 100% skin-friendly cotton uniform combo engineered for active preschool movement, all-day comfort, and hassle-free machine washing.',
          items: [
            '1x Frolic Collared Polo Shirt (Orange)',
            '1x Frolic Sports Tee (Sky Blue)',
            '1x Stretchable Denim Pant',
            '1x Cozy Track Bottom'
          ],
          inStock: true,
          sortOrder: 3,
          isActive: true,
        },
        {
          title: 'D.I.E.L. Interactive Home Practice Software Pass',
          slug: 'diel-interactive-home-practice-software-pass',
          category: 'digital',
          badge: 'Digital Lab',
          badgeColor: 'purple',
          image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop',
          price: '₹899',
          subPrice: '1-Year Parent Access License',
          description: 'Parent-child digital portal with 150+ interactive phonics audio stories, 25,000 oral repetition drills, and real-time pronunciation scoring.',
          items: [
            'Access on Android, iOS, Windows & Mac',
            '150+ Animated Phonics Video Stories',
            'Speech Recognition Word Practice Drills',
            'Weekly Digital Progress & Analytics Dashboard'
          ],
          inStock: true,
          sortOrder: 4,
          isActive: true,
        },
        {
          title: 'Frolic Hands-On Maths Lab & 17-Rod Abacus Kit',
          slug: 'frolic-hands-on-maths-lab-abacus-kit',
          category: 'kits',
          badge: 'Cognitive Boost',
          badgeColor: 'orange',
          image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop',
          price: '₹749',
          subPrice: 'Beginner to Intermediate',
          description: 'Tactile dual-color 17-rod master abacus designed for early arithmetic, paired with mental calculation flashcards and finger-speed exercises.',
          items: [
            '1x 17-Rod Smooth Glide Physical Abacus',
            '100x Speed Math Flashcards (Addition/Subtraction)',
            'Finger-Dexterity Chart & Visual Bead Guide',
            'Protective Padded Canvas Carry Pouch'
          ],
          inStock: true,
          sortOrder: 5,
          isActive: true,
        },
        {
          title: 'Little Picasso Premium Art & Stationery Caddy',
          slug: 'little-picasso-premium-art-stationery-caddy',
          category: 'stationery',
          badge: 'Non-Toxic',
          badgeColor: 'green',
          image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop',
          price: '₹599',
          subPrice: 'Child-Safe Certified',
          description: 'Ergonomic triangle jumbo crayons, washable finger paints, child-safe blunt scissors, textured sketch pad, and tactile play dough tubs.',
          items: [
            '12x Jumbo Triangular Grip Wax Crayons',
            '6x Non-Toxic Washable Finger Paint Tubs',
            '1x Spiral Textured A4 Drawing Sketchbook',
            '4x Scented Organic Play Dough Pots',
            '1x Safety Round-Tip Preschool Scissors'
          ],
          inStock: true,
          sortOrder: 6,
          isActive: true,
        }
      ]);
      logger.info('✅ Initial Products seeded');
    }

    // 8. Seed Events
    const eventCount = await Event.count();
    if (eventCount === 0) {
      await Event.bulkCreate([
        {
          title: 'Annual Grand Sports Carnival & Little Olympics 2026',
          slug: 'annual-sports-carnival-2026',
          category: 'Sports & Wellness',
          tagColor: 'green',
          date: '28th February 2026',
          year: '2026',
          time: '9:00 AM – 1:00 PM',
          location: 'Frolic Flagship Arena, Gandhinagar Campus',
          image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop',
          description: 'A cheerful day celebrating gross motor skills, teamwork, hurdles, toddler relay races, and parent-child cheer fun!',
          isUpcoming: true,
          isActive: true,
        },
        {
          title: 'STEM & Phonics Discovery Fair 2026',
          slug: 'stem-phonics-discovery-fair-2026',
          category: 'Academic Discovery',
          tagColor: 'blue',
          date: '15th March 2026',
          year: '2026',
          time: '10:00 AM – 3:30 PM',
          location: 'All Frolic Centers Across Gujarat',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
          description: 'Interactive live showcases where students present DIEL phoneme theater, abacus speed challenges, and sensory science experiments.',
          isUpcoming: true,
          isActive: true,
        },
        {
          title: 'Little Picasso Annual Art Gala & Craft Expo',
          slug: 'little-picasso-annual-art-gala-2025',
          category: 'Creative Arts',
          tagColor: 'orange',
          date: '14th December 2025',
          year: '2025',
          time: '11:00 AM – 4:00 PM',
          location: 'Frolic Center Auditorium, Ahmedabad',
          image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop',
          description: 'Over 200 handmade canvases, clay sculptures, and recycled art installations created entirely by our budding toddler artists.',
          isUpcoming: false,
          isActive: true,
        },
        {
          title: 'Parent-Teacher Pedagogy Workshop: NEP 2020 Readiness',
          slug: 'parent-teacher-pedagogy-workshop-2025',
          category: 'Parent Workshop',
          tagColor: 'purple',
          date: '5th November 2025',
          year: '2025',
          time: '4:00 PM – 6:30 PM',
          location: 'Virtual Webinar & On-Campus Live Stream',
          image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop',
          description: 'Keynote session by senior educators on nurturing early literacy, mindful parenting, and balanced digital screen engagement.',
          isUpcoming: false,
          isActive: true,
        }
      ]);
      logger.info('✅ Initial Events seeded');
    }

    // 9. Seed Awards
    const awardCount = await Award.count();
    if (awardCount === 0) {
      await Award.bulkCreate([
        {
          title: 'Best Innovative Preschool Curriculum in Gujarat',
          org: 'National Early Childhood Education Summit (NECE)',
          year: '2025',
          description: 'Honoured for pioneering the Digital Interactive English Lab (DIEL) and integrated physical-mental abacus maths system.',
          iconType: 'Trophy',
          sortOrder: 1,
          isActive: true,
        },
        {
          title: 'Excellence in NEP 2020 & NCF 2023 Alignment',
          org: 'All India Progressive School Leadership Conclave',
          year: '2024',
          description: 'Recognised for our 12-Module Teacher Mentoring Framework designed by Gaurang Oza and experiential multi-sensory classrooms.',
          iconType: 'Star',
          sortOrder: 2,
          isActive: true,
        },
        {
          title: "Parents' Choice Award: Safest & Most Caring Preschool",
          org: 'Gujarat Parent Community Choice Survey',
          year: '2024',
          description: 'Awarded top score across 1,000+ participating parents for campus hygiene, CCTV transparency, and nurturing environment.',
          iconType: 'Heart',
          sortOrder: 3,
          isActive: true,
        },
        {
          title: 'Top Emerging Early Education Franchise Brand',
          org: 'Indian Franchise & Educational Business Awards',
          year: '2023',
          description: 'Celebrated for structured center onboarding, standard operating excellence, and exceptional franchise return-on-investment.',
          iconType: 'ShieldCheck',
          sortOrder: 4,
          isActive: true,
        }
      ]);
      logger.info('✅ Initial Awards seeded');
    }

  } catch (err) {
    logger.error('Error during initial data seeding:', err);
  }
};

module.exports = seedInitialData;
