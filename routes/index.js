var express = require("express");
var router = express.Router();
const myDB = require("../db/myMongoDB.js");
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/posts", async (req, res) => {
  await myDB.initialize();
  let posts = await myDB.getPosts();
  console.log("done");
  res.send(JSON.stringify(posts));
});

//to get dogs for the slideshow and table
router.get("/getdogs", async (req, res) => {
  let posts = await myDB.getPosts();
  console.log("done");
  res.json(posts);
});

let ids = [
  "15889485",
  "15935798",
  "15840509",
  "15766458",
  "15910636",
  "15996385",
];

let names = [];
let genders = [];
let breeds = [];
let ages = [];
let links = [];
let picLinks = [];

async function scraperFunction(item, index) {
  return await axios
    .get(`https://www.ilovefamilydog.org/dog-details/?id=${item}`)
    .then((response) => {
      let $ = cheerio.load(response.data);

      names[index] = `${$("h1").text()}`;
      genders[index] = $("td")
        .filter(function () {
          return $(this).text().trim() === "GENDER:";
        })
        .next()
        .text();
      breeds[index] = $("td")
        .filter(function () {
          return $(this).text().trim() === "PRIMARY BREED:";
        })
        .next()
        .text();
      ages[index] = $("td")
        .filter(function () {
          return $(this).text().trim() === "AGE:";
        })
        .next()
        .text()
        .trim();

      picLinks[index] = `${$(".img").attr("href")}`;

      links[index] = `https://www.ilovefamilydog.org/dog-details/?id=${item}`;

      let element = {
        name: names[index],
        gender: genders[index],
        breed: breeds[index],
        age: ages[index],
        link: links[index],
        picLink: picLinks[index],
      };

      return element;
    });
}

/* GET home page. */
//router.get("/", function (req, res, next) {});

module.exports = router;
exports.scraperFunction = scraperFunction;
exports.ids = ids;
