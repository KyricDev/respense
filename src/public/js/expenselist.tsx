import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { apiRoot } from './siteroot';

function Expense(props: any){
    const [expense, setExpense] = useState(props.data);
    useEffect( () => {
        setExpense(props.data);
    }, [props] )
    const setComplete = () => {
        fetch(apiRoot + 'changeExpenseStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: expense.id
            })
        })
        .then(() => props.shouldReload(true));
    }
    function deleteexpense(){
        fetch (apiRoot + 'deleteExpense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: expense.id})
        })
        .then(props.shouldReload(true));
    }
    let enable = '';
    if (expense.isComplete) enable = ' enable';

    return <div className="flex row space-between">
                <div className={"hover" + enable} onClick={setComplete} key={expense.id} >{expense.type}: {expense.value}</div>
                <button onClick={deleteexpense} className="font-white hover">delete</button>
           </div>
}

class Month extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            month: '', 
            isRevealed: false
        }
        this.reveal = this.reveal.bind(this);
        this.shouldReload = this.shouldReload.bind(this);
    }
    componentDidMount() {
        this.setState({month: this.props.expenses.month});
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.isRevealed != this.props.shouldReveal) {
            this.setState({isRevealed: this.props.shouldReveal});
        }
    }
    reveal(){
        let revealState = this.state.isRevealed;
        this.setState({isRevealed: !revealState}, () => {
            this.props.hide(this.state.month, this.state.isRevealed) 
        });
    }
    shouldReload(e: any){
        this.props.shouldReload(e);
    }
    render() {
        if (this.state.isRevealed){
            let row = this.props.row;
            let expenses = this.props.expenses.expenses.map( (expense: any, index: any, arr: any) => {
                return <div key={expense.id}>
                          <Expense data={expense} shouldReload={this.shouldReload} />
                       </div>
            })
            return (
                <div className="expense-container focused absolute" style={{transform: `translateY(calc(-90px*${row})`}} >
                    <div className="hover" onClick={this.reveal}>{this.state.month}</div>
                    <div className="size-12 scroll expense-list" >{expenses}</div>
                </div>
            )
        }
        else{
            return (
                <div className="flex column center-column center-row expense-container" >
                    <div className="hover" onClick={this.reveal}>{this.state.month}</div>
                </div>
            )
        }
    }
}

export class ExpenseList extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            expenses: [],
            displayed: { month: '', isRevealed: false },
            year: { index: 0, isRevealed: false },
        }
        this.reveal = this.reveal.bind(this);
        this.hide = this.hide.bind(this);
        this.shouldReload = this.shouldReload.bind(this);
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
            this.setState({ expenses: data, year: { index: (data.length - 1) } });
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
    reveal(){
        let year = this.state.year;
        year.isRevealed = !this.state.year.isRevealed;
        this.setState({ year: year });
    }
    hide(month: any, isRevealed: any){
        let displayed = this.state.displayed;
        displayed.month = month;
        displayed.isRevealed = isRevealed
        this.setState({displayed: displayed});
    }
    changeIndex(index: any){
        let newYear = this.state.year;
        newYear.index = index;
        newYear.isRevealed = false;
        let newDisplayed = this.state.displayed;
        newDisplayed.month = 'all';
        this.setState({ displayed: newDisplayed, year: newYear });
    }
    shouldReload(e: any){
        this.componentDidMount();
    }
    render() {
        let index = this.state.year.index;
        let expenses: any = this.state.expenses[index];
        if (expenses === undefined) return (<div>Loading . . .</div>)
        let expensesList = expenses.months.map( (expense: any, index: any, arr: any) => {
            let shouldReveal = false;
            if (this.state.displayed.month == expense.month) shouldReveal = this.state.displayed.isRevealed;
            if (this.state.displayed.month == 'all') shouldReveal = false; 
            let row = 0;
            switch (index){
                case 0:
                case 1:
                case 2:
                    row = 0;
                    break;
                case 3:
                case 4:
                case 5:
                    row = 1;
                    break;
                case 6:
                case 7:
                case 8:
                    row = 2;
                    break;
                case 9:
                case 10:
                case 11:
                    row = 3;
                    break;
            }
            return <Month key={expense.month} 
                          expenses={expense} 
                          hide={this.hide} 
                          shouldReveal={shouldReveal} 
                          shouldReload={this.shouldReload} 
                          row={row}
            />
        })
        /*
        let expenses: any = this.state.expenses;
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
        */
        let yearList = null;
        let modify = '';
        if (this.state.year.isRevealed) {
            modify = ' bottom-border-straight';
            let list = this.state.expenses.map( (value: any, index: any, arr: any) => {
                return <div className="flex row center-column center-row year-container hover" key={value.year} onClick={this.changeIndex.bind(this, index)}>{value.year}</div>
            })
            yearList = <div className="absolute font-white flex column center-column roboto year-list to-front scroll">{list}</div>
        }
        let disable = '';
        if (this.props.disable) disable = ' disable';
        return (
            <div className={"flex column center-column margin-top-42"+disable}>
                <div className={"flex row center-column center-row font-white year-container roboto hover"+modify} onClick={this.reveal} >{expenses.year}</div>
                {yearList}
                <div> 
                    <div className="flex row font-white roboto expense-row" >{expensesList.slice(0, 3)}</div>
                    <div className="flex row font-white roboto expense-row" >{expensesList.slice(3, 6)}</div>
                    <div className="flex row font-white roboto expense-row" >{expensesList.slice(6, 9)}</div>
                    <div className="flex row font-white roboto expense-row" >{expensesList.slice(9, 12)}</div>
                </div>
            </div>
        );
    }
}