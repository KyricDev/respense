import express from 'express';
import path from 'path';
import { databaseconnectiontest,  usercontext } from './data/usercontext.js';
import { User } from './models/user.js';
import { basicAuth } from './authentication/strategies.js'; 

const app = express();
const port: number = 80;
const __dirname: string = path.resolve();

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
    basicAuth("Dummy0", "Dummy0");
    next();
});
app.use(express.static(path.join(__dirname, "dist/public")));

app.get('', (req: express.Request, res: express.Response) => {
    res.write("Hello");
    res.end();
});

app.listen(port, () => console.log("listening on port " + port));