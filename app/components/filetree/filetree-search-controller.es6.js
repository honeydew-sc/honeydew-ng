'use strict';

angular.module('honeydew')
    .controller('filetreeSearchCtrl', function ($sce, filetree) {
        var fuzzySearch, files = [];

        filetree.list('features').then( res => {
            files = res.list.map( file => file.replace(/\/\//g, '/') );

            fuzzySearch = new Fuse(files, {
                shouldSort: true,
                includeScore: true,
                caseSensitive: false
                // id: false
                // threshold: 0.4
            });
        });

        var suggest = (term) => {
            if (!term) {
                return [];
            }

            var ret = fuzzySearch
                    .search(term)
                    .slice(0, 10)
                    .map(i => {
                        var value = files[i.item];
                        var label = $sce.trustAsHtml(
                            `<div class="container-fluid">
                                ${ highlight(value, term) }
                            </div>`
                        );

                        return { value, label };
                    });

            console.log(ret);
            return ret;
        };

        var highlight = (str, term) => {
            var highlight_regex = new RegExp('(' + term + ')','gi');
            return str.replace(highlight_regex, '<span class="highlight">$1</span>');
        };

        this.options = { suggest };
    });
