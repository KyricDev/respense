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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxNQUFNLENBQUMsS0FBSyxVQUFVLFVBQVUsQ0FBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDckcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRWhDLG1DQUFtQztJQUNuQyxtQ0FBbUM7SUFDbkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUV4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN4QixZQUFZLEVBQUUsNkJBQTZCO1lBQzNDLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUM7YUFDRixHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU87S0FDVjtJQUVELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDcEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0QsTUFBTSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRSw2QkFBNkI7WUFDM0MsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQzthQUNGLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTztLQUNWO0lBRUQsSUFBSSxRQUFRLElBQUksRUFBRSxFQUFFO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUNqRSxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU87S0FDVjtJQUVELElBQUksUUFBUSxJQUFJLEVBQUUsRUFBRTtRQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDakUsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPO0tBQ1Y7SUFFRCxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBRXBFLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDM0QsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPO0tBQ1Y7SUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNqQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0YsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3JCLFlBQVksRUFBRSxnQkFBZ0I7WUFDOUIsWUFBWSxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFBO1FBQ04sT0FBTztLQUNWO0lBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsK0JBQStCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO1NBQzFFLEdBQUcsRUFBRSxDQUFDO0lBQ1YsT0FBTztBQUNYLENBQUMifQ==