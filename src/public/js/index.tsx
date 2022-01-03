import React from 'react';
import ReactDOM from 'react-dom';
import { any } from 'sequelize/dist/lib/operators';

class Root extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            isOnLogin: true
        }
        this.changeForm = this.changeForm.bind(this);
    }
    changeForm(){
        let currentState = this.state.isOnLogin;
        this.setState({ isOnLogin: !currentState});
    }
    render(){
        let formAction = "/login";
        let formState = "Login";
        let formButton = "to register";
        let confirmPassword = null;
        let spacing = null;
        if (!this.state.isOnLogin){
            formAction = "/register";
            formState = "Register";
            formButton = "to login";
            confirmPassword = <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm password" autoComplete="password"></input>;
            spacing = <br />;
        }
        return(
            <div>
                <div>{formState} your Account</div>
                <br />
                <button type="button" onClick={this.changeForm}>{formButton}</button>
                <br />
                <br />
                <form method="post" action={formAction}>
                    <input type="text" id="username" name="username" placeholder="username" autoComplete="username"></input>
                    <br />
                    <input type="password" id="password" name="password" placeholder="password" autoComplete="password"></input>
                    <br />
                    {confirmPassword}
                    {spacing}
                    <br />
                    <input type="submit" value={formState.toLowerCase()}></input>
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)