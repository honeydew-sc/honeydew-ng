describe('ReportMode', function () {
    var cmReportMode, preambleOptions;

    beforeEach(module('config', 'sc.cmmodes'));
    beforeEach(inject( (_cmReportMode_, _preambleOptions_) => {
        cmReportMode = _cmReportMode_;
        preambleOptions = _preambleOptions_;
    }));

    var feature = `Start Date: 1427121862
Host: https://www.jd.sharecare.com
Build: 4.17.4.20150319-1944
Browser: Chrome Local
Feature File: test/dan.feature
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


End Date: 2015-08-18 16:00:46`;

    describe('Parsing: ', () => {
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
            'User:',
            'End Date:',
        ].map( header => {
            it('should parse the header "' + header + '"', () => {
                expectClass(feature, header , cmReportMode.HEADER);
            });
        });

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

        it('should parse a successful scenario ending', () => {
            var line = '# Success';
            expectClass(line, line, cmReportMode.successfulScenario());
        });

        it('should parse a failed scenario ending', () => {
            var line = '# Failure';
            expectClass(line, line, cmReportMode.failedScenario());
        });

        it('should make report IDs clickable', () => {
            var line = 'Report ID: 44';
            expectClass(line, 'Report ID', cmReportMode.LINK);
            expectClass(line, '44', cmReportMode.LINK);
        });

        it('should parse dates in seconds', () => {
            let line = 'Start Date: 1439926735';
            expectClass(line, '1439926735', cmReportMode.DATE);
        });

        it('should parse dates in YYYY-MM-DD HH:MM:SS', () => {
            let line = 'End Date: 2015-08-18 19:39:10';
            expectClass(line, '2015-08-18 19:39:10', cmReportMode.DATE);

        });
    });

    describe('Syntax highlighting:', () => {
        it('should highlight new messages before outputting them', () => {
            var success = '# (OK)  (100)   Given';
            var expectedHighlighting = '<span class="success"># (OK)  (100)</span>   Given';

            expect(cmReportMode.highlight(success))
                .toBe(expectedHighlighting);
        });

        describe('link-making', () => {
            it('should linkify feature file references', () => {
                let highlit = cmReportMode.highlight( 'Feature File: test/dan.feature' );
                let link = 'href="/#/features/test/dan.feature"';
                expect( highlit ).toContain( link );

            });

            it('should make links clickable', () => {
                expect(cmReportMode.highlight( 'Report ID: 44' ))
                    .toContain( '<a href="/#/report/44">44</a>' );
            });

            it('should make links out of screenshot diagnostic info', () => {
                let output = cmReportMode.highlight( 'Reference: /mnt/screenshots/abc & current: /mnt/screenshots/123' );

                expect(output).toContain( 'href="/screenshots/abc">Reference</a>' );
                expect(output).toContain( 'href="/screenshots/123">current</a>' );
                expect(output).toMatch( /target="_blank"/ );
            });

            it('should make links out of reference screenshot log info', () => {
                let output = cmReportMode.highlight( 'Saving reference: /mnt/screenshots/abc' );

                expect(output).toContain( 'href="/screenshots/abc">reference</a>' );
            });
        });

        describe('dates', () => {
            it('should convert dates from seconds to local TZ', () => {
                let output = cmReportMode.highlight('Start Date: 1439926735');
                expect(output).toMatch(/8.*18, .*:38:55.M/);
            });

            it('should should convert dates from database to local TZ', () => {
                let output = cmReportMode.highlight('End Date: 2015-08-18 19:39:10');
                expect(output).toMatch(/8.*18, .*:39:10.M/);
            });

            it('should not convert outside of header lines', () => {
                let output = cmReportMode.highlight('Not A Date Header: 123123123');
                // 123123123 as epoch is 11/25/1973, 7:52:03 PM GMT-5:00
                expect(output).not.toMatch(/11-25/);
            });
        });
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
