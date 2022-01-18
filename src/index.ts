import express from 'express';
import session from 'express-session';
import path from 'path';
import { localRegister } from './api/register.js';
import { localLogin } from './api/login.js';
import sessionCheck from './api/sessionCheck.js';
import { usercontext, expensescontext } from './data/usercontext.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const port: number = 80;
const __dirname: string = path.resolve();
const upload = multer();

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
    // expensescontext.sync({ force: true });
    /*
    let expensessequelize = expensescontext
                            .build({
                                UserId: "13de43d8-bcaf-4d8e-beb5-459b6f182c69"
                            });

    try{ 
        await expensessequelize.save();
    }
    catch(err){
        console.log(err);
    }
    */
    next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.none());
app.use(express.static(path.join(__dirname, "dist/public/views/"), {index: false, extensions: ['html']}));
app.use(express.static(path.join(__dirname, "dist/public/js/")));
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

app.get(['', '/login'],
        (req: express.Request | any, res: express.Response) => {
    res.sendFile(
        '/views/index.html', 
        {root: path.join(__dirname, "dist")}, 
        (err) => {if (err) throw err
    });
});
app.get('/dashboard', 
        (req: express.Request | any, res: express.Response) => {
    if (!req.session.userid) return res.redirect('/');
    res.sendFile(
        '/views/dashboard.html', 
        {root: path.join(__dirname, "dist")}, 
        (err) => {if (err) throw err
    });
})
app.post('', sessionCheck);
app.post('/login', localLogin);
app.post('/register', localRegister);
app.get('*',
        (req: express.Request, res: express.Response) => {
    res.writeHead(404, "Page does not Exist");
    res.end("Page does not Exist X_X");
})

app.listen(port, () => console.log(`listening on port ${port}`));