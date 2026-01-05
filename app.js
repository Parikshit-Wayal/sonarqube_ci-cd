
const http = require('http');

function insecureFunction() {
    eval("console.log('This is insecure code')"); // ❌ Security issue
}

insecureFunction();

http.createServer((req, res) => {
    res.end("Hello World");
}).listen(3000);

