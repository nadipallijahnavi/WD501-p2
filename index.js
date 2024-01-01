const ejs = require('ejs');

const express = require('express');
const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let port = 3000; 


process.argv.forEach((arg) => {
    if (arg.startsWith("--port=")) {
        const portNumber = arg.split("=")[1];
        port = parseInt(portNumber);
    }
});

fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) {
        throw err;
    }
    registrationContent = registration;
});

http.createServer((request, response) => {
    let url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
        case "/project":
            response.write(projectContent);
            response.end();
            break;
        case "/registration":
            response.write(registrationContent);
            response.end();
            break;
        default:
            response.write(homeContent);
            response.end();
            break;
    }
}).listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    
});

const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.set('viewengine', 'ejs');


app.get("/", (req, res) => {
  res.render("index.ejs", { amount: '', rate: '', time: '', interest: '' });
})

app.post("/", (req, res) => {
  const amount = req.body.p;
  const rate = req.body.t;
  const time = req.body.r;
  console.log("amount=" + amount);
  console.log("Time=" + time);
  console.log("Interest=" + rate);
  const si = (amount * time * rate) / 100;
  console.log(si);
  res.render('index.ejs', { amount: amount, rate: rate, time: time, interest: si });
});

app.listen(3000, () => {
  console.log("running on 5000!");
});
