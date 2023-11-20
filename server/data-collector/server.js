const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../db/user_data.db', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected successfully');
    }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

https
    .createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/smoke-server2.smoke-ai.ru/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/smoke-server2.smoke-ai.ru/fullchain.pem'),
    }, app)
    .listen(443, () => {
        console.log('the https server is serving');
    });


app.get('/', (req, res) => {
    res.send("You are visiting the /root/")
})


app.post('/post/groups_and_interests', (req, res) => {
    console.log('in /post');
    const data = req.body;
    const sql = 'insert into groups_and_interests values (?, ?, ?)';
    debugger;
    try {
        console.log(data.user_id);
        const params = [
            data.user_id,
            JSON.stringify(data.groups),
            JSON.stringify(data.interests)
        ];
        db.run(sql, params);
        res.statusCode = 200;
        res.end(JSON.stringify({
            message: "Data sent successfully",
        }));
    }
    catch (err) {
        console.log(err);
        res.statusCode = 400;
        res.end(JSON.stringify({
            error: err,
        }))
    }
});

app.get('/get/groups_and_interests', async (req, res) => {
    console.log('in /get');
    try {
        const data = db.run("select * from groups_and_interests;");
        const params = req.params;

        params?.count ??

            res.setHeader(
                "Content-Type", "application/json"
            );
        res.end()
    } catch (err) {
        console.log(err);
    }
});
