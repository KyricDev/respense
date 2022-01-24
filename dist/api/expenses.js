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
        let expenses = await expensescontext.findAll({ where: { UserId: req.session.userid } });
        let newExpenses = expenses.map(expense => {
            if (!expense.isRecurring) {
                return ({
                    "type": expense.type,
                    "value": expense.value,
                    "month": expense.getMonthString()
                });
            }
        });
        res.status(202).send(expenses).end();
    }
    catch (err) {
        console.log(err);
    }
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZW5zZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2V4cGVuc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDbEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JFO0lBQ0YsSUFBRztRQUNDLElBQUksUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsQ0FBQztRQUV2RixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUN0QixPQUFPLENBQUM7b0JBQ0osTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNwQixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFO2lCQUNwQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDeEM7SUFDRCxPQUFNLEdBQUcsRUFBQztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7SUFDRCxPQUFPO0FBQ1gsQ0FBQyJ9