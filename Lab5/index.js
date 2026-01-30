const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require("helmet");
const { sanitizeMongoInput } = require("express-v5-mongo-sanitize");
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
require('dotenv').config();

const rateLimiter = require('./middlewares/rateLimiter');
const userRouter = require('./Router/user');
const postRouter = require('./Router/post');
const donationRouter = require("./Router/donation");
const errorHandler = require('./middlewares/errorHandler');




const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(sanitizeMongoInput);
app.use(xss());
app.use(hpp());
app.use(rateLimiter);

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/donation', donationRouter);


app.use(errorHandler);

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(() => {
        console.log('✅✅ Connected to MongoDB');
    }).catch((err) => {
        console.log('❌❌ Connected to MongoDB');
        console.log(err);
    });
    console.log(`✅✅ Server is running on Port:${PORT}`);
});