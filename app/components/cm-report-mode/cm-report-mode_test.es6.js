describe('ReportMode', function () {
    var expectClass = (feature, testToken, assertClass) => {
        var tests = 0;
        CodeMirror.runMode(feature, 'report', ( token, styleClass ) => {
            if (token.match(testToken)) {
                tests++;
                expect(styleClass).toBe(assertClass);
            }
        });

        expect(tests).toBe(1);
    };

    iit('should parse everything as reports', () => {
        expectClass('test', 'test', 'report');

    });
});
