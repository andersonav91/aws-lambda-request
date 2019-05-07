const querystring = require('querystring');
const http = require('http');

handler = (event) => {

    console.log("Entered to the handler...", JSON.stringify(event));

    var name = '';
    try {
        name = event.Records[0].s3.object.key;
    } catch(e) {
        console.log("Invalid name ", e);
        name = "None"
    }

    console.log("File name", name);

    const body = {
        "url": "localhost",
        "path": "/printFileName",
        "body": {
            "name": name
        }
    };

    var post_data = querystring.stringify(
        body.body
    );

    var post_options = {
        host: body.url,
        port: '4567',
        path: body.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        console.log("I´m in the post request");
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
        res.on('error', function (e) {
            console.log("An error: " + e.message);
        });

    });

    post_req.write(post_data);
    post_req.end();

    // TODO implement
    const response = {
        statusCode: 200,
    };
    return response;
};

module.exports = handler;
