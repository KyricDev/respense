import { Sequelize } from 'sequelize';
import fs from 'fs';
var appsettings;
var sequelize;
export function databaseconnectiontest() {
    fs.readFile('src/appsettings.json', 'utf-8', async (err, data) => {
        if (err)
            throw err;
        appsettings = JSON.parse(data);
        sequelize = new Sequelize(appsettings.connectionstrings.postgres);
        try {
            await sequelize.authenticate();
            console.log("Connected to Postgres Database!");
            await sequelize.close();
            console.log("Connection Closed.");
        }
        catch (err) {
            console.log("Database Connection Failed.");
            console.log(err);
        }
        finally {
        }
    });
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYXRhL3VzZXJjb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXBCLElBQUksV0FBZ0IsQ0FBQztBQUNyQixJQUFJLFNBQW9CLENBQUM7QUFFekIsTUFBTSxVQUFVLHNCQUFzQjtJQUNsQyxFQUFFLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQzdELElBQUksR0FBRztZQUFFLE1BQU0sR0FBRyxDQUFDO1FBRW5CLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEUsSUFBRztZQUNDLE1BQU0sU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUMvQyxNQUFNLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDckM7UUFDRCxPQUFNLEdBQUcsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO2dCQUNNO1NBRU47SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFBQSxDQUFDIn0=