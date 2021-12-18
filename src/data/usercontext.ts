import { Sequelize } from 'sequelize';
import fs from 'fs';

var appsettings: any;
var sequelize: Sequelize;

export function databaseconnectiontest(){
    fs.readFile('src/appsettings.json', 'utf-8', async (err, data) => {
        if (err) throw err;
    
        appsettings = JSON.parse(data);
        sequelize = new Sequelize(appsettings.connectionstrings.postgres);

        try{
            await sequelize.authenticate();
            console.log("Connected to Postgres Database!");
            await sequelize.close();
            console.log("Connection Closed.");
        }
        catch(err) {   
            console.log("Database Connection Failed.");
            console.log(err);
        }
        finally{
            
        }
    })
};