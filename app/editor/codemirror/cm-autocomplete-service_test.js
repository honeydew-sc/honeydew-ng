'use strict';

ddescribe('cmAutocompleteService', function () {
    var cmAutocomplete, httpMock;
    var httpResponse = {
        phrases: [
            'this is a test phrase',
            'and so is this!'
        ],
        keywords: {
            testKeyword: 'test-value'
        },
        preamble: [
            'preamble 1 is a test',
            'preamble 2'
        ]
    };

    var newResponse = {
        phrases: [
            'this is new'
        ],
        keywords: {
            andSo: 'is this'
        },
        preamble: [
            'preamble 3'
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
                return "is a test";
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
        expect(cmAutocomplete.keywords).toEqual(httpResponse.keywords);
    });

    it('can get updates from the server', function () {
        httpMock.expectGET('/rest.php/autocomplete').respond(newResponse);
        cmAutocomplete.populateAutocompleteSources();
        httpMock.flush();

        expect(cmAutocomplete.getSteps()).not.toContain(httpResponse.phrases[0]);
        expect(cmAutocomplete.getSteps()).toContain(newResponse.phrases[0]);
        expect(cmAutocomplete.keywords).not.toEqual(httpResponse.keywords);
        expect(cmAutocomplete.keywords).toEqual(newResponse.keywords);
    });

    it('can return a filtered list of rules', function () {
        var hints = cmAutocomplete.getHints(mockCodeMirror());
        expect(hints.list.length).toBe(1);
        expect(httpResponse.phrases).toContain(hints.list[0]);
        expect(hints.list).not.toContain(httpResponse.phrases[1]);
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
        expect(hints.list[0]).toContain('preamble');
    });
});
