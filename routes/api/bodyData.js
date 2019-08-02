//API Route for Shopping Lists

const express = require("express");
const router = express.Router();

const BodyData = require("../../models/bodyData");

// @route GET api/bodydata
//Get all data
router.get("/", async (req, res) => {
  BodyData.find()
    .sort({ date: -1 })
    .then(bds => res.json(bds))
    .catch(err => res.send(err));
});

// @route POST api/bodydata/getByDate
// @desc Get one data by date
router.post("/getByDate", async (req, res) => {
  BodyData.findOne({ date: req.body.date })
    .then(bd => res.json(bd))
    .catch(err => res.send(err));
});

// @route POST api/bodydata/
// @desc Add new weight without checking for duplicates
router.post("/", (req, res) => {
  let bd = new BodyData();

  bd.identifier = req.body.identifier;
  bd.value = req.body.value;
  bd.measure = req.body.measure;
  bd.date = req.body.date;

  bd.save()
    .then(res.json({ message: "BodyData created!" }))
    .catch(err => res.send(err));
});

// @route POST api/bodydata/many
// @desc Add many new entries
router.post("/many", (req, res) => {
  req.body.entries.forEach(val => {
    let bd = new BodyData();

    bd.identifier = val.identifier;
    bd.value = val.value;
    bd.measure = val.measure;
    bd.date = val.date;

    bd.save().catch(err => res.send(err));
  });

  res.json({ message: "BodyData created!" });
});

// @route POST api/bodydata/deleteAndAdd
// @desc Add new weight and delete possible old one
router.post("/deleteAndAdd", (req, res) => {
  //remove
  BodyData.deleteOne({
    date: req.body.date
  }).catch(err => res.send(err));

  let bd = new BodyData();

  bd.identifier = req.body.identifier;
  bd.value = req.body.value;
  bd.measure = req.body.measure;
  bd.date = req.body.date;

  bd.save()
    .then(res.json({ message: "BodyData created!" }))
    .catch(err => res.send(err));
});

// @route DELETE api/bodydata/
// @desc Delete one or more lists by id
router.delete("/", async (req, res) => {
  BodyData.deleteOne({
    _id: req.body._id
  })
    .then(res.status(200).send())
    .catch(err => res.send(err));
});

// @route DELETE api/bodydata/all
// @desc Delete everything
router.delete("/all", async (req, res) => {
  BodyData.deleteMany({})
    .then(res.status(200).send())
    .catch(err => res.send(err));
});

module.exports = router;
