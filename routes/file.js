const router = require('express').Router();
const multer = require('multer');
const path = require("path");
const book = require('../models/book');
const validator = require('validator');
const fs = require('fs');
const {v4: uuid4}=require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        // 34678988-123456789.zip
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 100 },
}).single('myfiles');

const arr = ['Arts & Music', 'engineering', 'law', 'neet', 'engineering_asprient', 'Biographies',
    'Business', 'Comics', 'Computer & Tech', 'Cooking', 'Education & Reference', 'Entertainment',
    'Health & Fitness', 'History', 'Hobbies & Crafts', 'Home & Garden', 'Horror', 'Kids',
    'Literature & Fiction', 'Medical', 'Mystery', 'Parenting', 'Religion', 'Romance', 'Sci-Fi & Fantasy',
    'Science & Maths', 'Self-Help', 'Social Sciences', 'Sports', 'Travel', 'True Crime'];

router.post('/', (req, res) => {
    console.log(`book called`);
    upload(req, res, async (err) => {
        // validate request
        const bookName = req.body.bookName;
        const autherName = req.body.autherName;
        const publisherName = req.body.publisherName;
        const bookDescription = req.body.bookDescription;
        const userId = req.body.userId;
        const catagory=req.body.catagory;
        if(!req.file) return res.status(300).json({ error: 'No file is provided' });
        if(!arr.includes(catagory)){
            fs.unlinkSync(req.file.path);
            return res.status(300).json({ error: 'catagory is not from our list' });
        }
        if (validator.isEmpty(bookName) || validator.isEmpty(autherName) || validator.isEmpty(publisherName) || validator.isEmpty(bookDescription)) {
            fs.unlinkSync(req.file.path);
            return res.status(300).json({ error: 'All fields are required' });
        }
        if (validator.isEmpty(userId)) {
            fs.unlinkSync(req.file.path);
            return res.status(300).json({ error: 'please login first' });
        }
        if (!req.file) {
            return res.status(300).json({ error: 'no file is provided' });
        }
        if (err) {
            fs.unlinkSync(req.file.path);
            return res.status(500).send({ error: err.message }); // dought
        }

        // store into database
        const uuid=uuid4();
        const file = new book({
            name: bookName,
            autherName: autherName,
            publisherName: publisherName,
            catagory: catagory,
            bookDescription: bookDescription,
            path: req.file.path,
            size: req.file.size,
            uuid: uuid,
            readLink:`${process.env.APP_BASE_URL}/reads/${uuid}`,
            userId: userId
        });

        const response = await file.save();
        console.log(`${path.join(__dirname, '../uploads', req.file.filename)}`);
        console.log(response);
        return res.send(response);
    });

});



module.exports = router;