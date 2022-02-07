import express from 'express';
import { usercontext } from '../data/usercontext.js';

export async function localLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`Login API Called`);

    //let username = req.body.username;
    //let password = req.body.password;
    let username = "Dummy0";
    let password = "Dummy0";
    
    if (req.session.isOAuth){
        res.status(202)
           .send({
                "name": req.session.name, 
                "statusText": "A user is already logged in", 
                "isLoggedIn": true
            })
           .end();
        res.cookie("respense.cookie", req.session.name);
        return;
    }
    
    if (req.session.userid) {
        let user = await usercontext.findOne({ where: { id: req.session.userid }});
        res.cookie("respense.cookie", user?.username);
        res.status(202)
           .send({
                "name": user?.username, 
                "statusText": "A user is already logged in", 
                "isLoggedIn": true
            })
           .end();
        return;
    }

    if (username == "") {       
        res.status(404)
           .send({"statusText": "Username is required", "isLoggedIn": false})
           .end();
        return;
    }

    if (password == "") {
        res.status(404)
           .send({"statusText": "Password is required", "isLoggedIn": false})
           .end();
        return;
    }

    let user = await usercontext.findOne({where: {username: username}});

    if (!user) {
        res.status(404)
           .send({"statusText": "User not found", "isLoggedIn": false})
           .end();
        return;
    }

    if (user.validatePassword(password)) {
        req.session.userid = user.id;
        res.cookie("respense.cookie", user?.username);
        res.status(202)
           .send({
               "name": user.username, 
               "statusText": "User logged in", 
               "isLoggedIn": true
            })
        return;
    }

    res.status(404)
       .send({"statusText": "Unexpected error during login", "isLoggedIn": false})
       .end();
    return;
}