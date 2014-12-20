'use strict';

describe('FeatureMode', () => {
    var set,
        tests,
        httpMock,
        codemirrorSetMode;

    beforeEach(module('honeydew'));

    beforeEach(inject( function ( _$httpBackend_ ) {
        httpMock = _$httpBackend_;

        // httpMock.expectGET('/rest.php/tree/sets').respond({tree: []});
        // httpMock.expectGET('/rest.php/autocomplete').respond({
        //     suggestRules: ['placeholder'],
        //     regexRules: ['placeholder'],
        //     phrases: { 'An example phrase' : '' },
        //     keywords: { ExampleKeyword: 'word' }
        // });
        // httpMock.expectGET('/rest.php/autocomplete').respond({
        //     suggestRules: ['placeholder'],
        //     regexRules: ['placeholder'],
        //     phrases: { 'An example phrase': '' },
        //     keywords: { ExampleKeyword: 'word' }
        // });
        // httpMock.flush();

        set = 'a-nice-feature.feature';
        codemirrorSetMode = 'set-mode';

        tests = 0;
    }));

    it('should parse phrases out!', () => {
        CodeMirror.runMode(set, 'set-mode', ( token, styleClass ) => {
            if (token.match(set)) {
                tests++;
                expect(styleClass).toBe('clickable-link');
            }
        });
        expect(tests).toBe(1);
    });

});
