import { User } from './user.js';

export default class Expenses{
    public id: string | undefined;
    public userId: User["id"];
    public type: string | undefined;
    public value: number | undefined;

    constructor(user: User){
        this.userId = user.id;
    }
}