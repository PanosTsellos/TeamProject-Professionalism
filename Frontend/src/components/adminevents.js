import React, { useState, useEffect, useRef } from 'react';
import ParentPage from './ParentPage';
import LoadingScreen from './loadingscreen';
import ScrollToTopButton from './ScrollToTopButton';

function Events(props) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [colors, setColors] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventText, setNewEventText] = useState("");
  const [newEventLinks, setNewEventLinks] = useState("");  
  const [addEventMessage, setAddEventMessage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://unn-w20024460.newnumyspace.co.uk/tpp/events', {
        });
        const responseData = await response.json();
        if (Array.isArray(responseData.data)) {
          setData(responseData.data);
          setLoading(false);
        } else {
          console.log('Invalid data returned from API:', responseData);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
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

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;
  
    fetch("http://unn-w20024460.newnumyspace.co.uk/tpp/delete/?id=" + id, {
            method: 'POST',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('The data cannot be fetched');
                }
                alert('The event has been deleted successfully. Please refresh the screen.');
            })
            .catch((error) => {
                console.error('Error reason:', error);
            });
    }

    //to allow one value instead of two in the db when adding an event
    

    const formRef = useRef(null);

    
    function handleAddEvent(event) {
      event.preventDefault(); // Prevent the form from submitting twice
      if (submitting) {
        return;
      }
      setSubmitting(true); // Set the flag to true to indicate that the form is being submitted
      const text = newEventText.trim();
      const links = newEventLinks.trim();
    
      if (text === "") {
        alert("Please enter the event text.");
        setSubmitting(false); // Reset the flag to false
        return;
      }
    
      if (links === "") {
        alert("Please enter the event link(s).");
        setSubmitting(false); // Reset the flag to false
        return;
      }
    
      const formattedLinks = links
        .split(",")
        .map(link => {
          if (link.trim().startsWith("http://") || link.trim().startsWith("https://")) {
            return link.trim();
          } else {
            return `http://${link.trim()}`;
          }
        })
        .join(", ");
    
      fetch(`http://unn-w20024460.newnumyspace.co.uk/tpp/addevent?text=${text}&links=${formattedLinks}`, {
        method: 'POST',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('The data cannot be fetched');
          }
          setAddEventMessage('The event has been added successfully. Please refresh the screen.');
          console.log(response);
          setNewEventText('');
          setNewEventLinks('');
          setSubmitting(false); // Reset the flag to false
        })
        .catch((error) => {
          console.error('Error reason:', error);
          setSubmitting(false); // Reset the flag to false
        });
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

        
      <div className="add-event">
        <button type="button" onClick={() => setIsAddingEvent(true)}>Add Event</button>
        {isAddingEvent &&
          <form ref={formRef} onSubmit={handleAddEvent}>
            <input type="text" placeholder="Add event text" value={newEventText} onChange={event => setNewEventText(event.target.value)} />
            <input type="text" placeholder="Add event link(s), separated by commas" value={newEventLinks} onChange={event => setNewEventLinks(event.target.value)} />
            <button type="submit" disabled={submitting}>Add Event</button>

            <button type="button" onClick={() => {setIsAddingEvent(false); setAddEventMessage(null)}}>Cancel</button>
          </form>
        }
        {addEventMessage &&
          <p>{addEventMessage}</p>
        }
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
            <button type="button" className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>

        ))}
      </div>



    </div>
    <ScrollToTopButton />
  </ParentPage>
);

  

}

export default Events;