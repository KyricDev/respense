import { google } from 'googleapis';
import redirect from 'url';
import jwt from 'jsonwebtoken';
import { siteRoot } from '../public/js/siteroot.js';
import fs from 'fs';
const scope = [
    //'https://www.googleapis.com/auth/contacts.readonly',
    //'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    //'https://www.googleapis.com/auth/user.emails.read',
    'profile',
];
let settings = JSON.parse(fs.readFileSync('src/appsettings.json', 'utf8'));
const googleClient = new google.auth.OAuth2(settings.clientID, settings.clientSecret, siteRoot + 'googleoauth');
const url = googleClient.generateAuthUrl({
    access_type: 'online',
    scope: scope,
});
export async function googleGetCode(req, res, next) {
    res.redirect(url);
}
export async function googleLogin(req, res, next) {
    try {
        console.log(req.query.code);
        const code = req.query.code;
        const { tokens } = await googleClient.getToken(code);
        //console.log(tokens);
        googleClient.setCredentials(tokens);
        const idToken = tokens.id_token;
        const tokenData = jwt.decode(idToken);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlbG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2dvb2dsZWxvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFcEMsT0FBTyxRQUFRLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUUvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXBCLE1BQU0sS0FBSyxHQUFHO0lBQ1Ysc0RBQXNEO0lBQ3RELHFEQUFxRDtJQUNyRCxnREFBZ0Q7SUFDaEQscURBQXFEO0lBQ3JELFNBQVM7Q0FDWixDQUFDO0FBRUYsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRSxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFFLENBQUU7QUFFOUUsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FDdkMsUUFBUSxDQUFDLFFBQVEsRUFDakIsUUFBUSxDQUFDLFlBQVksRUFDckIsUUFBUSxHQUFHLGFBQWEsQ0FDM0IsQ0FBQTtBQUNELE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUM7SUFDckMsV0FBVyxFQUFFLFFBQVE7SUFDckIsS0FBSyxFQUFFLEtBQUs7Q0FDZixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsS0FBSyxVQUFVLGFBQWEsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDeEcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUUsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO0lBQ3RHLElBQUc7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDakMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxzQkFBc0I7UUFDdEIsWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxNQUFNLE9BQU8sR0FBUSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3JDLE1BQU0sU0FBUyxHQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUNuQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNsQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pEOzs7Ozs7VUFNRTtRQUNGLE9BQU87S0FDVjtJQUNELE9BQU8sR0FBRyxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtJQUVELE9BQU87QUFDWCxDQUFDIn0=