import React from "react";
import PropTypes from "prop-types";

// Utility to generate a hash from a string
const stringToHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// List of predefined colors
const colorPalette = [
  'black',
  'white',
];

// Generate colors based on the Ethereum address using the predefined palette
const generateBlockieColors = (address) => {
  if (!address) return [colorPalette[0]]; // If no address, return default color
  const hash = stringToHash(address);
  const colors = [];

  for (let i = 0; i < 16; i++) { // Use 16 colors for consistency
    const colorIndex = (hash >> (i * 2)) % colorPalette.length;
    colors.push(colorPalette[colorIndex]);
  }

  return colors;
};

// Determine if a pixel should be filled based on hash
const shouldFillPixel = (hash, x, y, gridSize) => {
  const index = y * gridSize + x;
  return (hash >> index) & 1;
};

// Blockie Component
const Blockie = ({ address, gridSize = 4, size = 30 }) => {
  const hash = stringToHash(address || ""); // Ensure we have a hash even if no address
  const colors = generateBlockieColors(address) || ['gray']; // Default color if no colors generated
  
  const renderPixel = (x, y) => {
    const colorIndex = ((x + y * gridSize) ^ (hash >> 8)) % colors.length; // Adjust for grid size
    const fill = shouldFillPixel(hash, x, y, gridSize);
    const bgColor = colors[colorIndex];
    const fgColor = colors[(colorIndex + 4) % colors.length]; // Use different color for filled pixels

    return (
      <div 
        key={`${x}-${y}`}
        style={{
          backgroundColor: fill ? fgColor : bgColor,
          width: `${size / gridSize}px`,
          height: `${size / gridSize}px`,
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "10px",
        overflow: "hidden",
        backdropFilter:'blu(10px)',
        background: 'white',
        border: 'solid 2px white'
      }}
    >
      {[...Array(gridSize)].map((_, y) => 
        [...Array(gridSize)].map((_, x) => renderPixel(x, y))
      )}
    </div>
  );
};

Blockie.propTypes = {
  address: PropTypes.string,
  gridSize: PropTypes.number, // Adjustable grid size, default is 4
  size: PropTypes.number, // Default size in pixels, scales with grid size
};

export default Blockie;