import React, { useState } from 'react'

import NavBar from '../../components/Header/NavBar'
import './Account.css'
import InputField from '../../components/InputField/InputField'
import SubmitButton from '../../components/SubmitButton/SubmitButton';

interface Props {

}

const Account: React.FC<Props> = (props) => {
    const [newPassword, setNewPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [correct, toggleCorrect] = useState(true)
    const [equal, toggleEqual] = useState(true)

    let password = 'anna'

    const _handleSubmit = () => {
        if (currentPassword !== password) {
            toggleCorrect(false)
        } else toggleCorrect(true)

        if (newPassword !== retypePassword) {
            toggleEqual(false)
        } else toggleEqual(true)
    }

    return (
        <>
            <NavBar />
            <div className='col'>
                <div className='acctHeader'>
                    <p className='heading'>Account</p>
                </div>
                <div className='content'> 
                    <InputField
                        border={ correct ? 'lightgrey' : 'red' }
                        type='password'
                        placeholder='Current Password'
                        value={currentPassword}
                        onChange={(val) => setCurrentPassword(val)}
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
                    />
                    <InputField
                        border={ equal ? 'lightgrey' : 'red' }
                        type='password'
                        placeholder='Retype Password'
                        value={retypePassword}
                        onChange={(val) => setRetypePassword(val)}
                    />
                    {
                        equal ? <></> : (
                            <div>
                                <p>Your passwords do not match.</p>
                            </div>
                        )
                    }
                </div>
                <div className='saveChanges'>
                    <SubmitButton
                        onClick={_handleSubmit}
                        text='Save Changes'
                        disabled={false}
                    />
                </div>
            </div>  
        </>
    )
}

export default Account
