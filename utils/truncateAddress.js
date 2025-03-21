// utils/truncateAddress.js

export const truncateAddress = (address, startLength = 4, endLength = 4) => {
    if (!address) return ''; // Handle empty address case
  
    const truncatedStart = address.slice(0, startLength); // Get the first few characters
    const truncatedEnd = address.slice(-endLength); // Get the last few characters
  
    return `${truncatedStart}...${truncatedEnd}`; // Combine truncated parts with ellipsis
  };
  