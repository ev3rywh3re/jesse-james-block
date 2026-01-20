import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function InteractiveAnimation() {
  // For the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation values
  const rotateX = useTransform(y, [-150, 150], [15, -15]); // Invert for natural feel
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Center the mouse position relative to the element
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    // Reset position on leave
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px', marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Interactive Animations (Framer Motion)</h3>
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
        
        {/* Click Animation */}
        <div>
          <p>Click me!</p>
          <motion.div
            whileTap={{ scale: 0.85, rotate: -15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#ff0055',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Tilt Animation */}
        <div>
          <p>Hover and move mouse!</p>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: 300,
              height: 200,
              display: 'flex',
              placeItems: 'center',
              placeContent: 'center',
              borderRadius: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              perspective: 400, // This is key for the 3D tilt effect
            }}
          >
            <motion.div
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                backgroundColor: '#9d65f7',
                rotateX, // Apply the transformed rotation
                rotateY, // Apply the transformed rotation
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
