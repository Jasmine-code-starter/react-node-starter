import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import multer from 'multer';
import path from 'path';
import Album from '../models/albumModel.js';
import { uuid } from 'uuidv4';

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
    '/:id',
    expressAsyncHandler(async (req, res) => {
        console.log(req.params.id);
        let user = await User.findByPk(req.params.id);
        if (user) {
            res.send(user);
        } else {
            return res.errorHanler('update failed');
        }

}));



userRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        // console.log(req.params.id);
        const users = await User.findAll();
        res.send(users);
}));

const DIR = './public/images';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        // const filename = file.originalname.toLowerCase().split('').join('-');
        cb(null, uuid() + '-' +  file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Give proper files formate to upload'));
        }
    }
})


userRouter.post(
    '/upload-images',
    upload.array('imgCollection', 6),
    expressAsyncHandler(async (req, res, next) => {
        const filesString = req.files.map(file => file.filename).join(';');
        const album = await Album.create({
            imageCollection: filesString,
            userId: req.body.userId
        });

        await album.save();

        if (album) {
            res.status(200).send({status: 0, message: 'upload done!', album: album});
        } else {
            return res.errorHanler('upload failed');
        }
}));


userRouter.get(
    '/:id/upload-images',
    expressAsyncHandler(async (req, res) => {
        console.log(req.params.id);
        const findAlbum = await Album.findOne({ where: { userId: req.params.id } });


        if (!findAlbum) {
            return res.errorHanler('Failed');
        }

        let files = findAlbum.imageCollection.split(';');
        console.log(files, 'files');
        const url = req.protocol + '://' + req.get('host');
        const reqFiles = files.map(file => url + '/public/images/' + file);
    
        res.status(200).send({status: 0, album: reqFiles});
}));



export default userRouter;