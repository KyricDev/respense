import { Sequelize, DataTypes } from 'sequelize';
import User from '../models/user.js';
import Expenses from '../models/expenses.js';
function initSequelize() {
    //let appsettings = JSON.parse(fs.readFileSync('src/appsettings.json', 'utf-8'));
    //let sequelize: Sequelize = new Sequelize(appsettings.connectionstrings.postgres);
    let sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS91c2VyY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFTLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV4RCxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUNyQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUc3QyxTQUFTLGFBQWE7SUFDbEIsaUZBQWlGO0lBQ2pGLG1GQUFtRjtJQUNuRixJQUFJLFNBQVMsR0FBYyxJQUFJLFNBQVMsQ0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWEsRUFBRztRQUNsRSxjQUFjLEVBQUM7WUFDWCxHQUFHLEVBQUM7Z0JBQ0EsT0FBTyxFQUFFLElBQUk7Z0JBQ2Isa0JBQWtCLEVBQUUsS0FBSzthQUM1QjtTQUNKO0tBQ0osQ0FBQyxDQUFDO0lBRUgsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQztBQUUxQyxNQUFNLENBQUMsS0FBSyxVQUFVLHNCQUFzQjtJQUN4QyxJQUFHO1FBQ0MsTUFBTSxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsT0FBTSxHQUFHLEVBQUU7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtBQUNMLENBQUM7QUFBQSxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDakMsRUFBRSxFQUFFO1FBQ0EsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUM5QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtDQUNKLEVBQUM7SUFDRSxTQUFTLEVBQUUsVUFBVTtJQUNyQixTQUFTLEVBQUUsTUFBTTtDQUNwQixDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUN6QyxFQUFFLEVBQUU7UUFDQSxVQUFVLEVBQUUsSUFBSTtRQUNoQixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsYUFBYSxFQUFFLElBQUk7UUFDbkIsU0FBUyxFQUFFLElBQUk7S0FDbEI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDbkI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUyxDQUFDLFFBQVE7UUFDeEIsU0FBUyxFQUFFLElBQUk7UUFDZixZQUFZLEVBQUUsSUFBSTtLQUNyQjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTLENBQUMsT0FBTztRQUN2QixTQUFTLEVBQUUsSUFBSTtLQUNsQjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTLENBQUMsUUFBUTtRQUN4QixTQUFTLEVBQUUsSUFBSTtRQUNmLFlBQVksRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1FBQ3hCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsWUFBWSxFQUFFLElBQUk7S0FDckI7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUyxDQUFDLE9BQU87UUFDdkIsU0FBUyxFQUFFLElBQUk7UUFDZixZQUFZLEVBQUUsS0FBSztLQUN0QjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtDQUNKLEVBQUM7SUFDRSxTQUFTLEVBQUUsVUFBVTtJQUNyQixTQUFTLEVBQUUsVUFBVTtDQUN4QixDQUFDLENBQUM7QUFDSCwyREFBMkQ7QUFDM0QsNkRBQTZEIn0=