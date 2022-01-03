import { usercontext } from '../data/usercontext.js';
import { User } from '../models/user.js';
export async function localRegister(req, res, next) {
    console.log("Register API Called");
    //console.log(req);
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    console.log(`${username} -- ${password} -- ${confirmPassword}`);
    if (username == null || username == '') {
        res.writeHead(404, "Username is Required").end();
        return next();
    }
    if (password == null || confirmPassword == null || password == '' || confirmPassword == '') {
        res.writeHead(404, "Password is Required").end();
        return next();
    }
    if (password !== confirmPassword) {
        res.writeHead(404, "Passwords do not Match").end();
        return next();
    }
    try {
        let user = await usercontext.findOne({ where: { username: username } });
        if (user) {
            res.writeHead(404, "User Already Exists").end();
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
        res.status(200).json(newUser);
        return next();
    }
    catch (err) {
        console.log("User Creation Failed");
        throw err;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3JlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekMsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO0lBQ3ZHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNuQyxtQkFBbUI7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDakMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDakMsSUFBSSxlQUFlLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsT0FBTyxRQUFRLE9BQU8sZUFBZSxFQUFFLENBQUMsQ0FBQztJQUVoRSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLEVBQUUsRUFBRTtRQUNwQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakI7SUFFRCxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksZUFBZSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksRUFBRSxJQUFJLGVBQWUsSUFBSSxFQUFFLEVBQUU7UUFDeEYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pCO0lBRUQsSUFBSSxRQUFRLEtBQUssZUFBZSxFQUFFO1FBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkQsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUVELElBQUc7UUFDQyxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksSUFBSSxFQUFFO1lBQ04sR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoRCxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCxPQUFNLEdBQUcsRUFBQztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxNQUFNLEdBQUcsQ0FBQTtLQUNaO0lBRUQsSUFBRztRQUNDLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUNELE9BQU0sR0FBRyxFQUFDO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxDQUFDO0tBQ2I7QUFDTCxDQUFDIn0=