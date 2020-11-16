const express = require("express");
const router = express.Router();
const Passport = require("passport");
const myDB = require("../db/myMongoDB.js");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Strategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const authUtils = require("../utils/auth");
const Session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser("cookie_secret"));
app.use(flash());
app.use(
  Session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(Passport.initialize());
app.use(Passport.session());

const MongoClient = require("mongodb").MongoClient;
const uri =
  process.env.MONGO_URL ||
  "mongodb://localhost:27017";

Passport.use(
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      //database
      const db = await client.db("db");
      const users = db.collection("users");

      users.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }
        let newPass = authUtils.decrypt(user.password);
        if (password != newPass) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

Passport.serializeUser((user, done) => {
  done(null, user._id);
});

Passport.deserializeUser((id, done) => {
  done(null, { id });
});

router.post(
  "/signin",
  Passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/signin?error=Invalid username or password.",
  })
);

router.post("/signup", async (req, res, next) => {

  
  const registrationParams = req.body;

  const users = await myDB.initializeUsers();

  if (
    registrationParams.password != registrationParams.password2 ||
    registrationParams.username == "" ||
    registrationParams.pasword == ""
  ) {
    res.redirect("/signup?error=Passwords must match.");
  } else {
    const payload = {
      username: registrationParams.username,
      password: authUtils.encrypt(registrationParams.password),
    };

    users.findOne({ username: registrationParams.username }, function (
      err,
      user
    ) {
      if (err) {
        return next(err);
      }
      if (user) {
        res.redirect("/signup?error=Username already exists.");
      } else {
        users.insertOne(payload, (err) => {
          if (err) {
            req.flash("error", "User account already exists.");
          } else {
            req.flash("success", "User account registered successfully.");
          }
        });
        res.redirect("/signin");
      }
    });
  }
});

router.post("/signout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/update", async (req, res, next) => {
  const users = await myDB.initializeUsers();
  const info = req.body;

  if (!req.isAuthenticated()) {
    res.redirect("/signin");
  } else {
    users.findOne({ username: info.username }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect("/userprofile?error=User not found, please try again.");
      } else {
        users.updateOne(
          {
            username: info.username,
          },
          {
            $set: {
              username: info.newusername,
              password: authUtils.encrypt(info.newpassword),
            },
          }
        );

        res.redirect("/home");
      }
    });
  }
});

router.post("/delete", async (req, res, next) => {
  const users = await myDB.initializeUsers();
  const info = req.body;

  if (!req.isAuthenticated()) {
    res.redirect("/signin");
  } else {
    users.findOne({ username: info.delete }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect("/userprofile?error=User not found, please try again.");
      } else {
        users.deleteOne({
          username: info.delete,
        });
        res.redirect("/");
      }
    });
  }
});



module.exports = router;
