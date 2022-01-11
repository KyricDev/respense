import express from 'express';
import { usercontext } from '../data/usercontext.js';
import CustomStrategy from 'passport-custom';

export async function localLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`Login API Called`);

    let username = req.body.username;
    let password = req.body.password;

    if (req.session.userid) {
        res.writeHead(404, "User is not logged in").end();
        return next();
    }

    if (username == "") {       
        res.writeHead(404, "Username is required").end();
        return next();
    }

    if (password == "") {
        res.writeHead(404, "Password is required").end();
        return next();
    }

    let user = await usercontext.findOne({where: {username: username}});

    if (!user) {
        res.writeHead(404, "User does not exist").end();
        return next();
    }

    if (user.validatePassword(password)) {
        req.session.userid = user.id;
        res.writeHead(404, "Logged In").end();
        return next();
    }

    res.status(404).end("Unexpected Error during Login.");
    return next();
}