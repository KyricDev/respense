import { Model } from 'sequelize';

export default class Expenses extends Model {
    public id!: string | undefined;
    public type!: string | undefined;
    public value!: number | undefined;
    public date!: string;
    public isRecurring!: boolean | undefined;
    public periodStart!: string;
    public periodEnd!: string;
    public isComplete!: boolean;

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
            case "07": 
                return "Aug"
            break;
            case "08": 
                return "Sep"
            break;
            case "09": 
                return "Oct"
            break;
            case "10": 
                return "Nov"
            break;
            case "11": 
                return "Dec"
            break;
            default:
                return "ERROR";
            break;
        }
    }

    public getMonthFromNumber(month: number): string{
        switch (month){
            case 0: 
                return "Jan"
            break;
            case 1: 
                return "Feb"
            break;
            case 2: 
                return "Mar"
            break;
            case 3: 
                return "Apr"
            break;
            case 4: 
                return "May"
            break;
            case 5: 
                return "Jun"
            break;
            case 6: 
                return "Jul"
            break;
            case 7: 
                return "Aug"
            break;
            case 8: 
                return "Sep"
            break;
            case 9: 
                return "Oct"
            break;
            case 10: 
                return "Nov"
            break;
            case 11: 
                return "Dec"
            break;
            default:
                return "ERROR";
            break;
        }
    }

    public getMonthString(): string{
        return this.getMonth(this.date);
    }

    public getMonthStart(): string{
        return this.getMonth(this.periodStart);
    }

    public getMonthEnd(): string{
        return this.getMonth(this.periodEnd);
    }
}