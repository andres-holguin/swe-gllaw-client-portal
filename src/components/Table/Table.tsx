import React, { useState } from 'react';

interface Props {
    data: any,
    target: String
}

const Table: React.FC<Props> = (props) => {
    // if they're a client or admin, the headers will be different
    const [headers, setHeaders] = useState(['Client', 'Project', 'Email', 'Date Created', 'Stage'])

    const res = props.data.filter(element => element[0].includes(props.target) || element[1].includes(props.target));

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        {headers.map((el, index) => (
                            <th key={index}>{el}</th>
                        ))}
                    </tr>
                    {res.map(subarry => 
                        <tr>
                            {subarry.map(el =>
                                <td>{el}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table
