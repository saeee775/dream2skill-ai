// apps/web/src/lib/dnaAnalysis.ts
import { Course } from './courses';

export interface UserDNA {
  learningStyle?: string;
  learningSpeed?: string;
  dailyTime?: string;
  difficultyHandling?: string;
  revisionNeeds?: string;
  applicationSpeed?: string;
  focusDuration?: string;
  motivationType?: string;
  confidenceLevel?: string;
  // ... other DNA fields
}

export interface PersonalizedCourse extends Course {
  matchScore: number;
  personalizedPace: 'slowPaced' | 'averagePaced' | 'fastPaced';
  estimatedCompletionTime: string;
  learningPlan: {
    weeklySchedule: string[];
    studyTips: string[];
    difficultyAdjustments: string[];
  };
}

export function analyzeDNAAndPersonalizeCourses(userDNA: UserDNA, allCourses: Course[]): PersonalizedCourse[] {
  return allCourses.map(course => {
    const matchScore = calculateDNAScore(userDNA, course);
    const personalizedPace = determinePace(userDNA);
    
    return {
      ...course,
      matchScore,
      personalizedPace,
      estimatedCompletionTime: calculateEstimatedTime(course, personalizedPace),
      learningPlan: createLearningPlan(userDNA, course, personalizedPace)
    };
  }).sort((a, b) => b.matchScore - a.matchScore); // Sort by best match
}

function calculateDNAScore(userDNA: UserDNA, course: Course): number {
  let score = 0;
  const totalPossible = 100;
  
  // Learning Style Match (20 points)
  if (userDNA.learningStyle && course.dnaCompatibility.learningStyles.includes(userDNA.learningStyle)) {
    score += 20;
  }
  
  // Learning Speed Match (20 points)
  if (userDNA.learningSpeed && course.dnaCompatibility.difficultyLevels.includes(userDNA.learningSpeed)) {
    score += 20;
  }
  
  // Focus Duration Match (15 points)
  if (userDNA.focusDuration && course.dnaCompatibility.focusDurations.includes(userDNA.focusDuration)) {
    score += 15;
  }
  
  // Revision Needs Match (15 points)
  if (userDNA.revisionNeeds && course.dnaCompatibility.revisionNeeds.includes(userDNA.revisionNeeds)) {
    score += 15;
  }
  
  // Motivation Match (15 points)
  if (userDNA.motivationType && course.dnaCompatibility.motivationTypes.includes(userDNA.motivationType)) {
    score += 15;
  }
  
  // Confidence Level Adjustment (15 points)
  if (userDNA.confidenceLevel === 'very' && course.difficulty === 'Advanced') {
    score += 15;
  } else if (userDNA.confidenceLevel === 'nervous' && course.difficulty === 'Beginner') {
    score += 15;
  } else if (userDNA.confidenceLevel === 'moderate' && course.difficulty === 'Intermediate') {
    score += 15;
  }
  
  return score;
}

function determinePace(userDNA: UserDNA): 'slowPaced' | 'averagePaced' | 'fastPaced' {
  const learningSpeed = userDNA.learningSpeed;
  const dailyTime = userDNA.dailyTime;
  const focusDuration = userDNA.focusDuration;
  
  // Determine pace based on DNA analysis
  if (learningSpeed === 'very_slow' || learningSpeed === 'slow') {
    return 'slowPaced';
  } else if (learningSpeed === 'very_fast' || learningSpeed === 'fast') {
    if (dailyTime === 'more_3_hours' || focusDuration === 'extended') {
      return 'fastPaced';
    }
    return 'averagePaced';
  } else if (learningSpeed === 'average') {
    return 'averagePaced';
  }
  
  // Default based on daily time available
  if (dailyTime === '30_min') {
    return 'slowPaced';
  } else if (dailyTime === 'more_3_hours') {
    return 'fastPaced';
  }
  
  return 'averagePaced'; // Default
}

function calculateEstimatedTime(course: Course, pace: 'slowPaced' | 'averagePaced' | 'fastPaced'): string {
  const baseWeeks = parseInt(course.duration.split(' ')[0]);
  const lessonCount = course.lessons;
  
  // Adjust time based on pace
  let multiplier = 1;
  if (pace === 'slowPaced') {
    multiplier = 1.5; // 50% longer
  } else if (pace === 'fastPaced') {
    multiplier = 0.75; // 25% faster
  }
  
  const estimatedWeeks = Math.ceil(baseWeeks * multiplier);
  return `${estimatedWeeks} weeks`;
}

function createLearningPlan(userDNA: UserDNA, course: Course, pace: 'slowPaced' | 'averagePaced' | 'fastPaced'): {
  weeklySchedule: string[];
  studyTips: string[];
  difficultyAdjustments: string[];
} {
  const weeklySchedule = [];
  const studyTips = [];
  const difficultyAdjustments = [];
  
  const variant = course.lessonVariants[pace];
  
  // Create weekly schedule based on pace
  if (pace === 'slowPaced') {
    weeklySchedule.push(
      `📅 Study Plan: ${variant.lessonDuration}-minute lessons`,
      `⏸️ Take ${variant.breaks} breaks during each lesson`,
      `🔄 Review concepts ${variant.repetitionCount} times`,
      `📚 Study ${Math.ceil(course.lessons / 5)} days per week`
    );
  } else if (pace === 'averagePaced') {
    weeklySchedule.push(
      `📅 Study Plan: ${variant.lessonDuration}-minute lessons`,
      `⏸️ Take ${variant.breaks} break during each lesson`,
      `🔄 Review concepts ${variant.repetitionCount} times`,
      `📚 Study ${Math.ceil(course.lessons / 4)} days per week`
    );
  } else {
    weeklySchedule.push(
      `📅 Study Plan: ${variant.lessonDuration}-minute lessons`,
      `⚡ Intensive learning sessions`,
      `🔄 Review concepts ${variant.repetitionCount} time`,
      `📚 Study ${Math.ceil(course.lessons / 3)} days per week`
    );
  }
  
  // Add study tips based on DNA
  if (userDNA.learningStyle === 'visual') {
    studyTips.push('👀 Watch all video demonstrations carefully', '📊 Use diagrams and charts for better understanding');
  } else if (userDNA.learningStyle === 'auditory') {
    studyTips.push('👂 Listen to audio explanations multiple times', '💬 Discuss concepts with study partners');
  } else if (userDNA.learningStyle === 'kinesthetic') {
    studyTips.push('🛠️ Practice all hands-on exercises', '🔧 Try the practical assignments immediately');
  }
  
  // Add difficulty adjustments
  if (userDNA.learningSpeed === 'slow' || userDNA.learningSpeed === 'very_slow') {
    difficultyAdjustments.push('🐢 Extra examples provided for difficult concepts', '📝 Step-by-step breakdown of complex topics', '🔄 Additional practice exercises');
  } else if (userDNA.learningSpeed === 'fast' || userDNA.learningSpeed === 'very_fast') {
    difficultyAdjustments.push('⚡ Advanced challenges included', '🚀 Bonus materials for quick learners', '💡 Deep-dive into advanced topics');
  }
  
  if (userDNA.revisionNeeds === 'always' || userDNA.revisionNeeds === 'frequently') {
    difficultyAdjustments.push('🔄 Spaced repetition system activated', '📖 Frequent revision quizzes', '🎯 Memory reinforcement exercises');
  }
  
  return { weeklySchedule, studyTips, difficultyAdjustments };
}