import { google } from 'googleapis';
const scope = [
    //'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlbG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2dvb2dsZWxvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHcEMsTUFBTSxLQUFLLEdBQUc7SUFDVixzREFBc0Q7SUFDdEQsa0RBQWtEO0lBQ2xELGdEQUFnRDtJQUNoRCxxREFBcUQ7SUFDckQsU0FBUztDQUNaLENBQUM7QUFDRixNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUN2QywwRUFBMEUsRUFDMUUscUNBQXFDLEVBQ3JDLDhCQUE4QixDQUNqQyxDQUFBO0FBQ0QsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQztJQUNyQyxXQUFXLEVBQUUsUUFBUTtJQUNyQixLQUFLLEVBQUUsS0FBSztDQUNmLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUN4RyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLFdBQVcsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDdEcsSUFBRztRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUksR0FBUSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNqQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUN6QixPQUFPLEVBQUUsSUFBSTtZQUNiLGtEQUFrRDtZQUNsRCxJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsWUFBWSxFQUFFLFdBQVc7WUFDekIsWUFBWSxFQUFFLGdCQUFnQjtTQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckI7SUFDRCxPQUFPLEdBQUcsRUFBRTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7SUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixPQUFPO0FBQ1gsQ0FBQyJ9