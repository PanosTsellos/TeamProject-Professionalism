import React from 'react';
import Navbar from './NavBar';
const ParentPage = (props) => {
  return (
    <div className="ParentPage">
      <header>
        
        < Navbar/>
        <br></br>
        
      </header>


      {props.children}

      <footer>
        <p>Key Partners:</p>
        <ul>
          <li><a href="#key-partners">Partner 1</a></li>
          <li><a href="#key-partners">Partner 2</a></li>
          <li><a href="#key-partners">Partner 3</a></li>
        </ul>
        <p>Follow us on:</p>
        <ul>
          <li><a href="#linkedin">LinkedIn</a></li>
          <li><a href="#twitter">Twitter</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default ParentPage;