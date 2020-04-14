import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'

import './main.scss'
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
        { title: 'Meet with SWE Group', start: new Date() }
    ])
    const [email, setEmail] = useState('')

    useEffect(() => {
        const getSignInPage = async () => {
            console.log('in signinpage function, about to get request')
            await axios.get('/api/outlook/authurl')
            .then(function (response) {
                // handle success
                console.log('RESPONSE: ', response.data)
                setSignInPage(response.data)
            })
        }

        // next, retrieve all of the new calendar events an admin has added, if they're a client
        // if client
            // retrieve and update events
            // update outlook
        const updateOutlookCalendar = async () => {
            events.map(e => {
                let newEvent = {
                    "Subject": e.title,
                    "Body": {
                        "ContentType": "HTML",
                        "Content": "I think it will meet our requirements!"
                    },
                    "Start": {
                        "DateTime": e.start,
                        "TimeZone": "Eastern Standard Time"
                    },
                };
                //createEvent(newEvent)
            })
            // need a way to only grab the newest events
        }

        getSignInPage();
        //updateOutlookCalendar();

    }, [])

    const _handleCalendarSync = async () => {
        await axios.get('/api/outlook/sync')
        .then(function (res) {
            //console.log(res.data)
            setEmail(res.data)
        })
    }

    const createEvent = async (event) => {
        let startDateStringUtc = moment(event.start).toISOString();
        startDateStringUtc = startDateStringUtc.substring(0, startDateStringUtc.length - 5);
        console.log('THIS EVENT STARTS AT: ', startDateStringUtc)
        console.log('event title: ', event.title)

        var newEvent = {
            "Subject": event.title,
            "Body": {
                "ContentType": "HTML",
                "Content": "I think it will meet our requirements!"
            },
            "Start": {
                "DateTime": startDateStringUtc,
                "TimeZone": "Eastern Standard Time"
            }
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

    console.log('email: ', email)
    console.log('SIGN IN PAGE URL: ', signInPage);

    const _handleCloseModal = () => {
        setVisible(false)
    }

    const _handleDateClick = (day : any) => {
        console.log('setting true')
        setVisible(true)
        setDate(day)
    }

    const addEvent = async (event) => {
        setEvents([...events, event])

        //console.log('THIS STARTS AT ', event.start)
        //console.log('AND ENDS AT ', event.end)

        const updatedListing = {
            calenderEntrys : {
                title: event.title,
                data: event.start
            }
        };

        //console.log('NEW EVENT: ', event.title)

        //await axios.post('/Calender/', updatedListing);

        // not sure if clients should be able to add events here, but just to display that it adds the event
        // to you outlook calendar, i have it create an event on the calendar as well
        createEvent(event);
    }

    return (
        <>
            <NavBar />
            <button onClick={_handleCalendarSync}>Sync Calendar to Outlook</button>
            <button onClick={createEvent}>Create Event</button>
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
                        displayEventEnd={false}
                    />
                </div>
            </div>
        </>
    )
}

export default Calendar;