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
    }
    catch (err) {
        throw err;
    }
}
export const localStrategy = new LocalStrategy.Strategy(basicAuth);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImF1dGhlbnRpY2F0aW9uL3N0cmF0ZWdpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxhQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3JELEtBQUssVUFBVSxTQUFTLENBQUMsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLElBQWM7SUFDdkUsSUFBRztRQUNDLElBQUksSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRO2FBQ2pFLEVBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsb0NBQW9DLEVBQUMsQ0FBQyxDQUFDO1FBRWpILE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUNwQztJQUNELE9BQU0sR0FBRyxFQUFDO1FBQ04sTUFBTSxHQUFHLENBQUM7S0FDYjtBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDIn0=