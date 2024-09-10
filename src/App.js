import { Component } from '@wordpress/element'; // You might not need this for simple static text
import React, { useState, useEffect } from 'react';

function App() {
  const [figureHtml, setFigureHtml] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swampthings-local.ddev.site/wp-json/jess-block-scaffold-experiments/v1/open/29453');
      const data = await response.json();

      // Access the entire figure HTML from the JSON data
      const figure = data.image; // Assuming "image" key holds the figure element

      setFigureHtml(figure);
    };

    const intervalId = setInterval(fetchData, 12000); // Fetch every 12 seconds

    return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
  }, []);

  return (
    <div className="App">
      {figureHtml ? (
        <div dangerouslySetInnerHTML={{ __html: figureHtml }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default App;