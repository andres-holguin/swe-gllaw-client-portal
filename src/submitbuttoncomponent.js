import React from "react";

class Submitbuttoncomponent extends React.Component{

    render() {
        return(
            <div className="submitbuttoncomponent">

                <button
                    className= 'button'
                    disabled={this.props.disabled}
                    onClick={() => this.props.onClick()}
                >
                    {this.props.text}

                </button>

            </div>




        );

    }
}
export default Submitbuttoncomponent;