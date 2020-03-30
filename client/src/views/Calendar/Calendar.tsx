import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import './main.scss'
import Modal from '../../components/modal/Modal';
import NavBar from '../../components/Header/NavBar';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

const axios = require("axios")

// could add events could be a prop passed to Calendar so if they are an admin they can add events

const Calendar = () => {
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [signInPage, setSignInPage] = useState('')
    const [events, setEvents] = useState([
        { title: 'Meet with SWE Group', start: new Date() }
    ])

    useEffect(() => {
        const getSignInPage = async () => {
            console.log('in signinpage function, about to get request')
            await axios.get('/api/outlook/calendar')
            .then(function (response) {
                // handle success
                console.log('RESPONE: ', response.data)
                setSignInPage(response.data)
            })
        }

        getSignInPage();

    }, [])

    console.log('SIGN IN PAGE URL: ', signInPage);

    const _handleCloseModal = () => {
        setVisible(false)
    }

    const _handleDateClick = (day : any) => {
        console.log('setting true')
        setVisible(true)
        setDate(day)
    }

    const addEvent = (e) => {
        setEvents([...events, e])
    }

    return (
        <>
            <NavBar />
            <a href={signInPage}>
                <button onClick={() => console.log('button says sign in page is...', signInPage)}>Outlook</button>
            </a>
            <div className='demo-app'>
                <div className='demo-app-top'> 
                </div>
                <div className='demo-app-calendar'>
                    <Modal
                        visible={visible}
                        date={date}
                        closeModal={_handleCloseModal}
                        addEvent={addEvent}
                    />
                    <FullCalendar
                        defaultView="dayGridMonth"
                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
                        events={events}
                        dateClick={_handleDateClick}
                    />
                </div>
            </div>
        </>
    )
}

export default Calendar;