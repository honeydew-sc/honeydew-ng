describe('History', function () {
    let History;
    let $localStorage;

    beforeEach(module('honeydew'));
    beforeEach( inject(( _$localStorage_ ) => delete _$localStorage_.history ));
    beforeEach(inject(( _History_, _$localStorage_ ) => {
        History = _History_;
        $localStorage = _$localStorage_;
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

    describe('entry management', () => {
        beforeEach( () => {
            [...Array(15)].forEach( ( item, index ) => History.add( index.toString() ) );
        });

        it('should limit the history length to 10 at most', () => {
            expect(History.entries.length).toBe(10);
            History.add( '1' );
            expect(History.entries.length).toBe(10);
        });

        it('should remove items from the history', () => {
            History.remove('14');
            expect(History.history).not.toContain('14');
        });

        it('should update localStorage during removal', () => {
            let entries = History.entries;
            History.add('21');
            expect($localStorage.history).not.toEqual(History.history);
            History.remove('7');
            expect($localStorage.history).toEqual(History.history);
        });
    });
});
