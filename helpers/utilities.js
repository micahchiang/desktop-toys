var _ = require('lodash');

var Utilities = {

    cleanData: function(obj) {

        let payload = {};

        for(var key in obj) {
            if(obj.hasOwnProperty(key) && key === 'DetailPageURL') {
                payload[key] = obj[key][0];
            }
            if(obj.hasOwnProperty(key) && key === 'LargeImage') {
                payload['image'] = this.retrieveImage(obj[key]);
            }
        }
        return payload;
    },

    retrieveImage: function(arr) {

        let imageUnformatted = arr[0];
        let imageProps = _.mapValues(imageUnformatted, (d) => {
            return d[0];
        });
        for(var key in imageProps) {
            if (key === 'Height' || key === 'Width') {
                let value = imageProps[key][Object.keys(imageProps[key])[0]];
                imageProps[key] = value;
            }
        }
        return imageProps;
    }

}

module.exports = Utilities;