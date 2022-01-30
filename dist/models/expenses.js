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
            case "07":
                return "Aug";
                break;
            case "08":
                return "Sep";
                break;
            case "09":
                return "Oct";
                break;
            case "10":
                return "Nov";
                break;
            case "11":
                return "Dec";
                break;
            default:
                return "ERROR";
                break;
        }
    }
    getMonthFromNumber(month) {
        switch (month) {
            case 0:
                return "Jan";
                break;
            case 1:
                return "Feb";
                break;
            case 2:
                return "Mar";
                break;
            case 3:
                return "Apr";
                break;
            case 4:
                return "May";
                break;
            case 5:
                return "Jun";
                break;
            case 6:
                return "Jul";
                break;
            case 7:
                return "Aug";
                break;
            case 8:
                return "Sep";
                break;
            case 9:
                return "Oct";
                break;
            case 10:
                return "Nov";
                break;
            case 11:
                return "Dec";
                break;
            default:
                return "ERROR";
                break;
        }
    }
    getMonthString() {
        return this.getMonth(this.date);
    }
    getMonthStart() {
        return this.getMonth(this.periodStart);
    }
    getMonthEnd() {
        return this.getMonth(this.periodEnd);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZW5zZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2V4cGVuc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsS0FBSztJQVUvQixRQUFRLENBQUMsS0FBYTtRQUMxQixRQUFRLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDO1lBQ3RCLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssSUFBSTtnQkFDTCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOO2dCQUNJLE9BQU8sT0FBTyxDQUFDO2dCQUNuQixNQUFNO1NBQ1Q7SUFDTCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsS0FBYTtRQUNuQyxRQUFRLEtBQUssRUFBQztZQUNWLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssRUFBRTtnQkFDSCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOLEtBQUssRUFBRTtnQkFDSCxPQUFPLEtBQUssQ0FBQTtnQkFDaEIsTUFBTTtZQUNOO2dCQUNJLE9BQU8sT0FBTyxDQUFDO2dCQUNuQixNQUFNO1NBQ1Q7SUFDTCxDQUFDO0lBRU0sY0FBYztRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDSiJ9