import React from 'react';

import './ProgressBar.css'

interface Props {
    percent: Number
}

const Filler: React.FC<Props> = (props) => {
    return (
        <div className='filler' style={{ width: `${props.percent}%` }}/> 
    )
}

export default Filler
