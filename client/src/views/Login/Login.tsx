import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { MdSend } from 'react-icons/md';
import { isPropsEqual } from '@fullcalendar/core';
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
        //setUseDeat()
    }
    const sendLoginRequest = async () => {

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
            <p>Login</p>
            <form>
                <input 
                name="username"
                placeholder='Username'
                onChange={handleChange}/>
                <input 
                name='password'
                placeholder='Password'
                onChange={handleChange}/>
            </form>
            <button onClick={sendLoginRequest}>Login</button>
            <button onClick={redirect}>redirecting to home</button>
        </div>
    )
}

export default Login;