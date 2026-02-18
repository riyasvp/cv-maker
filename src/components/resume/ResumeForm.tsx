'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ResumeData, WorkExperience, Education, Certification, Project, Award, Language, ACTION_VERBS, SKILL_KEYWORDS, LANGUAGE_LEVELS } from '@/types/resume';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Sparkles, 
  Loader2,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Award as AwardIcon,
  FolderKanban,
  Languages,
  BadgeCheck,
  Wand2,
  Check,
  X,
  Lightbulb,
  Settings
} from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

interface AIEnhanceResult {
  enhancedText: string;
  alternatives: string[];
  keyWords: string[];
  improvementTips: string[];
}

const STEPS = [
  { id: 1, title: 'Personal', icon: User, description: 'Your details' },
  { id: 2, title: 'Summary', icon: FileText, description: 'Professional intro' },
  { id: 3, title: 'Experience', icon: Briefcase, description: 'Work history' },
  { id: 4, title: 'Education', icon: GraduationCap, description: 'Your degrees' },
  { id: 5, title: 'Skills & More', icon: Settings, description: 'Certifications, projects' },
];

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [aiResult, setAiResult] = useState<AIEnhanceResult | null>(null);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [currentEnhanceField, setCurrentEnhanceField] = useState<{id: string, type: string} | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const enhanceWithAI = async (text: string, type: 'bullet' | 'summary', fieldId?: string) => {
    const loadingKey = fieldId || type;
    setLoadingStates(prev => ({ ...prev, [loadingKey]: true }));
    setCurrentEnhanceField({ id: fieldId || type, type });
    
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type }),
      });
      
      const result: AIEnhanceResult = await response.json();
      
      if (result.enhancedText) {
        setAiResult(result);
        setShowAiDialog(true);
        return result;
      }
      throw new Error('Failed to enhance text');
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Failed to enhance text. Please try again.');
      return null;
    } finally {
      setLoadingStates(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const applyEnhancement = (text: string, fieldId?: string, fieldType?: string) => {
    if (fieldType === 'summary') {
      onChange({ ...data, professionalSummary: text });
    } else if (fieldId) {
      onChange({
        ...data,
        workExperience: data.workExperience.map(exp =>
          exp.id === fieldId ? { ...exp, bulletPoints: text } : exp
        ),
      });
    }
    setShowAiDialog(false);
    setAiResult(null);
  };

  const updatePersonalDetails = (field: keyof ResumeData['personalDetails'], value: string) => {
    onChange({
      ...data,
      personalDetails: { ...data.personalDetails, [field]: value },
    });
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: generateId(),
      jobTitle: '',
      company: '',
      duration: '',
      location: '',
      bulletPoints: '',
    };
    onChange({
      ...data,
      workExperience: [...data.workExperience, newExp],
    });
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter(exp => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      degree: '',
      school: '',
      year: '',
      gpa: '',
      honors: '',
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id),
    });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: generateId(),
      name: '',
      issuer: '',
      year: '',
      credentialId: '',
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert],
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(cert => cert.id !== id),
    });
  };

  const addProject = () => {
    const newProj: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: '',
      link: '',
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(proj => proj.id !== id),
    });
  };

  const addAward = () => {
    const newAward: Award = {
      id: generateId(),
      title: '',
      organization: '',
      year: '',
      description: '',
    };
    onChange({
      ...data,
      awards: [...data.awards, newAward],
    });
  };

  const updateAward = (id: string, field: keyof Award, value: string) => {
    onChange({
      ...data,
      awards: data.awards.map(award =>
        award.id === id ? { ...award, [field]: value } : award
      ),
    });
  };

  const removeAward = (id: string) => {
    onChange({
      ...data,
      awards: data.awards.filter(award => award.id !== id),
    });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: generateId(),
      name: '',
      proficiency: 'Professional',
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang],
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id),
    });
  };

  const updateSkills = (value: string) => {
    const skillsArray = value.split(',').map(s => s.trim()).filter(Boolean);
    onChange({ ...data, skills: skillsArray });
  };

  const addSkillFromSuggestion = (skill: string) => {
    if (!data.skills.includes(skill)) {
      onChange({ ...data, skills: [...data.skills, skill] });
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // AI Enhancement Dialog Component
  const AIEnhanceDialog = () => (
    <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#0f172a]">
            <Wand2 className="w-5 h-5 text-[#d4af37]" />
            AI Enhancement Results
          </DialogTitle>
        </DialogHeader>
        
        {aiResult && (
          <div className="space-y-4">
            {/* Key Words */}
            {aiResult.keyWords.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Key Action Words</Label>
                <div className="flex flex-wrap gap-2">
                  {aiResult.keyWords.map((word, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-[#0f172a] text-white">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Suggestion */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">✨ Recommended Version</Label>
              <div className="p-4 rounded-lg border-2 border-[#d4af37]" style={{ backgroundColor: '#fafafa' }}>
                <p className="text-sm text-gray-800">{aiResult.enhancedText}</p>
                <Button
                  size="sm"
                  className="mt-3 bg-[#d4af37] hover:bg-[#d4af37]/90 text-white"
                  onClick={() => applyEnhancement(aiResult.enhancedText, currentEnhanceField?.id, currentEnhanceField?.type)}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Use This Version
                </Button>
              </div>
            </div>

            {/* Alternatives */}
            {aiResult.alternatives.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">🔄 Alternative Versions</Label>
                <div className="space-y-2">
                  {aiResult.alternatives.map((alt, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#d4af37] transition-colors">
                      <p className="text-sm text-gray-700 mb-2">{alt}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#0f172a] border-[#0f172a]"
                        onClick={() => applyEnhancement(alt, currentEnhanceField?.id, currentEnhanceField?.type)}
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Use This
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Tips */}
            {aiResult.improvementTips && aiResult.improvementTips.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-1">
                  <Lightbulb className="w-4 h-4 text-[#d4af37]" />
                  Tips for Improvement
                </Label>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {aiResult.improvementTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Ahmed Al Maktoum"
                  value={data.personalDetails.fullName}
                  onChange={(e) => updatePersonalDetails('fullName', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role *</Label>
                <Input
                  id="targetRole"
                  placeholder="Senior Project Manager"
                  value={data.personalDetails.targetRole}
                  onChange={(e) => updatePersonalDetails('targetRole', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ahmed@example.com"
                  value={data.personalDetails.email}
                  onChange={(e) => updatePersonalDetails('email', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+971 50 123 4567"
                  value={data.personalDetails.phone}
                  onChange={(e) => updatePersonalDetails('phone', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Dubai, UAE"
                  value={data.personalDetails.location}
                  onChange={(e) => updatePersonalDetails('location', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  placeholder="UAE, Indian, British..."
                  value={data.personalDetails.nationality || ''}
                  onChange={(e) => updatePersonalDetails('nationality', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn URL</Label>
                <Input
                  id="linkedIn"
                  placeholder="linkedin.com/in/ahmed-almaktoum"
                  value={data.personalDetails.linkedInUrl}
                  onChange={(e) => updatePersonalDetails('linkedInUrl', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input
                  id="website"
                  placeholder="www.yourportfolio.com"
                  value={data.personalDetails.website || ''}
                  onChange={(e) => updatePersonalDetails('website', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visaStatus">Visa Status (UAE)</Label>
                <Input
                  id="visaStatus"
                  placeholder="Employment Visa, Residence Visa..."
                  value={data.personalDetails.visaStatus || ''}
                  onChange={(e) => updatePersonalDetails('visaStatus', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languagesSpoken">Languages Spoken</Label>
                <Input
                  id="languagesSpoken"
                  placeholder="English, Arabic, Hindi..."
                  value={data.personalDetails.languages || ''}
                  onChange={(e) => updatePersonalDetails('languages', e.target.value)}
                  className="border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="summary">Professional Summary</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    if (!data.professionalSummary.trim()) return;
                    await enhanceWithAI(data.professionalSummary, 'summary', 'summary');
                  }}
                  disabled={!data.professionalSummary.trim() || loadingStates['summary']}
                  className="text-[#d4af37] border-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  {loadingStates['summary'] ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Enhance with AI
                </Button>
              </div>
              <Textarea
                id="summary"
                placeholder="Experienced professional with 10+ years in project management. Led cross-functional teams and delivered projects worth $50M+ across the GCC region..."
                value={data.professionalSummary}
                onChange={(e) => onChange({ ...data, professionalSummary: e.target.value })}
                rows={6}
                className="resize-none border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]"
              />
              <p className="text-xs text-gray-500">
                💡 Tip: Write a brief summary and click &quot;Enhance with AI&quot; to get multiple professional versions to choose from.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-[#0f172a]">Work Experience</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addWorkExperience}
                className="text-[#0f172a] border-[#0f172a] hover:bg-[#0f172a]/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            {data.workExperience.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No work experience added yet.</p>
                <Button
                  type="button"
                  variant="link"
                  onClick={addWorkExperience}
                  className="text-[#d4af37]"
                >
                  Add your first experience
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.workExperience.map((exp, index) => (
                  <Card key={exp.id} className="relative border border-gray-200 shadow-sm">
                    <CardHeader className="pb-2" style={{ backgroundColor: '#fafafa' }}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm text-[#0f172a]">Experience {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkExperience(exp.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input
                            placeholder="Project Manager"
                            value={exp.jobTitle}
                            onChange={(e) => updateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                            className="border-gray-200 focus:border-[#d4af37]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            placeholder="Emirates Group"
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                            className="border-gray-200 focus:border-[#d4af37]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            placeholder="Jan 2020 - Present"
                            value={exp.duration}
                            onChange={(e) => updateWorkExperience(exp.id, 'duration', e.target.value)}
                            className="border-gray-200 focus:border-[#d4af37]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            placeholder="Dubai, UAE"
                            value={exp.location || ''}
                            onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                            className="border-gray-200 focus:border-[#d4af37]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Key Achievements (one per line)</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              if (!exp.bulletPoints.trim()) return;
                              await enhanceWithAI(exp.bulletPoints, 'bullet', exp.id);
                            }}
                            disabled={!exp.bulletPoints.trim() || loadingStates[exp.id]}
                            className="text-[#d4af37] border-[#d4af37] hover:bg-[#d4af37]/10"
                          >
                            {loadingStates[exp.id] ? (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Sparkles className="w-3 h-3 mr-1" />
                            )}
                            Enhance with AI
                          </Button>
                        </div>
                        <Textarea
                          placeholder="• Led a team of 15 professionals&#10;• Increased revenue by 25%&#10;• Implemented new project management system"
                          value={exp.bulletPoints}
                          onChange={(e) => updateWorkExperience(exp.id, 'bulletPoints', e.target.value)}
                          rows={4}
                          className="resize-none text-sm border-gray-200 focus:border-[#d4af37]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#0f172a] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#d4af37]" />
                  Education
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEducation}
                  className="text-[#0f172a] border-[#0f172a] hover:bg-[#0f172a]/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>

              {data.education.length === 0 ? (
                <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <GraduationCap className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No education added yet.</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={addEducation}
                    className="text-[#d4af37]"
                  >
                    Add your education
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    <Card key={edu.id} className="border border-gray-200">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Degree</Label>
                              <Input
                                placeholder="MBA"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                className="h-9 border-gray-200 focus:border-[#d4af37]"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">School</Label>
                              <Input
                                placeholder="American University of Dubai"
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                className="h-9 border-gray-200 focus:border-[#d4af37]"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Year</Label>
                              <Input
                                placeholder="2020"
                                value={edu.year}
                                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                className="h-9 border-gray-200 focus:border-[#d4af37]"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">GPA/Honors</Label>
                              <Input
                                placeholder="3.8 / Magna Cum Laude"
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                className="h-9 border-gray-200 focus:border-[#d4af37]"
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Certifications Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#0f172a] flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-[#d4af37]" />
                  Certifications
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCertification}
                  className="text-[#0f172a] border-[#0f172a] hover:bg-[#0f172a]/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>

              {data.certifications.length === 0 ? (
                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <BadgeCheck className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Add certifications to boost your profile</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={addCertification}
                    className="text-[#d4af37]"
                  >
                    Add certification
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.certifications.map((cert) => (
                    <Card key={cert.id} className="border border-gray-200">
                      <CardContent className="pt-3 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                            <Input
                              placeholder="PMP"
                              value={cert.name}
                              onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                              className="h-8 text-sm border-gray-200"
                            />
                            <Input
                              placeholder="PMI"
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                              className="h-8 text-sm border-gray-200"
                            />
                            <Input
                              placeholder="2023"
                              value={cert.year}
                              onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                              className="h-8 text-sm border-gray-200"
                            />
                            <Input
                              placeholder="Credential ID"
                              value={cert.credentialId || ''}
                              onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                              className="h-8 text-sm border-gray-200"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(cert.id)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Languages Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#0f172a] flex items-center gap-2">
                  <Languages className="w-5 h-5 text-[#d4af37]" />
                  Languages
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLanguage}
                  className="text-[#0f172a] border-[#0f172a] hover:bg-[#0f172a]/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Language
                </Button>
              </div>

              {data.languages.length === 0 ? (
                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <Languages className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Add languages you speak</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={addLanguage}
                    className="text-[#d4af37]"
                  >
                    Add language
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <Input
                        placeholder="Arabic"
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                        className="h-8 w-24 text-sm border-0 bg-transparent"
                      />
                      <Select
                        value={lang.proficiency}
                        onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}
                      >
                        <SelectTrigger className="h-8 w-28 text-xs border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGE_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLanguage(lang.id)}
                        className="text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* Skills Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0f172a]">Skills & Competencies</Label>
                <Textarea
                  placeholder="Project Management, Strategic Planning, Team Leadership, Budget Management, Agile Methodologies"
                  value={data.skills.join(', ')}
                  onChange={(e) => updateSkills(e.target.value)}
                  rows={3}
                  className="resize-none border-gray-200 focus:border-[#d4af37]"
                />
                
                {/* Skill Suggestions */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">💡 Click to add suggested skills:</p>
                  <div className="space-y-2">
                    {Object.entries(SKILL_KEYWORDS).map(([category, skills]) => (
                      <div key={category} className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-400 capitalize mr-1">{category}:</span>
                        {skills.map((skill) => (
                          <Button
                            key={skill}
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => addSkillFromSuggestion(skill)}
                            disabled={data.skills.includes(skill)}
                            className={`h-6 text-xs px-2 ${
                              data.skills.includes(skill)
                                ? 'bg-[#d4af37]/20 text-[#d4af37]'
                                : 'bg-gray-100 hover:bg-[#d4af37]/10 hover:text-[#0f172a]'
                            }`}
                          >
                            {skill}
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#0f172a] flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-[#d4af37]" />
                  Key Projects
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addProject}
                  className="text-[#0f172a] border-[#0f172a] hover:bg-[#0f172a]/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {data.projects.length === 0 ? (
                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <FolderKanban className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Showcase your key projects</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={addProject}
                    className="text-[#d4af37]"
                  >
                    Add project
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <Card key={proj.id} className="border border-gray-200">
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <Input
                                placeholder="Project Name"
                                value={proj.name}
                                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                                className="border-gray-200 focus:border-[#d4af37]"
                              />
                              <Input
                                placeholder="Technologies used"
                                value={proj.technologies || ''}
                                onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                                className="border-gray-200 focus:border-[#d4af37]"
                              />
                            </div>
                            <Textarea
                              placeholder="Brief description of the project and your role..."
                              value={proj.description}
                              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                              rows={2}
                              className="resize-none text-sm border-gray-200 focus:border-[#d4af37]"
                            />
                            <Input
                              placeholder="Project link (optional)"
                              value={proj.link || ''}
                              onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                              className="border-gray-200 focus:border-[#d4af37]"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(proj.id)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Awards Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#0f172a] flex items-center gap-2">
                  <AwardIcon className="w-5 h-5 text-[#d4af37]" />
                  Awards & Recognition
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAward}
                  className="text-[#0f172a] border-[#0f172a] hover:bg-[#0f172a]/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Award
                </Button>
              </div>

              {data.awards.length === 0 ? (
                <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <AwardIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Highlight your achievements</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={addAward}
                    className="text-[#d4af37]"
                  >
                    Add award
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.awards.map((award) => (
                    <Card key={award.id} className="border border-gray-200">
                      <CardContent className="pt-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                            <Input
                              placeholder="Award Title"
                              value={award.title}
                              onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                              className="h-9 border-gray-200"
                            />
                            <Input
                              placeholder="Organization"
                              value={award.organization}
                              onChange={(e) => updateAward(award.id, 'organization', e.target.value)}
                              className="h-9 border-gray-200"
                            />
                            <Input
                              placeholder="Year"
                              value={award.year}
                              onChange={(e) => updateAward(award.id, 'year', e.target.value)}
                              className="h-9 border-gray-200"
                            />
                            <Input
                              placeholder="Description (optional)"
                              value={award.description || ''}
                              onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                              className="h-9 border-gray-200"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAward(award.id)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* References Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0f172a]">References</Label>
                <Textarea
                  placeholder="Available upon request&#10;Or list your references with name, title, company, email, phone"
                  value={data.references}
                  onChange={(e) => onChange({ ...data, references: e.target.value })}
                  rows={3}
                  className="resize-none border-gray-200 focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <AIEnhanceDialog />
      
      {/* Step Indicators */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px]">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    currentStep === step.id
                      ? 'bg-[#0f172a] text-white scale-110'
                      : currentStep > step.id
                      ? 'bg-[#d4af37] text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </button>
                <span className={`text-xs mt-2 font-medium ${
                  currentStep === step.id ? 'text-[#0f172a]' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                <span className="text-xs text-gray-400">{step.description}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                  currentStep > step.id ? 'bg-[#d4af37]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-6">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2 border-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        {currentStep < STEPS.length ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-[#0f172a] hover:bg-[#0f172a]/90 text-white gap-2"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <Check className="w-5 h-5" />
            <span className="font-medium">Resume Complete!</span>
          </div>
        )}
      </div>
    </div>
  );
}
