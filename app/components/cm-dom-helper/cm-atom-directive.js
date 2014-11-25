var $__app_47_components_47_cm_45_dom_45_helper_47_cm_45_atom_45_directive__ = (function() {
  "use strict";
  var __moduleName = "app/components/cm-dom-helper/cm-atom-directive";
  function require(path) {
    return $traceurRuntime.require("app/components/cm-dom-helper/cm-atom-directive", path);
  }
  'use strict';
  angular.module('honeydew').directive('cmAtom', (function(cmAutocomplete, $window) {
    return {
      restrict: 'C',
      link: function(scope, element, attrs) {
        element.bind('click', (function(event) {
          var destination = '/#/' + cmAutocomplete.phraseLookup[element.text()];
          $window.open(destination);
        }));
      }
    };
  }));
  return {};
})();
