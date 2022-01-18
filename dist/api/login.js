import { usercontext } from '../data/usercontext.js';
export async function localLogin(req, res, next) {
    console.log(`Login API Called`);
    let username = req.body.username;
    let password = req.body.password;
    if (req.session.userid) {
        let user = await usercontext.findOne({ where: { id: req.session.userid } });
        res.cookie("respense.cookie", user === null || user === void 0 ? void 0 : user.username);
        res.status(202)
            .send({
            "name": user === null || user === void 0 ? void 0 : user.username,
            "statusText": "A user is already logged in",
            "isLoggedIn": true
        })
            .end();
        return next();
    }
    if (username == "") {
        res.status(404)
            .send({ "statusText": "Username is required", "isLoggedIn": false })
            .end();
        return next();
    }
    if (password == "") {
        res.status(404)
            .send({ "statusText": "Password is required", "isLoggedIn": false })
            .end();
        return next();
    }
    let user = await usercontext.findOne({ where: { username: username } });
    if (!user) {
        res.status(404)
            .send({ "statusText": "User not found", "isLoggedIn": false })
            .end();
        return next();
    }
    if (user.validatePassword(password)) {
        req.session.userid = user.id;
        res.cookie("respense.cookie", user === null || user === void 0 ? void 0 : user.username);
        res.status(202)
            .send({
            "name": user.username,
            "statusText": "User logged in",
            "isLoggedIn": true
        })
            .end();
        return next();
    }
    res.status(404)
        .send({ "statusText": "Unexpected error during login", "isLoggedIn": false })
        .end();
    return next();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxNQUFNLENBQUMsS0FBSyxVQUFVLFVBQVUsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRWhDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRWpDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDcEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0QsTUFBTSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRSw2QkFBNkI7WUFDM0MsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQzthQUNGLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELElBQUksUUFBUSxJQUFJLEVBQUUsRUFBRTtRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDakUsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pCO0lBRUQsSUFBSSxRQUFRLElBQUksRUFBRSxFQUFFO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUNqRSxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBRXBFLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDM0QsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pCO0lBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQztZQUNGLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNyQixZQUFZLEVBQUUsZ0JBQWdCO1lBQzlCLFlBQVksRUFBRSxJQUFJO1NBQ3BCLENBQUM7YUFDRixHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSwrQkFBK0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7U0FDMUUsR0FBRyxFQUFFLENBQUM7SUFDVixPQUFPLElBQUksRUFBRSxDQUFDO0FBQ2xCLENBQUMifQ==