import { Model } from 'sequelize';

export default class Expenses extends Model {
    public id!: string | undefined;
    public type!: string | undefined;
    public value!: number | undefined;
    public month!: number | undefined;
    public isRecurring!: boolean | undefined;
    public periodStart!: number | undefined;
    public periodEnd!: number | undefined;
}