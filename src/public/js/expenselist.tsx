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
    render() {
        if (this.state.isRevealed){
            let expenses = this.props.expenses.expenses.map( (expense: any) => {
                return <div className="size-12" key={expense.id} >{expense.type}: {expense.value}</div>
            })
            return (
                <div className="expense-container hover" >
                    <div onClick={this.reveal}>{this.state.month}</div>
                    {expenses}
                </div>
            )
        }
        else{
            return (
                <div className="expense-container hover" >
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
            expenses: [],
            displayed: { month: '', isRevealed: false },
            year: { index: 0, isRevealed: false },
        }
        this.reveal = this.reveal.bind(this);
        this.hide = this.hide.bind(this);
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
    render() {
        let index = this.state.year.index;
        let expenses: any = this.state.expenses[index];
        if (expenses === undefined) return (<div>Loading . . .</div>)
        let expensesList = expenses.months.map( (expense: any) => {
            let shouldReveal = false;
            if (this.state.displayed.month == expense.month) shouldReveal = this.state.displayed.isRevealed;
            if (this.state.displayed.month == 'all') shouldReveal = false; 
            return <Month key={expense.month} expenses={expense} hide={this.hide} shouldReveal={shouldReveal} />
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
        if (this.state.year.isRevealed) {
            let list = this.state.expenses.map( (value: any, index: any, arr: any) => {
                return <div className="year-container hover" key={value.year} onClick={this.changeIndex.bind(this, index)}>{value.year}</div>
            })
            yearList = <div className="absolute font-white flex column center-column roboto year-list">{list}</div>
        }
        return (
            <div className="flex column center-column">
                <div className="font-white year-container roboto hover" onClick={this.reveal} >{expenses.year}</div>
                {yearList}
                <div> 
                    <div className="flex row font-white roboto" >{expensesList.slice(0, 3)}</div>
                    <div className="flex row font-white roboto" >{expensesList.slice(3, 6)}</div>
                    <div className="flex row font-white roboto" >{expensesList.slice(6, 9)}</div>
                    <div className="flex row font-white roboto" >{expensesList.slice(9, 12)}</div>
                </div>
            </div>
        );
    }
}