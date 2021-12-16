import { createHash, getHashes, Hash } from "crypto";

export class User{
    id: string;
    username: string;
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        const hash = createHash('sha512');

        this.id = hash.update(username).digest('hex');
        this.password = hash.update(password).digest('hex');
    }
}