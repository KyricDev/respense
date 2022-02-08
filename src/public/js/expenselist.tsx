import React from 'react';
import { apiRoot } from './siteroot';

class Month extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            month: '', 
            isRevealed: false
        }
        this.reveal = this.reveal.bind(this);
    }
    componentDidMount() {
        this.setState({month: this.props.expenses.month})
    }
    reveal(){
        let revealState = this.state.isRevealed
        this.setState({isRevealed: !revealState});
    }
    render() {
        if (this.state.isRevealed){
            let expenses = this.props.expenses.expenses.map( (expense: any) => {
                return <div key={expense.id} >{expense.type}: {expense.value}</div>
            })
            return (
                <div>
                    <div onClick={this.reveal}>{this.state.month}</div>
                    {expenses}
                </div>
            )
        }
        else{
            return (
                <div>
                    <div onClick={this.reveal}>{this.state.month}</div>
                </div>
            )
        }
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
            console.log(data);
            data.forEach( (data: any) => {
                data.isRevealed = false;
            })
            this.setState({expenses: data});
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
    reveal(year: any){
        let expenses = this.state.expenses;
        let newExpenses = expenses.map((expense: any) => {
            if (expense.year == year) expense.isRevealed = !expense.isRevealed;
            return expense;
        })
        this.setState({expenses: newExpenses});
    }
    render() {
        let expenses = this.state.expenses;
        
        let expensesList = expenses.map( (expense: any) => {
            if (expense.isRevealed){
                let months = expense.months.map( (month: any) => {
                    return <Month key={month.month} expenses={month} />
                }) 
                return (
                    <div key={expense.year} >
                        <div onClick={this.reveal.bind(this, expense.year)}>{expense.year}</div>
                        {months}
                    </div>
                )
            }
            else
            return (
                <div key={expense.year} >
                    <div onClick={this.reveal.bind(this, expense.year)}>{expense.year}</div>
                </div>
            )
        });
        
        return (
            <div>
                {expensesList}
            </div>
        );
    }
}