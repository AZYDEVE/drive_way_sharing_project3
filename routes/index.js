const express = require("express");
const router = express.Router();
const db = require("../db/mongoConnection");
const passwordHash = require("password-hash");

/* getting all post. */
router.get("/get_data", async function (req, res, next) {
  const p = await db.getData("posting", "posts", {});
  res.json(p);
});

// getting postInfo by user
router.post("/get_data_query", async function (req, res, next) {
  console.log(req.body);
  const p = await db.getData("posting", "posts", req.body);
  res.json(p);
  console.log(res.json(p));
});

// getting postInfo by user
router.post("/get_appointment_query", async function (req, res, next) {
  console.log(req.body);
  const p = await db.getData("posting", "appointment", req.body);
  res.json(p);
  console.log(res.json(p));
});

router.post("/insert_data", async function (req, res, next) {
  console.log(req.body);
  const p = await db.insertData("posting", "posts", req.body);
  res.json(p);
});

router.get("/delete_data", async function (req, res, next) {
  const p = await db.deleteData("posting", "posts", { name: "alex" });
  res.json(p);
});

router.post("/insert_newpost", async function (req, res, next) {
  console.log(req.body);
  await db.insertData("posting", "posts", req.body);
  res.send("Success");
});

/*relate to user*/

router.post("/insert_user", async function (req, res, next) {
  console.log(req.body);
  const userInfo = req.body;
  const password = passwordHash.generate(userInfo.password);
  console.log(password);
  userInfo.password = password;

  await db.insertData("posting", "users", userInfo);
});

router.post("/if_user_exist", async function (req, res, next) {
  console.log(req.body);
  const p = await db.getData("posting", "users", req.body);
  console.log(p);
  if (p.length === 0) {
    res.json({ result: false });
    console.log(p);
  } else {
    res.json({ result: true });
  }
});

router.post("/get_user", async function (req, res, next) {
  console.log(req.body);
  const p = await db.getData("posting", "users", req.body);
  res.json(p);
});

router.post("/insert_appointment", async function (req, res, next) {
  console.log(req.body);
  const p = await db.insertData("posting", "appointment", req.body);
  res.json(p);
});

//write record the user to currentLogIn collected if user log in successfully
router.post("/get_token", async function (req, res) {
  console.log(req.body);
  const p = await db.insertData("posting", "currentLogIn", req.body);
  res.json(p);
});

//check if user currently login in the currentLogIn collection. if not response false, else true 
router.post("/check_current_login", async function (req, res) {
  console.log(req.body);
  const p = await db.getData("posting", "currentLogIn", req.body);
  console.log(p);
  if ( p.length === 0 ) {
    res.json({ result: false });
   
  } else {
    res.json({ result: true });
  }
});


// check if the user is current recorded as log in in the currentLogIn collection
router.post("/check_current_login", async function (req, res) {
  console.log(req.body);
  const p = await db.getData("posting", "currentLogIn", req.body);
  console.log(p);
  if ( p.length === 0 ) {
    res.json({ result: false });
   
  } else {
    res.json({ result: true });
  }
});

// check if the user email and password matches with the user database  
// if yes, record the user email to the currentLogin and send back {result: true} , else send back {result : false} 
router.post("/check_email_and_password", async function (req, res) {
  console.log("alex :" + req.body);
  
  const p = await db.getData("posting", "users", {email:req.body.email});
  console.log(p);
  
  const user = p[0];
  const verification = passwordHash.verify(req.body.password, user.password);
  console.log(verification);
  if ( p.length === 0 ) {
    res.json({ result: false });
    
  } else{
    
    if(verification){
      await db.insertData("posting", "currentLogIn", req.body.email);
      res.json({ result: true });
      console.log("hellooooo");

    }else{
      res.json({ result: false });
    }
    
  }
});




module.exports = router;
