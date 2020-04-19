import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Header/NavBar';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Table from '../../components/Table/Table';
import SubmissionForm from '../../components/SubmissionForm/SubmissionForm'
import axios from 'axios';

const Selector = () => {
    var caseIndex = parseInt(sessionStorage.getItem('caseIndex')||'');
    const [filterText, setFilterText] = useState('')
    const [isAdmin, setAdmin] = useState(false);
    const date = (new Date).toString()
    const [caseIndexLocal, setCaseIndexLocal] = useState(caseIndex);
    useEffect(() => {
        async function loadData() {
            const meResponse = await axios.get("/api/auth/me");
            setAdmin(meResponse.data.admin);
            const caseResponse = await axios.get("/api/user/cases");
            setCases(caseResponse.data.cases);
        }

        loadData();
    },[])
    const [cases, setCases] = useState([{
        id: "",
        name: "",
        progress: 0,
        description: ""
    }]);
    
    var tableData = [[
        "",
        "",
        "",
        date,
        0
    ]];
    cases.forEach((el,index)=>{
        // const userResponse = await axios.get('/api/user/'+ el.id + '/info');
        // var clientName = userResponse.data.firstname + ' ' + userResponse.data.lastname;
        // var project = el.name;
        // var email = userResponse.data.email;
        // var stage = el.progress;
        tableData[index] = [
            "Luke Jones",
            cases[index].name,
            "jones.luke@ufl.edu",
            date,
            cases[index].progress
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

    const updateIndex = () =>{
        var int = parseInt(sessionStorage.getItem('caseIndex')||'');
        int = int + 1;
        var newValue = int.toString();
        sessionStorage.setItem('caseIndex', newValue);
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
