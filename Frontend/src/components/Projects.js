import React, { useState, useEffect } from 'react';
import ParentPage from './ParentPage';
import { Link } from 'react-router-dom';

const Projects = (props) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [notCompletedProjects, setNotCompletedProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(8);

  
  useEffect(() => {
    try {
      fetch('http://unn-w20015975.newnumyspace.co.uk/tpp/projects')
        .then(response => response.json())
        .then(data => {
          setProjects(data.data);
          setLoading(false);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const completed = projects.filter(project => project.status === 'completed');
      const notCompleted = projects.filter(project => project.status === 'not_completed');
      setCompletedProjects(completed);
      setNotCompletedProjects(notCompleted);
    } catch (error) {
      console.error('Error filtering projects:', error);
    }
  }, [projects]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setSorting('');
  };

  const handleSorting = (e) => {
    setSorting(e.target.value);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  let filteredProjects = projects;

  try {
    filteredProjects = filter === 'completed' ? completedProjects : filter === 'not_completed' ? notCompletedProjects : projects;
  } catch (error) {
    console.error('Error filtering projects:', error);
  }

  const searchedProjects = filteredProjects.filter(project => project.Title.toLowerCase().includes(searchTerm.toLowerCase()));


  const sortedProjects = searchedProjects.sort((a, b) => {
    if (sorting === 'a-z') {
      return a.Title.localeCompare(b.Title);
    } else if (sorting === 'z-a') {
      return b.Title.localeCompare(a.Title);
    } else if (sorting === 'completed') {
      return a.status === 'completed' ? -1 : 1;
    } else if (sorting === 'not_completed') {
      return a.status === 'not_completed' ? -1 : 1;
    } else {
      return 0;
    }
  });

  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ParentPage>
     
      {!props.loading && props.text && (
  <div className='Project_Text'>
    <h2>Research Themes and Projects</h2>
    {props.text.data[0]?.text && (
      <strong><h3>{props.text.data[0].text}</h3></strong>
    )}
    {props.text.data[1]?.text && (
      <p>{props.text.data[1].text}</p>
    )}

     {props.text.data[2]?.text && (
      <li>{props.text.data[2].text}</li>
    )}
     {props.text.data[3]?.text && (
      <li>{props.text.data[3].text}</li>
    )}
     {props.text.data[4]?.text && (
      <li>{props.text.data[4].text}</li>
    )}
     

   
      {props.text.data.slice(5).map((project) => (
            <div key={project.id}>
              <p>{project.text}</p>
            </div>
          ))}
  </div>
)}
         
      {!loading && (
        
        <div className="Projects">
          
          <h2 className="title">Projects</h2>
          <div className="filter-bar">
            <p>Filters</p>
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            <select value={filter} onChange={handleFilter}>
              <option value="">All</option>
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="not_completed">Active Projects</option>
            </select>
           
</div>

<div className="filter-bar" >
<label >Sort</label>




<select value={sorting} onChange={handleSorting}>

<option value="">Default</option>
<option value="a-z">A-Z</option>
<option value="z-a">Z-A</option>
<option value="completed">Completed</option>
<option value="not_completed">Active Projects</option>

</select>

</div>
<div className="project-list">
        {currentProjects.map((project) => (
          <div
            className={`project-item ${
              project.status === "completed" ? "completed" : "not_completed"
            }`}
            key={project.id}
          >
           
            <div className="project-details">
            <Link to={`/showproject/${project.id}`} style={{ textDecoration: 'none' }}>
            <img src={project.img} alt={project.Title} />
            <h3>{project.Title}</h3>
            </Link>

             
              <p>{project.abstract}</p>
              <p>{project.Partners}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <ul>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className={pageNumber === currentPage ? "active" : null}
              >
                <button onClick={() => paginate(pageNumber)}>
                  {pageNumber}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )}
  {loading && (
    <div className="Data">
      <div className="loading">Loading...</div>
    </div>
  )}
</ParentPage>
);
};

export default Projects;