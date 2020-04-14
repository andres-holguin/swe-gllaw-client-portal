import React, {useState} from 'react';
import NavBar from '../../components/Header/NavBar';
import List from '../../components/List/List'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { fileURLToPath } from 'url';
import './Documents.css'

const Documents = () => {
    const { register, handleSubmit, errors, reset, getValues } = useForm();
    const [listEntries, setListEntries] = useState([
        "Document A",
        "Document B",
        "Document C"
    ]);
    
    const onSubmit = () =>{
        const document = getValues().datafile[0];
        axios.post('/api/document/upload', document)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        reset();
    }
    return (
        <div>
            <NavBar />
            <List data={listEntries} target="" isAdmin = {true}/>
            <form className = "file-upload" onSubmit = {handleSubmit(onSubmit)} encType="multipart/form-data"/*action='/api/document/upload' encType="multipart/form-data" method="post"*/>
                <h5>
                    Upload Document <br></br>
                </h5>
                <input type="file" name="datafile" ref={register({required: true})}/>
                
                <div>
                    <input type="submit" value="Send"/>
                </div>
            </form>
        </div>
    )
}

export default Documents
