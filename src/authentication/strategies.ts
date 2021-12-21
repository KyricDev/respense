import passport from "passport";
import LocalStrategy from "passport-local";
import { usercontext } from "../data/usercontext.js";

export async function basicAuth(username: string, password: string, callback?: Function) {
    let user = await usercontext.findOne({ where: { username: 'Dummy0' 
    }});

    console.log(user);
}

//const localStrategy = new LocalStrategy.Strategy();