import React from 'react';
import Data from './Data';

interface Props {
    data: any,
    target: String
}

const List: React.FC<Props> = (props) => {
    console.log(props.data)

    const res = props.data.filter(element => element.name.includes(props.target));

    return (
        <div>
            <ul>
                {res.map((el) => <Data name={el.name} key={el.key}/>)}
            </ul>
        </div>
    )
}

export default List
