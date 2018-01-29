var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var https = require("https");
//var bodyParser = require("body-parser");
var db = mongojs('mydb',['employees']);


router.get("/getToken",function(req,res){
	console.log("access token call");
	getAccessToken();
});

router.get("/",function(req,res){
	db.employees.find(function(err,docs){
			res.json(docs);
	});
});

router.post("/",function(req,res){
	console.log(req.body);
	db.employees.insert(req.body,function(err,docs){
		res.json(docs);
	});
});

router.put("/",function(req,res){
	var id = req.body._id;
	var data = req.body;
	delete data._id;
	console.log(data);
	db.employees.findAndModify({query: {_id: mongojs.ObjectId(id)},
				update: {$set:{name:data.name,subject:data.subject,age:data.age,city:data.city}},
				new : true},function(err,docs){
							console.log(docs);
							res.json(docs);
				});
		});

router.delete("/:id",function(req,res){
	var id = req.params.id;
	db.employees.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

var getAccessToken = function(){

	/*
    request.post({
      url:url,
      form:formData,
      headers:headers

    }, function(err, result, body) {
      if(err) return reject(err);
      var bodyObj = JSON.parse(body);
      resolve(bodyObj.access_token);
    })
	*/
	// do the POST call
	
	// the post options
	
	// prepare the header
	var jsonObject = JSON.stringify({
				client_id: '3bdfb190-0963-4ed7-950f-c5211c023790',
                grant_type: 'password',
                resource: 'https://analysis.windows.net/powerbi/api',
                username: 'neeraj@srma54321.onmicrosoft.com',
				password: 'NIrj11@@'
            });
			
var postheaders = {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Accept':'application/json',
					'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
var optionspost = {
    host : 'login.microsoftonline.com',
    port : 443,
    path : '/common/oauth2/token',
    method : 'POST',
    headers : postheaders
};

var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
   
    res.on('data', function(d) {
        console.info('POST result:\n');
		console.log("response is ",d);
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
});

// write the json data
reqPost.write(jsonObject);
reqPost.end('end',function(e){
		console.log('end',e);
});

reqPost.on('error', function(e) {
    console.error("error is",e);
});
	
}


module.exports = router;