// apps/web/src/app/dashboard/learning/recommendations/page.tsx - UPDATE THIS FILE
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Brain, Zap, Target, Clock, Users, Star, ArrowRight, BookOpen, TrendingUp, Briefcase, CheckCircle, Sparkles } from 'lucide-react'; // ADDED Sparkles here

// DNA Analysis Function - Copy this at the top of the file
function analyzeDNA(answers: any) {
  let primaryStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'social' = 'visual';
  if (answers.learningStyle === 'visual') primaryStyle = 'visual';
  else if (answers.learningStyle === 'auditory') primaryStyle = 'auditory';
  else if (answers.learningStyle === 'kinesthetic') primaryStyle = 'kinesthetic';
  else if (answers.learningStyle === 'reading') primaryStyle = 'reading';
  else if (answers.socialLearning === 'prefer_group') primaryStyle = 'social';

  let careerFocus: 'technical' | 'creative' | 'business' | 'service' | 'entrepreneurial' = 'technical';
  if (answers.motivationType === 'curiosity') careerFocus = 'technical';
  else if (answers.motivationType === 'creative' || answers.problemSolving === 'creative') careerFocus = 'creative';
  else if (answers.motivationType === 'social') careerFocus = 'service';
  else if (answers.motivationType === 'practical') careerFocus = 'business';
  else if (answers.confidenceLevel === 'very') careerFocus = 'entrepreneurial';

  let techLevel: 'expert' | 'comfortable' | 'basic' | 'learning' = 'basic';
  if (answers.techComfort === 'expert') techLevel = 'expert';
  else if (answers.techComfort === 'comfortable') techLevel = 'comfortable';
  else if (answers.techComfort === 'basic') techLevel = 'basic';
  else if (answers.techComfort === 'learning') techLevel = 'learning';

  const strengths: string[] = [];
  if (answers.learningStyle === 'visual') strengths.push('Strong visual processing');
  if (answers.informationProcessing === 'global') strengths.push('Big-picture thinking');
  if (answers.problemSolving === 'creative') strengths.push('Creative problem-solving');
  if (answers.memoryRetention === 'association') strengths.push('Excellent pattern recognition');
  if (answers.confidenceLevel === 'very') strengths.push('High confidence in learning');

  const recommendedCourseIds = getRecommendedCourseIds(primaryStyle, careerFocus, techLevel, answers.offlineNeeds);

  return {
    primaryStyle,
    careerFocus,
    techLevel,
    strengths,
    recommendedCourseIds
  };
}

function getRecommendedCourseIds(primaryStyle: string, careerFocus: string, techLevel: string, offlineNeeds: string) {
  let courseIds: number[] = [];

  // Base recommendations on learning style
  switch (primaryStyle) {
    case 'visual':
      courseIds = [1, 2, 7, 11, 16];
      break;
    case 'auditory':
      courseIds = [8, 12, 15];
      break;
    case 'kinesthetic':
      courseIds = [3, 4, 9, 13];
      break;
    case 'reading':
      courseIds = [5, 6, 10, 14];
      break;
    case 'social':
      courseIds = [8, 12, 15, 16];
      break;
  }

  // Filter by career focus
  courseIds = courseIds.filter(id => {
    const course = getCourseById(id);
    return course && course.careerFocus.includes(careerFocus);
  });

  // Adjust for tech level
  if (techLevel === 'learning' || techLevel === 'basic') {
    courseIds = courseIds.filter(id => {
      const course = getCourseById(id);
      return course && course.difficulty === 'beginner';
    });
  }

  // Prioritize offline courses if needed
  if (offlineNeeds === 'critical' || offlineNeeds === 'important') {
    courseIds = courseIds.filter(id => {
      const course = getCourseById(id);
      return course && course.offlineAvailable;
    });
  }

  return courseIds.slice(0, 4);
}

