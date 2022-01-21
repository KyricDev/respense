import { usercontext } from '../data/usercontext.js';
export async function localLogin(req, res, next) {
    console.log(`Login API Called`);
    //let username = req.body.username;
    //let password = req.body.password;
    let username = "Dummy0";
    let password = "Dummy0";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxNQUFNLENBQUMsS0FBSyxVQUFVLFVBQVUsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRWhDLG1DQUFtQztJQUNuQyxtQ0FBbUM7SUFDbkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUV4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3BCLElBQUksSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsQ0FBQztRQUMzRSxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQztZQUNELE1BQU0sRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUTtZQUN0QixZQUFZLEVBQUUsNkJBQTZCO1lBQzNDLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUM7YUFDRixHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQUU7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQ2pFLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELElBQUksUUFBUSxJQUFJLEVBQUUsRUFBRTtRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDakUsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pCO0lBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxFQUFDLENBQUMsQ0FBQztJQUVwRSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQzNELEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUM7WUFDRixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDckIsWUFBWSxFQUFFLGdCQUFnQjtZQUM5QixZQUFZLEVBQUUsSUFBSTtTQUNwQixDQUFDO2FBQ0YsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pCO0lBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsK0JBQStCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO1NBQzFFLEdBQUcsRUFBRSxDQUFDO0lBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNsQixDQUFDIn0=