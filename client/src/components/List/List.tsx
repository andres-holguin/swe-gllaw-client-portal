import React from 'react';
import Data from './Data';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
    data: any,
    target: String
}

const List: React.FC<Props> = (props) => {
    const res = props.data//.filter(element => element.name.includes(props.target));

    return (
        <div>
            <ListGroup as='ul'variant='flush'>
                {res.map((el, index) =>
                <ListGroup.Item action as='li'>
                    {index}. {el}
                </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    )
}

export default List
