import CookieStrategy from 'passport-cookie';
async function verifyCookie(req, token, done) {
    console.log('verifying cookie');
    /*
    let data: any = cookieParser.signedCookie(token, 'secret respense')
    let buffer = Buffer.from(data, 'hex');
    console.log(`output: ${buffer.toString("utf8")}`);*/
    console.log(req.session);
    console.log(token);
    done(null, true, "true");
}
export const authorizeCookie = new CookieStrategy({ cookieName: 'respense.user', passReqToCallback: true }, verifyCookie);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRob3JpemF0aW9uL3N0cmF0ZWdpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxjQUFjLE1BQU0saUJBQWlCLENBQUM7QUFLN0MsS0FBSyxVQUFVLFlBQVksQ0FBQyxHQUFRLEVBQUUsS0FBVSxFQUFFLElBQWM7SUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hDOzs7d0RBR29EO0lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBQyxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMifQ==