const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const cors = require('cors')
const comments = require('../CloneTube_backend/routes/comments');
const replies  = require('../CloneTube_backend/routes/comments');

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/comments/', comments);
app.use('/api/comments/replies', replies);

const port = process.env.PORT || 5000;
app.listen(port, () => {
 console.log(`Server started on port: ${port}`);
});


