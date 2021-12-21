import express from 'express';
import path from 'path';
const app = express();
const port = 80;
const __dirname = path.resolve();
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
    next();
});
app.use(express.static(path.join(__dirname, "dist/public")));
app.get('', (req, res) => {
    res.write("Hello");
    res.end();
});
app.listen(port, () => console.log("listening on port " + port));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBT3hCLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sSUFBSSxHQUFXLEVBQUUsQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFFekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM3QiwyQkFBMkI7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQkU7SUFDRixJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU3RCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQ3hELEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMifQ==