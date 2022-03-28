const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Dishes = require("../models/dishes");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route("/")


  .get((req, res, next) => {
    Dishes.find({})
      .then(dishes => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dishes);
      })
      .catch(err => next(err));
  })

  .post((req, res, next) => {
    Dishes.create(req.body)
      .then(dish => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
      })
      .catch(err => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })

  .delete((req, res, next) => {
    Dishes.deleteOne({})
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

dishRouter
  .route("/:dishId")


  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
      })
      .catch(err => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
  })

  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
      $set: req.body
    }, { new: true })
      .then(dish => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
      })
      .catch(err => next(err));
  })

  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

dishRouter.route("/:dishId/comments")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish != null && dish.comments.length > 0) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish.comments);
        } else {
          err = new Error("Dish " + req.params.dishId + " not found");
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish != null) {
          dish.comments.push(req.body);
          dish.save()
            .then(dish => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            })
            .catch(err => next(err));
        } else {
          err = new Error("Dish " + req.params.dishId + " not found");
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes/" + req.params.dishId + "/comments");
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish != null && dish.comments.length > 0) {
          for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).deleteOne();
          }
          dish.save()
            .then(dish => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            })
            .catch(err => next(err));
        } else {
          err = new Error("Dish " + req.params.dishId + " not found");
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })

dishRouter.route("/:dishId/comments/:commentId")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish.comments.id(req.params.commentId));
        } else {
          err = new Error("Comment " + req.params.commentId + " not found");
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId + "/comments/" + req.params.commentId);
  })
  .put((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
          dish.comments.id(req.params.commentId).deleteOne();
          dish.comments.push(req.body);
          dish.save()
            .then(dish => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            })
            .catch(err => next(err));
        } else {
          err = new Error("Comment " + req.params.commentId + " not found");
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(dish => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
          dish.comments.id(req.params.commentId).deleteOne();
          dish.save()
            .then(dish => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            })
            .catch(err => next(err));
        } else {
          err = new Error("Comment " + req.params.commentId + " not found");
          err.status = 404;
          return next(err);
        }
      })
      .catch(err => next(err));
  })

module.exports = dishRouter;
