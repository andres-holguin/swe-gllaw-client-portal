import React, {useState, useEffect} from 'react';
import NavBar from '../../components/Header/NavBar';
import List from '../../components/List/List'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { fileURLToPath } from 'url';
import './Documents.css'
import { stringify } from 'querystring';



const Documents = () => {
    var caseIndex = parseInt(localStorage.getItem('caseIndex')||'');
    let caseData = {
        id: "",
        documents: [] }

    useEffect(() => {
        async function loadData() {
            const meResponse = await axios.get("/api/auth/me");
            setAdmin(meResponse.data.admin);

            const caseResponse = await axios.get("/api/user/cases");
            caseData = caseResponse.data.cases[caseIndex];
            setListEntries(caseData.documents);
            setCaseId(caseData.id);
        }

        loadData();
    }, [])

    const {register, handleSubmit, errors, reset, getValues } = useForm();
    const [listEntries, setListEntries] = useState(caseData.documents);
    const [isAdmin, setAdmin] = useState(false);
    const [caseId, setCaseId] = useState("");
    
    const onSubmit = () =>{
        const document = getValues().datafile[0];
    // console.log(document);

        const data = new FormData();
        data.append('doc', document);
        data.append('CaseID', caseId); // THis will be gotten from the active case id.
        console.log(data);
        axios.post('/api/document/upload', data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        reset();
        window.location.reload(true);
    }
    if(isAdmin)return (
        <div>
            <NavBar />
            <List data={listEntries} target="" isAdmin = {isAdmin}/>
            <form className = "submission-form" onSubmit = {handleSubmit(onSubmit)} encType="multipart/form-data"/*action='/api/document/upload' encType="multipart/form-data" method="post"*/>
                <h5>
                    Upload Document <br></br>
                </h5>
                <input type="file" name="datafile" ref={register({required: true})}/>
                
                <div>
                    <input type="submit" value="Upload" className="form-submit"/>
                </div>
            </form>
        </div>
    );
    else return (
        <div>
            <NavBar />
            <List data={listEntries} target="" isAdmin = {isAdmin}/>
        </div>
    );
}

export default Documents
