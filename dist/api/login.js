import { usercontext } from '../data/usercontext.js';
export async function localLogin(req, res, next) {
    console.log(`Login API Called`);
    //let username = req.body.username;
    //let password = req.body.password;
    let username = "Dummy0";
    let password = "Dummy0";
    if (req.session.isOAuth) {
        res.status(202)
            .send({
            "name": req.session.name,
            "statusText": "A user is already logged in",
            "isLoggedIn": true
        })
            .end();
        res.cookie("respense.cookie", req.session.name);
        return;
    }
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
        return;
    }
    if (username == "") {
        res.status(404)
            .send({ "statusText": "Username is required", "isLoggedIn": false })
            .end();
        return;
    }
    if (password == "") {
        res.status(404)
            .send({ "statusText": "Password is required", "isLoggedIn": false })
            .end();
        return;
    }
    let user = await usercontext.findOne({ where: { username: username } });
    if (!user) {
        res.status(404)
            .send({ "statusText": "User not found", "isLoggedIn": false })
            .end();
        return;
    }
    if (user.validatePassword(password)) {
        req.session.userid = user.id;
        res.cookie("respense.cookie", user === null || user === void 0 ? void 0 : user.username);
        res.status(202)
            .send({
            "name": user.username,
            "statusText": "User logged in",
            "isLoggedIn": true
        });
        return;
    }
    res.status(404)
        .send({ "statusText": "Unexpected error during login", "isLoggedIn": false })
        .end();
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxNQUFNLENBQUMsS0FBSyxVQUFVLFVBQVUsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRWhDLG1DQUFtQztJQUNuQyxtQ0FBbUM7SUFDbkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUV4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN4QixZQUFZLEVBQUUsNkJBQTZCO1lBQzNDLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUM7YUFDRixHQUFHLEVBQUUsQ0FBQztRQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxPQUFPO0tBQ1Y7SUFFRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3BCLElBQUksSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsQ0FBQztRQUMzRSxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQztZQUNELE1BQU0sRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUTtZQUN0QixZQUFZLEVBQUUsNkJBQTZCO1lBQzNDLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUM7YUFDRixHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU87S0FDVjtJQUVELElBQUksUUFBUSxJQUFJLEVBQUUsRUFBRTtRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDakUsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPO0tBQ1Y7SUFFRCxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQUU7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQ2pFLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTztLQUNWO0lBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxFQUFDLENBQUMsQ0FBQztJQUVwRSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQzNELEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTztLQUNWO0lBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQztZQUNGLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNyQixZQUFZLEVBQUUsZ0JBQWdCO1lBQzlCLFlBQVksRUFBRSxJQUFJO1NBQ3BCLENBQUMsQ0FBQTtRQUNOLE9BQU87S0FDVjtJQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLCtCQUErQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQztTQUMxRSxHQUFHLEVBQUUsQ0FBQztJQUNWLE9BQU87QUFDWCxDQUFDIn0=