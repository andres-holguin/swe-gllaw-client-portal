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
    Axios.get('/api/document/' + id + '/', {responseType: 'arraybuffer'}).then((res)=>{
            var file = new Blob([res.data], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
    });
    // const fileUrl = URL.createObjectURL(document);
    // window.open(fileUrl, '_blank');
}

const List: React.FC<Props> = (props) => {
    const res = props.data;//.filter(element => element.name.includes(props.target));
    if(props.data){
        if(props.isAdmin)return (
            <div>
                <ListGroup as='ul'variant='flush'>
                    {res.map((el, index) =>
                    <ListGroup.Item action as='li'>
                        {index}. {el.Name}
                        <div>
                            <button onClick = {(e) => {viewDocument(el.fileID, el.Name)}}>Open</button>
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
                        {index}. {el.Name}
                        <div>
                            <button onClick = {(e) => {viewDocument(el.fileID, el.Name)}}>Open</button>
                        </div>
                    </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        )
    }
    else{
        return (
            <div>
                <p>No Documents</p>
            </div>
        )
    }
}

export default List
