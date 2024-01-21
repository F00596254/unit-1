var express = require('express');
var app = express();
var fs = require("fs")
const { get } = require('http')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

 
 app.post('/addUser', function (req, res) {
   const user = req.body;
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data['user' + user.id] = user;
       fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function(err, data) {
         if (err) {
            res.end('Incorrect payload');
         }
       })
       res.end( JSON.stringify(data));
    });
 })

 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })

 var id = 2;

app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log(server.address());
   console.log("Unit-1 app listening at http://%s:%s", host, port)
})