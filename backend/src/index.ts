import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Server is running' });
});

const start = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};

start();
