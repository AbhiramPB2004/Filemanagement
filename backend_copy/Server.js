const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const path = require('path');

const mongoURI = 'mongodb://127.0.0.1:27017/FileManagment';

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors()); // Enable CORS

let gfs, bucket;

conn.once('open', () => {
    bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
    gfs = bucket.find.bind(bucket);
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

app.get('/', async (req, res) => {
    console.log('GET / from ' + req.ip + ' at ' + new Date() + ' with headers: ' + JSON.stringify(req.headers));
    const test = await gfs({}, { projection: { filename: 1 } }).toArray();
    res.json(test);
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log('POST /upload from ' + req.ip + ' at ' + new Date());
    res.json({ file: req.file });
});

app.get('/download/:filename', async (req, res) => {
    try {
        const files = await gfs({ filename: req.params.filename }).toArray();
        const file = files[0];
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }

        const readstream = bucket.openDownloadStream(new ObjectId(file._id));

        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

        readstream.pipe(res);
    } catch (err) {
        console.error('Error fetching file for download:', err);
        return res.status(500).json({ err: 'Error fetching file for download' });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
