import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Header/NavBar';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Table from '../../components/Table/Table';
import SubmissionForm from '../../components/SubmissionForm/SubmissionForm'
import axios from 'axios';

const Selector = () => {
    var caseIndex = parseInt(localStorage.getItem('caseIndex')||'');
    const [filterText, setFilterText] = useState('')
    const [isAdmin, setAdmin] = useState(false);
    const date = (new Date).toString()
    const [caseIndexLocal, setCaseIndexLocal] = useState(caseIndex);
    useEffect(() => {
        async function loadData() {
            const meResponse = await axios.get("/api/auth/me");
            setAdmin(meResponse.data.admin);
            const caseResponse = await axios.get("/api/case/list");
            setCases(caseResponse.data);
        }

        loadData();
    },[])
    const [cases, setCases] = useState([{
        id: "",
        Name: "",
        progress: 0,
        Description: "",
        userIDS: [""]
    }]);
    
    var tableData = [[
        "",
        "",
        "",
        date,
        0
    ]];
    cases.forEach(async (el,index)=>{
        // const userResponse = await axios.get('/api/user/'+ el.userIDS[0] + '/info');
        // var clientName = userResponse.data.firstname + ' ' + userResponse.data.lastname;
        // var email = userResponse.data.email;
        tableData[index] = [
            "John Smith",
            el.Name,
            "sampleEmail@gmail.com",
            date,
            el.progress
        ];
        
    });

    const grabCaseList = () => {
        if (isAdmin) {
            
        }
    }
    const addProject = (data)=>{
        let newData = tableData;
        let obj = [
            data.firstname + ' ' + data.lastname,
            'SWE',
            data.email,
            date,
            0
        ]
        tableData.push(obj);
        setFilterText(' ');
        setFilterText('');
        console.log(tableData);
    }

    const filterUpdate = (val) => {
        setFilterText(val)
        console.log(filterText)
    }

    const updateIndex = (index) =>{
        var newValue = "" + index;
        localStorage.removeItem('caseIndex');
        localStorage.setItem('caseIndex', newValue);
        window.location.reload(true);
    }

    if(isAdmin)return (
        <div>
            <NavBar />
            <Search
                filterUpdate={filterUpdate}
            />
            <Table
                data={tableData}
                target={filterText}
                updateIndex = {updateIndex}
            />
            <SubmissionForm addProject = {addProject}/>
        </div>
    )
    else return (
        <div>
            <NavBar />
            <Search
                filterUpdate={filterUpdate}
            />
            <Table
                data={tableData}
                target={filterText}
                updateIndex = {updateIndex}
            />
        </div>
    )
}

export default Selector
