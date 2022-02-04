import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import redirect from 'url';
import jwt from 'jsonwebtoken';
import { usercontext } from '../data/usercontext.js';

const scope = [
    //'https://www.googleapis.com/auth/contacts.readonly',
    //'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    //'https://www.googleapis.com/auth/user.emails.read',
    'profile',
];
const googleClient = new google.auth.OAuth2(
    '425711147539-3foeia0vc7n80d3i7sgi2j6jblfgsmpo.apps.googleusercontent.com', 
    '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', 
    'http://localhost/googleoauth'
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