import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './main.scss'

// could add events could be a prop passed to Calendar so if they are an admin they can add events

const Calendar = () => {
    return (
        <div className='demo-app'>
            <div className='demo-app-top'> 
            </div>
            <div className='demo-app-calendar'>
                <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
            </div>
        </div>
    )
}

export default Calendar;