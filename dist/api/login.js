import { usercontext } from '../data/usercontext.js';
export async function localLogin(req, res, next) {
    console.log(`Login API Called`);
    let username = req.body.username;
    let password = req.body.password;
    //let username = "Dummy0";
    //let password = "Dummy0";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxNQUFNLENBQUMsS0FBSyxVQUFVLFVBQVUsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRWhDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFFMUIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUNwQixJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDM0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUM7WUFDRCxNQUFNLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVE7WUFDdEIsWUFBWSxFQUFFLDZCQUE2QjtZQUMzQyxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDO2FBQ0YsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pCO0lBRUQsSUFBSSxRQUFRLElBQUksRUFBRSxFQUFFO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUNqRSxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQUU7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQ2pFLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELElBQUksSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsRUFBQyxDQUFDLENBQUM7SUFFcEUsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNQLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUMzRCxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNqQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0YsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3JCLFlBQVksRUFBRSxnQkFBZ0I7WUFDOUIsWUFBWSxFQUFFLElBQUk7U0FDcEIsQ0FBQzthQUNGLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLCtCQUErQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQztTQUMxRSxHQUFHLEVBQUUsQ0FBQztJQUNWLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDbEIsQ0FBQyJ9