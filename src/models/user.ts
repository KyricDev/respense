import { createHash } from "crypto";
import  bcrypt  from "bcrypt";
import { v4 } from "uuid";

export class User{
    id: string;
    username: string;
    password: string;
    salt: string;

    constructor(username: string, password: string){
        this.id = v4();
        this.username = username;
        this.salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password, this.salt)
    }
}