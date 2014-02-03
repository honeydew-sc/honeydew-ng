'use strict';

describe('Service: Files', function () {

    // load the service's module
    beforeEach(module('honeydew'));

    // instantiate service
    var Files;
    beforeEach(inject(function (_Files_) {
        Files = _Files_;
    }));

    it('should do something', function () {
        expect(!!Files).toBe(true);
    });

});
