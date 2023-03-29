import React, { useState, useEffect } from 'react';
import ParentPage from './ParentPage';
import axios from 'axios';
import logo from '../img/logo.png';
import { useSpring, animated } from 'react-spring';
import ScrollToTopButton from './ScrollToTopButton';
import LoadingScreen from './loadingscreen'; 

function AdminEducation() {
  const [data, setData] = useState([]);
  const [fontSize, setFontSize] = useState(24);
  const [undergradSelected, setUndergradSelected] = useState(false);
  const [postgradSelected, setPostgradSelected] = useState(false);
  const [isLoading, setLoading] = useState(true); // add isLoading state variable
  const [editingIndex, setEditingIndex] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [editText, setEditText] = useState(null);

  
  useEffect(() => {
    fetch('http://unn-w20024460.newnumyspace.co.uk/tpp/education')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        if (Array.isArray(data.data)) {
          setData(data.data.map(item => item.description));
          setLoading(false);
        } else {
          console.log('Invalid data returned from API:', data);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    console.log('scrolling');
  };

  const handleEdit = (index, text) => {
    setEditText(text);
    setEditingIndex(index);
    setNewDescription(text);
  };
  

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index] = editText;

    fetch('http://unn-w20024460.newnumyspace.co.uk/tpp/editeducation?id=1&description=' + editText, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})

      .then(response => {
        if (response.ok) {
          setData(updatedData);
          setEditingIndex(null);
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEditText('');
    setEditingIndex(null);
  };
  return (
    <ParentPage>
    <div>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && data.length === 0 && <p>No data available.</p>}
      {!isLoading && data.length > 0 && (
        <ul>
          {data.map((description, index) => (
            <li key={index}>
            {editingIndex === index ? (
  <div>
    <textarea
      className="textarea"
      value={editText}
      onChange={e => setEditText(e.target.value)}
    />
    <button onClick={() => handleSave(index, data[index])}>Save</button>
    <button onClick={handleCancel}>Cancel</button>
  </div>
) : (
  <div>
    <span>{description}</span>
    <button onClick={() => handleEdit(index, description)}>Edit</button>
  </div>
)}


            </li>
          ))}
        </ul>
      )}
    </div>
    </ParentPage>
  );
}

export default AdminEducation;
