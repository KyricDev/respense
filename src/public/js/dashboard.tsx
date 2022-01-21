import React from 'react';
import ReactDOM from 'react-dom';
import { apiRoot } from './siteroot';
import { ExpenseList } from './expenselist';
import { AddExpense } from './addexpense';

class Dashboard extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = { isAddForm: false };
        this.addForm = this.addForm.bind(this);
    }
    addForm(){
        this.setState({ isAddForm: !this.state.isAddForm });
    }
    render() {
        let addExpense = <AddExpense />;

        if (!this.state.isAddForm){
            addExpense = <div></div>
        }

        return(
            <div>
                {addExpense}
                <ExpenseList />
                <button onClick={this.addForm}>Add</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('root')
)