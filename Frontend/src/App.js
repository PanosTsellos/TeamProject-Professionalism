import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Activities from './components/Activities';
import Events from './components/events';
import HomePage from './components/HomePage';
import AdminEvents from './components/adminevents';
import { useLocation } from 'react-router-dom';
import ContactUs from './components/contactus';
import Education from './components/education';
import AdminEducation from './components/admineducation';


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


  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/adminevents" element={<AdminEvents />}/>
        <Route path="/admineducation" element={<AdminEducation />}/>
        <Route path="/activities" element={<Activities text={text} loading={isLoading}/>}/>
        <Route path="/events" element={<Events />}/>
        <Route path="/education" element={<Education />}/>
        <Route path="/contactus" element={<ContactUs />}/>
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
