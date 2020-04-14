import React from 'react'

import './SubmitButton.css'

interface Props {
    onClick: any,
    text: string,
    disabled: boolean,
}

const SubmitButton: React.FC<Props> = (props) => {
    return (
        <div>
            <button
                className='submit'
                disabled={props.disabled}
                onClick={() => props.onClick()}
            >
                {props.text}
            </button>
        </div>
    )
}

export default SubmitButton