import React from 'react';

interface Props {
    filterUpdate: any
}

const Search: React.FC<Props>  = (props) => {
    const filterUpdate = (event) => {
        props.filterUpdate(event.target.value)
    };
    //You will need to save the value from the textbox and update it as it changes
    //You will need the onChange value for the input tag to capture the textbox value

    return (
        <form>
            <input type="text" placeholder="Type to Filter" onChange={filterUpdate}/>
        </form>
    );

};

export default Search;
