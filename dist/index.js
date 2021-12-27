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
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
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
app.use(express.static(path.join(__dirname, "dist/public/views/"), { index: false, extensions: ['html'] }));
app.use(express.static(path.join(__dirname, "dist/public/js/"), { extensions: ['bundle.js'] }));
app.use(express.static(path.join(__dirname, "dist/public/css/"), { extensions: ['css'] }));
app.use(session({
    secret: 'secret respense',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('', passport.authenticate('local'), (req, res) => {
    res.write(`Hello ${req.user.username}`);
    res.end();
});
app.listen(port, () => console.log(`listening on port ${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVwRCxNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixNQUFNLElBQUksR0FBVyxFQUFFLENBQUM7QUFDeEIsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3JDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUEyQixFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3pELElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUMsRUFBTyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzVDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdCLDJCQUEyQjtJQUMzQjs7Ozs7Ozs7Ozs7Ozs7OztNQWdCRTtJQUNGLGlDQUFpQztJQUNqQyxJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUN6RixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNaLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsTUFBTSxFQUFFLEtBQUs7SUFDYixpQkFBaUIsRUFBRSxLQUFLO0NBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBRTVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUNGLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQzlCLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7SUFDcEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4QyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyJ9