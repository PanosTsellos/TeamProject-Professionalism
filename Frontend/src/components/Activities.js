import React from 'react';
import ParentPage from './ParentPage';

const HomePage = (props) => {
  if(props.loading===false)
  console.log();
  
return (
  <ParentPage>
{!props.loading && (
          <div className="Data">
          <h2> IC3 Activities</h2>
          <strong><p>{props.text.data[0].text}</p></strong>
          <p>{props.text.data[1].text}</p>
          <button ><strong>CONTACT US</strong><br></br> Get Involved with IC3-</button>


          <strong><h3>Research, Innovation, Education, and Skills / Discover More</h3></strong>
<div class = "grid-container">
        <div class="grid-item">
          <button type = "button" id = "b1" class = "small_btn"><strong>DEMONSTRATORS.</strong><p>Demonstrator projects co-designed, delivered and evaluated by industry, academia
            and public sector partners. Find out More -</p></button>
        </div>
        <div class="grid-item">
          <button type = "button" id = "b2" class = "small_btn"><strong>RESEARCH THEMES AND PROJECTS.</strong><p>Reflecting the most pressing issues faced by the sector. Find out more -</p></button>
        </div>
        <div class="grid-item">
          <button type = "button" id = "b3" class = "small_btn"><strong>EDUCATION AND SKILLS .</strong><p> Revitalising the education agenda
            for construction. Find out more -</p></button>
        </div>
        <div class="grid-item">
          <button type = "button" id = "b4" class = "small_btn"><strong>INNOVATION VOUCHERS.</strong><p>An opportunity for funded collaboration
            with our IC3 Partners. Find out more -</p></button>
        </div>
        <div class="grid-item b5">
          <button type = "button" id = "b5" class = "big_btn"><strong>Contact Us.</strong><p>Collaborate with us and help us to shape
            the future of IC3. Find out More -</p></button>
        </div>
      </div>
</div>

            
        
        )}
        {props.loading && (
          <div className="Data">
          <h2> IC3 Activities</h2>
          <strong><p>Data Loading...</p></strong>
            
          </div>
        )}
</ParentPage>
);
};

export default HomePage;