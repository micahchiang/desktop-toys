var amazon = require('amazon-product-api');
var util = require('util');
var utilities = require('../helpers/Utilities');

var client = amazon.createClient({
    awsId: 'AKIAIEILMMUXXKHQYMKQ',
    awsSecret: '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',
    awsTag: 'mkccorp-20'
});

exports.productGenerate = (req, res) => {
    client.itemSearch({
        keywords: 'bobblehead',
        responseGroup: 'Small, Images'
    }).then((response) => {
        console.log('RESPONSE RECEIVED');
        var pick = response[Math.floor(Math.random() * response.length)];
        var payload = utilities.cleanData(pick);
        console.log(payload);
        res.send(payload);
    }).catch((err) => {
        console.log(err);
    });
};