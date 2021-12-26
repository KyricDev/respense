import express from 'express';
import session from 'express-session';
import path from 'path';
import { localStrategy } from './authentication/strategies.js';
import passport from 'passport';
import { usercontext } from './data/usercontext.js';
const app = express();
const port = 80;
const __dirname = path.resolve();
passport.use('local', localStrategy);
passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    console.log(id);
    done(null, usercontext.findByPk(id));
});
app.use(async (req, res, next) => {
    //databaseconnectiontest();
    /*
    let user = new User("Dummy0", "Dummy0");
    console.log(`ID: ${user.id}  ||  Username: ${user.username}  ||  Passwordhash: ${user.password}`);

    let usersequelize = usercontext
                        .build({id:user.id,
                                username: user.username,
                                password: user.password,
                                salt: user.salt});
    
    try{
        await usersequelize.save();
    }
    catch(err){
        console.log(err);
    }
    */
    // basicAuth("Dummy0", "Dummy0");
    next();
});
app.use(express.static(path.join(__dirname, "dist/public")));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('', passport.authenticate('local'), (req, res) => {
    var _a;
    res.write(`Hello ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.username}`);
    res.end();
});
app.listen(port, () => console.log("listening on port " + port));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBELE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sSUFBSSxHQUFXLEVBQUUsQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDckMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ0YsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQU8sRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM3QiwyQkFBMkI7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQkU7SUFDRixpQ0FBaUM7SUFDakMsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDWixNQUFNLEVBQUUsY0FBYztJQUN0QixNQUFNLEVBQUUsS0FBSztJQUNiLGlCQUFpQixFQUFFLEtBQUs7Q0FDM0IsQ0FBQyxDQUFDLENBQUM7QUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQ0YsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFDOUIsQ0FBQyxHQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7O0lBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxNQUFBLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDekMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMifQ==