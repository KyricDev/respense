import React from 'react';
import ReactDOM from 'react-dom';
import { ExpenseList } from './expenselist';
import { AddExpense } from './addexpense';
import { SignOut } from './signout';

class Dashboard extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = { isAddForm: false, updateList: false };
        this.addForm = this.addForm.bind(this);
        this.reload = this.reload.bind(this);
        this.reset = this.reset.bind(this);
    }
    addForm(){
        this.setState({ isAddForm: !this.state.isAddForm });
    }
    reload(){
        this.setState({ updateList: true });
    }
    reset(){
        this.setState({ updateList: false });
    }
    render() {
        let addExpense = <AddExpense expenseAdded={this.reload}/>;
        let shouldReload = this.state.updateList;
        let cookieArr = decodeURIComponent(document.cookie).split(';');
        let name = '';
        let cookieName = 'respense.cookie=';
        cookieArr.forEach( cookie => {
            if (cookie.charAt(0) == ' ') cookie = cookie.substring(1);
            if (cookie.indexOf(cookieName) == 0) return name = cookie.substring(cookieName.length);
        })
        let disable = true;
        if (!this.state.isAddForm) {
            addExpense = <div></div>
            disable = false;
        }
        return(
            <div className="flex column center-column margin-top-17">
                {addExpense}
                <div className="flex row space-evenly center-column view-width">
                    <div className="roboto name">{`Hello ${name}`}</div>
                    <SignOut />
                </div>
                <ExpenseList disable={disable} shouldReload={shouldReload} reloaded={this.reset}/>
                <button className="button-priority hover button-green" onClick={this.addForm} >Add</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('root')
)