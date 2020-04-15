import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { MdSend } from 'react-icons/md';
import { isPropsEqual } from '@fullcalendar/core';
import './Login.css'
import { syncBuiltinESMExports } from 'module';

const axios = require("axios");
interface user {
    username: string,
    password: string,
}
const Login = (props) => {
    const [useDeat, setUseDeat] = useState({ 
        username: "",
        password: "",
    });

    const history = useHistory();

    const handleChange = (event) => {
        setUseDeat({...useDeat, 
                   [event.target.name]: event.target.value})
        console.log(useDeat[event.target.name]);
    }
    const sendLoginRequest = async () => {
         props.userHasAuthenticated(true); // TEMP - take out when done doing stuff
        await axios.post('/api/user/login', {
                username: useDeat.username,
                password: useDeat.password
            }).then(res => {
                console.log(res.data.accessToken);
                console.log(res.data);

                if (res.data.accessToken != undefined) {
                    props.userHasAuthenticated(true);
                } else {
                    console.log("Password incorrect");
                }
            });
    };

    const redirect = () => {
        history.push('/Calendar')
    }


    let x;
    let y;
    let z;
    let p;
    let r;
    let Lbutton;
    let Rbutton;

    useEffect(() => {x = document.getElementById("loginpage");
    y = document.getElementById("registerpage");
    z = document.getElementById("btn");
    p = document.getElementById("passwordpage");
    Lbutton = document.getElementById("Lbutton");
    Rbutton = document.getElementById("Rbutton");

},[]);
   


              
     
    const registerpage = () => {
         x.style.left = "-400px";
         y.style.left = "50px";
         z.style.left = "110px"; 
     }

    const loginpage = () => {
         x.style.left = "50px";
         y.style.left = "450px";
         z.style.left = "0"; 
     }

     const passpage = () => {
         x.style.left = "-400px";
         p.style.left = "50px";
         Rbutton.disabled = true;
         Lbutton.disabled = true;
         


     }
     
                




    return (
        <div className='login'>

            
              
         
            <div className='logo'>

            <img src = "https://www.gonzalolaw.com/wp-content/uploads/2019/01/GonzaloLawLogo.png" />

            </div> 
            
            
                <div className = "form-box">
                     <div className = "button-box">
                         <div id = "btn"></div>
                        <button id = "Lbutton" onClick= {loginpage}>Login</button>
                        <button id = "Rbutton" onClick={registerpage}>Register</button>
                         


                     </div>


                 
                 

            
            <form id="loginpage" className = "input-group">

               <input 
                name="username"
                placeholder='Username'
                onChange={handleChange}/>
                <input 
                name='password'
                placeholder='Password'
                type="password"
                onChange={handleChange}/>

               <button id="login-button" type = "button" onClick={sendLoginRequest}>Login</button>

               <br></br><br></br>

               <a href = "#" onClick={passpage}  >Forgot password?</a>

                </form>
                
                


                 <form id = "passwordpage" className = "input-group">
              
                    <input
                    name="email"
                    placeholder='Email'
                    onChange={handleChange}/>
                    
                 <button id="password-button" type = "button" >Submit</button>

                    </form>
                

               <form id = "registerpage" className = "input-group">

                     <input 
                    name="username"
                    placeholder='Username'
                    onChange={handleChange}/>
                    <input
                    name="email"
                    placeholder='Email'
                    onChange={handleChange}/>
                    <input 
                    name='password'
                    placeholder='Password'
                    type="password"
                    onChange={handleChange}/>
                    
                    
<button id="register-button" type = "button" >Register</button>

                    </form>
            
             
            
              
                 

             </div>

        </div>
    )
}

export default Login;