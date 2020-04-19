import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

interface Props {
    data: any,
    target: String
    updateIndex: any
}

const ProjTable: React.FC<Props> = (props) => {
    var caseIndex = parseInt(sessionStorage.getItem('caseIndex')||'');
    // if they're a client or admin, the headers will be different
    const [headers, setHeaders] = useState(['Client', 'Project', 'Email', 'Date Created', 'Stage'])

    const res = props.data.filter(element => element[0].includes(props.target) || element[1].includes(props.target));

    return (
        <div style={{backgroundColor: 'white'}}>
            <Table size='sm' bordered striped responsive='sm' hover>
                <thead>
                    <tr>
                        {headers.map((el, index) => (
                            <th key={index}>{el}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {res.map((subarry,index) => 
                    <tr onClick = {(event) => {props.updateIndex(index)}}>
                        {subarry.map(el =>
                            <td style={{maxWidth:500}}>{el}</td>
                        )}
                    </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default ProjTable
