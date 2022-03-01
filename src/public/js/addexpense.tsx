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

        return(
            <div className="absolute overlay view-width">
                <form className="flex column center-row center-column add-expense-container opaque-bg" method="post" onSubmit={this.submit}>
                    <div className="flex row center-row center-column">
                        <input className="auto-size" type="checkbox" name="isRecurring" onChange={this.recurring}></input>
                        <div className="size-12 roboto font-white">Recurring Expense</div>
                    </div>
                    <input className="field-margin" type="text" name="name" placeholder="Name"></input>
                    <input className="field-margin" type="text" name="value" placeholder="Value"></input>
                    <input className="field-margin" type="month" disabled={isRecurring} onChange={this.setMonth} value={this.state.month} placeholder="MONTH & YEAR" ></input>
                    <input className="field-margin" type="month" disabled={!isRecurring} onChange={this.setPeriodStart} value={this.state.periodStart} placeholder="FROM" ></input>
                    <input className="field-margin" type="month" disabled={!isRecurring} onChange={this.setPeriodEnd} value={this.state.periodEnd} placeholder="TO" ></input>
                    <button className="field-margin button-green">Add Expense</button>
                </form>
            </div>
        )
    }
}