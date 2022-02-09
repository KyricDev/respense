import React from 'react';
import { json } from 'sequelize/dist';
import { apiRoot } from './siteroot';

export class AddExpense extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = { 
            isRecurring: false, 
            month: '', 
            periodStart: '', 
            periodEnd: ''
        };
        this.submit = this.submit.bind(this);
        this.recurring = this.recurring.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.setPeriodStart = this.setPeriodStart.bind(this);
        this.setPeriodEnd = this.setPeriodEnd.bind(this);
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
        .then( (response) => response.json())
        .then( (data) => {
            console.log(data);
            if (data.status == 'success') this.props.expenseAdded();
        })
        .catch( (err) => console.error(err) );
    }
    recurring(e: any){
        let isRecurring = e.target.checked;
        this.setState({ isRecurring: isRecurring }, () => {
            if (this.state.isRecurring) this.setState({month: ''});
            else this.setState({periodStart: '', periodEnd: ''});
        });
        
    }
    setMonth(e: any){
        this.setState({month: e.target.value});
    }
    setPeriodStart(e: any){
        this.setState({periodStart: e.target.value});
    }
    setPeriodEnd(e: any){
        this.setState({periodEnd: e.target.value});
    }
    render(){
        let isRecurring = this.state.isRecurring;
        let month = {value: ''}
        let period = {value: ''};
        if (isRecurring) period = null;
        else month = null;

        return(
            <div className="absolute">
                <form method="post" onSubmit={this.submit}>
                    <input type="text" name="name" placeholder="Name of Expense"></input>
                    <input type="text" name="value" placeholder="Value"></input>
                    <input type="month" disabled={isRecurring} onChange={this.setMonth} value={this.state.month} ></input>
                    <input type="checkbox" name="isRecurring" onChange={this.recurring}></input>
                    <span>
                        <input type="month" disabled={!isRecurring} onChange={this.setPeriodStart} value={this.state.periodStart} ></input> to 
                        <input type="month" disabled={!isRecurring} onChange={this.setPeriodEnd} value={this.state.periodEnd} ></input>
                    </span>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}