import React, { useState } from 'react'

import NavBar from '../../components/Header/NavBar'
import './Account.css'
import InputField from '../../components/InputField/InputField'
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import OutlookLogin from '../../components/OutlookLogin/OutlookLogin';

import axios from 'axios';

interface Props {

}

interface newPasswordRequest {
    oldPassword: string,
    newPassword: string,
};
const Account: React.FC<Props> = (props) => {
    const [newPassword, setNewPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [correct, toggleCorrect] = useState(true)
    const [equal, toggleEqual] = useState(true)

    //let password = 'anna'
    const cookies = require('cookie');
    const _handleSubmit = () => {
        let cookie = cookies.parse(document.cookie);
        console.log(cookies);
        let point = "/api/user/" + cookie["_uid"] + "/change_password";
        let request = {
            oldpassword: currentPassword,
            newPassword: newPassword,
        }
        
        axios.put(point, request).then(res => {
            console.log(res.status);
            if (res.status === 204) {
                toggleCorrect(true);
            } else {
                toggleCorrect(false);
            }
        }
        );
    }

    const _handleLogout = async () => {
        await axios.post('/api/user/logout')
        .then(res => {
            console.log(res.data);
            console.log('redirecting...')
            window.location.reload(false); // force a refresh so it goes back to logout screen
        });
    }

    const _handleForm = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <NavBar />
            <div className='leftcol'>
                <div className='content'> 
                    <p className='heading'>Account</p>
                    <form onSubmit={_handleForm}>
                        <InputField
                            border={ correct ? 'lightgrey' : 'red' }
                            type='password'
                            placeholder='Current Password'
                            value={currentPassword}
                            onChange={(val) => setCurrentPassword(val)}
                            required={true}
                            name='currentPassword'
                        />
                        {
                            correct ? <></> : (
                                <div>
                                    <p>Looks like this password is incorrect. Try again.</p>
                                </div>
                            )
                        } 
                        <InputField
                            type='password'
                            placeholder='New Password'
                            value={newPassword}
                            onChange={(val) => setNewPassword(val)}
                            required={true}
                            name='newPassword'
                        />
                        <InputField
                            border={ equal ? 'lightgrey' : 'red' }
                            type='password'
                            placeholder='Retype Password'
                            value={retypePassword}
                            onChange={(val) => setRetypePassword(val)}
                            required={true}
                            name='retypePassword'
                        />
                        {
                            equal ? <></> : (
                                <div>
                                    <p>Your passwords do not match.</p>
                                </div>
                            )
                        }
                    </form>
                    <div className='saveChanges'>
                        <SubmitButton
                            onClick={_handleSubmit}
                            text='Save Changes'
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
            <div className='rightcol'>
                <div className='content'> 
                    <OutlookLogin/>
                <div className='logout'>
                    <SubmitButton
                        onClick={_handleLogout}
                        text='Logout'
                        disabled={false}
                    />
                </div>
                </div>
            </div>
        </>
    )
}

export default Account