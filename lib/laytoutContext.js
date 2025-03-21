import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../utils/toast';
import Cookies from 'js-cookie'; // Import js-cookie for client-side cookie management

const LayoutContext = createContext();

export const useLayout = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider = ({ children }) => {
  const [gridOrder, setGridOrder] = useState([1, 2, 3]); // Default order
  const [proMode, setProMode] = useState(false); // Track Pro mode state

  // Toggle layout direction
  const toggleLayout = (direction) => {
    if (direction === 'left') {
      setGridOrder([1, 2, 3]);
    } else if (direction === 'right') {
      setGridOrder([3, 2, 1]);
    }
  };
  useEffect(()=>{
    if(!proMode){
      setGridOrder([1, 2, 3]);
    }
  })
const {addToast} = useToast();
  // Toggle Pro mode
  const togglePro = () => {
    setProMode((prev) => !prev);
     !proMode ? addToast('success', 'Pro Mode Activated') : addToast('error', 'Pro Mode Deactivated')
  };
 
  return (
    <LayoutContext.Provider value={{ gridOrder, toggleLayout, proMode, togglePro, setProMode }}>
      {children}
    </LayoutContext.Provider>
  );
};


