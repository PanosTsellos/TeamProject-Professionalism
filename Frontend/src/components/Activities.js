import React from 'react';
import ParentPage from './ParentPage';
import { Link } from 'react-router-dom';
import ic3Image from './ic3.jpg';
import ic3Image2 from './ic3_2.jpg';
import ic3Image3 from './ic3_3.jpg';
import ic3Image4 from './ic3_4.jpg';
import ic3Image5 from './ic3partners.png';
const HomePage = (props) => {
  if(props.loading===false)
  console.log();
  
return (
  <ParentPage>
{!props.loading &&  props.text && (
          <div className="Data">
              <h2> IC3 Activities</h2>
            <img src={ic3Image} className="logo" alt="logo" />
            {props.text.data[0]?.text && (
      <strong><p>{props.text.data[0].text}</p></strong>
    )}
     {props.text.data[1]?.text && (
      <p>{props.text.data[1].text}</p>
    )}
          
         
          <Link to="/contactus">
            
          <button> <strong>CONTACT US</strong><br></br> Get Involved with IC3-</button>
          </Link>


          <strong><h3>Research, Innovation, Education, and Skills / Discover More</h3></strong>
<div className = "grid-container">
        <div className="grid-item">
        <Link to="/demonstrators">
          <button type = "button" id = "b1" className = "small_btn"><img src={ic3Image} className="App-logo" alt="logo" />
            <strong>DEMONSTRATORS.</strong><p>Demonstrator projects co-designed, delivered and evaluated by industry, academia
            and public sector partners. Find out More -</p></button>
            </Link>
        </div>
        
        <div className="grid-item">
        <Link to="/projects">
          <button type = "button" id = "b2" className = "small_btn"><img src={ic3Image2} className="App-logo" alt="logo" /><strong>RESEARCH THEMES AND PROJECTS.
            </strong><p>Reflecting the most pressing issues faced by the sector. Find out more -</p></button>
            </Link>
        </div>
        <div className="grid-item">
          <button type = "button" id = "b3" className = "small_btn"><img src={ic3Image3} className="App-logo" alt="logo" /><strong>EDUCATION AND SKILLS .</strong><p> Revitalising the education agenda
            for construction. Find out more -</p></button>
        </div>
        <div className="grid-item">
          <button type = "button" id = "b4" className = "small_btn"><img src={ic3Image5} className="App-logo" alt="logo" />
            <strong>INNOVATION VOUCHERS.</strong><p>An opportunity for funded collaboration
            with our IC3 Partners. Find out more -</p></button>
        </div>
        <div className="grid-item b5">
        <Link to="/contactus">
        <button type="button" id="b5" className="big_btn">
        <img src={ic3Image4} className="App-logo" alt="logo" />
    <strong>Contact Us.</strong>
    <p>Collaborate with us and help us shape the future of IC3. Find out More -</p>
  
</button>
</Link>

        </div>
      </div>
</div>

            
        
        )}
        {props.loading && (
          <div className="Data">
          <h2> IC3 Activities</h2>
          <div className="loading">Loading...</div>
            
          </div>
        )}
</ParentPage>
);
};

export default HomePage;