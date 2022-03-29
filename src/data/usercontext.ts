import { Sequelize, Model, DataTypes } from 'sequelize';
import fs from 'fs';
import User from '../models/user.js';
import Expenses from '../models/expenses.js';
import { Client } from 'pg';

function initSequelize(): Sequelize {
    let appsettings = JSON.parse(fs.readFileSync('src/appsettings.json', 'utf-8'));
    //let sequelize: Sequelize = new Sequelize(appsettings.connectionstrings.postgres);
    let sequelize: Sequelize = new Sequelize(process.env.DATABASE_URL!);

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
        type: DataTypes.STRING,
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
        allowNull: false,
    },
    value: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
    isRecurring: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    periodStart: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
    periodEnd: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    UserId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize: connection,
    modelName: 'Expenses'
});
// export const UserExpensesAssoc = User.hasMany(Expenses);
// export const ExpensesUserAssoc = Expenses.belongsTo(User);