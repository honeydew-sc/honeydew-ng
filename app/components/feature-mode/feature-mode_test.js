var $__app_47_components_47_feature_45_mode_47_feature_45_mode_95_test__ = (function() {
  "use strict";
  var __moduleName = "app/components/feature-mode/feature-mode_test";
  function require(path) {
    return $traceurRuntime.require("app/components/feature-mode/feature-mode_test", path);
  }
  'use strict';
  describe('FeatureMode', (function() {
    var httpMock,
        featureMode,
        feature,
        tests,
        PHRASE_TOKEN = 'atom',
        KEYWORD_TOKEN = 'tag';
    beforeEach(module('honeydew'));
    beforeEach(inject((function(_$httpBackend_, _featureMode_) {
      httpMock = _$httpBackend_;
      featureMode = _featureMode_;
      httpMock.expectGET('/rest.php/tree/sets').respond({tree: []});
      httpMock.expectGET('/rest.php/autocomplete').respond({
        suggestRules: ['placeholder'],
        regexRules: ['placeholder'],
        phrases: {'An example phrase': ''},
        keywords: {ExampleKeyword: 'word'}
      });
      httpMock.expectGET('/rest.php/autocomplete').respond({
        suggestRules: ['placeholder'],
        regexRules: ['placeholder'],
        phrases: {'An example phrase': ''},
        keywords: {ExampleKeyword: 'word'}
      });
      httpMock.flush();
      feature = ['Feature: test', '', ' sScenario: something', '   An example phrase', '   A line with an ExampleKeyword in it'].join("\n");
      tests = 0;
    })));
    it('should parse phrases out!', (function() {
      CodeMirror.runMode(feature, 'honeydew', (function(token, styleClass) {
        if (token.match('An example phrase')) {
          tests++;
          expect(styleClass).toBe(PHRASE_TOKEN);
        }
      }));
      expect(tests).toBe(1);
    }));
    it('should parse keywords out', (function() {
      CodeMirror.runMode(feature, 'honeydew', (function(token, styleClass) {
        if (token.match('ExampleKeyword')) {
          tests++;
          expect(styleClass).toBe(KEYWORD_TOKEN);
        }
      }));
      expect(tests).toBe(1);
    }));
    it('should parse SScenarios', (function() {
      CodeMirror.runMode(feature, 'honeydew', (function(token, styleClass) {
        if (token.match('sScenario')) {
          tests++;
          expect(styleClass).toBe('sscenario');
        }
      }));
      expect(tests).toBe(1);
    }));
    it('should handle variables with spaces', (function() {
      var preamble = ['Feature: variable', '', '$whee = "spaces here"'].join("\n");
      CodeMirror.runMode(preamble, 'honeydew', (function(token, styleClass) {
        if (token === '$whee') {
          tests++;
          expect(styleClass).toBe('variable');
        }
        if (token === '"spaces here"') {
          tests++;
          expect(styleClass).toBe('string');
        }
      }));
      expect(tests).toBe(2);
    }));
    it('should handle example tables with commented out lines', (function() {
      var examples = ['Feature:', '', ' Scenario: whee', ' Examples:', ' | header | row |', ' | first | row|', ' # | commented | row |', ' | another | row |'].join("\n");
      CodeMirror.runMode(examples, 'honeydew', (function(token, styleClass) {
        if (token === 'first ') {
          tests++;
          expect(styleClass).toBe('string');
        }
        if (token === ' # | commented | row |') {
          tests++;
          expect(styleClass).toBe('comment');
        }
        if (token === 'another ') {
          tests++;
          expect(styleClass).toBe('string');
        }
      }));
      expect(tests).toBe(3);
    }));
    it('should handle sScenario as the first line', (function() {
      var sscenario = ['Feature: okay', '', ' sScenario: whee', ' Given I am on the / page'].join("\n");
      CodeMirror.runMode(sscenario, 'honeydew', (function(token, styleClass) {
        if (token.match('sScenario')) {
          tests++;
          expect(styleClass).toBe('sscenario');
        }
        if (token.match('Given')) {
          tests++;
          expect(styleClass).toBe('variable-2');
        }
      }));
      expect(tests).toBe(2);
    }));
  }));
  return {};
})();
