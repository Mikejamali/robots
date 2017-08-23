const express         = require("express");
// const users           = require("./data");
const router = express.Router();


let data              = [];

const getEmployed     = function(req, res, next) {
  const MongoClient     = require("mongodb").MongoClient;
  const assert          = require("assert");

  const url             = "mongodb://localhost:27017/robots";


  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();

    });
  });

  let getData = function(db, callback) {
    let users = db.collection("users");

      users.find({}).toArray().then(function(users) {
          data = [];
          for (var i = 0; i < users.length; i++) {
            if (users[i].job) {
              data.push(users[i])
            }
          }
          callback();
      });
  };

};


/////////2nd/////////////////////////////////////////////////////////
  const getUnemployed    = function(req, res, next) {
    const MongoClient     = require("mongodb").MongoClient;
    const assert          = require("assert");

    const url             = "mongodb://localhost:27017/robots";


  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();

    });
  });

  let getData = function(db, callback) {
    let users = db.collection("users");

      users.find({}).toArray().then(function(users) {
          data = [];
          for (var i = 0; i < users.length; i++) {
            if (!users[i].job) {
              data.push(users[i])
            }
          }
          callback();
      });
  };

};


///////3rd//////////////////////////////////////////////////////////////
  const getListings    = function(req, res, next) {
    const MongoClient     = require("mongodb").MongoClient;
    const assert          = require("assert");

    const url             = "mongodb://localhost:27017/robots";


  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getData(db, function() {
      db.close();
      next();

    });
  });

  let getData = function(db, callback) {
    let users = db.collection("users");

      users.find({}).toArray().then(function(users) {
          data = [];
          data = users;
          callback();
      });
  };

};



router.get("/", getListings, function(req, res) {
  res.render("listings", {users: data});
});

router.get("/unemployed", getUnemployed, function(req, res) {
  res.render("unemployed", {users: data});
});
router.get("/employed", getEmployed, function(req, res) {
  res.render("employed", {users: data});
});
router.get("/individual/:id", getListings, function(req, res) {
  console.log("individual");
  let userToRender = [];
  data.forEach(function(user){
    if (user.id == req.params.id) {
      userToRender.push(user);
    }
  })
  console.log(userToRender);
  res.render("individual", {users: userToRender});
});
module.exports = router;



//
//
// app.engine('mustache', mustacheExpress());
// app.set('public', './public');
// app.set('view engine', 'mustache');
//
//
// app.use(express.static(__dirname, "files"))
// // funconst express = require('express');

//
// app.get('/', function (req, res) {
//   res.send('directory', { userData: data.users});
//
//
//   app.get('/user/:id', function(req, res){
//     let id = req.params.id;
//
//     let user = data.users.find(function(user) {
//       return user.id == id;
//
//     });
//     res.render('profile', user);
//   });
//
// app.get('/listing/:id', function (req, res) {
// console.log(req.params.id)
//   res.send('Hello World!')
//   // { userData: data.users});
// });
//
// app.listen(3000, function () {
//   console.log('Successfully started express application!')
// });
// const users = require('./users');
