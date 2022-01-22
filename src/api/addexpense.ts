import express from 'express';
import { expensescontext } from '../data/usercontext.js';

export default function (req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(req.session.userid);
    console.log(req.body);

    expensescontext.build({
        userid: req.session.userid,
        type: req.body.name, 
        value: req.body.value,
        month: req.body.month.slice(0, 4),
        year: req.body.month.slice(6, 8)
    }).save();

    res.status(202).send({
        status: 'success'
    })

    return next();
}