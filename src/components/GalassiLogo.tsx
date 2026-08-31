import React from 'react';
import defaultLogoImg from '../assets/images/galassi_logo_1788195525077.jpg';

interface GalassiLogoProps {
  customLogoUrl?: string;
  className?: string;
  width?: number;
}

export const GalassiLogo: React.FC<GalassiLogoProps> = ({
  customLogoUrl,
  className = '',
  width = 150,
}) => {
  const logoSrc = customLogoUrl || defaultLogoImg;

  return (
    <div
      className={`flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: `${width}px` }}
      id="galassi-official-logo-container"
    >
      <img
        src={logoSrc}
        alt="Logo Galassi Supermercados - Amigos servindo amigos"
        className="w-full h-auto object-contain max-h-[125px]"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
    </div>
  );
};

