import React from 'react';

interface LpuLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const LpuLogo: React.FC<LpuLogoProps> = ({
  className = 'w-10 h-10',
  size,
  showText = false
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className={`flex items-center gap-2.5 ${showText ? '' : 'inline-block'}`}>
      <svg
        viewBox="0 0 500 500"
        className={`${className} flex-shrink-0 select-none drop-shadow-md`}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top text arc */}
          <path id="logoTopArc" d="M 68,250 A 182,182 0 1,1 432,250" fill="none" />
          {/* Bottom text arc */}
          <path id="logoBottomArc" d="M 98,340 A 182,182 0 0,0 402,340" fill="none" />
          
          {/* Inner circle mask */}
          <clipPath id="innerDiscMask">
            <circle cx="250" cy="250" r="162" />
          </clipPath>
        </defs>

        {/* Outer White Background Circle with Black Ring */}
        <circle cx="250" cy="250" r="240" fill="#FFFFFF" stroke="#000000" strokeWidth="12" />

        {/* Top Text: LOVELY PROFESSIONAL UNIVERSITY */}
        <text
          fontFamily="'Plus Jakarta Sans', system-ui, Arial, sans-serif"
          fontWeight="700"
          fontSize="27"
          fill="#000000"
          letterSpacing="3.2"
        >
          <textPath href="#logoTopArc" startOffset="50%" textAnchor="middle">
            LOVELY PROFESSIONAL UNIVERSITY
          </textPath>
        </text>

        {/* Separator Dots */}
        <circle cx="85" cy="358" r="8.5" fill="#000000" />
        <circle cx="415" cy="358" r="8.5" fill="#000000" />

        {/* Bottom Text: PUNJAB (INDIA) */}
        <text
          fontFamily="'Plus Jakarta Sans', system-ui, Arial, sans-serif"
          fontWeight="700"
          fontSize="28"
          fill="#000000"
          letterSpacing="4.5"
        >
          <textPath href="#logoBottomArc" startOffset="50%" textAnchor="middle">
            PUNJAB (INDIA)
          </textPath>
        </text>

        {/* Saffron / Orange Inner Field */}
        <circle cx="250" cy="250" r="162" fill="#E86A17" stroke="#000000" strokeWidth="8" />

        {/* Radiating Sunburst Black Beams */}
        <g clipPath="url(#innerDiscMask)">
          {/* Beam 1 */}
          <polygon points="120,400 152,400 108,100 88,100" fill="#000000" />
          {/* Beam 2 */}
          <polygon points="125,400 162,400 178,90 152,90" fill="#000000" />
          {/* Beam 3 */}
          <polygon points="135,400 178,400 285,90 238,90" fill="#000000" />
          {/* Beam 4 */}
          <polygon points="145,400 190,400 375,140 338,125" fill="#000000" />
          {/* Beam 5 */}
          <polygon points="152,400 200,400 415,245 378,225" fill="#000000" />
          {/* Beam 6 */}
          <polygon points="160,400 208,400 415,350 370,335" fill="#000000" />
        </g>

        {/* Inner circle border overlay */}
        <circle cx="250" cy="250" r="162" fill="none" stroke="#000000" strokeWidth="8" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xs font-extrabold text-white tracking-wide uppercase leading-tight">
            Lovely Professional University
          </span>
          <span className="text-[10px] text-orange-400 font-mono leading-tight">
            Research & Disaster Informatics
          </span>
        </div>
      )}
    </div>
  );
};
