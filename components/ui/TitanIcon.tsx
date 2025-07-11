import React from 'react';
import { TitanType } from '../../lib/types/titan';

interface TitanIconProps {
  titan: TitanType;
  size?: number;
  className?: string;
}

export const TitanIcon: React.FC<TitanIconProps> = ({ titan, size = 120, className = '' }) => {
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 120 120',
    className: `titan-icon ${className}`,
  };

  const renderTitanBody = () => {
    switch (titan) {
      case '始祖の巨人':
        return (
          <g>
            {/* Crown */}
            <path d="M30 20 L90 20 L85 35 L35 35 Z" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
            <circle cx="45" cy="27" r="3" fill="#FF4500"/>
            <circle cx="60" cy="27" r="3" fill="#FF4500"/>
            <circle cx="75" cy="27" r="3" fill="#FF4500"/>
            {/* Body */}
            <rect x="40" y="35" width="40" height="60" fill="#F4A460" stroke="#8B4513" strokeWidth="2"/>
            <rect x="35" y="50" width="50" height="30" fill="#DEB887" stroke="#8B4513" strokeWidth="2"/>
            {/* Arms */}
            <rect x="25" y="50" width="15" height="25" fill="#F4A460" stroke="#8B4513" strokeWidth="2"/>
            <rect x="80" y="50" width="15" height="25" fill="#F4A460" stroke="#8B4513" strokeWidth="2"/>
            {/* Legs */}
            <rect x="45" y="95" width="12" height="20" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            <rect x="63" y="95" width="12" height="20" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            {/* Royal markings */}
            <circle cx="60" cy="65" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <path d="M56 61 L64 61 L60 69 Z" fill="#B8860B"/>
          </g>
        );

      case '進撃の巨人':
        return (
          <g>
            {/* Muscular body */}
            <rect x="35" y="30" width="50" height="65" fill="#DC143C" stroke="#8B0000" strokeWidth="3"/>
            <rect x="40" y="35" width="40" height="55" fill="#FF4500" stroke="#8B0000" strokeWidth="2"/>
            {/* Strong arms */}
            <rect x="20" y="40" width="20" height="35" fill="#DC143C" stroke="#8B0000" strokeWidth="2"/>
            <rect x="80" y="40" width="20" height="35" fill="#DC143C" stroke="#8B0000" strokeWidth="2"/>
            {/* Powerful legs */}
            <rect x="42" y="95" width="15" height="20" fill="#8B0000" stroke="#654321" strokeWidth="2"/>
            <rect x="63" y="95" width="15" height="20" fill="#8B0000" stroke="#654321" strokeWidth="2"/>
            {/* Lightning effect */}
            <path d="M60 20 L58 30 L62 30 L60 40 L64 40 L60 50" fill="#FFFF00" stroke="#FFD700" strokeWidth="1"/>
            {/* Aggressive markings */}
            <path d="M45 50 L55 50 L50 60 Z" fill="#8B0000"/>
            <path d="M65 50 L75 50 L70 60 Z" fill="#8B0000"/>
          </g>
        );

      case '超大型巨人':
        return (
          <g>
            {/* Large imposing body */}
            <rect x="25" y="25" width="70" height="70" fill="#8B4513" stroke="#654321" strokeWidth="3"/>
            <rect x="30" y="30" width="60" height="60" fill="#A0522D" stroke="#654321" strokeWidth="2"/>
            {/* Massive arms */}
            <rect x="10" y="40" width="20" height="40" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            <rect x="90" y="40" width="20" height="40" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            {/* Thick legs */}
            <rect x="35" y="95" width="20" height="20" fill="#654321" stroke="#8B4513" strokeWidth="2"/>
            <rect x="65" y="95" width="20" height="20" fill="#654321" stroke="#8B4513" strokeWidth="2"/>
            {/* Steam effect */}
            <circle cx="40" cy="40" r="5" fill="#E6E6FA" opacity="0.6"/>
            <circle cx="50" cy="35" r="4" fill="#E6E6FA" opacity="0.6"/>
            <circle cx="70" cy="40" r="5" fill="#E6E6FA" opacity="0.6"/>
            <circle cx="80" cy="35" r="4" fill="#E6E6FA" opacity="0.6"/>
            {/* Intimidating face area */}
            <rect x="45" y="50" width="30" height="20" fill="#654321" stroke="#8B4513" strokeWidth="2"/>
          </g>
        );

      case '鎧の巨人':
        return (
          <g>
            {/* Armored body */}
            <rect x="35" y="30" width="50" height="65" fill="#708090" stroke="#2F4F4F" strokeWidth="3"/>
            <rect x="40" y="35" width="40" height="55" fill="#778899" stroke="#2F4F4F" strokeWidth="2"/>
            {/* Armored arms */}
            <rect x="25" y="45" width="15" height="30" fill="#708090" stroke="#2F4F4F" strokeWidth="2"/>
            <rect x="80" y="45" width="15" height="30" fill="#708090" stroke="#2F4F4F" strokeWidth="2"/>
            {/* Armored legs */}
            <rect x="42" y="95" width="15" height="20" fill="#2F4F4F" stroke="#708090" strokeWidth="2"/>
            <rect x="63" y="95" width="15" height="20" fill="#2F4F4F" stroke="#708090" strokeWidth="2"/>
            {/* Armor plates */}
            <rect x="45" y="40" width="30" height="8" fill="#2F4F4F" stroke="#708090" strokeWidth="1"/>
            <rect x="45" y="55" width="30" height="8" fill="#2F4F4F" stroke="#708090" strokeWidth="1"/>
            <rect x="45" y="70" width="30" height="8" fill="#2F4F4F" stroke="#708090" strokeWidth="1"/>
            {/* Shield symbol */}
            <path d="M55 50 L65 50 L60 65 Z" fill="#4682B4" stroke="#2F4F4F" strokeWidth="1"/>
          </g>
        );

      case '女型の巨人':
        return (
          <g>
            {/* Graceful body */}
            <rect x="40" y="30" width="40" height="65" fill="#FF69B4" stroke="#C71585" strokeWidth="2"/>
            <rect x="42" y="35" width="36" height="55" fill="#FFB6C1" stroke="#C71585" strokeWidth="2"/>
            {/* Slender arms */}
            <rect x="30" y="45" width="12" height="30" fill="#FF69B4" stroke="#C71585" strokeWidth="2"/>
            <rect x="78" y="45" width="12" height="30" fill="#FF69B4" stroke="#C71585" strokeWidth="2"/>
            {/* Elegant legs */}
            <rect x="45" y="95" width="12" height="20" fill="#C71585" stroke="#8B0000" strokeWidth="2"/>
            <rect x="63" y="95" width="12" height="20" fill="#C71585" stroke="#8B0000" strokeWidth="2"/>
            {/* Crystalline elements */}
            <path d="M50 45 L55 40 L60 45 L65 40 L70 45 L65 50 L60 55 L55 50 Z" fill="#87CEEB" stroke="#4682B4" strokeWidth="1"/>
            <circle cx="60" cy="65" r="6" fill="#87CEEB" stroke="#4682B4" strokeWidth="1"/>
            {/* Feminine details */}
            <path d="M50 75 L70 75" stroke="#C71585" strokeWidth="2" fill="none"/>
            <path d="M52 80 L68 80" stroke="#C71585" strokeWidth="2" fill="none"/>
          </g>
        );

      case '獣の巨人':
        return (
          <g>
            {/* Ape-like body */}
            <rect x="35" y="35" width="50" height="60" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            <rect x="40" y="40" width="40" height="50" fill="#A0522D" stroke="#654321" strokeWidth="2"/>
            {/* Long arms */}
            <rect x="20" y="45" width="20" height="35" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            <rect x="80" y="45" width="20" height="35" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            {/* Powerful legs */}
            <rect x="45" y="95" width="15" height="20" fill="#654321" stroke="#8B4513" strokeWidth="2"/>
            <rect x="60" y="95" width="15" height="20" fill="#654321" stroke="#8B4513" strokeWidth="2"/>
            {/* Fur texture */}
            <path d="M40 45 L45 50 L40 55 L45 60 L40 65" stroke="#654321" strokeWidth="1" fill="none"/>
            <path d="M75 45 L70 50 L75 55 L70 60 L75 65" stroke="#654321" strokeWidth="1" fill="none"/>
            {/* Intelligent eyes area */}
            <circle cx="50" cy="50" r="4" fill="#FFFF00" stroke="#FFD700" strokeWidth="1"/>
            <circle cx="70" cy="50" r="4" fill="#FFFF00" stroke="#FFD700" strokeWidth="1"/>
            {/* Primal markings */}
            <path d="M45 70 L55 70 L50 80 Z" fill="#654321"/>
            <path d="M65 70 L75 70 L70 80 Z" fill="#654321"/>
          </g>
        );

      case '顎の巨人':
        return (
          <g>
            {/* Agile body */}
            <rect x="45" y="35" width="30" height="60" fill="#32CD32" stroke="#228B22" strokeWidth="2"/>
            <rect x="47" y="40" width="26" height="50" fill="#90EE90" stroke="#228B22" strokeWidth="2"/>
            {/* Quick arms */}
            <rect x="35" y="50" width="12" height="25" fill="#32CD32" stroke="#228B22" strokeWidth="2"/>
            <rect x="73" y="50" width="12" height="25" fill="#32CD32" stroke="#228B22" strokeWidth="2"/>
            {/* Swift legs */}
            <rect x="48" y="95" width="10" height="20" fill="#228B22" stroke="#006400" strokeWidth="2"/>
            <rect x="62" y="95" width="10" height="20" fill="#228B22" stroke="#006400" strokeWidth="2"/>
            {/* Speed lines */}
            <path d="M25 40 L35 40" stroke="#90EE90" strokeWidth="2" fill="none"/>
            <path d="M25 50 L35 50" stroke="#90EE90" strokeWidth="2" fill="none"/>
            <path d="M25 60 L35 60" stroke="#90EE90" strokeWidth="2" fill="none"/>
            <path d="M85 40 L95 40" stroke="#90EE90" strokeWidth="2" fill="none"/>
            <path d="M85 50 L95 50" stroke="#90EE90" strokeWidth="2" fill="none"/>
            <path d="M85 60 L95 60" stroke="#90EE90" strokeWidth="2" fill="none"/>
            {/* Sharp features */}
            <path d="M55 55 L65 55 L60 65 Z" fill="#228B22"/>
          </g>
        );

      case '戦槌の巨人':
        return (
          <g>
            {/* Creative body */}
            <rect x="40" y="30" width="40" height="65" fill="#9932CC" stroke="#4B0082" strokeWidth="2"/>
            <rect x="42" y="35" width="36" height="55" fill="#BA55D3" stroke="#4B0082" strokeWidth="2"/>
            {/* Crafting arms */}
            <rect x="28" y="45" width="15" height="30" fill="#9932CC" stroke="#4B0082" strokeWidth="2"/>
            <rect x="77" y="45" width="15" height="30" fill="#9932CC" stroke="#4B0082" strokeWidth="2"/>
            {/* Stable legs */}
            <rect x="45" y="95" width="12" height="20" fill="#4B0082" stroke="#2F0058" strokeWidth="2"/>
            <rect x="63" y="95" width="12" height="20" fill="#4B0082" stroke="#2F0058" strokeWidth="2"/>
            {/* Hammer/tool */}
            <rect x="15" y="50" width="15" height="6" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
            <rect x="20" y="48" width="5" height="10" fill="#654321" stroke="#8B4513" strokeWidth="1"/>
            {/* Creation symbols */}
            <circle cx="60" cy="50" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
            <path d="M56 46 L64 46 L64 54 L56 54 Z" fill="#4B0082"/>
            <path d="M52 50 L68 50" stroke="#FFD700" strokeWidth="2" fill="none"/>
            <path d="M60 42 L60 58" stroke="#FFD700" strokeWidth="2" fill="none"/>
            {/* Artistic details */}
            <path d="M45 75 L55 70 L65 75 L75 70" stroke="#BA55D3" strokeWidth="2" fill="none"/>
          </g>
        );

      case '車力の巨人':
        return (
          <g>
            {/* Endurance body */}
            <rect x="35" y="35" width="50" height="60" fill="#2E8B57" stroke="#006400" strokeWidth="2"/>
            <rect x="40" y="40" width="40" height="50" fill="#3CB371" stroke="#006400" strokeWidth="2"/>
            {/* Steady arms */}
            <rect x="25" y="50" width="15" height="30" fill="#2E8B57" stroke="#006400" strokeWidth="2"/>
            <rect x="80" y="50" width="15" height="30" fill="#2E8B57" stroke="#006400" strokeWidth="2"/>
            {/* Reliable legs */}
            <rect x="42" y="95" width="15" height="20" fill="#006400" stroke="#2E8B57" strokeWidth="2"/>
            <rect x="63" y="95" width="15" height="20" fill="#006400" stroke="#2E8B57" strokeWidth="2"/>
            {/* Cargo/support equipment */}
            <rect x="45" y="25" width="30" height="8" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
            <rect x="50" y="20" width="20" height="5" fill="#654321" stroke="#8B4513" strokeWidth="1"/>
            {/* Endurance markings */}
            <circle cx="50" cy="60" r="3" fill="#006400"/>
            <circle cx="60" cy="60" r="3" fill="#006400"/>
            <circle cx="70" cy="60" r="3" fill="#006400"/>
            <circle cx="50" cy="70" r="3" fill="#006400"/>
            <circle cx="60" cy="70" r="3" fill="#006400"/>
            <circle cx="70" cy="70" r="3" fill="#006400"/>
            {/* Mechanical elements */}
            <rect x="55" y="45" width="10" height="25" fill="#708090" stroke="#2F4F4F" strokeWidth="1"/>
          </g>
        );

      default:
        return <circle cx="60" cy="60" r="30" fill="#cccccc" stroke="#999999" strokeWidth="2"/>;
    }
  };

  return (
    <svg {...iconProps}>
      {renderTitanBody()}
    </svg>
  );
};

export default TitanIcon;