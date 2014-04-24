'use strict';

describe('cmAutocompleteService', function () {
    var cmAutocomplete, httpMock;
    var httpResponse = {
        suggestRules: [
            'what a rule'
        ],
        regexRules: [
            'oh boy'
        ],
        phrases: [
            'this is a test phrase',
            'and so is this!'
        ]
    };

    var newResponse = {
        suggestRules: [
            'what a rule'
        ],
        regexRules: [
            'oh boy'
        ],
        phrases: [
            'this is new'
        ]
    };

    var mockCodeMirror = function (preamble) {
        return {
            getCursor: function () {
                return {
                    line: 0
                };
            },

            getTokenAt: function () {
                return {
                    state: {
                        allowPreamble: preamble
                    },
                    start: 0,
                    end: 0
                };
            },

            getLine: function () {
                if (preamble) {
                    return "Existing";
                }
                else {
                    return "is a test";
                }
            }
        };
    };

    beforeEach(module('honeydew'));

    beforeEach(inject(function (_cmAutocomplete_, _$httpBackend_) {
        httpMock = _$httpBackend_;
        httpMock.expectGET('/rest.php/autocomplete').respond(httpResponse);
        cmAutocomplete = _cmAutocomplete_;
        httpMock.flush();

    }));

    it('can get an instance of the service', function () {
        expect(cmAutocomplete).toBeDefined();
    });

    it('comes populated with steps out of the box!', function () {
        expect(cmAutocomplete.getSteps()).toContain(httpResponse.phrases[0]);
        expect(cmAutocomplete.getSteps()).toContain(httpResponse.phrases[1]);
    });

    it('can get updates from the server', function () {
        httpMock.expectGET('/rest.php/autocomplete').respond(newResponse);
        cmAutocomplete.populateAutocompleteSources();
        httpMock.flush();

        expect(cmAutocomplete.getSteps()).not.toContain(httpResponse.phrases[0]);
        expect(cmAutocomplete.getSteps()).toContain(newResponse.phrases[0]);
    });

    it('can return a filtered list of rules', function () {
        var hints = cmAutocomplete.getHints(mockCodeMirror());
        expect(hints.list.length).toBe(1);
        expect(httpResponse.phrases[0]).toMatch(hints.list[0].displayText);
        expect(hints.list).not.toContain(httpResponse.phrases[1].displayText);
    });

    it('can fail gracefully when nothing matches', function () {
        httpMock.expectGET('/rest.php/autocomplete').respond(newResponse);
        cmAutocomplete.populateAutocompleteSources();
        httpMock.flush();

        var hints = cmAutocomplete.getHints(mockCodeMirror());
        expect(hints.list.length).toBe(0);
    });

    it('can suggest preamble options when appropriate', function () {
        var hints = cmAutocomplete.getHints(mockCodeMirror(true));
        expect(hints.list.length).toBe(1);
        expect(hints.list[0].displayText).toContain('Existing');
    });
});
