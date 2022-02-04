import { google } from 'googleapis';
import redirect from 'url';
import jwt from 'jsonwebtoken';
const scope = [
    //'https://www.googleapis.com/auth/contacts.readonly',
    //'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    //'https://www.googleapis.com/auth/user.emails.read',
    'profile',
];
const googleClient = new google.auth.OAuth2('425711147539-3foeia0vc7n80d3i7sgi2j6jblfgsmpo.apps.googleusercontent.com', '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', 'http://localhost/googleoauth');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlbG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2dvb2dsZWxvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFcEMsT0FBTyxRQUFRLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUcvQixNQUFNLEtBQUssR0FBRztJQUNWLHNEQUFzRDtJQUN0RCxxREFBcUQ7SUFDckQsZ0RBQWdEO0lBQ2hELHFEQUFxRDtJQUNyRCxTQUFTO0NBQ1osQ0FBQztBQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ3ZDLDBFQUEwRSxFQUMxRSxxQ0FBcUMsRUFDckMsOEJBQThCLENBQ2pDLENBQUE7QUFDRCxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDO0lBQ3JDLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLEtBQUssRUFBRSxLQUFLO0NBQ2YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUUsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO0lBQ3hHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsV0FBVyxDQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUN0RyxJQUFHO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2pDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsc0JBQXNCO1FBQ3RCLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxPQUFPLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxNQUFNLFNBQVMsR0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDbkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDbEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRDs7Ozs7O1VBTUU7UUFDRixPQUFPO0tBQ1Y7SUFDRCxPQUFPLEdBQUcsRUFBRTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7SUFFRCxPQUFPO0FBQ1gsQ0FBQyJ9