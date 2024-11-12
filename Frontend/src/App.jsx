import React, { useState } from 'react'; // Import useState from React
import './App.css';
import Navbar from './components/shared/Navbar.Jsx'

function App() {
  const [count, setCount] = useState(0); // Initialize the count state

  return (
    <>
      
      <Navbar/>
    </>
  );
}

export default App;
