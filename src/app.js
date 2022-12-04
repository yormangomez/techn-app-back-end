const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const fileUpload = require('express-fileupload');


const auth = require('./routes/auth');
const category = require('./routes/category');
const search = require('./routes/search');
const products = require('./routes/products');
const user = require('./routes/user');
const uploads = require('./routes/uploads');

const app = express();

app.use(cors())

app.set('port', process.env.PORT || 4000)

app.use(morgan('dev'))

app.use(express.json())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir : '/tmp/',
    createParentPath: true
}))

app.use('/api/auth', auth)
app.use('/api/category', category)
app.use('/api/products', products)
app.use('/api/search', search)
app.use('/api/user', user)
app.use('/api/uploads', uploads)



module.exports = app;