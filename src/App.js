import { Component } from '@wordpress/element'; 
import React, { useState, useEffect } from 'react';

function App() {
  const [figureHtml, setFigureHtml] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Dynamically get the origin (protocol, domain, port) of the current page
      const baseUrl = window.location.origin; 

      // Construct the full API URL using the base URL
      const apiUrl = `${baseUrl}/wp-json/jess-block-scaffold-experiments/v1/open/29453`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      const figure = data.image; 

      setFigureHtml(figure);
    };

    const intervalId = setInterval(fetchData, 12000); 

    return () => clearInterval(intervalId); 
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
