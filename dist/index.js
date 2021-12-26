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
passport.deserializeUser(async (id, done) => {
    console.log(id);
    done(null, await usercontext.findByPk(id));
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
    res.write(`Hello ${req.user.username}`);
    res.end();
});
app.listen(port, () => console.log("listening on port " + port));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBELE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sSUFBSSxHQUFXLEVBQUUsQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDckMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQTJCLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQTtBQUNGLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFDLEVBQU8sRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUE7QUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdCLDJCQUEyQjtJQUMzQjs7Ozs7Ozs7Ozs7Ozs7OztNQWdCRTtJQUNGLGlDQUFpQztJQUNqQyxJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNaLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE1BQU0sRUFBRSxLQUFLO0lBQ2IsaUJBQWlCLEVBQUUsS0FBSztDQUMzQixDQUFDLENBQUMsQ0FBQztBQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUU1QixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFDRixRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUM5QixDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQ3BELEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDeEMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMifQ==