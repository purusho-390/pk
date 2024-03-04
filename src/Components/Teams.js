import React from 'react';
import './Teams.css';
import m1 from "./img/m1.png";
import m2 from "./img/m2.png";
import m3 from "./img/m3.png";
import m4 from "./img/m4.png";




function Teams(){
  return (
    <div className="teams-container">
      <h2>About Us</h2>
      <p className="description">
      This study proposes a novel approach for sleep apnea detection in medical healthcare using deep learning techniques.
      Leveraging neural networks, the model demonstrates high accuracy in identifying sleep apnea events, offering a promising solution for non-invasive and automated diagnostic applications in sleep medicine.
      </p>
     <br></br>
      <div className="image-cards">
      
        <div className="team-member-card">
          <img
            src={m1}
            alt="Team Member 1"
            className="team-member-image"
          />
          
          <p><h4>BENAZIR BEGAM R M.E [P.hD]</h4>     
              Assistant Professor(SG) 
               Department of ECE
          Rajalakshmi Engineering College
         </p>
        </div>

        
        <div className="team-member-card">
          <img
            src={m2}
            alt="Team Member 2"
            className="team-member-image"
          />
          <p><h4>MALAVIKA R</h4>        
               Department of ECE
          Rajalakshmi Engineering College
         </p>
        </div>

        
        <div className="team-member-card">
          <img
            src={m3}
            alt="Team Member 3"
            className="team-member-image"
          />
          <p><h4>MUGIL KUMAR P</h4>        
               Department of ECE
          Rajalakshmi Engineering College
         </p>
        </div>

       
        <div className="team-member-card">
          <img
            src={m4}
            alt="Team Member 4"
            className="team-member-image"
          />
         <p><h4>PEARLY SHARON P</h4>        
               Department of ECE
          Rajalakshmi Engineering College
         </p>
        </div>
      </div>

      <footer className="copyright">© 2024 SADDL.com. All rights reserved.</footer>
    </div>
  );
};



export default Teams;
