import { ResumeData } from '@/types/resume';

interface CorporateTemplateProps {
  data: ResumeData;
}

export function CorporateTemplate({ data }: CorporateTemplateProps) {
  const { personalDetails, professionalSummary, workExperience, education, skills, certifications, projects, awards, languages, references } = data;

  return (
    <div className="bg-white text-gray-900 font-serif" style={{ padding: '30px', minHeight: '100%', width: '100%' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-5">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-800 mb-1">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        {personalDetails.targetRole && (
          <p className="text-base text-gray-600 mb-2">{personalDetails.targetRole}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>| {personalDetails.phone}</span>}
          {personalDetails.location && <span>| {personalDetails.location}</span>}
        </div>
        {personalDetails.linkedInUrl && (
          <p className="text-xs text-gray-600 mt-1">{personalDetails.linkedInUrl}</p>
        )}
        {(personalDetails.nationality || personalDetails.visaStatus) && (
          <p className="text-xs text-gray-500 mt-1">
            {personalDetails.nationality}
            {personalDetails.visaStatus && ` | ${personalDetails.visaStatus}`}
          </p>
        )}
      </header>

      {/* Professional Summary */}
      {professionalSummary && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-700">{professionalSummary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-gray-800 text-xs">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-xs italic text-gray-600 mb-1">{exp.company}{exp.location ? ` - ${exp.location}` : ''}</p>
                {exp.bulletPoints && (
                  <ul className="text-xs text-gray-700 space-y-0.5 ml-3">
                    {exp.bulletPoints.split('\n').filter(Boolean).map((point, idx) => (
                      <li key={idx} className="list-disc text-xs">{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-800 text-xs">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{edu.year}</span>
                  {edu.gpa && <p className="text-xs text-gray-500">{edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
            Professional Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-semibold text-gray-800">{cert.name}</span>
                  <span className="text-gray-600"> - {cert.issuer}</span>
                </div>
                <span className="text-gray-500">{cert.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
            Core Competencies
          </h2>
          <p className="text-xs text-gray-700">{skills.join(' • ')}</p>
        </section>
      )}

      {/* Two column section for smaller items */}
      <div className="grid grid-cols-2 gap-4">
        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
              Languages
            </h2>
            <div className="space-y-0.5">
              {languages.map((lang) => (
                <div key={lang.id} className="text-xs">
                  <span className="font-medium text-gray-800">{lang.name}</span>
                  <span className="text-gray-500"> - {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
              Awards & Honors
            </h2>
            <div className="space-y-0.5">
              {awards.map((award) => (
                <div key={award.id} className="text-xs">
                  <span className="font-semibold text-gray-800">{award.title}</span>
                  <span className="text-gray-500"> ({award.year})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-gray-300 pb-1 mb-2 text-gray-800">
            Key Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-gray-800 text-xs">{proj.name}</h3>
                <p className="text-xs text-gray-600">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-xs text-gray-500 italic">Technologies: {proj.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {references && (
        <section className="mt-4 pt-2 border-t border-gray-300">
          <p className="text-xs text-gray-600 italic text-center">{references}</p>
        </section>
      )}
    </div>
  );
}
