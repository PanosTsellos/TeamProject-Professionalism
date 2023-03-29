import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParentPage from './ParentPage';

function ShowProject() {
  const { ids } = useParams();
  const [message, setMessage] = useState('');
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://unn-w20015975.newnumyspace.co.uk/tpp/projects?id=${ids}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        return response.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error('No such project exists');
        }
        setProject(data.data[0]);
     
      })
      .catch((error) => {
        console.error(error);
        setMessage('No such project exists');
      });
  }, [ids]);

  if (!project) {
    return (
      <div>
        {message ? (
          <ParentPage>
            <div className="message">
              <h2>{message}</h2>
            </div>
          </ParentPage>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }

  return (
    <ParentPage>
     
      <div className="showcase-container">
    
     
    <div class="projectrow">
        <div class="imgWrapper">
        <img src={project.img} alt={project.Title}/>
        </div>
        <div class="contentWrapper">
            <div class="content">
                <span class="textWrapper">
                    <span></span>IC3 Project
                </span>
                <h2>{project.Title}</h2>
                <p><strong>Abstract:</strong>{project.Abstract}Equipment on construction sites, particularly heavy earth-moving equipment such as excavators, bulldozers and trucks, represent a major cost element in construction projects ranging from 10% in a commercial project up to 50% in major infrastructure projects such as highways, rail lines and energy projects. They are also a critical resource that is often involved in project delays, and a major contributor to on/offsite congestion and air pollution (for example, they contribute up to 7% of London's NOx emissions).

With £600 billion of public and private infrastructure investment planned over the next 10 years (TIP, 2017), there is a significant opportunity to address this productivity issue and develop an internationally leading UK-based solutions. The project, co-funded by Innovate UK, aims to develop and test of its AI-driven and real-time command and control centre for site equipment in infrastructure projects. The project will effectively develop a commercially ready digital twin with IoT technologies for tracking and sensing equipment, machine learning for estimating equipment productivity and informing planning, and dashboarding technologies for visualising site operation in real time thus, giving contractors new capabilities to control sites and improve their performance.</p>
                <p><strong>Main:</strong>{project.Main_Text} <br></br> <br></br>
                With £600 billion of public and private infrastructure investment planned over the next 10 years (TIP, 2017), there is a significant opportunity to address this productivity issue and develop an internationally leading UK-based solutions. The project, co-funded by Innovate UK, aims to develop and test of its AI-driven and real-time command and control centre for site equipment in infrastructure projects. The project will effectively develop a commercially ready digital twin with IoT technologies for tracking and sensing equipment, machine learning for estimating equipment productivity and informing planning, and dashboarding technologies for visualising site operation in real time thus, giving contractors new capabilities to control sites and improve their performance.</p>
                <p><strong>Partners:</strong>{project.Partners}</p>
            
               
            </div>
        </div>
    </div>

      </div>
    </ParentPage>
  );
}

export default ShowProject;
