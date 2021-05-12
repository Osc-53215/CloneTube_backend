const mongoose = require('mongoose');
mongoose
.connect('mongodb+srv://user_user01:Password123@<clustername>.6si6q.mongodb.net/CloneTube?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB...'))
 .catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));