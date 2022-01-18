export default async function (req, res, next) {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3VzZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUNsRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNYLElBQUksQ0FBQztRQUNELE1BQU0sRUFBRSxJQUFJO1FBQ1osVUFBVSxFQUFFO1lBQ1I7Z0JBQ0ksSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsYUFBYSxFQUFFLFNBQVM7YUFDM0I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsR0FBRztnQkFDVCxNQUFNLEVBQUUsYUFBYTtnQkFDckIsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsYUFBYSxFQUFFLFNBQVM7YUFDM0I7U0FDSjtLQUNMLENBQUM7U0FDRCxHQUFHLEVBQUUsQ0FBQztBQUNkLENBQUMifQ==