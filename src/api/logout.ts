import { resolveSrv } from 'dns/promises';
import express from 'express';

export async function localLogout(req: express.Request, res: express.Response, next: express.NextFunction){
    if (!req.session.userid) return res.status(202).send({ "statusText": "User not logged in" }).end();
    req.session.destroy( () => {
        res.clearCookie("respense.cookie");
        res.clearCookie("respense.user");
        res.status(202)
           .send({ "statusText": "User Signed Out" })
           .end();
    });
    return;
}