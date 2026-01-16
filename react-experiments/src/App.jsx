import { animate } from "motion"
import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      animate(
        boxRef.current,
        {
          x: [0, 200, 0],
          rotate: [0, 180, 0]
        },
        {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      );
    }
  }, []); // Run once on mount

  return (
    <>
      <h2>React App Loaded!</h2>
      <p>This is a simple animation using Motion One.</p>
      <div ref={boxRef} className="box"></div>
    </>
  )
}

export default App
