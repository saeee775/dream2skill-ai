// src/lib/dnaAnalysis.ts
export interface DNAAnswers {
  learningStyle: string;
  informationProcessing: string;
  memoryRetention: string;
  problemSolving: string;
  motivationType: string;
  stressResponse: string;
  confidenceLevel: string;
  socialLearning: string;
  studyEnvironment: string;
  energyPatterns: string;
  focusDuration: string;
  techComfort: string;
  deviceUsage: string;
  internetStability: string;
  offlineNeeds: string;
}

export interface LearningProfile {
  primaryStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'social';
  secondaryStyle: 'sequential' | 'global' | 'analytical' | 'intuitive';
  pace: 'fast' | 'moderate' | 'slow';
  environment: 'quiet' | 'active' | 'flexible';
  careerFocus: 'technical' | 'creative' | 'business' | 'service' | 'entrepreneurial';
  motivation: 'achievement' | 'curiosity' | 'social' | 'practical';
  techLevel: 'expert' | 'comfortable' | 'basic' | 'learning';
  offlinePriority: 'critical' | 'important' | 'sometimes' | 'rarely';
  strengths: string[];
  challenges: string[];
  recommendedCourseIds: number[];
}

export function analyzeDNA(answers: DNAAnswers): LearningProfile {
  // Determine primary learning style
  let primaryStyle: LearningProfile['primaryStyle'] = 'visual';
  if (answers.learningStyle === 'visual') primaryStyle = 'visual';
  else if (answers.learningStyle === 'auditory') primaryStyle = 'auditory';
  else if (answers.learningStyle === 'kinesthetic') primaryStyle = 'kinesthetic';
  else if (answers.learningStyle === 'reading') primaryStyle = 'reading';
  else if (answers.socialLearning === 'prefer_group') primaryStyle = 'social';

  // Determine secondary processing style
  let secondaryStyle: LearningProfile['secondaryStyle'] = 'sequential';
  if (answers.informationProcessing === 'sequential') secondaryStyle = 'sequential';
  else if (answers.informationProcessing === 'global') secondaryStyle = 'global';
  else if (answers.informationProcessing === 'analytical') secondaryStyle = 'analytical';
  else if (answers.informationProcessing === 'intuitive') secondaryStyle = 'intuitive';

  // Determine learning pace
  let pace: LearningProfile['pace'] = 'moderate';
  if (answers.focusDuration === 'short') pace = 'slow';
  else if (answers.focusDuration === 'medium') pace = 'moderate';
  else if (answers.focusDuration === 'long' || answers.focusDuration === 'extended') pace = 'fast';

  // Determine environment preference
  let environment: LearningProfile['environment'] = 'flexible';
  if (answers.studyEnvironment === 'quiet') environment = 'quiet';
  else if (answers.studyEnvironment === 'active') environment = 'active';

  // Determine career focus based on interests and motivations
  let careerFocus: LearningProfile['careerFocus'] = 'technical';
  if (answers.motivationType === 'curiosity') careerFocus = 'technical';
  else if (answers.motivationType === 'creative' || answers.problemSolving === 'creative') careerFocus = 'creative';
  else if (answers.motivationType === 'social') careerFocus = 'service';
  else if (answers.motivationType === 'practical') careerFocus = 'business';
  else if (answers.confidenceLevel === 'very') careerFocus = 'entrepreneurial';

  // Determine motivation type
  let motivation: LearningProfile['motivation'] = 'achievement';
  if (answers.motivationType === 'achievement') motivation = 'achievement';
  else if (answers.motivationType === 'curiosity') motivation = 'curiosity';
  else if (answers.motivationType === 'social') motivation = 'social';
  else if (answers.motivationType === 'practical') motivation = 'practical';

  // Tech comfort level
  let techLevel: LearningProfile['techLevel'] = 'basic';
  if (answers.techComfort === 'expert') techLevel = 'expert';
  else if (answers.techComfort === 'comfortable') techLevel = 'comfortable';
  else if (answers.techComfort === 'basic') techLevel = 'basic';
  else if (answers.techComfort === 'learning') techLevel = 'learning';

  // Offline needs
  let offlinePriority: LearningProfile['offlinePriority'] = 'sometimes';
  if (answers.offlineNeeds === 'critical') offlinePriority = 'critical';
  else if (answers.offlineNeeds === 'important') offlinePriority = 'important';
  else if (answers.offlineNeeds === 'sometimes') offlinePriority = 'sometimes';
  else if (answers.offlineNeeds === 'rarely') offlinePriority = 'rarely';

  // Identify strengths
  const strengths: string[] = [];
  if (answers.learningStyle === 'visual') strengths.push('Strong visual processing and pattern recognition');
  if (answers.informationProcessing === 'global') strengths.push('Big-picture thinking and strategic planning');
  if (answers.problemSolving === 'creative') strengths.push('Creative problem-solving and innovation');
  if (answers.memoryRetention === 'association') strengths.push('Excellent pattern recognition and connections');
  if (answers.confidenceLevel === 'very') strengths.push('High confidence in learning new technologies');
  if (answers.socialLearning === 'prefer_group') strengths.push('Strong collaborative learning skills');

  // Identify challenges
  const challenges: string[] = [];
  if (answers.techComfort === 'learning') challenges.push('May need additional tech support initially');
  if (answers.focusDuration === 'short') challenges.push('Benefits from micro-learning approaches');
  if (answers.confidenceLevel === 'nervous') challenges.push('Needs encouragement and gradual progression');
  if (answers.internetStability === 'unstable') challenges.push('Requires reliable offline learning options');

  // Get recommended course IDs based on analysis
  const recommendedCourseIds = getRecommendedCourseIds({
    primaryStyle,
    secondaryStyle,
    careerFocus,
    techLevel,
    offlinePriority
  });

  return {
    primaryStyle,
    secondaryStyle,
    pace,
    environment,
    careerFocus,
    motivation,
    techLevel,
    offlinePriority,
    strengths,
    challenges,
    recommendedCourseIds
  };
}

