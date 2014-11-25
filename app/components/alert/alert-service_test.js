describe('alertService', function () {
    var $timeout, alerts;
    var success = {
        success: true,
        notes: "a successful alert"
    };
    var failure = {
        success: false,
        data: {
            reason: "bad. bad bad bad."
        }
    };

    beforeEach(module('honeydew'));

    beforeEach(inject(function (_$timeout_, _alerts_) {
        $timeout = _$timeout_;
        alerts = _alerts_;
    }));

    afterEach(function () {
        alerts.globalAlerts = [];
    });

    it('can get an instance of the alert service', function () {
        expect(alerts).toBeDefined();
    });

    it('can add alerts', function () {
        alerts.addAlert(success);
        alerts.addAlert(success);
        alerts.addAlert(success);
        expect(alerts.globalAlerts.length).toBe(3);
    });

    it('can close alerts', function () {
        alerts.addAlert(success);
        alerts.addAlert(success);
        alerts.addAlert(success);
        alerts.closeAlert(1);
        alerts.closeAlert(0);
        expect(alerts.globalAlerts.length).toBe(1);
    });

    it('can close alerts with timeout', function () {
        var timeout = 1;
        alerts.addAlert(failure, timeout);
        $timeout.flush();

        expect(alerts.globalAlerts.length).toBe(0);

    });
});
