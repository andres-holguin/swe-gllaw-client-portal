import React from 'react';
import Data from './Data';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
    data: any,
    target: String
    isAdmin: boolean
}

const List: React.FC<Props> = (props) => {
    const res = props.data//.filter(element => element.name.includes(props.target));

    if(props.isAdmin)return (
        <div>
            <ListGroup as='ul'variant='flush'>
                {res.map((el, index) =>
                <ListGroup.Item action as='li'>
                    {index}. {el}
                    <div>
                        <button>View</button>
                        <button>Download</button>
                        <button>Delete</button>
                    </div>
                </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    )
    else return (
        <div>
            <ListGroup as='ul'variant='flush'>
                {res.map((el, index) =>
                <ListGroup.Item action as='li'>
                    {index}. {el}
                    <div>
                        <button>View</button>
                        <button>Download</button>
                    </div>
                </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    )
}

export default List
