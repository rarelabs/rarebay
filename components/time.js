// Theme.js (Simulation Component)
import React, {useEffect, useRef} from 'react';
import styles from '../styles/home.module.css';
import { useBackground } from '../lib/context';
import FlyingBird from './fly';
import { LayoutProvider, useLayout } from '../lib/laytoutContext';


const Theme = () => {
  const { timeOfDay, isDefaultBackground } = useBackground();
  const birdFrames = [
    '/eg.png',
    '/eg1.png',
    '/eg2.png',
    '/eg3.png'
  ];
  // Define day phase from 6 AM to 6 PM.
  const dayStart = 6;
  const dayEnd = 18;
  const isDaytime = timeOfDay >= dayStart && timeOfDay < dayEnd;

  // Compute the angle along a semicircular arc.
  // For daytime: at 6 AM -> 90° (east), at noon -> 0° (center), at 6 PM -> -90° (west).
  // For nighttime: adjust time (<6 AM becomes +24) so that at 6 PM -> -90°, midnight -> 0°, 6 AM -> 90°.
  const getAngle = () => {
    if (isDaytime) {
      const progress = (timeOfDay - dayStart) / 12; // 0 at 6 AM, 0.5 at noon, 1 at 6 PM.
      return 150 - progress * 180; // 90° -> 0° -> -90°.
    } else {
      let nightTime = timeOfDay;
      if (timeOfDay < dayStart) nightTime += 24; // e.g. 2 AM becomes 26.
      const progress = (nightTime - 18) / 12; // 0 at 6 PM, 0.5 at midnight, 1 at 6 AM.
      return -90 + progress * 180; // -90° -> 0° -> 90°.
    }
  };

  // The color of the celestial body changes with time:
  // Daytime → yellow–orange (sun), Nighttime → pure white (moon).
  const celestialColor = isDaytime
    ? "radial-gradient(circle, #FFD700 0%, #FFA500 100%)"
    : "rgba(200, 200, 200)";

  // Add a 50px shadow blur matching the phase.
  const bodyShadow = isDaytime
    ? "0 0 50px rgba(255, 165, 0.2)"
    : "0 0 50px rgba(155, 255, 255)";

  // The overall background color changes based on theme and time.
  const backgroundColor = () => {
    if (isDefaultBackground) {
      // Dark theme: a dark gradient that brightens a bit at midday.
      const brightness = Math.max(15, 60 - Math.abs(timeOfDay - 12) * 4);
      return `rgb(${brightness}, ${brightness}, ${brightness})`;
    } else {
      // Light theme: skyblue for day, midnightblue for night.
      return isDaytime ? "skyblue" : "midnightblue";
    }
  };

  
  const ulRef = useRef(null);

  useEffect(() => {
    let startTime;
    const amplitude = 5; // Maximum vertical movement in pixels
    const frequency = -0.002; // Speed of the wave (adjust as needed)
    const liElements = ulRef.current.querySelectorAll('li');

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      liElements.forEach((li, index) => {
        // Apply a phase shift for each li so they animate out-of-sync
        const phase = index * 0.5;
        const offset = Math.sin(elapsed * frequency + phase) * amplitude;
        li.style.transform = `translateY(${offset}px)`;
      });
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);
  const { showEarthContainer, toggleEarthContainer, setShowEarthContainer } = useBackground();
  const { isAudioEnabled } = useBackground();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
      
      if (isAudioEnabled) {
        audioRef.current.play().catch((e) => console.error('Autoplay blocked:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioEnabled]);

  return (
    <LayoutProvider>
      <div
      className={styles.earthContainer}
      style={{ backgroundColor: backgroundColor(),
        display: showEarthContainer ? "flex" : "none",
       }}
    >
      <div className={styles.earth}>
        <div
          className={`${styles.horizon} ${isDaytime ? styles.day : styles.night}`}
        >
           <ul className={styles.waves} ref={ulRef}>
      {Array.from({ length: 180 }).map((_, i) => (
        <li key={i}></li>
      ))}
  
    </ul>

        </div>
        <div className='sky' />
        <div style={{zIndex: '2'}}>
          <FlyingBird frames={birdFrames} interval={250} className={styles.hawk} />
        </div>
        <div className={styles.yachtContainer}>
     
      <img 
        src="/trs.gif"
        width={50}
        alt="" 
        className={styles.yacht}
      />
    </div>
    <div className={styles.yachtContainer2}>
     
      <img 
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXp4NGJvYnFoemF0dzJkN21qdmw4bzM0NnBsd3o0MmZoY3puaWp5MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5qZZFa1hm0IJYpLGh2/giphy.gif"
        width={250}
        alt="" 
        className={styles.yacht2}
      />
    </div>
    <audio ref={audioRef} loop className='hid'>
      <source src="/ocean.mp3" type="audio/mp3" />
    </audio>
    <div className='top'> <img 
        src="/island.gif"
        width={150}
        alt="" 
      /></div>
        {/* The celestial container rotates about its bottom-center origin */}
        <div
          className={styles.celestialContainer}
          style={{ transform: `rotate(${getAngle()}deg)` }}
        >
          {/* The celestial body is offset upward (along the radius of the arc) */}
          <div
            className={styles.celestialBody}
            style={{ background: celestialColor, boxShadow: bodyShadow }}
          ></div>
        </div>
      </div>
    </div>
    </LayoutProvider>
  );
};

export default Theme;
