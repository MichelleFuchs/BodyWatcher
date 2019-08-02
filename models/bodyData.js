const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BodyDataSchema = new Schema(
  {
    identifiier: String,
    value: String,
    measure: String,
    date: String
  },
  { collection: "bodyData" }
);

module.exports = mongoose.model("BodyData", BodyDataSchema);
