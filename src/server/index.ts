import express from 'express';

const app = express();
const port = 80;

app.get('', (req: any, res: any) => {
    res.write("Hello");
    res.end();
});

app.listen(port, () => console.log("listening on port " + port));