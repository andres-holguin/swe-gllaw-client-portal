import React from 'react';
import Data from './Data';
import ListGroup from 'react-bootstrap/ListGroup';
import Axios from 'axios';
import createObjectURL from 'url';


interface Props {
    data: any,
    target: String
    isAdmin: boolean
}

const viewDocument = (id, name) => {
    //let document = new File(["foo"], "foo.txt", {type: "text/plain"});
    Axios.get('/api/document/5e94c929ff73291db1d08bb0/').then(
        function(response){
            const document = new File([response.data], name, {type: "text/plain"});
            const fileUrl = URL.createObjectURL(document);
            window.open(fileUrl, '_blank');
    });
    // const fileUrl = URL.createObjectURL(document);
    // window.open(fileUrl, '_blank');
}
const downLoadDocument = (id) => {

}
const deleteDocument = (id) => {

}

const List: React.FC<Props> = (props) => {
    const res = props.data//.filter(element => element.name.includes(props.target));

    if(props.isAdmin)return (
        <div>
            <ListGroup as='ul'variant='flush'>
                {res.map((el, index) =>
                <ListGroup.Item action as='li'>
                    {index}. {el.name}
                    <div>
                        <button onClick = {(e) => {viewDocument(el.id, el.name)}}>View</button>
                        <button onClick = {(e) => {downLoadDocument(el.id)}}>Download</button>
                        <button onClick = {(e) => {deleteDocument(el.id)}}>Delete</button>
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
