const express = require('express');
const bodyParser = require('body-parser');

const LeaderRouter = express.Router();
// const dishRouterId = express.Router();

const mongoose = require('mongoose');
const Leaders = require('../models/Leader');

LeaderRouter.use(bodyParser.json());
// dishRouterId.use(bodyParser.json());


LeaderRouter.route('/')
    .get((req,res,next) => {
        Leaders.find({})
            .then((Leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Leader)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req,res,next) => {
        Leaders.create(req.body)
            .then((Leader) => {
                console.log('Dish Created ', Leader);
                res.json(Leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req,res,next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /Leaders");
    })
    .delete((req,res,next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

LeaderRouter.route('/:LeaderId')
    .get((req,res,next) => {
        Leaders.findById(req.params.LeaderId)
        .then((Leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Leader)
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post( (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Leaders/'+ req.params.LeaderId);
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.LeaderId, {
            $set: req.body
        }, { new: true})
        .then((Leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Leader)
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.LeaderId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


// module.exports = LeaderRouterId;
module.exports = LeaderRouter;
