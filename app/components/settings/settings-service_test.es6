describe('Settings', function () {
    var Settings,
        addr = '1.1.1.1';

    beforeEach(module('honeydew'));
    beforeEach(inject(_Settings_ => {
        Settings = _Settings_;
    }));

    it('should set and get properties', () => {
        Settings.set('wdAddress', addr);
        expect(Settings.get('wdAddress')).toBe(addr);
    });

    it('should return false when getting missing items', () => {
        var missing = Settings.get('nonsense');
        expect(missing).toBe(false);
    });

    it('should delete existing properties', () => {
        Settings.set('wdAddress', addr);
        Settings.delete('wdAddress');
        expect(Settings.get('wdAddress')).toBe(false);
    });

    afterEach( () => {
        Settings.reset();
    });
});
