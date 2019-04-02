const express =  require('express');
const app = express()
const port = 3000
const router =  require('./routes/library');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', router);


app.listen(port , function () {
    console.log(`Listen to port ${port}`)
})