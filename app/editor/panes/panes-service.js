'use strict';

angular.module('honeydew')
    .service('panes', [ function () {
        return {
            panes: [
                {
                    name: 'report',
                    classes: 'col-md-6',
                    src: '/reports.php?new=true',
                    icon: 'fa-list-alt',
                    tooltip: 'Live Report'
                },
                {
                    name: 'examples',
                    classes: 'col-md-6',
                    src: '/docs/examples.html',
                    icon: 'fa-clipboard',
                    tooltip: 'Samples'
                },
                {
                    name: 'rules',
                    classes: 'col-md-6',
                    src: '/docs/rules.html',
                    icon: 'fa-file-text-o',
                    tooltip: 'Perl POD'
                }

            ],

            activePane: '',

            openPane:  function (pane) {
                var panes = this;
                if (typeof(pane) === 'object') {
                    this.activePane = pane.name;
                    this.url = pane.src;
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

            togglePane:  function (pane) {
                if (this.activePane === pane.name) {
                    this.closePane();
                }
                else {
                    this.openPane(pane);
                }
            }
        };
    }]);
