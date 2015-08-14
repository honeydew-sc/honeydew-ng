describe('History', function () {
    let History;

    beforeEach(module('honeydew'));
    beforeEach(inject(( _History_, $localStorage ) => {
        delete $localStorage.history;
        History = _History_;
    }));

    it('should initialize a history queue', () => {
        expect(History.entries).toEqual( [] );
    });

    it('should accept history entries', () => {
        let entry = 'entry';
        let href = entry;
        let label = entry;

        History.add( 'entry' );
        expect(History.entries).toEqual([{ href, label }]);
    });

    it('should automatically add the current location', () => {
        History.addCurrentLocation();
        expect(History.entries.length).toBe(1);
    });

    it('should limit the history length to 10 at most', () => {
        [...Array(15)].forEach( ( item, index ) => History.add( index.toString() ) );
        expect(History.entries.length).toBe(10);
    });
});
