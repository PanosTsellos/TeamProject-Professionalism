import React, { useState, useEffect } from 'react';
import ParentPage from './ParentPage';
import axios from 'axios';
import LoadingScreen from './loadingscreen'; 
import ScrollToTopButton from './ScrollToTopButton';


function Events(props) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [colors, setColors] = useState([]);
  const [isLoading, setLoading] = useState(true); // add isLoading state variable
  const [images, setImages] = useState([]);



  useEffect(() => {
    axios.get('http://unn-w20024460.newnumyspace.co.uk/tpp/events').then(response => {
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
        setLoading(false);

      } else {
        console.log('Invalid data returned from API:', response.data);
      }
    }).catch(error => {
      console.log(error);
      setLoading(false);

    });
  }, []);

  function generateImageArray() {
    return [ 'https://images.pexels.com/photos/1585221/pexels-photo-1585221.jpeg?auto=compress&cs=tinysrgb&w=300',  ];
  }
  
  useEffect(() => {
    const images = [];
    const imageArray = generateImageArray();
    for (let i = 0; i < data.length; i++) {
      images.push(imageArray[i % imageArray.length]);
    }
    setImages(images);
  }, [data]);
  

  const filteredData = data.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()));

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

      <div className="Data">
        <h2> IC3 Events</h2>
          <p><strong>
            Connect with us at regional, national, international and online events.
            </strong></p>
          <p><strong>
            Upcoming regional, national, international and virtual events can be found by clicking the name of any events listed below.
            </strong></p>
          <p><strong>
            If no relevant IC3 events are advertised at the time of viewing then please fill out our contact form so we can inform you of any upcoming events that may be of interest to you.
            </strong></p>
            
            <p>If you have any question you can always contact us and we will get back at you!</p>
            
            <strong>Search a specific event here!</strong>  
        <div className="search-bar">
          <input type="text" placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        </div>  
                
       <div className="grid-container">
        {filteredData.map((item, index) => (
          <div className="grid-item" key={item.id} style={{backgroundColor: colors[index]}}>
            <img src={generateImageArray()} alt="event" />
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
      <ScrollToTopButton />
    </ParentPage>
  );
}

export default Events;
