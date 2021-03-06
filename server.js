var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors')
const PORT = process.env.PORT || 3000;

var connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12384136',
    password: 'Vab9B37LLz',
    database: 'sql12384136'
});

connection.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
})
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


app.post("/addSeller", function (req, res) {
    var postData = req.body;
    console.log(postData, res);
    connection.query("INSERT INTO Seller SET ?", postData, function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.post("/addItem", function (req, res) {
    var postData = req.body;
    console.log(postData, res);
    connection.query("INSERT INTO Items SET ?", postData, function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.post("/addOrder", function (req, res) {
    var postData = req.body;
    console.log(postData, res);
    connection.query("INSERT INTO Orders SET ?", postData, function (
        error,
        results,
        fields
    ) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get("/getCount/", function (req, res) {
    connection.query(
        "select item_id from Items order by item_id DESC LIMIT 1",
        [req.params.vr_id],
        function (err, results) {
            err ? res.send(err) : res.json({ data: results });
        }
    );
});

app.get("/getOrderCount/", function (req, res) {
    connection.query(
        "select order_id from Orders order by order_id DESC LIMIT 1",
        [req.params.vr_id],
        function (err, results) {
            err ? res.send(err) : res.json({ data: results });
        }
    );
});

app.get("/getItems/:add", function (req, res) {
    connection.query(
        "select * from Items where item_name=?",
        [req.params.add],
        function (err, results) {
            err ? res.send(err) : res.end(JSON.stringify(results));
        }
    );
});

app.get("/getCategory/:add", function (req, res) {
    connection.query(
        "select * from Items where category=?",
        [req.params.add],
        function (err, results) {
            err ? res.send(err) : res.end(JSON.stringify(results));
        }
    );
});

app.get("/getOrders/:add", function (req, res) {
    connection.query(
        "select * from Orders where customer=?",
        [req.params.add],
        function (err, results) {
            err ? res.send(err) : res.end(JSON.stringify(results));
        }
    );
});
