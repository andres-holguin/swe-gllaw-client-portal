import React from 'react'
import { useForm } from 'react-hook-form';

import './InputField.css'

interface Props {
    type: string,
    placeholder: string,
    value: string,
    onChange: any,
    border?: string,
    name?: string,
    required: boolean
}

const InputField: React.FC<Props> = (props) => {
    const { handleSubmit, register, errors } = useForm();

    return (
        <div className='inputField'>
            <form>
                <input
                    name={props.name}
                    ref={register({required: props.required, maxLength: 20})} 
                    style={{ borderColor: props.border }}
                    className='inputComp'
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
                {errors.name && <p>This field is required</p>}
            </form>
        </div>
    )
}

export default InputField