import React from 'react';
import { apiRoot } from './siteroot';

class Expense extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {id: ''}
        this.reveal = this.reveal.bind(this);
    }
    componentDidMount() {
        this.setState({id: this.props.expense.id});
    }
    reveal(){
        this.props.reveal(this.state.id);
    }
    render() {
        return(
            <div onClick={this.reveal}>
                <div>{this.props.expense.type}: {this.props.expense.value}</div>
                <div>{this.props.expense.description}</div>
            </div>
        )
    }
}

export class ExpenseList extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            name: '',
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
            let expenses = data.map((data: { id: any, type: any, value: any, isRevealed: boolean}) => {
                let expense: any = new Object();

                expense.id = data.id;
                expense.type = data.type;
                expense.value = data.value;
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
        
        let expensesList = expenses.map( (expense: {id: any, type: any, value: any, isRevealed: boolean}) => {
            if (expense.isRevealed)
            return (
                /*
                <div key={expense.id} onClick={this.reveal.bind(this, expense.id)}>
                    <div>{expense.type}: {expense.value}</div>
                </div>
                */
               <Expense key={expense.id} expense={expense} reveal={this.reveal} />
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