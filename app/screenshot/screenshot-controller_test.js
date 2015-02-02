'use strict';

describe('ScreenshotCtrl', function () {
    var scope,
        httpMock,
        controller,
        stateParams,
        ScreenshotCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        controller = $controller;
        httpMock = $httpBackend;
        scope = $rootScope.$new();

        var urls = [
            'iphone-0.0.0.20150202-0212-iOS-home-375x667-http-www.sharecare.com-iOS.png',
            'iphone-0.0.0.20150202-0212-375x667-http-www.sharecare.com-iOS.png',
            'chrome-D7-hotfix-4-3-1_20150109.1144-hdew-480x320-http-www.stage.doctoroz.com-desktop-diff.png'
        ];
    }));

    function ctrlFor(path) {
        stateParams = { screenshot: path };
        return controller('ScreenshotCtrl', {
            $scope: scope,
            $stateParams: stateParams
        });
    };

    it('should be instantiated?', function () {
        expect(scope).toBeDefined();
    });

    it('should create an array of images for a named image', function () {
        var path = 'iphone-0.0.0.20150202-0212-iOS-home-375x667.png',
            knownGood = 'iphone-known-good-iOS-home-375x667.png',
            opponent = 'iphone-0.0.0.20150202-0212-iOS-home-375x667.png',
            diff = 'iphone-0.0.0.20150202-0212-iOS-home-375x667-diff.png';

        var ctrl = ctrlFor(path);
        expect(ctrl.images[0].src).toBe(knownGood);
        expect(ctrl.images[1].src).toBe(opponent);
        expect(ctrl.images[2].src).toBe(diff);
    });

    it('should create an array of images for an unnamed image', function () {
        var path = 'iphone-0.0.0.20150202-0212-375x667.png',
            knownGood = 'iphone-known-good-375x667.png',
            opponent = 'iphone-0.0.0.20150202-0212-375x667.png',
            diff = 'iphone-0.0.0.20150202-0212-375x667-diff.png';

        var ctrl = ctrlFor(path);
        expect(ctrl.images[0].src).toBe(knownGood);
        expect(ctrl.images[1].src).toBe(opponent);
        expect(ctrl.images[2].src).toBe(diff);
    });

    it('should create an array of images for a named droz image', function () {
        var path = 'chrome-D7-hotfix-4-3-1_20150109.1144-hdew-480x320.png',
            knownGood = 'chrome-known-good-hdew-480x320.png',
            opponent = 'chrome-D7-hotfix-4-3-1_20150109.1144-hdew-480x320.png',
            diff = 'chrome-D7-hotfix-4-3-1_20150109.1144-hdew-480x320-diff.png';

        var ctrl = ctrlFor(path);
        expect(ctrl.images[0].src).toBe(knownGood);
        expect(ctrl.images[1].src).toBe(opponent);
        expect(ctrl.images[2].src).toBe(diff);
    });
});
