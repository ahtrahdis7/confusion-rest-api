const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
// const dishRouterId = express.Router();

promoRouter.use(bodyParser.json());
// dishRouterId.use(bodyParser.json());


promoRouter.route('/')
    .all((req,res,next) => {
        // console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req,res,next) => {
        console.log(req.params.promoId);
        res.end('Will send all the promotions to you !');
    })
    .post((req,res,next) => {
        // console.log(req);
        res.end("Will add the promotion : "+ req.body.name +
            " with details : "+ req.body.description);
    })
    .put((req,res,next) => {
        // console.log(req);

        res.statusCode = 403;
        res.end("PUT operation not supported on /promotions");
    })
    .delete((req,res,next) => {
        res.end('Deleting all the promotions !');
    });

promoRouter.route('/:promoId')
    .get((req,res,next) => {
        res.end('Will send details of the promotions : ' + req.params.promoId +' to you!');
    })
    .post( (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/'+ req.params.promoId);
    })
    .put((req, res, next) => {
        res.write('Updating the promotion : ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.body.name + 
                ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting promotion : ' + req.params.promoId);
    });


// module.exports = promoRouterId;
module.exports = promoRouter;
