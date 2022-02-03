import express from 'express';
import { google } from 'googleapis';
import path from 'path';

const scope = [
    //'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
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
        googleClient.setCredentials(tokens);
        const people = google.people({
            version: 'v1',
            //auth: 'AIzaSyAVnFgO6jKNto714EaC_RV7jWfWa0Q-jK8',
            auth: googleClient,
        });
        let info = await people.people.get(({
            resourceName: 'people/me',
            personFields: 'emailAddresses'
        }));
        console.log(info);
    }
    catch (err) {
        console.log(err);
    }
    
    res.status(202).send("End");
    return;
}