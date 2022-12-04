const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://techn:Gomez257@cluster0.scusi.mongodb.net/test',{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            })
        .then((db) => console.log('Db is Connected'))
        .catch((err)=>console.log(err));
