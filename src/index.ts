import express from 'express';
import path from 'path';

const app = express();
const port: number = 80;
const __dirname: string = path.resolve();

app.use(express.static(path.join(__dirname, "dist/public")));

app.get('', (req: express.Request, res: express.Response) => {
    res.write("Hello");
    res.end();
});

app.listen(port, () => console.log("listening on port " + port));