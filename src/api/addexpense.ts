import express from 'express';
import { expensescontext } from '../data/usercontext.js';

export default async function (req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(req.session.userid);
    console.log(req.body);
    let month = req.body.month;
    let periodStart = req.body.periodStart;
    let periodEnd = req.body.periodEnd;

    if (month == '') month = 0;
    if (periodStart == '') periodStart = 0;
    if (periodEnd == '') periodEnd = 0;

    try{
        await expensescontext.build({
            type: req.body.name, 
            value: req.body.value,
            month: month,
            isRecurring: req.body.isChecked,
            periodStart: periodStart,
            periodEnd: periodEnd,
            UserId: req.session.userid
        })
        .save();
    }
    catch(err){
        console.log(err);
    }

    res.status(202).send({
        status: 'success'
    })
    .end();

    return;
}