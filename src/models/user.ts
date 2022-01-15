import { createHash } from "crypto";
import  bcrypt  from "bcrypt";
import { v4 } from "uuid";
import Expenses from "./expenses.js";

export class User{
    public id: string;
    public username: string;
    public password: string;
    public salt: string;
    public expenses: Expenses[];

    constructor(username: string, password: string){
        this.id = v4();
        this.username = username;
        this.salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password, this.salt);
        this.expenses = [];
    }
}