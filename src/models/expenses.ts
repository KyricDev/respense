import User from './user.js';
import { Model } from 'sequelize';

export default class Expenses extends Model {
    public id!: string | undefined;
    public userId!: User["id"];
    public type!: string | undefined;
    public value!: number | undefined;
}