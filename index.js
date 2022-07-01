const http = require('http');
const path = require('path');
const input = require('readline-sync');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const page = input.question('Please type in the path to the HTML template file: ');
const data = input.question('Please type in the path to the JSON file: ');


fs.access(page, fs.constants.F_OK, (err) => {
  err ? console.log("Such html file doesn't exist") : console.log("File exists");
});

fs.access(data, fs.constants.F_OK, (err) => {
  err ? console.log("Such json file doesn't exist") : console.log("File exists");
});


const server = http.createServer((req, res) => {
  
  if (req.url === '/'){

    fs.readFile(`${page}`, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('File not found');
      } else {
        res.write(data);
      }
      res.end();
    });
  }

  if(req.url === '/data.json') {
    fs.readFile(`${data}`, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('File not found');
      } else {
        res.write(data);
      }
      res.end();
    });
  }

  if(req.url === '/script.js') {
    const jsPath = path.join(__dirname, req.url);
    const jsReadStream = fs.createReadStream(jsPath, "UTF-8");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript');
    jsReadStream.pipe(res);
  }
  
});

server.listen(port, hostname);