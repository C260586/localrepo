var express =  require("express");
var app = express();
var http = require("https");
var https = require("https");

app.get("/",function(req,res){
    res.json({"name":"a"});
});


/**
 * login api
 */
// do a POST request
// create the JSON object

var jsonObject = JSON.stringify({
					"credentials" : {
						"name":"harikumar.padma@compucom.com",
						"password":"little@123",
						"site":{
							"contentUrl":"ananthatableau"
						}
					}
				});

// prepare the header
var header = {
                    'Content-Type' : 'application/json',
                    'Accept':'application/json',
					'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};

// the post options
var optionspost = {
    host : 'us-east-1.online.tableau.com',
    port : 443,
    path : '/api/2.8/auth/signin',
    method : 'POST',
    headers : header
};

console.info('before signin api call');

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
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});

console.log("node js working and listening on port 3000");
app.listen(3000);
