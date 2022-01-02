import passport, { session } from 'passport';
import LocalStrategy from 'passport-local';
import CookieStrategy from 'passport-cookie';
import express from 'express';
import { usercontext } from '../data/usercontext.js';
import cookieParser from 'cookie-parser';

async function verifyCookie(req: any, token: any, done: Function) {
    console.log('verifying cookie');
    /*
    let data: any = cookieParser.signedCookie(token, 'secret respense')
    let buffer = Buffer.from(data, 'hex');
    console.log(`output: ${buffer.toString("utf8")}`);*/
    console.log(req.session);
    console.log(token);

    done(null, true, "true");
}

export const authorizeCookie = new CookieStrategy({cookieName: 'respense.user', passReqToCallback: true}, verifyCookie);