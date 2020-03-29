import React from 'react';

import './ProgressBar.css'
import Filler from './Filler'

interface Props {
    percent: Number
}

const ProgressBar: React.FC<Props> = (props) => {
    return (
        <div className='progress'>
            <Filler percent={props.percent}/>
        </div>
    )
}

export default ProgressBar
