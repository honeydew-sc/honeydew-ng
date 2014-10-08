'use strict';

ddescribe('FeatureMode', function () {
    var httpMock, featureMode, feature,
        PHRASE_TOKEN = 'atom',
        KEYWORD_TOKEN = 'tag';

    beforeEach(module('honeydew'));


    beforeEach( inject( function ( _$httpBackend_, _featureMode_ ) {
        httpMock = _$httpBackend_;
        featureMode = _featureMode_;

        httpMock.expectGET('/rest.php/tree/sets').respond({tree: []});
        httpMock.expectGET('/rest.php/autocomplete').respond({
            suggestRules: ['placeholder'],
            regexRules: ['placeholder'],
            phrases: [ 'An example phrase' ],
            keywords: { ExampleKeyword: 'word' }
        });
        httpMock.expectGET('/rest.php/autocomplete').respond({
            suggestRules: ['placeholder'],
            regexRules: ['placeholder'],
            phrases: [ 'An example phrase' ],
            keywords: { ExampleKeyword: 'word' }
        });
        httpMock.flush();

        feature = [
            'Feature: test',
            '',
            ' Scenario: something',
            '   An example phrase',
            '   A line with an ExampleKeyword in it'
        ].join("\n");
    }));

    it('should parse phrases out!', function () {
        CodeMirror.runMode(feature, 'honeydew', function ( token, styleClass) {
            if (token.match('superman')) {
                expect(styleClass).toBe(PHRASE_TOKEN);
            }
        });
    });

    it('should parse keywords out', function () {
        CodeMirror.runMode(feature, 'honeydew', function ( token, styleClass) {
            if (token.match('ExampleKeyword')) {
                expect(styleClass).toBe(KEYWORD_TOKEN);
            }
        });
    });


});
