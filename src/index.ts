import express from 'express';
import session from 'express-session';
import path from 'path';
import { localStrategy } from './authentication/strategies.js'; 
import { authorizeCookie } from './authorization/strategies.js' 
import passport from 'passport';
import { usercontext } from './data/usercontext.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port: number = 80;
const __dirname: string = path.resolve();
passport.use('local', localStrategy);
passport.use('cookie-authorize', authorizeCookie);
passport.serializeUser((user: passport.Express.User, done) => {
    console.log('Serializing . . .');
    done(null, user.id);
});
passport.deserializeUser(async(id: any, done) => {
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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist/public/views/"), {index: false, extensions: ['html']}));
app.use(express.static(path.join(__dirname, "dist/public/js/"), {extensions: ['bundle.js']}));
app.use(express.static(path.join(__dirname, "dist/public/css/"), {extensions: ['css']}));
app.use(session({
    name: 'respense.user',
    secret: 'secret respense',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('',
       (req: express.Request | any, res: express.Response) => {
    res.sendFile('/views/index.html', {root: path.join(__dirname, "dist")}, (err) => {if (err) throw err});
});
app.post('/login',
        passport.authenticate('local', {failureRedirect: '/'}),
        (req: express.Request, res: express.Response) => {
    console.log(req);
    res.write('Welcome!');
    res.end();
});
app.get('/success?',
        passport.authorize('cookie-authorize', {failureRedirect: '/failed'}),
        (req: express.Request, res: express.Response) => {
    res.write('You are authorized');
    res.end();
});
app.get('/failed',
        (req: express.Request, res: express.Response) => {
    res.write('Unauthorized Access');
    res.end();
});

app.listen(port, () => console.log(`listening on port ${port}`));