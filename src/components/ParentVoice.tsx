'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Volume2, VolumeX, Play, Pause,
  Heart, Star, Home, School, GraduationCap,
  MessageCircle, Share2, BookOpen, Target
} from 'lucide-react'

interface ParentVoiceProps {
  childName: string
  courseName: string
  currentLesson: string
  progressPercent: number
  jobPath?: string
  language: 'hindi' | 'marathi' | 'telugu' | 'tamil' | 'kannada' | 'bengali' | 'english'
}

export default function ParentVoice({ 
  childName = 'राहुल',
  courseName = 'स्मार्टफोन बेसिक्स',
  currentLesson = 'मोबाइल फोन का बेसिक इस्तेमाल',
  progressPercent = 65,
  jobPath = 'डिजिटल साक्षरता कार्यकर्ता',
  language = 'hindi'
}: ParentVoiceProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [volume, setVolume] = useState(70)

  // Get parent message based on language
  const getParentMessage = () => {
    const messages = {
      hindi: {
        introduction: `नमस्ते, मैं सरिता हूं। मैं ड्रीम2स्किल पर आपके बच्चे ${childName} की मार्गदर्शक हूं।`,
        currentLearning: `आज ${childName} "${courseName}" कोर्स में "${currentLesson}" सीख रहे हैं।`,
        realLifeExample: `यह स्किल रोजमर्रा की जिंदगी में बहुत काम आती है। जैसे कि मोबाइल से बैंकिंग करना, ऑनलाइन बिल भरना, या डॉक्टर से वीडियो कॉल पर बात करना।`,
        jobBenefit: `इससे ${childName} भविष्य में ${jobPath} के रूप में काम कर सकते हैं, या फिर अपना छोटा बिज़नेस शुरू कर सकते हैं।`,
        progress: `${childName} बहुत अच्छा प्रयास कर रहे हैं। वे पिछले सप्ताह से लगातार सीख रहे हैं।`,
        encouragement: `कृपया ${childName} को प्रोत्साहित करें। उनसे पूछें कि आज उन्होंने क्या नया सीखा। धीरे-धीरे सीखना कोई समस्या नहीं है - निरंतर प्रयास सबसे ज़रूरी है।`
      },
      marathi: {
        introduction: `नमस्कार, मी सरिता आहे. मी ड्रीम2स्किल वर तुमच्या मुला/मुली ${childName} ची मार्गदर्शक आहे.`,
        currentLearning: `आज ${childName} "${courseName}" कोर्स मध्ये "${currentLesson}" शिकत आहेत.`,
        realLifeExample: `हे कौशल्य दैनंदिन जीवनात खूप उपयोगी आहे. उदाहरणार्थ, मोबाईल वरून बँकिंग करणे, ऑनलाइन बिल भरणे किंवा डॉक्टरांशी व्हिडिओ कॉल वर बोलणे.`,
        jobBenefit: `यामुळे ${childName} भविष्यात ${jobPath} म्हणून काम करू शकतात, किंवा स्वतःचा छोटा व्यवसाय सुरू करू शकतात.`,
        progress: `${childName} खूप चांगली मेहनत करत आहेत. ते गेल्या आठवड्यापासून सातत्याने शिकत आहेत.`,
        encouragement: `कृपया ${childName} ला प्रोत्साहित करा. त्यांना विचारा की आज त्यांनी काय नवीन शिकलं. हळूहळू शिकणं ही काही समस्या नाही - सातत्याने प्रयत्न करणं सर्वात महत्वाचं आहे.`
      },
      english: {
        introduction: `Hello, I'm Sarita. I'm your child ${childName}'s guide on Dream2Skill.`,
        currentLearning: `Today, ${childName} is learning "${currentLesson}" in the "${courseName}" course.`,
        realLifeExample: `This skill is very useful in daily life. For example, using mobile for banking, paying bills online, or talking to doctor on video call.`,
        jobBenefit: `This will help ${childName} work as a ${jobPath} in future, or start their own small business.`,
        progress: `${childName} is making very good effort. They have been learning consistently since last week.`,
        encouragement: `Please encourage ${childName}. Ask them what new thing they learned today. Learning slowly is not a problem - continuous effort is most important.`
      },
      tamil: {
        introduction: `வணக்கம், நான் சரிதா. நான் உங்கள் குழந்தை ${childName} இன் ட்ரீம்2ஸ்கில் வழிகாட்டியாக இருக்கிறேன்.`,
        currentLearning: `இன்று, ${childName} "${courseName}" பாடத்தில் "${currentLesson}" கற்றுக்கொள்கிறார்கள்.`,
        realLifeExample: `இந்த திறமை அன்றாட வாழ்க்கையில் மிகவும் பயனுள்ளதாக இருக்கும். உதாரணமாக, மொபைல் மூலம் வங்கி பணிகள் செய்தல், ஆன்லைனில் பில் செலுத்துதல் அல்லது மருத்துவருடன் வீடியோ கால் மூலம் பேசுதல்.`,
        jobBenefit: `இது ${childName} க்கு எதிர்காலத்தில் ${jobPath} ஆக பணியாற்ற உதவும், அல்லது சொந்த சிறு வணிகத்தை தொடங்க உதவும்.`,
        progress: `${childName} மிக நல்ல முயற்சி செய்து வருகிறார்கள். கடந்த வாரத்திலிருந்து அவர்கள் தொடர்ந்து கற்றுக்கொண்டு வருகிறார்கள்.`,
        encouragement: `தயவுசெய்து ${childName} ஐ ஊக்குவிக்கவும். இன்று அவர்கள் என்ன புதிதாக கற்றுக்கொண்டார்கள் என்று கேளுங்கள். மெதுவாக கற்றுக்கொள்வது எந்த பிரச்சனையும் இல்லை - தொடர்ச்சியான முயற்சியே மிக முக்கியமானது.`
      },
      telugu: {
        introduction: `నమస్కారం, నేను సరితా. నేను మీ పిల్లలైన ${childName} కి డ్రీమ్2స్కిల్ లో మార్గదర్శిని.`,
        currentLearning: `ఈరోజు, ${childName} "${courseName}" కోర్సులో "${currentLesson}" నేర్చుకుంటున్నారు.`,
        realLifeExample: `ఈ నైపుణ్యం రోజువారీ జీవితంలో చాలా ఉపయోగకరంగా ఉంటుంది. ఉదాహరణకు, మొబైల్ ద్వారా బ్యాంకింగ్ చేయడం, ఆన్లైన్లో బిల్లులు చెల్లించడం లేదా డాక్టర్తో వీడియో కాల్ ద్వారా మాట్లాడటం.`,
        jobBenefit: `ఇది ${childName} కి భవిష్యత్తులో ${jobPath} గా పని చేయడంలో సహాయపడుతుంది, లేదా వారి స్వంత చిన్న వ్యాపారాన్ని ప్రారంభించడంలో సహాయపడుతుంది.`,
        progress: `${childName} చాలా మంచి ప్రయత్నం చేస్తున్నారు. వారు గత వారం నుండి నిలకడగా నేర్చుకుంటున్నారు.`,
        encouragement: `దయచేసి ${childName} ను ప్రోత్సహించండి. ఈరోజు వారు ఏం కొత్తగా నేర్చుకున్నారో అడగండి. నెమ్మదిగా నేర్చుకోవడం ఎలాంటి సమస్య కాదు - నిరంతర ప్రయత్నం చేయడం చాలా ముఖ్యం.`
      }
    }

    return messages[currentLanguage] || messages.hindi
  }

  const message = getParentMessage()

  // Simulate voice playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying) {
      let progress = 0
      interval = setInterval(() => {
        progress += 1
        if (progress >= 100) {
          setIsPlaying(false)
          clearInterval(interval)
        }
      }, 60)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleChangeLanguage = (lang: typeof language) => {
    setCurrentLanguage(lang)
    setIsPlaying(false)
  }

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-4 border-amber-200 shadow-xl">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Parent Voice</h2>
              <p className="text-amber-100">For parents of {childName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-white" />
            <span className="text-white font-bold">❤️</span>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="p-4 bg-amber-100 border-b border-amber-200">
        <div className="flex flex-wrap gap-2">
          {['hindi', 'marathi', 'tamil', 'telugu', 'english'].map((lang) => (
            <button
              key={lang}
              onClick={() => handleChangeLanguage(lang as typeof language)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentLanguage === lang
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-50'
              }`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-gray-800">{childName}'s Learning Progress</span>
            </div>
            <span className="font-bold text-orange-600">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-amber-100 rounded-full">
            <div 
              className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Start</span>
            <span>Halfway</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Parent Message */}
        <div className="mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-amber-200 flex-1">
              <div className="space-y-4">
                <p className="text-gray-800 leading-relaxed">{message.introduction}</p>
                <p className="text-gray-800 leading-relaxed">{message.currentLearning}</p>
                <p className="text-gray-800 leading-relaxed">{message.realLifeExample}</p>
                <p className="text-gray-800 leading-relaxed">{message.jobBenefit}</p>
                <p className="text-gray-800 leading-relaxed">{message.progress}</p>
                <p className="text-gray-800 leading-relaxed font-medium text-orange-600">
                  {message.encouragement}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Controls */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlay}
                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <VolumeX className="w-5 h-5 text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-32 accent-orange-500"
                />
                <Volume2 className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              {isPlaying ? 'Playing...' : 'Click play to listen'}
            </div>
          </div>
          
          {/* Playback Progress */}
          {isPlaying && (
            <div className="mt-4">
              <div className="w-full h-2 bg-amber-100 rounded-full">
                <div className="h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-progress"></div>
              </div>
            </div>
          )}
        </div>

        {/* Learning Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Current Course</div>
                <div className="font-bold text-gray-800">{courseName}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Future Path</div>
                <div className="font-bold text-gray-800">{jobPath}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center">
            <Share2 className="w-5 h-5 mr-2" />
            Share with Family
          </button>
          
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            View Full Report
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-start space-x-3">
            <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-green-600">Parent Tip:</span> Ask your child to teach you one thing they learned today. Learning together strengthens family bonds!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}