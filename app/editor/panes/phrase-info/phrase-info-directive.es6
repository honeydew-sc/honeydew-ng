angular.module('honeydew')
    .directive('phraseInfo', function () {
        return {
            templateUrl: 'editor/panes/phrase-info/phrase-info.html',
            scope: {},
            replace: true,
            restrict: 'A',
            controller: function ($stateParams, $q, Files, filetree) {
                var self = this;

                var file = $stateParams.path;
                var filePromise = Files.getCached({file: Files.encode(file)}).$promise;

                filePromise.then(res => {
                    var phraseName = res.contents.split("\n").shift().replace(/^Phrase:\s*|\s*$/g, '');

                    return $q.all([
                        filetree.grep('features', phraseName),
                        filetree.grep('phrases', phraseName)
                    ]);
                }).then( ([features, phrases]) => {
                    this.features = features.list;
                    this.phrases = phrases.list.filter( phrase => phrase !== file );
                });
            },
            controllerAs: 'phrase'
        };
    });
