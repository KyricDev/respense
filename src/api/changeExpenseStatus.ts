import express from 'express';
import { expensescontext } from '../data/usercontext.js';

export default async function changeExpenseStatus(req: express.Request, res: express.Response, next: express.NextFunction){
    let expense = await expensescontext.findOne({where: {id: req.body.id}});
    expense!.isComplete = !expense!.isComplete;
    await expense!.save();
    return res.status(200).send(expense);
}