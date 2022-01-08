import express from 'express';
import { usercontext } from '../data/usercontext.js';
import CustomStrategy from 'passport-custom';

export async function localLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`Login API Called`);

    let username = req.body.username;
    let password = req.body.password;

    console.log(`${username} -- ${password}`);
    console.log(req.session);

    if (username == "") {       
        res.status(404).end("Username is Required");
        return next();
    }

    if (password == "") {
        res.status(404).end("Password is Required");
        return next();
    }

    let user = await usercontext.findOne({where: {username: username}});

    if (!user) {
        res.status(404).end("User does not exist");
        return next();
    }

    if (user.validatePassword(password)) {
        req.session.userid = user.id;
        res.status(200).end("Session Stored");
        return next();
    }

    res.status(200).end("Unexpected Error during Login.");
    return next();
}