var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var db = null;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, _db) {
  if (err || !_db) {
    console.error('Failed to connect to db', err);
    process.exit(1);
  } else {
    db = _db;
  }
});

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/places', function(req, res) {
  if (!db) {
    res.send(503, 'Service Unavailable')
  } else {
    db.collection('places').find().toArray(function(err, data) {
      if (err) {
        res.send(500, 'Internal Server Error');
      } else {
        res.jsonp(data || []);
      }
    });
  }
});
app.get('/places/:id', function(req, res) {
  if (!db) {
    res.send(503, 'Service Unavailable')
  } else {
    db.collection('places').findOne({ _id: new ObjectID(req.params.id) }, function(err, data) {
      if (err) {
        res.send(500, 'Internal Server Error');
      } else if (!data) {
        res.send(404, 'Not Found');
      } else {
        res.jsonp(data);
      }
    });
  }
});

app.listen(8000);