function getRecommendedCourseIds(profile: {
  primaryStyle: string;
  secondaryStyle: string;
  careerFocus: string;
  techLevel: string;
  offlinePriority: string;
}): number[] {
  let courseIds: number[] = [];

  // Base recommendations on primary learning style
  switch (profile.primaryStyle) {
    case 'visual':
      courseIds = [1, 2, 7, 11]; // Design, Marketing, Data Visualization
      break;
    case 'auditory':
      courseIds = [8, 12, 15]; // Customer Service, Teaching, Sales
      break;
    case 'kinesthetic':
      courseIds = [3, 4, 9, 13]; // Mobile Repair, EV, Agriculture, Healthcare
      break;
    case 'reading':
      courseIds = [5, 6, 10, 14]; // Data Entry, Accounting, Content Writing
      break;
    case 'social':
      courseIds = [8, 12, 15, 16]; // Community roles, Teaching, Sales
      break;
  }

  // Filter by career focus
  courseIds = courseIds.filter(id => {
    const course = getCourseById(id);
    return course && course.careerFocus.includes(profile.careerFocus);
  });

  // Adjust for tech level - don't recommend advanced tech courses to beginners
  if (profile.techLevel === 'learning' || profile.techLevel === 'basic') {
    courseIds = courseIds.filter(id => {
      const course = getCourseById(id);
      return course && course.difficulty === 'beginner';
    });
  }

  // Prioritize offline-available courses if needed
  if (profile.offlinePriority === 'critical' || profile.offlinePriority === 'important') {
    courseIds = courseIds.filter(id => {
      const course = getCourseById(id);
      return course && course.offlineAvailable;
    });
  }

  return courseIds.slice(0, 4); // Return top 4 recommendations
}

// Mock course database
function getCourseById(id: number) {
  const courses = {
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
  return courses[id as keyof typeof courses];
}