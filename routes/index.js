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
  const userInfo=req.body ;
  const password=passwordHash.generate(userInfo.password);
  console.log(password);
  userInfo.password = password;

  await db.insertData("posting", "users", userInfo); 

});

router.post("/get_user", async function (req, res, next) {
  console.log(req.body);
  const p =await db.getData("posting", "users", req.body); 
  res.json(p);
});

router.post("/insert_appointment",async function (req, res, next) {
  console.log(req.body);
  const p =await db.insertData("posting", "appointment", req.body); 
  res.json(p);
});




module.exports = router;
