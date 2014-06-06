CodeMirror.defineMode("set-mode", function () {
    return {
        token: function ( stream, state ) {
            // console.log('lookingAt: ', stream.string.substr(stream.pos));
            // console.log('peek: ', stream.peek());

            if (stream.match(/.*.feature$/)) {
                return "clickable-link";
            }
            else {
                stream.skipToEnd();
                return null;
            }
        }
    };
});

CodeMirror.defineMIME("text/x-feature", "set-mode");
