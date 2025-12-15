'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Volume2, VolumeX, Play, Pause,
  Heart, Star, Home, School, GraduationCap,
  MessageCircle, Share2, BookOpen, Target,
  RotateCcw, Download, Languages, Mic, MicOff,
  Send, MessageSquare, Brain, CheckCircle
} from 'lucide-react'

interface ParentVoiceProps {
  childName: string
  courseName: string
  currentLesson: string
  progressPercent: number
  jobPath?: string
  language: string
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
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechProgress, setSpeechProgress] = useState(0)
  const [parentQuestion, setParentQuestion] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isParent: boolean}>>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef<any>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // All 12 Indian languages with proper codes
  const indianLanguages = [
    { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
    { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'bn-IN', name: 'Bengali', native: 'বাংলা' },
    { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or-IN', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'as-IN', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'en-IN', name: 'English', native: 'English' }
  ]

  // Get current language object
  const getCurrentLanguageObj = () => {
    return indianLanguages.find(lang => 
      lang.code === currentLanguage || 
      lang.name.toLowerCase() === currentLanguage.toLowerCase()
    ) || indianLanguages[0]
  }

  // Get parent message based on language
  const getParentMessage = () => {
    const lang = getCurrentLanguageObj()
    const langName = lang.name.toLowerCase()
    
    const messages: Record<string, any> = {
      hindi: {
        fullMessage: `नमस्ते, मैं सरिता हूं। मैं ड्रीम2स्किल पर आपके बच्चे ${childName} की मार्गदर्शक हूं।

आज ${childName} "${courseName}" कोर्स में "${currentLesson}" सीख रहे हैं।

यह स्किल रोजमर्रा की जिंदगी में बहुत काम आती है। जैसे कि मोबाइल से बैंकिंग करना, ऑनलाइन बिल भरना, या डॉक्टर से वीडियो कॉल पर बात करना।

इससे ${childName} भविष्य में ${jobPath} के रूप में काम कर सकते हैं, या फिर अपना छोटा बिज़नेस शुरू कर सकते हैं।

${childName} बहुत अच्छा प्रयास कर रहे हैं। वे पिछले सप्ताह से लगातार सीख रहे हैं।

कृपया ${childName} को प्रोत्साहित करें। उनसे पूछें कि आज उन्होंने क्या नया सीखा। धीरे-धीरे सीखना कोई समस्या नहीं है - निरंतर प्रयास सबसे ज़रूरी है।`,
        
        introduction: `नमस्ते, मैं सरिता हूं। मैं ड्रीम2स्किल पर आपके बच्चे ${childName} की मार्गदर्शक हूं।`,
        currentLearning: `आज ${childName} "${courseName}" कोर्स में "${currentLesson}" सीख रहे हैं।`,
        realLifeExample: `यह स्किल रोजमर्रा की जिंदगी में बहुत काम आती है। जैसे कि मोबाइल से बैंकिंग करना, ऑनलाइन बिल भरना, या डॉक्टर से वीडियो कॉल पर बात करना।`,
        jobBenefit: `इससे ${childName} भविष्य में ${jobPath} के रूप में काम कर सकते हैं, या फिर अपना छोटा बिज़नेस शुरू कर सकते हैं।`,
        progress: `${childName} बहुत अच्छा प्रयास कर रहे हैं। वे पिछले सप्ताह से लगातार सीख रहे हैं।`,
        encouragement: `कृपया ${childName} को प्रोत्साहित करें। उनसे पूछें कि आज उन्होंने क्या नया सीखा। धीरे-धीरे सीखना कोई समस्या नहीं है - निरंतर प्रयास सबसे ज़रूरी है।`,
        welcome: `नमस्ते! मैं आपके बच्चे ${childName} के बारे में बता सकती हूं। आप बोलकर पूछ सकते हैं!`
      },
      marathi: {
        fullMessage: `नमस्कार, मी सरिता आहे. मी ड्रीम2स्किल वर तुमच्या मुला/मुली ${childName} ची मार्गदर्शक आहे.

आज ${childName} "${courseName}" कोर्स मध्ये "${currentLesson}" शिकत आहेत.

हे कौशल्य दैनंदिन जीवनात खूप उपयोगी आहे. उदाहरणार्थ, मोबाईल वरून बँकिंग करणे, ऑनलाइन बिल भरणे किंवा डॉक्टरांशी व्हिडिओ कॉल वर बोलणे.

यामुळे ${childName} भविष्यात ${jobPath} म्हणून काम करू शकतात, किंवा स्वतःचा छोटा व्यवसाय सुरू करू शकतात.

${childName} खूप चांगली मेहनत करत आहेत. ते गेल्या आठवड्यापासून सातत्याने शिकत आहेत.

कृपया ${childName} ला प्रोत्साहित करा. त्यांना विचारा की आज त्यांनी काय नवीन शिकलं. हळूहळू शिकणं ही काही समस्या नाही - सातत्याने प्रयत्न करणं सर्वात महत्वाचं आहे.`,
        
        welcome: `नमस्कार! मी आपल्या मुला/मुली ${childName} बद्दल सांगू शकते. तुम्ही बोलून विचारू शकता!`
      },
      tamil: {
        fullMessage: `வணக்கம், நான் சரிதா. நான் உங்கள் குழந்தை ${childName} இன் ட்ரீம்2ஸ்கில் வழிகாட்டியாக இருக்கிறேன்.

இன்று, ${childName} "${courseName}" பாடத்தில் "${currentLesson}" கற்றுக்கொள்கிறார்கள்.

இந்த திறமை அன்றாட வாழ்க்கையில் மிகவும் பயனுள்ளதாக இருக்கும். உதாரணமாக, மொபைல் மூலம் வங்கி பணிகள் செய்தல், ஆன்லைனில் பில் செலுத்துதல் அல்லது மருத்துவருடன் வீடியோ கால் மூலம் பேசுதல்.

இது ${childName} க்கு எதிர்காலத்தில் ${jobPath} ஆக பணியாற்ற உதவும், அல்லது சொந்த சிறு வணிகத்தை தொடங்க உதவும்.

${childName} மிக நல்ல முயற்சி செய்து வருகிறார்கள். கடந்த வாரத்திலிருந்து அவர்கள் தொடர்ந்து கற்றுக்கொண்டு வருகிறார்கள்.

தயவுசெய்து ${childName} ஐ ஊக்குவிக்கவும். இன்று அவர்கள் என்ன புதிதாக கற்றுக்கொண்டார்கள் என்று கேளுங்கள். மெதுவாக கற்றுக்கொள்வது எந்த பிரச்சனையும் இல்லை - தொடர்ச்சியான முயற்சியே மிக முக்கியமானது.`,
        
        welcome: `வணக்கம்! நான் உங்கள் குழந்தை ${childName} பற்றி சொல்ல முடியும். நீங்கள் பேசி கேட்கலாம்!`
      },
      telugu: {
        fullMessage: `నమస్కారం, నేను సరితా. నేను మీ పిల్లలైన ${childName} కి డ్రీమ్2స్కిల్ లో మార్గదర్శిని.

ఈరోజు, ${childName} "${courseName}" కోర్సులో "${currentLesson}" నేర్చుకుంటున్నారు.

ఈ నైపుణ్యం రోజువారీ జీవితంలో చాలా ఉపయోగకరంగా ఉంటుంది. ఉదాహరణకు, మొబైల్ ద్వారా బ్యాంకింగ్ చేయడం, ఆన్లైన్లో బిల్లులు చెల్లించడం లేదా డాక్టర్తో వీడియో కాల్ ద్వారా మాట్లాడటం.

ఇది ${childName} కి భవిష్యత్తులో ${jobPath} గా పని చేయడంలో సహాయపడుతుంది, లేదా వారి స్వంత చిన్న వ్యాపారాన్ని ప్రారంభించడంలో సహాయపడుతుంది.

${childName} చాలా మంచి ప్రయత్నం చేస్తున్నారు. వారు గత వారం నుండి నిలకడగా నేర్చుకుంటున్నారు.

దయచేసి ${childName} ను ప్రోత్సహించండి. ఈరోజు వారు ఏం కొత్తగా నేర్చుకున్నారో అడగండి. నెమ్మదిగా నేర్చుకోవడం ఎలాంటి సమస్య కాదు - నిరంతర ప్రయత్నం చేయడం చాలా ముఖ్యం.`,
        
        welcome: `నమస్కారం! నేను మీ పిల్లలు ${childName} గురించి చెప్పగలను. మీరు మాట్లాడి అడగవచ్చు!`
      },
      english: {
        fullMessage: `Hello, I'm Sarita. I'm your child ${childName}'s guide on Dream2Skill.

Today, ${childName} is learning "${currentLesson}" in the "${courseName}" course.

This skill is very useful in daily life. For example, using mobile for banking, paying bills online, or talking to doctor on video call.

This will help ${childName} work as a ${jobPath} in future, or start their own small business.

${childName} is making very good effort. They have been learning consistently since last week.

Please encourage ${childName}. Ask them what new thing they learned today. Learning slowly is not a problem - continuous effort is most important.`,
        
        welcome: `Hello! I can tell you about your child ${childName}. You can ask by speaking!`
      }
    }

    // For other languages, use a generic template
    if (!messages[langName]) {
      return {
        fullMessage: `Hello, I can tell you about your child ${childName}'s learning in ${lang.name}.

Today, ${childName} is learning "${currentLesson}" in the "${courseName}" course.

This skill helps in daily life and future jobs like ${jobPath}.

${childName} is doing well and learning consistently.

Please encourage ${childName} to continue learning.`,
        welcome: `Hello! I can tell you about your child ${childName}. You can ask by speaking!`
      }
    }

    return messages[langName]
  }

  const message = getParentMessage()

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setParentQuestion(transcript)
          handleParentQuestion(transcript)
        }
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
        
        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [])

  // Set language for recognition
  useEffect(() => {
    if (recognitionRef.current) {
      const langObj = getCurrentLanguageObj()
      recognitionRef.current.lang = langObj.code
    }
  }, [currentLanguage])

  // Speech synthesis setup
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser. Please try Chrome or Edge.')
      return
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel()

    // Create new speech
    const speech = new SpeechSynthesisUtterance(text)
    const langObj = getCurrentLanguageObj()
    
    speech.lang = langObj.code
    speech.rate = 0.9
    speech.pitch = 1.0
    speech.volume = volume / 100
    
    // Speech events
    speech.onstart = () => {
      setIsSpeaking(true)
      setIsPlaying(true)
    }
    
    speech.onend = () => {
      setIsSpeaking(false)
      setIsPlaying(false)
      setSpeechProgress(0)
    }
    
    speech.onerror = () => {
      setIsSpeaking(false)
      setIsPlaying(false)
      setSpeechProgress(0)
    }
    
    // Start speaking
    window.speechSynthesis.speak(speech)
    
    // Simulate progress
    let progress = 0
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 1
        setSpeechProgress(progress)
      } else {
        clearInterval(interval)
      }
    }, 60)
  }

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.')
      return
    }
    
    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleParentQuestion = async (question: string) => {
    // Add parent question to chat
    setChatMessages(prev => [...prev, { text: question, isParent: true }])
    setIsProcessing(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate response based on question
    const response = generateResponse(question)
    
    // Add AI response to chat
    setChatMessages(prev => [...prev, { text: response, isParent: false }])
    setIsProcessing(false)
    
    // Speak the response
    speakText(response)
  }

  const generateResponse = (question: string): string => {
    const lang = getCurrentLanguageObj()
    const lowerQuestion = question.toLowerCase()
    
    // Common questions and responses
    if (lowerQuestion.includes('progress') || lowerQuestion.includes('कैसा') || lowerQuestion.includes('எப்படி') || lowerQuestion.includes('ఎలా')) {
      return lang.name === 'Hindi' ? 
        `${childName} बहुत अच्छा कर रहे हैं। वे ${progressPercent}% कोर्स पूरा कर चुके हैं और नियमित रूप से सीख रहे हैं।` :
        `${childName} is doing very well. They have completed ${progressPercent}% of the course and are learning regularly.`
    }
    
    if (lowerQuestion.includes('क्या सीख') || lowerQuestion.includes('what learn') || lowerQuestion.includes('என்ன கற்று')) {
      return lang.name === 'Hindi' ?
        `${childName} "${courseName}" कोर्स में "${currentLesson}" सीख रहे हैं। यह स्मार्टफोन के बेसिक इस्तेमाल के बारे में है।` :
        `${childName} is learning "${currentLesson}" in the "${courseName}" course. This is about basic smartphone usage.`
    }
    
    if (lowerQuestion.includes('भविष्य') || lowerQuestion.includes('future') || lowerQuestion.includes('எதிர்கால')) {
      return lang.name === 'Hindi' ?
        `इस कोर्स से ${childName} ${jobPath} बन सकते हैं या अपना छोटा बिज़नेस शुरू कर सकते हैं। मासिक ८,००० से १५,००० रुपये कमा सकते हैं।` :
        `After this course, ${childName} can become a ${jobPath} or start their own small business. Can earn ₹8,000 to ₹15,000 monthly.`
    }
    
    if (lowerQuestion.includes('समय') || lowerQuestion.includes('time') || lowerQuestion.includes('நேரம்')) {
      return lang.name === 'Hindi' ?
        `${childName} रोज़ ३०-४५ मिनट पढ़ाई कर रहे हैं। धीरे-धीरे सीखना ठीक है, नियमितता ज़रूरी है।` :
        `${childName} studies 30-45 minutes daily. Learning slowly is fine, regularity is important.`
    }
    
    // Default response
    return lang.name === 'Hindi' ?
      `${childName} अच्छी तरह सीख रहे हैं। आप उनसे पूछें कि आज क्या नया सीखा। उन्हें प्रोत्साहित करें।` :
      `${childName} is learning well. Ask them what new they learned today. Encourage them.`
  }

  const handlePlayWelcome = () => {
    speakText(message.welcome)
  }

  const handleSendQuestion = () => {
    if (parentQuestion.trim()) {
      handleParentQuestion(parentQuestion)
      setParentQuestion('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && parentQuestion.trim()) {
      handleSendQuestion()
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      }
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const currentLangObj = getCurrentLanguageObj()

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-cyan-500/20 shadow-2xl">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-purple-500/20 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Parent Voice Assistant</h2>
              <p className="text-purple-300">Talk in your language about {childName}'s learning</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">12 Languages</span>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-b border-purple-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Select Your Language:</span>
          </div>
          <button
            onClick={handlePlayWelcome}
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg transition-all"
          >
            <Play className="w-4 h-4" />
            <span className="text-white text-sm">Play Welcome</span>
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {indianLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setCurrentLanguage(lang.code)}
              className={`p-3 rounded-lg transition-all flex flex-col items-center justify-center ${
                currentLanguage === lang.code
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span className="font-bold text-sm">{lang.native}</span>
              <span className="text-xs opacity-80">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Current Language Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">{currentLangObj.native.charAt(0)}</span>
              </div>
              <div>
                <div className="text-purple-300 font-medium">Currently Speaking:</div>
                <div className="text-white font-bold text-lg">
                  {currentLangObj.native} ({currentLangObj.name})
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-300">Speech & Voice</div>
              <div className="text-green-400 font-bold">✓ Active</div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
              Ask About {childName}'s Learning
            </h3>
            <div className="text-sm text-gray-400">
              {chatMessages.length} messages
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
                <p>Ask a question about {childName}'s learning</p>
                <p className="text-sm mt-2">Example: "How is my child progressing?"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isParent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        msg.isParent
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
                          : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {!msg.isParent && (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-white">{msg.text}</p>
                        </div>
                        {msg.isParent && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={parentQuestion}
                onChange={(e) => setParentQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Type or speak your question in ${currentLangObj.name}...`}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pr-32 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
              />
              <div className="absolute right-2 top-2 flex items-center space-x-2">
                <button
                  onClick={handleSendQuestion}
                  disabled={!parentQuestion.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`px-4 py-2 rounded-lg ${
                    isListening
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-400 flex items-center space-x-4">
            <div className="flex items-center">
              <Mic className="w-4 h-4 mr-2" />
              <span>Click mic to speak in {currentLangObj.name}</span>
            </div>
            {isListening && (
              <div className="flex items-center text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span>Listening...</span>
              </div>
            )}
          </div>
        </div>

        {/* Voice Controls */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-cyan-500/30 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {/* Play/Pause Button */}
              <button
                onClick={() => speakText(message.fullMessage)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30'
                }`}
              >
                {isSpeaking ? (
                  <Pause className="w-7 h-7 text-white" />
                ) : (
                  <Play className="w-7 h-7 text-white ml-1" />
                )}
              </button>
              
              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <VolumeX className="w-5 h-5 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-32 accent-purple-500"
                />
                <Volume2 className="w-5 h-5 text-gray-400" />
                <span className="text-purple-400 text-sm font-medium">{volume}%</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setChatMessages([])}
                className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                Clear Chat
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:shadow-lg transition-all">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Playback Progress */}
          {isSpeaking && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Playing in {currentLangObj.name}...</span>
                <span>{speechProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300"
                  style={{ width: `${speechProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-white mb-4">Quick Questions You Can Ask:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "How is my child progressing?",
              "What are they learning today?",
              "How does this help their future?",
              "How much time should they study?",
              "What jobs can they get after this?",
              "How can I help my child learn?"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setParentQuestion(question)
                  handleParentQuestion(question)
                }}
                className="p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl text-left transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{question}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-purple-200">
                <span className="font-bold text-white">Supported in 12 Languages:</span> 
                {indianLanguages.map((lang, i) => (
                  <span key={lang.code} className="mx-1">
                    {lang.native}{i < indianLanguages.length - 1 ? ',' : ''}
                  </span>
                ))}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Works best in Chrome/Edge browsers. Microphone permission required for voice input.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}