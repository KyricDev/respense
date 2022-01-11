import React from 'react';
import ReactDOM from 'react-dom';
import { apiRoot } from './siteroot';

class Root extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            isOnLogin: true
        }
        this.changeForm = this.changeForm.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    changeForm(){
        let currentState = this.state.isOnLogin;
        this.setState({ isOnLogin: !currentState});
    }
    register(e: any){
        e.preventDefault();
        let data = new FormData();
        data.append("username", e.target[0].value);
        data.append("password", e.target[1].value);
        data.append("confirmPassword", e.target[0].value);        

        fetch(apiRoot + 'register', { 
            method: 'POST',
            redirect: 'follow',
            body: data
        })
        .then( (response) => console.log(response) )
        .catch( (error) => console.log(error) );
    }
    login (e: any){
        e.preventDefault();
        let data = new FormData();
        data.append("username", e.target[0].value);
        data.append("password", e.target[1].value);

        fetch (apiRoot + 'login', {
            method: "POST",
            body: data
        })
        .then( (response) => console.log(response) )
        .catch( (err) => console.log(err) );
    }
    render(){
        let formAction = "/login";
        let formState = "Login";
        let formButton = "to register";
        let confirmPassword = null;
        let spacing = null;
        let action = this.login;
        if (!this.state.isOnLogin){
            formAction = "/register";
            formState = "Register";
            formButton = "to login";
            confirmPassword = <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm password" autoComplete="password"></input>;
            spacing = <br />;
            action = this.register;
        }
        return(
            <div>
                <div>{formState} your Account</div>
                <br />
                <button type="button" onClick={this.changeForm}>{formButton}</button>
                <br />
                <br />
                <form method="post" /*action={formAction}*/ onSubmit={action} >
                    <input type="text" id="username" name="username" placeholder="username" autoComplete="username"></input>
                    <br />
                    <input type="password" id="password" name="password" placeholder="password" autoComplete="password"></input>
                    <br />
                    {confirmPassword}
                    {spacing}
                    <br />
                    <button type="submit">{formState.toLowerCase()}</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)