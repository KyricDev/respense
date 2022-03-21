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
    // try { await usercontext.sync({ force: true }); }
    // catch(err){ console.log(err); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQzlCLE9BQU8sT0FBTyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sbUJBQW1CLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFFbkQsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUc1QixNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixNQUFNLElBQUksR0FBVyxFQUFFLENBQUM7QUFDeEIsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBRXhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDN0IsMkJBQTJCO0lBQzNCOzs7Ozs7Ozs7Ozs7Ozs7O01BZ0JFO0lB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