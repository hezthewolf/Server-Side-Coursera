const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    res.end("Send all the leaders to you");
  })

  .post((req, res, next) => {
    res.end(
      `Will add leader ${req.body.name} with details ${req.body.description}`
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported here`);
  })

  .delete((req, res, next) => {
    res.end(`Deleting all leaders`);
  });

leaderRouter
  .route("/:leaderId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    res.end(`Send details of leader ${req.params.leaderId}`);
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST not supported`);
  })

  .put((req, res, next) => {
    res.write(`Will update ${req.params.leaderId} \n`);
    res.end(
      `Will update leader ${req.body.name} with details: ${req.body.description}`
    );
  })

  .delete((req, res, next) => {
    res.end(`Deleting leader ${req.params.leaderId}`);
  });

module.exports = leaderRouter;
