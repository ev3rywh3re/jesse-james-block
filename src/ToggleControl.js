import React, { useState, useEffect, useRef } from 'react';
import { motion as fm, AnimatePresence } from 'framer-motion';
// We don't need Motion One or Theatre.js for this specific class-based example,
// but we'll keep the structure.
import { animate } from 'motion';
import RollingBoxAnimation from './RollingBoxAnimation';

// --- THE REACT COMPONENT ---

const ToggleControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '.2rem', fontFamily: 'sans-serif' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          marginBottom: '.5rem',
          padding: '.2em .5em',
          fontSize: '1.2em',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '4em',
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </div>

      <AnimatePresence>
        {isOpen && <AnimationSandbox />}
      </AnimatePresence>
    </div>
  );
};

// --- The Animation Sandbox Component ---
const AnimationSandbox = () => {
  // State for the standard CSS transition example
  const [isCssBoxVisible, setCssBoxVisible] = useState(false);

  // This effect will trigger the animation for the standard CSS box.
  // We need a slight delay to ensure the browser registers the initial state
  // before applying the 'visible' class, which triggers the transition.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCssBoxVisible(true);
    }, 100); // A tiny delay is often sufficient

    return () => clearTimeout(timer); // Cleanup the timer
  }, []); // Runs only once when the component mounts

  return (
    <div>
      <h2>Animation Sandbox</h2>

      {/* Standard CSS Transition Box */}


      {/* Framer Motion Rolling Box Animation */}
      <RollingBoxAnimation isAnimating={true} />
    </div> 
  );
};

export default ToggleControl;


/* Testing workspace for App.js */