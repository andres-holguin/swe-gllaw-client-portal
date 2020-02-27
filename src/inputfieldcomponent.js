import React from "react";

class Inputfieldcomponent extends React.Component{

    render() {
        return(
            <div className="inputfieldcomponent">

                <input
                    className='input'
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e.target.value)}

                />


            </div>




        );

    }
}
export default Inputfieldcomponent;