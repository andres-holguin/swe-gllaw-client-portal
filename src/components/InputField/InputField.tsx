import React from 'react'

interface Props {
    type: string,
    placeholder: string,
    value: string,
    onChange: any
}

const InputField: React.FC<Props> = (props) => {
    return (
        <div>
            <input
                className='input'
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    )
}

export default InputField
