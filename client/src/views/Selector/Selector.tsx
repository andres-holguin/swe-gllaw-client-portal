import React, { useState } from 'react';
import NavBar from '../../components/Header/NavBar';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Table from '../../components/Table/Table';
import SubmissionForm from '../../components/SubmissionForm/SubmissionForm'

const Selector = () => {
    const [filterText, setFilterText] = useState('')
    const date = (new Date).toString()
    const [tableData, setTableData] = useState([
        [
            'Luke P.',
            'SWE',
            'lupey@aol.com',
            date,
            4
        ],
        [
            'Anna Lanzino',
            'SWEeeee',
            'luaay@aol.com',
            date,
            3
        ], [
            'Andres',
            'SWEeee',
            'ly@aol.com',
            date,
            5
        ], [
            'Yashiyah',
            'backend SWE',
            'lyyyy@aol.com',
            date,
            1
        ]
    ])
    const addProject = (data)=>{
        let newData = tableData;
        let obj = [
            data.First + ' ' + data.Last,
            'SWE',
            data.Email,
            date,
            1
        ]
        newData.push(obj);
        setTableData(newData);
        setFilterText(' ');
        setFilterText('');
        console.log(tableData);
    }

    const filterUpdate = (val) => {
        setFilterText(val)
        console.log(filterText)
    }

    return (
        <div>
            <NavBar />
            <Search
                filterUpdate={filterUpdate}
            />
            <Table
                data={tableData}
                target={filterText}
            />
            <SubmissionForm addProject = {addProject}/>
        </div>
    )
}

export default Selector
