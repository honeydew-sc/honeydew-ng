describe('ReportMode', function () {
    var cmReportMode, preambleOptions;

    beforeEach(module('sc.cmmodes'));
    beforeEach(inject( (_cmReportMode_, _preambleOptions_) => {
        cmReportMode = _cmReportMode_;
        preambleOptions = _preambleOptions_;
    }));

    var feature = `Start Date: 1427121862
Host: https://www.jd.sharecare.com
Build: 4.17.4.20150319-1944
Browser: Chrome Local
Feature File: /test/dan.feature
Job ID: 1a9a3d9e-5597-4b27-a18b-06023403906f

Feature: test
Existing Bug: whee
Set: @hi
proxy
Email: hey
Subtitles: 0
Keep Open
JIRA: hd-145
Agent: iphone
User: 1new-email-address@mailinator.com

# Scenario: As an example table, copy this part out for your own use!
# (OK)  (100)   Given I am on the / page (2.00 secs)
# (OK)  (415)   When I log in as an example user
# (OK)  (302)   When I pause for 3 seconds
# Success


End Date: 1427121879`;

    describe('Headers:', () => {
        var headers = [
            'Start Date:',
            'Host:',
            'Build:',
            'Browser:',
            'Job ID:',
            'Feature File:',
            'Existing Bug',
            'Set:',
            'Email:',
            'Subtitles:',
            'JIRA:',
            'Agent:',
            'User:'
        ].map( header => {
            it('should parse the header "' + header + '"', () => {
                expectClass(feature, header , cmReportMode.HEADER);
            });
        });
    });

    describe('Rules:', () => {
        it('should parse a passing rule', () => {
            var rule = '# (OK)  (100)   Given I am on the / page (2.00 secs)';
            expectClass(rule, '# ', cmReportMode.SUCCESS);
            expectClass(rule, '(OK)', cmReportMode.SUCCESS);
            expectClass(rule, '(100)', cmReportMode.SUCCESS);
        });

        it('should parse a failing rule', () => {
            var rule = '# (ER)  (100)   Given I am on the / page (2.00 secs)';
            expectClass(rule, '# ', cmReportMode.FAILURE);
            expectClass(rule, '(ER)', cmReportMode.FAILURE);
            expectClass(rule, '(100)', cmReportMode.FAILURE);
        });
    });

    describe('Scenarios: ', () => {
        it('should parse a successful scenario ending', () => {
            var line = '# Success';
            expectClass(line, line, cmReportMode.successfulScenario());
        });

        it('should parse a failed scenario ending', () => {
            var line = '# Failure';
            expectClass(line, line, cmReportMode.failedScenario());
        });
    });

    it('should make report IDs clickable', () => {
        var line = '# Report ID: 44';
        expectClass(line, 'Report ID', cmReportMode.LINK);
        expectClass(line, '44', cmReportMode.LINK);
    });


    var expectClass = (feature, testToken, assertClass) => {
        var tests = '';
        CodeMirror.runMode(feature, 'report', ( token, styleClass ) => {
            if (token.match(testToken)) {
                tests = 'successfully parsed ' + testToken;
                expect(styleClass).toBe(assertClass);
            }
        });

        expect(tests).toBe('successfully parsed ' + testToken);
    };


});
