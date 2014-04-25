describe('filetreeService', function () {
    var filetree, scope;

    beforeEach(module('honeydew'));

    beforeEach(inject(function (_filetree_, _$rootScope_) {
        filetree = _filetree_;
        scope = _$rootScope_;
    }));

    it('should get an instance of the filetree service and its child tree', function () {
        expect(filetree.tree).toBeDefined();
    });

});
