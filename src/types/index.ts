export interface User {
  id: string
  name: string
  language: 'hindi' | 'marathi' | 'tamil' | 'english'
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface MicroLesson {
  id: string
  title: string
  duration: number
  language: string
  category: string
  progress: number
  isDownloaded: boolean
}