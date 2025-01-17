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
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const setTimeAndDate = () => {
        let start = formatDate(startTime)
        setStartTime(startTime)

        let end;
        if (endTime === '' || endTime === null) {
            setEndTime(startTime);
            end = start;
        } else {
            end = formatDate(endTime)
            setEndTime(endTime)
        }

        let e = {
            title: event,
            start: start,
            end: end
        }

        props.addEvent(e)

        setStartTime('')
        setEndTime('')
        setEvent('')
        props.closeModal()
    }

    const formatDate = (time) => {
        let hour = parseInt(time.substring(0,2)) // 13:51 -> 13
        let minute = parseInt(time.substring(3))
        let d = new Date(props.date.date);
        d.setHours(hour)
        d.setMinutes(minute)

        return d;
    }

    return (
        <div>
            {
                props.visible ? 
                (
                    <div className='eventmodal'>
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
                        <div className='startTime'>
                            <TimePicker
                                className='timePicker'
                                isOpen={true}
                                onChange={(time) => setStartTime(time)}
                                clockIcon={null}
                                clearIcon={null}
                                disableClock={true}
                            />
                        </div>
                        <div className='endTime'>
                            <TimePicker
                                className='timePicker'
                                isOpen={true}
                                onChange={(time) => setEndTime(time)}
                                clockIcon={null}
                                clearIcon={null}
                                disableClock={true}
                            />
                        </div>
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