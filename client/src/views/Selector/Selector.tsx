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

            let cases = caseResponse.data
  
            for (let i=0; i<cases.length; i++) {
                const c = cases[i];
                const userResponse = await axios.get('/api/user/'+ c.userIDS[0] + '/info');
                c.clientName = userResponse.data.firstname + ' ' + userResponse.data.lastname;
                c.email = userResponse.data.email;
            }

            setCases(cases);
        }

        loadData();
    },[])
    const [cases, setCases] = useState([{
        id: "",
        Name: "",
        progress: 0,
        Description: "",
        userIDS: [""],
        clientName: "",
        email: ""
    }]);
    
    var tableData = [[
        "",
        "",
        "",
        date,
        0
    ]];
    cases.forEach(async (el,index)=>{
        tableData[index] = [
            el.clientName,
            el.Name,
            el.email,
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
