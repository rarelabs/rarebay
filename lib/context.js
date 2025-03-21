import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

// Create the context
const BackgroundContext = createContext();

// Context provider with state persistence
export function BackgroundProvider({ children }) {
  // Load states from cookies or use default values
  const [isDefaultBackground, setIsDefaultBackground] = useState(() => {
    return Cookies.get("isDefaultBackground") === "false" ? false : true;
  });

  const [isDivVisible, setIsDivVisible] = useState(() => {
    return Cookies.get("isDivVisible") === "true";
  });

  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    return Cookies.get("isAudioEnabled") === "true";
  });

  const [timeOfDay, setTimeOfDay] = useState(() => {
    return parseInt(Cookies.get("timeOfDay")) || 20;
  });

  const [dayLength, setDayLength] = useState(() => {
    return parseInt(Cookies.get("dayLength")) || 12;
  });

  const [isTimeLapse, setIsTimeLapse] = useState(() => {
    return Cookies.get("isTimeLapse") === "true";
  });

  const [timeSpeed, setTimeSpeed] = useState(() => {
    return parseInt(Cookies.get("timeSpeed")) || 1;
  });

  const [showEarthContainer, setShowEarthContainer] = useState(() => {
    return Cookies.get("showEarthContainer") === "true";
  });

  // Save states to cookies whenever they change
  useEffect(() => {
    Cookies.set("isDefaultBackground", isDefaultBackground, { expires: 7 });
  }, [isDefaultBackground]);

  useEffect(() => {
    Cookies.set("isDivVisible", isDivVisible, { expires: 7 });
  }, [isDivVisible]);

  useEffect(() => {
    Cookies.set("isAudioEnabled", isAudioEnabled, { expires: 7 });
  }, [isAudioEnabled]);

  useEffect(() => {
    Cookies.set("timeOfDay", timeOfDay, { expires: 7 });
  }, [timeOfDay]);

  useEffect(() => {
    Cookies.set("dayLength", dayLength, { expires: 7 });
  }, [dayLength]);

  useEffect(() => {
    Cookies.set("isTimeLapse", isTimeLapse, { expires: 7 });
  }, [isTimeLapse]);

  useEffect(() => {
    Cookies.set("timeSpeed", timeSpeed, { expires: 7 });
  }, [timeSpeed]);

  useEffect(() => {
    Cookies.set("showEarthContainer", showEarthContainer, { expires: 7 });
  }, [showEarthContainer]);

  // Toggle functions
  const toggleBackground = () => {
    setIsDefaultBackground((prev) => {
      const newTheme = !prev;
      setTimeOfDay(newTheme ? 20 : 12);
      return newTheme;
    });
  };

  const toggleDivVisibility = () => {
    setIsDivVisible((prev) => !prev);
  };

  const toggleEarthContainer = () => {
    setShowEarthContainer((prev) => !prev);
  };

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  // Update body background
  useEffect(() => {
    document.body.style.backgroundColor = isDefaultBackground
      ? "rgba(25, 25, 25, 1)" // Dark theme
      : "rgba(255, 255, 255, 0.95)"; // Light theme
    document.body.style.minHeight = "100vh";
  }, [isDefaultBackground]);

  // Manage div visibility
  useEffect(() => {
    const div = document.getElementById("context");
    if (div) {
      div.style.display = isDivVisible ? "block" : "none";
    }
  }, [isDivVisible]);

  // If div is visible, hide the Earth container
  useEffect(() => {
    if (isDivVisible) {
      setShowEarthContainer(false);
    }
  }, [isDivVisible]);

  // If Earth container is hidden, disable audio
  useEffect(() => {
    if (!showEarthContainer) {
      setIsAudioEnabled(false);
    }
  }, [showEarthContainer]);

  return (
    <BackgroundContext.Provider
      value={{
        toggleBackground,
        toggleDivVisibility,
        isDefaultBackground,
        isDivVisible,
        timeOfDay,
        setTimeOfDay,
        dayLength,
        setDayLength,
        isTimeLapse,
        setIsTimeLapse,
        timeSpeed,
        setTimeSpeed,
        showEarthContainer,
        setShowEarthContainer,
        toggleEarthContainer,
        isAudioEnabled,
        toggleAudio,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

// Custom hook for easier consumption
export const useBackground = () => useContext(BackgroundContext);
