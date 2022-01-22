import React from 'react';
import { apiRoot } from './siteroot';

export class ExpenseList extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            name: '',
            expenses: []
        }
    }
    componentDidMount(){
        fetch(apiRoot + 'userinfo', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            let expenses = data.map((data: { id: any, type: any, value: any, description: any, isRevealed: boolean}) => {
                let expense: any = new Object();

                expense.id = data.id;
                expense.type = data.type;
                expense.value = data.value;
                expense.description = data.description;
                expense.isRevealed = false;

                return expense;
            });
            this.setState({name: data.name, expenses: expenses});
        })
        .catch((err) => {
            if (err) console.log(err);
        });
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.shouldReload) {
            this.componentDidMount();
            this.props.reloaded();
        }
    }
    reveal(id: any, e: any){
        let expenses = this.state.expenses;
        let newExpenses = expenses.map((expense: any) => {
            if (expense.id == id) expense.isRevealed = !expense.isRevealed;
            return expense;
        })
        this.setState({expenses: newExpenses});
    }
    render() {
        let expenses = this.state.expenses;
        let expensesList = expenses.map( (expense: {id: any, type: any, value: any, description: any, isRevealed: boolean}) => {
            if (expense.isRevealed)
            return (
                <div key={expense.id} onClick={this.reveal.bind(this, expense.id)}>
                    <div>{expense.type}: {expense.value}</div>
                    <div>{expense.description}</div>
                </div>
            )
            else
            return (
                <div key={expense.id} onClick={this.reveal.bind(this, expense.id)}>click me</div>
            )
        });
        return (
            <div>
                {expensesList}
            </div>
        );
    }
}