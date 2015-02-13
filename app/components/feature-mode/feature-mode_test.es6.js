'use strict';

describe('FeatureMode', () => {
    var httpMock, featureMode, feature, tests, preambleOptions,
        PHRASE_TOKEN = 'atom',
        KEYWORD_TOKEN = 'tag';

    beforeEach(module('honeydew'));

    beforeEach(inject( function ( _$httpBackend_, _featureMode_, _preambleOptions_ ) {
        httpMock = _$httpBackend_;
        featureMode = _featureMode_;
        preambleOptions = _preambleOptions_;

        httpMock.expectGET('/rest.php/tree/sets').respond({tree: []});
        httpMock.expectGET('/rest.php/autocomplete').respond({
            suggestRules: ['placeholder'],
            regexRules: ['placeholder'],
            phrases: { 'An example phrase' : '' },
            keywords: { ExampleKeyword: 'word' }
        });
        httpMock.expectGET('/rest.php/autocomplete').respond({
            suggestRules: ['placeholder'],
            regexRules: ['placeholder'],
            phrases: { 'An example phrase': '' },
            keywords: { ExampleKeyword: 'word' }
        });
        httpMock.flush();

        feature = [
            'Feature: test',
            '',
            ' Scenario: something',
            ' Given something',
            ' sScenario: something',
            '   An example phrase',
            '   A line with an ExampleKeyword in it'
        ].join("\n");

        tests = 0;
    }));

    var expectClass = (feature, testToken, assertClass) => {
        var tests = 0;
        CodeMirror.runMode(feature, 'honeydew', ( token, styleClass ) => {
            if (token.match(testToken)) {
                tests++;
                expect(styleClass).toBe(assertClass);
            }
        });

        expect(tests).toBe(1);
    };

    it('should parse phrases out!', () => {
        expectClass(feature, 'An example phrase', (PHRASE_TOKEN) );
    });

    it('should parse keywords out', () => {
        expectClass(feature, 'ExampleKeyword', KEYWORD_TOKEN );
    });

    it('should parse SScenarios', () => {
        expectClass(feature, 'sScenario', 'sscenario' );
    });

    it('should parse clickable links tickets', () => {
        var feature = `
Feature: jira tickets
JIRA: MOBILE-12345
Set: @example

www.sharecare.com
http://www.sharecare.com
  Scenario: cool MOBILE-54321
        `;

        var tokens = [
            'http://www.sharecare.com',
            '@example',
            'MOBILE-12345',
            'MOBILE-54321'
        ].forEach( it => {
            expectClass(feature, it, 'clickable-link');
        });
    });

    it('should handle variables with spaces', () => {
        var preamble = [
            'Feature: variable',
            '',
            '$whee = "spaces here"'
        ].join("\n");

        expectClass(preamble, /\$whee/, 'variable');
        expectClass(preamble, '"spaces here"', 'string');
    });

    it('should handle example tables with commented out lines', () => {
        var examples = [
            'Feature:',
            '',
            ' Scenario: whee',
            ' Examples:',
            ' | header | row |',
            ' | first | row|',
            ' # | commented | row |',
            ' | another | row |'
        ].join("\n");

        expectClass(examples, 'first', 'string');
        expectClass(examples, / # \| commented \| row \|/, 'comment');
        expectClass(examples, 'another', 'string');
    });

    it('should handle sScenario as the first line', () => {
        var sscenario = [
            'Feature: okay',
            '',
            ' sScenario: whee',
            ' Given I am on the / page'
        ].join("\n");

        expectClass(sscenario, 'sScenario', 'sscenario');
        expectClass(sscenario, 'Given', 'variable-2');
    });

    it('should highlight all preamble options', () => {
        var options = Object.keys(preambleOptions);

        options.forEach( op => {
            var preamble = [
                'Feature: okay',
                op,
                '',
            ].join("\n");

            expectClass(preamble, op, 'keyword');
        });
    });

});
