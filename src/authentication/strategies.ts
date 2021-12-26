import passport from "passport";
import LocalStrategy from "passport-local";
import { usercontext } from "../data/usercontext.js";
import  bcrypt  from "bcrypt";

async function basicAuth(username: string, password: string, done: Function) {
    try{
        let user = await usercontext.findOne({ where: { username: username 
        }});

        if (!user) return done(null, false, { message: "User not found"});

        if (!user.validatePassword(password)) return done(null, false, { message: "Username and/or Password Incorrect"});

        console.log("Login Successful!");
    }
    catch(err){
        throw err;
    }    
}

export const localStrategy = new LocalStrategy.Strategy(basicAuth);