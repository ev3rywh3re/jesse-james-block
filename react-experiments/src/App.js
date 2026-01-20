import React from 'react';
import TimelineAnimation from './animations/TimelineAnimation';
import InteractiveAnimation from './animations/InteractiveAnimation';

export default function App() {
  // Basic styling for the container
  const appStyles = {
    fontFamily: 'sans-serif',
    color: '#eee',
    backgroundColor: '#111',
    padding: '2rem',
    maxWidth: '800px',
    margin: '2rem auto',
    borderRadius: '12px'
  };

  return (
    <div style={appStyles}>
      <h1>Animation Testing Ground</h1>
      <TimelineAnimation />
      <InteractiveAnimation />
    </div>
  );
}
