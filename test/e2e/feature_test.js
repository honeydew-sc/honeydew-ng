var Editor = function () {
    this.input = element(by.id('feature'));
    this.fileDropdown = element(by.id('id=file'));
    this.deleteButton = element(by.id('delete'));

    this.setContents = function ( text ) {
        this.input.clear();
        this.input.sendKeys(text);
    };

    this.text = function () {
        return this.input.getText();
    };

    this.get = function () {
        var featureUrl = "http://localhost/editor/#/e2e-fake.feature";
        browser.get(featureUrl);
    };

    this.delete = function () {
        this.fileDropdown.click();
        this.deleteButton.click();
        browser.switchTo().alert().accept();
    };
};

describe('editor', function () {
    it('should persist changes from the view', function () {
        var editor = new Editor();

        editor.get();
        editor.setContents('hello');

        setTimeout(function() {
            expect(editor.text()).toContain('hello');

            // check after refresh, for persistence and validating the
            // model->view. 2 in 1, sloppy =/
            editor.get();
            expect(editor.text()).toContain('hello');
        }, 1234);
    });

    it('should delete files', function () {
        var editor = new Editor();

        editor.get();
        editor.delete();

        editor.get();
        expect(editor.text()).toEqual('');
    });
});
