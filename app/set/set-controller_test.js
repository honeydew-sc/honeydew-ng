'use strict';

describe('SetCtrl', function () {
    var cm,
        scope,
        httpMock,
        SetCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, CmDomHelpers) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();
        cm = CmDomHelpers;

        SetCtrl = $controller('SetCtrl', {
            $scope: scope,
            $stateParams: {
                set: 'test.set'
            },
            SetReport: {
                get: function () {}
            },
            CmDomHelpers: cm
        });

        spyOn(cm, 'compileRenderedLines');

        httpMock.expectGET('/rest.php/tree/sets').respond({tree: []});
        httpMock.expectGET('/rest.php/autocomplete').respond({
            suggestRules: [
                'what a rule'
            ],
            regexRules: [
                'oh boy'
            ],
            phrases: {
                'this is a test phrase': '',
                'and so is this!': ''
            }
        });
    }));

    it('should GET and put a file on the scope', function () {
        expect(scope.file).toBeDefined();

        httpMock.expectGET('/rest.php/files/sets%252Ftest.set').respond({
            file: scope.file,
            contents: 'something.feature'
        });
        httpMock.flush();
    });

    it('should compile the rendered lines from CodeMirror through Angular', function () {
        scope.editorOptions.onLoad(CodeMirror);
        expect(cm.compileRenderedLines).toHaveBeenCalled();
        expect(cm.compileRenderedLines.calls.count()).toBe(1);
    });
});
