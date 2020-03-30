import React, {useState} from 'react';
import NavBar from '../../components/Header/NavBar';
import List from '../../components/List/List'

const Documents = () => {
    const [listEntries, setListEntries] = useState([
        "Document A",
        "Document B",
        "Document C"
    ]);

    return (
        <div>
            <NavBar />
            <List data={listEntries} target=""/>
        </div>
    )
}

export default Documents
