import express from 'express';
import { expensescontext } from '../data/usercontext.js';

export default async function updateExpense (req: express.Request, res: express.Response, next: express.NextFunction){
    if (!isNaN(parseInt(req.body.type))) return res.status(404).send({'statusText': 'Type Entered is a Number'});
    if (isNaN(parseInt(req.body.value))) return res.status(404).send({'statusText': 'Value Entered is not a Number'});   
    
    let expense = await expensescontext.findOne({where: {id: req.body.id}});
    expense!.type = req.body.type;
    expense!.value = req.body.value;
    let updatedExp = await expense?.save();
    
    return res.status(200).send(updatedExp);
}