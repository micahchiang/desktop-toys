var express = require('express');
var router = express.Router();

router.get('/', (req,res,next) => {
    console.log('message received');
    res.send(
        'message sent to frontend'
    );
});

module.exports = router;