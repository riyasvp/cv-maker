export interface PersonalDetails {
  fullName: string;
  targetRole: string;
  linkedInUrl: string;
  location: string;
  phone: string;
  email: string;
  website?: string;
  nationality?: string;
  visaStatus?: string;
  languages?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  location?: string;
  bulletPoints: string;
  enhancedBulletPoints?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  gpa?: string;
  honors?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string;
  link?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
  awards: Award[];
  languages: Language[];
  references: string;
}

export type TemplateType = 'corporate' | 'modern' | 'executive';

export interface TemplateOption {
  id: TemplateType;
  name: string;
  description: string;
}

export interface AIWordSuggestion {
  original: string;
  suggestions: string[];
  category: 'action' | 'achievement' | 'skill' | 'leadership';
}

export interface EnhanceResponse {
  enhancedText: string;
  wordSuggestions?: AIWordSuggestion[];
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'corporate',
    name: 'The Corporate',
    description: 'Clean, simple, standard for Government/Banks',
  },
  {
    id: 'modern',
    name: 'The Modern',
    description: 'Navy blue header, gold accents, for Tech/Media',
  },
  {
    id: 'executive',
    name: 'The Executive',
    description: 'Dense, high-level, minimal graphics',
  },
];

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalDetails: {
    fullName: '',
    targetRole: '',
    linkedInUrl: '',
    location: 'Dubai, UAE',
    phone: '',
    email: '',
    website: '',
    nationality: '',
    visaStatus: '',
    languages: '',
  },
  professionalSummary: '',
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  awards: [],
  languages: [],
  references: 'Available upon request',
};

export const ACTION_VERBS = {
  leadership: [
    'Spearheaded', 'Directed', 'Led', 'Managed', 'Supervised', 'Oversaw', 
    'Coordinated', 'Orchestrated', 'Headed', 'Chaired'
  ],
  achievement: [
    'Achieved', 'Delivered', 'Exceeded', 'Surpassed', 'Outperformed',
    'Accomplished', 'Attained', 'Realized', 'Generated', 'Maximized'
  ],
  technical: [
    'Developed', 'Engineered', 'Designed', 'Implemented', 'Built',
    'Created', 'Architected', 'Deployed', 'Automated', 'Optimized'
  ],
  communication: [
    'Presented', 'Negotiated', 'Collaborated', 'Partnered', 'Facilitated',
    'Communicated', 'Influenced', 'Persuaded', 'Represented', 'Liaised'
  ],
  improvement: [
    'Improved', 'Enhanced', 'Streamlined', 'Revolutionized', 'Transformed',
    'Upgraded', 'Refined', 'Modernized', 'Revamped', 'Accelerated'
  ]
};

export const SKILL_KEYWORDS = {
  management: ['Strategic Planning', 'Team Leadership', 'Project Management', 'Budget Management', 'Stakeholder Management', 'Change Management'],
  technical: ['Data Analysis', 'Machine Learning', 'Cloud Computing', 'Agile Methodologies', 'DevOps', 'Cybersecurity'],
  soft: ['Communication', 'Problem Solving', 'Critical Thinking', 'Adaptability', 'Time Management', 'Conflict Resolution'],
  uae_specific: ['GCC Market Knowledge', 'Arabic Business Culture', 'Islamic Finance', 'UAE Labor Law', 'Dubai Business Setup', 'Multi-cultural Teams']
};

export const LANGUAGE_LEVELS = [
  'Native',
  'Fluent',
  'Professional',
  'Intermediate',
  'Basic'
];
