import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { MdSend } from 'react-icons/md';
import { isPropsEqual } from '@fullcalendar/core';
import './Login.css'

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
        // props.userHasAuthenticated(true); // TEMP - take out when done doing stuff
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

    return (
        <div className='login'>

            

         
            <div className='logo'>

            <img src = "https://www.gonzalolaw.com/wp-content/uploads/2019/01/GonzaloLawLogo.png"
            
           

            />

            </div>

            <h4>Please Sign In</h4>
            <form>
                <input 
                name="username"
                placeholder='Username'
                onChange={handleChange}/>
                <input 
                name='password'
                placeholder='Password'
                type="password"
                onChange={handleChange}/>
            </form>
            <button id="login-button" onClick={sendLoginRequest}>Login</button>
            
        </div>
    )
}

export default Login;