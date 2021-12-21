import { Sequelize, Model, DataTypes } from 'sequelize';
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
    }
    catch (err) {
        console.log("Database Connection Failed.");
        console.log(err);
    }
}
;
class User extends Model {
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
}, {
    sequelize: connection,
    modelName: 'User'
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYXRhL3VzZXJjb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFHcEIsU0FBUyxhQUFhO0lBQ2xCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUksU0FBUyxHQUFjLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVqRixPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLGFBQWEsRUFBRSxDQUFDO0FBRTFDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsc0JBQXNCO0lBQ3hDLElBQUc7UUFDQyxNQUFNLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDbEQ7SUFDRCxPQUFNLEdBQUcsRUFBRTtRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQUFBLENBQUM7QUFFRixNQUFNLElBQUssU0FBUSxLQUFLO0NBQ3ZCO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDakMsRUFBRSxFQUFFO1FBQ0EsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO1FBQ3BCLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUM5QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtDQUNKLEVBQUM7SUFDRSxTQUFTLEVBQUUsVUFBVTtJQUNyQixTQUFTLEVBQUUsTUFBTTtDQUNwQixDQUFDLENBQUMifQ==