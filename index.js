
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

//connect to mongodb via mongoose
const db = require("./db");

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routing API
const bodydata = require("./routes/api/bodyData");
app.use("/api/bodyData", bodydata);

if (app.get("env") === "production") {
  //set static folder for react
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4545;

app.listen(port, () => console.log(`Server listening on port ${port}`));