function getCourseById(id: number) {
  const courses: any = {
    1: { id: 1, title: "Graphic Design Fundamentals", careerFocus: ['creative', 'technical'], difficulty: 'beginner', offlineAvailable: true },
    2: { id: 2, title: "Digital Marketing with Visual Analytics", careerFocus: ['creative', 'business'], difficulty: 'beginner', offlineAvailable: true },
    3: { id: 3, title: "Mobile Repair Technician", careerFocus: ['technical', 'service'], difficulty: 'intermediate', offlineAvailable: false },
    4: { id: 4, title: "Electric Vehicle Basics", careerFocus: ['technical'], difficulty: 'intermediate', offlineAvailable: true },
    5: { id: 5, title: "Data Entry & Excel Mastery", careerFocus: ['technical', 'business'], difficulty: 'beginner', offlineAvailable: true },
    6: { id: 6, title: "Basic Accounting & Bookkeeping", careerFocus: ['business'], difficulty: 'beginner', offlineAvailable: true },
    7: { id: 7, title: "Data Visualization with Charts", careerFocus: ['technical', 'creative'], difficulty: 'intermediate', offlineAvailable: true },
    8: { id: 8, title: "Community Health Worker", careerFocus: ['service'], difficulty: 'beginner', offlineAvailable: true },
    9: { id: 9, title: "Modern Agriculture Techniques", careerFocus: ['technical', 'entrepreneurial'], difficulty: 'beginner', offlineAvailable: true },
    10: { id: 10, title: "Content Writing & Blogging", careerFocus: ['creative', 'business'], difficulty: 'beginner', offlineAvailable: true },
    11: { id: 11, title: "UI/UX Design Basics", careerFocus: ['creative', 'technical'], difficulty: 'intermediate', offlineAvailable: true },
    12: { id: 12, title: "Teaching Assistant Training", careerFocus: ['service', 'social'], difficulty: 'beginner', offlineAvailable: true },
    13: { id: 13, title: "Basic Healthcare Assistant", careerFocus: ['service'], difficulty: 'beginner', offlineAvailable: true },
    14: { id: 14, title: "Freelance Writing Mastery", careerFocus: ['creative', 'entrepreneurial'], difficulty: 'intermediate', offlineAvailable: true },
    15: { id: 15, title: "Sales & Customer Relations", careerFocus: ['business', 'social'], difficulty: 'beginner', offlineAvailable: true },
    16: { id: 16, title: "Social Media Management", careerFocus: ['creative', 'business'], difficulty: 'beginner', offlineAvailable: true }
  };
  return courses[id];
}

// Course Data
const courseRecommendations = {
  1: {
    id: 1,
    title: "Graphic Design Fundamentals",
    description: "Learn design principles through interactive visual exercises and projects",
    duration: "18 hours",
    level: "Beginner",
    students: "3.1K",
    rating: 4.9,
    skills: ["Adobe Photoshop", "Design Theory", "Branding"],
    match: 92,
    icon: "🎨",
    gradient: "from-blue-500 to-cyan-500",
    careerPath: "Graphic Designer",
    offlineAvailable: true
  },
  2: {
    id: 2,
    title: "Digital Marketing with Visual Analytics",
    description: "Master digital marketing through visual data analysis and infographic creation",
    duration: "12 hours",
    level: "Beginner",
    students: "2.4K",
    rating: 4.8,
    skills: ["Social Media", "Data Visualization", "Content Creation"],
    match: 95,
    icon: "📊",
    gradient: "from-purple-500 to-pink-500",
    careerPath: "Digital Marketer",
    offlineAvailable: true
  },
  3: {
    id: 3,
    title: "Mobile Repair Technician",
    description: "Hands-on training in smartphone repair and maintenance",
    duration: "24 hours",
    level: "Intermediate",
    students: "1.8K",
    rating: 4.7,
    skills: ["Hardware Repair", "Troubleshooting", "Customer Service"],
    match: 98,
    icon: "📱",
    gradient: "from-green-500 to-emerald-500",
    careerPath: "Mobile Technician",
    offlineAvailable: false
  },
  4: {
    id: 4,
    title: "Electric Vehicle Basics",
    description: "Practical skills in EV maintenance and charging setup",
    duration: "20 hours",
    level: "Intermediate",
    students: "1.2K",
    rating: 4.6,
    skills: ["EV Maintenance", "Battery Systems", "Safety Protocols"],
    match: 89,
    icon: "🔋",
    gradient: "from-orange-500 to-red-500",
    careerPath: "EV Technician",
    offlineAvailable: true
  },
  5: {
    id: 5,
    title: "Data Entry & Excel Mastery",
    description: "Master spreadsheet management and data analysis techniques",
    duration: "16 hours",
    level: "Beginner",
    students: "4.2K",
    rating: 4.8,
    skills: ["Excel", "Data Management", "Analysis"],
    match: 94,
    icon: "📈",
    gradient: "from-indigo-500 to-purple-500",
    careerPath: "Data Entry Specialist",
    offlineAvailable: true
  },
  6: {
    id: 6,
    title: "Basic Accounting & Bookkeeping",
    description: "Learn financial record keeping and accounting principles",
    duration: "22 hours",
    level: "Intermediate",
    students: "2.7K",
    rating: 4.7,
    skills: ["Accounting", "Bookkeeping", "Financial Math"],
    match: 91,
    icon: "💰",
    gradient: "from-green-500 to-teal-500",
    careerPath: "Account Assistant",
    offlineAvailable: true
  },
  7: {
    id: 7,
    title: "Data Visualization with Charts",
    description: "Create compelling visual stories with data and analytics",
    duration: "14 hours",
    level: "Intermediate",
    students: "1.5K",
    rating: 4.8,
    skills: ["Charts", "Data Storytelling", "Analytics"],
    match: 90,
    icon: "📊",
    gradient: "from-cyan-500 to-blue-500",
    careerPath: "Data Analyst",
    offlineAvailable: true
  },
  8: {
    id: 8,
    title: "Community Health Worker",
    description: "Learn essential healthcare skills for community service",
    duration: "28 hours",
    level: "Beginner",
    students: "3.3K",
    rating: 4.9,
    skills: ["First Aid", "Health Education", "Community Outreach"],
    match: 96,
    icon: "🏥",
    gradient: "from-red-500 to-pink-500",
    careerPath: "Health Worker",
    offlineAvailable: true
  }
};

