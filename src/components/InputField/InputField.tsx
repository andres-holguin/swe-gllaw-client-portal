import React from 'react'

import './InputField.css'

interface Props {
    type: string,
    placeholder: string,
    value: string,
    onChange: any,
    border?: string
}

const InputField: React.FC<Props> = (props) => {
    return (
        <div className='inputField'>
            <form>
                <input
                    style={{ borderColor: props.border }}
                    className='inputComp'
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </form>
        </div>
    )
}

export default InputField
