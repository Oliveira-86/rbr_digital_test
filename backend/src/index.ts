import express, { Request, Response } from 'express';
import cors from "cors";
import { connect } from './database/connection';
import 'dotenv/config'
import path from 'path';
import dotenv from 'dotenv';


const app = express();
const PORT = process.env.PORT ||  5000;

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT}`)
})

connect()