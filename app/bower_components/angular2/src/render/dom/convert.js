System.register(["angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/render/api"], function($__export) {
  "use strict";
  var ListWrapper,
      MapWrapper,
      isPresent,
      isArray,
      DirectiveMetadata;
  function directiveMetadataToMap(meta) {
    return MapWrapper.createFromPairs([['id', meta.id], ['selector', meta.selector], ['compileChildren', meta.compileChildren], ['hostProperties', _cloneIfPresent(meta.hostProperties)], ['hostListeners', _cloneIfPresent(meta.hostListeners)], ['hostActions', _cloneIfPresent(meta.hostActions)], ['hostAttributes', _cloneIfPresent(meta.hostAttributes)], ['properties', _cloneIfPresent(meta.properties)], ['readAttributes', _cloneIfPresent(meta.readAttributes)], ['type', meta.type], ['exportAs', meta.exportAs], ['callOnDestroy', meta.callOnDestroy], ['callOnCheck', meta.callOnCheck], ['callOnInit', meta.callOnInit], ['callOnChange', meta.callOnChange], ['callOnAllChangesDone', meta.callOnAllChangesDone], ['events', meta.events], ['changeDetection', meta.changeDetection], ['version', 1]]);
  }
  function directiveMetadataFromMap(map) {
    return new DirectiveMetadata({
      id: map.get('id'),
      selector: map.get('selector'),
      compileChildren: map.get('compileChildren'),
      hostProperties: _cloneIfPresent(map.get('hostProperties')),
      hostListeners: _cloneIfPresent(map.get('hostListeners')),
      hostActions: _cloneIfPresent(map.get('hostActions')),
      hostAttributes: _cloneIfPresent(map.get('hostAttributes')),
      properties: _cloneIfPresent(map.get('properties')),
      readAttributes: _cloneIfPresent(map.get('readAttributes')),
      type: map.get('type'),
      exportAs: map.get('exportAs'),
      callOnDestroy: map.get('callOnDestroy'),
      callOnCheck: map.get('callOnCheck'),
      callOnChange: map.get('callOnChange'),
      callOnInit: map.get('callOnInit'),
      callOnAllChangesDone: map.get('callOnAllChangesDone'),
      events: _cloneIfPresent(map.get('events')),
      changeDetection: map.get('changeDetection')
    });
  }
  function _cloneIfPresent(o) {
    if (!isPresent(o))
      return null;
    return isArray(o) ? ListWrapper.clone(o) : MapWrapper.clone(o);
  }
  $__export("directiveMetadataToMap", directiveMetadataToMap);
  $__export("directiveMetadataFromMap", directiveMetadataFromMap);
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isArray = $__m.isArray;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=convert.js.map

//# sourceMappingURL=../../../src/render/dom/convert.js.map