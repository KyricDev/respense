import { usercontext } from '../data/usercontext.js';
import User from '../models/user.js';
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
        return;
    }
    if (username == null || username == '') {
        res.status(404)
            .send({ "statusText": "Username is required", "isLoggedIn": false })
            .end();
        return;
    }
    if (password == null || confirmPassword == null || password == '' || confirmPassword == '') {
        res.status(404)
            .send({ "statusText": "Password is required", "isLoggedIn": false })
            .end();
        return;
    }
    if (password != confirmPassword) {
        res.status(404)
            .send({ "statusText": "Passwords do not match", "isLoggedIn": false })
            .end();
        return;
    }
    try {
        let user = await usercontext.findOne({ where: { username: username } });
        if (user) {
            res.status(404)
                .send({ "statusText": "User already exists", "isLoggedIn": false })
                .end();
            return;
        }
    }
    catch (err) {
        console.log("User Find Failed");
        throw err;
    }
    try {
        let newUser = new User({
            username: username,
            password: password,
        });
        newUser.initialize();
        await usercontext.build({
            id: newUser.id,
            username: newUser.username,
            password: newUser.password,
            salt: newUser.salt,
        }).save();
        res.status(202)
            .send({ "statusText": "User Created", "isLoggedIn": false })
            .end();
        return;
    }
    catch (err) {
        console.log("User Creation Failed");
        throw err;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3JlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUVyQyxNQUFNLENBQUMsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDdkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRW5DLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBRS9DLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDcEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0YsTUFBTSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRSw2QkFBNkI7WUFDM0MsWUFBWSxFQUFFLElBQUk7U0FDcEIsQ0FBQzthQUNGLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTztLQUNWO0lBRUQsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQUU7UUFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQ2pFLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTztLQUNWO0lBRUQsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLGVBQWUsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLEVBQUUsSUFBSSxlQUFlLElBQUksRUFBRSxFQUFFO1FBQ3hGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUNqRSxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU87S0FDVjtJQUVELElBQUksUUFBUSxJQUFJLGVBQWUsRUFBRTtRQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDbkUsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPO0tBQ1Y7SUFFRCxJQUFHO1FBQ0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLElBQUksRUFBRTtZQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7aUJBQ2hFLEdBQUcsRUFBRSxDQUFDO1lBQ1YsT0FBTztTQUNWO0tBQ0o7SUFDRCxPQUFNLEdBQUcsRUFBQztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxNQUFNLEdBQUcsQ0FBQztLQUNiO0lBRUQsSUFBRztRQUNDLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQixNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDcEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7U0FDckIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUN6RCxHQUFHLEVBQUUsQ0FBQztRQUNWLE9BQU87S0FDVjtJQUNELE9BQU0sR0FBRyxFQUFDO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxDQUFDO0tBQ2I7QUFDTCxDQUFDIn0=