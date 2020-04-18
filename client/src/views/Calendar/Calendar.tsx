import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'

import './main.scss'
import './Calendar.css'
import Modal from '../../components/modal/Modal';
import NavBar from '../../components/Header/NavBar';
//import SubmitButton from '../../components/SubmitButton/SubmitButton';

const axios = require("axios")

// could add events could be a prop passed to Calendar so if they are an admin they can add events

const Calendar = () => {
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [signInPage, setSignInPage] = useState('')
    var today = new Date();
    today.setHours(today.getHours() + 4);
    const [events, setEvents] = useState([
        { title: 'Meet with SWE Group', start: new Date(), end: new Date() }
    ])
    const [email, setEmail] = useState('')

    useEffect(() => {
        const getCalendarEvents = async () => {
            await axios.get('/api/calender/edit')
            .then(function (res) {
                console.log(res.data)
                setEvents(res.data)
            })
        }
        
        getCalendarEvents();
    }, [])

    const _handleCalendarSync = async () => {
        await axios.get('/api/outlook/sync')
        .then(function (res) {
            console.log(res.data)
            setEmail(res.data)
            alert('Your calendar has successfully synced to Outlook.')
        }).catch(error => {
            alert('Make sure you have logged into Outlook in the Account tab.')
            console.log(error.response)
        });
    }

    const refresh = async () => {
        await axios.get('/api/outlook/refreshtokens')
        .then(function (res) {
            console.log(res.data)
        }).catch(error => {
            console.log(error.response)
        });
    }

    const createEvent = async (event) => {

        const updatedListing = {
            calenderEntrys : {
                title: event.title,
                start: event.start,
                end: event.end
            }
        };

        console.log(updatedListing.calenderEntrys.start)

        await axios.post('/api/calender/edit', updatedListing)
        .then(function (res) {
            console.log(res.data)
        }).catch(error => {
            console.log(error.response)
        });

        let dateStartTime = moment(event.start).format("YYYY-MM-DDTHH:mm:ss");
        let dateEndTime = moment(event.end).format("YYYY-MM-DDTHH:mm:ss");

        var newEvent = {
            "Subject": event.title,
            "Body": {
                "ContentType": "HTML",
                "Content": "I think it will meet our requirements!"
            },
            "Start": {
                "DateTime": dateStartTime,
                "TimeZone": "Eastern Standard Time"
            },
              "End": {
                "DateTime": dateEndTime,
                "TimeZone": "Eastern Standard Time"
            },
        };

        console.log('making axios req')
        await axios.post('/api/outlook/createitem', {
            newEvent: newEvent
        })
        .then(function (res) {
            console.log(res.data)
        }).catch(error => {
            console.log(error.response)
        });
    }

    const _handleCloseModal = () => {
        setVisible(false)
    }

    const _handleDateClick = (day : any) => {
        setVisible(true)
        setDate(day)
    }

    const addEvent = async (event) => {
        console.log(event.start)
        console.log(event.end)

        setEvents([...events, event])

        // not sure if clients should be able to add events here, but just to display that it adds the event
        // to you outlook calendar, i have it create an event on the calendar as well
        createEvent(event);
    }

    return (
        <>
            <NavBar />
            {/* <button onClick={refresh}>refresh token</button> */}
            <div className='demo-app'>
                <div className='outlookSync'>
                    {/* <p className='sync'>Sync Calendar to Outlook.</p> */}
                    <button className='outlookSyncButton' onClick={_handleCalendarSync}>Outlook Sync</button>
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
                        displayEventEnd={false}
                    />
                </div>
            </div>
        </>
    )
}

export default Calendar;