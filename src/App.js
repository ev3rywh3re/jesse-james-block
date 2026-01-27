import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchImage, startTransition, endTransition } from './features/imageSlice';
import TimelineAnimation from './animations/TimelineAnimation';
import InteractiveAnimation from './animations/InteractiveAnimation';
import ToggleControl from './ToggleControl';
import { animate } from "motion";

animate("h1", { opacity: [0, 1] }, { duration: 4 });
// Add more of your animation code here

function App() {

    // Basic styling for the container
  const appStyles = {
    fontFamily: 'sans-serif',
    color: '#eee',
    backgroundColor: '#111',
    padding: '.5rem',
    maxWidth: '400px',
    margin: '.5rem auto',
    borderRadius: '.3rem'
  };

  const dispatch = useDispatch();
  const { data: figureHtml, isLoading, error, isTransitioning } = useSelector(
    (state) => state.image
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startTransition());
      await dispatch(fetchImage());
      dispatch(endTransition());
    };

    // Initial fetch
    fetchData();

    // Set up interval
    const intervalId = setInterval(fetchData, 4000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading && !figureHtml && <p>Loading image...</p>}
      {error && <div>Error: {error}</div>}
      <AnimatePresence mode="wait">
        {figureHtml && (
          <motion.div
            key={figureHtml} // This ensures a new animation when the content changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{ __html: figureHtml }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const container = document.getElementById('jesse-james-toggle-root');

// Create a root
const root = ReactDOM.createRoot(container);

// Render the component to the root
root.render(<ToggleControl />);

export default App;
