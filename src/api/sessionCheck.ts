import express from 'express';
import { is } from 'sequelize/dist/lib/operators';
import { usercontext } from '../data/usercontext.js';

export default async function (req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(req.session);
    if (req.session.userid){
        try{ 
            let user = await usercontext.findOne({where: {id: req.session.userid}});
            if (!user) {
                req.session.destroy( () => {
                    res.clearCookie("respense.cookie");
                    res.status(404)
                       .send({"statusText": "User not found", "isLoggedIn": false})
                       .end();
                    return;
                });   
            }
            res.cookie("respense.cookie", user?.username);
            res.status(202)
               .send({"statusText": "User is already logged in", "isLoggedIn": true})
               .end();
            return;
        }
        catch(err){
            console.log(err);
            return;
        }
    }
    else{
        res.status(202)
            .send({"statusText": "", "isLoggedIn": false})
            .end();
        return;
    }
}