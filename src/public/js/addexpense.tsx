import e from 'express';
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
            periodEnd: '',
            statusText: '',
        };
        this.submit = this.submit.bind(this);
        this.recurring = this.recurring.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.setPeriodStart = this.setPeriodStart.bind(this);
        this.setPeriodEnd = this.setPeriodEnd.bind(this);
        this.toMonth = this.toMonth.bind(this);
        this.toText = this.toText.bind(this);
    }
    componentDidUpdate(prevProps: any, prevState: any){
        if (prevProps.reveal != this.props.reveal) {
            this.setState({ 
                isRecurring: false, 
                month: '', 
                periodStart: '', 
                periodEnd: '',
                statusText: '',
            })
        }
    }
    submit(e: any){
        e.preventDefault();
        let form = e.target;
        let data = new FormData();
        console.log(form);
        data.append("isChecked", form[0].checked);
        data.append("name", form[1].value);
        data.append("value", form[2].value);
        data.append("date", form[3].value);
        data.append("periodStart", form[4].value);
        data.append("periodEnd", form[5].value);

        fetch(apiRoot + 'addexpense', {
            method: 'POST',
            body: data
        })
        .then( (response) => response.json())
        .then( (data) => {
            console.log(data);
            if (data.status == 'success') {
                this.props.expenseAdded();
                this.setState({statusText: 'Expense Added!'})
            }
            else{
                this.setState({statusText: data.statusText})
            }
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
    toMonth(e: any){
        e.target.type = 'month';
    }
    toText(e: any){
        if (e.target.value == '') e.target.type = 'text';
    }
    render(){
        let isRecurring = this.state.isRecurring;
        let toBack = ' to-front';
        if (this.props.reveal == '') toBack = ' to-back';
        let disable = '';
        let disableRecc = ' disable';
        if (isRecurring){
            disable = ' disable';
            disableRecc = '';
        }

        return(
            <div className={"absolute overlay view-width"+toBack}>
                <form className={"empty-container flex column center-row center-column add-expense-container opaque-bg"+this.props.reveal} method="post" onSubmit={this.submit}>
                    <div className="flex row center-row center-column">
                        <input className="auto-size" type="checkbox" name="isRecurring" onChange={this.recurring}></input>
                        <div className="size-12 roboto font-white">Recurring Expense</div>
                    </div>
                    <input className="field-margin" type="text" name="name" placeholder="Name"></input>
                    <input className="field-margin" type="text" name="value" placeholder="Value"></input>
                    <input className={"field-margin transition-opacity opacity-100"+disable} onFocus={this.toMonth} onBlur={this.toText} type="text" disabled={isRecurring} onChange={this.setMonth} value={this.state.month} placeholder="Month & Year" ></input>
                    <input className={"field-margin transition-opacity opacity-100"+disableRecc} onFocus={this.toMonth} onBlur={this.toText} type="text" disabled={!isRecurring} onChange={this.setPeriodStart} value={this.state.periodStart} placeholder="From" ></input>
                    <input className={"field-margin transition-opacity opacity-100"+disableRecc} onFocus={this.toMonth} onBlur={this.toText} type="text" disabled={!isRecurring} onChange={this.setPeriodEnd} value={this.state.periodEnd} placeholder="To" ></input>
                    <div className="roboto size-11 font-yellow error-placeholder">{this.state.statusText}</div>
                    <button className="hover field-margin button-green">Add Expense</button>
                </form>
            </div>
        )
    }
}