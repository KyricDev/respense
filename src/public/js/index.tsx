import React from 'react';
import ReactDOM from 'react-dom';
import { apiRoot, siteRoot } from './siteroot';
import { OAuthButton } from './oauthbutton';
 
class Root extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            isOnLogin: true,
            name: '',
            statusText: '',
            isLoggedIn: false
        }
        this.changeForm = this.changeForm.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount(){
        fetch(apiRoot + '', { 
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => this.setState({
            name: data.name, 
            statusText: data.statusText, 
            isLoggedIn: data.isLoggedIn
        }))
    }
    componentDidUpdate(prevProps: any, prevState: any){
        if (this.state.isLoggedIn) {
            console.log("Route to Dashboard . . .");
            window.location.assign(siteRoot + 'dashboard');
        }
    }
    changeForm(){
        let currentState = this.state.isOnLogin;
        this.setState({ isOnLogin: !currentState, statusText: '' });
    }
    register(e: any){
        e.preventDefault();
        let data = new FormData();
        data.append("username", e.target[0].value);
        data.append("password", e.target[1].value);
        data.append("confirmPassword", e.target[2].value);        

        fetch(apiRoot + 'register', { 
            method: 'POST',
            redirect: 'follow',
            body: data
        })
        .then( (response) => response.json())
        .then( (response) => {
            this.setState({
                name: response.name,
                statusText: response.statusText,
                isLoggedIn: response.isLoggedIn
            })
        })
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
        .then( (response) => response.json() )
        .then( (response) => {
            this.setState({
                name: response.name,
                statusText: response.statusText,
                isLoggedIn: response.isLoggedIn
            });
        })    
        .catch( (err) => console.log(err) );
    }
    render(){
        let formState = "Login";
        let formButton = "to register";
        let confirmPassword = null;
        let spacing = null;
        let action = this.login;
        if (!this.state.isOnLogin){
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
                <form method="post" onSubmit={action} >
                    <input type="text" id="username" name="username" placeholder="username" autoComplete="username"></input>
                    <br />
                    <input type="password" id="password" name="password" placeholder="password" autoComplete="password"></input>
                    <br />
                    {confirmPassword}
                    {spacing}
                    <br />
                    <button type="submit">{formState.toLowerCase()}</button>
                    {this.state.statusText}
                </form>
                <OAuthButton />
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)