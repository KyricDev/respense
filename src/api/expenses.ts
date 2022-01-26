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
    try{
        let rawExpenses = await expensescontext.findAll({ where: { UserId: req.session.userid }});
        let expenses: Object[] = [];

        rawExpenses.forEach( expense => {
            if (!expense.isRecurring) {
                expenses.push ({
                    "type": expense.type,
                    "value": expense.value,
                    "month": parseInt( expense.month.slice(5, 7) )
                    //"month": expense.getMonthString()
                });
            }
            else {
                let periodStart: number = parseInt( expense.periodStart.slice(0, 4) ) + parseInt( expense.periodStart.slice(5, 7) );
                let periodEnd: number = parseInt( expense.periodEnd.slice(0, 4) ) + parseInt( expense.periodEnd.slice(5, 7) );
                let monthPeriod: number = periodEnd - periodStart;

                for (let i = 0; i < monthPeriod; i++) {
                    expenses.push({
                      "type": expense.type,
                      "value": expense.value,
                      "month": parseInt( expense.periodStart.slice(5, 7) ) + i
                      //"month": expense.getMonthFromNumber( parseInt( expense.periodStart.slice(5, 7) ) + i )
                    })
                }
            }
        })

        expenses.sort( (element1: any, element2: any) => {
            return element1.month - element2.month
        })
        let newExpenses: any[] = [];
        let expensesIndex = 0;
        expenses.forEach( (current: any, index: number, expense: any) => {
            if (index == 0 || current.month != expense[index - 1].month) {
                newExpenses.push({
                    "month": current.month, 
                    "id": expensesIndex,
                    "expenses": [{
                        "type": current.type,
                        "value": current.value
                    }]
                });
                expensesIndex++;
                return;
            }
            else{
                newExpenses[expensesIndex - 1].expenses.push({
                    "type": current.type,
                    "value": current.value
                })
            }
        })

        res.status(202).send(newExpenses).end();
    }
    catch(err){
        console.log(err);
    }
    return;
}