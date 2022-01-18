import { usercontext } from '../data/usercontext.js';
export default async function (req, res, next) {
    if (req.session.userid) {
        try {
            let user = await usercontext.findOne({ where: { id: req.session.userid } });
            if (!user) {
                req.session.destroy(() => {
                    res.clearCookie("respense.cookie");
                    res.status(404)
                        .send({ "statusText": "User not found", "isLoggedIn": false })
                        .end();
                    return next();
                });
            }
            res.cookie("respense.cookie", user === null || user === void 0 ? void 0 : user.username);
            res.status(202)
                .send({ "statusText": "User is already logged in", "isLoggedIn": true })
                .end();
            return next();
        }
        catch (err) {
            console.log(err);
            return next();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbkNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS9zZXNzaW9uQ2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUNsRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDO1FBQ25CLElBQUc7WUFDQyxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsRUFBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUU7b0JBQ3RCLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDbkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7eUJBQ1gsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5QkFDM0QsR0FBRyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSwyQkFBMkIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUM7aUJBQ3JFLEdBQUcsRUFBRSxDQUFDO1lBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNqQjtRQUNELE9BQU0sR0FBRyxFQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO0tBQ0o7QUFDTCxDQUFDIn0=