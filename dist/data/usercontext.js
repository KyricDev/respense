import { Sequelize, DataTypes } from 'sequelize';
import User from '../models/user.js';
import Expenses from '../models/expenses.js';
function initSequelize() {
    //let appsettings = JSON.parse(fs.readFileSync('src/appsettings.json', 'utf-8'));
    //let sequelize: Sequelize = new Sequelize(appsettings.connectionstrings.postgres);
    let sequelize = new Sequelize(process.env.DATABASE_URL);
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
}, {
    sequelize: connection,
    modelName: 'Expenses'
});
// export const UserExpensesAssoc = User.hasMany(Expenses);
// export const ExpensesUserAssoc = Expenses.belongsTo(User);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS91c2VyY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFTLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV4RCxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUNyQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUc3QyxTQUFTLGFBQWE7SUFDbEIsaUZBQWlGO0lBQ2pGLG1GQUFtRjtJQUNuRixJQUFJLFNBQVMsR0FBYyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWEsQ0FBQyxDQUFDO0lBRXBFLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsYUFBYSxFQUFFLENBQUM7QUFFMUMsTUFBTSxDQUFDLEtBQUssVUFBVSxzQkFBc0I7SUFDeEMsSUFBRztRQUNDLE1BQU0sVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUNsRDtJQUNELE9BQU0sR0FBRyxFQUFFO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7QUFDTCxDQUFDO0FBQUEsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2pDLEVBQUUsRUFBRTtRQUNBLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixZQUFZLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDOUIsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDbkI7Q0FDSixFQUFDO0lBQ0UsU0FBUyxFQUFFLFVBQVU7SUFDckIsU0FBUyxFQUFFLE1BQU07Q0FDcEIsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDekMsRUFBRSxFQUFFO1FBQ0EsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ25CO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1FBQ3hCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsWUFBWSxFQUFFLElBQUk7S0FDckI7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsU0FBUyxDQUFDLE9BQU87UUFDdkIsU0FBUyxFQUFFLElBQUk7S0FDbEI7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsU0FBUyxDQUFDLFFBQVE7UUFDeEIsU0FBUyxFQUFFLElBQUk7UUFDZixZQUFZLEVBQUUsSUFBSTtLQUNyQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxTQUFTLENBQUMsUUFBUTtRQUN4QixTQUFTLEVBQUUsSUFBSTtRQUNmLFlBQVksRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPO1FBQ3ZCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsWUFBWSxFQUFFLEtBQUs7S0FDdEI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDbkI7Q0FDSixFQUFDO0lBQ0UsU0FBUyxFQUFFLFVBQVU7SUFDckIsU0FBUyxFQUFFLFVBQVU7Q0FDeEIsQ0FBQyxDQUFDO0FBQ0gsMkRBQTJEO0FBQzNELDZEQUE2RCJ9