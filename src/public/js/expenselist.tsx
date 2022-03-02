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
    let enable = ' darken';
    let background = '';
    if (expense.isComplete) {
        enable = ' enable';
        background = ' bg-green';
    }
    return <tr className="size-12">
                <td className="checkbox-cell right-text flex center-column center-row">
                    <div className={"checkbox"+background} onClick={setComplete}>
                    </div>
                </td>
                <td className={enable}>{expense.type}</td>
                <td className={enable}>{expense.value}</td>
                <td>
                    <div onClick={deleteexpense} className="flex center-column center-row hover">
                        <svg 
                            width="17" 
                            height="17" 
                            viewBox="0 0 17 17" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle 
                                cx="8.5" 
                                cy="8.5" 
                                r="8" 
                                fill="white"
                            />
                            <path 
                                d="M8.06753 16.9885C5.48718 16.8505 3.13085 15.5691 1.6114 13.4778C0.466307 11.9017 -0.105547 9.93317 0.016081 7.98621C0.181902 5.33182 1.53944 2.95378 3.74675 1.45105C6.23157 -0.240606 9.51888 -0.471642 12.2234 0.855292C13.0726 1.27188 13.7623 1.75904 14.4335 2.4162C14.8386 2.81283 15.1361 3.15842 15.4346 3.57909C16.74 5.41865 17.2542 7.67045 16.8818 9.91627C16.4982 12.2292 15.1458 14.2997 13.166 15.6051C11.6768 16.587 9.84642 17.0836 8.06753 16.9885ZM10.9394 13.3167C11.3389 13.2002 11.6371 12.908 11.7577 12.5148C11.7882 12.4154 11.7896 12.2755 11.7896 9.45236C11.7896 6.75131 11.7871 6.48536 11.7609 6.39427L11.7322 6.2945L12.1687 6.2944C12.4197 6.29434 12.6331 6.28657 12.6708 6.2761C12.8175 6.23534 12.9317 6.07645 12.9318 5.91277C12.9318 5.76536 12.861 5.64936 12.7267 5.57708C12.6589 5.54059 12.6385 5.53962 11.846 5.53474L11.0348 5.52977V5.08207C11.0348 4.57229 11.0181 4.46693 10.9018 4.24189C10.8068 4.05805 10.6005 3.85781 10.409 3.76339C10.1517 3.63658 10.2152 3.64042 8.37987 3.64042C6.54648 3.64042 6.61445 3.63632 6.35283 3.76294C6.1431 3.86444 5.94958 4.05794 5.84807 4.26765C5.73957 4.49178 5.72559 4.58567 5.72524 5.09231L5.72492 5.52977L4.91368 5.53475L4.10246 5.53974L4.01964 5.58841C3.90625 5.65506 3.8461 5.75031 3.83687 5.87781C3.82798 6.00066 3.85448 6.08681 3.92628 6.16858C4.03051 6.28728 4.06376 6.29369 4.57717 6.29412C5.00567 6.29444 5.03377 6.29642 5.02251 6.32487C4.96302 6.4752 4.96201 6.52683 4.96171 9.44008C4.96138 12.6358 4.95391 12.4381 5.08521 12.7114C5.1668 12.8813 5.35191 13.0874 5.50656 13.1807C5.63092 13.2557 5.79907 13.3166 5.93723 13.3367C5.9993 13.3457 7.07334 13.3513 8.44058 13.3498C10.665 13.3473 10.8426 13.345 10.9394 13.3167ZM6.63595 12.5672C6.47047 12.5307 6.34534 12.4768 6.21717 12.3868C6.00934 12.2408 5.86259 12.0449 5.78115 11.8048L5.73362 11.6646V9.44369V7.22277L5.78115 7.08261C5.89773 6.73884 6.16869 6.4673 6.51076 6.35145L6.6533 6.30318L8.31914 6.29824C10.1934 6.29269 10.1399 6.28959 10.4091 6.41913C10.6997 6.55889 10.9422 6.8699 11.0088 7.18807C11.0468 7.36965 11.0468 11.5177 11.0088 11.6993C10.9423 12.017 10.703 12.3237 10.4101 12.4668C10.145 12.5962 10.1974 12.593 8.36759 12.5915C7.08576 12.5904 6.71795 12.5852 6.63595 12.5672ZM7.00524 11.8025C7.0866 11.7685 7.15889 11.7004 7.20149 11.6176C7.23354 11.5553 7.23461 11.4854 7.23461 9.44369C7.23461 7.40197 7.23354 7.3321 7.20149 7.2698C7.13285 7.13637 7.00837 7.05773 6.86673 7.05832C6.70837 7.05895 6.57427 7.14637 6.5154 7.28728C6.49154 7.34439 6.48845 7.59173 6.48845 9.44369C6.48845 11.7345 6.48252 11.6008 6.58915 11.7145C6.68922 11.8212 6.86926 11.8593 7.00524 11.8025ZM8.59169 11.7681C8.64022 11.7344 8.68282 11.6836 8.71391 11.6223L8.76163 11.5282V9.44369V7.35913L8.71391 7.26503C8.68265 7.2034 8.64023 7.15294 8.59094 7.11878C8.52314 7.07177 8.50243 7.06662 8.38145 7.06662C8.26431 7.06662 8.23808 7.07265 8.17567 7.11394C8.13634 7.13997 8.08224 7.19853 8.05547 7.24407L8.00679 7.32688L8.00217 9.40611C7.99915 10.77 8.00361 11.5078 8.01514 11.5506C8.04107 11.6469 8.12295 11.7494 8.2088 11.7929C8.32104 11.8499 8.48943 11.839 8.59169 11.7681ZM10.0419 11.8025C10.1233 11.7685 10.1956 11.7004 10.2382 11.6176C10.2702 11.5553 10.2713 11.4854 10.2713 9.44369C10.2713 7.40197 10.2702 7.3321 10.2382 7.2698C10.1685 7.13438 10.0426 7.05794 9.88923 7.05794C9.75111 7.05794 9.62606 7.13798 9.55825 7.2698C9.5262 7.3321 9.52514 7.40197 9.52514 9.44369C9.52514 11.4854 9.5262 11.5553 9.55825 11.6176C9.65041 11.7967 9.86203 11.8776 10.0419 11.8025ZM6.70536 5.11645C6.41149 4.98041 6.41921 4.55492 6.71781 4.4302C6.77456 4.4065 6.97569 4.40326 8.38868 4.40326C9.94454 4.40326 9.99711 4.40432 10.0611 4.43694C10.1342 4.47427 10.2301 4.57489 10.2551 4.64055C10.2829 4.71353 10.2741 4.86773 10.2382 4.93749C10.1994 5.0128 10.129 5.08196 10.0509 5.12134C10.001 5.14652 9.83305 5.1493 8.38507 5.14896C6.85469 5.14865 6.77132 5.14699 6.70536 5.11645Z" 
                                fill="#A50104"
                            />
                        </svg>
                    </div>
                </td>
                <td className="checkbox-cell"></td>
           </tr>
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
                return <Expense key={expense.id} data={expense} shouldReload={this.shouldReload} />
            })
            return (
                <div className="expense-container focused absolute" style={{transform: `translateY(calc(-90px*${row})`}} >
                    <div className="hover center-text margin-top-17" onClick={this.reveal}>{this.state.month}</div>
                    <div className="expense-list scroll">
                        <table className="margin-top-17">
                            <tbody>
                            <tr className="color-orange size-14 roboto weight-normal">
                                <th className="checkbox-cell"></th>
                                <th>NAME</th>
                                <th>VALUE</th>
                                <th>ACTIONS</th>
                                <th className="checkbox-cell"></th>
                            </tr>
                            {expenses}
                            </tbody>
                        </table>
                    </div>
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