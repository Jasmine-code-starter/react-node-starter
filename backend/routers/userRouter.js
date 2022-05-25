import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const userInfo = req.body;

    if (!userInfo.username || !userInfo.password) {
        return res.send({ status: 1, message: '输入不合法' });
    }

    const findUser = await User.findOne({ where: { username: userInfo.username } });
    if (findUser) {
        return res.errorHanler('用户名被占用，请更换用户名');
    }

    const createUser = await User.create({
        username: userInfo.username,
        password: bcrypt.hashSync(userInfo.password, 10),
    });

    if (!createUser) {
        return res.errorHanler('Register failed, Please try again!');
    }
    res.send({ status: 0, message: 'Register success', id:  createUser.id});

}))


userRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
        const userInfo = req.body;
        if (!userInfo.username || !userInfo.password) {
            return res.send({ status: 1, message: 'Invalid username or password !' });
        }

        const findUser = await User.findOne({ where: { username: userInfo.username } });
        if (findUser) {
            if (bcrypt.compareSync(userInfo.password, findUser.password)) {
                return res.send({ status: 0, message: '登录成功!', token: 'Bearer' + generateToken(userInfo), id: findUser.id });
            } else {
                return res.status(401).send({ message: "Invalid email or password" });
            }
        }

        res.errorHanler('User is not exist，Please register first！');

    }));


userRouter.put(
    '/update/:id',
    expressAsyncHandler(async (req, res) => {
        console.log(req.params.id);
        let user = await User.findByPk(req.params.id);
        if (user) {
            user.username = req.body.username || user.username;
            const { firstname, lastname, gender, birthdate } = req.body;
            await user.set({
                firstname,
                lastname,
                gender,
                birthdate
            })
            const updateUser = await user.save();

            res.send({ status: 0, message: 'update user success!', token: 'Bearer' + generateToken(updateUser), user: updateUser })
        } else {
            return res.errorHanler('update failed');
        }

}));

userRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        console.log(req.params.id);
        const users = await User.findAll();
        res.send(users);
}));


export default userRouter;