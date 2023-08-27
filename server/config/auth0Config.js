import jwt from "jsonwebtoken";
import statusCode from "../constants/statusCode.js";
import { findUser } from "../services/userService.js";

const jwtCheck = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.slice(7);
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(statusCode.NOT_AUTHORIZE).send({ error: 'Authorization failed' });
            } else {
                const user = await findUser(decodedToken.email, decodedToken.password);
                if (user)
                    next();
                else
                    res.status(statusCode.NOT_AUTHORIZE).send({ error: 'Account not found' });
            }
        });
    } else {
        res.status(statusCode.NOT_AUTHORIZE).send({ error: 'You must be logged in' });
    }

};

export default jwtCheck