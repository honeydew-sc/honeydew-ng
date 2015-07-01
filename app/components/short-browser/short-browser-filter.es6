function shortBrowserFilter () {
    return browser => {
        return browser
            .replace(/ \(set\) *$/, '')
            .replace(/ Local *$/, '');
    };
}

angular.module('honeydew')
    .filter('shortBrowser', shortBrowserFilter);
