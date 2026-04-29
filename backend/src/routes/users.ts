import express from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { email, password, displayName } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new UserModel({
            email,
            password: hash,
            displayName,
            avatar: null,
            role: 'user',
            token: nanoid()
        });

        await user.save();

        return res.send({
            _id: user._id,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar,
            role: user.role,
            token: user.token
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

usersRouter.post('/sessions', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: 'Email or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Email or password is incorrect' });
        }

        user.token = nanoid();
        await user.save();

        return res.send({
            _id: user._id,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar,
            role: user.role,
            token: user.token
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Something went wrong' });
    }
});

export default usersRouter;