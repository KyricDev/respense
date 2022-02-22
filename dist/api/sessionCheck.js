import { usercontext } from '../data/usercontext.js';
export default async function (req, res, next) {
    console.log("SessionCheck Called");
    console.log(req.session);
    if (req.session.isOAuth) {
        res.cookie('respense.cookie', req.session.name);
        res.status(202)
            .send({
            //"name": req.session.name, 
            "statusText": "A user is already logged in",
            "isLoggedIn": true
        })
            .end();
        return;
    }
    if (req.session.userid) {
        try {
            let user = await usercontext.findOne({ where: { id: req.session.userid } });
            if (!user) {
                req.session.destroy(() => {
                    res.clearCookie("respense.cookie");
                    res.status(404)
                        .send({ "statusText": "User not found", "isLoggedIn": false })
                        .end();
                    return;
                });
            }
            res.cookie("respense.cookie", user === null || user === void 0 ? void 0 : user.username);
            res.status(202)
                .send({ "statusText": "User is already logged in", "isLoggedIn": true })
                .end();
            return;
        }
        catch (err) {
            console.log(err);
            return;
        }
    }
    else {
        res.status(202)
            .send({ "statusText": "", "isLoggedIn": false })
            .end();
        return;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbkNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9zZXNzaW9uQ2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUNsRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQztRQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUM7WUFDRCw0QkFBNEI7WUFDNUIsWUFBWSxFQUFFLDZCQUE2QjtZQUMzQyxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDO2FBQ0YsR0FBRyxFQUFFLENBQUM7UUFDVixPQUFPO0tBQ1Y7SUFFRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDO1FBQ25CLElBQUc7WUFDQyxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUU7b0JBQ3RCLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDbkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7eUJBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5QkFDM0QsR0FBRyxFQUFFLENBQUM7b0JBQ1YsT0FBTztnQkFDWCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLDJCQUEyQixFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQztpQkFDckUsR0FBRyxFQUFFLENBQUM7WUFDVixPQUFPO1NBQ1Y7UUFDRCxPQUFNLEdBQUcsRUFBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTztTQUNWO0tBQ0o7U0FDRztRQUNBLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1YsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDN0MsR0FBRyxFQUFFLENBQUM7UUFDWCxPQUFPO0tBQ1Y7QUFDTCxDQUFDIn0=