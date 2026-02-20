'use client';

import { useState, useRef } from 'react';
import { ResumeData, DEFAULT_RESUME_DATA, TemplateType } from '@/types/resume';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Building2, 
  Globe, 
  CheckCircle2,
  Star,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const builderRef = useRef<HTMLDivElement>(null);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#d4af37]" />
              </div>
              <span className="font-bold text-xl text-[#0f172a]">🇦🇪 YallaCV</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-[#0f172a] transition-colors">Features</a>
              <a href="#templates" className="text-sm text-gray-600 hover:text-[#0f172a] transition-colors">Templates</a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-[#0f172a] transition-colors">Testimonials</a>
              <Button 
                onClick={scrollToBuilder}
                className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-white"
              >
                Start Building
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#features" className="text-sm text-gray-600 hover:text-[#0f172a]" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#templates" className="text-sm text-gray-600 hover:text-[#0f172a]" onClick={() => setIsMenuOpen(false)}>Templates</a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-[#0f172a]" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
              <Button 
                onClick={() => { scrollToBuilder(); setIsMenuOpen(false); }}
                className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-white w-full"
              >
                Start Building
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ backgroundColor: '#0f172a' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Trusted by 10,000+ professionals in the UAE
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Build a <span className="text-[#d4af37]">CEO-Level</span> Resume
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">in Seconds</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Craft ATS-optimized resumes tailored specifically for the Dubai & UAE job market. 
              Stand out to recruiters at top companies like Emirates, Emaar, DAMAC, and more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                onClick={scrollToBuilder}
                size="lg"
                className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-white px-8 py-6 text-lg gap-2 shadow-lg shadow-[#d4af37]/25"
              >
                Start Building Your CV
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
                <ChevronDown className="w-5 h-5 ml-1" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-white">95%</div>
                <div className="text-sm text-gray-400">ATS Pass Rate</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-2xl md:text-4xl font-bold text-white">3x</div>
                <div className="text-sm text-gray-400">More Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Resumes Created</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Why Choose YallaCV?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered resume builder is designed specifically for the UAE job market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Enhancement',
                description: 'Transform your bullet points into CEO-level achievements with our AI assistant',
              },
              {
                icon: Building2,
                title: 'UAE Market Focused',
                description: 'Templates and keywords optimized for Dubai, Abu Dhabi, and GCC recruiters',
              },
              {
                icon: Globe,
                title: 'ATS-Friendly Format',
                description: '95% pass rate on applicant tracking systems used by top UAE employers',
              },
              {
                icon: FileText,
                title: 'Professional Templates',
                description: 'Choose from 3 executive-level templates designed by HR experts',
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0f172a] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section id="templates" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Professional Templates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of executive-level templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'The Corporate',
                description: 'Clean, simple, standard for Government & Banks',
                color: 'bg-gray-100',
                border: 'border-gray-300',
              },
              {
                name: 'The Modern',
                description: 'Navy blue header, gold accents, for Tech & Media',
                color: 'bg-[#0f172a]',
                border: 'border-[#d4af37]',
              },
              {
                name: 'The Executive',
                description: 'Dense, high-level, minimal graphics',
                color: 'bg-white',
                border: 'border-[#0f172a]',
              },
            ].map((template, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`relative aspect-[8.5/11] rounded-lg overflow-hidden shadow-lg border-2 ${template.border} transition-transform group-hover:scale-105`}>
                  <div className={`absolute inset-0 ${template.color}`}>
                    {index === 0 && (
                      <div className="p-6">
                        <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
                        <div className="h-1 bg-gray-200 rounded mb-2"></div>
                        <div className="h-1 bg-gray-200 rounded mb-2"></div>
                        <div className="h-1 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="h-2 bg-gray-300 rounded w-1/3 mb-2"></div>
                        <div className="h-1 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 bg-gray-200 rounded mb-4"></div>
                      </div>
                    )}
                    {index === 1 && (
                      <div>
                        <div className="bg-[#0f172a] p-6 text-center">
                          <div className="h-6 bg-[#d4af37] rounded w-2/3 mx-auto mb-2"></div>
                          <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto"></div>
                        </div>
                        <div className="p-6 bg-white">
                          <div className="h-2 bg-gray-200 rounded mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded mb-4 w-3/4"></div>
                          <div className="h-2 bg-[#0f172a] rounded w-1/3 mb-2"></div>
                        </div>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="p-4">
                        <div className="flex justify-between mb-4">
                          <div className="h-4 bg-[#0f172a] rounded w-1/3"></div>
                          <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="h-1 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 bg-gray-200 rounded mb-3"></div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <div className="h-1 bg-gray-200 rounded mb-1"></div>
                            <div className="h-1 bg-gray-200 rounded mb-1"></div>
                          </div>
                          <div className="w-24">
                            <div className="h-1 bg-[#d4af37] rounded mb-1 w-full"></div>
                            <div className="h-1 bg-gray-200 rounded mb-1"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#0f172a] mt-4 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how professionals landed their dream jobs in the UAE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ahmed Al Rashid',
                role: 'Senior Project Manager',
                company: 'Emirates Group',
                quote: 'Within 2 weeks of using YallaCV, I received 5 interview calls. The AI enhancement feature made my experience sound incredibly professional.',
                rating: 5,
              },
              {
                name: 'Sarah Johnson',
                role: 'Marketing Director',
                company: 'Emaar Properties',
                quote: 'The templates are perfectly designed for the UAE market. I landed my dream job at Emaar within a month of creating my resume here.',
                rating: 5,
              },
              {
                name: 'Mohammed Hassan',
                role: 'Finance Manager',
                company: 'Dubai Islamic Bank',
                quote: 'The ATS-friendly format is real! My resume passed through all the screening systems. Highly recommend for anyone targeting UAE banks.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center text-[#d4af37] font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0f172a]">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Land Your Dream Job in Dubai?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully secured positions at top UAE companies
          </p>
          <Button 
            onClick={scrollToBuilder}
            size="lg"
            className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-white px-8 py-6 text-lg gap-2 shadow-lg shadow-[#d4af37]/25"
          >
            Start Building Your Resume Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Resume Builder Section */}
      <section ref={builderRef} className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
              Build Your Resume
            </h2>
            <p className="text-lg text-gray-600">
              Fill in your details and watch your resume come to life
            </p>
          </div>

          {/* Builder Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 lg:sticky lg:top-20 lg:h-[calc(100vh-120px)]">
              <ResumePreview 
                data={resumeData} 
                template={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#d4af37] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#0f172a]" />
              </div>
              <span className="font-bold text-xl text-white">🇦🇪 YallaCV</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <span>© 2024 YallaCV. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                GDPR Compliant
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                ATS Optimized
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
