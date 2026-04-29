import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';

export interface AuthRequest extends Request {
    user?: any;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({ error: 'No token provided' });
        }

        const user = await UserModel.findOne({ token });

        if (!user) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        req.user = user;

        next();

    } catch (e) {
        console.error(e);
        res.status(401).send({ error: 'Unauthorized' });
    }
};

export default auth;