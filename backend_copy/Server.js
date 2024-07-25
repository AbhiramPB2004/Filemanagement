const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
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

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
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



app.get('/', (req, res) => {
    console.log('GET / from ' + req.ip + ' at ' + new Date()+ ' with headers: ' + JSON.stringify(req.headers));
    res.send('Hello, world!');
});

app.post('/upload',upload.single('file'),(req, res) => { 
    console.log('GET / from ' + req.ip + ' at ' + new Date());
    res.json({ file: req.file });
});


app.post('/filenames', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    gfs.files.find({}, { projection: { filename: 1 } })
      .skip(skip)
      .limit(limit)
      .toArray((err, files) => {
        if (err) {
          return res.status(500).json({ err: 'Error fetching files' });
        }
        if (!files || files.length === 0) {
          return res.status(404).json({ err: 'No files exist' });
        }
        const filenames = files.map(file => file.filename);
        return res.json(filenames);
      });
  });
  
  



const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});