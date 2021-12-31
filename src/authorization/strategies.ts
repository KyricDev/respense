import passport from 'passport';
import LocalStrategy from 'passport-local';
import CookieStrategy from 'passport-cookie';
import express from 'express';
import { usercontext } from '../data/usercontext.js';

async function verify(req: any, username: any, password: any, done: Function) {
    console.log('verifying . . .');
    let reqid = req.session.passport.user;
    console.log(reqid);
    let user = await usercontext.findByPk(reqid);
    console.log(req.cookie);
    console.log(req);

    if (!user) {
        console.log("User not found");
        return done(null, false, "User not Found");
    }

    return done(null, user, "User Found");
}

export const localAuthorization = new LocalStrategy.Strategy({passReqToCallback: true}, verify);

async function verifyCookie(req: any, token: any, done: Function) {
    console.log('verifying cookie');
    console.log(req.session);
    console.log(token);

    done(null, true, "true");
}

export const authorizeCookie = new CookieStrategy({cookieName: 'respense.user', passReqToCallback: true}, verifyCookie);