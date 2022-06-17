import { google } from 'googleapis';
import redirect from 'url';
import jwt from 'jsonwebtoken';
import { siteRoot } from '../public/js/siteroot.js';
const scope = [
    //'https://www.googleapis.com/auth/contacts.readonly',
    //'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    //'https://www.googleapis.com/auth/user.emails.read',
    'profile',
];
//let settings = JSON.parse( fs.readFileSync('src/appsettings.json', 'utf8') ) ;
const googleClient = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, siteRoot + 'googleoauth');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlbG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2dvb2dsZWxvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFcEMsT0FBTyxRQUFRLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUUvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsTUFBTSxLQUFLLEdBQUc7SUFDVixzREFBc0Q7SUFDdEQscURBQXFEO0lBQ3JELGdEQUFnRDtJQUNoRCxxREFBcUQ7SUFDckQsU0FBUztDQUNaLENBQUM7QUFFRixnRkFBZ0Y7QUFFaEYsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUN6QixRQUFRLEdBQUcsYUFBYSxDQUMzQixDQUFBO0FBQ0QsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQztJQUNyQyxXQUFXLEVBQUUsUUFBUTtJQUNyQixLQUFLLEVBQUUsS0FBSztDQUNmLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUN4RyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLFdBQVcsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDdEcsSUFBRztRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUksR0FBUSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNqQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELHNCQUFzQjtRQUN0QixZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sT0FBTyxHQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDckMsTUFBTSxTQUFTLEdBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakQ7Ozs7OztVQU1FO1FBQ0YsT0FBTztLQUNWO0lBQ0QsT0FBTyxHQUFHLEVBQUU7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsT0FBTztBQUNYLENBQUMifQ==