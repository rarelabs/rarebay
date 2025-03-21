import React, { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{ 
        position: 'relative', 
        display: 'inline-block'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && content && (
        <div 
          style={{
            position: 'absolute',
            top: '0px',
            left: '90px',
            transform: 'translateX(-50%)',
            backdropFilter: 'blur(10px)',
            background: 'rgba(0, 0, 0, 0.2)',
            color: '#fff',
            padding: '8px 8px',
            fontSize: '12px',
            borderRadius: '8px',
            zIndex: 1000,
            whiteSpace: 'nowrap'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;