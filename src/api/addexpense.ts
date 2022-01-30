import express from 'express';
import { expensescontext } from '../data/usercontext.js';

export default async function (req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(req.session.userid);
    console.log(req.body);
    let date: string = (req.body.date == '') ? '0' : req.body.date;
    let periodStart: string = (req.body.periodStart == '') ? '0' : req.body.periodStart;
    let periodEnd: string = (req.body.periodEnd == '') ? '0' : req.body.periodEnd;
    let isChecked: boolean = (req.body.isChecked == 'true') ? true : false;
try{
    if (isChecked){
        let start: number = (parseInt(periodStart.slice(0, 4)) * 12) + parseInt(periodStart.slice(5, 7));
        let end: number = (parseInt(periodEnd.slice(0, 4)) * 12) + parseInt(periodEnd.slice(5, 7));
        let period: number = end - start;
        for (let i = 0; i <= period; i++){
            let month = (((start + i) % 12) == 0 ) ? 12 : ((start + i) % 12);
            let year = Math.floor((start + i - 1) / 12)
            let newDate: string = `${year}-${month}`;
            console.log(newDate);
            console.log((start + i - 1)/12)
            await expensescontext.build({
                type: req.body.name, 
                value: req.body.value,
                date:  newDate,
                isRecurring: req.body.isChecked,
                periodStart: periodStart,
                periodEnd: periodEnd,
                UserId: req.session.userid,
                isComplete: false
            })
            .save();
        }
    }
    else{
        await expensescontext.build({
            type: req.body.name, 
            value: req.body.value,
            date: date,
            isRecurring: req.body.isChecked,
            periodStart: parseInt(periodStart),
            periodEnd: parseInt(periodEnd),
            UserId: req.session.userid,
            isComplete: false
        })
        .save();
    }
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