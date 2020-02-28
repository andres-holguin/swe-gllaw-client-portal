import React, { useState } from 'react';
import NavBar from '../../components/Header/NavBar';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';

const Selector = () => {
    const [filterText, setFilterText] = useState('')
    const [list, setList] = useState([{
        name: 'Capital One',
        key: 0
    }, {
        name: 'Midflorida',
        key: 1
    }, {
        name: 'SciStarter',
        key: 2
    }, {
        name: 'AAA',
        key: 3
    }, {
        name: 'AAB',
        key: 4
    }])

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
            <List
                data={list}
                target={filterText}
            />
        </div>
    )
}

export default Selector
