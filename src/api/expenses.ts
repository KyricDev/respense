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
        let expenses = await expensescontext.findAll({ where: { UserId: req.session.userid }});

        let newExpenses = expenses.map( expense => {
            if (!expense.isRecurring) {
                return ({
                    "type": expense.type,
                    "value": expense.value,
                    "month": expense.getMonthString()
                });
            }
        })

        res.status(202).send(expenses).end();
    }
    catch(err){
        console.log(err);
    }
    return;
}