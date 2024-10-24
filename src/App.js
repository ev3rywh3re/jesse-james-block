import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [figureHtml, setFigureHtml] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/wp-json/jess-block-scaffold-experiments/v1/open/29453`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setFigureHtml(prevFigure => {
        // Only update if the new image is different
        if (data.image !== prevFigure) {
          return data.image;
        }
        return prevFigure;
      });
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for subsequent fetches
    const intervalId = setInterval(fetchData, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return (
    <div className="App">
      {isLoading && !figureHtml && <p>Loading image...</p>}
      {error && <div>Error: {error}</div>}
      {figureHtml && (
        <div dangerouslySetInnerHTML={{ __html: figureHtml }} />
      )}
    </div>
  );
}

export default App;