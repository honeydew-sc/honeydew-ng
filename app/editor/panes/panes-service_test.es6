describe('panesService', function () {
    var panesService, compile;
    beforeEach(module('honeydew'));

    beforeEach(inject(function (_panes_, _$compile_) {
        panesService = _panes_;
        compile = _$compile_;
    }));

    it('can get an instance', function () {
        expect(panesService).toBeDefined();
    });

    it('can open templateUrl panes', function () {
        var activePane = panesService.panes[0];
        panesService.openPane(activePane.name);
        expect(panesService.activePane).toBe(activePane.name);
        expect(panesService.url).toBe(activePane.templateUrl);
    });

    it('can open panes by string name', function () {
        var activePaneName = 'report';
        panesService.openPane(activePaneName);
        expect(panesService.activePane).toBe(activePaneName);
    });

    it('can close an open pane', function () {
        var activePaneName = 'report';
        panesService.openPane(activePaneName);
        expect(panesService.activePane).toBe(activePaneName);
        panesService.closePane();
        expect(panesService.activePane).toBe('');
    });

    it('can open panes that need compilation', function () {
        var activePane = panesService.panes[panesService.panes.length-1];
        var scope = {
            editorOptions: {
                extraKeys: {
                    fake: "out"
                }
            }
        };

        var centerPanel = angular.element('<div class="center-panel ' + activePane.name + '"></div>');
        centerPanel.appendTo(document.body);

        var contents = compile( activePane.template )( scope );
        panesService.openPane(activePane, contents);


        expect(panesService.activePane).toBe(activePane.name);
        expect(centerPanel.html()).toContain(activePane.name);
    });

    it('can toggle panes', function () {
        var activePane = panesService.panes[0];
        panesService.togglePane(activePane);
        expect(panesService.activePane).toBe(activePane.name);
        panesService.togglePane(activePane);
        expect(panesService.activePane).toBe('');
    });
});
