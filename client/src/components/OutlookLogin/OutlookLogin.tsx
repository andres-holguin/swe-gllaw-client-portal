import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import './OutlookLogin.css'

const axios = require("axios")


const OutlookLogin = (props) => {
    const [signInPage, setSignInPage] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const getSignInPage = async () => {
            console.log('in signinpage function, about to get request')
            await axios.get('/api/outlook/authurl')
            .then(function (response) {
                // handle success
                //console.log('RESPONSE: ', response.data)
                setSignInPage(response.data)
            })
        }

        getSignInPage();
    })

    const _handleOutlookLogin = async () => {
        console.log('HEREEEEEE')
        await axios.get('/api/outlook/logincomplete')
        .then(function (res) {
            console.log(res.data)
            setEmail(res.data)
        })
    }

    console.log(email)

    const history = useHistory();

    const redirect = () => {
        history.push('/Selector')
    }

    return (
        <div>
            <p className='sync'>Sync your calendar with Outlook.</p>
            <a href={signInPage}>
                <button className='outlookButton' onClick={_handleOutlookLogin}>Outlook</button>
            </a>
        </div>
    )
}

export default OutlookLogin