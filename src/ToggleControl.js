import { startOptimizedAppearAnimation } from 'framer-motion';
import React, { useState, useEffect } from 'react';

/**
 * A simple component that controls the visibility of an external element
 * by adding or removing CSS classes.
 */
export default function ToggleControl() {
  // 'useState' holds the current state (true = open, false = closed).
  const [isOpen, setIsOpen] = useState(true);

  // 'useEffect' runs after the component renders and whenever 'isOpen' changes.
  // This is where we interact with the DOM outside of our component.
  useEffect(() => {
    const panel = document.getElementById('jesse-james-react-root');
    if (!panel) return; // Safety check

    if (isOpen) {
      panel.classList.add('jj-panel-open');
      panel.classList.remove('jj-panel-closed');
    } else {
      panel.classList.remove('jj-panel-open');
      panel.classList.add('jj-panel-closed');
    }
  }, [isOpen]); // The [isOpen] dependency array ensures this code only runs when the state changes.

  const toggleStyle = {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: '.5rem',
    userSelect: 'none', // Prevents text highlighting on click
  };

  return (
    <span style={toggleStyle} onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'close' : 'open'}
    </span>
  );
}

