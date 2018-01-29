var express =  require("express");
var app = express();
var http = require("https");
var https = require("https");
var http = require("http");

// token and tableau credential


const credential = {
					"credentials" : {
										"name":"harikumar.padma@compucom.com",
										"password":"little@123",
										"site":{
											"contentUrl":"ananthatableau"
										}
									}
					};
					
const loginHeader = {
                    'Content-Type' : 'application/json',
                    'Accept':'application/json',
					'Content-Length' : Buffer.byteLength(JSON.stringify(credential), 'utf8')
};					


// now we are using hard coded value once api will be work remove it.
let tokenResponse = {
						"credentials": {
											"site": {
												"id": "71ea67c2-9f82-4771-8907-a2c03b4031c8",
												"contentUrl": "ananthatableau"
											},
											"user": {
												"id": "ba8520cd-a8bc-49bc-8bef-bf0582e83667"
											},
											"token": "xzuCvSt7XoMJYb5PFL8jZLrlNXB8yqG1"
										}
					};







app.get("/",function(req,res){
    console.log("hello");
    res.json({"name":"a"});
});


var getAccessToken = function(){
	return new Promise(function(resolve,reject){
		var url = "https://us-east-1.online.tableau.com/api/2.8/auth/signin";
		
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
		var postheaders = {
							'Content-Type' : 'application/json',
							'Accept':'application/json',
							'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSIsImtpZCI6Ino0NHdNZEh1OHdLc3VtcmJmYUs5OHF4czVZSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDc5ZTExY2MtY2JhMC00ODYwLTlkNDMtMmU1Njc2MDdkZDBjLyIsImlhdCI6MTUxNTczMzQ4MiwibmJmIjoxNTE1NzMzNDgyLCJleHAiOjE1MTU3MzczODIsImFjciI6IjEiLCJhaW8iOiJZMk5nWUtnNXVDZXpyck5YbGMvNlZzS3BvTmNocTY5T0tlakxZZDkybjFITXJ5NTE5VTRBIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjNiZGZiMTkwLTA5NjMtNGVkNy05NTBmLWM1MjExYzAyMzc5MCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU2hhcm1hIiwiZ2l2ZW5fbmFtZSI6Ik5lZXJhaiIsImlwYWRkciI6IjEyMi4xNS4yMjguMjA4IiwibmFtZSI6Ik5lZXJhaiBTaGFybWEiLCJvaWQiOiIzNWMxNTlkYy03NTUxLTRmYjUtOWEwZC1jOGNmOGJiODFlYjkiLCJwdWlkIjoiMTAwM0JGRkRBNkEzRjVDMiIsInNjcCI6IkNvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhLkFsdGVyX0FueSBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHcm91cC5SZWFkIEdyb3VwLlJlYWQuQWxsIE1ldGFkYXRhLlZpZXdfQW55IFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic3ViIjoiZ2pQSmEybHM3NjBqQ21iMWc3SFJFTWw0OVhMUVhWLXFoWTRTYkhNT1h1YyIsInRpZCI6IjQ3OWUxMWNjLWNiYTAtNDg2MC05ZDQzLTJlNTY3NjA3ZGQwYyIsInVuaXF1ZV9uYW1lIjoibmVlcmFqQHNybWE1NDMyMS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJuZWVyYWpAc3JtYTU0MzIxLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Im1OY3JveWhwOEVLQS04clVkUDRDQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCJdfQ.MlY5oB8qFAMCbJFExOffk1YVzzuDxlMoq4F59MrFH6FLdik-b3KQ5hJbNNxOu2IiINGTY16bXVhX6G5HRPLRTdFAcZUKVSd0LujBMnQnVtqJtAJgoJCzIqdWMToJomPiy5KxnR7l_iVh5q5rOJKf1LublYDQiEJ0r-n_rRohs_MpnhjLdDNrwrOBPsGNdbiukwiKsiZgUKZrkruBmxJ0HmEvMUucUjuYDFeltNhi25mfEJ3ejpnnEO0F1RtSNNulR4s3lokRpAaj1Ds5kg_IkJ3QOEbDMe17o2Yrzwenf9n418VsnWtQZGWKjq4hxIqfeOfcUw1a1imE6ThW1LyKKg'
		};
		
		var optionspost = {
							host : 'api.powerbi.com',
							port : 443,
							path : '/v1.0/myorg/groups',
							method : 'GET',
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
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});
	});
}


getAccessToken().then(res => {
	console.log("response",res)
}).catch(err => {
	console.log("err ",err);
})
/**
 * login api
 */
// do a POST request
// create the JSON object

/*
jsonObject = JSON.stringify({
					"credentials" : {
						"name":"harikumar.padma@compucom.com",
						"password":"little@123",
						"site":{
							"contentUrl":"ananthatableau"
						}
					}
				});

				
// prepare the header
var postheaders = {
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
    headers : postheaders
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');
console.info("jsonObject",jsonObject);

// do the POST call
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
*/

console.log("node js working and listening on port 300");
app.listen(3000);

