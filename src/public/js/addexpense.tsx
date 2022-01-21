import React from 'react';

export class AddExpense extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(e: any){
        e.preventDefault();
    }
    render(){
        let date = new Date();
        return(
            <div className="absolute">
                <form method="post" onSubmit={this.submit}>
                    <input type="text" name="name" placeholder="Name of Expense"></input>
                    <input type="text" name="value" placeholder="Value"></input>
                    <input type="month"></input>
                    <input type="checkbox" name="isRecurring"></input>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}