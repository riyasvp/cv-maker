import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalDetails, professionalSummary, workExperience, education, skills, certifications, projects, awards, languages, references } = data;

  return (
    <div className="bg-white text-gray-900 font-sans" style={{ minHeight: '100%', width: '100%' }}>
      {/* Header with Navy Blue background */}
      <header className="text-white p-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-[180mm] mx-auto">
          <h1 className="text-2xl font-bold mb-1 tracking-tight">
            {personalDetails.fullName || 'Your Name'}
          </h1>
          {personalDetails.targetRole && (
            <p className="text-lg text-[#d4af37] font-medium mb-3">{personalDetails.targetRole}</p>
          )}
          <div className="flex flex-wrap gap-4 text-xs text-gray-300">
            {personalDetails.email && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {personalDetails.email}
              </span>
            )}
            {personalDetails.phone && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {personalDetails.phone}
              </span>
            )}
            {personalDetails.location && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {personalDetails.location}
              </span>
            )}
            {personalDetails.linkedInUrl && (
              <span className="text-[#d4af37]">{personalDetails.linkedInUrl}</span>
            )}
          </div>
          {(personalDetails.nationality || personalDetails.visaStatus) && (
            <div className="flex gap-3 text-xs text-gray-400 mt-2">
              {personalDetails.nationality && <span>{personalDetails.nationality}</span>}
              {personalDetails.visaStatus && <span>• {personalDetails.visaStatus}</span>}
            </div>
          )}
        </div>
      </header>

      <div className="p-6 max-w-[180mm] mx-auto">
        {/* Professional Summary */}
        {professionalSummary && (
          <section className="mb-4">
            <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#d4af37]"></span>
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-gray-700 border-l-2 border-[#d4af37] pl-3">{professionalSummary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#d4af37]"></span>
              Professional Experience
            </h2>
            <div className="space-y-3">
              {workExperience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2 border-gray-200">
                  <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-[#d4af37]"></div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-semibold text-gray-800 text-sm">{exp.jobTitle}</h3>
                    <span className="text-xs text-[#0f172a] font-medium bg-gray-100 px-2 py-0.5 rounded">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                  {exp.bulletPoints && (
                    <ul className="text-xs text-gray-700 space-y-0.5">
                      {exp.bulletPoints.split('\n').filter(Boolean).map((point, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-[#d4af37] mt-0.5 text-[10px]">▸</span>
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

        {/* Two Column Layout for remaining sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#d4af37]"></span>
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-b border-gray-100 pb-2">
                      <h3 className="font-semibold text-gray-800 text-xs">{edu.degree}</h3>
                      <p className="text-xs text-gray-600">{edu.school}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{edu.year}</span>
                        {edu.gpa && <span>{edu.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#d4af37]"></span>
                  Certifications
                </h2>
                <div className="space-y-1">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <span className="font-medium text-gray-800">{cert.name}</span>
                      <span className="text-gray-500"> - {cert.issuer} ({cert.year})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards */}
            {awards.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#d4af37]"></span>
                  Awards
                </h2>
                <div className="space-y-1">
                  {awards.map((award) => (
                    <div key={award.id} className="text-xs">
                      <span className="font-medium text-gray-800">{award.title}</span>
                      <span className="text-gray-500"> - {award.organization} ({award.year})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#d4af37]"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-[#0f172a] text-white px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#d4af37]"></span>
                  Languages
                </h2>
                <div className="space-y-0.5">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-xs">
                      <span className="font-medium text-gray-800">{lang.name}</span>
                      <span className="text-gray-500">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-4">
                <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-[#d4af37]"></span>
                  Key Projects
                </h2>
                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 className="font-semibold text-gray-800 text-xs">{proj.name}</h3>
                      <p className="text-xs text-gray-600">{proj.description}</p>
                      {proj.technologies && (
                        <p className="text-xs text-gray-500">Tech: {proj.technologies}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* References */}
        {references && (
          <section className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 italic">{references}</p>
          </section>
        )}
      </div>
    </div>
  );
}
