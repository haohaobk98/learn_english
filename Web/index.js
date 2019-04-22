var express = require('express');
var app = express();
var parser = require('body-parser').json();
var mongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'))
app.get('/', (req, res) => res.render('home'));
var url ="mongodb://127.0.0.1:27017";
app.get('/listTheme/:id',(req,res)=>{
    var theme = req.params.id;
    console.log(req.params.id);
    mongoClient.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db('english');
        var element = {name:theme};
        dbo.collection('listTheme').findOne(element,function(err,re){
            if(err) throw err;
            res.render('listWord',{data:re});
            db.close();
        })
    })
})