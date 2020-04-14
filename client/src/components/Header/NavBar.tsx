import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ProgressBar from '../ProgressBar/ProgressBar'
import logo from '../../images/GonzaloLawLogo.png';






const NavBar = () => {
    const [progressPercent, setProgressPercent] = useState(10)

    let previousBtn; 
    let nextBtn; 
    let content; 
    let bullets; 

useEffect(() => {previousBtn= document.getElementById('previousBtn');

                nextBtn = document.getElementById('nextBtn');
                content  = document.getElementById('content');
                bullets  = [...document.querySelectorAll('.bullet')];
                if(currentStep === 1){
                    previousBtn.disabled = true;
                   }


            }, []);



const MAX_STEPS = 7;
let currentStep = 1;

       const next = () => {
        
    const currentBullet = bullets[currentStep - 1];
    console.log("Here");
    currentBullet.classList.add('completed');
    
    currentStep++;
    previousBtn.disabled = false;
    if(currentStep === MAX_STEPS){
        currentBullet.classList.remove('completed');
        currentBullet.classList.add('finalstep');
        nextBtn.disabled = true;
    }


       }

      const prev = () => {
   const previousBullet = bullets[currentStep - 2];
   previousBullet.classList.remove('finalstep');
   previousBullet.classList.remove('completed');
   currentStep--;
   console.log(currentStep);
   nextBtn.disabled = false;
   if(currentStep === 1){
    previousBtn.disabled = true;
   }
   



}






    return (
        <div>
            <div className = "header">
                <Link className = "nav-title" to="/">
                    <img className = "nav-logo" src={logo} alt="Gonzalo Law Logo" />
                </Link>
                <div className = "nav-items">
                    <Link className = "nav-link" to='/Calendar'>Calendar</Link>
                    <Link className = "nav-link" to='/Documents'>Documents</Link>
                    <Link className = "nav-link" to='/Selector'>Switch Project</Link>
                    <Link className = "nav-link" to='/Account'>Account</Link>
                </div>
            </div>
            <div className='progressBar'>

                <div id="stepProgressBar">
                    <div className="step">
                        <h6 className="step-text"> IP </h6>
                        <div className="bullet" id = "1"> 1 </div>
                        
                    </div>

                    <div className="step">
                        <h6 className="step-text"> Initial Intake </h6>
                        <div className="bullet"> 2 </div>
                    </div>
                    <div className="step">
                        <h6 className="step-text">Initial Search</h6>
                        <div className="bullet">3</div>
                    </div>
                    <div className="step">
                        <h6 className="step-text">Initial Filing</h6>
                        <div className="bullet">4</div>
                    </div>
                    <div className="step">
                        <h6 className="step-text">Client Follow Up</h6>
                        <div className="bullet">5</div>
                    </div>
                    <div className="step">
                        <h6 className="step-text">Final Outcome</h6>
                        <div className="bullet">6</div>
                    </div>

                    <div id="main">
                    
                        <button id="previousBtn" onClick = {prev} >Previous</button>
                        <button id="nextBtn" onClick = {next} >Next</button>
                       

                    </div>




                </div>


                

            </div>
        </div>
    )
};

export default NavBar;
