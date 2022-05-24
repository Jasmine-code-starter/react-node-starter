import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const userInfo = req.body;

    if (!userInfo.username || !userInfo.password) {
        return res.send({status: 1, message: '输入不合法'});
    }

    const findUser = await User.findOne({where: {username: userInfo.username}});
    if (findUser) {
        return res.errorHanler('用户名被占用，请更换用户名');
    }

    const createUser = await User.create({
        username: userInfo.username,
        password: bcrypt.hashSync(userInfo.password, 10),
    });

    if (!createUser) {
        return res.errorHanler('注册失败，请稍后再试');
    }
    res.send({status: 0, message: '注册成功' });
   
}))


userRouter.post(
    '/login', 
    expressAsyncHandler(async (req, res) => {
        const userInfo  = req.body;
        if (!userInfo.username || !userInfo.password) {
            return res.send({status: 1, message: '输入不合法'});
        }

        const findUser = await User.findOne({ where: { username: userInfo.username } });
        if (findUser) {
            if (bcrypt.compareSync(userInfo.password, findUser.password)) {
                return res.send({status: 0, message: '登录成功!', token: 'Bearer' + generateToken(userInfo)});
            } else {
                return  res.status(401).send({ message: "Invalid email or password" });
            }
        }

        res.errorHanler('用户不存在，请先进行注册！');

}));

export default userRouter;