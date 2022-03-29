import express from 'express';
import session from 'express-session';
import path from 'path';
import { localRegister } from './api/register.js';
import { localLogin } from './api/login.js';
import { localLogout } from './api/logout.js';
import { googleGetCode, googleLogin } from './api/googlelogin.js';
import sessionCheck from './api/sessionCheck.js';
import expenses from './api/expenses.js';
import addExpense from './api/addexpense.js';
import changeExpenseStatus from './api/changeExpenseStatus.js';
import deleteExpense from './api/deleteExpense.js';
import updateExpense from './api/updateExpense.js';
import { usercontext, expensescontext } from './data/usercontext.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const app = express();
//const port: number = 80;
const port = process.env.PORT || 3000;
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
    try {
        await usercontext.sync();
    }
    catch (err) {
        console.log(err);
    }
    try {
        await expensescontext.sync();
    }
    catch (err) {
        console.log(err);
    }
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
            console.log(err);
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
app.get('/expenses', expenses);
app.post('/trygoogle', googleGetCode);
app.get('/googleoauth*', googleLogin);
/*
async (req: express.Request, res: express.Response) => {
    console.log(req.query.code);
    const code: any = req.query.code;
    const googleClient = new google.auth.OAuth2(
        "425711147539-3foeia0vc7n80d3i7sgi2j6jblfgsmpo.apps.googleusercontent.com",
        "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",
        "http://localhost/googleoauth"
    );
    const {tokens} = await googleClient.getToken(code);
    console.log(tokens);
    googleClient.setCredentials(tokens);
    res.status(202).send("Google Called Back");
});
*/
app.post('/addExpense', addExpense);
app.post('/deleteExpense', deleteExpense);
app.post('/changeExpenseStatus', changeExpenseStatus);
app.post('/updateExpense', updateExpense);
app.post('', sessionCheck);
app.post('/signout', localLogout);
app.post('/login', localLogin);
app.post('/register', localRegister);
app.get('*', (req, res) => {
    res.status(404).send("Page does not Exist").end();
});
app.listen(port, () => console.log(`listening on port ${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sbUJBQW1CLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRSxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRzVCLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLDBCQUEwQjtBQUMxQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDdEMsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBRXhCLEdBQUcsQ0FBQyxH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