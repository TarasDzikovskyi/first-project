const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyAP5Q5CXmnExXciK2oL-cn9_gTGgre1whs',
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
