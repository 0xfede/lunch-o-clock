var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var app = express();

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  if (err || !db) {
    console.error('Failed to connect to db', err);
    process.exit(1);
  } else {

app.use(bodyParser()); 
app.use(cookieParser());
app.use(session({
  secret: 'segretoooo',
  store: new MongoStore({ db: db }),
  cookie: {httpOnly:false}
}));
app.use(express.static(__dirname + '/public'));


app.post('/places', function(req, res) {

  db.collection('places').update({name:req.body.name},req.body,{ upsert : true, raw:true },function(err, data){
    if (err){
      res.send(500, 'Internal Server Error');
    } else {
      console.log(data);
      res.jsonp(data);
    }
  });
  
});
app.get('/places', function(req, res) {
  db.collection('places').find().toArray(function(err, data) {
    if (err) {
      res.send(500, 'Internal Server Error');
    } else {
      res.jsonp(data || []);
    }
  });
});
app.get('/places/:id', function(req, res) {
  db.collection('places').findOne({ _id: new ObjectID(req.params.id) }, function(err, data) {
    if (err) {
      res.send(500, 'Internal Server Error');
    } else if (!data) {
      res.send(404, 'Not Found');
    } else {
      res.jsonp(data);
    }
  });
});
app.route('/places/:id/:type/:attr').
  all(function(req, res, next) {
    if (req.params.type != 'pros' && req.params.type != 'cons') {
      res.send(404, 'Not Found');
    } else {
      next();
    }
  }).
  put(function(req, res, next) {
    var doc = { $addToSet: {} };
    doc.$addToSet[req.params.type + '.' + req.params.attr] = req.sessionID;
  
    db.collection('places').update({
      _id: new ObjectID(req.params.id)
    }, doc, {}, function(err) {
      res.jsonp({ result: !err });
    });
  }).
  delete(function(req, res) {
    var doc = { $pull: {} };
    doc.$pull[req.params.type + '.' + req.params.attr] = req.sessionID;
  
    db.collection('places').update({
      _id: new ObjectID(req.params.id)
    }, doc, {}, function(err) {
      res.jsonp({ result: !err });
    });
  });

app.listen(8000);

}});

