var express = require("express");
var app = express();
var employees = require("./employees.js");
var tableau = require("./tableau.js");

var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var db = mongojs('mydb',['employees']);

app.use(bodyParser.json());

// other js file to use
app.use("/employees",employees);
app.use("/tableau",tableau);

app.set('view engine', 'ejs');
app.set('views','./views');
app.use('/static',express.static(__dirname+'/public'));
app.use('/static1',express.static(__dirname+'/public/controller'));
/*
var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello in the world of Node js');
}).listen(8081);
*/

app.get("/",function(req,res){
	console.log("Hello in the world of node");
//	res.send("neeraj");
	res.render("myview");
});


	
app.listen(3000);
console.log("Hello in the world of node js");