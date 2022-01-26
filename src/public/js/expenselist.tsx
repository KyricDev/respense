import React from 'react';
import { apiRoot } from './siteroot';

class Expense extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {id: ''}
        this.reveal = this.reveal.bind(this);
    }
    componentDidMount() {
        this.setState({id: this.props.id});
    }
    reveal(){
        this.props.reveal(this.state.id);
    }
    render() {
        let expenses = this.props.expense.map( (expense: any) => {
            return <div>{expense.type}: {expense.value}</div>
        })
        return(
            <div key={this.state.id} onClick={this.reveal}>
                {expenses}
            </div>
        )
    }
}

export class ExpenseList extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            expenses: []
        }
        this.reveal = this.reveal.bind(this);
    }
    componentDidMount(){
        fetch(apiRoot + 'expenses', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            let expenses = data.map((data: { month: any, 
                                             id: any, 
                                             expenses: [{ type: any, 
                                                          value: any 
                                             }]
                                           }) => {
                let expense: any = new Object();

                expense.id = data.id;
                expense.month = data.month;
                expense.expenses = data.expenses;
                expense.isRevealed = false;

                return expense;
            });
            this.setState({expenses: expenses});
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
    reveal(id: any){
        let expenses = this.state.expenses;
        let newExpenses = expenses.map((expense: any) => {
            if (expense.id == id) expense.isRevealed = !expense.isRevealed;
            return expense;
        })
        this.setState({expenses: newExpenses});
    }
    render() {
        let expenses = this.state.expenses;
        
        let expensesList = expenses.map( (expense: { id: any, month: any, isRevealed: boolean, expenses: {type: any, value: any}}) => {
            if (expense.isRevealed)
            return (
                /*
                <div key={expense.id} onClick={this.reveal.bind(this, expense.id)}>
                    <div>{expense.type}: {expense.value}</div>
                </div>
                */
               <Expense key={expense.id} expense={expense.expenses} id={expense.id} reveal={this.reveal} />
            )
            else
            return (
                <div key={expense.id} onClick={this.reveal.bind(this, expense.id)}>{expense.month}</div>
            )
        });
        
        return (
            <div>
                {expensesList}
            </div>
        );
    }
}