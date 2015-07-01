describe('filesFactory', function () {
    var endpoint,
        httpMock,
        QueueWorker;

    beforeEach(module('honeydew'));
    beforeEach(inject(function ( _QueueWorker_, $httpBackend ) {
        QueueWorker = _QueueWorker_;
        httpMock = $httpBackend;

        endpoint = '/rest.php/jobs/worker?work=true';
    }));

    it('should pass work as a query param', function () {
        httpMock.expectPOST(endpoint)
            .respond(200, '');
        QueueWorker.spawn();
        httpMock.flush();
    });

    it('should pass the channel in the post body, not as a query param ', () => {
        httpMock.expectPOST(endpoint, { channel: 'channel' })
            .respond(200, '');
        QueueWorker.spawn({ channel: 'channel' });
        httpMock.flush();
    });
});
