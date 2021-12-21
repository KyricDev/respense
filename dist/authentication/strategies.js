import { usercontext } from "../data/usercontext.js";
export async function basicAuth(username, password, callback) {
    let user = await usercontext.findOne({ where: { username: 'Dummy0'
        } });
    console.log(user);
}
//const localStrategy = new LocalStrategy.Strategy();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImF1dGhlbnRpY2F0aW9uL3N0cmF0ZWdpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE1BQU0sQ0FBQyxLQUFLLFVBQVUsU0FBUyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxRQUFtQjtJQUNuRixJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUTtTQUNqRSxFQUFDLENBQUMsQ0FBQztJQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELHFEQUFxRCJ9