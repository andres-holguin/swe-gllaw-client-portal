import React, { useState } from 'react';
// import TimePicker from 'react-time-picker';
import { MdClear } from 'react-icons/md';

import './Modal.css'

interface Props {
    visible: boolean,
    date: Date,
    closeModal: any
}

const Modal: React.FC<Props> = (props) => {
    const [event, setEvent] = useState('')

    return (
        <div>
            {
                props.visible ? 
                (
                    <div className='modal'>
                        <div className='button'>
                            <MdClear
                                onClick={props.closeModal}
                                className='exit'
                            />
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
                        {/* <div>
                            <TimePicker />
                        </div> */}
                    </div>
                ) : (
                <text>not visible</text> 
                )
            }
        </div>
    )
}

export default Modal;