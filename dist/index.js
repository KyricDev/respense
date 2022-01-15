import express from 'express';
import session from 'express-session';
import path from 'path';
//import { localLogin } from './authentication/strategies.js'; 
import { localRegister } from './api/register.js';
import { localLogin } from './api/login.js';
import { authorizeCookie } from './authorization/strategies.js';
import passport from 'passport';
import { usercontext, expensescontext } from './data/usercontext.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const app = express();
const port = 80;
const __dirname = path.resolve();
const upload = multer();
//passport.use('basicLogin', localLogin);
passport.use('cookie-authorize', authorizeCookie);
passport.serializeUser((user, done) => {
    console.log('Serializing . . .');
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
    //expensescontext.sync({ force: true });
    let expensessequelize = expensescontext
        .build({
        UserId: "13de43d8-bcaf-4d8e-beb5-459b6f182c69"
    });
    try {
        await expensessequelize.save();
    }
    catch (err) {
        console.log(err);
    }
    next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.none());
app.use(express.static(path.join(__dirname, "dist/public/views/"), { index: false, extensions: ['html'] }));
app.use(express.static(path.join(__dirname, "dist/public/js/"), { extensions: ['bundle.js'] }));
app.use(express.static(path.join(__dirname, "dist/public/css/"), { extensions: ['css'] }));
app.use(session({
    name: 'respense.user',
    secret: 'secret respense',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.get(['', '/login'], (req, res) => {
    res.sendFile('/views/index.html', { root: path.join(__dirname, "dist") }, (err) => { if (err)
        throw err; });
});
app.post('/login', localLogin);
app.post('/register', localRegister);
app.get('*', (req, res) => {
    res.writeHead(404, "Page does not Exist");
    res.end("Page does not Exist X_X");
});
app.listen(port, () => console.log(`listening on port ${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QiwrREFBK0Q7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUE7QUFDL0QsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckUsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixNQUFNLElBQUksR0FBVyxFQUFFLENBQUM7QUFDeEIsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3hCLHlDQUF5QztBQUN6QyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ2xELFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUEyQixFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxF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