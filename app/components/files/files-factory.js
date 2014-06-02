'use strict';

angular.module('honeydew')
    .factory('Files', function ($resource, alerts, $location, filetree) {
        var res = $resource('/rest.php/files/:file', {
            file: '@file'
        }, {
            'commit': {
                method: 'PUT'
            }
        });

        res.encode = function ( file ) {
            // ngResource encodes the slashes to %2F. Apache needs
            // 'AllowEncodedSlashes' set to true in htaccess, but we
            // have no permissions for that. Double encoding the url
            // gets past the Apache issue; Slim decodes one level, so
            // we just have to decode once in the Slim app.
            return encodeURIComponent(file);
        };

        res.prototype.jira = function () {
            var self = this;

            var matches = this.contents.match(/JIRA: (.*)/);
            return matches !== null ? matches[1] : '';
        };

        res.prototype.sets = function () {
            var self = this;

            var matches = this.contents.match(/Sets?: ?(.*)/);
            this.oldSets = matches !== null ? matches[1] : '';
            return this.oldSets;
        };

        res.prototype.copy = function ( destination, contents ) {
            return res.save({
                file: res.encode(destination),
                contents: contents
            }, function ( res ) {
                $location.path(destination);
                filetree.addLeaf(destination);
            }).$promise;
        };

        res.prototype.debouncedSave = function ( newContents, oldContents ) {
            var self = this;

            if (newContents !== oldContents && oldContents !== undefined) {
                if (self.contents.split("\n").join('') === "") {
                    alerts.addAlert({data: {reason: "Cowardly refusing to save an empty file. Sorry! Try Ctrl-Z or the undo button up there to get your work back :)"}});
                }
                else {
                    // the response to $save includes the file contents;
                    // on response, it (sometimes?) updates file.contents
                    // in the codemirror and messes up the undo history
                    // and cursor position.
                    var preserveCodeMirror = angular.copy(self);
                    preserveCodeMirror.$save().then(function (res) {
                        self.markClean();
                    }).catch( function (res) {
                        alerts.addAlert(res);
                    });
                }
            }
        };

        return res;
    });
