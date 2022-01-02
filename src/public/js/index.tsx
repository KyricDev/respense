import React from 'react';
import ReactDOM from 'react-dom';

class Root extends React.Component{
    render(){
        return(
            <div>
                <div>Login your Account</div>
                <br />
                <form method="post" action="/login">
                    <input type="text" id="username" name="username" placeholder="username"></input>
                    <br />
                    <input type="password" id="username" name="password" placeholder="password"></input>
                    <br />
                    <br />
                    <input type="submit" value="login"></input>
                    <br />
                    <button type="button">login</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)