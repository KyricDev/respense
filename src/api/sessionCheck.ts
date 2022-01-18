import express from 'express';
import { is } from 'sequelize/dist/lib/operators';
import { usercontext } from '../data/usercontext.js';

export default async function (req: express.Request, res: express.Response, next: express.NextFunction){
    if (req.session.userid){
        try{ 
            let user = await usercontext.findOne({where: {id: req.session.userid}});
            if (!user) {
                req.session.destroy( () => {
                    res.clearCookie("respense.cookie");
                    res.status(404)
                       .send({"statusText": "User not found", "isLoggedIn": false})
                       .end();
                    return next();
                });   
            }
            res.cookie("respense.cookie", user?.username);
            res.status(202)
               .send({"statusText": "User is already logged in", "isLoggedIn": true})
               .end();
            return next();
        }
        catch(err){
            console.log(err);
            return next();
        }
    }
}