// apps/web/src/lib/courses.ts
export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  detailedDescription: string
  category: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  weeks: number
  totalLessons: number
  format: string[]
  rating: number
  learners: number
  tags: string[]
  matchScore: number
  reason: string
  dnaMatch: {
    learningStyle: string[]
    motivationType: string[]
    environment: string[]
    technical: string[]
    focusDuration: string[]
    confidenceLevel: string[]
  }
  instructor: {
    name: string
    role: string
    bio: string
    expertise: string[]
    avatarColor: string
  }
  features: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  certificate: boolean
  offlineAvailable: boolean
  language: string[]
  updated: string
  popularity: number
}

export const coursesDatabase: Course[] = [
  {
    id: 'mobile-digital-literacy',
    title: 'Mobile-First Digital Literacy',
    subtitle: 'Master smartphone essentials for daily life & business',
    description: 'Master smartphone basics, internet safety, and essential apps for daily life and business.',
    detailedDescription: 'This comprehensive course takes you from smartphone basics to advanced digital skills. Learn to navigate your device confidently, use essential apps securely, and leverage mobile technology for business growth. Perfect for beginners who want to become smartphone experts.',
    category: ['Foundational', 'Technology', 'Essential', 'Beginner'],
    difficulty: 'beginner',
    duration: '3 weeks',
    weeks: 3,
    totalLessons: 15,
    format: ['video', 'interactive', 'hands-on', 'quiz'],
    rating: 4.9,
    learners: 15200,
    tags: ['smartphone', 'basics', 'internet', 'security', 'apps', 'digital-literacy'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['visual', 'kinesthetic'],
      motivationType: ['practical', 'achievement', 'social'],
      environment: ['quiet', 'active', 'social'],
      technical: ['basic', 'learning', 'comfortable'],
      focusDuration: ['short', 'medium'],
      confidenceLevel: ['nervous', 'cautious', 'moderate']
    },
    instructor: {
      name: 'Rajesh Kumar',
      role: 'Digital Literacy Expert',
      bio: '10+ years experience training rural communities across India. Trained over 50,000 learners in digital skills.',
      expertise: ['Digital Literacy', 'Rural Development', 'Mobile Technology', 'Community Training'],
      avatarColor: 'from-blue-500 to-cyan-500'
    },
    features: [
      'Step-by-step video tutorials',
      'Interactive quizzes after each lesson',
      'Downloadable guides in local languages',
      'Live Q&A sessions weekly',
      'Certificate of completion',
      'Community support forum'
    ],
    prerequisites: [
      'Basic smartphone operation',
      'Reading ability in local language',
      'Willingness to learn'
    ],
    learningOutcomes: [
      'Master smartphone navigation and settings',
      'Use 20+ essential apps for daily life',
      'Understand internet safety and avoid online scams',
      'Manage digital payments and banking apps securely',
      'Troubleshoot common smartphone issues',
      'Use government digital services effectively'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu'],
    updated: '2024-01-15',
    popularity: 95
  },
  {
    id: 'agri-tech-basics',
    title: 'Smart Farming with Agri-Tech',
    subtitle: 'Modern technology for better farming outcomes',
    description: 'Learn to use mobile apps for crop monitoring, weather alerts, and market price tracking.',
    detailedDescription: 'Transform traditional farming with technology. Learn to use smartphone apps for crop health monitoring, weather forecasting, soil testing, and connecting with buyers. Increase yield and reduce costs with smart farming techniques.',
    category: ['Agriculture', 'Technology', 'Business', 'Productivity'],
    difficulty: 'beginner',
    duration: '4 weeks',
    weeks: 4,
    totalLessons: 18,
    format: ['video', 'field-guide', 'simulation', 'project'],
    rating: 4.8,
    learners: 12500,
    tags: ['farming', 'agriculture', 'technology', 'sensors', 'crop-monitoring', 'weather'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['kinesthetic', 'visual', 'reading'],
      motivationType: ['practical', 'achievement', 'curiosity'],
      environment: ['outdoor', 'quiet', 'active'],
      technical: ['comfortable', 'expert', 'basic'],
      focusDuration: ['medium', 'long'],
      confidenceLevel: ['moderate', 'very']
    },
    instructor: {
      name: 'Priya Sharma',
      role: 'Agri-Tech Specialist',
      bio: 'Agricultural engineer with 8 years of field experience. Developed mobile solutions for 5000+ farmers.',
      expertise: ['Precision Agriculture', 'IoT in Farming', 'Crop Management', 'Market Linkages'],
      avatarColor: 'from-green-500 to-teal-500'
    },
    features: [
      'Field demonstrations and practical exercises',
      'Crop monitoring app walkthroughs',
      'Market price prediction tools',
      'Government subsidy guidance',
      'Expert farmer interviews',
      'Seasonal farming calendar'
    ],
    prerequisites: [
      'Basic smartphone knowledge',
      'Farming experience (any level)',
      'Interest in technology'
    ],
    learningOutcomes: [
      'Use 5+ farming apps for daily operations',
      'Monitor crop health using smartphone cameras',
      'Access accurate weather forecasts',
      'Connect with buyers through digital platforms',
      'Calculate optimal fertilizer usage',
      'Track farm expenses digitally'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'Marathi', 'Telugu', 'Kannada', 'Punjabi'],
    updated: '2024-01-10',
    popularity: 88
  },
  {
    id: 'rural-ecommerce',
    title: 'E-commerce for Rural Entrepreneurs',
    subtitle: 'Sell products online and grow your business',
    description: 'Sell products online, manage digital payments, and build customer relationships.',
    detailedDescription: 'Start and grow your online business from your village. Learn to create product listings, handle orders, manage digital payments, and market your products effectively. Includes templates and tools for quick setup.',
    category: ['Business', 'Entrepreneurship', 'Digital', 'Marketing'],
    difficulty: 'intermediate',
    duration: '6 weeks',
    weeks: 6,
    totalLessons: 24,
    format: ['video', 'case-study', 'project', 'template'],
    rating: 4.7,
    learners: 8900,
    tags: ['ecommerce', 'business', 'marketing', 'payments', 'entrepreneurship'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['visual', 'reading', 'kinesthetic'],
      motivationType: ['achievement', 'practical', 'social'],
      environment: ['quiet', 'active', 'social'],
      technical: ['comfortable', 'expert'],
      focusDuration: ['medium', 'long'],
      confidenceLevel: ['moderate', 'very']
    },
    instructor: {
      name: 'Amit Patel',
      role: 'E-commerce Coach',
      bio: 'Helped 1000+ rural entrepreneurs start online businesses. Former Flipkart seller success manager.',
      expertise: ['Online Marketplaces', 'Digital Marketing', 'Logistics', 'Customer Service'],
      avatarColor: 'from-orange-500 to-red-500'
    },
    features: [
      'Step-by-step marketplace setup',
      'Product photography tutorials',
      'Pricing strategy calculator',
      'Customer service templates',
      'Legal compliance checklist',
      'Growth hacking techniques'
    ],
    prerequisites: [
      'Basic computer/smartphone skills',
      'Product or service to sell',
      'Bank account for payments'
    ],
    learningOutcomes: [
      'Set up online store on 3+ platforms',
      'Create professional product listings',
      'Handle digital payments securely',
      'Manage shipping and delivery',
      'Build customer loyalty',
      'Analyze sales data for growth'
    ],
    certificate: true,
    offlineAvailable: false,
    language: ['Hindi', 'English', 'Gujarati', 'Bengali'],
    updated: '2024-01-05',
    popularity: 82
  },
  {
    id: 'health-digital',
    title: 'Digital Health Awareness',
    subtitle: 'Health apps and telemedicine for family wellbeing',
    description: 'Use health apps, telemedicine, and preventive care tracking for family wellbeing.',
    detailedDescription: 'Learn to use digital tools for family health management. Includes telemedicine consultations, health tracking apps, emergency services, and preventive care. Special focus on maternal and child health.',
    category: ['Health', 'Wellness', 'Essential', 'Family'],
    difficulty: 'beginner',
    duration: '3 weeks',
    weeks: 3,
    totalLessons: 12,
    format: ['video', 'interactive', 'quiz', 'checklist'],
    rating: 4.9,
    learners: 18700,
    tags: ['health', 'wellness', 'preventive', 'telemedicine', 'family-health'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['auditory', 'visual', 'reading'],
      motivationType: ['social', 'practical', 'achievement'],
      environment: ['quiet', 'social'],
      technical: ['basic', 'comfortable'],
      focusDuration: ['short', 'medium'],
      confidenceLevel: ['cautious', 'moderate', 'nervous']
    },
    instructor: {
      name: 'Dr. Anjali Mehta',
      role: 'Public Health Specialist',
      bio: 'Medical doctor with 12 years in rural healthcare. Implemented telemedicine in 200+ villages.',
      expertise: ['Telemedicine', 'Preventive Care', 'Maternal Health', 'Health Technology'],
      avatarColor: 'from-pink-500 to-rose-500'
    },
    features: [
      'Telemedicine platform walkthroughs',
      'Health tracking app tutorials',
      'Emergency contact setup',
      'Vaccination tracker',
      'Medication reminder system',
      'Health insurance guidance'
    ],
    prerequisites: [
      'Basic smartphone operation',
      'Concern for family health',
      'Interest in preventive care'
    ],
    learningOutcomes: [
      'Schedule and attend telemedicine consultations',
      'Track family health records digitally',
      'Use emergency health services',
      'Manage medication schedules',
      'Access government health schemes',
      'Prevent common health issues'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'Tamil', 'Marathi', 'Bengali', 'English'],
    updated: '2024-01-12',
    popularity: 92
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Setup & Maintenance',
    subtitle: 'Solar power for homes and small businesses',
    description: 'Solar panel installation, maintenance, and small-scale energy entrepreneurship.',
    detailedDescription: 'Learn to install, maintain, and troubleshoot solar power systems. From home lighting to small business applications. Includes safety protocols, government subsidies, and entrepreneurship opportunities.',
    category: ['Technical', 'Green Energy', 'Business', 'Sustainability'],
    difficulty: 'intermediate',
    duration: '8 weeks',
    weeks: 8,
    totalLessons: 28,
    format: ['video', 'hands-on', 'simulation', 'project'],
    rating: 4.6,
    learners: 5200,
    tags: ['solar', 'energy', 'technical', 'maintenance', 'green-energy'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['kinesthetic', 'visual', 'reading'],
      motivationType: ['practical', 'achievement', 'curiosity'],
      environment: ['outdoor', 'active', 'quiet'],
      technical: ['expert', 'comfortable'],
      focusDuration: ['long', 'extended'],
      confidenceLevel: ['very', 'moderate']
    },
    instructor: {
      name: 'Vikram Singh',
      role: 'Renewable Energy Engineer',
      bio: '15 years in solar energy projects. Installed 5000+ solar systems across rural India.',
      expertise: ['Solar Installation', 'Energy Management', 'System Maintenance', 'Government Schemes'],
      avatarColor: 'from-yellow-500 to-amber-500'
    },
    features: [
      'Step-by-step installation videos',
      'Safety protocol demonstrations',
      'Troubleshooting guide',
      'Business setup templates',
      'Government subsidy application',
      'Cost calculation tools'
    ],
    prerequisites: [
      'Basic technical aptitude',
      'Interest in renewable energy',
      'Willingness to work with tools'
    ],
    learningOutcomes: [
      'Install basic solar power systems',
      'Perform routine maintenance',
      'Troubleshoot common issues',
      'Calculate energy requirements',
      'Apply for government subsidies',
      'Start solar installation service'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'English', 'Marathi', 'Rajasthani'],
    updated: '2024-01-08',
    popularity: 76
  },
  {
    id: 'vernacular-content',
    title: 'Vernacular Content Creation',
    subtitle: 'Create videos and blogs in local languages',
    description: 'Create videos, blogs, and social media content in local languages for community impact.',
    detailedDescription: 'Learn content creation in your native language. From scriptwriting to video editing, social media management to monetization. Create content that educates, entertains, and empowers your community.',
    category: ['Creative', 'Digital', 'Communication', 'Media'],
    difficulty: 'intermediate',
    duration: '5 weeks',
    weeks: 5,
    totalLessons: 20,
    format: ['video', 'project', 'feedback', 'template'],
    rating: 4.7,
    learners: 7200,
    tags: ['content', 'creativity', 'video', 'social-media', 'blogging'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['creative', 'visual', 'kinesthetic'],
      motivationType: ['creative', 'social', 'achievement'],
      environment: ['social', 'active', 'quiet'],
      technical: ['comfortable', 'expert'],
      focusDuration: ['medium', 'long'],
      confidenceLevel: ['moderate', 'very']
    },
    instructor: {
      name: 'Neha Gupta',
      role: 'Content Creator & Coach',
      bio: 'Built audience of 500K+ with regional content. Trained 2000+ creators from rural backgrounds.',
      expertise: ['Video Production', 'Social Media', 'Storytelling', 'Monetization'],
      avatarColor: 'from-purple-500 to-pink-500'
    },
    features: [
      'Smartphone video editing tutorials',
      'Scriptwriting templates',
      'Social media scheduling',
      'Monetization strategies',
      'Audience engagement techniques',
      'Analytics understanding'
    ],
    prerequisites: [
      'Smartphone with camera',
      'Basic understanding of social media',
      'Good communication skills in local language'
    ],
    learningOutcomes: [
      'Create engaging video content',
      'Write compelling scripts',
      'Edit videos on smartphone',
      'Build social media presence',
      'Monetize content',
      'Measure content performance'
    ],
    certificate: true,
    offlineAvailable: false,
    language: ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi'],
    updated: '2024-01-03',
    popularity: 79
  },
  {
    id: 'financial-literacy',
    title: 'Digital Financial Literacy',
    subtitle: 'Banking, payments, savings & investments',
    description: 'Banking apps, digital payments, savings, and investment basics for rural families.',
    detailedDescription: 'Master digital finance management. Learn banking apps, digital payments, savings strategies, insurance basics, and safe investment options. Protect yourself from financial fraud while growing your wealth.',
    category: ['Finance', 'Essential', 'Security', 'Planning'],
    difficulty: 'beginner',
    duration: '4 weeks',
    weeks: 4,
    totalLessons: 16,
    format: ['video', 'interactive', 'calculator', 'simulation'],
    rating: 4.8,
    learners: 14200,
    tags: ['finance', 'banking', 'payments', 'security', 'investments'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['visual', 'reading', 'auditory'],
      motivationType: ['practical', 'achievement', 'social'],
      environment: ['quiet'],
      technical: ['basic', 'comfortable'],
      focusDuration: ['short', 'medium'],
      confidenceLevel: ['cautious', 'moderate']
    },
    instructor: {
      name: 'Sanjay Reddy',
      role: 'Financial Educator',
      bio: 'Former bank manager with 20 years experience. Specialized in rural financial inclusion programs.',
      expertise: ['Banking', 'Digital Payments', 'Investment', 'Financial Planning'],
      avatarColor: 'from-emerald-500 to-green-500'
    },
    features: [
      'Banking app tutorials',
      'Payment security demonstrations',
      'Savings calculator',
      'Fraud prevention checklist',
      'Government scheme guidance',
      'Investment risk assessment'
    ],
    prerequisites: [
      'Basic smartphone operation',
      'Bank account (any type)',
      'Interest in financial planning'
    ],
    learningOutcomes: [
      'Use banking apps confidently',
      'Make secure digital payments',
      'Plan savings goals',
      'Understand basic investments',
      'Protect against financial fraud',
      'Access government financial schemes'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'English', 'Tamil', 'Gujarati'],
    updated: '2024-01-14',
    popularity: 90
  },
  {
    id: 'electric-vehicle-repair',
    title: 'Electric Vehicle Basic Repair',
    subtitle: 'Maintenance for e-bikes, scooters & small vehicles',
    description: 'Maintenance and troubleshooting for electric bicycles, scooters, and small vehicles.',
    detailedDescription: 'Learn essential repair and maintenance skills for electric vehicles. Focus on e-bikes and scooters commonly used in rural areas. Includes battery care, motor troubleshooting, and safety protocols.',
    category: ['Technical', 'Automotive', 'Future', 'Skills'],
    difficulty: 'intermediate',
    duration: '7 weeks',
    weeks: 7,
    totalLessons: 25,
    format: ['video', 'hands-on', 'diagnostic', 'manual'],
    rating: 4.6,
    learners: 4800,
    tags: ['ev', 'automotive', 'repair', 'technical', 'maintenance'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['kinesthetic', 'visual'],
      motivationType: ['practical', 'achievement'],
      environment: ['active', 'outdoor'],
      technical: ['expert', 'comfortable'],
      focusDuration: ['long', 'extended'],
      confidenceLevel: ['very', 'moderate']
    },
    instructor: {
      name: 'Ravi Verma',
      role: 'EV Technician Trainer',
      bio: 'Certified EV technician with 8 years experience. Trained 1000+ mechanics across India.',
      expertise: ['EV Repair', 'Battery Management', 'Motor Maintenance', 'Safety Standards'],
      avatarColor: 'from-cyan-500 to-blue-500'
    },
    features: [
      'Step-by-step repair videos',
      'Diagnostic flowcharts',
      'Safety equipment guide',
      'Parts identification manual',
      'Business setup templates',
      'Warranty claim process'
    ],
    prerequisites: [
      'Basic mechanical aptitude',
      'Interest in vehicles',
      'Willingness to work with tools'
    ],
    learningOutcomes: [
      'Perform basic EV maintenance',
      'Troubleshoot common issues',
      'Handle batteries safely',
      'Replace basic components',
      'Use diagnostic tools',
      'Start EV repair service'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'Marathi', 'Gujarati', 'English'],
    updated: '2024-01-07',
    popularity: 74
  },
  {
    id: 'ai-assisted-farming',
    title: 'AI-Assisted Precision Farming',
    subtitle: 'Smart tools for soil, crop & resource optimization',
    description: 'Use AI tools for soil analysis, crop prediction, and resource optimization.',
    detailedDescription: 'Advanced farming techniques using artificial intelligence. Learn to analyze soil health, predict crop yields, optimize water usage, and prevent diseases using smartphone-based AI tools.',
    category: ['Advanced', 'Agriculture', 'AI', 'Technology'],
    difficulty: 'advanced',
    duration: '10 weeks',
    weeks: 10,
    totalLessons: 32,
    format: ['video', 'ai-tools', 'data-analysis', 'project'],
    rating: 4.5,
    learners: 3100,
    tags: ['ai', 'farming', 'precision', 'data', 'analytics'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['analytical', 'visual', 'reading'],
      motivationType: ['curiosity', 'achievement', 'practical'],
      environment: ['quiet', 'mixed'],
      technical: ['expert'],
      focusDuration: ['extended', 'long'],
      confidenceLevel: ['very']
    },
    instructor: {
      name: 'Dr. Arjun Nair',
      role: 'AI Agriculture Researcher',
      bio: 'PhD in Agricultural AI. Developed predictive models used by 10,000+ farmers.',
      expertise: ['AI in Agriculture', 'Data Analytics', 'Crop Prediction', 'Resource Optimization'],
      avatarColor: 'from-indigo-500 to-purple-500'
    },
    features: [
      'AI tool demonstrations',
      'Data collection templates',
      'Yield prediction models',
      'Resource optimization calculators',
      'Disease detection algorithms',
      'Market trend analysis'
    ],
    prerequisites: [
      'Basic smartphone proficiency',
      'Farming experience',
      'Interest in technology',
      'Basic mathematics understanding'
    ],
    learningOutcomes: [
      'Use AI tools for soil analysis',
      'Predict crop yields accurately',
      'Optimize water and fertilizer usage',
      'Detect plant diseases early',
      'Analyze market trends',
      'Make data-driven farming decisions'
    ],
    certificate: true,
    offlineAvailable: false,
    language: ['English', 'Hindi', 'Kannada'],
    updated: '2024-01-02',
    popularity: 68
  },
  {
    id: 'community-digital-leadership',
    title: 'Community Digital Leadership',
    subtitle: 'Lead digital transformation in your village',
    description: 'Lead digital transformation in your village, train others, and manage community tech hubs.',
    detailedDescription: 'Become a digital leader in your community. Learn to set up digital literacy centers, train others, manage community projects, and advocate for digital inclusion. Create sustainable impact through technology.',
    category: ['Leadership', 'Social', 'Advanced', 'Community'],
    difficulty: 'advanced',
    duration: '9 weeks',
    weeks: 9,
    totalLessons: 30,
    format: ['video', 'mentorship', 'project', 'case-study'],
    rating: 4.7,
    learners: 3800,
    tags: ['leadership', 'community', 'training', 'management', 'digital-inclusion'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['social', 'auditory', 'kinesthetic'],
      motivationType: ['social', 'achievement', 'practical'],
      environment: ['social', 'active'],
      technical: ['comfortable', 'expert'],
      focusDuration: ['long', 'extended'],
      confidenceLevel: ['very', 'moderate']
    },
    instructor: {
      name: 'Meena Sharma',
      role: 'Community Development Expert',
      bio: '20 years in rural development. Established 200+ digital literacy centers across India.',
      expertise: ['Community Leadership', 'Digital Inclusion', 'Project Management', 'Training Design'],
      avatarColor: 'from-rose-500 to-pink-500'
    },
    features: [
      'Leadership skill development',
      'Training program templates',
      'Community engagement strategies',
      'Fundraising guidance',
      'Impact measurement tools',
      'Government collaboration frameworks'
    ],
    prerequisites: [
      'Basic digital literacy',
      'Community respect',
      'Communication skills',
      'Willingness to lead'
    ],
    learningOutcomes: [
      'Design digital literacy programs',
      'Train community members',
      'Manage community tech centers',
      'Secure funding for projects',
      'Measure program impact',
      'Advocate for digital inclusion'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'English', 'Bengali', 'Marathi'],
    updated: '2024-01-06',
    popularity: 72
  },
  {
    id: 'handicraft-online',
    title: 'Handicraft Business Online',
    subtitle: 'Sell traditional crafts on global platforms',
    description: 'Market and sell traditional handicrafts on national and international platforms.',
    detailedDescription: 'Transform traditional crafts into profitable online businesses. Learn product photography, storytelling, pricing, shipping, and international marketing. Preserve heritage while creating income.',
    category: ['Business', 'Creative', 'Heritage', 'E-commerce'],
    difficulty: 'intermediate',
    duration: '6 weeks',
    weeks: 6,
    totalLessons: 22,
    format: ['video', 'workshop', 'portfolio', 'marketplace'],
    rating: 4.7,
    learners: 6500,
    tags: ['handicraft', 'artisan', 'ecommerce', 'heritage', 'marketing'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['visual', 'kinesthetic', 'creative'],
      motivationType: ['achievement', 'creative', 'social'],
      environment: ['quiet', 'active'],
      technical: ['comfortable', 'basic'],
      focusDuration: ['medium', 'long'],
      confidenceLevel: ['moderate', 'very']
    },
    instructor: {
      name: 'Lakshmi Iyer',
      role: 'Handicraft Business Coach',
      bio: 'Helped 500+ artisans grow online businesses. Featured in national craft exhibitions.',
      expertise: ['Product Photography', 'Storytelling', 'Online Marketing', 'Export Procedures'],
      avatarColor: 'from-amber-500 to-orange-500'
    },
    features: [
      'Product photography studio setup',
      'Storytelling workshop',
      'Pricing strategy calculator',
      'International shipping guide',
      'Export documentation templates',
      'Social media marketing plan'
    ],
    prerequisites: [
      'Handicraft making skills',
      'Basic smartphone use',
      'Product to sell'
    ],
    learningOutcomes: [
      'Create professional product photos',
      'Write compelling product stories',
      'Price products for profit',
      'Handle domestic shipping',
      'Understand export procedures',
      'Market crafts internationally'
    ],
    certificate: true,
    offlineAvailable: false,
    language: ['Hindi', 'English', 'Tamil', 'Kashmiri', 'Assamese'],
    updated: '2024-01-09',
    popularity: 81
  },
  {
    id: 'water-management',
    title: 'Smart Water Management',
    subtitle: 'Conservation, harvesting & purification techniques',
    description: 'Learn water conservation, rainwater harvesting, and purification methods for rural areas.',
    detailedDescription: 'Address water challenges with technology and traditional wisdom. Learn rainwater harvesting, water purification, conservation techniques, and community water management systems.',
    category: ['Environment', 'Technical', 'Community', 'Sustainability'],
    difficulty: 'intermediate',
    duration: '5 weeks',
    weeks: 5,
    totalLessons: 18,
    format: ['video', 'field-guide', 'calculator', 'community-project'],
    rating: 4.6,
    learners: 4200,
    tags: ['water', 'conservation', 'harvesting', 'purification', 'environment'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['kinesthetic', 'visual', 'reading'],
      motivationType: ['practical', 'social', 'achievement'],
      environment: ['outdoor', 'active', 'social'],
      technical: ['comfortable', 'expert'],
      focusDuration: ['medium', 'long'],
      confidenceLevel: ['moderate', 'very']
    },
    instructor: {
      name: 'Professor R.K. Joshi',
      role: 'Water Management Expert',
      bio: '30 years in rural water projects. Designed systems for 1000+ villages.',
      expertise: ['Rainwater Harvesting', 'Water Purification', 'Conservation', 'Community Management'],
      avatarColor: 'from-blue-500 to-indigo-500'
    },
    features: [
      'Rainwater harvesting designs',
      'Water quality testing methods',
      'Conservation calculator',
      'Community engagement templates',
      'Government scheme applications',
      'Maintenance schedules'
    ],
    prerequisites: [
      'Interest in environmental issues',
      'Basic measurement skills',
      'Community involvement'
    ],
    learningOutcomes: [
      'Design rainwater harvesting systems',
      'Test and purify water',
      'Calculate water requirements',
      'Implement conservation techniques',
      'Mobilize community for water projects',
      'Apply for government funding'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'Marathi', 'Rajasthani', 'Gujarati'],
    updated: '2024-01-11',
    popularity: 75
  },
  {
    id: 'basic-computer-skills',
    title: 'Basic Computer Skills',
    subtitle: 'Essential computer operations for beginners',
    description: 'Learn computer basics, file management, internet, and essential software applications.',
    detailedDescription: 'Master computer fundamentals from scratch. Learn hardware components, operating systems, file management, internet browsing, and essential software like Word and Excel. Perfect for complete beginners.',
    category: ['Foundational', 'Technology', 'Essential', 'Beginner'],
    difficulty: 'beginner',
    duration: '4 weeks',
    weeks: 4,
    totalLessons: 16,
    format: ['video', 'interactive', 'simulation', 'practice'],
    rating: 4.8,
    learners: 23500,
    tags: ['computer', 'basics', 'msoffice', 'internet', 'beginners'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['visual', 'kinesthetic', 'reading'],
      motivationType: ['practical', 'achievement', 'curiosity'],
      environment: ['quiet', 'active'],
      technical: ['learning', 'basic'],
      focusDuration: ['short', 'medium'],
      confidenceLevel: ['nervous', 'cautious', 'moderate']
    },
    instructor: {
      name: 'Suresh Kumar',
      role: 'Computer Trainer',
      bio: '15 years teaching computer basics. Trained 20,000+ students from rural backgrounds.',
      expertise: ['Computer Fundamentals', 'MS Office', 'Internet Basics', 'Troubleshooting'],
      avatarColor: 'from-gray-500 to-slate-500'
    },
    features: [
      'Step-by-step video tutorials',
      'Interactive simulations',
      'Practice exercises',
      'Keyboard shortcuts guide',
      'Troubleshooting flowchart',
      'Progress tracking'
    ],
    prerequisites: [
      'No prior experience needed',
      'Reading ability',
      'Access to computer (optional)'
    ],
    learningOutcomes: [
      'Understand computer components',
      'Navigate operating systems',
      'Create and manage files',
      'Use word processing software',
      'Browse internet safely',
      'Troubleshoot basic issues'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali'],
    updated: '2024-01-13',
    popularity: 94
  },
  {
    id: 'yoga-wellness',
    title: 'Yoga & Digital Wellness',
    subtitle: 'Traditional yoga with digital tracking tools',
    description: 'Learn yoga practices and use digital tools for health tracking and wellness management.',
    detailedDescription: 'Combine ancient yoga practices with modern digital tracking. Learn asanas, pranayama, meditation, and use apps to track progress, manage stress, and improve overall wellbeing.',
    category: ['Health', 'Wellness', 'Traditional', 'Mindfulness'],
    difficulty: 'beginner',
    duration: '4 weeks',
    weeks: 4,
    totalLessons: 14,
    format: ['video', 'audio', 'tracking', 'community'],
    rating: 4.9,
    learners: 12800,
    tags: ['yoga', 'wellness', 'meditation', 'health', 'mindfulness'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['kinesthetic', 'auditory', 'visual'],
      motivationType: ['practical', 'social', 'achievement'],
      environment: ['quiet', 'outdoor', 'social'],
      technical: ['basic', 'comfortable'],
      focusDuration: ['short', 'medium'],
      confidenceLevel: ['cautious', 'moderate', 'nervous']
    },
    instructor: {
      name: 'Yogini Ananya',
      role: 'Yoga Therapist',
      bio: 'Certified yoga therapist with 10 years experience. Specialized in rural wellness programs.',
      expertise: ['Yoga Asanas', 'Pranayama', 'Meditation', 'Wellness Tracking'],
      avatarColor: 'from-lime-500 to-green-500'
    },
    features: [
      'Daily practice videos',
      'Breathing exercise audio',
      'Progress tracking app',
      'Community support group',
      'Wellness challenges',
      'Personalized routines'
    ],
    prerequisites: [
      'Comfortable clothing',
      'Quiet space for practice',
      'Open mind'
    ],
    learningOutcomes: [
      'Practice basic yoga asanas',
      'Master breathing techniques',
      'Meditate for stress relief',
      'Track wellness progress',
      'Create personal routine',
      'Join wellness community'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'English', 'Sanskrit', 'Tamil'],
    updated: '2024-01-04',
    popularity: 87
  },
  {
    id: 'disaster-preparedness',
    title: 'Digital Disaster Preparedness',
    subtitle: 'Early warning systems & emergency response',
    description: 'Use digital tools for disaster early warnings, emergency response, and community safety.',
    detailedDescription: 'Prepare for natural disasters with technology. Learn early warning systems, emergency communication, first aid apps, and community coordination tools. Special focus on flood, cyclone, and earthquake preparedness.',
    category: ['Safety', 'Community', 'Emergency', 'Technology'],
    difficulty: 'intermediate',
    duration: '4 weeks',
    weeks: 4,
    totalLessons: 15,
    format: ['video', 'simulation', 'checklist', 'drill'],
    rating: 4.7,
    learners: 5800,
    tags: ['disaster', 'safety', 'emergency', 'preparedness', 'community'],
    matchScore: 0,
    reason: '',
    dnaMatch: {
      learningStyle: ['visual', 'kinesthetic', 'auditory'],
      motivationType: ['practical', 'social', 'achievement'],
      environment: ['social', 'active', 'quiet'],
      technical: ['comfortable', 'basic'],
      focusDuration: ['short', 'medium'],
      confidenceLevel: ['moderate', 'cautious']
    },
    instructor: {
      name: 'Major Rajeev Malhotra',
      role: 'Disaster Management Expert',
      bio: 'Retired army officer with 25 years in disaster response. Led 50+ relief operations.',
      expertise: ['Emergency Response', 'Early Warning Systems', 'Community Training', 'First Aid'],
      avatarColor: 'from-red-500 to-orange-500'
    },
    features: [
      'Early warning app tutorials',
      'Emergency communication drills',
      'First aid video library',
      'Evacuation planning templates',
      'Resource inventory tracker',
      'Community coordination tools'
    ],
    prerequisites: [
      'Basic smartphone use',
      'Concern for community safety',
      'Willingness to lead'
    ],
    learningOutcomes: [
      'Use disaster warning apps',
      'Coordinate emergency response',
      'Provide basic first aid',
      'Create evacuation plans',
      'Manage emergency supplies',
      'Train community members'
    ],
    certificate: true,
    offlineAvailable: true,
    language: ['Hindi', 'English', 'Bengali', 'Odia', 'Assamese'],
    updated: '2024-01-16',
    popularity: 78
  }
]

// Helper functions
export function getCourseById(id: string): Course | undefined {
  return coursesDatabase.find(course => course.id === id)
}

export function getCoursesByCategory(category: string): Course[] {
  return coursesDatabase.filter(course => course.category.includes(category))
}

export function getPopularCourses(limit: number = 10): Course[] {
  return [...coursesDatabase]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}

export function getCoursesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Course[] {
  return coursesDatabase.filter(course => course.difficulty === difficulty)
}