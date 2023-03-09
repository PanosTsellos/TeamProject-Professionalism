import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
const ParentPage = (props) => {
  return (
    <div className="ParentPage">
      <header>
        
        < Navbar/>
   
        
      </header>


      {props.children}

      <Footer/>
    </div>
    
  );
};

export default ParentPage;