import React, { useState } from 'react';

interface Props {
    data: any
}

const Table: React.FC<Props> = (props) => {
    // if they're a client or admin, the headers will be different
    const [headers, setHeaders] = useState(['Client', 'Project', 'Email', 'Date Created', 'Stage'])

    props.data.map(subarry => 
        subarry.map(el =>
            console.log(el)
        )
    )

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        {headers.map((el, index) => (
                            <th key={index}>{el}</th>
                        ))}
                    </tr>
                    {props.data.map(subarry => 
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
