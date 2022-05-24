import jwt from 'jsonwebtoken';

// password 敏感信息不要放到 token 当中
export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
    }, process.env.JWT_SECRET || 'huang', {
        expiresIn: '30d',
    });
};