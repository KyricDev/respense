import express from 'express';
import { expensescontext } from '../data/usercontext.js';

export default async function (req: express.Request, res: express.Response, next: express.NextFunction){
    if (!req.session.userid) return res.status(404).send({'statusText': 'Not Logged In'});
    console.log(req.session.userid);
    if (!req.body.name || !req.body.value) return res.status(404).send({'statusText': 'Name or Value Required'});
    console.log(req.body);
    if (!isNaN(parseInt(req.body.name))) return res.status(404).send({'statusText': 'Name Entered is a Number'});
    if (isNaN(parseInt(req.body.value))) return res.status(404).send({'statusText': 'Value Entered is not a Number'});   

    let date: string | null = req.body.date;
    let periodStart: string | null = req.body.periodStart;
    let periodEnd: string | null = req.body.periodEnd;
    let isChecked: boolean | null = (req.body.isChecked == 'true') ? true : (req.body.isChecked == 'false') ? false : null;

    if (date!.length > 10 || periodStart!.length > 10 || periodEnd!.length > 10) return res.status(404).send({'statusText': 'Date too long'});
    if (isChecked == null) return res.status(404).send({'statusText': 'isChecked not Boolean'});

try{
    if (isChecked){
        if (!periodStart || !periodEnd) return res.status(404).send({'statusText': 'Recurring but Start and End Date Missing'});

        let start: number = (parseInt(periodStart!.slice(0, 4)) * 12) + parseInt(periodStart!.slice(5, 7));
        let end: number = (parseInt(periodEnd!.slice(0, 4)) * 12) + parseInt(periodEnd!.slice(5, 7));
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
        if (!date) return res.status(404).send({'statusText': 'Date is Required'});
        
        await expensescontext.build({
            type: req.body.name, 
            value: req.body.value,
            date: date,
            isRecurring: req.body.isChecked,
            periodStart: null,
            periodEnd: null,
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