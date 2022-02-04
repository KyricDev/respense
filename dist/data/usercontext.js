import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import User from '../models/user.js';
import Expenses from '../models/expenses.js';
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
    }
    catch (err) {
        console.log("Database Connection Failed.");
        console.log(err);
    }
}
;
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
}, {
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
}, {
    sequelize: connection,
    modelName: 'Expenses'
});
// export const UserExpensesAssoc = User.hasMany(Expenses);
// export const ExpensesUserAssoc = Expenses.belongsTo(User);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS91c2VyY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFTLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDcEIsT0FBTyxJQUFJLE1BQU0sbUJBQW1CLENBQUM7QUFDckMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsU0FBUyxhQUFhO0lBQ2xCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUksU0FBUyxHQUFjLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVqRixPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLGFBQWEsRUFBRSxDQUFDO0FBRTFDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsc0JBQXNCO0lBQ3hDLElBQUc7UUFDQyxNQUFNLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDbEQ7SUFDRCxPQUFNLEdBQUcsRUFBRTtRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQUFBLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNqQyxFQUFFLEVBQUU7UUFDQSxVQUFVLEVBQUUsSUFBSTtRQUNoQixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQzlCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0NBQ0osRUFBQztJQUNFLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLFNBQVMsRUFBRSxNQUFNO0NBQ3BCLENBQUMsQ0FBQztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3pDLEVBQUUsRUFBRTtRQUNBLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixhQUFhLEVBQUUsSUFBSTtRQUNuQixTQUFTLEVBQUUsSUFBSTtLQUNsQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsSUFBSTtLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsSUFBSTtLQUNsQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsUUFBUTtRQUN4QixTQUFTLEVBQUUsSUFBSTtRQUNmLFlBQVksRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPO1FBQ3ZCLFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1FBQ3hCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsWUFBWSxFQUFFLElBQUk7S0FDckI7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUyxDQUFDLFFBQVE7UUFDeEIsU0FBUyxFQUFFLElBQUk7UUFDZixZQUFZLEVBQUUsSUFBSTtLQUNyQjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxTQUFTLENBQUMsT0FBTztRQUN2QixTQUFTLEVBQUUsSUFBSTtRQUNmLFlBQVksRUFBRSxLQUFLO0tBQ3RCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0NBQ0osRUFBQztJQUNFLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLFNBQVMsRUFBRSxVQUFVO0NBQ3hCLENBQUMsQ0FBQztBQUNILDJEQUEyRDtBQUMzRCw2REFBNkQifQ==