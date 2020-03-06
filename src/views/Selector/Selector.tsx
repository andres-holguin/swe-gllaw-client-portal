import React, { useState } from 'react';
import NavBar from '../../components/Header/NavBar';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import Table from '../../components/Table/Table';

const Selector = () => {
    // const [filterText, setFilterText] = useState('')
    // const [tableData, setTableData] = useState([{
    //     client: 'Luke P.',
    //     project: 'SWE',
    //     email: 'lupey@aol.com',
    //     dateCreated: new Date(),
    //     stage: 4
    // }, {
    //     client: 'Anna Lanzino',
    //     project: 'SWEeeeee',
    //     email: 'lanna@aol.com',
    //     dateCreated: new Date(),
    //     stage: 3
    // }, {
    //     client: 'Prince Penguino',
    //     project: 'andres',
    //     email: 'princep@aol.com',
    //     dateCreated: new Date(),
    //     stage: 2
    // }])
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
        ]
    ])
    // const [list, setList] = useState([{
    //     name: 'Company 0',
    //     key: 0
    // }, {
    //     name: 'Company 1',
    //     key: 1
    // }, {
    //     name: 'Gonzalo Law',
    //     key: 2
    // }, {
    //     name: 'AAA',
    //     key: 3
    // }, {
    //     name: 'AAB',
    //     key: 4
    // }])

    // const filterUpdate = (val) => {
    //     setFilterText(val)
    //     console.log(filterText)
    // }

    return (
        <div>
            <NavBar />
            {/* <Search
                filterUpdate={filterUpdate}
            /> */}
            {/* <List
                data={list}
                target={filterText}
            /> */}
            <Table
                data={tableData}
            />
        </div>
    )
}

export default Selector
