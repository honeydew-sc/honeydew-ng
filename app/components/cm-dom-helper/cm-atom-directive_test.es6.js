describe('cmAtom clickable phrase directive', () => {
    var $compile,
        $rootScope,
        $window,
        autocomplete,
        fakePhrase;

    beforeEach(module('honeydew'));
    beforeEach(inject( (_$compile_, _$rootScope_, _$window_, _autocomplete_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;

        autocomplete = _autocomplete_;

        spyOn($window, 'open');
        spyOn(autocomplete, 'getPhraseFile').and.returnValue('dest');

    }));

    iit('makes the thing clickable', () => {
        var elem = $compile(angular.element('<span class="cm-atom">' + fakePhrase + '</span>'))($rootScope);
        elem.triggerHandler('click');
        expect($window.open).toHaveBeenCalledWith('dest');
    });
});
