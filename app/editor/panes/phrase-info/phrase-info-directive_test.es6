'use strict';

describe('phraseInfo directive', () => {
    var elm,
        scope,
        needles,
        httpMock,
        stateParams;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope, $httpBackend, $stateParams) => {
        httpMock = $httpBackend;
        stateParams = $stateParams;
        stateParams.path = 'phrases/fake.phrase';

        elm = angular.element('<div data-phrase-info></div>');
        scope = $rootScope;
        $compile(elm)(scope);

        // it should get the phrase file
        httpMock.expectGET('/rest.php/files/phrases%252Ffake.phrase').respond({
            contents: 'Phrase: fake\n\nwhee'
        });
        // and grep for its title line in features
        needles = {
            success: true,
            list: [
                "needles"
            ]
        };
        httpMock.expectGET(/\/rest.php\/tree\/(features|phrases)\?needle=fake/).respond(needles);
        httpMock.expectGET(/\/rest.php\/tree\/(features|phrases)\?needle=fake/).respond(needles);
        scope.$digest();
        httpMock.flush();

        // controllerAs: phrase
        scope = elm.isolateScope().phrase;
    }));

    it('should get compiled', () => {
        expect(elm).toBeDefined();
    });

    it('should put the found features on the controller', () => {
        expect(scope.features[0]).toBe(needles.list[0]);
    });

    it('should put the found phrases on the controller', () => {
        expect(scope.phrases[0]).toBe(needles.list[0]);
    });



});
