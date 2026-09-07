import React from 'react';

interface TrustedMalaysiaBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TrustedMalaysiaBadge({ className = '', size = 'md' }: TrustedMalaysiaBadgeProps) {
  const sizeClasses = {
    sm: 'max-w-[240px]',
    md: 'max-w-[320px] sm:max-w-[360px]',
    lg: 'max-w-[400px]'
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 bg-[#c6a052]/15 rounded-full blur-2xl transform scale-90 pointer-events-none" 
        aria-hidden="true" 
      />

      <svg
        viewBox="0 0 400 400"
        className={`w-full h-auto ${sizeClasses[size]} drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] select-none relative z-10 transition-transform duration-500 hover:scale-[1.02]`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arc path for top curved text 'TRUSTED' */}
          <path
            id="arc-trusted"
            d="M 82,200 A 118,118 0 0,1 318,200"
            fill="none"
          />
          {/* Arc path for bottom curved text 'MALAYSIA' (oriented upright) */}
          <path
            id="arc-malaysia"
            d="M 80,200 A 118,118 0 0,0 320,200"
            fill="none"
          />

          {/* Subtle 3D Linear Gradient for Scallop */}
          <linearGradient id="scallop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA6E78" />
            <stop offset="100%" stopColor="#D85460" />
          </linearGradient>

          {/* Inner Cream Gradient */}
          <radialGradient id="cream-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#FCE0B6" />
          </radialGradient>

          {/* Green Badge Gradient */}
          <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3CD070" />
            <stop offset="100%" stopColor="#22964C" />
          </linearGradient>
        </defs>

        {/* 1. Outer 18-Scalloped Rosette */}
        <path
          d="M 358.00 200.00 C 381.56 212.70 374.95 250.17 348.47 254.04 C 366.27 274.03 347.24 306.98 321.04 301.56 C 330.92 326.43 301.77 350.88 279.00 336.83 C 279.78 363.58 244.03 376.59 227.44 355.60 C 219.02 381.00 180.98 381.00 172.56 355.60 C 155.97 376.59 120.22 363.58 121.00 336.83 C 98.23 350.88 69.08 326.43 78.96 301.56 C 52.76 306.98 33.73 274.03 51.53 254.04 C 25.05 250.17 18.44 212.70 42.00 200.00 C 18.44 187.30 25.05 149.83 51.53 145.96 C 33.73 125.97 52.76 93.02 78.96 98.44 C 69.08 73.57 98.23 49.12 121.00 63.17 C 120.22 36.42 155.97 23.41 172.56 44.40 C 180.98 19.00 219.02 19.00 227.44 44.40 C 244.03 23.41 279.78 36.42 279.00 63.17 C 301.77 49.12 330.92 73.57 321.04 98.44 C 347.24 93.02 366.27 125.97 348.47 145.96 C 374.95 149.83 381.56 187.30 358.00 200.00 Z"
          fill="url(#scallop-grad)"
          stroke="#101826"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* 2. Inner Warm Cream Circle */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="url(#cream-grad)"
          stroke="#101826"
          strokeWidth="7"
        />

        {/* 3. Top Curved Text: TRUSTED */}
        <text
          fill="#101826"
          fontSize="24"
          fontWeight="900"
          letterSpacing="11"
          fontFamily="'Arial Black', 'Inter', -apple-system, sans-serif"
        >
          <textPath href="#arc-trusted" startOffset="50%" textAnchor="middle">
            TRUSTED
          </textPath>
        </text>

        {/* 4. Left Green Verified Check Circle */}
        <g transform="translate(90, 200)">
          <circle cx="0" cy="0" r="19" fill="url(#green-grad)" stroke="#101826" strokeWidth="4.5" />
          <path
            d="M -7 0.5 L -2 6.5 L 8 -4.5"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* 5. Right Green Verified Check Circle */}
        <g transform="translate(310, 200)">
          <circle cx="0" cy="0" r="19" fill="url(#green-grad)" stroke="#101826" strokeWidth="4.5" />
          <path
            d="M -7 0.5 L -2 6.5 L 8 -4.5"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* 6. Bottom Curved Text: MALAYSIA */}
        <text
          fill="#101826"
          fontSize="22"
          fontWeight="900"
          letterSpacing="9"
          fontFamily="'Arial Black', 'Inter', -apple-system, sans-serif"
        >
          <textPath href="#arc-malaysia" startOffset="50%" textAnchor="middle">
            MALAYSIA
          </textPath>
        </text>

