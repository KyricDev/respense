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
        if (!this.state.isAddForm) addExpense = <div></div>
        let cookieArr = decodeURIComponent(document.cookie).split(';');
        let name = '';
        let cookieName = 'respense.cookie=';
        cookieArr.forEach( cookie => {
            if (cookie.charAt(0) == ' ') cookie = cookie.substring(1);
            if (cookie.indexOf(cookieName) == 0) return name = cookie.substring(cookieName.length);
        })

        return(
            <div>
                {addExpense}
                <div className="fira-mono name">{`Hello ${name}`}</div>
                <ExpenseList shouldReload={shouldReload} reloaded={this.reset}/>
                <SignOut />
                <button onClick={this.addForm} >Add</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('root')
)