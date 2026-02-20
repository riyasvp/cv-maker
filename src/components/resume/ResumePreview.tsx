'use client';

import { ResumeData, TemplateType } from '@/types/resume';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Eye, EyeOff, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import { generatePDF } from '@/lib/pdf-generator';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export function ResumePreview({ data, template, onTemplateChange }: ResumePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [zoom, setZoom] = useState(50);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const filename = `${data.personalDetails.fullName || 'resume'}_cv.pdf`;
      await generatePDF('resume-preview', filename);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderTemplate = () => {
    switch (template) {
      case 'corporate':
        return <CorporateTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 10, 100));
  const zoomOut = () => setZoom(prev => Math.max(prev - 10, 30));

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Select
            value={template}
            onValueChange={(value) => onTemplateChange(value as TemplateType)}
          >
            <SelectTrigger className="w-[160px] bg-white border-gray-200">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corporate">🏛️ The Corporate</SelectItem>
              <SelectItem value="modern">✨ The Modern</SelectItem>
              <SelectItem value="executive">👔 The Executive</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Zoom Controls */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              className="h-7 w-7 p-0"
              disabled={zoom <= 30}
            >
              <ZoomOut className="w-3 h-3" />
            </Button>
            <span className="text-xs text-gray-600 w-10 text-center">{zoom}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              className="h-7 w-7 p-0"
              disabled={zoom >= 100}
            >
              <ZoomIn className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="lg:hidden"
          >
            {isVisible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {isVisible ? 'Hide' : 'Show'}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="text-white gap-2 shadow-md"
            style={{ backgroundColor: '#d4af37' }}
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Download PDF
          </Button>
        </div>
      </div>

      {/* Preview */}
      {isVisible && (
        <div className="flex-1 rounded-xl overflow-hidden border border-gray-200" style={{ backgroundColor: '#f3f4f6' }}>
          <div 
            className="h-full overflow-y-auto p-4 md:p-6" 
            style={{ maxHeight: 'calc(100vh - 280px)' }}
          >
            <div className="flex justify-center">
              <div
                id="resume-preview"
                className="bg-white shadow-2xl"
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  transformOrigin: 'top center',
                  transform: `scale(${zoom / 100})`,
                  marginBottom: `${(100 - zoom) * 3}mm`,
                }}
              >
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(15, 23, 42, 0.05)' }}>
        <p className="text-xs text-gray-600">
          💡 <strong>Tip:</strong> Use the &quot;Enhance with AI&quot; buttons to get multiple professional versions of your text. Choose the one that fits best!
        </p>
      </div>
    </div>
  );
}
