import React, { useState, useEffect } from 'react';
import ParentPage from './ParentPage';
import axios from 'axios';
import logo from '../img/logo.png';
import { useSpring, animated } from 'react-spring';
import ScrollToTopButton from './ScrollToTopButton';
import LoadingScreen from './loadingscreen'; 

function Education() {
  const [data, setData] = useState([]);
  const [fontSize, setFontSize] = useState(24);
  const [undergradSelected, setUndergradSelected] = useState(false);
  const [postgradSelected, setPostgradSelected] = useState(false);
  const [isLoading, setLoading] = useState(true); // add isLoading state variable

  
  useEffect(() => {
    axios.get('http://unn-w20024460.newnumyspace.co.uk/tpp/education').then(response => {
      if (Array.isArray(response.data.data)) {
        setData(response.data.data.map(item => item.description));
        setLoading(false);

      } else {
        console.log('Invalid data returned from API:', response.data);
      }
    }).catch(error => {
      console.log(error);
      setLoading(false);

    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
    delay: 700
  });

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const newFontSize = 12 - (scrollPosition / 100);
    setFontSize(newFontSize < 25 ? 25 : newFontSize);
  };
  if (isLoading) {
    return (
      <div className="loading-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <ParentPage>
         {isLoading ? <LoadingScreen /> : null} {/* render the LoadingScreen component if isLoading is true */}
      <div className="education">
          <h1 className="education__title">IC3 Education</h1>
          <img src={logo} alt="IC3 logo" className="education__logo"/>
          {data.map((description, index) => (
            <animated.div key={index} className="education__paragraph animated" style={{ ...fadeProps }}>
              <p className="animate-text" style={{ fontSize: `${fontSize}px` }}>{description}</p>
              
            </animated.div>
          ))}
          <div className="dropdown">
  <button className="dropdown__button" onClick={() => setUndergradSelected(!undergradSelected)}>Undergraduate Programmes</button>
  {undergradSelected && (
    <ul className="dropdown__list">
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/architecture-and-built-environment-foundation-year-uusabe1">Architecture and Built Environment Foundation Year</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/architecture-ba-hons-uufahe1">BA (Hons) Architecture</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/building-surveying-bsc-ft-uusbdv1">BSc (Hons) Building Surveying</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/quantity-surveying-bsc-ft-uusqts1">BSc (Hons) Quantity Surveying</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/real-estate-bsc-ft-uusrez1">BSc (Hons) Real Estate</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/civil-engineering-bsc-ft-uuscev1">BSc (Hons) Civil Engineering</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/computer-science-bsc-ft-uuscsf1">BSc (Hons) Computer Science</a></li>
    </ul>
  )}

<div className="dropdown">
  <button className="dropdown__button" onClick={() => setPostgradSelected(!postgradSelected)}>Postgraduate Programmes</button>
  {postgradSelected && (
    <ul className="dropdown__list">
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/architecture-march-ft-dufaht1">MArch Architecture</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/msc-surveying-real-estate-distance-learning-dtdpsf6">MSc Surveying</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/msc-cyber-security-distance-learning-dtfpsv6">MSc Cyber Security</a></li>
      <li><a href="https://www.northumbria.ac.uk//study-at-northumbria/courses/msc-computer-science-ft-uuscsf1">MSc Computer Science</a></li>
    </ul>
  )}
</div>
        </div>
      </div>
      <ScrollToTopButton />
    </ParentPage>
  );
}

export default Education;
