const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favs = require('../models/favourite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const user = require('../models/user');
const Dishes = require('../models/dishes');
const favRouter = express.Router();

favRouter.use(bodyParser.json());

favRouter.route('/')
.options(cors.corsWithOptions, (res, req) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favs.findById(req.user._id)
            .populate('user')
            .populate('favourites')
            .then((favs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favs)
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser
        , (req, res, next) => {
        Favs.findById(req.user._id)
        .then((fav) => {
            if(fav != null){
                console.log(fav.favourites);

                for(var i=0; i < req.body.length; i++){
                    if(fav.favourites.indexOf(req.body[i]._id) === null){
                        fav.favourites.push(req.body[i]);
                    }
                }
                fav.save()
                .then((fav) => {
                    Favs.findById(fav._id)
                        .then((fav) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(fav);
                        })    
                }, (err) => next(err));
            }else{
                const favs = {
                    user: req.user._id,
                    _id: req.user._id,
                    favourites: req.body
                };
                console.log(favs.favourites);
                Favs.create(favs)
                .then((fav) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    console.log('Dish Added to Favs ', fav);
                    res.json(fav);
                }, (err) => next(err));
            }
        }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /favourites");
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
        Favs.findByIdAndRemove(req.user._id)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

favRouter.route('/:dishId')
.options(cors.corsWithOptions, (res, req) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end("GET operation not supported on /dishId endpoint");
    })
    .post(cors.corsWithOptions, authenticate.verifyUser
        , (req, res, next) => {
        Favs.findById(req.user._id)
        .then((fav) => {
            if(fav != null){
                console.log({_id:req.params.dishId});
                if(fav.favourites.indexOf(req.params.dishId) === null){
                    fav.favourites.push({_id:req.params.dishId});
                }
                fav.save()
                .then((fav) => {
                    Favs.findById(fav._id)
                        .then((fav) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(fav);
                        })    
                }, (err) => next(err));
            }else{
                const favs = {
                    user: req.user._id,
                    _id: req.user._id,
                    favourites: {_id:req.params.dishId}
                };
                Favs.create(favs)
                .then((fav) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    console.log('Dish Added to Favs ', fav);
                    res.json(fav);
                }, (err) => next(err));
            }
        }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /dishId");
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
        Favs.removeArrayElement.update({},
            {$pull:{favourites:{$in:[req.params.dishId]}}},
            {multi:true}
            )
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


    module.exports = favRouter;