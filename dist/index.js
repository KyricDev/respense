import express from 'express';
import session from 'express-session';
import path from 'path';
import { localRegister } from './api/register.js';
import { localLogin } from './api/login.js';
import sessionCheck from './api/sessionCheck.js';
import userInfo from './api/userInfo.js';
import addExpense from './api/addexpense.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const app = express();
const port = 80;
const __dirname = path.resolve();
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
    // try { await expensescontext.sync({ force: true }); }
    // catch(err){ console.log(err); }
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
app.use(express.static(path.join(__dirname, "dist/public/views/"), { index: false, extensions: ['html'] }));
app.use(express.static(path.join(__dirname, "dist/public/js/")));
app.use(express.static(path.join(__dirname, "dist/public/css/")));
app.use(session({
    name: 'respense.user',
    secret: 'secret respense',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
    }
}));
app.get(['', '/login'], (req, res) => {
    res.sendFile('/views/index.html', { root: path.join(__dirname, "dist") }, (err) => {
        if (err)
            throw err;
    });
});
app.get('/dashboard', (req, res) => {
    if (!req.session.userid)
        return res.redirect('/');
    res.sendFile('/views/dashboard.html', { root: path.join(__dirname, "dist") }, (err) => {
        if (err)
            throw err;
    });
});
app.get('/userinfo', userInfo);
app.post('/addExpense', addExpense);
app.post('', sessionCheck);
app.post('/login', localLogin);
app.post('/register', localRegister);
/*app.get('*',
        (req: express.Request, res: express.Response) => {
    res.status(404).send("Page does not Exist").end();
})*/
app.listen(port, () => console.log(`listening on port ${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDdEIsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QyxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUV4QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdCLDJCQUEyQjtJQUMzQjs7Ozs7Ozs7Ozs7Ozs7OztNQWdCRTtJQUNGLGlDQUFpQztJQUNqQyx1REFBdUQ7SUFDdkQsa0NBQWtDO0lBQ2xDOzs7Ozs7Ozs7Ozs7TUFZRTtJQUNGLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FB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