import { Model } from 'sequelize';

export default class Expenses extends Model {
    public id!: string | undefined;
    public type!: string | undefined;
    public value!: number | undefined;
    public month!: string;
    public isRecurring!: boolean | undefined;
    public periodStart!: string;
    public periodEnd!: string;

    private getMonth(month: string): string{
        switch (month.slice(5, 7)){
            case "00": 
                return "Jan"
            break;
            case "01": 
                return "Feb"
            break;
            case "02": 
                return "Mar"
            break;
            case "03": 
                return "Apr"
            break;
            case "04": 
                return "May"
            break;
            case "05": 
                return "Jun"
            break;
            case "06": 
                return "Jul"
            break;
            case "08": 
                return "Aug"
            break;
            case "09": 
                return "Sep"
            break;
            case "10": 
                return "Oct"
            break;
            case "11": 
                return "Nov"
            break;
            case "12": 
                return "Dec"
            break;
            default:
                return "ERROR";
            break;
        }
    }

    public getMonthString(): string{
        return this.getMonth(this.month);
    }

    public getMonthStart(): string{
        return this.getMonth(this.periodStart);
    }

    public getMonthEnd(): string{
        return this.getMonth(this.periodEnd);
    }
}