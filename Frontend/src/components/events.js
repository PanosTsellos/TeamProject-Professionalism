import React, { useState, useEffect } from 'react';
import ParentPage from './ParentPage';
import axios from 'axios';

function Events(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://unn-w20024460.newnumyspace.co.uk/tpp/events').then(response => {
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.log('Invalid data returned from API:', response.data);
      }
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <ParentPage>
      <div className="Data">
        <h2> IC3 Events</h2>
    
     
        <button><strong>CONTACT US</strong><br />Get Involved with IC3-</button>
        <div className="grid-container">
          {data.map(item => (
            <div className="grid-item" key={item.id}>
              <p>{item.text}</p>
              {item.links ? (
                item.links.split(",").map((link, index) => (
                  <a href={link} key={index}>
                    <button type="button" id={`b${item.id}-${index}`} className="small_btn">
                      <strong>{`Click here for more information! `}</strong>
                    </button>
                  </a>
                ))
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </ParentPage>
  );
}

export default Events;
