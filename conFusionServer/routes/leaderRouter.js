const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Leaders = require("../models/leaders");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")

  .get((req, res, next) => {
    Leaders.find({})
      .then(leaders => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leaders);
      })
      .catch(err => next(err));
  })

  .post((req, res, next) => {
    Leaders.create(req.body)
      .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch(err => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported here`);
  })

  .delete((req, res, next) => {
    Leaders.deleteMany({})
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

leaderRouter
  .route("/:leaderId")

  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch(err => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST not supported`);
  })

  .put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, { $set: req.body }, { new: true })
      .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch(err => next(err));
  })

  .delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

module.exports = leaderRouter;
