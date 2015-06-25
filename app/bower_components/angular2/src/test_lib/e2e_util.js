System.register([], function($__export) {
  "use strict";
  var browser,
      $;
  function clickAll(buttonSelectors) {
    buttonSelectors.forEach(function(selector) {
      $(selector).click();
    });
  }
  function verifyNoBrowserErrors() {
    browser.executeScript('1+1');
    browser.manage().logs().get('browser').then(function(browserLog) {
      var filteredLog = browserLog.filter(function(logEntry) {
        if (logEntry.level.value >= webdriver.logging.Level.INFO.value) {
          console.log('>> ' + logEntry.message);
        }
        return logEntry.level.value > webdriver.logging.Level.WARNING.value;
      });
      expect(filteredLog.length).toEqual(0);
    });
  }
  $__export("clickAll", clickAll);
  $__export("verifyNoBrowserErrors", verifyNoBrowserErrors);
  return {
    setters: [],
    execute: function() {
      browser = global['browser'];
      $__export("browser", browser);
      $ = global['$'];
      $__export("$", $);
    }
  };
});
//# sourceMappingURL=e2e_util.js.map

//# sourceMappingURL=../../src/test_lib/e2e_util.js.map