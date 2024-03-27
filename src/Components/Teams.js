import React from 'react';
import './Teams.css';
import m1 from "./img/m1.png";


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
          
          <p><h4>Guide Name</h4>
              Assistant Professor        
               Department of CSE<br></br>
            Agni College of Technology
         </p>
        </div>

        
        <div className="team-member-card">
          <img
            src={m1}
            alt="Team Member 2"
            className="team-member-image"
          />
          <p><h4>Afrin Noorjahan S</h4>        
               Department of CSE<br></br>
               Agni College of Technology
         </p>
        </div>

        
        <div className="team-member-card">
          <img
            src={m1}
            alt="Team Member 3"
            className="team-member-image"
          />
          <p><h4>Team Member 2</h4>        
               Department of CSE<br></br>
               Agni College of Technology
         </p>
        </div>

       
        <div className="team-member-card">
          <img
            src={m1}
            alt="Team Member 4"
            className="team-member-image"
          />
         <p><h4>Team Member 3</h4>        
               Department of CSE<br></br>
               Agni College of Technology
         </p>
        </div>
      </div>

      <footer className="copyright">© 2024 PK-AI-SUITE.com All rights reserved.</footer>
    </div>
  );
};



export default Teams;
