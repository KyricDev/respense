import exp from 'constants';
import e from 'express';
import express from 'express';
import { usercontext, expensescontext } from '../data/usercontext.js'; 

function parseMonth(month: string): string {
    let monthStr = '';
    switch (month){
        case '1':
        case '01':
            monthStr = 'JAN';
        break;
        case '2':
        case '02':
            monthStr = 'FEB';
        break;
        case '3':
        case '03':
            monthStr = 'MAR';
        break;
        case '4':
        case '04':
            monthStr = 'APR';
        break;
        case '5':
        case '05':
            monthStr = 'MAY';
        break;
        case '6':
        case '06':
            monthStr = 'JUN';
        break;
        case '7':
        case '07':
            monthStr = 'JUL';
        break;
        case '8':
        case '08':
            monthStr = 'AUG';
        break;
        case '9':
        case '09':
            monthStr = 'SEP';
        break;
        case '10':
            monthStr = 'OCT';
        break;
        case '11':
            monthStr = 'NOV';
        break;
        case '12':
            monthStr = 'DEC';
        break;
    }
    return monthStr;
}

export default async function (req: express.Request, res: express.Response, next: express.NextFunction){
    /*
    res.status(200)
       .send({
            "name": "Hi",
            "expenses": [
                {   
                    "id": "1",
                    "type": "House", 
                    "value": "4000",
                    "description": "January"
                },
                {
                    "id": "2",
                    "type": "Electricity",
                    "value": "2000",
                    "description": "January" 
                }
            ]
       })
       .end();
    */
    /*
    try{
    }
    catch(err){
        console.log(err);
    }
    return;
    */
    console.log("Find Expenses Called");
    let result = await expensescontext.findOne({where: {UserId: req.session.userid}})
                         .catch(err => console.log(err));
    if (!result) return res.status(202).end();
    
    let rawExpense = await expensescontext.findAll({ where: { UserId: req.session.userid }});
    rawExpense.sort( (expense1, expense2) => {
        let expense1flt = parseFloat(expense1.date.slice(0, 4)) + ( parseFloat(expense1.date.slice(5, 7)) / 12 );
        let expense2flt = parseFloat(expense2.date.slice(0, 4)) + ( parseFloat(expense2.date.slice(5, 7)) / 12 );
        return expense1flt - expense2flt;
    });
    let expenses: any = [];
    let incYear: number = 0;
    let incMonths: number = 0;
    rawExpense.map( (current, index, array) => {
        let year = parseInt(current.date.slice(0, 4));
        let month = parseInt(current.date.slice(5, 7));
        let lastYear = year;
        let lastMonth = month;
        if (index != 0){
            lastYear = parseInt(array[index - 1].date.slice(0, 4));
            lastMonth = parseInt(array[index - 1].date.slice(5, 7));
        }
        //console.log(`${index} -- ${year} || ${lastYear}`);
        if (index == 0){
            expenses.push({
                "year": year,
                "months": [{
                    "month": parseMonth(current.date.slice(5, 7)),
                    "expenses": [{
                        "type": current.type,
                        "value": current.value,
                        "id": current.id,
                    }]
                }],
            })
        }
        else if (year != lastYear) {
            incYear++;
            incMonths = 0;
            expenses.push({
                "year": year,
                "months": [{
                    "month": parseMonth(current.date.slice(5, 7)),
                    "expenses": [{
                        "type": current.type,
                        "value": current.value,
                        "id": current.id,
                    }]
                }],
            })
        }
        else if (month != lastMonth){
            incMonths++;
            expenses[incYear].months.push({
                "month": parseMonth(current.date.slice(5, 7)),
                "expenses": [{
                    "type": current.type,
                    "value": current.value,
                    "id": current.id,
                }]
            })
        }
        else{
            expenses[incYear].months[incMonths].expenses.push({
                "type": current.type,
                "value": current.value,
                "id": current.id,
            })
        }
    })
    /*
    expenses.forEach( (expense: any) => {
        console.log(expense.year);
        expense.months.forEach( (list: any) => {
            console.log(list);
        })
    })
    */
    res.status(202).send(expenses).end();
}