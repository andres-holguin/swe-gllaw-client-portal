import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ProgressBar from '../ProgressBar/ProgressBar'
import logo from '../../images/GonzaloLawLogo.png';

const NavBar = () => {
    const [progressPercent, setProgressPercent] = useState(10)

    const [bullets,setBullets] = useState([] as Element[]);
    const [previousBtn, setpreviousBtn] = useState<any>(null);
    const [nextBtn, setnextBtn] = useState<any>(null);


 
    
   
    

useEffect(() => {setpreviousBtn(document.getElementById('previousBtn'));

              
                setBullets([...document.querySelectorAll('.bullet')]);
                setnextBtn(document.getElementById('nextBtn'));
               

}, []);

               

        useEffect(() => {

            if (nextBtn && bullets.length > 0){
                nextBtn.disabled = false;
            }else if(nextBtn) nextBtn.disabled = true;
            
            if(previousBtn && currentStep === 1){
                previousBtn.disabled = true;
               }
            
            
            
        

               
   }, [bullets, nextBtn, previousBtn]);



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
       previousBtn.disabled=true;
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