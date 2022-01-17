import express from 'express';
import { usercontext } from '../data/usercontext.js';
import CustomStrategy from 'passport-custom';

export async function localLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`Login API Called`);

    let username = req.body.username;
    let password = req.body.password;

    if (req.session.userid) {
        let user = await usercontext.findOne({ where: { id: req.session.userid }});
        res.cookie("respense.cookie", user?.username);
        res.status(200)
           .send({"name": user?.username, "statusText": "A user is already logged in" })
           .end();
        return next();
    }

    if (username == "") {       
        res.status(404)
           .send({"statusText": "Username is required"})
           .end();
        return next();
    }

    if (password == "") {
        res.status(404)
           .send({"statusText": "Password is required"})
           .end();
        return next();
    }

    let user = await usercontext.findOne({where: {username: username}});

    if (!user) {
        res.status(404)
           .send({"statusText": "User not found"})
           .end();
        return next();
    }

    if (user.validatePassword(password)) {
        req.session.userid = user.id;
        res.cookie("respense.cookie", user?.username);
        res.status(200)
           .send({"name": user.username, "statusText": "User logged in"})
           .end();
        return next();
    }

    res.status(404)
       .send({"statusText": "Unexpected error during login"})
       .end();
    return next();
}