import { Sequelize, Model, DataTypes } from 'sequelize';
import fs from 'fs';
import { User as ModelUser }  from '../models/user';
import  bcrypt  from "bcrypt";
import { v4 } from "uuid";

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

class User extends Model {
    public id!: string;
    public username!: string;
    public password!: string;
    public salt!: string;

    public validatePassword(password:string):boolean {
        let hash = bcrypt.hashSync(password, this.salt);

        if (hash != this.password) return false;
        return true;
    }
}

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