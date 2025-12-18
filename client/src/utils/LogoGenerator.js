

// ============================================
// LOGO GENERATOR - LogoGenerator.js
// ============================================
// Save this as: src/utils/LogoGenerator.js
// This creates SVG logos for R and M separately

export const generateRLogo = (size = 120, primaryColor = '#3B82F6', backgroundColor = '#fff') => {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Background Circle -->
      <circle cx="60" cy="60" r="58" fill="${backgroundColor}" stroke="${primaryColor}" stroke-width="2"/>
      
      <!-- Letter R with 3D effect -->
      <defs>
        <linearGradient id="rGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- R Letter -->
      <text x="60" y="85" font-size="80" font-weight="bold" font-family="Arial, sans-serif" 
            text-anchor="middle" fill="url(#rGradient)" dominant-baseline="middle">
        R
      </text>
      
      <!-- 3D Shadow Effect -->
      <circle cx="60" cy="60" r="55" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.3"/>
    </svg>
  `;
};

export const generateMLogo = (size = 120, primaryColor = '#10B981', backgroundColor = '#fff') => {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Background Circle -->
      <circle cx="60" cy="60" r="58" fill="${backgroundColor}" stroke="${primaryColor}" stroke-width="2"/>
      
      <!-- Letter M with 3D effect -->
      <defs>
        <linearGradient id="mGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- M Letter -->
      <text x="60" y="85" font-size="80" font-weight="bold" font-family="Arial, sans-serif" 
            text-anchor="middle" fill="url(#mGradient)" dominant-baseline="middle">
        M
      </text>
      
      <!-- 3D Shadow Effect -->
      <circle cx="60" cy="60" r="55" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.3"/>
    </svg>
  `;
};

// ============================================
// EXPLANATION FOR BEGINNERS:
// ============================================
// 1. SVG is a vector format that scales perfectly (no pixelation)
// 2. linearGradient creates beautiful color transitions
// 3. Functions accept size and colors as parameters
// 4. Circle with gradient stroke creates premium 3D effect
// 5. Can be used as: <img src={`data:image/svg+xml;base64,...`} />
