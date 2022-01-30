import exp from 'constants';
import e from 'express';
import express from 'express';
import { usercontext, expensescontext } from '../data/usercontext.js'; 

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
                    "month": current.date.slice(5, 7),
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
                    "month": current.date.slice(5, 7),
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
                "month": current.date.slice(5, 7),
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