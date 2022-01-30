import React from 'react';
import { apiRoot } from './siteroot';

export class AddExpense extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = { isRecurring: false };
        this.submit = this.submit.bind(this);
        this.recurring = this.recurring.bind(this);
    }
    submit(e: any){
        e.preventDefault();
        let form = e.target;
        let data = new FormData();
        data.append("name", form[0].value);
        data.append("value", form[1].value);
        data.append("date", form[2].value);
        data.append("isChecked", form[3].checked);
        data.append("periodStart", form[4].value);
        data.append("periodEnd", form[5].value);

        fetch(apiRoot + 'addexpense', {
            method: 'POST',
            body: data
        })
        .then( (response) => console.log(response))
        .then( () => {this.props.expenseAdded()})
        .catch( (err) => console.error(err) );
    }
    recurring(e: any){
        let isRecurring = e.target.checked;
        this.setState({ isRecurring: isRecurring });
    }
    render(){
        let date = new Date();
        let isRecurring = this.state.isRecurring;

        return(
            <div className="absolute">
                <form method="post" onSubmit={this.submit}>
                    <input type="text" name="name" placeholder="Name of Expense"></input>
                    <input type="text" name="value" placeholder="Value"></input>
                    <input type="month" disabled={isRecurring}></input>
                    <input type="checkbox" name="isRecurring" onChange={this.recurring}></input>
                    <span>
                        <input type="month" disabled={!isRecurring}></input> to <input type="month" disabled={!isRecurring}></input>
                    </span>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}