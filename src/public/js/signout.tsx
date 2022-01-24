import React from 'react';
import { apiRoot, siteRoot } from './siteroot';

export class SignOut extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        fetch(apiRoot + 'signout', { 
            method: 'POST'
        })
        .then(response => console.log(response))
        .then(() => window.location.assign(siteRoot));
    }
    render(){
        return(
            <div onClick={this.logout}>
                Logout
            </div>
        )
    }
}