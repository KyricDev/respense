import express from 'express';
import { usercontext, expensescontext } from '../data/usercontext.js'; 

export default async function (req: express.Request, res: express.Response, next: express.NextFunction){
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
}