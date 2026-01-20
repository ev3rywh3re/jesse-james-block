import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';

// Initialize the Theatre.js studio (the visual editor)
if (process.env.NODE_ENV === 'development') {
  studio.initialize();
}

// Create a Theatre.js project and sheet
const project = getProject('Jesse James Animations');
const sheet = project.sheet('Timeline Scene');

export default function TimelineAnimation() {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    // Create a Theatre.js object with the properties you want to animate
    const boxObj = sheet.object('Fading Box', {
      x: 0,
      opacity: 0,
      scale: 1,
    });

    // Subscribe to changes from the Theatre.js timeline
    const unsubscribe = boxObj.onValuesChange((newValues) => {
      setStyles(newValues);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '1rem' }}>Timeline Animation (Theatre.js)</h3>
      <p>Click the "Timeline Scene" button in the bottom panel to start animating.</p>
      <motion.div
        animate={styles}
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#0099ff',
          borderRadius: 10,
        }}
      />
    </div>
  );
}
