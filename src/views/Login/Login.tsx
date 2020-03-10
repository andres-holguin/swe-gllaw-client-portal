import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import InputField from '../../components/InputField/InputField'
import SubmitButton from '../../components/SubmitButton/SubmitButton'

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const redirect = () => {
        history.push('/Calendar')
    }

    // const _handleInput = (property, val) => {
    //     val = val.trim();
    //     if(val.length > 12){    //Length of username and password
    //         return;
    //     }
    //     this.setState({
    //         [property]: val
    //     })
    // }

    return (
        <div className='login'>
            <p>Log in</p>
            <InputField
                type='text'
                placeholder='Username'
                value={username}
                onChange={(val) => setUsername(val) }
            />
            <InputField
                type='password'
                placeholder='Password'
                value={password}
                onChange={(val) => setPassword(val) }
            /> 
            {/* <button onClick={redirect}>redirecting to home</button> */}
            <SubmitButton
                onClick={redirect}
                text='Log in'
                disabled={false}
            />
        </div>
    )
}

export default Login;