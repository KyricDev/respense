import express from 'express';
import {expensescontext} from '../data/usercontext.js'

export default async function deleteExpense(req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(req.body.id);
    let expense = await expensescontext.findOne({where: {id: req.body.id}});
    await expense?.destroy();
    return res.status(200).send({'status': 'success'});
}