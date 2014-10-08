'use strict';

describe('FeatureMode', function () {
    var httpMock, featureMode, feature, tests,
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
            ' sScenario: something',
            '   An example phrase',
            '   A line with an ExampleKeyword in it'
        ].join("\n");

        tests = 0;
    }));

    it('should parse phrases out!', function () {
        CodeMirror.runMode(feature, 'honeydew', function ( token, styleClass) {
            if (token.match('An example phrase')) {
                tests++;
                expect(styleClass).toBe(PHRASE_TOKEN);
            }
        });
        expect(tests).toBe(1);
    });

    it('should parse keywords out', function () {
        CodeMirror.runMode(feature, 'honeydew', function ( token, styleClass) {
            if (token.match('ExampleKeyword')) {
                tests++;
                expect(styleClass).toBe(KEYWORD_TOKEN);
            }
        });
        expect(tests).toBe(1);
    });

    it('should parse SScenarios', function () {
        CodeMirror.runMode(feature, 'honeydew', function ( token, styleClass) {
            if (token.match('sScenario')) {
                tests++;
                expect(styleClass).toBe('sscenario');
            }
        });
        expect(tests).toBe(1);
    });


});
