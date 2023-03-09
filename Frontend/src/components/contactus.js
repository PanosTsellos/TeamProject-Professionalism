import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import ParentPage from './ParentPage';
const Result =() =>{
    return(
        <p>Your message has been successfully sent. We will contact you as soon as possible</p>
    )
}
function ContactUs(props) {
 
  //contact page of this web application
  const [result, showResult] = useState(false);
  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_k0jmajo', 'template_c3kkppf', e.target, '5FOXohnZXJL0VuF-1')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      }
      );
      e.target.reset();
      showResult(true);
  };
    return (
        <ParentPage>
        <div class="contactme" id="contact">
      <div class="contactOverlay">
        <div class="container">
          <div class="form">
            <form action="" onSubmit={sendEmail}>
              <div class="formWord">
                <h2>Contact Us</h2>
                <span>Full Name</span>
                <br />
                <input class="input100" type="text" name="fullName" required />
                <br />
                <span>Phone Number</span>
                <br />
                <input class="input100" type="text" name="phone" required />
                <br />
                <span>Email</span>
                <br />
                <input class="input100" type="text" name="email" required />
                <br />
              </div>
              <div class="formWord">
                <span>Message</span>
                <br />
                <textarea name="message" required></textarea>
                <br />
                <button>SUBMIT</button>

                <div class="row">{result ? <Result /> : null} </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </ParentPage>
    );
   
}
 
export default ContactUs;