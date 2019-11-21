const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

mongoUrl = ("mongodb://localhost:27017/login");
mongoose.Promise = global.Promise;
mongoose
    .connect(mongoUrl,{useNewUrlParser:true})
    .then(()=>console.log('Mongodb Connected !'))
    .catch(err=>console.log(err))

    var User = require('./routes/User');
    app.use('/users', User);

app.listen(port, () => console.log(`App listening on port `+port))