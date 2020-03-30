import React from 'react'

interface Props {
    name: String
    key: Number
}

const Data: React.FC<Props>  = (props) => {
    return (
        <div>
            <p>{props.name}</p>
        </div>
    )
}

export default Data
