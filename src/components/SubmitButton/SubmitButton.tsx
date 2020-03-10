import React from 'react'

interface Props {
    onClick: any,
    text: string,
    disabled: boolean
}

const SubmitButton: React.FC<Props> = (props) => {
    return (
        <div>
            <button
                className= 'button'
                disabled={props.disabled}
                onClick={() => props.onClick()}
            >
                {props.text}
            </button>
        </div>
    )
}

export default SubmitButton
