import React from "react";
import Inputfieldcomponent from "./inputfieldcomponent";
import Submitbuttoncomponent from "./submitbuttoncomponent";
import userinfo from "./userinfo";


class Logincomponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            checkuserCredentials: false
        }
    }

    userinputVal(property, val){
        val = val.trim();
        if(val.length > 12){    //Length of username and password
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetuserInput(){         //Function for resetting form when user types wrong username or password
        this.setState({
            username: '',
            password: '',
            checkuserCredentials: false

        })
    }

    async checkuserinfo() {          //Api call to check if user credentials exist

        if(!this.state.username){
            return;
        }

        if(!this.state.password){
            return;
        }
        this.setState({
            checkuserCredentials: true
        });

        try {
            let response = await fetch('/Login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,   //Will send info to API and check in database to see if it exists. Then create the session and login the user
                    password: this.state.password
                })
            });

            let result = await this.result.json();

            if (result && result.success){
                userinfo.isLoggedIn = true;
                userinfo.username = result.username;
            }

            else if (result && result.success === false){    //This is for if the user isn't found it will reset the form
                this.resetuserInput();
                alert(result.msg);
            }


        }
        catch (e) {

            console.log(e)  //For a problem connecting to API
            this.resetuserInput();
            
        }

    }




    render() {
        return(
            <div className="logincomponent">

                Log in
                <Inputfieldcomponent
                    type = 'text'
                    placeholder = 'Username'
                    value = {this.state.username ? this.state.username: ''}
                    onChange={(val) => this.userinputVal('username', val) }

                />

                <Inputfieldcomponent
                    type = 'password'
                    placeholder = 'Password'
                    value = {this.state.password ? this.state.password: ''}
                    onChange={(val) => this.userinputVal('password', val) }
                />

                <Submitbuttoncomponent
                    text = 'Login'
                    disabled = {this.state.checkuserCredentials}
                    onClick = {() => this.checkuserinfo()}
                />



            </div>




        );

    }
}
export default Logincomponent;