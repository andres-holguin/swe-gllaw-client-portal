import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory()

    const redirect = () => {
        history.push('/Calendar')
    }

    return (
        <div className='login'>
            <p>Login</p>
            <form>
                <input placeholder='Username'/>
            </form>
            <button onClick={redirect}>redirecting to home</button>
        </div>
    )
}

export default Login;