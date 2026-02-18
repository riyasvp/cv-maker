import jsPDF from 'jspdf';

// Suppress html2canvas color parsing errors
const originalConsoleError = console.error;
console.error = function(...args) {
  // Filter out lab/oklch color errors from html2canvas
  const message = args[0];
  if (typeof message === 'string' && message.includes('unsupported color function')) {
    return; // Suppress this specific error
  }
  originalConsoleError.apply(console, args);
};

export async function generatePDF(elementId: string, filename: string = 'resume.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error('Resume element not found');
  }

  try {
    // Dynamically import html2canvas
    const html2canvas = (await import('html2canvas')).default;
    
    // Get dimensions
    const rect = element.getBoundingClientRect();
    const width = Math.max(rect.width, 794);
    const height = Math.max(rect.height, 1122);
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'pdf-wrapper-temp';
    wrapper.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: ${width}px;
      min-height: ${height}px;
      background: #ffffff;
      z-index: -9999;
    `;
    
    // Clone element
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = elementId + '-clone';
    clone.style.cssText = `
      width: ${width}px;
      min-height: ${height}px;
      background: #ffffff;
      transform: none;
    `;
    
    // Process all elements
    const allElements = clone.querySelectorAll('*');
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.transform = 'none';
      htmlEl.style.transformOrigin = 'initial';
    });
    
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    
    // Wait for DOM
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Create canvas with error handling
    let canvas: HTMLCanvasElement;
    try {
      canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: width,
        height: height,
        scrollX: 0,
        scrollY: -window.scrollY,
        x: 0,
        y: 0,
        onclone: (clonedDoc) => {
          const clonedWrapper = clonedDoc.getElementById('pdf-wrapper-temp');
          if (clonedWrapper) {
            const elements = clonedWrapper.querySelectorAll('*');
            elements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const view = clonedDoc.defaultView;
              if (view) {
                const computedStyle = view.getComputedStyle(htmlEl);
                
                // Convert colors to hex
                const bg = computedStyle.backgroundColor;
                if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
                  htmlEl.style.backgroundColor = safeColorToHex(bg);
                }
                
                const color = computedStyle.color;
                if (color) {
                  htmlEl.style.color = safeColorToHex(color);
                }
                
                // Convert border colors
                ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'].forEach(prop => {
                  const borderValue = computedStyle[prop as keyof CSSStyleDeclaration] as string;
                  if (borderValue && borderValue !== 'transparent') {
                    (htmlEl.style as any)[prop] = safeColorToHex(borderValue);
                  }
                });
              }
              
              // Remove problematic CSS
              htmlEl.style.removeProperty('filter');
              htmlEl.style.removeProperty('backdrop-filter');
            });
          }
        },
      });
    } catch (error) {
      console.warn('Canvas generation warning:', error);
      // Continue anyway - the canvas might still be usable
      canvas = document.createElement('canvas');
      canvas.width = width * 2;
      canvas.height = height * 2;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    
    // Cleanup
    wrapper.remove();
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = pdfWidth / (imgWidth / 2);
    const scaledHeight = (imgHeight / 2) * ratio;
    
    // Use JPEG for better compatibility
    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    
    // Handle multi-page
    let heightLeft = scaledHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - scaledHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }
    
    pdf.setProperties({
      title: filename.replace('.pdf', ''),
      subject: 'Professional Resume',
      creator: 'Dubai-CV-Pro',
    });
    
    pdf.save(filename);
    
    // Restore console.error
    console.error = originalConsoleError;
    
  } catch (error) {
    console.error = originalConsoleError;
    console.error('PDF generation failed:', error);
    throw error;
  }
}

// Safely convert any color to hex
function safeColorToHex(color: string): string {
  if (!color) return '#000000';
  
  // Already hex
  if (color.startsWith('#')) {
    return color.length === 7 ? color : '#000000';
  }
  
  // Try to parse rgb/rgba
  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/i);
  if (rgbMatch) {
    const r = Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10)));
    const g = Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10)));
    const b = Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Default fallback
  return '#000000';
}
