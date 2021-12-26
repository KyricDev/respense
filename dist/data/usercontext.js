import { Sequelize, Model, DataTypes } from 'sequelize';
import fs from 'fs';
import bcrypt from "bcrypt";
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
    validatePassword(password) {
        let hash = bcrypt.hashSync(password, this.salt);
        if (hash != this.password)
            return false;
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
}, {
    sequelize: connection,
    modelName: 'User'
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYXRhL3VzZXJjb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFcEIsT0FBUSxNQUFNLE1BQU8sUUFBUSxDQUFDO0FBRzlCLFNBQVMsYUFBYTtJQUNsQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvRSxJQUFJLFNBQVMsR0FBYyxJQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFakYsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQztBQUUxQyxNQUFNLENBQUMsS0FBSyxVQUFVLHNCQUFzQjtJQUN4QyxJQUFHO1FBQ0MsTUFBTSxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsT0FBTSxHQUFHLEVBQUU7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtBQUNMLENBQUM7QUFBQSxDQUFDO0FBRUYsTUFBTSxJQUFLLFNBQVEsS0FBSztJQU1iLGdCQUFnQixDQUFDLFFBQWU7UUFDbkMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDakMsRUFBRSxFQUFFO1FBQ0EsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO1FBQ3BCLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUM5QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNuQjtDQUNKLEVBQUM7SUFDRSxTQUFTLEVBQUUsVUFBVTtJQUNyQixTQUFTLEVBQUUsTUFBTTtDQUNwQixDQUFDLENBQUMifQ==