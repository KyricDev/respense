import { Model } from 'sequelize';
export default class Expenses extends Model {
    getMonth(month) {
        switch (month.slice(5, 7)) {
            case "00":
                return "Jan";
                break;
            case "01":
                return "Feb";
                break;
            case "02":
                return "Mar";
                break;
            case "03":
                return "Apr";
                break;
            case "04":
                return "May";
                break;
            case "05":
                return "Jun";
                break;
            case "06":
                return "Jul";
                break;
            case "08":
                return "Aug";
                break;
            case "09":
                return "Sep";
                break;
            case "10":
                return "Oct";
                break;
            case "11":
                return "Nov";
                break;
            case "12":
                return "Dec";
                break;
            default:
                return "ERROR";
                break;
        }
    }
    getMonthString() {
        return this.getMonth(this.month);
    }
    getMonthStart() {
        return this.getMonth(this.periodStart);
    }
    getMonthEnd() {
        return this.getMonth(this.periodEnd);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZW5zZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2V4cGVuc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsS0FBSztJQVMvQixRQUFRLENBQUMsS0FBYTtRQUMxQixRQUFRLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDO1lBQ3RCLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOO2dCQUNJLE9BQU8sT0FBTyxDQUFDO2dCQUNuQixNQUFNO1NBQ1Q7SUFDTCxDQUFDO0lBRU0sY0FBYztRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDSiJ9