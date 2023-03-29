import ParentPage from './ParentPage';
import React, { useState } from 'react';

const AdminProjects = (props) => {
  const [projectTitles, setProjectTitles] = useState({});
  const [newProjectText, setNewProjectText] = useState('');

  const handleSelects = async (event, projectId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('text', projectTitles[projectId]);
    formData.append('id', projectId);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://unn-w20015975.newnumyspace.co.uk/tpp/updateprojectext", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Title updated');
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };

  const onTextareaChange = (event, projectId) => {
    setProjectTitles((prevState) => ({
      ...prevState,
      [projectId]: event.target.value
    }));
  };

  const handleAddProject = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('text', newProjectText);
    
    try {
      const response = await fetch("http://unn-w20015975.newnumyspace.co.uk/tpp/insertprojecttext", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setNewProjectText('');
        alert('New project added');
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };
  const onDeleteButtonClick = async (event, projectId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', projectId);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://unn-w20015975.newnumyspace.co.uk/tpp/deleteprojecttext", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Project deleted');
        // Remove the project from the state
        setProjectTitles((prevState) => {
          const newState = { ...prevState };
          delete newState[projectId];
          return newState;
        });
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [mainText, setMainText] = useState('');
  const [partners, setPartners] = useState('');
  const [img, setImg] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://unn-w20015975.newnumyspace.co.uk/tpp/insertproject', {
      method: 'POST',
      body: JSON.stringify({
        Title: title,
        Abstract: abstract,
        Main_Text: mainText,
        Partners: partners,
        img: img,
        status: status,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Success') {
          console.log('Project added successfully');
          // Clear the form after successful submission
          setTitle('');
          setAbstract('');
          setMainText(event.target.value); // <-- add the second argument
          setPartners('');
          setImg('');
          setStatus('');
        }else {
          console.log('Error adding project:', data.message);
        }
      })
      .catch(error => console.error(error));
  }
  return (
    <ParentPage>
      {!props.loading && props.text && (
        <div className='Project_Text'>
          {props.text.data.map((project) => (
            <div key={project.id}>
              <textarea
                value={projectTitles[project.id] ?? project.text}
                onChange={(event) => onTextareaChange(event, project.id)}
                className="growInput"
                rows="10"
                cols="50"
              />
              <button onClick={(event) => handleSelects(event, project.id)}>Change</button>
              <button onClick={(event) => onDeleteButtonClick(event, project.id)}>Delete</button>
            </div>
          ))}
          <div>
            <textarea
              value={newProjectText}
              onChange={(event) => setNewProjectText(event.target.value)}
              className="growInput"
              rows="10"
              cols="50"
            />
            <button onClick={handleAddProject}>Add</button>
          </div>
          <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
      </label>
      <label>
        Abstract:
        <input type="text" value={abstract} onChange={event => setAbstract(event.target.value)} />
      </label>
      <label>
        Main Text:
        <textarea value={mainText} onChange={event => setMainText(event.target.value)} />
      </label>
      <label>
        Partners:
        <input type="text" value={partners} onChange={event => setPartners(event.target.value)} />
      </label>
      <label>
        Image:
        <input type="text" value={img} onChange={event => setImg(event.target.value)} />
      </label>
      <label>
        Status:
        <input type="text" value={status} onChange={event => setStatus(event.target.value)} />
      </label>
      <button type="submit">Add Project</button>
    </form>
        </div>
        
      )}
    </ParentPage>
  );
};

export default AdminProjects;
