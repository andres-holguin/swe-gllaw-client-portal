import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import { MdClear } from 'react-icons/md';

import './Modal.css'

interface Props {
    visible: boolean,
    date: any,
    closeModal: any,
    addEvent: any
}

const Modal: React.FC<Props> = (props) => {
    const [event, setEvent] = useState('')
    const [time, setTime] = useState('')

    const setTimeAndDate = () => {
        let hour = parseInt(time.substring(0,2)) // 13:51 -> 13
        let minute = parseInt(time.substring(3))
        let d = props.date.date
        d.setHours(hour)
        d.setMinutes(minute)
        let e = {
            title: event,
            start: d
        }
        props.addEvent(e)
        setTime('')
        setEvent('')
        props.closeModal()
    }

    return (
        <div>
            {
                props.visible ? 
                (
                    <div className='modal'>
                        <div className='modalHeader'>
                            <div className='date'>
                                {props.date.dateStr}
                            </div>
                            <div className='exitButton'>
                                <MdClear
                                    onClick={props.closeModal}
                                    className='exit'
                                />
                            </div>
                        </div>
                        <div>
                            <form>
                                <input
                                    placeholder='Enter an event name'
                                    value={event}
                                    onChange={(e) => setEvent(e.target.value)}
                                    className='input'
                                />
                            </form>
                        </div>
                        <TimePicker
                            className='timePicker'
                            isOpen={true}
                            onChange={(time) => setTime(time)}
                            clockIcon={null}
                            clearIcon={null}
                            disableClock={true}
                        />
                        <div className='addButton'>
                            <button onClick={setTimeAndDate} className='addButtonStyle'>Add Event</button>
                        </div>
                    </div>
                ) : (
                <></> 
                )
            }
        </div>
    )
}

export default Modal;