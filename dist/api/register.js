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
        return next();
    }
    catch (err) {
        console.log("User Creation Failed");
        throw err;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3JlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUVyQyxNQUFNLENBQUMsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDdkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRW5DLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBRS9DLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDcEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDO1lBQ0YsTUFBTSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRO1lBQ3RCLFlBQVksRUFBRSw2QkFBNkI7WUFDM0MsWUFBWSxFQUFFLElBQUk7U0FDcEIsQ0FBQzthQUNGLEdBQUcsRUFBRSxDQUFDO1FBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksRUFBRSxFQUFFO1FBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxD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