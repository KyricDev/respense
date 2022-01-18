import { usercontext } from '../data/usercontext.js';
import { User } from '../models/user.js';
export async function localRegister(req, res, next) {
    console.log("Register API Called");
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if (req.session.userid) {
        let user = await usercontext.findOne({ where: { id: req.session.userid } });
        res.status(202)
            .send({
            "name": user === null || user === void 0 ? void 0 : user.username,
            "statusText": "A user is already logged in",
            "isLoggedIn": true
        })
            .end();
        return next();
    }
    if (username == null || username == '') {
        res.status(404)
            .send({ "statusText": "Username is required", "isLoggedIn": false })
            .end();
        return next();
    }
    if (password == null || confirmPassword == null || password == '' || confirmPassword == '') {
        res.status(404)
            .send({ "statusText": "Password is required", "isLoggedIn": false })
            .end();
        return next();
    }
    if (password != confirmPassword) {
        res.status(404)
            .send({ "statusText": "Passwords do not match", "isLoggedIn": false })
            .end();
        return next();
    }
    try {
        let user = await usercontext.findOne({ where: { username: username } });
        if (user) {
            res.status(404)
                .send({ "statusText": "User already exists", "isLoggedIn": false })
                .end();
            return next();
        }
    }
    catch (err) {
        console.log("User Find Failed");
        throw err;
    }
    try {
        let newUser = new User(username, password);
        await usercontext.create(newUser);
        res.status(202)
            .send({ "statusText": "User Created", "isLoggedIn": false })
            .end();
        return next();
    }
    catch (err) {
        console.log("User Creation Failed");
        throw err;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3JlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekMsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO0lBQ3ZHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUVuQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNqQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNqQyxJQUFJLGVBQWUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUUvQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3BCLElBQUksSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsQ0FBQztRQUMzRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQztZQUNGLE1BQU0sRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUTtZQUN0QixZQUFZLEVBQUUsNkJBQTZCO1lBQzNDLFlBQVksRUFBRSxJQUFJO1NBQ3BCLENBQUM7YUFDRixHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLEVBQUUsRUFBRTtRQUNwQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDakUsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pCO0lBRUQsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLGVBQWUsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLEVBQUUsSUFBSSxlQUFlLElBQUksRUFBRSxFQUFFO1FBQ3hGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUNqRSxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxJQUFJLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQ25FLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELElBQUc7UUFDQyxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksSUFBSSxFQUFFO1lBQ04sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQztpQkFDaEUsR0FBRyxFQUFFLENBQUM7WUFDVixPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCxPQUFNLEdBQUcsRUFBQztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxNQUFNLEdBQUcsQ0FBQztLQUNiO0lBRUQsSUFBRztRQUNDLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUN6RCxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFDRCxPQUFNLEdBQUcsRUFBQztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQyxNQUFNLEdBQUcsQ0FBQztLQUNiO0FBQ0wsQ0FBQyJ9