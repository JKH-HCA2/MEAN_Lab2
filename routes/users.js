var express = require('express');
var router = express.Router();
const fs = require('fs');

const authorization = require('./../utils/auth')

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { loginLogout: `<li class="nav-item">
  <a class="nav-link" href="/users/login">Login</a>
</li>` });
});

/* GET register page*/
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(request, response, next) {
  // get user data from form
  var email = request.body.email;
  var username = request.body.username;
  var password = request.body.password;
  user = insertUser(username, email, password);
  if (user) {
      console.log(`Success`)
      response.statusCode = 200;
      window.location.href = "/teams"
      response.end();
  } else {
      response.statusCode = 403; // Forbidden
      response.end();
  }
})

// post data
router.post('/login', function(request, response) {
  users = getUsers();
  console.log(users)
  // get user data from form
  var email = request.body.email;
  var password = request.body.password;
  if (authorization.authorize(email, password, users)) {
      response.statusCode = 200;      
      response.end();
  } else {
      response.statusCode = 403; // Forbidden
      response.end();
  }
});

// persist data in file
var saveUsers = (users) => {
  fs.writeFileSync('./data/users.json', JSON.stringify(users));
};

// Insert a User
var insertUser = (username, email, password) => {
  var users = getUsers();

  // in ES6, if param and prop names are the same,
  // you can use the following syntax instead of
  // name: name, elev: elev
  var user = {
      email,
      username,
      password
  };
  // ensure no dups
  var duplicateUsers = users.filter((user) => {
    return (user.username === username);
  });

  var duplicateEmails = users.filter((user) => {
    return (user.email === email);
  });

  // persist the users
  if (duplicateUsers.length === 0 && duplicateEmails.length == 0) {
      users.push(user);
      saveUsers(users);
      return user;
  }
};

  // read persisted data from file
  var getUsers = () => {
    try {
        var usersString = fs.readFileSync('data/users.json');
        return JSON.parse(usersString);
    } catch (err) {
        return [];
    }
  };



module.exports = router;
