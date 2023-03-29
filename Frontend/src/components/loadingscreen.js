import React from 'react';
import { useSpring, animated } from 'react-spring';
import logo from '../img/logo.png';

function LoadingScreen() {
  const rotateProps = useSpring({
    from: { transform: 'rotate(0deg) scale(1)' },
    to: { transform: 'rotate(360deg) scale(1.5)' },
    config: { duration: 1000, mass: 0.5, tension: 200, friction: 10 },
    loop: true
  });

  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        <animated.img src={logo} alt="IC3 logo" className="loading-screen__logo" style={rotateProps} />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
