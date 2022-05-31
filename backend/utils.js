import jwt from 'jsonwebtoken';

// Don't put password into the token
export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
    }, process.env.JWT_SECRET || 'huang', {
        expiresIn: '30d',
    });
};


export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(10, authorization.length);
        jwt.verify(
          token,
          process.env.JWT_SECRET || "huang",
          (err, decode) => {
            if (err) {
              res.status(401).send({ message: "Invalid Token" });
            } else {
              req.user = decode;
              next();
            }
          }
        );
      } else {
        res.status(401).send({ message: "No Token" });
    }
}


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({message: "Invalid Admin Token"})
    }
}