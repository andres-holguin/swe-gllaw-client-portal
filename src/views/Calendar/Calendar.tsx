import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' 

import './main.scss'
import Modal from '../../utils/modal/Modal';

// could add events could be a prop passed to Calendar so if they are an admin they can add events

const Calendar = () => {
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [events, setEvents] = useState([
        { title: 'Meet with SWE Group', start: new Date() }
    ])

    const _handleCloseModal = () => {
        setVisible(false)
    }

    const _handleDateClick = (day : any) => {
        setVisible(true)
        setDate(day)
    }

    const addEvent = (e) => {
        setEvents([...events, e])
    }

    return (
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
    )
}

export default Calendar;