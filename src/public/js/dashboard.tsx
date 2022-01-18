import e from 'express';
import React from 'react';
import ReactDOM from 'react-dom';
import { any } from 'sequelize/dist/lib/operators';
import { apiRoot } from './siteroot';

class Dashboard extends React.Component<any, any>{
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
            let expenses: any = [];
            let array: any = data.expenses;
            array.forEach((data: { id: any, type: any, value: any, description: any, }) => {
                let expense: any = new Object();

                expense.id = data.id;
                expense.type = data.type;
                expense.value = data.value;
                expense.description = data.description;

                expenses.push(expense);
            })
            this.setState({name: data.name, expenses: expenses})
        })
        .catch((err) => {
            if (err) console.log(err);
        });
    }
    render() {
        let expenses = this.state.expenses;
        console.log(expenses);

        let expensesList = expenses.map( (expense: {id: any, type: any, value: any, description: any}) => {
                                return (
                                    <div key={expense.id}>
                                        <div>{expense.type}: {expense.value}</div>
                                        <div>{expense.description}</div>
                                    </div>
                                )
                            });
        console.log(expensesList);
        return (
            <div>
                {expensesList}
            </div>
        );
    }
}

ReactDOM.render(
    <Dashboard />,
    document.getElementById('root')
)