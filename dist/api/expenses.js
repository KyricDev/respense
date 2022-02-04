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
    /*
    try{
    }
    catch(err){
        console.log(err);
    }
    return;
    */
    console.log("Find Expenses Called");
    let result = await expensescontext.findOne({ where: { UserId: req.session.userid } })
        .catch(err => console.log(err));
    if (!result)
        return res.status(202).end();
    let rawExpense = await expensescontext.findAll({ where: { UserId: req.session.userid } });
    rawExpense.sort((expense1, expense2) => {
        let expense1flt = parseFloat(expense1.date.slice(0, 4)) + (parseFloat(expense1.date.slice(5, 7)) / 12);
        let expense2flt = parseFloat(expense2.date.slice(0, 4)) + (parseFloat(expense2.date.slice(5, 7)) / 12);
        return expense1flt - expense2flt;
    });
    let expenses = [];
    let incYear = 0;
    let incMonths = 0;
    rawExpense.map((current, index, array) => {
        let year = parseInt(current.date.slice(0, 4));
        let month = parseInt(current.date.slice(5, 7));
        let lastYear = year;
        let lastMonth = month;
        if (index != 0) {
            lastYear = parseInt(array[index - 1].date.slice(0, 4));
            lastMonth = parseInt(array[index - 1].date.slice(5, 7));
        }
        //console.log(`${index} -- ${year} || ${lastYear}`);
        if (index == 0) {
            expenses.push({
                "year": year,
                "months": [{
                        "month": current.date.slice(5, 7),
                        "expenses": [{
                                "type": current.type,
                                "value": current.value,
                                "id": current.id,
                            }]
                    }],
            });
        }
        else if (year != lastYear) {
            incYear++;
            incMonths = 0;
            expenses.push({
                "year": year,
                "months": [{
                        "month": current.date.slice(5, 7),
                        "expenses": [{
                                "type": current.type,
                                "value": current.value,
                                "id": current.id,
                            }]
                    }],
            });
        }
        else if (month != lastMonth) {
            incMonths++;
            expenses[incYear].months.push({
                "month": current.date.slice(5, 7),
                "expenses": [{
                        "type": current.type,
                        "value": current.value,
                        "id": current.id,
                    }]
            });
        }
        else {
            expenses[incYear].months[incMonths].expenses.push({
                "type": current.type,
                "value": current.value,
                "id": current.id,
            });
        }
    });
    /*
    expenses.forEach( (expense: any) => {
        console.log(expense.year);
        expense.months.forEach( (list: any) => {
            console.log(list);
        })
    })
    */
    res.status(202).send(expenses).end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZW5zZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2V4cGVuc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDbEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JFO0lBQ0Y7Ozs7Ozs7TUFPRTtJQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNwQyxJQUFJLE1BQU0sR0FBRyxNQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsRUFBQyxDQUFDO1NBQzNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUUxQyxJQUFJLFVBQVUsR0FBRyxNQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDekYsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRTtRQUNwQyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxF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