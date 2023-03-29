import React, { useState, useEffect } from 'react';
import ParentPage from './ParentPage';
import { Link } from 'react-router-dom';


const Demonstrator = (props) => {
  if (props.loading === false) {
    console.log();
  }
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    try {
      fetch('http://unn-w20015975.newnumyspace.co.uk/tpp/demonstrators_projects')
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


  return (
    <ParentPage>
      {!props.loading && (
        <div className="Demonstrators">
          <div className="title-section">
            <h2>
              {props.text.data[0]?.text && (
                <strong>
                 {props.text.data[0].text}
                </strong>
              )}
            </h2>
          </div>

          <div className="content-section">
            {props.text.data[1]?.text && <strong><p>{props.text.data[1].text}</p></strong>}

            {props.text.data[2]?.text && <p>{props.text.data[2].text}</p>}

            <ul className="bullet-list">
            
                {props.text.data[3]?.text &&   <li><p><strong>{props.text.data[3].text}</strong></p> </li>}
             

           
                {props.text.data[4]?.text &&    <li><p><strong>{props.text.data[4].text}</strong></p> </li>}
             

             
                {props.text.data[5]?.text &&  <li><p><strong>{props.text.data[5].text}</strong></p>    </li>}
          

             
                {props.text.data[6]?.text &&  <li><p><strong>{props.text.data[6].text}</strong></p>  </li>}
            

             
                {props.text.data[7]?.text && <li> <p><strong>{props.text.data[7].text}</strong></p>   </li>}
           
            </ul>
            

          </div>
          
        <strong> {props.text.data[8]?.text && <h3>{props.text.data[8].text}</h3>}</strong> 
        {props.text.data.slice(9).map((project) => (
            <div className="content-section" key={project.id}>
              <p>{project.text}</p>
            </div>
          ))}
        </div>
      )}
        {props.loading && loading && (
          <div className="Data">
          <h2> IC3 Activities</h2>
          <div className="loading">Loading...</div>
            
          </div>
        )}
        {!loading && (
       <div className="projects-container">
       {projects.map((project) => (
         <div className="project-item" key={project.id}>
           <img src={project.img} alt={project.Title} />
           <h3>{project.Title}</h3>
           <p>{project.Main_Text}</p>
         </div>
       ))}
     </div>
      )}
       
    </ParentPage>
  );
};

export default Demonstrator;