        {/* 7. Center Petronas Twin Towers Illustration */}
        <g stroke="#101826" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Ground Baseline */}
          <line x1="146" y1="262" x2="254" y2="262" strokeWidth="5" />

          {/* === LEFT TOWER === */}
          {/* Spire */}
          <line x1="184" y1="134" x2="184" y2="152" strokeWidth="3.5" />
          <circle cx="184" cy="132" r="3" fill="#101826" stroke="none" />
          {/* Stepped Roof */}
          <polygon points="184,152 176,163 192,163" fill="#FCE0B6" strokeWidth="3.5" />
          
          {/* Upper Section */}
          <rect x="175" y="163" width="18" height="20" fill="#FCE0B6" strokeWidth="3.5" />
          <line x1="175" y1="170" x2="193" y2="170" />
          <line x1="175" y1="177" x2="193" y2="177" />
          <line x1="184" y1="163" x2="184" y2="183" />

          {/* Mid Section */}
          <rect x="173" y="183" width="22" height="34" fill="#FCE0B6" strokeWidth="3.5" />
          <line x1="173" y1="191" x2="195" y2="191" />
          <line x1="173" y1="199" x2="195" y2="199" />
          <line x1="173" y1="207" x2="195" y2="207" />
          <line x1="184" y1="183" x2="184" y2="217" />

          {/* Lower Base Section */}
          <rect x="171" y="217" width="26" height="45" fill="#FCE0B6" strokeWidth="3.5" />
          <line x1="171" y1="226" x2="197" y2="226" />
          <line x1="171" y1="235" x2="197" y2="235" />
          <line x1="171" y1="244" x2="197" y2="244" />
          <line x1="171" y1="253" x2="197" y2="253" />
          <line x1="180" y1="217" x2="180" y2="262" />
          <line x1="188" y1="217" x2="188" y2="262" />

          {/* === RIGHT TOWER === */}
          {/* Spire */}
          <line x1="216" y1="134" x2="216" y2="152" strokeWidth="3.5" />
          <circle cx="216" cy="132" r="3" fill="#101826" stroke="none" />
          {/* Stepped Roof */}
          <polygon points="216,152 208,163 224,163" fill="#FCE0B6" strokeWidth="3.5" />
          
          {/* Upper Section */}
          <rect x="207" y="163" width="18" height="20" fill="#FCE0B6" strokeWidth="3.5" />
          <line x1="207" y1="170" x2="225" y2="170" />
          <line x1="207" y1="177" x2="225" y2="177" />
          <line x1="216" y1="163" x2="216" y2="183" />

          {/* Mid Section */}
          <rect x="205" y="183" width="22" height="34" fill="#FCE0B6" strokeWidth="3.5" />
          <line x1="205" y1="191" x2="227" y2="191" />
          <line x1="205" y1="199" x2="227" y2="199" />
          <line x1="205" y1="207" x2="227" y2="207" />
          <line x1="216" y1="183" x2="216" y2="217" />

          {/* Lower Base Section */}
          <rect x="203" y="217" width="26" height="45" fill="#FCE0B6" strokeWidth="3.5" />
          <line x1="203" y1="226" x2="229" y2="226" />
          <line x1="203" y1="235" x2="229" y2="235" />
          <line x1="203" y1="244" x2="229" y2="244" />
          <line x1="203" y1="253" x2="229" y2="253" />
          <line x1="212" y1="217" x2="212" y2="262" />
          <line x1="220" y1="217" x2="220" y2="262" />

          {/* === CONNECTING SKYBRIDGE === */}
          <rect x="195" y="202" width="10" height="7" fill="#FCE0B6" strokeWidth="3.5" />
          <line x1="195" y1="213" x2="200" y2="209" strokeWidth="2.5" />
          <line x1="205" y1="213" x2="200" y2="209" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}
