const app = require("express")();
const bodyParser = require("body-parser");

const sendMail = require("./email")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.status(200).send("hello i am main service :)");
})

app.post("/", (req, res, next) => {
    res.status(200).send("We will mail shortly.");
    sendMail(req.body)
})



// 404 HANDLER
app.use((req, res, next) => {
    res.send({ errors: [{ 'code': 404, 'message': 'Undefined endpoint url ' + req.baseUrl }] });
})

// ERROR HANDLER
app.use((error, req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.error(` API: ${fullUrl},\n Message: ${error.message}\n Trace: ${error.stack}`)
    res.status(error.code < 600 ? error.code : 500).send({ errors: error.message || error.error })
});

module.exports = app;
