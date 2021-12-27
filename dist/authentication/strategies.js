import LocalStrategy from "passport-local";
import { usercontext } from "../data/usercontext.js";
async function basicAuth(username, password, done) {
    try {
        let user = await usercontext.findOne({ where: { username: username
            } });
        if (!user)
            return done(null, false, { message: "User not found" });
        if (!user.validatePassword(password))
            return done(null, false, { message: "Username and/or Password Incorrect" });
        console.log("Login Successful!");
        return done(null, user);
    }
    catch (err) {
        throw err;
    }
}
export const localStrategy = new LocalStrategy.Strategy(basicAuth);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoZW50aWNhdGlvbi9zdHJhdGVnaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUdyRCxLQUFLLFVBQVUsU0FBUyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxJQUFjO0lBQ3ZFLElBQUc7UUFDQyxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUTthQUNqRSxFQUFDLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLG9DQUFvQyxFQUFDLENBQUMsQ0FBQztRQUVqSCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzNCO0lBQ0QsT0FBTSxHQUFHLEVBQUM7UUFDTixNQUFNLEdBQUcsQ0FBQztLQUNiO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMifQ==