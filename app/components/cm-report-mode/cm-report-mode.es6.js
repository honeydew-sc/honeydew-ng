var reportMode = function () {
    return {
        startState: () => {
            return {};
        },
        token: (stream, state) => {
            return 'report';
        }
    };
};

CodeMirror.defineMode('report', reportMode);
