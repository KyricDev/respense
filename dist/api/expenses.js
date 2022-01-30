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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZW5zZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2V4cGVuc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7SUFDbEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JFO0lBQ0Y7Ozs7Ozs7TUFPRTtJQUNGLElBQUksVUFBVSxHQUFHLE1BQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN6RixVQUFVLENBQUMsSUFBSSxDQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ3BDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUUsQ0FBQztRQUN6RyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFFLENBQUM7UUFDekcsT0FBTyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxRQUFRLEdBQVEsRUFBRSxDQUFDO0lBQ3ZCLElBQUksT0FB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