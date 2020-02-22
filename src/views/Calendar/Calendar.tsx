import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './main.scss'

// can add events could be a prop passed to Calendar so if they are an admin they can add events

const Calendar = () => {
    return (
        <div>
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
        </div>
    )
}

export default Calendar;