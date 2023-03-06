import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import HomePage from './components/HomePage';
import { useLocation } from 'react-router-dom';


function App() {
  

 
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
