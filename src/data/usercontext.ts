import { Sequelize, Model, DataTypes } from 'sequelize';
import fs from 'fs';
import User from '../models/user.js';
import Expenses from '../models/expenses.js';

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
    }
    catch(err) {   
        console.log("Database Connection Failed.");
        console.log(err);
    }
};

export const usercontext = User.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize: connection,
    modelName: 'User'
});
export const expensescontext = Expenses.init({
    id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    value: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    sequelize: connection,
    modelName: 'Expenses'
});
User.hasMany(Expenses);
Expenses.belongsTo(User);