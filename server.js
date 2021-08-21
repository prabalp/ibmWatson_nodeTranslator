require("dotenv").config({ silent: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

//config
// ---express
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); //not necessary it already in default location

// ---Only loaded when running in the IBM Cloud
if (process.env.VCAP_APPLICATION) {
  require("./security")(app);
}

//--- Configure Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//--- Setup static public directory
app.use(express.static(__dirname + "/public"));

//creating the service wrapper
const translator = new LanguageTranslatorV3({
  version: "2019-10-10",
  authenticator: new IamAuthenticator({
    apikey: process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY,
  }),
  url: process.env.LANGUAGE_TRANSLATOR_URL,
  headers: {
    "X-Watson-Technology-Preview": "2018-05-01",
    "X-Watson-Learning-Opt-Out": true,
  },
});

// render index page
app.get("/", function (req, res) {
  // If hide_header is found in the query string and is set to 1 or true,
  // the header should be hidden. Default is to show header
  res.render("index", {
    hideHeader: !!(
      req.query.hide_header == "true" || req.query.hide_header == "1"
    ),
  });
});

app.get("/api/models", function (req, res, next) {
  console.log("/v3/models");
  translator
    .listModels()
    .then(({ result }) => res.json(result))
    .catch((error) => next(error));
});

app.post("/api/identify", function (req, res, next) {
  console.log("/v3/identify");
  translator
    .identify(req.body)
    .then(({ result }) => res.json(result))
    .catch((error) => next(error));
});

app.get("/api/identifiable_languages", function (req, res, next) {
  console.log("/v3/identifiable_languages");
  translator
    .listIdentifiableLanguages(req.body)
    .then(({ result }) => res.json(result))
    .catch((error) => next(error));
});

app.post("/api/translate", function (req, res, next) {
  console.log("/v3/translate");
  translator
    .translate(req.body)
    .then(({ result }) => res.json(result))
    .catch((error) => next(error));
});

//starting the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
