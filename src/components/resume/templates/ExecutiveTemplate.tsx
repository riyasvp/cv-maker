import { ResumeData } from '@/types/resume';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const { personalDetails, professionalSummary, workExperience, education, skills, certifications, projects, awards, languages, references } = data;

  return (
    <div className="bg-white text-gray-900 font-sans" style={{ padding: '25px 30px', minHeight: '100%', width: '100%' }}>
      {/* Header - Compact */}
      <header className="border-b-2 border-[#0f172a] pb-3 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">
              {personalDetails.fullName || 'Your Name'}
            </h1>
            {personalDetails.targetRole && (
              <p className="text-xs text-gray-600 uppercase tracking-wide">{personalDetails.targetRole}</p>
            )}
          </div>
          <div className="text-right text-[10px] text-gray-600 leading-relaxed">
            {personalDetails.email && <p>{personalDetails.email}</p>}
            {personalDetails.phone && <p>{personalDetails.phone}</p>}
            {personalDetails.location && <p>{personalDetails.location}</p>}
            {personalDetails.linkedInUrl && <p className="text-[#d4af37]">{personalDetails.linkedInUrl}</p>}
            {(personalDetails.nationality || personalDetails.visaStatus) && (
              <p className="text-gray-400 mt-1">
                {personalDetails.nationality}
                {personalDetails.visaStatus && ` | ${personalDetails.visaStatus}`}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - Main Content (60%) */}
        <div style={{ width: '60%' }}>
          {/* Professional Summary */}
          {professionalSummary && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Executive Summary
              </h2>
              <p className="text-[10px] leading-relaxed text-gray-700">{professionalSummary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Professional Experience
              </h2>
              <div className="space-y-2">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-800 text-[10px]">{exp.jobTitle}</h3>
                      <span className="text-[10px] text-gray-500">{exp.duration}</span>
                    </div>
                    <p className="text-[10px] text-gray-600">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                    {exp.bulletPoints && (
                      <ul className="text-[10px] text-gray-700 mt-0.5 space-y-0.5">
                        {exp.bulletPoints.split('\n').filter(Boolean).map((point, idx) => (
                          <li key={idx} className="flex gap-1.5">
                            <span className="text-[#d4af37] text-[8px] mt-1">●</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Key Projects
              </h2>
              <div className="space-y-1.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold text-gray-800 text-[10px]">{proj.name}</h3>
                    <p className="text-[10px] text-gray-600">{proj.description}</p>
                    {proj.technologies && (
                      <p className="text-[10px] text-gray-400">Tech: {proj.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references && (
            <section className="mt-3 pt-2 border-t border-gray-200">
              <p className="text-[10px] text-gray-600 italic">{references}</p>
            </section>
          )}
        </div>

        {/* Right Column - Sidebar (40%) */}
        <div style={{ width: '40%' }} className="pl-4 border-l border-gray-200">
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Education
              </h2>
              <div className="space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-800 text-[10px]">{edu.degree}</h3>
                    <p className="text-[10px] text-gray-600">{edu.school}</p>
                    <p className="text-[10px] text-gray-400">{edu.year}{edu.gpa ? ` | ${edu.gpa}` : ''}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies / Skills */}
          {skills.length > 0 && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 gap-0.5">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#d4af37] rounded-full flex-shrink-0"></span>
                    <span className="text-[10px] text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium text-gray-800 text-[10px]">{cert.name}</p>
                    <p className="text-[10px] text-gray-500">{cert.issuer} | {cert.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Languages
              </h2>
              <div className="space-y-0.5">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-[10px]">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <section className="mb-3">
              <h2 className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest border-b border-gray-300 pb-0.5 mb-1.5">
                Awards
              </h2>
              <div className="space-y-1">
                {awards.map((award) => (
                  <div key={award.id}>
                    <p className="font-medium text-gray-800 text-[10px]">{award.title}</p>
                    <p className="text-[10px] text-gray-500">{award.organization} | {award.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
