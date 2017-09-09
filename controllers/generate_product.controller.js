var amazon = require('amazon-product-api');
var util = require('util');

var client = amazon.createClient({
    awsId: 'AKIAIEILMMUXXKHQYMKQ',
    awsSecret: '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',
    awsTag: 'mkccorp-20'
});

exports.productGenerate = (req, res) => {
    console.log('GOT TO CONTROLLER METHOD');
    client.itemSearch({
        keywords: 'lego',
        MaximumPrice: '10.00',
    }).then((response) => {
        var pick = response[Math.floor(Math.random() * response.length)];
        console.log(pick);
        console.log('RESPONSE RECEIVED');
        res.send(pick);
    }).catch((err) => {
        console.log(err);
    });
};