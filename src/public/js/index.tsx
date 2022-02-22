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
            isLoggedIn: false,
            initialState: true
        }
        this.changeForm = this.changeForm.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount(){
        this.setState({initialState: true});
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
        this.setState({ 
            isOnLogin: !currentState, 
            statusText: '', 
            initialState: false 
        });
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
        let confirmPassword = null;
        let spacing = null;
        let action = this.login;
        let signInButton = <button className="roboto slider-font slider-button to-front" type="button" >Sign In</button>
        let signUpButton = <button className="roboto slider-font slider-button to-front hover" type="button" onClick={this.changeForm} >Sign Up</button>
        let slider = "";
        if (!this.state.initialState){
            slider = " slide-backward";
        }
        if (!this.state.isOnLogin){
            formState = "Register";
            confirmPassword = <input className="roboto field" type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm password" autoComplete="password"></input>;
            spacing = <br />;
            action = this.register;
            signInButton = <button className="roboto slider-font slider-button to-front hover" type="button" onClick={this.changeForm} >Sign In</button>
            signUpButton = <button className="roboto slider-font slider-button to-front" type="button" >Sign Up</button>
            slider = " slide-forward";
        }
        return(
            <div className="flex center-column column">
                <div className="fira-mono title">RESPENSE</div>
                <div className="roboto italic">"Track your Responsibilies"</div>
                <div className="flex row space-evenly center-column slider-container background-green">
                    <div className={"absolute slider-button background-yellow slider-position" + slider}></div>    
                    {signInButton}
                    {signUpButton}
                </div>
                <form className="flex column center-column" method="post" onSubmit={action} >
                    <input className="roboto field" type="text" id="username" name="username" placeholder="username" autoComplete="username" ></input>
                    <input className="roboto field" type="password" id="password" name="password" placeholder="password" ></input>
                    {confirmPassword}
                    <button className="background-green submit-button roboto hover" type="submit">{formState.toUpperCase()}</button>
                    <div className="roboto status-text">{this.state.statusText}</div>
                </form>
                <div className="flex row space-evenly center-column divider-container">
                    <span className="divider"></span>
                    <span className="divider-text roboto">Or sign in with</span>
                    <span className="divider"></span>
                </div>
                <OAuthButton />
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)