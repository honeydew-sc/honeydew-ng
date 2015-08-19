(function () {
    var github = 'https://github.com/honeydew-sc/honeydew-ng/edit/master';

    var url = getEditHref();

    var footer = [
        '<hr>',
        'Edit this <a href="' + url + '">page on Github!</a>'
    ];

    $('footer').html(footer.join(''));

    function getEditHref() {
        var path = window.location.pathname;
        var isHomepage = path === '/docs/';

        if ( isHomepage ) {
            var indexEditHref = github + path + 'index.md';
            return indexEditHref;
        }
        else {
            var editHref = github + window.location.pathname.replace(/\/$/, '.md');
            return editHref;
        }
    }
})();
