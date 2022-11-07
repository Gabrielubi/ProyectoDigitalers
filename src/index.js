//Librerias externas
const express = require ('express')
const mongoose = require ('mongoose')
const methodOverride = require('method-override')

require('dotenv').config()
const port = process.env.PORT || 3000
const app = express()

//Necesario para renderizar articulos en el main
const Article = require('../models/article')

const articleRouter = require('../routes/articles')
const userRouter = require('../routes/users')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

// Ruta Principal
app.get('/', async(req, res)=>{
    const articles = await Article.find().sort({
        createdAt: "desc"
    });
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)
app.use('/user', userRouter)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Conectado a MongoDB Atlas')).catch((err) => console.error(err));

// app.use('/public/', express.static('./public/'))

app.listen(port, 
    ()=> console.log(`Server escuchando en puerto ${port}`)
);