export default function CourseRecommendations() {
  const { user } = useAuth();
  const router = useRouter();
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dnaAnswers = JSON.parse(localStorage.getItem('user_dna_answers') || '{}');
    
    if (Object.keys(dnaAnswers).length === 0) {
      router.push('/dashboard/learning');
      return;
    }

    const profile = analyzeDNA(dnaAnswers);
    setUserProfile(profile);
    
    const courses = profile.recommendedCourseIds.map((id: number) => 
      courseRecommendations[id as keyof typeof courseRecommendations]
    ).filter(Boolean);
    
    setRecommendedCourses(courses);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-300">Analyzing your learning DNA...</p>
        </div>
      </div>
    );
  }

  const getLearningStyleName = (style: string) => {
    const styles: { [key: string]: string } = {
      visual: 'Visual Learner',
      auditory: 'Auditory Learner', 
      kinesthetic: 'Hands-On Learner',
      reading: 'Reading Learner',
      social: 'Social Learner'
    };
    return styles[style] || 'Adaptive Learner';
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Brain className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                YOUR AI-GENERATED
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                LEARNING PATH
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto font-light"
          >
            Based on your <span className="text-cyan-400 font-semibold">AI Learner DNA analysis</span>, 
            we've curated these specialized courses that match your learning style, interests, and career goals.
          </motion.p>

          {/* DNA Insights Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
          >
            <div className="bg-gray-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-bold text-cyan-400 mb-2">Learning Style</h3>
              <p className="text-gray-300">{getLearningStyleName(userProfile.primaryStyle)}</p>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold text-purple-400 mb-2">Career Focus</h3>
              <p className="text-gray-300 capitalize">{userProfile.careerFocus}</p>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-bold text-blue-400 mb-2">Tech Level</h3>
              <p className="text-gray-300 capitalize">{userProfile.techLevel}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              PERSONALIZED COURSE RECOMMENDATIONS
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
              >
                {/* Match Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-gray-900 px-4 py-2 rounded-full font-black text-sm z-10">
                  {course.match}% MATCH
                </div>

                {/* Course Header */}
                <div className="flex items-start space-x-6 mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${course.gradient} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-3">
                      {course.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {course.description}
                    </p>
                    
                    {/* Career Path */}
                    <div className="flex items-center space-x-2 text-cyan-400 mb-4">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-semibold">Career Path: {course.careerPath}</span>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{course.level}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{course.rating}/5.0</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.skills.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-black py-4 rounded-2xl flex items-center justify-center space-x-3 group/btn hover:shadow-2xl transition-all duration-300"
                >
                  <span>START LEARNING</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strengths Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3" />
            Your Learning Strengths
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {userProfile.strengths.map((strength: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-800/50 rounded-xl p-4">
                <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">{strength}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alternative Paths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-300 mb-6">
            Not quite right? Explore other learning paths:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Technical Skills', 'Business & Marketing', 'Creative Arts', 'Agriculture Tech', 'Healthcare'].map((path) => (
              <motion.button
                key={path}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-gray-800/40 border border-white/10 rounded-xl text-gray-300 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300"
              >
                {path}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}