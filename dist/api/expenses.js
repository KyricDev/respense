import { expensescontext } from '../data/usercontext.js';
export default async function (req, res, next) {
    /*
    res.status(200)
       .send({
            "name": "Hi",
            "expenses": [
                {
                    "id": "1",
                    "type": "House",
                    "value": "4000",
                    "description": "January"
                },
                {
                    "id": "2",
                    "type": "Electricity",
                    "value": "2000",
                    "description": "January"
                }
            ]
       })
       .end();
    */
    try {
        let rawExpenses = await expensescontext.findAll({ where: { UserId: req.session.userid } });
        let expenses = [];
        rawExpenses.forEach(expense => {
            if (!expense.isRecurring) {
                expenses.push({
                    "type": expense.type,
                    "value": expense.value,
                    "month": parseInt(expense.month.slice(5, 7))
                    //"month": expense.getMonthString()
                });
            }
            else {
                let periodStart = parseInt(expense.periodStart.slice(0, 4)) + parseInt(expense.periodStart.slice(5, 7));
                let periodEnd = parseInt(expense.periodEnd.slice(0, 4)) + parseInt(expense.periodEnd.slice(5, 7));
                let monthPeriod = periodEnd - periodStart;
                for (let i = 0; i < monthPeriod; i++) {
                    expenses.push({
                        "type": expense.type,
                        "value": expense.value,
                        "month": parseInt(expense.periodStart.slice(5, 7)) + i
                        //"month": expense.getMonthFromNumber( parseInt( expense.periodStart.slice(5, 7) ) + i )
                    });
                }
            }
        });
        expenses.sort((element1, element2) => {
            return element1.month - element2.month;
        });
        let newExpenses = [];
        let expensesIndex = 0;
        expenses.forEach((current, index, expense) => {
            if (index == 0 || current.month != expense[index - 1].month) {
                newExpenses.push({
                    "month": current.month,
                    "id": expensesIndex,
                    "expenses": [{
                            "type": current.type,
                            "value": current.value
                        }]
                });
                expensesIndex++;
                return;
            }
            else {
                newExpenses[expensesIndex - 1].expenses.push({
                    "type": current.type,
                    "value": current.value
                });
            }
        });
        res.status(202).send(newExpenses).end();
    }
    catch (err) {
        console.log(err);
    }
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZW5zZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2V4cGVuc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDbEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JFO0lBQ0YsSUFBRztRQUNDLElBQUksV0FBVyxHQUFHLE1BQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFFNUIsV0FBVyxDQUFDLE9BQU8sQ0FBRSxPQUFPLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDdEIsUUFBUSxDQUFDLElBQUksQ0FBRTtvQkFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ3BCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDdEIsT0FBTyxFQUFFLFFBQVEsQ0FBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUU7b0JBQzlDLG1DQUFtQztpQkFDdEMsQ0FBQyxDQUFDO2FBQ047aUJBQ0k7Z0JBQ0QsSUFBSSxXQUFXLEdBQVcsUUFBUSxDQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLFFBQVEsQ0FBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDcEgsSUFBSSxTQUFTLEdBQVcsUUFBUSxDQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLFFBQVEsQ0FBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDOUcsSUFBSSxXQUFXLEdBQVcsU0FBUyxHQUFHLFdBQVcsQ0FBQztnQkFFbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDWixNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUk7d0JBQ3BCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSzt3QkFDdEIsT0FBTyxFQUFFLFFBQVEsQ0FBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDO3dCQUN4RCx3RkFBd0Y7cUJBQ3pGLENBQUMsQ0FBQTtpQkFDTDthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFRixRQUFRLENBQUMsSUFBSSxDQUFFLENBQUMsUUFBYSxFQUFFLFFBQWEsRUFBRSxFQUFFO1lBQzVDLE9BQU8sUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQzFDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxXQUFXLEdBQVUsRUFBRSxDQUFDO1FBQzVCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixRQUFRLENBQUMsT0FBTyxDQUFFLENBQUMsT0FBWSxFQUFFLEtBQWEsRUFBRSxPQUFZLEVBQUUsRUFBRTtZQUM1RCxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDekQsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDYixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3RCLElBQUksRUFBRSxhQUFhO29CQUNuQixVQUFVLEVBQUUsQ0FBQzs0QkFDVCxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUk7NEJBQ3BCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSzt5QkFDekIsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU87YUFDVjtpQkFDRztnQkFDQSxXQUFXLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ3pDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDcEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2lCQUN6QixDQUFDLENBQUE7YUFDTDtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDM0M7SUFDRCxPQUFNLEdBQUcsRUFBQztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7SUFDRCxPQUFPO0FBQ1gsQ0FBQyJ9