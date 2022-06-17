import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import redirect from 'url';
import jwt from 'jsonwebtoken';
import { usercontext } from '../data/usercontext.js';
import {siteRoot} from '../public/js/siteroot.js';
import fs from 'fs';

const scope = [
    //'https://www.googleapis.com/auth/contacts.readonly',
    //'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    //'https://www.googleapis.com/auth/user.emails.read',
    'profile',
];

//let settings = JSON.parse( fs.readFileSync('src/appsettings.json', 'utf8') ) ;

const googleClient = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET, 
    siteRoot + 'googleoauth'
)
const url = googleClient.generateAuthUrl({
    access_type: 'online',
    scope: scope,
});

export async function googleGetCode (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.redirect(url);
}

export async function googleLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
    try{
        console.log(req.query.code);
        const code: any = req.query.code;
        const { tokens } = await googleClient.getToken(code);
        //console.log(tokens);
        googleClient.setCredentials(tokens);
        const idToken: any = tokens.id_token;
        const tokenData: any =jwt.decode(idToken);
        req.session.userid = tokenData.sub;
        req.session.isOAuth = true;
        req.session.name = tokenData.name;
        res.redirect(redirect.format({ pathname: "/" }));
        /*
        res.send({
                "name": info.data.etag,
                "statusText": "User Logged In",
                "isLoggedIn": true,
            });
        */
        return;
    }
    catch (err) {
        console.log(err);
    }

    return;
}