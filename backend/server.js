import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from "./routers/userRouter.js";
import Joi from '@hapi/joi';
import { expressjwt } from 'express-jwt';
import './db/index.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// 统一处理失败处理
app.use((req, res, next) => {
    res.errorHanler = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next();
})


app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) res.errorHanler(err);
    if (err.name === 'UnauthorizedError') return res.errorHanler('身份认证失败');
    res.errorHanler(err);
    next();
})

app.use('/public', express.static('./public'));
app.use(expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['RS256'] }).unless({path: [/^\/api/]}));
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

app.get('/', (req, res) => {
    res.send('server is ready');
})

app.listen(3007, () => {
    console.log('server at http://localhost:3007is running');
})