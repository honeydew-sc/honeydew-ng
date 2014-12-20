describe('cmClickableLink phrase directive', () => {
    var elm,
        scope,
        compile,
        window;

    beforeEach(module('honeydew'));
    beforeEach(inject( ($compile, $rootScope, $window) => {
        scope = $rootScope;
        compile = $compile;
        window = $window;

        spyOn($window, 'open');
    }));

    var setupElemText = text => {
        elm = angular.element('<span class="cm-clickable-link">' + text + '</span>');
        compile(elm)(scope);
        scope.$digest();
    };

    it('should make a JIRA ticket clickable', () => {
        var text = 'MOBILE-12345';
        setupElemText(text);
        elm.triggerHandler('click');
        expect(window.open)
            .toHaveBeenCalledWith('https://arnoldmedia.jira.com/browse/' + text, '_blank');
    });

    it('should make features clickable', () => {
        var text = 'an-innocent.feature';
        setupElemText(text);
        elm.triggerHandler('click');
        expect(window.open)
            .toHaveBeenCalledWith('/#/features/' + text, '_blank');
    });

    it('should override JIRA tickets with feature tickets', () => {
        var text = 'a-feature-with-a-MOBILE-23852-ticket.feature';
        setupElemText(text);
        elm.triggerHandler('click');
        expect(window.open)
            .toHaveBeenCalledWith('/#/features/' + text, '_blank');
    });

    it('should make sets clickable', () => {
        var text = 'set';
        setupElemText('@' + text);
        elm.triggerHandler('click');
        expect(window.open)
            .toHaveBeenCalledWith('/#/sets/' + text + '.set', '_blank');
    });

    it('should make normal boring links clickable', () => {
        var text = 'boring.com';
        setupElemText(text);
        elm.triggerHandler('click');
        expect(window.open)
            .toHaveBeenCalledWith('http://' + text, '_blank');
    });
});
