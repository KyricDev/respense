import express from 'express';
import session from 'express-session';
import path from 'path';
import { localStrategy } from './authentication/strategies.js'; 
import passport from 'passport';
import { usercontext } from './data/usercontext.js';

const app = express();
const port: number = 80;
const __dirname: string = path.resolve();
passport.use('local', localStrategy);
passport.serializeUser((user: passport.Express.User, done) => {
    console.log(user);
    done(null, user.id);
})
passport.deserializeUser(async(id: any, done) => {
    console.log(id);
    done(null, await usercontext.findByPk(id));
})

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

app.get('', 
        passport.authenticate('local'),
        (req: express.Request, res: express.Response) => {
    res.write(`Hello ${req.user.username}`);
    res.end();
});

app.listen(port, () => console.log("listening on port " + port));