import express from 'express';
import { usercontext } from '../data/usercontext.js';
import { User } from '../models/user.js';

export async function localRegister(req: express.Request, res: express.Response, next: express.NextFunction){
    console.log("Register API Called");
    //console.log(req);
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    console.log(`${username} -- ${password} -- ${confirmPassword}`);

    if (username == null || username == '') {
        res.writeHead(404, "Username is Required").end();
        return next();
    }

    if (password == null || confirmPassword == null || password == '' || confirmPassword == '') {
        res.writeHead(404, "Password is Required").end();
        return next();
    }

    if (password !== confirmPassword) {
        res.writeHead(404, "Passwords do not Match").end();
        return next();
    }

    try{
        let user = await usercontext.findOne({where: {username: username} });
        if (user) {
            res.writeHead(404, "User Already Exists").end();
            return next();
        }
    }
    catch(err){
        console.log("User Find Failed");
        throw err
    }

    try{
        let newUser = new User(username, password);
        await usercontext.create(newUser);
        res.status(200).json(newUser);
        return next();
    }
    catch(err){
        console.log("User Creation Failed");
        throw err;
    }
}