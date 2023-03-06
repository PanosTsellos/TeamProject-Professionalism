import React from 'react';

const ParentPage = (props) => {
  return (
    <div className="ParentPage">
      <header>
        <h1>International Centre for Connected Construction (IC3)</h1>
        <br></br>
        <p>A centre of excellence for innovation in the global construction sector.</p>
        <nav>
          <ul>
            <li><a href="#activities">Activities</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
       
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
