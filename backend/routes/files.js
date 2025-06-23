const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

router.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'No file found' });
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
});
