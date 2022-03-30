import React from 'react';
import ReactDOM from 'react-dom';
import { apiRoot, siteRoot } from './siteroot';
import { OAuthButton } from './oauthbutton';
class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnLogin: true,
            name: '',
            statusText: '',
            isLoggedIn: false,
            initialState: true
        };
        this.changeForm = this.changeForm.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount() {
        this.setState({ initialState: true });
        fetch(apiRoot + '', {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => this.setState({
            name: data.name,
            statusText: data.statusText,
            isLoggedIn: data.isLoggedIn
        }));
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isLoggedIn) {
            console.log("Route to Dashboard . . .");
            window.location.assign(siteRoot + 'dashboard');
        }
    }
    changeForm() {
        let currentState = this.state.isOnLogin;
        this.setState({
            isOnLogin: !currentState,
            statusText: '',
            initialState: false
        });
    }
    register(e) {
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
            .then((response) => response.json())
            .then((response) => {
            this.setState({
                name: response.name,
                statusText: response.statusText,
                isLoggedIn: response.isLoggedIn
            });
        })
            .catch((error) => console.log(error));
    }
    login(e) {
        e.preventDefault();
        let data = new FormData();
        data.append("username", e.target[0].value);
        data.append("password", e.target[1].value);
        fetch(apiRoot + 'login', {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((response) => {
            this.setState({
                name: response.name,
                statusText: response.statusText,
                isLoggedIn: response.isLoggedIn
            });
        })
            .catch((err) => console.log(err));
    }
    render() {
        let formState = "Login";
        let confirmPassword = null;
        let spacing = null;
        let action = this.login;
        let signInButton = React.createElement("button", { className: "roboto slider-font slider-button to-front", type: "button" }, "Sign In");
        let signUpButton = React.createElement("button", { className: "roboto slider-font slider-button to-front hover", type: "button", onClick: this.changeForm }, "Sign Up");
        let slider = "";
        if (!this.state.initialState) {
            slider = " slide-backward";
            confirmPassword = React.createElement("input", { className: "roboto field slide-out", type: "password", id: "confirmPassword", name: "confirmPassword", placeholder: "confirm password", autoComplete: "password" });
        }
        if (!this.state.isOnLogin) {
            formState = "Register";
            confirmPassword = React.createElement("input", { className: "roboto field slide-in", type: "password", id: "confirmPassword", name: "confirmPassword", placeholder: "confirm password", autoComplete: "password" });
            spacing = React.createElement("br", null);
            action = this.register;
            signInButton = React.createElement("button", { className: "roboto slider-font slider-button to-front hover", type: "button", onClick: this.changeForm }, "Sign In");
            signUpButton = React.createElement("button", { className: "roboto slider-font slider-button to-front", type: "button" }, "Sign Up");
            slider = " slide-forward";
        }
        return (React.createElement("div", { className: "flex center-column column" },
            React.createElement("div", { className: "fira-mono title" }, "RESPENSE"),
            React.createElement("div", { className: "roboto italic" }, "\"Track your Responsibilies\""),
            React.createElement("div", { className: "flex row space-evenly center-column slider-container background-green" },
                React.createElement("div", { className: "absolute slider-button background-yellow slider-position" + slider }),
                signInButton,
                signUpButton),
            React.createElement("form", { className: "flex column center-column", method: "post", onSubmit: action },
                React.createElement("input", { className: "roboto field", type: "text", id: "username", name: "username", placeholder: "username", autoComplete: "username" }),
                React.createElement("input", { className: "roboto field", type: "password", id: "password", name: "password", placeholder: "password" }),
                confirmPassword,
                React.createElement("button", { className: "background-green submit-button roboto hover", type: "submit" }, formState.toUpperCase()),
                React.createElement("div", { className: "roboto status-text" }, this.state.statusText)),
            React.createElement("div", { className: "flex row space-evenly center-column divider-container" },
                React.createElement("span", { className: "divider" }),
                React.createElement("span", { className: "divider-text roboto" }, "Or sign in with"),
                React.createElement("span", { className: "divider" })),
            React.createElement(OAuthButton, null)));
    }
}
ReactDOM.render(React.createElement(Root, null), document.getElementById('root'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHVibGljL2pzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUMsTUFBTSxJQUFLLFNBQVEsS0FBSyxDQUFDLFNBQW1CO0lBQ3hDLFlBQVksS0FBVTtRQUNsQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsRUFBRTtZQUNSLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLEtBQUs7WUFDakIsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQTtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUU7WUFDaEIsTUFBTSxFQUFFLE1BQU07U0FDakIsQ0FBQzthQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDOUIsQ0FBQyxDQUFDLENBQUE7SUFDUCxDQUFDO0lBQ0Qsa0JBQWtCLENBQUMsU0FBYyxFQUFFLFNBQWM7UUFDN0MsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUNELFVBQVU7UUFDTixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsU0FBUyxFQUFFLENBQUMsWUFBWTtZQUN4QixVQUFVLEVBQUUsRUFBRTtZQUNkLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBTTtRQUNYLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEQsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFVLEVBQUU7WUFDeEIsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7YUFDRCxJQUFJLENBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQyxJQUFJLENBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDbkIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2dCQUMvQixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7YUFDbEMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNELEtBQUssQ0FBRSxDQUFNO1FBQ1QsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLEtBQUssQ0FBRSxPQUFPLEdBQUcsT0FBTyxFQUFFO1lBQ3RCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO2FBQ0QsSUFBSSxDQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUU7YUFDckMsSUFBSSxDQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0JBQ25CLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVTtnQkFDL0IsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2FBQ2xDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO0lBQ3hDLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLFlBQVksR0FBRyxnQ0FBUSxTQUFTLEVBQUMsMkNBQTJDLEVBQUMsSUFBSSxFQUFDLFFBQVEsY0FBa0IsQ0FBQTtRQUNoSCxJQUFJLFlBQVksR0FBRyxnQ0FBUSxTQUFTLEVBQUMsaURBQWlELEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsY0FBbUIsQ0FBQTtRQUNoSixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFDO1lBQ3pCLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztZQUMzQixlQUFlLEdBQUcsK0JBQU8sU0FBUyxFQUFDLHdCQUF3QixFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLGlCQUFpQixFQUFDLElBQUksRUFBQyxpQkFBaUIsRUFBQyxXQUFXLEVBQUMsa0JBQWtCLEVBQUMsWUFBWSxFQUFDLFVBQVUsR0FBUyxDQUFDO1NBQzNMO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDO1lBQ3RCLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFDdkIsZUFBZSxHQUFHLCtCQUFPLFNBQVMsRUFBQyx1QkFBdUIsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxpQkFBaUIsRUFBQyxJQUFJLEVBQUMsaUJBQWlCLEVBQUMsV0FBVyxFQUFDLGtCQUFrQixFQUFDLFlBQVksRUFBQyxVQUFVLEdBQVMsQ0FBQztZQUN2TCxPQUFPLEdBQUcsK0JBQU0sQ0FBQztZQUNqQixNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN2QixZQUFZLEdBQUcsZ0NBQVEsU0FBUyxFQUFDLGlEQUFpRCxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLGNBQW1CLENBQUE7WUFDNUksWUFBWSxHQUFHLGdDQUFRLFNBQVMsRUFBQywyQ0FBMkMsRUFBQyxJQUFJLEVBQUMsUUFBUSxjQUFrQixDQUFBO1lBQzVHLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztTQUM3QjtRQUNELE9BQU0sQ0FDRiw2QkFBSyxTQUFTLEVBQUMsMkJBQTJCO1lBQ3RDLDZCQUFLLFNBQVMsRUFBQyxpQkFBaUIsZUFBZTtZQUMvQyw2QkFBSyxTQUFTLEVBQUMsZUFBZSxvQ0FBa0M7WUFDaEUsNkJBQUssU0FBUyxFQUFDLHVFQUF1RTtnQkFDbEYsNkJBQUssU0FBUyxFQUFFLDBEQUEwRCxHQUFHLE1BQU0sR0FBUTtnQkFDMUYsWUFBWTtnQkFDWixZQUFZLENBQ1g7WUFDTiw4QkFBTSxTQUFTLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUUsTUFBTTtnQkFDdEUsK0JBQU8sU0FBUyxFQUFDLGNBQWMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxVQUFVLEdBQVU7Z0JBQ2xJLCtCQUFPLFNBQVMsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFVBQVUsR0FBVTtnQkFDN0csZUFBZTtnQkFDaEIsZ0NBQVEsU0FBUyxFQUFDLDZDQUE2QyxFQUFDLElBQUksRUFBQyxRQUFRLElBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFVO2dCQUNoSCw2QkFBSyxTQUFTLEVBQUMsb0JBQW9CLElBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQU8sQ0FDOUQ7WUFDUCw2QkFBSyxTQUFTLEVBQUMsdURBQXVEO2dCQUNsRSw4QkFBTSxTQUFTLEVBQUMsU0FBUyxHQUFRO2dCQUNqQyw4QkFBTSxTQUFTLEVBQUMscUJBQXFCLHNCQUF1QjtnQkFDNUQsOEJBQU0sU0FBUyxFQUFDLFNBQVMsR0FBUSxDQUMvQjtZQUNOLG9CQUFDLFdBQVcsT0FBRyxDQUNiLENBQ1QsQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQUVELFFBQVEsQ0FBQyxNQUFNLENBQ1gsb0JBQUMsSUFBSSxPQUFHLEVBQ1IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FDbEMsQ0FBQSJ9