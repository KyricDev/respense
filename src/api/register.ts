import express from 'express';
import { usercontext } from '../data/usercontext.js';
import { User } from '../models/user.js';

export async function localRegister(req: express.Request, res: express.Response, next: express.NextFunction){
    console.log("Register API Called");

    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (req.session.userid) {
        let user = await usercontext.findOne({ where: { id: req.session.userid }});
        res.status(202)
           .send({
               "name": user?.username, 
               "statusText": "A user is already logged in", 
               "isLoggedIn": true 
            })
           .end();
        return next();
    }

    if (username == null || username == '') {       
        res.status(404)
           .send({"statusText": "Username is required", "isLoggedIn": false})
           .end();
        return next();
    }

    if (password == null || confirmPassword == null || password == '' || confirmPassword == '') {
        res.status(404)
           .send({"statusText": "Password is required", "isLoggedIn": false})
           .end();
        return next();
    }

    if (password != confirmPassword) {
        res.status(404)
           .send({"statusText": "Passwords do not match", "isLoggedIn": false})
           .end();
        return next();
    }

    try{
        let user = await usercontext.findOne({where: {username: username} });
        if (user) {
            res.status(404)
               .send({"statusText": "User already exists", "isLoggedIn": false})
               .end();
            return next();
        }
    }
    catch(err){
        console.log("User Find Failed");
        throw err;
    }

    try{
        let newUser = new User(username, password);
        await usercontext.create(newUser);
        res.status(202)
           .send({"statusText": "User Created", "isLoggedIn": false})
           .end();
        return next();
    }
    catch(err){
        console.log("User Creation Failed");
        throw err;
    }
}