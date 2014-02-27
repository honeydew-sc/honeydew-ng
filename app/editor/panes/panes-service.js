'use strict';

angular.module('honeydew')
    .service('panes', [ function () {
        var base = '/editor/editor/panes/';

        return {
            panes: [
                {
                    name: 'report',
                    classes: 'col-md-6',
                    src: '/reports.php?new=true',
                    icon: 'fa-list-alt',
                    tooltip: 'Live Report',
                    init: function () {}
                },
                {
                    name: 'samples',
                    classes: 'col-md-6',
                    src: base + '/examples/examples.html',
                    icon: 'fa-clipboard',
                    tooltip: 'Samples',
                    init: function () {}
                },
                {
                    name: 'rules',
                    classes: 'col-md-6',
                    src: base + '/rules/rules.html',
                    icon: 'fa-file-text-o',
                    tooltip: 'All Rules',
                    init: function () {}
                },
                {
                    name: 'settings',
                    classes: 'col-md-3',
                    src: base + '/settings/settings.html',
                    icon: 'fa-gear',
                    tooltip: 'Settings',
                    init: function () {}
                },
                {
                    name: 'help',
                    classes: 'col-md-4',
                    src: base + '/help/help.html',
                    icon: 'fa-question-circle',
                    tooltip: 'Help',
                    init: function (scope) {
                        return {
                            shortcuts: (function (keys) {
                                var shortcuts = [];
                                for (var key in keys) {
                                    shortcuts.push({
                                        key: key,
                                        command: keys[key]
                                    });
                                };

                                return shortcuts;
                            })(scope.editorOptions.extraKeys),

                            gridOptions: {
                                data: 'help.shortcuts'
                            }
                        };
                    }
                }
            ],

            activePane: '',

            openPane:  function (pane, scope) {
                if (typeof(scope) === 'undefined') {
                    scope = {};
                }

                var panes = this;
                if (typeof(pane) === 'object') {
                    this.activePane = pane.name;
                    this.url = pane.src;

                    scope[pane.name] = pane.init(scope);
                }
                else {
                    this.panes.forEach( function (paneObject) {
                        if (paneObject.name === pane) {
                            panes.openPane(paneObject);
                        }
                    });
                }
            },

            closePane:  function () {
                this.activePane = '';
                this.url = '';
            },

            togglePane:  function (pane, scope) {
                if (this.activePane === pane.name) {
                    this.closePane();
                }
                else {
                    this.openPane(pane, scope);
                }
            }
        };
    }]);
