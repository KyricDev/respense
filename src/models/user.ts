import  bcrypt  from "bcrypt";
import { v4 } from "uuid";
import Expenses from "./expenses.js";
import { Model } from "sequelize"

export default class User extends Model{
    public id!: string;
    public username!: string;
    public password!: string;
    public salt!: string;
    public expenses!: Expenses[];

    public initialize(){
        this.id = v4();
        this.salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, this.salt);
        this.expenses = [];
    }
    public hashPassword(password: string){
        this.salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password, this.salt);
    }
    public validatePassword(password: string): boolean {
        let enteredPassword = bcrypt.hashSync(password, this.salt);
        if (enteredPassword == this.password) return true;
        return false;
    }
}