import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Activities from './components/Activities';
import Events from './components/events';
import HomePage from './components/HomePage';
import { useLocation } from 'react-router-dom';
import ContactUs from './components/contactus';


function App() {
  const [text, setText] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  setIsLoading(true);
  fetch('http://unn-w20015975.newnumyspace.co.uk/tpp/activities')
    .then((response) => response.json())
    .then((data) => {
      setText(data);
      setIsLoading(false);
    })
    .catch((error) => console.error(error));
}, []);

const [Eventtext, setEventText] = useState([]);
const [isEventLoading, setEventIsLoading] = useState(true);

useEffect(() => {
  setEventIsLoading(true);
  fetch('http://unn-w20024460.newnumyspace.co.uk/tpp/events')
    .then((response) => response.json())
    .then((data) => {
      setEventText(data);
      setEventIsLoading(false);
    })
    .catch((error) => console.error(error));
}, []);
 
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/activities" element={<Activities text={text} loading={isLoading}/>}/>
        <Route path="/events" element={<Events text={text} loading={isEventLoading}/>}/>
        <Route path="/contactus" element={<ContactUs />}/>
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
