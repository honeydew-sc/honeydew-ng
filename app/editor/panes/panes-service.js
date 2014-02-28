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
                    include: true
                },
                {
                    name: 'samples',
                    classes: 'col-md-6',
                    src: base + 'examples/examples.html',
                    icon: 'fa-clipboard',
                    tooltip: 'Samples',
                    include: true
                },
                {
                    name: 'rules',
                    classes: 'col-md-6',
                    src: base + 'rules/rules.html',
                    icon: 'fa-file-text-o',
                    tooltip: 'All Rules',
                    include: true
                },
                {
                    name: 'settings',
                    classes: 'col-md-3',
                    html: '<editor-settings options="editorOptions"></editor-settings>',
                    icon: 'fa-gear',
                    tooltip: 'Settings',
                    include: false
                },
                {
                    name: 'help',
                    classes: 'col-md-4',
                    html: '<editor-help options="editorOptions"></editor-help>',
                    icon: 'fa-question-circle',
                    tooltip: 'Help',
                    include: false
                }
            ],

            activePane: '',

            openPane:  function (pane, contents) {
                var panes = this;
                if (typeof(pane) === 'object') {
                    this.activePane = pane.name;

                    if (pane.include) {
                        this.url = pane.src;
                    }
                    else {
                        $('.center-panel.' + pane.name).html(contents);
                    }
                }
            },

            closePane:  function () {
                this.activePane = '';
                this.url = '';
            },

            togglePane:  function (pane, contents) {
                if (this.activePane === pane.name) {
                    this.closePane();
                }
                else {
                    this.openPane(pane, contents);
                }
            }
        };
    }]);
