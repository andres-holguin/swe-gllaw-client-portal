import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import './OutlookLogin.css'

const axios = require("axios")


const OutlookLogin = (props) => {
    const [signInPage, setSignInPage] = useState('')

    useEffect(() => {
        const getSignInPage = async () => {
            console.log('in signinpage function, about to get request')
            await axios.get('/api/outlook/authurl')
            .then(function (response) {
                setSignInPage(response.data)
            })
        }

        getSignInPage();
    })

    const _handleOutlookLogin = async () => {
        await axios.get('/api/outlook/logincomplete')
        .then(function (res) {
            console.log('getting login info')
        })
    }

    return (
        <div>
            <p className='sync'>Sign in to Outlook.</p>
            <a href={signInPage}>
                <button className='outlookButton' onClick={_handleOutlookLogin}>Outlook</button>
            </a>
        </div>
    )
}

export default OutlookLogin