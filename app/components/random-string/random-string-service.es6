function randomString () {
    return {
        string: () => {
            return (new Date() * Math.random())
                .toString(36)
                .substr(0,8)
                .replace(/[^a-zA-Z]/g, 'h');
        }
    };
}

angular.module('honeydew')
    .service('randomString', randomString);
