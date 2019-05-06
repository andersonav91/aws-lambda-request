const querystring = require('querystring');
const http = require('http');

handler = (event) => {

    console.log("Entered to the handler...", event);

    const body = {
        "url": "s3-upload-files.herokuapp.com",
        "path": "/helloWorld",
        "body": {}
    };

    var post_data = querystring.stringify(
        {} // empty data at moment
    );

    var post_options = {
        host: body.url,
        port: '443',
        path: body.path,
        method: 'POST'
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
