import { expensescontext } from '../data/usercontext.js';
function parseMonth(month) {
    let monthStr = '';
    switch (month) {
        case '1':
        case '01':
            monthStr = 'JAN';
            break;
        case '2':
        case '02':
            monthStr = 'FEB';
            break;
        case '3':
        case '03':
            monthStr = 'MAR';
            break;
        case '4':
        case '04':
            monthStr = 'APR';
            break;
        case '5':
        case '05':
            monthStr = 'MAY';
            break;
        case '6':
        case '06':
            monthStr = 'JUN';
            break;
        case '7':
        case '07':
            monthStr = 'JUL';
            break;
        case '8':
        case '08':
            monthStr = 'AUG';
            break;
        case '9':
        case '09':
            monthStr = 'SEP';
            break;
        case '10':
            monthStr = 'OCT';
            break;
        case '11':
            monthStr = 'NOV';
            break;
        case '12':
            monthStr = 'DEC';
            break;
    }
    return monthStr;
}
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
                        "month": parseMonth(current.date.slice(5, 7)),
                        "intMonth": current.date.slice(5, 7),
                        "expenses": [{
                                "type": current.type,
                                "value": current.value,
                                "id": current.id,
                                "isComplete": current.isComplete,
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
                        "month": parseMonth(current.date.slice(5, 7)),
                        "intMonth": current.date.slice(5, 7),
                        "expenses": [{
                                "type": current.type,
                                "value": current.value,
                                "id": current.id,
                                "isComplete": current.isComplete,
                            }]
                    }],
            });
        }
        else if (month != lastMonth) {
            incMonths++;
            expenses[incYear].months.push({
                "month": parseMonth(current.date.slice(5, 7)),
                "intMonth": current.date.slice(5, 7),
                "expenses": [{
                        "type": current.type,
                        "value": current.value,
                        "id": current.id,
                        "isComplete": current.isComplete,
                    }]
            });
        }
        else {
            expenses[incYear].months[incMonths].expenses.push({
                "type": current.type,
                "value": current.value,
                "id": current.id,
                "isComplete": current.isComplete,
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
    expenses.forEach((expenseByYear) => {
        expenseByYear.months.forEach((expenseByMonth) => {
            expenseByMonth.expenses.sort((expense1, expense2) => {
                return parseInt(expense1.id) - parseInt(expense2.id);
            });
        });
    });
    res.status(202).send(expenses).end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZW5zZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2V4cGVuc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RSxTQUFTLFVBQVUsQ0FBQyxLQUFhO0lBQzdCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNsQixRQUFRLEtBQUssRUFBQztRQUNWLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJO1lBQ0wsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixNQUFNO1FBQ04sS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUk7WUFDTCxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE1BQU07UUFDTixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSTtZQUNMLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsTUFBTTtRQUNOLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJO1lBQ0wsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixNQUFNO1FBQ04sS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUk7WUFDTCxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE1BQU07UUFDTixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSTtZQUNMLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsTUFBTTtRQUNOLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJO1lBQ0wsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixNQUFNO1FBQ04sS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUk7WUFDTCxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE1BQU07UUFDTixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSTtZQUNMLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsTUFBTTtRQUNOLEtBQUssSUFBSTtZQUNMLFFBQVEsR0FB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