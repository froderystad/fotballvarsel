var uuid = require('node-uuid');

exports.newSecret = function() {
    return uuid.v4();
};
