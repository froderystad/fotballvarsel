/*jshint expr: true*/

var expect = require('chai').expect;
var secretGenerator = require('../js/secret-generator.js');

describe('Secret generator', function() {
    describe('When generating a new secret', function () {
        it('is 32 chars long', function () {
            var secret = secretGenerator.newSecret();
            expect(secretGenerator.newSecret().length).to.equal(36);
        });
    })
});
