import React from 'react';
import ReactDOM from 'react-dom';
import { apiRoot } from './siteroot';
import { ExpenseList } from './expenselist';
import { AddExpense } from './addexpense';

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

        if (!this.state.isAddForm){
            addExpense = <div></div>
        }

        return(
            <div>
                {addExpense}
                <ExpenseList shouldReload={shouldReload} reloaded={this.reset}/>
                <button onClick={this.addForm} >Add</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('root')
)