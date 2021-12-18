import { Sequelize } from 'sequelize';
import fs from 'fs';
function initSequelize() {
    let appsettings = JSON.parse(fs.readFileSync('src/appsettings.json', 'utf-8'));
    let sequelize = new Sequelize(appsettings.connectionstrings.postgres);
    return sequelize;
}
export const connection = initSequelize();
export async function databaseconnectiontest() {
    try {
        await connection.authenticate();
        console.log("Connected to Postgres Database!");
        await connection.close();
        console.log("Connection Closed.");
    }
    catch (err) {
        console.log("Database Connection Failed.");
        console.log(err);
    }
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYXRhL3VzZXJjb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sV0FBVyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQztBQUdwQixTQUFTLGFBQWE7SUFDbEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0UsSUFBSSxTQUFTLEdBQWMsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWpGLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsYUFBYSxFQUFFLENBQUM7QUFFMUMsTUFBTSxDQUFDLEtBQUssVUFBVSxzQkFBc0I7SUFDeEMsSUFBRztRQUNDLE1BQU0sVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMvQyxNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDckM7SUFDRCxPQUFNLEdBQUcsRUFBRTtRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQUFBLENBQUMifQ==