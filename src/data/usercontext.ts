import { Sequelize, Model, DataTypes } from 'sequelize';
import fs from 'fs';
import { User } from '../models/user';

function initSequelize(): Sequelize {
    let appsettings = JSON.parse(fs.readFileSync('src/appsettings.json', 'utf-8'));
    let sequelize: Sequelize = new Sequelize(appsettings.connectionstrings.postgres);
    
    return sequelize;
}

export const connection = initSequelize();

export async function databaseconnectiontest(){
    try{
        await connection.authenticate();
        console.log("Connected to Postgres Database!");
        await connection.close();
        console.log("Connection Closed.");
    }
    catch(err) {   
        console.log("Database Connection Failed.");
        console.log(err);
    }
};