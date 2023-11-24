import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
