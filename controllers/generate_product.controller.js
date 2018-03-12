var amazon = require('amazon-product-api');
var RateLimiter = require('limiter').RateLimiter;
var utilities = require('../helpers/Utilities');
var terms = require('./search_terms.json');
var util = require('util');

// aws api creds go here.
var client = amazon.createClient({
    awsId: '',
    awsSecret: '',
    awsTag: ''
});

var limiter = new RateLimiter(1, 2000);



exports.productGenerate = (req, res) => {
    let searchTerm = terms.keywords[utilities.randomizeIndex(terms.keywords)];
    limiter.removeTokens(1, () => {
        client.itemSearch({
            keywords: searchTerm,
            responseGroup: 'Medium, Images'
        }).then((response) => {
            var pick = response[utilities.randomizeIndex(response)];
            var payload = utilities.cleanData(pick);
            res.send(payload);
        }).catch((err) => {
            console.log(err.Error);
            res.send(err.Error);
        });
    })
};