import express, { Request, Response } from 'express';
import cors from "cors";
import { connect } from './database/connection';
import 'dotenv/config'
import path from 'path';
import dotenv from 'dotenv';
import employeesRouters from './routes/employee'


const app = express();
const PORT = process.env.PORT ||  5000;

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(cors());

app.use("/api/employees", employeesRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT}`)
})

connect()