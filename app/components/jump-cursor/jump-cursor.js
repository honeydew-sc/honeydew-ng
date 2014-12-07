CodeMirror.commands.jumpCursor = function (cm) {
    var cursor = cm.getCursor();
    var line = cm.getLine(cursor.line);
    var placeholderIndex = line.indexOf('(.*)');
    if (placeholderIndex !== -1) {
        var anchor = {
            line: cursor.line,
            ch: placeholderIndex
        };
        var head = {
            line: cursor.line,
            ch: placeholderIndex + 4
        };

        cm.setCursor(anchor);
        cm.setSelection(anchor, head);
        return true;
    }
    else {
        return false;
    }
};
