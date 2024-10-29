import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchImage, startTransition, endTransition } from './features/imageSlice';

function App() {
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

export default App;
