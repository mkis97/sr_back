const express = require('express')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
var moment = require('moment')
var connection = require('./db')

app.use(cors())
app.use(bodyParser.json())


connection.connect()


app.post('/login', function (req, res) {
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    } else {
        var user = req.body.user
        var pass = req.body.pass
        connection.query('SELECT * from users WHERE user = ? AND pass = ?', [user, pass], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.status(200).json({
                    status: 'succes',
                    data: results,
                })
            } else {
                res.status(200).json({
                    status: 'succes'
                })
            }
        });
    }
})

app.get('/users', function (req, res) {
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})

app.post('/logs', function (req, res) {
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    } else {
        var id = req.body.id_user
        var timestamp = moment().unix()
        connection.query('INSERT INTO logs (id_user,timestamp) VALUES ("' + id + '",' + timestamp + ')', function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.status(200).json({
                    status: 'succes',
                    data: results,
                })
            } else {
                res.status(200).json({
                    status: 'succes'
                })
            }
        });
    }
})

app.get('/logs/:id', function (req, res, next) {
    var id = req.params.id
    connection.query('SELECT * FROM logs WHERE id_user=' + id, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
})

app.listen(5000)
