var amazon = require('amazon-product-api');
var utilities = require('../helpers/Utilities');
var terms = require('./search_terms.json');
var util = require('util');

var client = amazon.createClient({
    awsId: 'AKIAIEILMMUXXKHQYMKQ',
    awsSecret: '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',
    awsTag: 'mkccorp-20'
});

exports.productGenerate = (req, res) => {
    let searchTerm = terms.keywords[utilities.randomizeIndex(terms.keywords)];
    client.itemSearch({
        keywords: searchTerm,
        responseGroup: 'Small, Images'
    }).then((response) => {
        var pick = response[utilities.randomizeIndex(response)];
        var payload = utilities.cleanData(pick);
        res.send(payload);
    }).catch((err) => {
        console.log(err);
    });
};