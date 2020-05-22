const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
// const dishRouterId = express.Router();

leaderRouter.use(bodyParser.json());
// dishRouterId.use(bodyParser.json());


leaderRouter.route('/')
    .all((req,res,next) => {
        // console.log(req);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req,res,next) => {
        console.log(req.params.leaderId);
        res.end('Will send all the leaders to you !');
    })
    .post((req,res,next) => {
        // console.log(req);
        res.end("Will add the leader : "+ req.body.name +
            " with details : "+ req.body.description);
    })
    .put((req,res,next) => {
        // console.log(req);

        res.statusCode = 403;
        res.end("PUT operation not supported on /leaders");
    })
    .delete((req,res,next) => {
        res.end('Deleting all the leaders !');
    });

leaderRouter.route('/:leaderId')
    .get((req,res,next) => {
        res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
    })
    .post( (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
    })
    .put((req, res, next) => {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + 
                ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting leaders: ' + req.params.leaderId);
    });


// module.exports = leaderRouterId;
module.exports = leaderRouter;
