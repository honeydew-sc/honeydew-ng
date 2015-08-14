angular.module('honeydew')
    .factory('Files', function ($resource, $localStorage, $location, alerts, filetree) {
        var Files = $resource('/rest.php/files/:file', { file: '@file' }, {
            commit: { method: 'PUT' },
            getCached: { method: 'GET', cache: true }
        });

        Files.encode = function ( file ) {
            // ngResource encodes the slashes to %2F. Apache needs
            // 'AllowEncodedSlashes' set to true in htaccess, but we
            // have no permissions for that. Double encoding the url
            // gets past the Apache issue; Slim decodes one level, so
            // we just have to decode once in the Slim app.
            return encodeURIComponent(file);
        };

        Files.prototype.jira = function () {
            var self = this;

            var matches = this.contents.match(/JIRA: (.*)/);
            return matches !== null ? matches[1] : '';
        };

        Files.prototype.sets = function () {
            var self = this;

            var matches = this.contents.match(/Sets?: ?(.*)/);
            this.oldSets = matches !== null ? matches[1] : '';
            return this.oldSets;
        };

        Files.prototype.copy = function ( destination, contents ) {
            var self = this;
            contents = contents || self.contents;

            return Files.save({
                file: Files.encode(destination),
                contents: contents
            }, function ( res ) {
                $location.path(destination);
                filetree.addLeaf(destination);
            }, alerts.catcher).$promise;
        };

        Files.prototype.tmpCopy = function ( destination ) {
            destination = destination || getTempFilename();

            let contents = this.contents.split("\n")
                    .filter( line => !line.match(/^(?:Set:|Email:)/g) )
                    .join("\n");

            return this.copy( destination, contents );
        };

        function getTempFilename() {
            var time = new Date().getTime();
            return 'features/test/tmp/' + time + '.feature';
        }

        Files.prototype.delete = function () {
            var self = this;

            var deletedFile = decodeURIComponent(self.file);
            return self.$delete().then( function removeFromHistory ( response ) {
                $localStorage.history.forEach(function ( item, index, history ) {
                    if (item === '/' + deletedFile) {
                        history.splice( index, 1 );
                    }
                });
            });
        };

        Files.prototype.move = function ( destination, contents) {
            var self = angular.copy(this);
            return self.copy(destination).then(function (response) {
                if (response.success) {
                    self.delete().then(function ( response ) {
                        var leaf = decodeURIComponent(self.file);
                        filetree.deleteLeaf(leaf);
                    }).catch( alerts.catcher );
                }
            }).catch( alerts.catcher);
        };

        Files.prototype.debouncedSave = function ( newContents, oldContents ) {
            var self = this;

            if (newContents !== oldContents && oldContents !== undefined) {
                if (self.contents.split("\n").join('').match(/^\s*$/)) {
                    alerts.addAlert({data: {reason: "Cowardly refusing to save an empty file. Sorry! Try Ctrl-Z to undo, or refresh the page to get your work back :)"}});
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

        Files.prototype.createNew = function ( destination ) {
            destination.jira = typeof(destination.jira) === 'undefined' ? '' : destination.jira;
            var newFile = new Files({
                file: Files.encode(destination.file),
                contents: [
                    'Feature:',
                    '',
                    'JIRA: ' + destination.jira,
                    '# Email: ' + destination.author + '@sharecare.com',
                    '',
                    ' Scenario: ' + destination.jira
                ].join("\n")
            });

            filetree.addLeaf(destination.file);
            return newFile.$save();
        };

        return Files;
    });
