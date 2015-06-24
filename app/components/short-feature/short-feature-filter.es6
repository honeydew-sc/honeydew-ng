function shortFeatureFilter () {
    return feature => {
        return feature
            .replace(/.*\/(.*\/)/, '$1')
            .replace(/\.feature$/, '');
    };
}

angular.module('honeydew')
    .filter('shortFeature', shortFeatureFilter);
