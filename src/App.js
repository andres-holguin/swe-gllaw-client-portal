import React from 'react';
import './App.css';
import userinfo from "./userinfo";
import Logincomponent from "./logincomponent";
import Submitbuttoncomponent from "./submitbuttoncomponent";
import {observer} from "mobx-react";


class App extends  React.Component {

    async componentforApi() {     //Function for API call
        try {

            let res = await ('/isLoggedIn', {   //Api call to check if user is logged in or not

                method: 'post',
                headers: {
                    'Accept': 'application/json',        //Once app component finishes loading it will check if the user is logged in or not by checking session
                    'Content-Type': 'application/json'

                }

            });

            let result = await res.json();

            if (result && result.success) {
                userinfo.loading = false;
                userinfo.isLoggedIn = true;
                userinfo.username = result.username;


            }
            else {
                userinfo.loading = false;
                userinfo.isLoggedIn = false;
            }


        }
        catch (e) {
            userinfo.loading = false;
            userinfo.loading = false;

        }


    }


    async componentforLogout() {

        try {

            let res = await ('/logout', {      //Api call to logout api endpoint

                method: 'post',
                headers: {
                    'Accept': 'application/json',        //Once app component finishes loading it will check if the user is logged in or not by checking session
                    'Content-Type': 'application/json'

                }

            });

            let result = await res.json();

            if (result && result.success) {
                userinfo.isLoggedIn = false;
                userinfo.username = '';

            }


        }
        catch (e) {
            console.log(e)

        }


    }


    render() {

        if (userinfo.loading) {
            return (
                <div className="app">
                    <div className='container'>
                        Loading, please wait
                    </div>
                </div>

            );
        }

        else {


            if (userinfo.isLoggedIn) {

                return (
                    <div className="app">
                        <div className='container'>
                            Welcome {userinfo.username}

                            <Submitbuttoncomponent
                                text={'Log out'}
                                disabled={false}
                                onClick={ () => this.componentforLogout()}
                            />
                        </div>
                    </div>

                );

            }


            return (
                <div className="app">
                    <div className='container'>
                        <Logincomponent/>
                    </div>
                </div>
            );

        }
    }
}

export default observer(App);   //makes component listen to changes in the userinfo.js file

