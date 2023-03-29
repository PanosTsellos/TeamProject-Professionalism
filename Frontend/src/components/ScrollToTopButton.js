import React, { useState, useEffect } from 'react';

function ScrollToTopButton(props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsVisible(scrollPosition > 0);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={handleClick}>
      <i className="fas fa-arrow-up"></i>
      <span>↑</span>
    </div>
  );
}

export default ScrollToTopButton;
