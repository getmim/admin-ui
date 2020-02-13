/*!
  * Admin UI v0.0.1 (https://github.com/getmim/admin-ui)
  * Copyright 2011-2020 MIM Dev
  * Licensed under MIT (https://github.com/getmim/admin-ui/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global['bootstrap-plugins'] = {}, global.jQuery));
}(this, (function (exports, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'autocomplete';
  var VERSION = '0.1.0';
  var DATA_KEY = 'bs.autocomplete';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Default = {
    list: null,
    prefetch: null,
    filter: null,
    filterDelay: 300,
    filterMinChars: 1,
    filterRelation: null,
    maxResult: 10,
    preProcess: null
  };
  var DefaultType = {
    list: '(null|string|element)',
    prefetch: '(null|string)',
    filter: '(null|string)',
    filterDelay: 'number',
    filterMinChars: 'number',
    filterRelation: '(null|object)',
    maxResult: 'number',
    preProcess: '(null|function)'
  };
  var Event$1 = {
    BLUR_DATA_API: "blur" + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
    INPUT_DATA_API: "input" + EVENT_KEY + DATA_API_KEY
  };
  var KeyCode = {
    ARROW_DOWN: 40,
    ARROW_UP: 38,
    ENTER: 13,
    ESCAPE: 27
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Autocomplete =
  /*#__PURE__*/
  function () {
    function Autocomplete(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._items = [];
      this._labels = {};
      this._isShown = false;
      this._dropdown = null;
      this._spinner = null;
      this._result = [];
      this._query = '';
      this._preventClose = false;
      this._timer = null;
      this._relations = null;

      if (element.hasAttribute('list')) {
        this._config.list = '#' + element.getAttribute('list');
        element.removeAttribute('list');
      }

      if (!this._config.list && !this._config.prefetch && !this._config.filter) throw new TypeError('No data source provided');
      if (this._config.filterRelation) this._handleRelations();
      element.setAttribute('autocomplete', 'off');

      this._makeDropdown();

      this._makeSpinner();

      this._fetchPresetData();

      this._addElementListener();
    } // Getters


    var _proto = Autocomplete.prototype;

    // Public
    _proto.show = function show() {
      if (this._isShown) return;
      if (this._result.length) this._showDropdown();
    };

    _proto.hide = function hide() {
      if (!this._isShown) return;

      this._hideDropdown();
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);
      this._config = null;
      this._element = null;
      this._items = null;
      this._labels = null;
      this._isShown = null;
      this._dropdown = null;
      this._spinner = null;
      this._result = null;
      this._query = null;
      this._preventClose = null;
      if (this._timer) clearTimeout(this._timer);
      this._timer = null;
    } // Private
    ;

    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      $(this._element).on(Event$1.KEYDOWN_DATA_API, function (e) {
        var prevent = false;

        switch (e.keyCode) {
          case KeyCode.ARROW_DOWN:
            if (e.altKey && !_this._isShown) {
              _this._query = _this._element.value.trim().toLowerCase();

              if (_this._query) {
                _this._findFromList();

                prevent = true;
              }
            } else {
              _this._focusNext();

              prevent = true;
            }

            break;

          case KeyCode.ARROW_UP:
            _this._focusPrev();

            prevent = true;
            break;

          case KeyCode.ENTER:
            if (_this._isShown) {
              var focus = $(_this._dropdown).children('.active').get(0);
              if (!focus) focus = $(_this._dropdown).children(':first-child').get(0);
              if (focus) _this._element.value = focus.innerText;

              _this.hide();

              prevent = true;
            }

            break;

          case KeyCode.ESCAPE:
            prevent = true;

            _this.hide();

            break;
        }

        if (prevent) e.preventDefault();
      });
      $(this._element).on(Event$1.INPUT_DATA_API, function (e) {
        _this._query = _this._element.value.trim().toLowerCase();

        if (!_this._query) {
          _this._truncateDropdown();

          _this.hide();
        } else {
          _this._findFromList();
        }
      });
      $(this._element).on(Event$1.BLUR_DATA_API, function (e) {
        if (_this._preventClose) return;
        setTimeout(function () {
          return _this.hide();
        }, 150);
      });
    };

    _proto._fetchPresetData = function _fetchPresetData() {
      var _this2 = this;

      // from datalist
      if (this._config.list) {
        var dataList = this._config.list;
        if (typeof dataList === 'string') dataList = document.querySelector(this._config.list);

        if (dataList) {
          Array.from(dataList.children).forEach(function (o) {
            var val = o.innerHTML.toLowerCase();
            if (_this2._items.includes(val)) return;

            _this2._items.push(val);

            _this2._labels[val] = o.innerHTML;
          });
        }
      } // from prefetch


      if (this._config.prefetch) {
        this._showSpinner();

        $.get(this._config.prefetch, function (res) {
          _this2._hideSpinner();

          if (_this2._config.preProcess) res = _this2._config.preProcess(res);
          res.forEach(function (i) {
            var val = i.toLowerCase();
            if (_this2._items.includes(val)) return;

            _this2._items.push(val);

            _this2._labels[val] = i;
          });
        });
      }
    };

    _proto._findFromAjax = function _findFromAjax() {
      var _this3 = this;

      if (!this._config.filter) return;
      if (this._dropdown.children.length >= this._config.maxResult) return;
      if (this._timer) clearTimeout(this._timer);
      var vval = this._query;
      this._timer = setTimeout(function () {
        if (vval != _this3._query) return;

        _this3._showSpinner();

        var url = _this3._config.filter.replace(/%23/g, '#').replace('#QUERY#', _this3._query);

        if (_this3._relations) {
          var sep = url.includes('?') ? '&' : '?';

          for (var k in _this3._relations) {
            var el = _this3._relations[k];
            var val = $(el).val();
            if (!val) continue;
            url += "" + sep + k + "=" + val;
            sep = '&';
          }
        }

        $.get(url, function (res) {
          _this3._hideSpinner();

          if (_this3._config.preProcess) res = _this3._config.preProcess(res);
          var local = [];
          res.forEach(function (i) {
            var val = i.toLowerCase();
            if (_this3._items.includes(val)) return;

            _this3._items.push(val);

            _this3._labels[val] = i;
            local.push(i);

            _this3._result.push(i);
          });
          if (local.length) _this3._renderItem(local);
          if (_this3._result.length) _this3.show();else _this3.hide();
        });
      }, this._config.filterDelay);
    };

    _proto._findFromList = function _findFromList() {
      var _this4 = this;

      this._truncateDropdown();

      this._result = [];
      var local = [];

      this._items.forEach(function (i) {
        if (!i.includes(_this4._query)) return;
        var label = _this4._labels[i];
        if (_this4._result.includes(label)) return;
        local.push(label);

        _this4._result.push(label);
      }); // now render the result


      if (local.length) {
        this._renderItem(local);

        this.show();
      } else {
        this.hide();
      }

      this._findFromAjax();
    };

    _proto._focusNext = function _focusNext() {
      var next = $(this._dropdown).children(':first-child').get(0);
      var focused = $(this._dropdown).children('.active').get(0);

      if (focused) {
        focused.classList.remove('active');
        var tmpNext = $(focused).next().get(0);
        if (tmpNext) next = tmpNext;
      }

      if (next) next.classList.add('active');
    };

    _proto._focusPrev = function _focusPrev() {
      var next = $(this._dropdown).children(':last-child').get(0);
      var focused = $(this._dropdown).children('.active').get(0);

      if (focused) {
        focused.classList.remove('active');
        var tmpNext = $(focused).prev().get(0);
        if (tmpNext) next = tmpNext;
      }

      if (next) next.classList.add('active');
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._handleRelations = function _handleRelations() {
      var _this5 = this;

      this._relations = [];

      for (var name in this._config.filterRelation) {
        var selector = this._config.filterRelation[name];
        this._relations[name] = $(selector).get(0);
        $(this._relations[name]).change(function (e) {
          _this5._element.value = '';
          $(_this5._element).change(); // we need to trigger this manually

          _this5._items = [];
        });
      }
    };

    _proto._hideDropdown = function _hideDropdown() {
      this._isShown = false;

      this._dropdown.classList.remove('show');
    };

    _proto._hideSpinner = function _hideSpinner() {
      this._spinner.style.display = 'none';
    };

    _proto._makeDropdown = function _makeDropdown() {
      this._element.parentNode.style.position = 'relative';
      var tmpl = '<div class="dropdown-menu" style="width:100%"></div>';
      this._dropdown = $(tmpl).appendTo(this._element.parentNode).get(0);
    };

    _proto._makeSpinner = function _makeSpinner() {
      var tmpl = '<div class="spinner-border spinner-border-sm text-secondary" role="status"></div>';
      this._spinner = $(tmpl).appendTo(this._element.parentNode).get(0);
      $(this._spinner).css({
        position: 'absolute',
        right: $(this._element).css('padding-right'),
        top: this._element.offsetTop + (this._element.offsetHeight - this._spinner.offsetHeight) / 2 + 'px'
      });

      this._hideSpinner();
    };

    _proto._renderItem = function _renderItem(items) {
      var _this6 = this;

      items.forEach(function (i) {
        if (_this6._dropdown.children.length >= _this6._config.maxResult) return;
        $('<a class="dropdown-item" href="#"></a>').text(i).appendTo(_this6._dropdown).on(Event$1.CLICK_DATA_API, function (e) {
          _this6._preventClose = true;
          _this6._element.value = e.target.innerText;

          _this6.hide();

          e.preventDefault();
          _this6._preventClose = false;
        });
      });
    };

    _proto._showDropdown = function _showDropdown() {
      this._isShown = true;

      this._dropdown.classList.add('show');
    };

    _proto._showSpinner = function _showSpinner() {
      this._spinner.style.display = 'inline-block';
    };

    _proto._truncateDropdown = function _truncateDropdown() {
      this._dropdown.innerHTML = '';
    } // Static
    ;

    Autocomplete._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _objectSpread({}, Default, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Autocomplete(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') throw new TypeError("No method named \"" + config + "\"");
          data[config](relatedTarget);
        }
      });
    };

    _createClass(Autocomplete, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Autocomplete;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = Autocomplete._jQueryInterface;
  $.fn[NAME].Constructor = Autocomplete;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Autocomplete._jQueryInterface;
  };

  (function ($) {

    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultWhitelist = {
      // Global attributes allowed on any supplied element below.
      '*': ['class', 'dir', 'id', 'lang', 'role', 'tabindex', 'style', ARIA_ATTRIBUTE_PATTERN],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
    };
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function allowedAttribute(attr, allowedAttributeList) {
      var attrName = attr.nodeName.toLowerCase();

      if ($.inArray(attrName, allowedAttributeList) !== -1) {
        if ($.inArray(attrName, uriAttrs) !== -1) {
          return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
        }

        return true;
      }

      var regExp = $(allowedAttributeList).filter(function (index, value) {
        return value instanceof RegExp;
      }); // Check if a regular expression validates the attribute.

      for (var i = 0, l = regExp.length; i < l; i++) {
        if (attrName.match(regExp[i])) {
          return true;
        }
      }

      return false;
    }

    function sanitizeHtml(unsafeElements, whiteList, sanitizeFn) {
      if (sanitizeFn && typeof sanitizeFn === 'function') {
        return sanitizeFn(unsafeElements);
      }

      var whitelistKeys = Object.keys(whiteList);

      for (var i = 0, len = unsafeElements.length; i < len; i++) {
        var elements = unsafeElements[i].querySelectorAll('*');

        for (var j = 0, len2 = elements.length; j < len2; j++) {
          var el = elements[j];
          var elName = el.nodeName.toLowerCase();

          if (whitelistKeys.indexOf(elName) === -1) {
            el.parentNode.removeChild(el);
            continue;
          }

          var attributeList = [].slice.call(el.attributes);
          var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

          for (var k = 0, len3 = attributeList.length; k < len3; k++) {
            var attr = attributeList[k];

            if (!allowedAttribute(attr, whitelistedAttributes)) {
              el.removeAttribute(attr.nodeName);
            }
          }
        }
      }
    } // Polyfill for browsers with no classList support
    // Remove in v2


    if (!('classList' in document.createElement('_'))) {
      (function (view) {
        if (!('Element' in view)) return;

        var classListProp = 'classList',
            protoProp = 'prototype',
            elemCtrProto = view.Element[protoProp],
            objCtr = Object,
            classListGetter = function classListGetter() {
          var $elem = $(this);
          return {
            add: function add(classes) {
              classes = Array.prototype.slice.call(arguments).join(' ');
              return $elem.addClass(classes);
            },
            remove: function remove(classes) {
              classes = Array.prototype.slice.call(arguments).join(' ');
              return $elem.removeClass(classes);
            },
            toggle: function toggle(classes, force) {
              return $elem.toggleClass(classes, force);
            },
            contains: function contains(classes) {
              return $elem.hasClass(classes);
            }
          };
        };

        if (objCtr.defineProperty) {
          var classListPropDesc = {
            get: classListGetter,
            enumerable: true,
            configurable: true
          };

          try {
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          } catch (ex) {
            // IE 8 doesn't support enumerable:true
            // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
            // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
            if (ex.number === undefined || ex.number === -0x7FF5EC54) {
              classListPropDesc.enumerable = false;
              objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
            }
          }
        } else if (objCtr[protoProp].__defineGetter__) {
          elemCtrProto.__defineGetter__(classListProp, classListGetter);
        }
      })(window);
    }

    var testElement = document.createElement('_');
    testElement.classList.add('c1', 'c2');

    if (!testElement.classList.contains('c2')) {
      var _add = DOMTokenList.prototype.add,
          _remove = DOMTokenList.prototype.remove;

      DOMTokenList.prototype.add = function () {
        Array.prototype.forEach.call(arguments, _add.bind(this));
      };

      DOMTokenList.prototype.remove = function () {
        Array.prototype.forEach.call(arguments, _remove.bind(this));
      };
    }

    testElement.classList.toggle('c3', false); // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.

    if (testElement.classList.contains('c3')) {
      var _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function (token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        } else {
          return _toggle.call(this, token);
        }
      };
    }

    testElement = null; // shallow array comparison

    function isEqual(array1, array2) {
      return array1.length === array2.length && array1.every(function (element, index) {
        return element === array2[index];
      });
    }

    if (!String.prototype.startsWith) {
      (function () {

        var defineProperty = function () {
          // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            var object = {};
            var $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {}

          return result;
        }();

        var toString = {}.toString;

        var startsWith = function startsWith(search) {
          if (this == null) {
            throw new TypeError();
          }

          var string = String(this);

          if (search && toString.call(search) == '[object RegExp]') {
            throw new TypeError();
          }

          var stringLength = string.length;
          var searchString = String(search);
          var searchLength = searchString.length;
          var position = arguments.length > 1 ? arguments[1] : undefined; // `ToInteger`

          var pos = position ? Number(position) : 0;

          if (pos != pos) {
            // better `isNaN`
            pos = 0;
          }

          var start = Math.min(Math.max(pos, 0), stringLength); // Avoid the `indexOf` call if no match is possible

          if (searchLength + start > stringLength) {
            return false;
          }

          var index = -1;

          while (++index < searchLength) {
            if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
              return false;
            }
          }

          return true;
        };

        if (defineProperty) {
          defineProperty(String.prototype, 'startsWith', {
            'value': startsWith,
            'configurable': true,
            'writable': true
          });
        } else {
          String.prototype.startsWith = startsWith;
        }
      })();
    }

    if (!Object.keys) {
      Object.keys = function (o, // object
      k, // key
      r // result array
      ) {
        // initialize object and result
        r = []; // iterate over object keys

        for (k in o) {
          // fill result array with non-prototypical keys
          r.hasOwnProperty.call(o, k) && r.push(k);
        } // return result


        return r;
      };
    }

    if (HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty('selectedOptions')) {
      Object.defineProperty(HTMLSelectElement.prototype, 'selectedOptions', {
        get: function get() {
          return this.querySelectorAll(':checked');
        }
      });
    } // much faster than $.val()


    function getSelectValues(select) {
      var result = [];
      var options = select.selectedOptions;
      var opt;

      if (select.multiple) {
        for (var i = 0, len = options.length; i < len; i++) {
          opt = options[i];
          result.push(opt.value || opt.text);
        }
      } else {
        result = select.value;
      }

      return result;
    } // set data-selected on select element if the value has been programmatically selected
    // prior to initialization of bootstrap-select
    // * consider removing or replacing an alternative method *


    var valHooks = {
      useDefault: false,
      _set: $.valHooks.select.set
    };

    $.valHooks.select.set = function (elem, value) {
      if (value && !valHooks.useDefault) $(elem).data('selected', true);
      return valHooks._set.apply(this, arguments);
    };

    var changedArguments = null;

    var EventIsSupported = function () {
      try {
        new Event('change');
        return true;
      } catch (e) {
        return false;
      }
    }();

    $.fn.triggerNative = function (eventName) {
      var el = this[0],
          event;

      if (el.dispatchEvent) {
        // for modern browsers & IE9+
        if (EventIsSupported) {
          // For modern browsers
          event = new Event(eventName, {
            bubbles: true
          });
        } else {
          // For IE since it doesn't support Event constructor
          event = document.createEvent('Event');
          event.initEvent(eventName, true, false);
        }

        el.dispatchEvent(event);
      } else if (el.fireEvent) {
        // for IE8
        event = document.createEventObject();
        event.eventType = eventName;
        el.fireEvent('on' + eventName, event);
      } else {
        // fall back to jQuery.trigger
        this.trigger(eventName);
      }
    }; // </editor-fold>


    function stringSearch(li, searchString, method, normalize) {
      var stringTypes = ['display', 'subtext', 'tokens'],
          searchSuccess = false;

      for (var i = 0; i < stringTypes.length; i++) {
        var stringType = stringTypes[i],
            string = li[stringType];

        if (string) {
          string = string.toString(); // Strip HTML tags. This isn't perfect, but it's much faster than any other method

          if (stringType === 'display') {
            string = string.replace(/<[^>]+>/g, '');
          }

          if (normalize) string = normalizeToBase(string);
          string = string.toUpperCase();

          if (method === 'contains') {
            searchSuccess = string.indexOf(searchString) >= 0;
          } else {
            searchSuccess = string.startsWith(searchString);
          }

          if (searchSuccess) break;
        }
      }

      return searchSuccess;
    }

    function toInteger(value) {
      return parseInt(value, 10) || 0;
    } // Borrowed from Lodash (_.deburr)

    /** Used to map Latin Unicode letters to basic Latin letters. */


    var deburredLetters = {
      // Latin-1 Supplement block.
      '\xc0': 'A',
      '\xc1': 'A',
      '\xc2': 'A',
      '\xc3': 'A',
      '\xc4': 'A',
      '\xc5': 'A',
      '\xe0': 'a',
      '\xe1': 'a',
      '\xe2': 'a',
      '\xe3': 'a',
      '\xe4': 'a',
      '\xe5': 'a',
      '\xc7': 'C',
      '\xe7': 'c',
      '\xd0': 'D',
      '\xf0': 'd',
      '\xc8': 'E',
      '\xc9': 'E',
      '\xca': 'E',
      '\xcb': 'E',
      '\xe8': 'e',
      '\xe9': 'e',
      '\xea': 'e',
      '\xeb': 'e',
      '\xcc': 'I',
      '\xcd': 'I',
      '\xce': 'I',
      '\xcf': 'I',
      '\xec': 'i',
      '\xed': 'i',
      '\xee': 'i',
      '\xef': 'i',
      '\xd1': 'N',
      '\xf1': 'n',
      '\xd2': 'O',
      '\xd3': 'O',
      '\xd4': 'O',
      '\xd5': 'O',
      '\xd6': 'O',
      '\xd8': 'O',
      '\xf2': 'o',
      '\xf3': 'o',
      '\xf4': 'o',
      '\xf5': 'o',
      '\xf6': 'o',
      '\xf8': 'o',
      '\xd9': 'U',
      '\xda': 'U',
      '\xdb': 'U',
      '\xdc': 'U',
      '\xf9': 'u',
      '\xfa': 'u',
      '\xfb': 'u',
      '\xfc': 'u',
      '\xdd': 'Y',
      '\xfd': 'y',
      '\xff': 'y',
      '\xc6': 'Ae',
      '\xe6': 'ae',
      '\xde': 'Th',
      '\xfe': 'th',
      '\xdf': 'ss',
      // Latin Extended-A block.
      "\u0100": 'A',
      "\u0102": 'A',
      "\u0104": 'A',
      "\u0101": 'a',
      "\u0103": 'a',
      "\u0105": 'a',
      "\u0106": 'C',
      "\u0108": 'C',
      "\u010A": 'C',
      "\u010C": 'C',
      "\u0107": 'c',
      "\u0109": 'c',
      "\u010B": 'c',
      "\u010D": 'c',
      "\u010E": 'D',
      "\u0110": 'D',
      "\u010F": 'd',
      "\u0111": 'd',
      "\u0112": 'E',
      "\u0114": 'E',
      "\u0116": 'E',
      "\u0118": 'E',
      "\u011A": 'E',
      "\u0113": 'e',
      "\u0115": 'e',
      "\u0117": 'e',
      "\u0119": 'e',
      "\u011B": 'e',
      "\u011C": 'G',
      "\u011E": 'G',
      "\u0120": 'G',
      "\u0122": 'G',
      "\u011D": 'g',
      "\u011F": 'g',
      "\u0121": 'g',
      "\u0123": 'g',
      "\u0124": 'H',
      "\u0126": 'H',
      "\u0125": 'h',
      "\u0127": 'h',
      "\u0128": 'I',
      "\u012A": 'I',
      "\u012C": 'I',
      "\u012E": 'I',
      "\u0130": 'I',
      "\u0129": 'i',
      "\u012B": 'i',
      "\u012D": 'i',
      "\u012F": 'i',
      "\u0131": 'i',
      "\u0134": 'J',
      "\u0135": 'j',
      "\u0136": 'K',
      "\u0137": 'k',
      "\u0138": 'k',
      "\u0139": 'L',
      "\u013B": 'L',
      "\u013D": 'L',
      "\u013F": 'L',
      "\u0141": 'L',
      "\u013A": 'l',
      "\u013C": 'l',
      "\u013E": 'l',
      "\u0140": 'l',
      "\u0142": 'l',
      "\u0143": 'N',
      "\u0145": 'N',
      "\u0147": 'N',
      "\u014A": 'N',
      "\u0144": 'n',
      "\u0146": 'n',
      "\u0148": 'n',
      "\u014B": 'n',
      "\u014C": 'O',
      "\u014E": 'O',
      "\u0150": 'O',
      "\u014D": 'o',
      "\u014F": 'o',
      "\u0151": 'o',
      "\u0154": 'R',
      "\u0156": 'R',
      "\u0158": 'R',
      "\u0155": 'r',
      "\u0157": 'r',
      "\u0159": 'r',
      "\u015A": 'S',
      "\u015C": 'S',
      "\u015E": 'S',
      "\u0160": 'S',
      "\u015B": 's',
      "\u015D": 's',
      "\u015F": 's',
      "\u0161": 's',
      "\u0162": 'T',
      "\u0164": 'T',
      "\u0166": 'T',
      "\u0163": 't',
      "\u0165": 't',
      "\u0167": 't',
      "\u0168": 'U',
      "\u016A": 'U',
      "\u016C": 'U',
      "\u016E": 'U',
      "\u0170": 'U',
      "\u0172": 'U',
      "\u0169": 'u',
      "\u016B": 'u',
      "\u016D": 'u',
      "\u016F": 'u',
      "\u0171": 'u',
      "\u0173": 'u',
      "\u0174": 'W',
      "\u0175": 'w',
      "\u0176": 'Y',
      "\u0177": 'y',
      "\u0178": 'Y',
      "\u0179": 'Z',
      "\u017B": 'Z',
      "\u017D": 'Z',
      "\u017A": 'z',
      "\u017C": 'z',
      "\u017E": 'z',
      "\u0132": 'IJ',
      "\u0133": 'ij',
      "\u0152": 'Oe',
      "\u0153": 'oe',
      "\u0149": "'n",
      "\u017F": 's'
    };
    /** Used to match Latin Unicode letters (excluding mathematical operators). */

    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    /** Used to compose unicode character classes. */

    var rsComboMarksRange = "\\u0300-\\u036f",
        reComboHalfMarksRange = "\\ufe20-\\ufe2f",
        rsComboSymbolsRange = "\\u20d0-\\u20ff",
        rsComboMarksExtendedRange = "\\u1ab0-\\u1aff",
        rsComboMarksSupplementRange = "\\u1dc0-\\u1dff",
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
    /** Used to compose unicode capture groups. */

    var rsCombo = '[' + rsComboRange + ']';
    /**
     * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
     * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
     */

    var reComboMark = RegExp(rsCombo, 'g');

    function deburrLetter(key) {
      return deburredLetters[key];
    }

    function normalizeToBase(string) {
      string = string.toString();
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    } // List of HTML entities for escaping.


    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    }; // Functions for escaping and unescaping strings to/from HTML interpolation.

    var createEscaper = function createEscaper(map) {
      var escaper = function escaper(match) {
        return map[match];
      }; // Regexes for identifying a key that needs to be escaped.


      var source = '(?:' + Object.keys(map).join('|') + ')';
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, 'g');
      return function (string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    };

    var htmlEscape = createEscaper(escapeMap);
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var keyCodeMap = {
      32: ' ',
      48: '0',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      59: ';',
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z',
      96: '0',
      97: '1',
      98: '2',
      99: '3',
      100: '4',
      101: '5',
      102: '6',
      103: '7',
      104: '8',
      105: '9'
    };
    var keyCodes = {
      ESCAPE: 27,
      // KeyboardEvent.which value for Escape (Esc) key
      ENTER: 13,
      // KeyboardEvent.which value for Enter key
      SPACE: 32,
      // KeyboardEvent.which value for space key
      TAB: 9,
      // KeyboardEvent.which value for tab key
      ARROW_UP: 38,
      // KeyboardEvent.which value for up arrow key
      ARROW_DOWN: 40 // KeyboardEvent.which value for down arrow key

    };
    var version = {
      success: false,
      major: '3'
    };

    try {
      version.full = ($.fn.dropdown.Constructor.VERSION || '').split(' ')[0].split('.');
      version.major = version.full[0];
      version.success = true;
    } catch (err) {// do nothing
    }

    var selectId = 0;
    var EVENT_KEY = '.bs.select';
    var classNames = {
      DISABLED: 'disabled',
      DIVIDER: 'divider',
      SHOW: 'open',
      DROPUP: 'dropup',
      MENU: 'dropdown-menu',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      // to-do: replace with more advanced template/customization options
      BUTTONCLASS: 'btn-default',
      POPOVERHEADER: 'popover-title',
      ICONBASE: 'glyphicon',
      TICKICON: 'glyphicon-ok'
    };
    var Selector = {
      MENU: '.' + classNames.MENU
    };
    var elementTemplates = {
      span: document.createElement('span'),
      i: document.createElement('i'),
      subtext: document.createElement('small'),
      a: document.createElement('a'),
      li: document.createElement('li'),
      whitespace: document.createTextNode("\xA0"),
      fragment: document.createDocumentFragment()
    };
    elementTemplates.a.setAttribute('role', 'option');
    elementTemplates.subtext.className = 'text-muted';
    elementTemplates.text = elementTemplates.span.cloneNode(false);
    elementTemplates.text.className = 'text';
    elementTemplates.checkMark = elementTemplates.span.cloneNode(false);
    var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + '|' + keyCodes.ARROW_DOWN);
    var REGEXP_TAB_OR_ESCAPE = new RegExp('^' + keyCodes.TAB + '$|' + keyCodes.ESCAPE);
    var generateOption = {
      li: function li(content, classes, optgroup) {
        var li = elementTemplates.li.cloneNode(false);

        if (content) {
          if (content.nodeType === 1 || content.nodeType === 11) {
            li.appendChild(content);
          } else {
            li.innerHTML = content;
          }
        }

        if (typeof classes !== 'undefined' && classes !== '') li.className = classes;
        if (typeof optgroup !== 'undefined' && optgroup !== null) li.classList.add('optgroup-' + optgroup);
        return li;
      },
      a: function a(text, classes, inline) {
        var a = elementTemplates.a.cloneNode(true);

        if (text) {
          if (text.nodeType === 11) {
            a.appendChild(text);
          } else {
            a.insertAdjacentHTML('beforeend', text);
          }
        }

        if (typeof classes !== 'undefined' && classes !== '') a.className = classes;
        if (version.major === '4') a.classList.add('dropdown-item');
        if (inline) a.setAttribute('style', inline);
        return a;
      },
      text: function text(options, useFragment) {
        var textElement = elementTemplates.text.cloneNode(false),
            subtextElement,
            iconElement;

        if (options.content) {
          textElement.innerHTML = options.content;
        } else {
          textElement.textContent = options.text;

          if (options.icon) {
            var whitespace = elementTemplates.whitespace.cloneNode(false); // need to use <i> for icons in the button to prevent a breaking change
            // note: switch to span in next major release

            iconElement = (useFragment === true ? elementTemplates.i : elementTemplates.span).cloneNode(false);
            iconElement.className = options.iconBase + ' ' + options.icon;
            elementTemplates.fragment.appendChild(iconElement);
            elementTemplates.fragment.appendChild(whitespace);
          }

          if (options.subtext) {
            subtextElement = elementTemplates.subtext.cloneNode(false);
            subtextElement.textContent = options.subtext;
            textElement.appendChild(subtextElement);
          }
        }

        if (useFragment === true) {
          while (textElement.childNodes.length > 0) {
            elementTemplates.fragment.appendChild(textElement.childNodes[0]);
          }
        } else {
          elementTemplates.fragment.appendChild(textElement);
        }

        return elementTemplates.fragment;
      },
      label: function label(options) {
        var textElement = elementTemplates.text.cloneNode(false),
            subtextElement,
            iconElement;
        textElement.innerHTML = options.label;

        if (options.icon) {
          var whitespace = elementTemplates.whitespace.cloneNode(false);
          iconElement = elementTemplates.span.cloneNode(false);
          iconElement.className = options.iconBase + ' ' + options.icon;
          elementTemplates.fragment.appendChild(iconElement);
          elementTemplates.fragment.appendChild(whitespace);
        }

        if (options.subtext) {
          subtextElement = elementTemplates.subtext.cloneNode(false);
          subtextElement.textContent = options.subtext;
          textElement.appendChild(subtextElement);
        }

        elementTemplates.fragment.appendChild(textElement);
        return elementTemplates.fragment;
      }
    };

    var Selectpicker = function Selectpicker(element, options) {
      var that = this; // bootstrap-select has been initialized - revert valHooks.select.set back to its original function

      if (!valHooks.useDefault) {
        $.valHooks.select.set = valHooks._set;
        valHooks.useDefault = true;
      }

      this.$element = $(element);
      this.$newElement = null;
      this.$button = null;
      this.$menu = null;
      this.options = options;
      this.selectpicker = {
        main: {},
        current: {},
        // current changes if a search is in progress
        search: {},
        view: {},
        keydown: {
          keyHistory: '',
          resetKeyHistory: {
            start: function start() {
              return setTimeout(function () {
                that.selectpicker.keydown.keyHistory = '';
              }, 800);
            }
          }
        }
      }; // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
      // data-attribute)

      if (this.options.title === null) {
        this.options.title = this.$element.attr('title');
      } // Format window padding


      var winPad = this.options.windowPadding;

      if (typeof winPad === 'number') {
        this.options.windowPadding = [winPad, winPad, winPad, winPad];
      } // Expose public methods


      this.val = Selectpicker.prototype.val;
      this.render = Selectpicker.prototype.render;
      this.refresh = Selectpicker.prototype.refresh;
      this.setStyle = Selectpicker.prototype.setStyle;
      this.selectAll = Selectpicker.prototype.selectAll;
      this.deselectAll = Selectpicker.prototype.deselectAll;
      this.destroy = Selectpicker.prototype.destroy;
      this.remove = Selectpicker.prototype.remove;
      this.show = Selectpicker.prototype.show;
      this.hide = Selectpicker.prototype.hide;
      this.init();
    };

    Selectpicker.VERSION = '1.13.9'; // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.

    Selectpicker.DEFAULTS = {
      noneSelectedText: 'Nothing selected',
      noneResultsText: 'No results matched {0}',
      countSelectedText: function countSelectedText(numSelected, numTotal) {
        return numSelected == 1 ? '{0} item selected' : '{0} items selected';
      },
      maxOptionsText: function maxOptionsText(numAll, numGroup) {
        return [numAll == 1 ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)', numGroup == 1 ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'];
      },
      selectAllText: 'Select All',
      deselectAllText: 'Deselect All',
      doneButton: false,
      doneButtonText: 'Close',
      multipleSeparator: ', ',
      styleBase: 'btn',
      style: classNames.BUTTONCLASS,
      size: 'auto',
      title: null,
      selectedTextFormat: 'values',
      width: false,
      container: false,
      hideDisabled: false,
      showSubtext: false,
      showIcon: true,
      showContent: true,
      dropupAuto: true,
      header: false,
      liveSearch: false,
      liveSearchPlaceholder: null,
      liveSearchNormalize: false,
      liveSearchStyle: 'contains',
      actionsBox: false,
      iconBase: classNames.ICONBASE,
      tickIcon: classNames.TICKICON,
      showTick: false,
      template: {
        caret: '<span class="caret"></span>'
      },
      maxOptions: false,
      mobile: false,
      selectOnTab: false,
      dropdownAlignRight: false,
      windowPadding: 0,
      virtualScroll: 600,
      display: false,
      sanitize: true,
      sanitizeFn: null,
      whiteList: DefaultWhitelist
    };
    Selectpicker.prototype = {
      constructor: Selectpicker,
      init: function init() {
        var that = this,
            id = this.$element.attr('id');
        this.selectId = selectId++;
        this.$element[0].classList.add('bs-select-hidden');
        this.multiple = this.$element.prop('multiple');
        this.autofocus = this.$element.prop('autofocus');
        this.options.showTick = this.$element[0].classList.contains('show-tick');
        this.$newElement = this.createDropdown();
        this.$element.after(this.$newElement).prependTo(this.$newElement);
        this.$button = this.$newElement.children('button');
        this.$menu = this.$newElement.children(Selector.MENU);
        this.$menuInner = this.$menu.children('.inner');
        this.$searchbox = this.$menu.find('input');
        this.$element[0].classList.remove('bs-select-hidden');
        if (this.options.dropdownAlignRight === true) this.$menu[0].classList.add(classNames.MENURIGHT);

        if (typeof id !== 'undefined') {
          this.$button.attr('data-id', id);
        }

        this.checkDisabled();
        this.clickListener();
        if (this.options.liveSearch) this.liveSearchListener();
        this.setStyle();
        this.render();
        this.setWidth();

        if (this.options.container) {
          this.selectPosition();
        } else {
          this.$element.on('hide' + EVENT_KEY, function () {
            if (that.isVirtual()) {
              // empty menu on close
              var menuInner = that.$menuInner[0],
                  emptyMenu = menuInner.firstChild.cloneNode(false); // replace the existing UL with an empty one - this is faster than $.empty() or innerHTML = ''

              menuInner.replaceChild(emptyMenu, menuInner.firstChild);
              menuInner.scrollTop = 0;
            }
          });
        }

        this.$menu.data('this', this);
        this.$newElement.data('this', this);
        if (this.options.mobile) this.mobile();
        this.$newElement.on({
          'hide.bs.dropdown': function hideBsDropdown(e) {
            that.$menuInner.attr('aria-expanded', false);
            that.$element.trigger('hide' + EVENT_KEY, e);
          },
          'hidden.bs.dropdown': function hiddenBsDropdown(e) {
            that.$element.trigger('hidden' + EVENT_KEY, e);
          },
          'show.bs.dropdown': function showBsDropdown(e) {
            that.$menuInner.attr('aria-expanded', true);
            that.$element.trigger('show' + EVENT_KEY, e);
          },
          'shown.bs.dropdown': function shownBsDropdown(e) {
            that.$element.trigger('shown' + EVENT_KEY, e);
          }
        });

        if (that.$element[0].hasAttribute('required')) {
          this.$element.on('invalid' + EVENT_KEY, function () {
            that.$button[0].classList.add('bs-invalid');
            that.$element.on('shown' + EVENT_KEY + '.invalid', function () {
              that.$element.val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
              .off('shown' + EVENT_KEY + '.invalid');
            }).on('rendered' + EVENT_KEY, function () {
              // if select is no longer invalid, remove the bs-invalid class
              if (this.validity.valid) that.$button[0].classList.remove('bs-invalid');
              that.$element.off('rendered' + EVENT_KEY);
            });
            that.$button.on('blur' + EVENT_KEY, function () {
              that.$element.trigger('focus').trigger('blur');
              that.$button.off('blur' + EVENT_KEY);
            });
          });
        }

        setTimeout(function () {
          that.createLi();
          that.$element.trigger('loaded' + EVENT_KEY);
        });
      },
      createDropdown: function createDropdown() {
        // Options
        // If we are multiple or showTick option is set, then add the show-tick class
        var showTick = this.multiple || this.options.showTick ? ' show-tick' : '',
            inputGroup = '',
            autofocus = this.autofocus ? ' autofocus' : '';

        if (version.major < 4 && this.$element.parent().hasClass('input-group')) {
          inputGroup = ' input-group-btn';
        } // Elements


        var drop,
            header = '',
            searchbox = '',
            actionsbox = '',
            donebutton = '';

        if (this.options.header) {
          header = '<div class="' + classNames.POPOVERHEADER + '">' + '<button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>';
        }

        if (this.options.liveSearch) {
          searchbox = '<div class="bs-searchbox">' + '<input type="text" class="form-control" autocomplete="off"' + (this.options.liveSearchPlaceholder === null ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search">' + '</div>';
        }

        if (this.multiple && this.options.actionsBox) {
          actionsbox = '<div class="bs-actionsbox">' + '<div class="btn-group btn-group-sm btn-block">' + '<button type="button" class="actions-btn bs-select-all btn ' + classNames.BUTTONCLASS + '">' + this.options.selectAllText + '</button>' + '<button type="button" class="actions-btn bs-deselect-all btn ' + classNames.BUTTONCLASS + '">' + this.options.deselectAllText + '</button>' + '</div>' + '</div>';
        }

        if (this.multiple && this.options.doneButton) {
          donebutton = '<div class="bs-donebutton">' + '<div class="btn-group btn-block">' + '<button type="button" class="btn btn-sm ' + classNames.BUTTONCLASS + '">' + this.options.doneButtonText + '</button>' + '</div>' + '</div>';
        }

        drop = '<div class="dropdown bootstrap-select' + showTick + inputGroup + '">' + '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" ' + (this.options.display === 'static' ? 'data-display="static"' : '') + 'data-toggle="dropdown"' + autofocus + ' role="button">' + '<div class="filter-option">' + '<div class="filter-option-inner">' + '<div class="filter-option-inner-inner"></div>' + '</div> ' + '</div>' + (version.major === '4' ? '' : '<span class="bs-caret">' + this.options.template.caret + '</span>') + '</button>' + '<div class="' + classNames.MENU + ' ' + (version.major === '4' ? '' : classNames.SHOW) + '" role="combobox">' + header + searchbox + actionsbox + '<div class="inner ' + classNames.SHOW + '" role="listbox" aria-expanded="false" tabindex="-1">' + '<ul class="' + classNames.MENU + ' inner ' + (version.major === '4' ? classNames.SHOW : '') + '">' + '</ul>' + '</div>' + donebutton + '</div>' + '</div>';
        return $(drop);
      },
      setPositionData: function setPositionData() {
        this.selectpicker.view.canHighlight = [];

        for (var i = 0; i < this.selectpicker.current.data.length; i++) {
          var li = this.selectpicker.current.data[i],
              canHighlight = true;

          if (li.type === 'divider') {
            canHighlight = false;
            li.height = this.sizeInfo.dividerHeight;
          } else if (li.type === 'optgroup-label') {
            canHighlight = false;
            li.height = this.sizeInfo.dropdownHeaderHeight;
          } else {
            li.height = this.sizeInfo.liHeight;
          }

          if (li.disabled) canHighlight = false;
          this.selectpicker.view.canHighlight.push(canHighlight);
          li.position = (i === 0 ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
        }
      },
      isVirtual: function isVirtual() {
        return this.options.virtualScroll !== false && this.selectpicker.main.elements.length >= this.options.virtualScroll || this.options.virtualScroll === true;
      },
      createView: function createView(isSearching, scrollTop) {
        scrollTop = scrollTop || 0;
        var that = this;
        this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;
        var active = [];
        var selected;
        var prevActive;
        this.setPositionData();
        scroll(scrollTop, true);
        this.$menuInner.off('scroll.createView').on('scroll.createView', function (e, updateValue) {
          if (!that.noScroll) scroll(this.scrollTop, updateValue);
          that.noScroll = false;
        });

        function scroll(scrollTop, init) {
          var size = that.selectpicker.current.elements.length,
              chunks = [],
              chunkSize,
              chunkCount,
              firstChunk,
              lastChunk,
              currentChunk,
              prevPositions,
              positionIsDifferent,
              previousElements,
              menuIsDifferent = true,
              isVirtual = that.isVirtual();
          that.selectpicker.view.scrollTop = scrollTop;

          if (isVirtual === true) {
            // if an option that is encountered that is wider than the current menu width, update the menu width accordingly
            if (that.sizeInfo.hasScrollBar && that.$menu[0].offsetWidth > that.sizeInfo.totalMenuWidth) {
              that.sizeInfo.menuWidth = that.$menu[0].offsetWidth;
              that.sizeInfo.totalMenuWidth = that.sizeInfo.menuWidth + that.sizeInfo.scrollBarWidth;
              that.$menu.css('min-width', that.sizeInfo.menuWidth);
            }
          }

          chunkSize = Math.ceil(that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight * 1.5); // number of options in a chunk

          chunkCount = Math.round(size / chunkSize) || 1; // number of chunks

          for (var i = 0; i < chunkCount; i++) {
            var endOfChunk = (i + 1) * chunkSize;

            if (i === chunkCount - 1) {
              endOfChunk = size;
            }

            chunks[i] = [i * chunkSize + (!i ? 0 : 1), endOfChunk];
            if (!size) break;

            if (currentChunk === undefined && scrollTop <= that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight) {
              currentChunk = i;
            }
          }

          if (currentChunk === undefined) currentChunk = 0;
          prevPositions = [that.selectpicker.view.position0, that.selectpicker.view.position1]; // always display previous, current, and next chunks

          firstChunk = Math.max(0, currentChunk - 1);
          lastChunk = Math.min(chunkCount - 1, currentChunk + 1);
          that.selectpicker.view.position0 = isVirtual === false ? 0 : Math.max(0, chunks[firstChunk][0]) || 0;
          that.selectpicker.view.position1 = isVirtual === false ? size : Math.min(size, chunks[lastChunk][1]) || 0;
          positionIsDifferent = prevPositions[0] !== that.selectpicker.view.position0 || prevPositions[1] !== that.selectpicker.view.position1;

          if (that.activeIndex !== undefined) {
            prevActive = that.selectpicker.main.elements[that.prevActiveIndex];
            active = that.selectpicker.main.elements[that.activeIndex];
            selected = that.selectpicker.main.elements[that.selectedIndex];

            if (init) {
              if (that.activeIndex !== that.selectedIndex && active && active.length) {
                active.classList.remove('active');
                if (active.firstChild) active.firstChild.classList.remove('active');
              }

              that.activeIndex = undefined;
            }

            if (that.activeIndex && that.activeIndex !== that.selectedIndex && selected && selected.length) {
              selected.classList.remove('active');
              if (selected.firstChild) selected.firstChild.classList.remove('active');
            }
          }

          if (that.prevActiveIndex !== undefined && that.prevActiveIndex !== that.activeIndex && that.prevActiveIndex !== that.selectedIndex && prevActive && prevActive.length) {
            prevActive.classList.remove('active');
            if (prevActive.firstChild) prevActive.firstChild.classList.remove('active');
          }

          if (init || positionIsDifferent) {
            previousElements = that.selectpicker.view.visibleElements ? that.selectpicker.view.visibleElements.slice() : [];

            if (isVirtual === false) {
              that.selectpicker.view.visibleElements = that.selectpicker.current.elements;
            } else {
              that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(that.selectpicker.view.position0, that.selectpicker.view.position1);
            }

            that.setOptionStatus(); // if searching, check to make sure the list has actually been updated before updating DOM
            // this prevents unnecessary repaints

            if (isSearching || isVirtual === false && init) menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements); // if virtual scroll is disabled and not searching,
            // menu should never need to be updated more than once

            if ((init || isVirtual === true) && menuIsDifferent) {
              var menuInner = that.$menuInner[0],
                  menuFragment = document.createDocumentFragment(),
                  emptyMenu = menuInner.firstChild.cloneNode(false),
                  marginTop,
                  marginBottom,
                  elements = that.selectpicker.view.visibleElements,
                  toSanitize = []; // replace the existing UL with an empty one - this is faster than $.empty()

              menuInner.replaceChild(emptyMenu, menuInner.firstChild);

              for (var i = 0, visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
                var element = elements[i],
                    elText,
                    elementData;

                if (that.options.sanitize) {
                  elText = element.lastChild;

                  if (elText) {
                    elementData = that.selectpicker.current.data[i + that.selectpicker.view.position0];

                    if (elementData && elementData.content && !elementData.sanitized) {
                      toSanitize.push(elText);
                      elementData.sanitized = true;
                    }
                  }
                }

                menuFragment.appendChild(element);
              }

              if (that.options.sanitize && toSanitize.length) {
                sanitizeHtml(toSanitize, that.options.whiteList, that.options.sanitizeFn);
              }

              if (isVirtual === true) {
                marginTop = that.selectpicker.view.position0 === 0 ? 0 : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position;
                marginBottom = that.selectpicker.view.position1 > size - 1 ? 0 : that.selectpicker.current.data[size - 1].position - that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position;
                menuInner.firstChild.style.marginTop = marginTop + 'px';
                menuInner.firstChild.style.marginBottom = marginBottom + 'px';
              }

              menuInner.firstChild.appendChild(menuFragment);
            }
          }

          that.prevActiveIndex = that.activeIndex;

          if (!that.options.liveSearch) {
            that.$menuInner.trigger('focus');
          } else if (isSearching && init) {
            var index = 0,
                newActive;

            if (!that.selectpicker.view.canHighlight[index]) {
              index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
            }

            newActive = that.selectpicker.view.visibleElements[index];

            if (that.selectpicker.view.currentActive) {
              that.selectpicker.view.currentActive.classList.remove('active');
              if (that.selectpicker.view.currentActive.firstChild) that.selectpicker.view.currentActive.firstChild.classList.remove('active');
            }

            if (newActive) {
              newActive.classList.add('active');
              if (newActive.firstChild) newActive.firstChild.classList.add('active');
            }

            that.activeIndex = (that.selectpicker.current.data[index] || {}).index;
          }
        }

        $(window).off('resize' + EVENT_KEY + '.' + this.selectId + '.createView').on('resize' + EVENT_KEY + '.' + this.selectId + '.createView', function () {
          var isActive = that.$newElement.hasClass(classNames.SHOW);
          if (isActive) scroll(that.$menuInner[0].scrollTop);
        });
      },
      setPlaceholder: function setPlaceholder() {
        var updateIndex = false;

        if (this.options.title && !this.multiple) {
          if (!this.selectpicker.view.titleOption) this.selectpicker.view.titleOption = document.createElement('option'); // this option doesn't create a new <li> element, but does add a new option at the start,
          // so startIndex should increase to prevent having to check every option for the bs-title-option class

          updateIndex = true;
          var element = this.$element[0],
              isSelected = false,
              titleNotAppended = !this.selectpicker.view.titleOption.parentNode;

          if (titleNotAppended) {
            // Use native JS to prepend option (faster)
            this.selectpicker.view.titleOption.className = 'bs-title-option';
            this.selectpicker.view.titleOption.value = ''; // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
            // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
            // if so, the select will have the data-selected attribute

            var $opt = $(element.options[element.selectedIndex]);
            isSelected = $opt.attr('selected') === undefined && this.$element.data('selected') === undefined;
          }

          if (titleNotAppended || this.selectpicker.view.titleOption.index !== 0) {
            element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
          } // Set selected *after* appending to select,
          // otherwise the option doesn't get selected in IE
          // set using selectedIndex, as setting the selected attr to true here doesn't work in IE11


          if (isSelected) element.selectedIndex = 0;
        }

        return updateIndex;
      },
      createLi: function createLi() {
        var that = this,
            iconBase = this.options.iconBase,
            optionSelector = ':not([hidden]):not([data-hidden="true"])',
            mainElements = [],
            mainData = [],
            widestOptionLength = 0,
            optID = 0,
            startIndex = this.setPlaceholder() ? 1 : 0; // append the titleOption if necessary and skip the first option in the loop

        if (this.options.hideDisabled) optionSelector += ':not(:disabled)';

        if ((that.options.showTick || that.multiple) && !elementTemplates.checkMark.parentNode) {
          elementTemplates.checkMark.className = iconBase + ' ' + that.options.tickIcon + ' check-mark';
          elementTemplates.a.appendChild(elementTemplates.checkMark);
        }

        var selectOptions = this.$element[0].querySelectorAll('select > *' + optionSelector);

        function addDivider(config) {
          var previousData = mainData[mainData.length - 1]; // ensure optgroup doesn't create back-to-back dividers

          if (previousData && previousData.type === 'divider' && (previousData.optID || config.optID)) {
            return;
          }

          config = config || {};
          config.type = 'divider';
          mainElements.push(generateOption.li(false, classNames.DIVIDER, config.optID ? config.optID + 'div' : undefined));
          mainData.push(config);
        }

        function addOption(option, config) {
          config = config || {};
          config.divider = option.getAttribute('data-divider') === 'true';

          if (config.divider) {
            addDivider({
              optID: config.optID
            });
          } else {
            var liIndex = mainData.length,
                cssText = option.style.cssText,
                inlineStyle = cssText ? htmlEscape(cssText) : '',
                optionClass = (option.className || '') + (config.optgroupClass || '');
            if (config.optID) optionClass = 'opt ' + optionClass;
            config.text = option.textContent;
            config.content = option.getAttribute('data-content');
            config.tokens = option.getAttribute('data-tokens');
            config.subtext = option.getAttribute('data-subtext');
            config.icon = option.getAttribute('data-icon');
            config.iconBase = iconBase;
            var textElement = generateOption.text(config);
            mainElements.push(generateOption.li(generateOption.a(textElement, optionClass, inlineStyle), '', config.optID));
            option.liIndex = liIndex;
            config.display = config.content || config.text;
            config.type = 'option';
            config.index = liIndex;
            config.option = option;
            config.disabled = config.disabled || option.disabled;
            mainData.push(config);
            var combinedLength = 0; // count the number of characters in the option - not perfect, but should work in most cases

            if (config.display) combinedLength += config.display.length;
            if (config.subtext) combinedLength += config.subtext.length; // if there is an icon, ensure this option's width is checked

            if (config.icon) combinedLength += 1;

            if (combinedLength > widestOptionLength) {
              widestOptionLength = combinedLength; // guess which option is the widest
              // use this when calculating menu width
              // not perfect, but it's fast, and the width will be updating accordingly when scrolling

              that.selectpicker.view.widestOption = mainElements[mainElements.length - 1];
            }
          }
        }

        function addOptgroup(index, selectOptions) {
          var optgroup = selectOptions[index],
              previous = selectOptions[index - 1],
              next = selectOptions[index + 1],
              options = optgroup.querySelectorAll('option' + optionSelector);
          if (!options.length) return;
          var config = {
            label: htmlEscape(optgroup.label),
            subtext: optgroup.getAttribute('data-subtext'),
            icon: optgroup.getAttribute('data-icon'),
            iconBase: iconBase
          },
              optgroupClass = ' ' + (optgroup.className || ''),
              headerIndex,
              lastIndex;
          optID++;

          if (previous) {
            addDivider({
              optID: optID
            });
          }

          var labelElement = generateOption.label(config);
          mainElements.push(generateOption.li(labelElement, 'dropdown-header' + optgroupClass, optID));
          mainData.push({
            display: config.label,
            subtext: config.subtext,
            type: 'optgroup-label',
            optID: optID
          });

          for (var j = 0, len = options.length; j < len; j++) {
            var option = options[j];

            if (j === 0) {
              headerIndex = mainData.length - 1;
              lastIndex = headerIndex + len;
            }

            addOption(option, {
              headerIndex: headerIndex,
              lastIndex: lastIndex,
              optID: optID,
              optgroupClass: optgroupClass,
              disabled: optgroup.disabled
            });
          }

          if (next) {
            addDivider({
              optID: optID
            });
          }
        }

        for (var len = selectOptions.length; startIndex < len; startIndex++) {
          var item = selectOptions[startIndex];

          if (item.tagName !== 'OPTGROUP') {
            addOption(item, {});
          } else {
            addOptgroup(startIndex, selectOptions);
          }
        }

        this.selectpicker.main.elements = mainElements;
        this.selectpicker.main.data = mainData;
        this.selectpicker.current = this.selectpicker.main;
      },
      findLis: function findLis() {
        return this.$menuInner.find('.inner > li');
      },
      render: function render() {
        // ensure titleOption is appended and selected (if necessary) before getting selectedOptions
        this.setPlaceholder();
        var that = this,
            selectedOptions = this.$element[0].selectedOptions,
            selectedCount = selectedOptions.length,
            button = this.$button[0],
            buttonInner = button.querySelector('.filter-option-inner-inner'),
            multipleSeparator = document.createTextNode(this.options.multipleSeparator),
            titleFragment = elementTemplates.fragment.cloneNode(false),
            showCount,
            countMax,
            hasContent = false;
        this.togglePlaceholder();
        this.tabIndex();

        if (this.options.selectedTextFormat === 'static') {
          titleFragment = generateOption.text({
            text: this.options.title
          }, true);
        } else {
          showCount = this.multiple && this.options.selectedTextFormat.indexOf('count') !== -1 && selectedCount > 1; // determine if the number of selected options will be shown (showCount === true)

          if (showCount) {
            countMax = this.options.selectedTextFormat.split('>');
            showCount = countMax.length > 1 && selectedCount > countMax[1] || countMax.length === 1 && selectedCount >= 2;
          } // only loop through all selected options if the count won't be shown


          if (showCount === false) {
            for (var selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) {
              if (selectedIndex < 50) {
                var option = selectedOptions[selectedIndex],
                    titleOptions = {},
                    thisData = {
                  content: option.getAttribute('data-content'),
                  subtext: option.getAttribute('data-subtext'),
                  icon: option.getAttribute('data-icon')
                };

                if (this.multiple && selectedIndex > 0) {
                  titleFragment.appendChild(multipleSeparator.cloneNode(false));
                }

                if (option.title) {
                  titleOptions.text = option.title;
                } else if (thisData.content && that.options.showContent) {
                  titleOptions.content = thisData.content.toString();
                  hasContent = true;
                } else {
                  if (that.options.showIcon) {
                    titleOptions.icon = thisData.icon;
                    titleOptions.iconBase = this.options.iconBase;
                  }

                  if (that.options.showSubtext && !that.multiple && thisData.subtext) titleOptions.subtext = ' ' + thisData.subtext;
                  titleOptions.text = option.textContent.trim();
                }

                titleFragment.appendChild(generateOption.text(titleOptions, true));
              } else {
                break;
              }
            } // add ellipsis


            if (selectedCount > 49) {
              titleFragment.appendChild(document.createTextNode('...'));
            }
          } else {
            var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
            if (this.options.hideDisabled) optionSelector += ':not(:disabled)'; // If this is a multiselect, and selectedTextFormat is count, then show 1 of 2 selected, etc.

            var totalCount = this.$element[0].querySelectorAll('select > option' + optionSelector + ', optgroup' + optionSelector + ' option' + optionSelector).length,
                tr8nText = typeof this.options.countSelectedText === 'function' ? this.options.countSelectedText(selectedCount, totalCount) : this.options.countSelectedText;
            titleFragment = generateOption.text({
              text: tr8nText.replace('{0}', selectedCount.toString()).replace('{1}', totalCount.toString())
            }, true);
          }
        }

        if (this.options.title == undefined) {
          // use .attr to ensure undefined is returned if title attribute is not set
          this.options.title = this.$element.attr('title');
        } // If the select doesn't have a title, then use the default, or if nothing is set at all, use noneSelectedText


        if (!titleFragment.childNodes.length) {
          titleFragment = generateOption.text({
            text: typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText
          }, true);
        } // strip all HTML tags and trim the result, then unescape any escaped tags


        button.title = titleFragment.textContent.replace(/<[^>]*>?/g, '').trim();

        if (this.options.sanitize && hasContent) {
          sanitizeHtml([titleFragment], that.options.whiteList, that.options.sanitizeFn);
        }

        buttonInner.innerHTML = '';
        buttonInner.appendChild(titleFragment);

        if (version.major < 4 && this.$newElement[0].classList.contains('bs3-has-addon')) {
          var filterExpand = button.querySelector('.filter-expand'),
              clone = buttonInner.cloneNode(true);
          clone.className = 'filter-expand';

          if (filterExpand) {
            button.replaceChild(clone, filterExpand);
          } else {
            button.appendChild(clone);
          }
        }

        this.$element.trigger('rendered' + EVENT_KEY);
      },

      /**
       * @param [style]
       * @param [status]
       */
      setStyle: function setStyle(newStyle, status) {
        var button = this.$button[0],
            newElement = this.$newElement[0],
            style = this.options.style.trim(),
            buttonClass;

        if (this.$element.attr('class')) {
          this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
        }

        if (version.major < 4) {
          newElement.classList.add('bs3');

          if (newElement.parentNode.classList.contains('input-group') && (newElement.previousElementSibling || newElement.nextElementSibling) && (newElement.previousElementSibling || newElement.nextElementSibling).classList.contains('input-group-addon')) {
            newElement.classList.add('bs3-has-addon');
          }
        }

        if (newStyle) {
          buttonClass = newStyle.trim();
        } else {
          buttonClass = style;
        }

        if (status == 'add') {
          if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
        } else if (status == 'remove') {
          if (buttonClass) button.classList.remove.apply(button.classList, buttonClass.split(' '));
        } else {
          if (style) button.classList.remove.apply(button.classList, style.split(' '));
          if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
        }
      },
      liHeight: function liHeight(refresh) {
        if (!refresh && (this.options.size === false || this.sizeInfo)) return;
        if (!this.sizeInfo) this.sizeInfo = {};
        var newElement = document.createElement('div'),
            menu = document.createElement('div'),
            menuInner = document.createElement('div'),
            menuInnerInner = document.createElement('ul'),
            divider = document.createElement('li'),
            dropdownHeader = document.createElement('li'),
            li = document.createElement('li'),
            a = document.createElement('a'),
            text = document.createElement('span'),
            header = this.options.header && this.$menu.find('.' + classNames.POPOVERHEADER).length > 0 ? this.$menu.find('.' + classNames.POPOVERHEADER)[0].cloneNode(true) : null,
            search = this.options.liveSearch ? document.createElement('div') : null,
            actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
            doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null,
            firstOption = this.$element.find('option')[0];
        this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;
        text.className = 'text';
        a.className = 'dropdown-item ' + (firstOption ? firstOption.className : '');
        newElement.className = this.$menu[0].parentNode.className + ' ' + classNames.SHOW;
        newElement.style.width = this.sizeInfo.selectWidth + 'px';
        if (this.options.width === 'auto') menu.style.minWidth = 0;
        menu.className = classNames.MENU + ' ' + classNames.SHOW;
        menuInner.className = 'inner ' + classNames.SHOW;
        menuInnerInner.className = classNames.MENU + ' inner ' + (version.major === '4' ? classNames.SHOW : '');
        divider.className = classNames.DIVIDER;
        dropdownHeader.className = 'dropdown-header';
        text.appendChild(document.createTextNode("\u200B"));
        a.appendChild(text);
        li.appendChild(a);
        dropdownHeader.appendChild(text.cloneNode(true));

        if (this.selectpicker.view.widestOption) {
          menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
        }

        menuInnerInner.appendChild(li);
        menuInnerInner.appendChild(divider);
        menuInnerInner.appendChild(dropdownHeader);
        if (header) menu.appendChild(header);

        if (search) {
          var input = document.createElement('input');
          search.className = 'bs-searchbox';
          input.className = 'form-control';
          search.appendChild(input);
          menu.appendChild(search);
        }

        if (actions) menu.appendChild(actions);
        menuInner.appendChild(menuInnerInner);
        menu.appendChild(menuInner);
        if (doneButton) menu.appendChild(doneButton);
        newElement.appendChild(menu);
        document.body.appendChild(newElement);
        var liHeight = li.offsetHeight,
            dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0,
            headerHeight = header ? header.offsetHeight : 0,
            searchHeight = search ? search.offsetHeight : 0,
            actionsHeight = actions ? actions.offsetHeight : 0,
            doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
            dividerHeight = $(divider).outerHeight(true),
            // fall back to jQuery if getComputedStyle is not supported
        menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false,
            menuWidth = menu.offsetWidth,
            $menu = menuStyle ? null : $(menu),
            menuPadding = {
          vert: toInteger(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) + toInteger(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) + toInteger(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) + toInteger(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
          horiz: toInteger(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) + toInteger(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) + toInteger(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) + toInteger(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
        },
            menuExtras = {
          vert: menuPadding.vert + toInteger(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) + toInteger(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
          horiz: menuPadding.horiz + toInteger(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) + toInteger(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
        },
            scrollBarWidth;
        menuInner.style.overflowY = 'scroll';
        scrollBarWidth = menu.offsetWidth - menuWidth;
        document.body.removeChild(newElement);
        this.sizeInfo.liHeight = liHeight;
        this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
        this.sizeInfo.headerHeight = headerHeight;
        this.sizeInfo.searchHeight = searchHeight;
        this.sizeInfo.actionsHeight = actionsHeight;
        this.sizeInfo.doneButtonHeight = doneButtonHeight;
        this.sizeInfo.dividerHeight = dividerHeight;
        this.sizeInfo.menuPadding = menuPadding;
        this.sizeInfo.menuExtras = menuExtras;
        this.sizeInfo.menuWidth = menuWidth;
        this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
        this.sizeInfo.scrollBarWidth = scrollBarWidth;
        this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;
        this.setPositionData();
      },
      getSelectPosition: function getSelectPosition() {
        var that = this,
            $window = $(window),
            pos = that.$newElement.offset(),
            $container = $(that.options.container),
            containerPos;

        if (that.options.container && $container.length && !$container.is('body')) {
          containerPos = $container.offset();
          containerPos.top += parseInt($container.css('borderTopWidth'));
          containerPos.left += parseInt($container.css('borderLeftWidth'));
        } else {
          containerPos = {
            top: 0,
            left: 0
          };
        }

        var winPad = that.options.windowPadding;
        this.sizeInfo.selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
        this.sizeInfo.selectOffsetBot = $window.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - containerPos.top - winPad[2];
        this.sizeInfo.selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
        this.sizeInfo.selectOffsetRight = $window.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - containerPos.left - winPad[1];
        this.sizeInfo.selectOffsetTop -= winPad[0];
        this.sizeInfo.selectOffsetLeft -= winPad[3];
      },
      setMenuSize: function setMenuSize(isAuto) {
        this.getSelectPosition();

        var selectWidth = this.sizeInfo.selectWidth,
            liHeight = this.sizeInfo.liHeight,
            headerHeight = this.sizeInfo.headerHeight,
            searchHeight = this.sizeInfo.searchHeight,
            actionsHeight = this.sizeInfo.actionsHeight,
            doneButtonHeight = this.sizeInfo.doneButtonHeight,
            divHeight = this.sizeInfo.dividerHeight,
            menuPadding = this.sizeInfo.menuPadding,
            menuInnerHeight,
            menuHeight,
            divLength = 0,
            minHeight,
            _minHeight,
            maxHeight,
            menuInnerMinHeight,
            estimate;

        if (this.options.dropupAuto) {
          // Get the estimated height of the menu without scrollbars.
          // This is useful for smaller menus, where there might be plenty of room
          // below the button without setting dropup, but we can't know
          // the exact height of the menu until createView is called later
          estimate = liHeight * this.selectpicker.current.elements.length + menuPadding.vert;
          this.$newElement.toggleClass(classNames.DROPUP, this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot);
        }

        if (this.options.size === 'auto') {
          _minHeight = this.selectpicker.current.elements.length > 3 ? this.sizeInfo.liHeight * 3 + this.sizeInfo.menuExtras.vert - 2 : 0;
          menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
          minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
          menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);

          if (this.$newElement.hasClass(classNames.DROPUP)) {
            menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
          }

          maxHeight = menuHeight;
          menuInnerHeight = menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
        } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
          for (var i = 0; i < this.options.size; i++) {
            if (this.selectpicker.current.data[i].type === 'divider') divLength++;
          }

          menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
          menuInnerHeight = menuHeight - menuPadding.vert;
          maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
          minHeight = menuInnerMinHeight = '';
        }

        if (this.options.dropdownAlignRight === 'auto') {
          this.$menu.toggleClass(classNames.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < this.sizeInfo.totalMenuWidth - selectWidth);
        }

        this.$menu.css({
          'max-height': maxHeight + 'px',
          'overflow': 'hidden',
          'min-height': minHeight + 'px'
        });
        this.$menuInner.css({
          'max-height': menuInnerHeight + 'px',
          'overflow-y': 'auto',
          'min-height': menuInnerMinHeight + 'px'
        }); // ensure menuInnerHeight is always a positive number to prevent issues calculating chunkSize in createView

        this.sizeInfo.menuInnerHeight = Math.max(menuInnerHeight, 1);

        if (this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight) {
          this.sizeInfo.hasScrollBar = true;
          this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;
          this.$menu.css('min-width', this.sizeInfo.totalMenuWidth);
        }

        if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
      },
      setSize: function setSize(refresh) {
        this.liHeight(refresh);
        if (this.options.header) this.$menu.css('padding-top', 0);
        if (this.options.size === false) return;
        var that = this,
            $window = $(window),
            selectedIndex,
            offset = 0;
        this.setMenuSize();

        if (this.options.liveSearch) {
          this.$searchbox.off('input.setMenuSize propertychange.setMenuSize').on('input.setMenuSize propertychange.setMenuSize', function () {
            return that.setMenuSize();
          });
        }

        if (this.options.size === 'auto') {
          $window.off('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize').on('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize', function () {
            return that.setMenuSize();
          });
        } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
          $window.off('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize');
        }

        if (refresh) {
          offset = this.$menuInner[0].scrollTop;
        } else if (!that.multiple) {
          var element = that.$element[0];
          selectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

          if (typeof selectedIndex === 'number' && that.options.size !== false) {
            offset = that.sizeInfo.liHeight * selectedIndex;
            offset = offset - that.sizeInfo.menuInnerHeight / 2 + that.sizeInfo.liHeight / 2;
          }
        }

        that.createView(false, offset);
      },
      setWidth: function setWidth() {
        var that = this;

        if (this.options.width === 'auto') {
          requestAnimationFrame(function () {
            that.$menu.css('min-width', '0');
            that.$element.on('loaded' + EVENT_KEY, function () {
              that.liHeight();
              that.setMenuSize(); // Get correct width if element is hidden

              var $selectClone = that.$newElement.clone().appendTo('body'),
                  btnWidth = $selectClone.css('width', 'auto').children('button').outerWidth();
              $selectClone.remove(); // Set width to whatever's larger, button title or longest option

              that.sizeInfo.selectWidth = Math.max(that.sizeInfo.totalMenuWidth, btnWidth);
              that.$newElement.css('width', that.sizeInfo.selectWidth + 'px');
            });
          });
        } else if (this.options.width === 'fit') {
          // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '').addClass('fit-width');
        } else if (this.options.width) {
          // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', this.options.width);
        } else {
          // Remove inline min-width/width so width can be changed
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '');
        } // Remove fit-width class if width is changed programmatically


        if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
          this.$newElement[0].classList.remove('fit-width');
        }
      },
      selectPosition: function selectPosition() {
        this.$bsContainer = $('<div class="bs-container" />');

        var that = this,
            $container = $(this.options.container),
            pos,
            containerPos,
            actualHeight,
            getPlacement = function getPlacement($element) {
          var containerPosition = {},
              // fall back to dropdown's default display setting if display is not manually set
          display = that.options.display || ( // Bootstrap 3 doesn't have $.fn.dropdown.Constructor.Default
          $.fn.dropdown.Constructor.Default ? $.fn.dropdown.Constructor.Default.display : false);
          that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass(classNames.DROPUP, $element.hasClass(classNames.DROPUP));
          pos = $element.offset();

          if (!$container.is('body')) {
            containerPos = $container.offset();
            containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
            containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
          } else {
            containerPos = {
              top: 0,
              left: 0
            };
          }

          actualHeight = $element.hasClass(classNames.DROPUP) ? 0 : $element[0].offsetHeight; // Bootstrap 4+ uses Popper for menu positioning

          if (version.major < 4 || display === 'static') {
            containerPosition.top = pos.top - containerPos.top + actualHeight;
            containerPosition.left = pos.left - containerPos.left;
          }

          containerPosition.width = $element[0].offsetWidth;
          that.$bsContainer.css(containerPosition);
        };

        this.$button.on('click.bs.dropdown.data-api', function () {
          if (that.isDisabled()) {
            return;
          }

          getPlacement(that.$newElement);
          that.$bsContainer.appendTo(that.options.container).toggleClass(classNames.SHOW, !that.$button.hasClass(classNames.SHOW)).append(that.$menu);
        });
        $(window).off('resize' + EVENT_KEY + '.' + this.selectId + ' scroll' + EVENT_KEY + '.' + this.selectId).on('resize' + EVENT_KEY + '.' + this.selectId + ' scroll' + EVENT_KEY + '.' + this.selectId, function () {
          var isActive = that.$newElement.hasClass(classNames.SHOW);
          if (isActive) getPlacement(that.$newElement);
        });
        this.$element.on('hide' + EVENT_KEY, function () {
          that.$menu.data('height', that.$menu.height());
          that.$bsContainer.detach();
        });
      },
      setOptionStatus: function setOptionStatus() {
        var that = this;
        that.noScroll = false;

        if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) {
          for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
            var liData = that.selectpicker.current.data[i + that.selectpicker.view.position0],
                option = liData.option;

            if (option) {
              that.setDisabled(liData.index, liData.disabled);
              that.setSelected(liData.index, option.selected);
            }
          }
        }
      },

      /**
       * @param {number} index - the index of the option that is being changed
       * @param {boolean} selected - true if the option is being selected, false if being deselected
       */
      setSelected: function setSelected(index, selected) {
        var li = this.selectpicker.main.elements[index],
            liData = this.selectpicker.main.data[index],
            activeIndexIsSet = this.activeIndex !== undefined,
            thisIsActive = this.activeIndex === index,
            prevActive,
            a,
            // if current option is already active
        // OR
        // if the current option is being selected, it's NOT multiple, and
        // activeIndex is undefined:
        //  - when the menu is first being opened, OR
        //  - after a search has been performed, OR
        //  - when retainActive is false when selecting a new option (i.e. index of the newly selected option is not the same as the current activeIndex)
        keepActive = thisIsActive || selected && !this.multiple && !activeIndexIsSet;
        liData.selected = selected;
        a = li.firstChild;

        if (selected) {
          this.selectedIndex = index;
        }

        li.classList.toggle('selected', selected);
        li.classList.toggle('active', keepActive);

        if (keepActive) {
          this.selectpicker.view.currentActive = li;
          this.activeIndex = index;
        }

        if (a) {
          a.classList.toggle('selected', selected);
          a.classList.toggle('active', keepActive);
          a.setAttribute('aria-selected', selected);
        }

        if (!keepActive) {
          if (!activeIndexIsSet && selected && this.prevActiveIndex !== undefined) {
            prevActive = this.selectpicker.main.elements[this.prevActiveIndex];
            prevActive.classList.remove('active');

            if (prevActive.firstChild) {
              prevActive.firstChild.classList.remove('active');
            }
          }
        }
      },

      /**
       * @param {number} index - the index of the option that is being disabled
       * @param {boolean} disabled - true if the option is being disabled, false if being enabled
       */
      setDisabled: function setDisabled(index, disabled) {
        var li = this.selectpicker.main.elements[index],
            a;
        this.selectpicker.main.data[index].disabled = disabled;
        a = li.firstChild;
        li.classList.toggle(classNames.DISABLED, disabled);

        if (a) {
          if (version.major === '4') a.classList.toggle(classNames.DISABLED, disabled);
          a.setAttribute('aria-disabled', disabled);

          if (disabled) {
            a.setAttribute('tabindex', -1);
          } else {
            a.setAttribute('tabindex', 0);
          }
        }
      },
      isDisabled: function isDisabled() {
        return this.$element[0].disabled;
      },
      checkDisabled: function checkDisabled() {
        var that = this;

        if (this.isDisabled()) {
          this.$newElement[0].classList.add(classNames.DISABLED);
          this.$button.addClass(classNames.DISABLED).attr('tabindex', -1).attr('aria-disabled', true);
        } else {
          if (this.$button[0].classList.contains(classNames.DISABLED)) {
            this.$newElement[0].classList.remove(classNames.DISABLED);
            this.$button.removeClass(classNames.DISABLED).attr('aria-disabled', false);
          }

          if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
            this.$button.removeAttr('tabindex');
          }
        }

        this.$button.on('click', function () {
          return !that.isDisabled();
        });
      },
      togglePlaceholder: function togglePlaceholder() {
        // much faster than calling $.val()
        var element = this.$element[0],
            selectedIndex = element.selectedIndex,
            nothingSelected = selectedIndex === -1;
        if (!nothingSelected && !element.options[selectedIndex].value) nothingSelected = true;
        this.$button.toggleClass('bs-placeholder', nothingSelected);
      },
      tabIndex: function tabIndex() {
        if (this.$element.data('tabindex') !== this.$element.attr('tabindex') && this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98') {
          this.$element.data('tabindex', this.$element.attr('tabindex'));
          this.$button.attr('tabindex', this.$element.data('tabindex'));
        }

        this.$element.attr('tabindex', -98);
      },
      clickListener: function clickListener() {
        var that = this,
            $document = $(document);
        $document.data('spaceSelect', false);
        this.$button.on('keyup', function (e) {
          if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
            e.preventDefault();
            $document.data('spaceSelect', false);
          }
        });
        this.$newElement.on('show.bs.dropdown', function () {
          if (version.major > 3 && !that.dropdown) {
            that.dropdown = that.$button.data('bs.dropdown');
            that.dropdown._menu = that.$menu[0];
          }
        });
        this.$button.on('click.bs.dropdown.data-api', function () {
          if (!that.$newElement.hasClass(classNames.SHOW)) {
            that.setSize();
          }
        });

        function setFocus() {
          if (that.options.liveSearch) {
            that.$searchbox.trigger('focus');
          } else {
            that.$menuInner.trigger('focus');
          }
        }

        function checkPopperExists() {
          if (that.dropdown && that.dropdown._popper && that.dropdown._popper.state.isCreated) {
            setFocus();
          } else {
            requestAnimationFrame(checkPopperExists);
          }
        }

        this.$element.on('shown' + EVENT_KEY, function () {
          if (that.$menuInner[0].scrollTop !== that.selectpicker.view.scrollTop) {
            that.$menuInner[0].scrollTop = that.selectpicker.view.scrollTop;
          }

          if (version.major > 3) {
            requestAnimationFrame(checkPopperExists);
          } else {
            setFocus();
          }
        });
        this.$menuInner.on('click', 'li a', function (e, retainActive) {
          var $this = $(this),
              position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
              clickedData = that.selectpicker.current.data[$this.parent().index() + position0],
              clickedIndex = clickedData.index,
              prevValue = getSelectValues(that.$element[0]),
              prevIndex = that.$element.prop('selectedIndex'),
              triggerChange = true; // Don't close on multi choice menu

          if (that.multiple && that.options.maxOptions !== 1) {
            e.stopPropagation();
          }

          e.preventDefault(); // Don't run if the select is disabled

          if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
            var $options = that.$element.find('option'),
                option = clickedData.option,
                $option = $(option),
                state = option.selected,
                $optgroup = $option.parent('optgroup'),
                $optgroupOptions = $optgroup.find('option'),
                maxOptions = that.options.maxOptions,
                maxOptionsGrp = $optgroup.data('maxOptions') || false;
            if (clickedIndex === that.activeIndex) retainActive = true;

            if (!retainActive) {
              that.prevActiveIndex = that.activeIndex;
              that.activeIndex = undefined;
            }

            if (!that.multiple) {
              // Deselect all others if not multi select box
              $options.prop('selected', false);
              option.selected = true;
              that.setSelected(clickedIndex, true);
            } else {
              // Toggle the one we have chosen if we are multi select.
              option.selected = !state;
              that.setSelected(clickedIndex, !state);
              $this.trigger('blur');

              if (maxOptions !== false || maxOptionsGrp !== false) {
                var maxReached = maxOptions < $options.filter(':selected').length,
                    maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

                if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp) {
                  if (maxOptions && maxOptions == 1) {
                    $options.prop('selected', false);
                    $option.prop('selected', true);

                    for (var i = 0; i < $options.length; i++) {
                      that.setSelected(i, false);
                    }

                    that.setSelected(clickedIndex, true);
                  } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                    $optgroup.find('option:selected').prop('selected', false);
                    $option.prop('selected', true);

                    for (var i = 0; i < $optgroupOptions.length; i++) {
                      var option = $optgroupOptions[i];
                      that.setSelected($options.index(option), false);
                    }

                    that.setSelected(clickedIndex, true);
                  } else {
                    var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                        maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                        maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                        maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                        $notify = $('<div class="notify"></div>'); // If {var} is set in array, replace it

                    /** @deprecated */

                    if (maxOptionsArr[2]) {
                      maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                      maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                    }

                    $option.prop('selected', false);
                    that.$menu.append($notify);

                    if (maxOptions && maxReached) {
                      $notify.append($('<div>' + maxTxt + '</div>'));
                      triggerChange = false;
                      that.$element.trigger('maxReached' + EVENT_KEY);
                    }

                    if (maxOptionsGrp && maxReachedGrp) {
                      $notify.append($('<div>' + maxTxtGrp + '</div>'));
                      triggerChange = false;
                      that.$element.trigger('maxReachedGrp' + EVENT_KEY);
                    }

                    setTimeout(function () {
                      that.setSelected(clickedIndex, false);
                    }, 10);
                    $notify.delay(750).fadeOut(300, function () {
                      $(this).remove();
                    });
                  }
                }
              }
            }

            if (!that.multiple || that.multiple && that.options.maxOptions === 1) {
              that.$button.trigger('focus');
            } else if (that.options.liveSearch) {
              that.$searchbox.trigger('focus');
            } // Trigger select 'change'


            if (triggerChange) {
              if (prevValue != getSelectValues(that.$element[0]) && that.multiple || prevIndex != that.$element.prop('selectedIndex') && !that.multiple) {
                // $option.prop('selected') is current option state (selected/unselected). prevValue is the value of the select prior to being changed.
                changedArguments = [option.index, $option.prop('selected'), prevValue];
                that.$element.triggerNative('change');
              }
            }
          }
        });
        this.$menu.on('click', 'li.' + classNames.DISABLED + ' a, .' + classNames.POPOVERHEADER + ', .' + classNames.POPOVERHEADER + ' :not(.close)', function (e) {
          if (e.currentTarget == this) {
            e.preventDefault();
            e.stopPropagation();

            if (that.options.liveSearch && !$(e.target).hasClass('close')) {
              that.$searchbox.trigger('focus');
            } else {
              that.$button.trigger('focus');
            }
          }
        });
        this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
          e.preventDefault();
          e.stopPropagation();

          if (that.options.liveSearch) {
            that.$searchbox.trigger('focus');
          } else {
            that.$button.trigger('focus');
          }
        });
        this.$menu.on('click', '.' + classNames.POPOVERHEADER + ' .close', function () {
          that.$button.trigger('click');
        });
        this.$searchbox.on('click', function (e) {
          e.stopPropagation();
        });
        this.$menu.on('click', '.actions-btn', function (e) {
          if (that.options.liveSearch) {
            that.$searchbox.trigger('focus');
          } else {
            that.$button.trigger('focus');
          }

          e.preventDefault();
          e.stopPropagation();

          if ($(this).hasClass('bs-select-all')) {
            that.selectAll();
          } else {
            that.deselectAll();
          }
        });
        this.$element.on('change' + EVENT_KEY, function () {
          that.render();
          that.$element.trigger('changed' + EVENT_KEY, changedArguments);
          changedArguments = null;
        }).on('focus' + EVENT_KEY, function () {
          if (!that.options.mobile) that.$button.trigger('focus');
        });
      },
      liveSearchListener: function liveSearchListener() {
        var that = this,
            noResults = document.createElement('li');
        this.$button.on('click.bs.dropdown.data-api', function () {
          if (!!that.$searchbox.val()) {
            that.$searchbox.val('');
          }
        });
        this.$searchbox.on('click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api', function (e) {
          e.stopPropagation();
        });
        this.$searchbox.on('input propertychange', function () {
          var searchValue = that.$searchbox.val();
          that.selectpicker.search.elements = [];
          that.selectpicker.search.data = [];

          if (searchValue) {
            var i,
                searchMatch = [],
                q = searchValue.toUpperCase(),
                cache = {},
                cacheArr = [],
                searchStyle = that._searchStyle(),
                normalizeSearch = that.options.liveSearchNormalize;

            if (normalizeSearch) q = normalizeToBase(q);
            that._$lisSelected = that.$menuInner.find('.selected');

            for (var i = 0; i < that.selectpicker.main.data.length; i++) {
              var li = that.selectpicker.main.data[i];

              if (!cache[i]) {
                cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
              }

              if (cache[i] && li.headerIndex !== undefined && cacheArr.indexOf(li.headerIndex) === -1) {
                if (li.headerIndex > 0) {
                  cache[li.headerIndex - 1] = true;
                  cacheArr.push(li.headerIndex - 1);
                }

                cache[li.headerIndex] = true;
                cacheArr.push(li.headerIndex);
                cache[li.lastIndex + 1] = true;
              }

              if (cache[i] && li.type !== 'optgroup-label') cacheArr.push(i);
            }

            for (var i = 0, cacheLen = cacheArr.length; i < cacheLen; i++) {
              var index = cacheArr[i],
                  prevIndex = cacheArr[i - 1],
                  li = that.selectpicker.main.data[index],
                  liPrev = that.selectpicker.main.data[prevIndex];

              if (li.type !== 'divider' || li.type === 'divider' && liPrev && liPrev.type !== 'divider' && cacheLen - 1 !== i) {
                that.selectpicker.search.data.push(li);
                searchMatch.push(that.selectpicker.main.elements[index]);
              }
            }

            that.activeIndex = undefined;
            that.noScroll = true;
            that.$menuInner.scrollTop(0);
            that.selectpicker.search.elements = searchMatch;
            that.createView(true);

            if (!searchMatch.length) {
              noResults.className = 'no-results';
              noResults.innerHTML = that.options.noneResultsText.replace('{0}', '"' + htmlEscape(searchValue) + '"');
              that.$menuInner[0].firstChild.appendChild(noResults);
            }
          } else {
            that.$menuInner.scrollTop(0);
            that.createView(false);
          }
        });
      },
      _searchStyle: function _searchStyle() {
        return this.options.liveSearchStyle || 'contains';
      },
      val: function val(value) {
        if (typeof value !== 'undefined') {
          var prevValue = getSelectValues(this.$element[0]);
          changedArguments = [null, null, prevValue];
          this.$element.val(value).trigger('changed' + EVENT_KEY, changedArguments);
          this.render();
          changedArguments = null;
          return this.$element;
        } else {
          return this.$element.val();
        }
      },
      changeAll: function changeAll(status) {
        if (!this.multiple) return;
        if (typeof status === 'undefined') status = true;
        var element = this.$element[0],
            previousSelected = 0,
            currentSelected = 0,
            prevValue = getSelectValues(element);
        element.classList.add('bs-select-hidden');

        for (var i = 0, len = this.selectpicker.current.elements.length; i < len; i++) {
          var liData = this.selectpicker.current.data[i],
              option = liData.option;

          if (option && !liData.disabled && liData.type !== 'divider') {
            if (liData.selected) previousSelected++;
            option.selected = status;
            if (status) currentSelected++;
          }
        }

        element.classList.remove('bs-select-hidden');
        if (previousSelected === currentSelected) return;
        this.setOptionStatus();
        this.togglePlaceholder();
        changedArguments = [null, null, prevValue];
        this.$element.triggerNative('change');
      },
      selectAll: function selectAll() {
        return this.changeAll(true);
      },
      deselectAll: function deselectAll() {
        return this.changeAll(false);
      },
      toggle: function toggle(e) {
        e = e || window.event;
        if (e) e.stopPropagation();
        this.$button.trigger('click.bs.dropdown.data-api');
      },
      keydown: function keydown(e) {
        var $this = $(this),
            isToggle = $this.hasClass('dropdown-toggle'),
            $parent = isToggle ? $this.closest('.dropdown') : $this.closest(Selector.MENU),
            that = $parent.data('this'),
            $items = that.findLis(),
            index,
            isActive,
            liActive,
            activeLi,
            offset,
            updateScroll = false,
            downOnTab = e.which === keyCodes.TAB && !isToggle && !that.options.selectOnTab,
            isArrowKey = REGEXP_ARROW.test(e.which) || downOnTab,
            scrollTop = that.$menuInner[0].scrollTop,
            isVirtual = that.isVirtual(),
            position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;
        isActive = that.$newElement.hasClass(classNames.SHOW);

        if (!isActive && (isArrowKey || e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105 || e.which >= 65 && e.which <= 90)) {
          that.$button.trigger('click.bs.dropdown.data-api');

          if (that.options.liveSearch) {
            that.$searchbox.trigger('focus');
            return;
          }
        }

        if (e.which === keyCodes.ESCAPE && isActive) {
          e.preventDefault();
          that.$button.trigger('click.bs.dropdown.data-api').trigger('focus');
        }

        if (isArrowKey) {
          // if up or down
          if (!$items.length) return; // $items.index/.filter is too slow with a large list and no virtual scroll

          index = isVirtual === true ? $items.index($items.filter('.active')) : that.activeIndex;
          if (index === undefined) index = -1;

          if (index !== -1) {
            liActive = that.selectpicker.current.elements[index + position0];
            liActive.classList.remove('active');
            if (liActive.firstChild) liActive.firstChild.classList.remove('active');
          }

          if (e.which === keyCodes.ARROW_UP) {
            // up
            if (index !== -1) index--;
            if (index + position0 < 0) index += $items.length;

            if (!that.selectpicker.view.canHighlight[index + position0]) {
              index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
              if (index === -1) index = $items.length - 1;
            }
          } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) {
            // down
            index++;
            if (index + position0 >= that.selectpicker.view.canHighlight.length) index = 0;

            if (!that.selectpicker.view.canHighlight[index + position0]) {
              index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
            }
          }

          e.preventDefault();
          var liActiveIndex = position0 + index;

          if (e.which === keyCodes.ARROW_UP) {
            // up
            // scroll to bottom and highlight last option
            if (position0 === 0 && index === $items.length - 1) {
              that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;
              liActiveIndex = that.selectpicker.current.elements.length - 1;
            } else {
              activeLi = that.selectpicker.current.data[liActiveIndex];
              offset = activeLi.position - activeLi.height;
              updateScroll = offset < scrollTop;
            }
          } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) {
            // down
            // scroll to top and highlight first option
            if (index === 0) {
              that.$menuInner[0].scrollTop = 0;
              liActiveIndex = 0;
            } else {
              activeLi = that.selectpicker.current.data[liActiveIndex];
              offset = activeLi.position - that.sizeInfo.menuInnerHeight;
              updateScroll = offset > scrollTop;
            }
          }

          liActive = that.selectpicker.current.elements[liActiveIndex];

          if (liActive) {
            liActive.classList.add('active');
            if (liActive.firstChild) liActive.firstChild.classList.add('active');
          }

          that.activeIndex = that.selectpicker.current.data[liActiveIndex].index;
          that.selectpicker.view.currentActive = liActive;
          if (updateScroll) that.$menuInner[0].scrollTop = offset;

          if (that.options.liveSearch) {
            that.$searchbox.trigger('focus');
          } else {
            $this.trigger('focus');
          }
        } else if (!$this.is('input') && !REGEXP_TAB_OR_ESCAPE.test(e.which) || e.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory) {
          var searchMatch,
              matches = [],
              keyHistory;
          e.preventDefault();
          that.selectpicker.keydown.keyHistory += keyCodeMap[e.which];
          if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
          that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();
          keyHistory = that.selectpicker.keydown.keyHistory; // if all letters are the same, set keyHistory to just the first character when searching

          if (/^(.)\1+$/.test(keyHistory)) {
            keyHistory = keyHistory.charAt(0);
          } // find matches


          for (var i = 0; i < that.selectpicker.current.data.length; i++) {
            var li = that.selectpicker.current.data[i],
                hasMatch;
            hasMatch = stringSearch(li, keyHistory, 'startsWith', true);

            if (hasMatch && that.selectpicker.view.canHighlight[i]) {
              matches.push(li.index);
            }
          }

          if (matches.length) {
            var matchIndex = 0;
            $items.removeClass('active').find('a').removeClass('active'); // either only one key has been pressed or they are all the same key

            if (keyHistory.length === 1) {
              matchIndex = matches.indexOf(that.activeIndex);

              if (matchIndex === -1 || matchIndex === matches.length - 1) {
                matchIndex = 0;
              } else {
                matchIndex++;
              }
            }

            searchMatch = matches[matchIndex];
            activeLi = that.selectpicker.main.data[searchMatch];

            if (scrollTop - activeLi.position > 0) {
              offset = activeLi.position - activeLi.height;
              updateScroll = true;
            } else {
              offset = activeLi.position - that.sizeInfo.menuInnerHeight; // if the option is already visible at the current scroll position, just keep it the same

              updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
            }

            liActive = that.selectpicker.main.elements[searchMatch];
            liActive.classList.add('active');
            if (liActive.firstChild) liActive.firstChild.classList.add('active');
            that.activeIndex = matches[matchIndex];
            liActive.firstChild.focus();
            if (updateScroll) that.$menuInner[0].scrollTop = offset;
            $this.trigger('focus');
          }
        } // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.


        if (isActive && (e.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory || e.which === keyCodes.ENTER || e.which === keyCodes.TAB && that.options.selectOnTab)) {
          if (e.which !== keyCodes.SPACE) e.preventDefault();

          if (!that.options.liveSearch || e.which !== keyCodes.SPACE) {
            that.$menuInner.find('.active a').trigger('click', true); // retain active class

            $this.trigger('focus');

            if (!that.options.liveSearch) {
              // Prevent screen from scrolling if the user hits the spacebar
              e.preventDefault(); // Fixes spacebar selection of dropdown items in FF & IE

              $(document).data('spaceSelect', true);
            }
          }
        }
      },
      mobile: function mobile() {
        this.$element[0].classList.add('mobile-device');
      },
      refresh: function refresh() {
        // update options if data attributes have been changed
        var config = $.extend({}, this.options, this.$element.data());
        this.options = config;
        this.checkDisabled();
        this.setStyle();
        this.render();
        this.createLi();
        this.setWidth();
        this.setSize(true);
        this.$element.trigger('refreshed' + EVENT_KEY);
      },
      hide: function hide() {
        this.$newElement.hide();
      },
      show: function show() {
        this.$newElement.show();
      },
      remove: function remove() {
        this.$newElement.remove();
        this.$element.remove();
      },
      destroy: function destroy() {
        this.$newElement.before(this.$element).remove();

        if (this.$bsContainer) {
          this.$bsContainer.remove();
        } else {
          this.$menu.remove();
        }

        this.$element.off(EVENT_KEY).removeData('selectpicker').removeClass('bs-select-hidden selectpicker');
        $(window).off(EVENT_KEY + '.' + this.selectId);
      }
    }; // SELECTPICKER PLUGIN DEFINITION
    // ==============================

    function Plugin(option) {
      // get the args of the outer function..
      var args = arguments; // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
      // to get lost/corrupted in android 2.3 and IE9 #715 #775

      var _option = option;
      [].shift.apply(args); // if the version was not set successfully

      if (!version.success) {
        // try to retreive it again
        try {
          version.full = ($.fn.dropdown.Constructor.VERSION || '').split(' ')[0].split('.');
        } catch (err) {
          // fall back to use BootstrapVersion if set
          if (Selectpicker.BootstrapVersion) {
            version.full = Selectpicker.BootstrapVersion.split(' ')[0].split('.');
          } else {
            version.full = [version.major, '0', '0'];
            console.warn('There was an issue retrieving Bootstrap\'s version. ' + 'Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. ' + 'If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.', err);
          }
        }

        version.major = version.full[0];
        version.success = true;
      }

      if (version.major === '4') {
        // some defaults need to be changed if using Bootstrap 4
        // check to see if they have already been manually changed before forcing them to update
        var toUpdate = [];
        if (Selectpicker.DEFAULTS.style === classNames.BUTTONCLASS) toUpdate.push({
          name: 'style',
          className: 'BUTTONCLASS'
        });
        if (Selectpicker.DEFAULTS.iconBase === classNames.ICONBASE) toUpdate.push({
          name: 'iconBase',
          className: 'ICONBASE'
        });
        if (Selectpicker.DEFAULTS.tickIcon === classNames.TICKICON) toUpdate.push({
          name: 'tickIcon',
          className: 'TICKICON'
        });
        classNames.DIVIDER = 'dropdown-divider';
        classNames.SHOW = 'show'; // classNames.BUTTONCLASS = 'btn-light';

        classNames.BUTTONCLASS = 'btn-bootstrap-select';
        classNames.POPOVERHEADER = 'popover-header';
        classNames.ICONBASE = '';
        classNames.TICKICON = 'bs-ok-default';

        for (var i = 0; i < toUpdate.length; i++) {
          var option = toUpdate[i];
          Selectpicker.DEFAULTS[option.name] = classNames[option.className];
        }
      }

      var value;
      var chain = this.each(function () {
        var $this = $(this);

        if ($this.is('select')) {
          var data = $this.data('selectpicker'),
              options = typeof _option == 'object' && _option;

          if (!data) {
            var dataAttributes = $this.data();

            for (var dataAttr in dataAttributes) {
              if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
                delete dataAttributes[dataAttr];
              }
            }

            var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, dataAttributes, options);
            config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, dataAttributes.template, options.template);
            $this.data('selectpicker', data = new Selectpicker(this, config));
          } else if (options) {
            for (var i in options) {
              if (options.hasOwnProperty(i)) {
                data.options[i] = options[i];
              }
            }
          }

          if (typeof _option == 'string') {
            if (data[_option] instanceof Function) {
              value = data[_option].apply(data, args);
            } else {
              value = data.options[_option];
            }
          }
        }
      });

      if (typeof value !== 'undefined') {
        // noinspection JSUnusedAssignment
        return value;
      } else {
        return chain;
      }
    }

    var old = $.fn.selectpicker;
    $.fn.selectpicker = Plugin;
    $.fn.selectpicker.Constructor = Selectpicker; // SELECTPICKER NO CONFLICT
    // ========================

    $.fn.selectpicker.noConflict = function () {
      $.fn.selectpicker = old;
      return this;
    };

    $(document).off('keydown.bs.dropdown.data-api').on('keydown' + EVENT_KEY, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', Selectpicker.prototype.keydown).on('focusin.modal', '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', function (e) {
      e.stopPropagation();
    }); // SELECTPICKER DATA-API
    // =====================

    $(window).on('load' + EVENT_KEY + '.data-api', function () {
      $('.selectpicker').each(function () {
        var $selectpicker = $(this);
        Plugin.call($selectpicker, $selectpicker.data());
      });
    });
  })(jQuery);

  var bootstrapSelect = 'BootstrapSelect';

  /**
   * Bootstrap select ajax
   * @package bootstrap-select-ajax
   * @version 0.0.2
   */
  +function ($) {

    var Plugin;
    Plugin = {
      hs: function hs(val) {
        return val.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      },
      skipKeys: [9, 13, 16, 17, 18, 27, 37, 38, 39, 40, 91],
      clearSOption: function clearSOption(select, refresh) {
        var options = select.find('option');

        for (var i = 0; i < options.length; i++) {
          var option = options[i];
          var $option = $(option);
          if (option.selected || $option.hasClass('bs-title-option')) continue;
          var parent = $option.parent();
          $option.remove();
          if (parent.get(0).tagName.toLowerCase() !== 'optgroup') continue;
          if (!parent.children().length) parent.remove();
        }

        if (refresh) select.selectpicker('refresh');
      },
      callAjax: function callAjax(qValue, callback, el, ajaxURL, qName, qData) {
        ajaxURL += /\?/.test(ajaxURL) ? '&' : '?';
        ajaxURL += qName + '=' + encodeURI(qValue);
        $.ajax({
          url: ajaxURL,
          data: qData,
          success: callback
        });
      },
      fillSOptions: function fillSOptions(select, options, refresh) {
        var existsValues = [];
        var existsChilds = select.find('option');

        for (var i = 0; i < existsChilds.length; i++) {
          existsValues.push(existsChilds[i].value);
        } // TODO
        // make this readable by human


        for (var val in options) {
          var opts = options[val];
          var val_sf = Plugin.hs(val);

          if (typeof opts === 'object') {
            var optgroup = select.children('optgroup[label="' + val_sf + '"]');

            if (!optgroup.get(0)) {
              optgroup = $('<optgroup label="' + val_sf + '"></optgroup>');
              select.append(optgroup);
            }

            for (var oval in opts) {
              if (!~existsValues.indexOf(oval)) {
                var oval_sf = Plugin.hs(oval);
                var opts_val_sf = Plugin.hs(opts[oval]);
                optgroup.append('<option value="' + oval_sf + '">' + opts_val_sf + '</option>');
                existsValues.push(oval);
              }
            }
          } else if (!~existsValues.indexOf(val)) {
            var opts_sf = Plugin.hs(opts);
            select.append('<option value="' + val_sf + '">' + opts_sf + '</option>');
            existsValues.push(val);
          }
        }

        if (refresh) select.selectpicker('refresh');
      },
      applyAjaxIdentity: function applyAjaxIdentity($this, options) {
        $this.selectpicker({
          liveSearch: true
        });
        var picker = $this.data('selectpicker');
        var ajaxTimer = null;
        var ajaxCKey = '';

        if (options) {
          if (typeof options === 'string') $this.data('selectpicker').options.ajax = options;else {
            for (var k in options) {
              $this.data('selectpicker').options[k] = options[k];
            }
          }
        }

        picker.options.noneResultsTextOriginal = picker.options.noneResultsText;
        picker.options.noneResultsText = '';
        if (picker.options.ajaxBinded) return;
        picker.options.ajaxBinded = true;
        picker.$searchbox.on('keyup paste change', function (e) {
          if (~Plugin.skipKeys.indexOf(e.keyCode)) return;
          var $input = $(this);
          var qValue = $input.val().trim();
          if (ajaxCKey == qValue) return;
          if (ajaxTimer) clearTimeout(ajaxTimer); // remove all unselected options if query is empty

          if (!qValue) {
            ajaxCKey = qValue;
            return Plugin.clearSOption($this, true);
          }

          ajaxCKey = qValue;
          var delay = $this.data('selectpicker').options.ajaxDelay || 300;
          ajaxTimer = setTimeout(function ($this, picker, qValue) {
            if (qValue != ajaxCKey) return;
            var qName = picker.options.ajaxQName || 'q';
            var qData = picker.options.data;
            (picker.options.ajaxCallback || Plugin.callAjax)(qValue, function (res) {
              if (qValue != ajaxCKey) return;
              if (picker.options.ajaxPreProcess) res = picker.options.ajaxPreProcess(res);
              Plugin.clearSOption($this);
              Plugin.fillSOptions($this, res, true);
            }, $this.get(0), picker.options.ajax, qName, qData);
          }, delay, $this, picker, qValue);
        });
      }
    };
    $('.selectpicker[data-ajax]').each(function () {
      Plugin.applyAjaxIdentity($(this));
    });

    $.fn.selectpickerAjax = function (options) {
      this.each(function () {
        Plugin.applyAjaxIdentity($(this), options);
      });
    };
  }($);
  var bootstrapSelectAjax = 'bootstrapSelectAjax';

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'confirm';
  var VERSION$1 = '0.0.1';
  var DATA_KEY$1 = 'bs.confirm';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var Default$1 = {
    title: 'Confirmation',
    text: 'Are you sure want to do the action?',
    ask: false,
    btnConfirm: 'Yes',
    btnType: 'primary',
    btnCancel: 'Cancel'
  };
  var DefaultType$1 = {
    title: 'string',
    text: 'string',
    ask: 'boolean',
    btnConfirm: 'string',
    btnType: 'string',
    btnCancel: 'string'
  };
  var Event$2 = {
    MODAL_HIDDEN: 'hidden.bs.modal',
    SUBMIT_DATA_API: "submit" + EVENT_KEY$1 + DATA_API_KEY$1,
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    ACCEPT_DATA_API: "click.modal." + EVENT_KEY$1 + DATA_API_KEY$1,
    FORM_SUBMIT: 'submit',
    A_CLICK: 'click'
  };
  var Selector = {
    DATA_TOGGLE: '[data-toggle="confirm"]',
    MODAL_ACCEPTER: '[data-accept="confirm"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Confirm =
  /*#__PURE__*/
  function () {
    function Confirm(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._modal = null;
      this._isConfirmed = null;
      this._tagName = element.tagName.toUpperCase();
      this._eventType = this._tagName == 'A' ? Event$2.CLICK_DATA_API : Event$2.SUBMIT_DATA_API;
      this._execEvent = this._tagName == 'A' ? Event$2.A_CLICK : Event$2.FORM_SUBMIT;
      this._isShown = false;

      this._addElementListener();
    } // Getters


    var _proto = Confirm.prototype;

    // Public
    _proto.ask = function ask(el, event) {
      if (this._isConfirmed) return;
      this._isConfirmed = false;
      if (event) event.preventDefault();

      this._showModal();
    };

    _proto.cancel = function cancel() {
      this._isConfirmed = false;
      if (this._modal) $(this._modal).modal('hide');
    };

    _proto.dispose = function dispose() {
      [window, this._element].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$1);
      });
      $.removeData(this._element, DATA_KEY$1);
      this._config = null;
      this._element = null;
      this._modal = null;
      this._isConfirmed = null;
      this._tagName = null;
      this._eventType = null;
      this._isShown = null;
    } // Private
    ;

    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      if (this._tagName === 'FORM' || !this._element.dataset.toggle) {
        $(this._element).on(this._eventType, function (event) {
          _this.ask(_this, event);
        });
      }
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      Util.typeCheckConfig(NAME$1, config, DefaultType$1);
      return config;
    };

    _proto._showModal = function _showModal() {
      var _this2 = this;

      var tx = "\n            <div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog\" role=\"document\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <h5 class=\"modal-title\">" + this._config.title + "</h5>\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                        </div>\n                        <div class=\"modal-body\">\n                            <p>" + this._config.text + "</p>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">" + this._config.btnCancel + "</button>\n                            <button type=\"button\" class=\"btn btn-" + this._config.btnType + "\" data-accept=\"confirm\">" + this._config.btnConfirm + "</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
      this._modal = $(tx).appendTo(document.body).get(0);
      $(this._modal).on(Event$2.MODAL_HIDDEN, function () {
        _this2._isConfirmed = false;
        $(_this2._modal).remove();
      });
      $(this._modal).on(Event$2.ACCEPT_DATA_API, Selector.MODAL_ACCEPTER, function () {
        _this2._isConfirmed = true;

        _this2._element[_this2._execEvent]();

        _this2.cancel();
      });
      $(this._modal).modal('show');
    } // Static
    ;

    Confirm._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        var _config = _objectSpread({}, Default$1, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Confirm(this, _config);
          $(this).data(DATA_KEY$1, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.ask) {
          data.ask(relatedTarget);
        }
      });
    };

    _createClass(Confirm, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Confirm;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var data = $(this).data(DATA_KEY$1);

    if (!data) {
      var target = this;
      var config = $(target).data(DATA_KEY$1) ? 'ask' : _objectSpread({}, $(target).data(), $(this).data(), {
        ask: true
      });
      event.preventDefault();

      Confirm._jQueryInterface.call($(target), config, this);
    } else {
      data.ask(this, event);
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Confirm._jQueryInterface;
  $.fn[NAME$1].Constructor = Confirm;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Confirm._jQueryInterface;
  };

  /*! version : 4.17.47
   =========================================================
   bootstrap-datetimejs
   https://github.com/Eonasdan/bootstrap-datetimepicker
   Copyright (c) 2015 Jonathan Peterson
   =========================================================
   */

  (function (factory) {

    factory($, moment);
  })(function ($, moment) {

    if (!moment) {
      throw new Error('bootstrap-datetimepicker requires Moment.js to be loaded first');
    }

    var dateTimePicker = function dateTimePicker(element, options) {
      var picker = {},
          date,
          viewDate,
          unset = true,
          input,
          component = false,
          widget = false,
          use24Hours,
          minViewModeNumber = 0,
          actualFormat,
          parseFormats,
          currentViewMode,
          datePickerModes = [{
        clsName: 'days',
        navFnc: 'M',
        navStep: 1
      }, {
        clsName: 'months',
        navFnc: 'y',
        navStep: 1
      }, {
        clsName: 'years',
        navFnc: 'y',
        navStep: 10
      }, {
        clsName: 'decades',
        navFnc: 'y',
        navStep: 100
      }],
          viewModes = ['days', 'months', 'years', 'decades'],
          verticalModes = ['top', 'bottom', 'auto'],
          horizontalModes = ['left', 'right', 'auto'],
          toolbarPlacements = ['default', 'top', 'bottom'],
          keyMap = {
        'up': 38,
        38: 'up',
        'down': 40,
        40: 'down',
        'left': 37,
        37: 'left',
        'right': 39,
        39: 'right',
        'tab': 9,
        9: 'tab',
        'escape': 27,
        27: 'escape',
        'enter': 13,
        13: 'enter',
        'pageUp': 33,
        33: 'pageUp',
        'pageDown': 34,
        34: 'pageDown',
        'shift': 16,
        16: 'shift',
        'control': 17,
        17: 'control',
        'space': 32,
        32: 'space',
        't': 84,
        84: 't',
        'delete': 46,
        46: 'delete'
      },
          keyState = {},

      /********************************************************************************
       *
       * Private functions
       *
       ********************************************************************************/
      hasTimeZone = function hasTimeZone() {
        return moment.tz !== undefined && options.timeZone !== undefined && options.timeZone !== null && options.timeZone !== '';
      },
          getMoment = function getMoment(d) {
        var returnMoment;

        if (d === undefined || d === null) {
          returnMoment = moment(); //TODO should this use format? and locale?
        } else if (moment.isDate(d) || moment.isMoment(d)) {
          // If the date that is passed in is already a Date() or moment() object,
          // pass it directly to moment.
          returnMoment = moment(d);
        } else if (hasTimeZone()) {
          // There is a string to parse and a default time zone
          // parse with the tz function which takes a default time zone if it is not in the format string
          returnMoment = moment.tz(d, parseFormats, options.useStrict, options.timeZone);
        } else {
          returnMoment = moment(d, parseFormats, options.useStrict);
        }

        if (hasTimeZone()) {
          returnMoment.tz(options.timeZone);
        }

        return returnMoment;
      },
          isEnabled = function isEnabled(granularity) {
        if (typeof granularity !== 'string' || granularity.length > 1) {
          throw new TypeError('isEnabled expects a single character string parameter');
        }

        switch (granularity) {
          case 'y':
            return actualFormat.indexOf('Y') !== -1;

          case 'M':
            return actualFormat.indexOf('M') !== -1;

          case 'd':
            return actualFormat.toLowerCase().indexOf('d') !== -1;

          case 'h':
          case 'H':
            return actualFormat.toLowerCase().indexOf('h') !== -1;

          case 'm':
            return actualFormat.indexOf('m') !== -1;

          case 's':
            return actualFormat.indexOf('s') !== -1;

          default:
            return false;
        }
      },
          hasTime = function hasTime() {
        return isEnabled('h') || isEnabled('m') || isEnabled('s');
      },
          hasDate = function hasDate() {
        return isEnabled('y') || isEnabled('M') || isEnabled('d');
      },
          getDatePickerTemplate = function getDatePickerTemplate() {
        var headTemplate = $('<thead>').append($('<tr>').append($('<th>').addClass('prev').attr('data-action', 'previous').append($('<i>').addClass(options.icons.previous))).append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', options.calendarWeeks ? '6' : '5')).append($('<th>').addClass('next').attr('data-action', 'next').append($('<i>').addClass(options.icons.next)))),
            contTemplate = $('<tbody>').append($('<tr>').append($('<td>').attr('colspan', options.calendarWeeks ? '8' : '7')));
        return [$('<div>').addClass('datepicker-days').append($('<table>').addClass('table-condensed').append(headTemplate).append($('<tbody>'))), $('<div>').addClass('datepicker-months').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-years').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone())), $('<div>').addClass('datepicker-decades').append($('<table>').addClass('table-condensed').append(headTemplate.clone()).append(contTemplate.clone()))];
      },
          getTimePickerMainTemplate = function getTimePickerMainTemplate() {
        var topRow = $('<tr>'),
            middleRow = $('<tr>'),
            bottomRow = $('<tr>');

        if (isEnabled('h')) {
          topRow.append($('<td>').append($('<a>').attr({
            href: '#',
            tabindex: '-1',
            'title': options.tooltips.incrementHour
          }).addClass('btn').attr('data-action', 'incrementHours').append($('<i>').addClass(options.icons.up))));
          middleRow.append($('<td>').append($('<span>').addClass('timepicker-hour').attr({
            'data-time-component': 'hours',
            'title': options.tooltips.pickHour
          }).attr('data-action', 'showHours')));
          bottomRow.append($('<td>').append($('<a>').attr({
            href: '#',
            tabindex: '-1',
            'title': options.tooltips.decrementHour
          }).addClass('btn').attr('data-action', 'decrementHours').append($('<i>').addClass(options.icons.down))));
        }

        if (isEnabled('m')) {
          if (isEnabled('h')) {
            topRow.append($('<td>').addClass('separator'));
            middleRow.append($('<td>').addClass('separator').html(':'));
            bottomRow.append($('<td>').addClass('separator'));
          }

          topRow.append($('<td>').append($('<a>').attr({
            href: '#',
            tabindex: '-1',
            'title': options.tooltips.incrementMinute
          }).addClass('btn').attr('data-action', 'incrementMinutes').append($('<i>').addClass(options.icons.up))));
          middleRow.append($('<td>').append($('<span>').addClass('timepicker-minute').attr({
            'data-time-component': 'minutes',
            'title': options.tooltips.pickMinute
          }).attr('data-action', 'showMinutes')));
          bottomRow.append($('<td>').append($('<a>').attr({
            href: '#',
            tabindex: '-1',
            'title': options.tooltips.decrementMinute
          }).addClass('btn').attr('data-action', 'decrementMinutes').append($('<i>').addClass(options.icons.down))));
        }

        if (isEnabled('s')) {
          if (isEnabled('m')) {
            topRow.append($('<td>').addClass('separator'));
            middleRow.append($('<td>').addClass('separator').html(':'));
            bottomRow.append($('<td>').addClass('separator'));
          }

          topRow.append($('<td>').append($('<a>').attr({
            href: '#',
            tabindex: '-1',
            'title': options.tooltips.incrementSecond
          }).addClass('btn').attr('data-action', 'incrementSeconds').append($('<i>').addClass(options.icons.up))));
          middleRow.append($('<td>').append($('<span>').addClass('timepicker-second').attr({
            'data-time-component': 'seconds',
            'title': options.tooltips.pickSecond
          }).attr('data-action', 'showSeconds')));
          bottomRow.append($('<td>').append($('<a>').attr({
            href: '#',
            tabindex: '-1',
            'title': options.tooltips.decrementSecond
          }).addClass('btn').attr('data-action', 'decrementSeconds').append($('<i>').addClass(options.icons.down))));
        }

        if (!use24Hours) {
          topRow.append($('<td>').addClass('separator'));
          middleRow.append($('<td>').append($('<button>').addClass('btn btn-primary').attr({
            'data-action': 'togglePeriod',
            tabindex: '-1',
            'title': options.tooltips.togglePeriod
          })));
          bottomRow.append($('<td>').addClass('separator'));
        }

        return $('<div>').addClass('timepicker-picker').append($('<table>').addClass('table-condensed').append([topRow, middleRow, bottomRow]));
      },
          getTimePickerTemplate = function getTimePickerTemplate() {
        var hoursView = $('<div>').addClass('timepicker-hours').append($('<table>').addClass('table-condensed')),
            minutesView = $('<div>').addClass('timepicker-minutes').append($('<table>').addClass('table-condensed')),
            secondsView = $('<div>').addClass('timepicker-seconds').append($('<table>').addClass('table-condensed')),
            ret = [getTimePickerMainTemplate()];

        if (isEnabled('h')) {
          ret.push(hoursView);
        }

        if (isEnabled('m')) {
          ret.push(minutesView);
        }

        if (isEnabled('s')) {
          ret.push(secondsView);
        }

        return ret;
      },
          getToolbar = function getToolbar() {
        var row = [];

        if (options.showTodayButton) {
          row.push($('<td>').append($('<a>').attr({
            'data-action': 'today',
            'title': options.tooltips.today
          }).append($('<i>').addClass(options.icons.today))));
        }

        if (!options.sideBySide && hasDate() && hasTime()) {
          row.push($('<td>').append($('<a>').attr({
            'data-action': 'togglePicker',
            'title': options.tooltips.selectTime
          }).append($('<i>').addClass(options.icons.time))));
        }

        if (options.showClear) {
          row.push($('<td>').append($('<a>').attr({
            'data-action': 'clear',
            'title': options.tooltips.clear
          }).append($('<i>').addClass(options.icons.clear))));
        }

        if (options.showClose) {
          row.push($('<td>').append($('<a>').attr({
            'data-action': 'close',
            'title': options.tooltips.close
          }).append($('<i>').addClass(options.icons.close))));
        }

        return $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
      },
          getTemplate = function getTemplate() {
        var template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'),
            dateView = $('<div>').addClass('datepicker').append(getDatePickerTemplate()),
            timeView = $('<div>').addClass('timepicker').append(getTimePickerTemplate()),
            content = $('<ul>').addClass('list-unstyled'),
            toolbar = $('<li>').addClass('picker-switch' + (options.collapse ? ' accordion-toggle' : '')).append(getToolbar());

        if (options.inline) {
          template.removeClass('dropdown-menu');
        }

        if (use24Hours) {
          template.addClass('usetwentyfour');
        }

        if (isEnabled('s') && !use24Hours) {
          template.addClass('wider');
        }

        if (options.sideBySide && hasDate() && hasTime()) {
          template.addClass('timepicker-sbs');

          if (options.toolbarPlacement === 'top') {
            template.append(toolbar);
          }

          template.append($('<div>').addClass('row').append(dateView.addClass('col-md-6')).append(timeView.addClass('col-md-6')));

          if (options.toolbarPlacement === 'bottom') {
            template.append(toolbar);
          }

          return template;
        }

        if (options.toolbarPlacement === 'top') {
          content.append(toolbar);
        }

        if (hasDate()) {
          content.append($('<li>').addClass(options.collapse && hasTime() ? 'collapse show' : '').append(dateView));
        }

        if (options.toolbarPlacement === 'default') {
          content.append(toolbar);
        }

        if (hasTime()) {
          content.append($('<li>').addClass(options.collapse && hasDate() ? 'collapse' : '').append(timeView));
        }

        if (options.toolbarPlacement === 'bottom') {
          content.append(toolbar);
        }

        return template.append(content);
      },
          dataToOptions = function dataToOptions() {
        var eData,
            dataOptions = {};

        if (element.is('input') || options.inline) {
          eData = element.data();
        } else {
          eData = element.find('input').data();
        }

        if (eData.dateOptions && eData.dateOptions instanceof Object) {
          dataOptions = $.extend(true, dataOptions, eData.dateOptions);
        }

        $.each(options, function (key) {
          var attributeName = 'date' + key.charAt(0).toUpperCase() + key.slice(1);

          if (eData[attributeName] !== undefined) {
            dataOptions[key] = eData[attributeName];
          }
        });
        return dataOptions;
      },
          place = function place() {
        var position = (component || element).position(),
            offset = (component || element).offset(),
            vertical = options.widgetPositioning.vertical,
            horizontal = options.widgetPositioning.horizontal,
            parent;

        if (options.widgetParent) {
          parent = options.widgetParent.append(widget);
        } else if (element.is('input')) {
          parent = element.after(widget).parent();
        } else if (options.inline) {
          parent = element.append(widget);
          return;
        } else {
          parent = element;
          element.children().first().after(widget);
        } // Top and bottom logic


        if (vertical === 'auto') {
          if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() && widget.height() + element.outerHeight() < offset.top) {
            vertical = 'top';
          } else {
            vertical = 'bottom';
          }
        } // Left and right logic


        if (horizontal === 'auto') {
          if (parent.width() < offset.left + widget.outerWidth() / 2 && offset.left + widget.outerWidth() > $(window).width()) {
            horizontal = 'right';
          } else {
            horizontal = 'left';
          }
        }

        if (vertical === 'top') {
          widget.addClass('top').removeClass('bottom');
        } else {
          widget.addClass('bottom').removeClass('top');
        }

        if (horizontal === 'right') {
          widget.addClass('pull-right');
        } else {
          widget.removeClass('pull-right');
        } // find the first parent element that has a non-static css positioning


        if (parent.css('position') === 'static') {
          parent = parent.parents().filter(function () {
            return $(this).css('position') !== 'static';
          }).first();
        }

        if (parent.length === 0) {
          throw new Error('datetimepicker component should be placed within a non-static positioned container');
        }

        widget.css({
          top: vertical === 'top' ? 'auto' : position.top + element.outerHeight(),
          bottom: vertical === 'top' ? parent.outerHeight() - (parent === element ? 0 : position.top) : 'auto',
          left: horizontal === 'left' ? parent === element ? 0 : position.left : 'auto',
          right: horizontal === 'left' ? 'auto' : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
        });
      },
          notifyEvent = function notifyEvent(e) {
        if (e.type === 'dp.change' && (e.date && e.date.isSame(e.oldDate) || !e.date && !e.oldDate)) {
          return;
        }

        element.trigger(e);
      },
          viewUpdate = function viewUpdate(e) {
        if (e === 'y') {
          e = 'YYYY';
        }

        notifyEvent({
          type: 'dp.update',
          change: e,
          viewDate: viewDate.clone()
        });
      },
          showMode = function showMode(dir) {
        if (!widget) {
          return;
        }

        if (dir) {
          currentViewMode = Math.max(minViewModeNumber, Math.min(3, currentViewMode + dir));
        }

        widget.find('.datepicker > div').hide().filter('.datepicker-' + datePickerModes[currentViewMode].clsName).show();
      },
          fillDow = function fillDow() {
        var row = $('<tr>'),
            currentDate = viewDate.clone().startOf('w').startOf('d');

        if (options.calendarWeeks === true) {
          row.append($('<th>').addClass('cw').text('#'));
        }

        while (currentDate.isBefore(viewDate.clone().endOf('w'))) {
          row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
          currentDate.add(1, 'd');
        }

        widget.find('.datepicker-days thead').append(row);
      },
          isInDisabledDates = function isInDisabledDates(testDate) {
        return options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
      },
          isInEnabledDates = function isInEnabledDates(testDate) {
        return options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
      },
          isInDisabledHours = function isInDisabledHours(testDate) {
        return options.disabledHours[testDate.format('H')] === true;
      },
          isInEnabledHours = function isInEnabledHours(testDate) {
        return options.enabledHours[testDate.format('H')] === true;
      },
          isValid = function isValid(targetMoment, granularity) {
        if (!targetMoment.isValid()) {
          return false;
        }

        if (options.disabledDates && granularity === 'd' && isInDisabledDates(targetMoment)) {
          return false;
        }

        if (options.enabledDates && granularity === 'd' && !isInEnabledDates(targetMoment)) {
          return false;
        }

        if (options.minDate && targetMoment.isBefore(options.minDate, granularity)) {
          return false;
        }

        if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity)) {
          return false;
        }

        if (options.daysOfWeekDisabled && granularity === 'd' && options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
          return false;
        }

        if (options.disabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && isInDisabledHours(targetMoment)) {
          return false;
        }

        if (options.enabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && !isInEnabledHours(targetMoment)) {
          return false;
        }

        if (options.disabledTimeIntervals && (granularity === 'h' || granularity === 'm' || granularity === 's')) {
          var found = false;
          $.each(options.disabledTimeIntervals, function () {
            if (targetMoment.isBetween(this[0], this[1])) {
              found = true;
              return false;
            }
          });

          if (found) {
            return false;
          }
        }

        return true;
      },
          fillMonths = function fillMonths() {
        var spans = [],
            monthsShort = viewDate.clone().startOf('y').startOf('d');

        while (monthsShort.isSame(viewDate, 'y')) {
          spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
          monthsShort.add(1, 'M');
        }

        widget.find('.datepicker-months td').empty().append(spans);
      },
          updateMonths = function updateMonths() {
        var monthsView = widget.find('.datepicker-months'),
            monthsViewHeader = monthsView.find('th'),
            months = monthsView.find('tbody').find('span');
        monthsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevYear);
        monthsViewHeader.eq(1).attr('title', options.tooltips.selectYear);
        monthsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextYear);
        monthsView.find('.disabled').removeClass('disabled');

        if (!isValid(viewDate.clone().subtract(1, 'y'), 'y')) {
          monthsViewHeader.eq(0).addClass('disabled');
        }

        monthsViewHeader.eq(1).text(viewDate.year());

        if (!isValid(viewDate.clone().add(1, 'y'), 'y')) {
          monthsViewHeader.eq(2).addClass('disabled');
        }

        months.removeClass('active');

        if (date.isSame(viewDate, 'y') && !unset) {
          months.eq(date.month()).addClass('active');
        }

        months.each(function (index) {
          if (!isValid(viewDate.clone().month(index), 'M')) {
            $(this).addClass('disabled');
          }
        });
      },
          updateYears = function updateYears() {
        var yearsView = widget.find('.datepicker-years'),
            yearsViewHeader = yearsView.find('th'),
            startYear = viewDate.clone().subtract(5, 'y'),
            endYear = viewDate.clone().add(6, 'y'),
            html = '';
        yearsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevDecade);
        yearsViewHeader.eq(1).attr('title', options.tooltips.selectDecade);
        yearsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextDecade);
        yearsView.find('.disabled').removeClass('disabled');

        if (options.minDate && options.minDate.isAfter(startYear, 'y')) {
          yearsViewHeader.eq(0).addClass('disabled');
        }

        yearsViewHeader.eq(1).text(startYear.year() + '-' + endYear.year());

        if (options.maxDate && options.maxDate.isBefore(endYear, 'y')) {
          yearsViewHeader.eq(2).addClass('disabled');
        }

        while (!startYear.isAfter(endYear, 'y')) {
          html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, 'y') && !unset ? ' active' : '') + (!isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';
          startYear.add(1, 'y');
        }

        yearsView.find('td').html(html);
      },
          updateDecades = function updateDecades() {
        var decadesView = widget.find('.datepicker-decades'),
            decadesViewHeader = decadesView.find('th'),
            startDecade = moment({
          y: viewDate.year() - viewDate.year() % 100 - 1
        }),
            endDecade = startDecade.clone().add(100, 'y'),
            startedAt = startDecade.clone(),
            minDateDecade = false,
            maxDateDecade = false,
            endDecadeYear,
            html = '';
        decadesViewHeader.eq(0).find('span').attr('title', options.tooltips.prevCentury);
        decadesViewHeader.eq(2).find('span').attr('title', options.tooltips.nextCentury);
        decadesView.find('.disabled').removeClass('disabled');

        if (startDecade.isSame(moment({
          y: 1900
        })) || options.minDate && options.minDate.isAfter(startDecade, 'y')) {
          decadesViewHeader.eq(0).addClass('disabled');
        }

        decadesViewHeader.eq(1).text(startDecade.year() + '-' + endDecade.year());

        if (startDecade.isSame(moment({
          y: 2000
        })) || options.maxDate && options.maxDate.isBefore(endDecade, 'y')) {
          decadesViewHeader.eq(2).addClass('disabled');
        }

        while (!startDecade.isAfter(endDecade, 'y')) {
          endDecadeYear = startDecade.year() + 12;
          minDateDecade = options.minDate && options.minDate.isAfter(startDecade, 'y') && options.minDate.year() <= endDecadeYear;
          maxDateDecade = options.maxDate && options.maxDate.isAfter(startDecade, 'y') && options.maxDate.year() <= endDecadeYear;
          html += '<span data-action="selectDecade" class="decade' + (date.isAfter(startDecade) && date.year() <= endDecadeYear ? ' active' : '') + (!isValid(startDecade, 'y') && !minDateDecade && !maxDateDecade ? ' disabled' : '') + '" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() + 1) + ' - ' + (startDecade.year() + 12) + '</span>';
          startDecade.add(12, 'y');
        }

        html += '<span></span><span></span><span></span>'; //push the dangling block over, at least this way it's even

        decadesView.find('td').html(html);
        decadesViewHeader.eq(1).text(startedAt.year() + 1 + '-' + startDecade.year());
      },
          fillDate = function fillDate() {
        var daysView = widget.find('.datepicker-days'),
            daysViewHeader = daysView.find('th'),
            currentDate,
            html = [],
            row,
            clsNames = [],
            i;

        if (!hasDate()) {
          return;
        }

        daysViewHeader.eq(0).find('span').attr('title', options.tooltips.prevMonth);
        daysViewHeader.eq(1).attr('title', options.tooltips.selectMonth);
        daysViewHeader.eq(2).find('span').attr('title', options.tooltips.nextMonth);
        daysView.find('.disabled').removeClass('disabled');
        daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat));

        if (!isValid(viewDate.clone().subtract(1, 'M'), 'M')) {
          daysViewHeader.eq(0).addClass('disabled');
        }

        if (!isValid(viewDate.clone().add(1, 'M'), 'M')) {
          daysViewHeader.eq(2).addClass('disabled');
        }

        currentDate = viewDate.clone().startOf('M').startOf('w').startOf('d');

        for (i = 0; i < 42; i++) {
          //always display 42 days (should show 6 weeks)
          if (currentDate.weekday() === 0) {
            row = $('<tr>');

            if (options.calendarWeeks) {
              row.append('<td class="cw">' + currentDate.week() + '</td>');
            }

            html.push(row);
          }

          clsNames = ['day'];

          if (currentDate.isBefore(viewDate, 'M')) {
            clsNames.push('old');
          }

          if (currentDate.isAfter(viewDate, 'M')) {
            clsNames.push('new');
          }

          if (currentDate.isSame(date, 'd') && !unset) {
            clsNames.push('active');
          }

          if (!isValid(currentDate, 'd')) {
            clsNames.push('disabled');
          }

          if (currentDate.isSame(getMoment(), 'd')) {
            clsNames.push('today');
          }

          if (currentDate.day() === 0 || currentDate.day() === 6) {
            clsNames.push('weekend');
          }

          notifyEvent({
            type: 'dp.classify',
            date: currentDate,
            classNames: clsNames
          });
          row.append('<td data-action="selectDay" data-day="' + currentDate.format('L') + '" class="' + clsNames.join(' ') + '">' + currentDate.date() + '</td>');
          currentDate.add(1, 'd');
        }

        daysView.find('tbody').empty().append(html);
        updateMonths();
        updateYears();
        updateDecades();
      },
          fillHours = function fillHours() {
        var table = widget.find('.timepicker-hours table'),
            currentHour = viewDate.clone().startOf('d'),
            html = [],
            row = $('<tr>');

        if (viewDate.hour() > 11 && !use24Hours) {
          currentHour.hour(12);
        }

        while (currentHour.isSame(viewDate, 'd') && (use24Hours || viewDate.hour() < 12 && currentHour.hour() < 12 || viewDate.hour() > 11)) {
          if (currentHour.hour() % 4 === 0) {
            row = $('<tr>');
            html.push(row);
          }

          row.append('<td data-action="selectHour" class="hour' + (!isValid(currentHour, 'h') ? ' disabled' : '') + '">' + currentHour.format(use24Hours ? 'HH' : 'hh') + '</td>');
          currentHour.add(1, 'h');
        }

        table.empty().append(html);
      },
          fillMinutes = function fillMinutes() {
        var table = widget.find('.timepicker-minutes table'),
            currentMinute = viewDate.clone().startOf('h'),
            html = [],
            row = $('<tr>'),
            step = options.stepping === 1 ? 5 : options.stepping;

        while (viewDate.isSame(currentMinute, 'h')) {
          if (currentMinute.minute() % (step * 4) === 0) {
            row = $('<tr>');
            html.push(row);
          }

          row.append('<td data-action="selectMinute" class="minute' + (!isValid(currentMinute, 'm') ? ' disabled' : '') + '">' + currentMinute.format('mm') + '</td>');
          currentMinute.add(step, 'm');
        }

        table.empty().append(html);
      },
          fillSeconds = function fillSeconds() {
        var table = widget.find('.timepicker-seconds table'),
            currentSecond = viewDate.clone().startOf('m'),
            html = [],
            row = $('<tr>');

        while (viewDate.isSame(currentSecond, 'm')) {
          if (currentSecond.second() % 20 === 0) {
            row = $('<tr>');
            html.push(row);
          }

          row.append('<td data-action="selectSecond" class="second' + (!isValid(currentSecond, 's') ? ' disabled' : '') + '">' + currentSecond.format('ss') + '</td>');
          currentSecond.add(5, 's');
        }

        table.empty().append(html);
      },
          fillTime = function fillTime() {
        var toggle,
            newDate,
            timeComponents = widget.find('.timepicker span[data-time-component]');

        if (!use24Hours) {
          toggle = widget.find('.timepicker [data-action=togglePeriod]');
          newDate = date.clone().add(date.hours() >= 12 ? -12 : 12, 'h');
          toggle.text(date.format('A'));

          if (isValid(newDate, 'h')) {
            toggle.removeClass('disabled');
          } else {
            toggle.addClass('disabled');
          }
        }

        timeComponents.filter('[data-time-component=hours]').text(date.format(use24Hours ? 'HH' : 'hh'));
        timeComponents.filter('[data-time-component=minutes]').text(date.format('mm'));
        timeComponents.filter('[data-time-component=seconds]').text(date.format('ss'));
        fillHours();
        fillMinutes();
        fillSeconds();
      },
          update = function update() {
        if (!widget) {
          return;
        }

        fillDate();
        fillTime();
      },
          setValue = function setValue(targetMoment) {
        var oldDate = unset ? null : date; // case of calling setValue(null or false)

        if (!targetMoment) {
          unset = true;
          input.val('');
          element.data('date', '');
          notifyEvent({
            type: 'dp.change',
            date: false,
            oldDate: oldDate
          });
          update();
          return;
        }

        targetMoment = targetMoment.clone().locale(options.locale);

        if (hasTimeZone()) {
          targetMoment.tz(options.timeZone);
        }

        if (options.stepping !== 1) {
          targetMoment.minutes(Math.round(targetMoment.minutes() / options.stepping) * options.stepping).seconds(0);

          while (options.minDate && targetMoment.isBefore(options.minDate)) {
            targetMoment.add(options.stepping, 'minutes');
          }
        }

        if (isValid(targetMoment)) {
          date = targetMoment;
          viewDate = date.clone();
          input.val(date.format(actualFormat));
          element.data('date', date.format(actualFormat));
          unset = false;
          update();
          notifyEvent({
            type: 'dp.change',
            date: date.clone(),
            oldDate: oldDate
          });
        } else {
          if (!options.keepInvalid) {
            input.val(unset ? '' : date.format(actualFormat));
          } else {
            notifyEvent({
              type: 'dp.change',
              date: targetMoment,
              oldDate: oldDate
            });
          }

          notifyEvent({
            type: 'dp.error',
            date: targetMoment,
            oldDate: oldDate
          });
        }
      },

      /**
       * Hides the widget. Possibly will emit dp.hide
       */
      hide = function hide() {
        var transitioning = false;

        if (!widget) {
          return picker;
        } // Ignore event if in the middle of a picker transition


        widget.find('.collapse').each(function () {
          var collapseData = $(this).data('collapse');

          if (collapseData && collapseData.transitioning) {
            transitioning = true;
            return false;
          }

          return true;
        });

        if (transitioning) {
          return picker;
        }

        if (component && component.hasClass('btn')) {
          component.toggleClass('active');
        }

        widget.hide();
        $(window).off('resize', place);
        widget.off('click', '[data-action]');
        widget.off('mousedown', false);
        widget.remove();
        widget = false;
        notifyEvent({
          type: 'dp.hide',
          date: date.clone()
        });
        input.blur();
        viewDate = date.clone();
        return picker;
      },
          clear = function clear() {
        setValue(null);
      },
          parseInputDate = function parseInputDate(inputDate) {
        if (options.parseInputDate === undefined) {
          if (!moment.isMoment(inputDate) || inputDate instanceof Date) {
            inputDate = getMoment(inputDate);
          }
        } else {
          inputDate = options.parseInputDate(inputDate);
        } //inputDate.locale(options.locale);


        return inputDate;
      },

      /********************************************************************************
       *
       * Widget UI interaction functions
       *
       ********************************************************************************/
      actions = {
        next: function next() {
          var navFnc = datePickerModes[currentViewMode].navFnc;
          viewDate.add(datePickerModes[currentViewMode].navStep, navFnc);
          fillDate();
          viewUpdate(navFnc);
        },
        previous: function previous() {
          var navFnc = datePickerModes[currentViewMode].navFnc;
          viewDate.subtract(datePickerModes[currentViewMode].navStep, navFnc);
          fillDate();
          viewUpdate(navFnc);
        },
        pickerSwitch: function pickerSwitch() {
          showMode(1);
        },
        selectMonth: function selectMonth(e) {
          var month = $(e.target).closest('tbody').find('span').index($(e.target));
          viewDate.month(month);

          if (currentViewMode === minViewModeNumber) {
            setValue(date.clone().year(viewDate.year()).month(viewDate.month()));

            if (!options.inline) {
              hide();
            }
          } else {
            showMode(-1);
            fillDate();
          }

          viewUpdate('M');
        },
        selectYear: function selectYear(e) {
          var year = parseInt($(e.target).text(), 10) || 0;
          viewDate.year(year);

          if (currentViewMode === minViewModeNumber) {
            setValue(date.clone().year(viewDate.year()));

            if (!options.inline) {
              hide();
            }
          } else {
            showMode(-1);
            fillDate();
          }

          viewUpdate('YYYY');
        },
        selectDecade: function selectDecade(e) {
          var year = parseInt($(e.target).data('selection'), 10) || 0;
          viewDate.year(year);

          if (currentViewMode === minViewModeNumber) {
            setValue(date.clone().year(viewDate.year()));

            if (!options.inline) {
              hide();
            }
          } else {
            showMode(-1);
            fillDate();
          }

          viewUpdate('YYYY');
        },
        selectDay: function selectDay(e) {
          var day = viewDate.clone();

          if ($(e.target).is('.old')) {
            day.subtract(1, 'M');
          }

          if ($(e.target).is('.new')) {
            day.add(1, 'M');
          }

          setValue(day.date(parseInt($(e.target).text(), 10)));

          if (!hasTime() && !options.keepOpen && !options.inline) {
            hide();
          }
        },
        incrementHours: function incrementHours() {
          var newDate = date.clone().add(1, 'h');

          if (isValid(newDate, 'h')) {
            setValue(newDate);
          }
        },
        incrementMinutes: function incrementMinutes() {
          var newDate = date.clone().add(options.stepping, 'm');

          if (isValid(newDate, 'm')) {
            setValue(newDate);
          }
        },
        incrementSeconds: function incrementSeconds() {
          var newDate = date.clone().add(1, 's');

          if (isValid(newDate, 's')) {
            setValue(newDate);
          }
        },
        decrementHours: function decrementHours() {
          var newDate = date.clone().subtract(1, 'h');

          if (isValid(newDate, 'h')) {
            setValue(newDate);
          }
        },
        decrementMinutes: function decrementMinutes() {
          var newDate = date.clone().subtract(options.stepping, 'm');

          if (isValid(newDate, 'm')) {
            setValue(newDate);
          }
        },
        decrementSeconds: function decrementSeconds() {
          var newDate = date.clone().subtract(1, 's');

          if (isValid(newDate, 's')) {
            setValue(newDate);
          }
        },
        togglePeriod: function togglePeriod() {
          setValue(date.clone().add(date.hours() >= 12 ? -12 : 12, 'h'));
        },
        togglePicker: function togglePicker(e) {
          var $this = $(e.target),
              $parent = $this.closest('ul'),
              expanded = $parent.find('.show'),
              closed = $parent.find('.collapse:not(.show)'),
              collapseData;

          if (expanded && expanded.length) {
            collapseData = expanded.data('collapse');

            if (collapseData && collapseData.transitioning) {
              return;
            }

            if (expanded.collapse) {
              // if collapse plugin is available through bootstrap.js then use it
              expanded.collapse('hide');
              closed.collapse('show');
            } else {
              // otherwise just toggle in class on the two views
              expanded.removeClass('show');
              closed.addClass('show');
            }

            if ($this.is('i')) {
              $this.toggleClass(options.icons.time + ' ' + options.icons.date);
            } else {
              $this.find('i').toggleClass(options.icons.time + ' ' + options.icons.date);
            } // NOTE: uncomment if toggled state will be restored in show()
            //if (component) {
            //    component.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
            //}

          }
        },
        showPicker: function showPicker() {
          widget.find('.timepicker > div:not(.timepicker-picker)').hide();
          widget.find('.timepicker .timepicker-picker').show();
        },
        showHours: function showHours() {
          widget.find('.timepicker .timepicker-picker').hide();
          widget.find('.timepicker .timepicker-hours').show();
        },
        showMinutes: function showMinutes() {
          widget.find('.timepicker .timepicker-picker').hide();
          widget.find('.timepicker .timepicker-minutes').show();
        },
        showSeconds: function showSeconds() {
          widget.find('.timepicker .timepicker-picker').hide();
          widget.find('.timepicker .timepicker-seconds').show();
        },
        selectHour: function selectHour(e) {
          var hour = parseInt($(e.target).text(), 10);

          if (!use24Hours) {
            if (date.hours() >= 12) {
              if (hour !== 12) {
                hour += 12;
              }
            } else {
              if (hour === 12) {
                hour = 0;
              }
            }
          }

          setValue(date.clone().hours(hour));
          actions.showPicker.call(picker);
        },
        selectMinute: function selectMinute(e) {
          setValue(date.clone().minutes(parseInt($(e.target).text(), 10)));
          actions.showPicker.call(picker);
        },
        selectSecond: function selectSecond(e) {
          setValue(date.clone().seconds(parseInt($(e.target).text(), 10)));
          actions.showPicker.call(picker);
        },
        clear: clear,
        today: function today() {
          var todaysDate = getMoment();

          if (isValid(todaysDate, 'd')) {
            setValue(todaysDate);
          }
        },
        close: hide
      },
          doAction = function doAction(e) {
        if ($(e.currentTarget).is('.disabled')) {
          return false;
        }

        actions[$(e.currentTarget).data('action')].apply(picker, arguments);
        return false;
      },

      /**
       * Shows the widget. Possibly will emit dp.show and dp.change
       */
      show = function show() {
        var currentMoment,
            useCurrentGranularity = {
          'year': function year(m) {
            return m.month(0).date(1).hours(0).seconds(0).minutes(0);
          },
          'month': function month(m) {
            return m.date(1).hours(0).seconds(0).minutes(0);
          },
          'day': function day(m) {
            return m.hours(0).seconds(0).minutes(0);
          },
          'hour': function hour(m) {
            return m.seconds(0).minutes(0);
          },
          'minute': function minute(m) {
            return m.seconds(0);
          }
        };

        if (input.prop('disabled') || !options.ignoreReadonly && input.prop('readonly') || widget) {
          return picker;
        }

        if (input.val() !== undefined && input.val().trim().length !== 0) {
          setValue(parseInputDate(input.val().trim()));
        } else if (unset && options.useCurrent && (options.inline || input.is('input') && input.val().trim().length === 0)) {
          currentMoment = getMoment();

          if (typeof options.useCurrent === 'string') {
            currentMoment = useCurrentGranularity[options.useCurrent](currentMoment);
          }

          setValue(currentMoment);
        }

        widget = getTemplate();
        fillDow();
        fillMonths();
        widget.find('.timepicker-hours').hide();
        widget.find('.timepicker-minutes').hide();
        widget.find('.timepicker-seconds').hide();
        update();
        showMode();
        $(window).on('resize', place);
        widget.on('click', '[data-action]', doAction); // this handles clicks on the widget

        widget.on('mousedown', false);

        if (component && component.hasClass('btn')) {
          component.toggleClass('active');
        }

        place();
        widget.show();

        if (options.focusOnShow && !input.is(':focus')) {
          input.focus();
        }

        notifyEvent({
          type: 'dp.show'
        });
        return picker;
      },

      /**
       * Shows or hides the widget
       */
      toggle = function toggle() {
        return widget ? hide() : show();
      },
          keydown = function keydown(e) {
        var handler = null,
            index,
            index2,
            pressedKeys = [],
            pressedModifiers = {},
            currentKey = e.which,
            keyBindKeys,
            allModifiersPressed,
            pressed = 'p';
        keyState[currentKey] = pressed;

        for (index in keyState) {
          if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
            pressedKeys.push(index);

            if (parseInt(index, 10) !== currentKey) {
              pressedModifiers[index] = true;
            }
          }
        }

        for (index in options.keyBinds) {
          if (options.keyBinds.hasOwnProperty(index) && typeof options.keyBinds[index] === 'function') {
            keyBindKeys = index.split(' ');

            if (keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
              allModifiersPressed = true;

              for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                  allModifiersPressed = false;
                  break;
                }
              }

              if (allModifiersPressed) {
                handler = options.keyBinds[index];
                break;
              }
            }
          }
        }

        if (handler) {
          handler.call(picker, widget);
          e.stopPropagation();
          e.preventDefault();
        }
      },
          keyup = function keyup(e) {
        keyState[e.which] = 'r';
        e.stopPropagation();
        e.preventDefault();
      },
          change = function change(e) {
        var val = $(e.target).val().trim(),
            parsedDate = val ? parseInputDate(val) : null;
        setValue(parsedDate);
        e.stopImmediatePropagation();
        return false;
      },
          attachDatePickerElementEvents = function attachDatePickerElementEvents() {
        input.on({
          'change': change,
          'blur': options.debug ? '' : hide,
          'keydown': keydown,
          'keyup': keyup,
          'focus': options.allowInputToggle ? show : ''
        });

        if (element.is('input')) {
          input.on({
            'focus': show
          });
        } else if (component) {
          component.on('click', toggle);
          component.on('mousedown', false);
        }
      },
          detachDatePickerElementEvents = function detachDatePickerElementEvents() {
        input.off({
          'change': change,
          'blur': blur,
          'keydown': keydown,
          'keyup': keyup,
          'focus': options.allowInputToggle ? hide : ''
        });

        if (element.is('input')) {
          input.off({
            'focus': show
          });
        } else if (component) {
          component.off('click', toggle);
          component.off('mousedown', false);
        }
      },
          indexGivenDates = function indexGivenDates(givenDatesArray) {
        // Store given enabledDates and disabledDates as keys.
        // This way we can check their existence in O(1) time instead of looping through whole array.
        // (for example: options.enabledDates['2014-02-27'] === true)
        var givenDatesIndexed = {};
        $.each(givenDatesArray, function () {
          var dDate = parseInputDate(this);

          if (dDate.isValid()) {
            givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
          }
        });
        return Object.keys(givenDatesIndexed).length ? givenDatesIndexed : false;
      },
          indexGivenHours = function indexGivenHours(givenHoursArray) {
        // Store given enabledHours and disabledHours as keys.
        // This way we can check their existence in O(1) time instead of looping through whole array.
        // (for example: options.enabledHours['2014-02-27'] === true)
        var givenHoursIndexed = {};
        $.each(givenHoursArray, function () {
          givenHoursIndexed[this] = true;
        });
        return Object.keys(givenHoursIndexed).length ? givenHoursIndexed : false;
      },
          initFormatting = function initFormatting() {
        var format = options.format || 'L LT';
        actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
          var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
          return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput2) {
            //temp fix for #740
            return date.localeData().longDateFormat(formatInput2) || formatInput2;
          });
        });
        parseFormats = options.extraFormats ? options.extraFormats.slice() : [];

        if (parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0) {
          parseFormats.push(actualFormat);
        }

        use24Hours = actualFormat.toLowerCase().indexOf('a') < 1 && actualFormat.replace(/\[.*?\]/g, '').indexOf('h') < 1;

        if (isEnabled('y')) {
          minViewModeNumber = 2;
        }

        if (isEnabled('M')) {
          minViewModeNumber = 1;
        }

        if (isEnabled('d')) {
          minViewModeNumber = 0;
        }

        currentViewMode = Math.max(minViewModeNumber, currentViewMode);

        if (!unset) {
          setValue(date);
        }
      };
      /********************************************************************************
       *
       * Public API functions
       * =====================
       *
       * Important: Do not expose direct references to private objects or the options
       * object to the outer world. Always return a clone when returning values or make
       * a clone when setting a private variable.
       *
       ********************************************************************************/


      picker.destroy = function () {
        ///<summary>Destroys the widget and removes all attached event listeners</summary>
        hide();
        detachDatePickerElementEvents();
        element.removeData('DateTimePicker');
        element.removeData('date');
      };

      picker.toggle = toggle;
      picker.show = show;
      picker.hide = hide;

      picker.disable = function () {
        ///<summary>Disables the input element, the component is attached to, by adding a disabled="true" attribute to it.
        ///If the widget was visible before that call it is hidden. Possibly emits dp.hide</summary>
        hide();

        if (component && component.hasClass('btn')) {
          component.addClass('disabled');
        }

        input.prop('disabled', true);
        return picker;
      };

      picker.enable = function () {
        ///<summary>Enables the input element, the component is attached to, by removing disabled attribute from it.</summary>
        if (component && component.hasClass('btn')) {
          component.removeClass('disabled');
        }

        input.prop('disabled', false);
        return picker;
      };

      picker.ignoreReadonly = function (ignoreReadonly) {
        if (arguments.length === 0) {
          return options.ignoreReadonly;
        }

        if (typeof ignoreReadonly !== 'boolean') {
          throw new TypeError('ignoreReadonly () expects a boolean parameter');
        }

        options.ignoreReadonly = ignoreReadonly;
        return picker;
      };

      picker.options = function (newOptions) {
        if (arguments.length === 0) {
          return $.extend(true, {}, options);
        }

        if (!(newOptions instanceof Object)) {
          throw new TypeError('options() options parameter should be an object');
        }

        $.extend(true, options, newOptions);
        $.each(options, function (key, value) {
          if (picker[key] !== undefined) {
            picker[key](value);
          } else {
            throw new TypeError('option ' + key + ' is not recognized!');
          }
        });
        return picker;
      };

      picker.date = function (newDate) {
        ///<signature helpKeyword="$.fn.datetimepicker.date">
        ///<summary>Returns the component's model current date, a moment object or null if not set.</summary>
        ///<returns type="Moment">date.clone()</returns>
        ///</signature>
        ///<signature>
        ///<summary>Sets the components model current moment to it. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.</summary>
        ///<param name="newDate" locid="$.fn.datetimepicker.date_p:newDate">Takes string, Date, moment, null parameter.</param>
        ///</signature>
        if (arguments.length === 0) {
          if (unset) {
            return null;
          }

          return date.clone();
        }

        if (newDate !== null && typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
          throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
        }

        setValue(newDate === null ? null : parseInputDate(newDate));
        return picker;
      };

      picker.format = function (newFormat) {
        ///<summary>test su</summary>
        ///<param name="newFormat">info about para</param>
        ///<returns type="string|boolean">returns foo</returns>
        if (arguments.length === 0) {
          return options.format;
        }

        if (typeof newFormat !== 'string' && (typeof newFormat !== 'boolean' || newFormat !== false)) {
          throw new TypeError('format() expects a string or boolean:false parameter ' + newFormat);
        }

        options.format = newFormat;

        if (actualFormat) {
          initFormatting(); // reinit formatting
        }

        return picker;
      };

      picker.timeZone = function (newZone) {
        if (arguments.length === 0) {
          return options.timeZone;
        }

        if (typeof newZone !== 'string') {
          throw new TypeError('newZone() expects a string parameter');
        }

        options.timeZone = newZone;
        return picker;
      };

      picker.dayViewHeaderFormat = function (newFormat) {
        if (arguments.length === 0) {
          return options.dayViewHeaderFormat;
        }

        if (typeof newFormat !== 'string') {
          throw new TypeError('dayViewHeaderFormat() expects a string parameter');
        }

        options.dayViewHeaderFormat = newFormat;
        return picker;
      };

      picker.extraFormats = function (formats) {
        if (arguments.length === 0) {
          return options.extraFormats;
        }

        if (formats !== false && !(formats instanceof Array)) {
          throw new TypeError('extraFormats() expects an array or false parameter');
        }

        options.extraFormats = formats;

        if (parseFormats) {
          initFormatting(); // reinit formatting
        }

        return picker;
      };

      picker.disabledDates = function (dates) {
        ///<signature helpKeyword="$.fn.datetimepicker.disabledDates">
        ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
        ///<returns type="array">options.disabledDates</returns>
        ///</signature>
        ///<signature>
        ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
        ///options.enabledDates if such exist.</summary>
        ///<param name="dates" locid="$.fn.datetimepicker.disabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
        ///</signature>
        if (arguments.length === 0) {
          return options.disabledDates ? $.extend({}, options.disabledDates) : options.disabledDates;
        }

        if (!dates) {
          options.disabledDates = false;
          update();
          return picker;
        }

        if (!(dates instanceof Array)) {
          throw new TypeError('disabledDates() expects an array parameter');
        }

        options.disabledDates = indexGivenDates(dates);
        options.enabledDates = false;
        update();
        return picker;
      };

      picker.enabledDates = function (dates) {
        ///<signature helpKeyword="$.fn.datetimepicker.enabledDates">
        ///<summary>Returns an array with the currently set enabled dates on the component.</summary>
        ///<returns type="array">options.enabledDates</returns>
        ///</signature>
        ///<signature>
        ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledDates if such exist.</summary>
        ///<param name="dates" locid="$.fn.datetimepicker.enabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
        ///</signature>
        if (arguments.length === 0) {
          return options.enabledDates ? $.extend({}, options.enabledDates) : options.enabledDates;
        }

        if (!dates) {
          options.enabledDates = false;
          update();
          return picker;
        }

        if (!(dates instanceof Array)) {
          throw new TypeError('enabledDates() expects an array parameter');
        }

        options.enabledDates = indexGivenDates(dates);
        options.disabledDates = false;
        update();
        return picker;
      };

      picker.daysOfWeekDisabled = function (daysOfWeekDisabled) {
        if (arguments.length === 0) {
          return options.daysOfWeekDisabled.splice(0);
        }

        if (typeof daysOfWeekDisabled === 'boolean' && !daysOfWeekDisabled) {
          options.daysOfWeekDisabled = false;
          update();
          return picker;
        }

        if (!(daysOfWeekDisabled instanceof Array)) {
          throw new TypeError('daysOfWeekDisabled() expects an array parameter');
        }

        options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
          currentValue = parseInt(currentValue, 10);

          if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
            return previousValue;
          }

          if (previousValue.indexOf(currentValue) === -1) {
            previousValue.push(currentValue);
          }

          return previousValue;
        }, []).sort();

        if (options.useCurrent && !options.keepInvalid) {
          var tries = 0;

          while (!isValid(date, 'd')) {
            date.add(1, 'd');

            if (tries === 31) {
              throw 'Tried 31 times to find a valid date';
            }

            tries++;
          }

          setValue(date);
        }

        update();
        return picker;
      };

      picker.maxDate = function (maxDate) {
        if (arguments.length === 0) {
          return options.maxDate ? options.maxDate.clone() : options.maxDate;
        }

        if (typeof maxDate === 'boolean' && maxDate === false) {
          options.maxDate = false;
          update();
          return picker;
        }

        if (typeof maxDate === 'string') {
          if (maxDate === 'now' || maxDate === 'moment') {
            maxDate = getMoment();
          }
        }

        var parsedDate = parseInputDate(maxDate);

        if (!parsedDate.isValid()) {
          throw new TypeError('maxDate() Could not parse date parameter: ' + maxDate);
        }

        if (options.minDate && parsedDate.isBefore(options.minDate)) {
          throw new TypeError('maxDate() date parameter is before options.minDate: ' + parsedDate.format(actualFormat));
        }

        options.maxDate = parsedDate;

        if (options.useCurrent && !options.keepInvalid && date.isAfter(maxDate)) {
          setValue(options.maxDate);
        }

        if (viewDate.isAfter(parsedDate)) {
          viewDate = parsedDate.clone().subtract(options.stepping, 'm');
        }

        update();
        return picker;
      };

      picker.minDate = function (minDate) {
        if (arguments.length === 0) {
          return options.minDate ? options.minDate.clone() : options.minDate;
        }

        if (typeof minDate === 'boolean' && minDate === false) {
          options.minDate = false;
          update();
          return picker;
        }

        if (typeof minDate === 'string') {
          if (minDate === 'now' || minDate === 'moment') {
            minDate = getMoment();
          }
        }

        var parsedDate = parseInputDate(minDate);

        if (!parsedDate.isValid()) {
          throw new TypeError('minDate() Could not parse date parameter: ' + minDate);
        }

        if (options.maxDate && parsedDate.isAfter(options.maxDate)) {
          throw new TypeError('minDate() date parameter is after options.maxDate: ' + parsedDate.format(actualFormat));
        }

        options.minDate = parsedDate;

        if (options.useCurrent && !options.keepInvalid && date.isBefore(minDate)) {
          setValue(options.minDate);
        }

        if (viewDate.isBefore(parsedDate)) {
          viewDate = parsedDate.clone().add(options.stepping, 'm');
        }

        update();
        return picker;
      };

      picker.defaultDate = function (defaultDate) {
        ///<signature helpKeyword="$.fn.datetimepicker.defaultDate">
        ///<summary>Returns a moment with the options.defaultDate option configuration or false if not set</summary>
        ///<returns type="Moment">date.clone()</returns>
        ///</signature>
        ///<signature>
        ///<summary>Will set the picker's inital date. If a boolean:false value is passed the options.defaultDate parameter is cleared.</summary>
        ///<param name="defaultDate" locid="$.fn.datetimepicker.defaultDate_p:defaultDate">Takes a string, Date, moment, boolean:false</param>
        ///</signature>
        if (arguments.length === 0) {
          return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
        }

        if (!defaultDate) {
          options.defaultDate = false;
          return picker;
        }

        if (typeof defaultDate === 'string') {
          if (defaultDate === 'now' || defaultDate === 'moment') {
            defaultDate = getMoment();
          } else {
            defaultDate = getMoment(defaultDate);
          }
        }

        var parsedDate = parseInputDate(defaultDate);

        if (!parsedDate.isValid()) {
          throw new TypeError('defaultDate() Could not parse date parameter: ' + defaultDate);
        }

        if (!isValid(parsedDate)) {
          throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
        }

        options.defaultDate = parsedDate;

        if (options.defaultDate && options.inline || input.val().trim() === '') {
          setValue(options.defaultDate);
        }

        return picker;
      };

      picker.locale = function (locale) {
        if (arguments.length === 0) {
          return options.locale;
        }

        if (!moment.localeData(locale)) {
          throw new TypeError('locale() locale ' + locale + ' is not loaded from moment locales!');
        }

        options.locale = locale;
        date.locale(options.locale);
        viewDate.locale(options.locale);

        if (actualFormat) {
          initFormatting(); // reinit formatting
        }

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.stepping = function (stepping) {
        if (arguments.length === 0) {
          return options.stepping;
        }

        stepping = parseInt(stepping, 10);

        if (isNaN(stepping) || stepping < 1) {
          stepping = 1;
        }

        options.stepping = stepping;
        return picker;
      };

      picker.useCurrent = function (useCurrent) {
        var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];

        if (arguments.length === 0) {
          return options.useCurrent;
        }

        if (typeof useCurrent !== 'boolean' && typeof useCurrent !== 'string') {
          throw new TypeError('useCurrent() expects a boolean or string parameter');
        }

        if (typeof useCurrent === 'string' && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
          throw new TypeError('useCurrent() expects a string parameter of ' + useCurrentOptions.join(', '));
        }

        options.useCurrent = useCurrent;
        return picker;
      };

      picker.collapse = function (collapse) {
        if (arguments.length === 0) {
          return options.collapse;
        }

        if (typeof collapse !== 'boolean') {
          throw new TypeError('collapse() expects a boolean parameter');
        }

        if (options.collapse === collapse) {
          return picker;
        }

        options.collapse = collapse;

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.icons = function (icons) {
        if (arguments.length === 0) {
          return $.extend({}, options.icons);
        }

        if (!(icons instanceof Object)) {
          throw new TypeError('icons() expects parameter to be an Object');
        }

        $.extend(options.icons, icons);

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.tooltips = function (tooltips) {
        if (arguments.length === 0) {
          return $.extend({}, options.tooltips);
        }

        if (!(tooltips instanceof Object)) {
          throw new TypeError('tooltips() expects parameter to be an Object');
        }

        $.extend(options.tooltips, tooltips);

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.useStrict = function (useStrict) {
        if (arguments.length === 0) {
          return options.useStrict;
        }

        if (typeof useStrict !== 'boolean') {
          throw new TypeError('useStrict() expects a boolean parameter');
        }

        options.useStrict = useStrict;
        return picker;
      };

      picker.sideBySide = function (sideBySide) {
        if (arguments.length === 0) {
          return options.sideBySide;
        }

        if (typeof sideBySide !== 'boolean') {
          throw new TypeError('sideBySide() expects a boolean parameter');
        }

        options.sideBySide = sideBySide;

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.viewMode = function (viewMode) {
        if (arguments.length === 0) {
          return options.viewMode;
        }

        if (typeof viewMode !== 'string') {
          throw new TypeError('viewMode() expects a string parameter');
        }

        if (viewModes.indexOf(viewMode) === -1) {
          throw new TypeError('viewMode() parameter must be one of (' + viewModes.join(', ') + ') value');
        }

        options.viewMode = viewMode;
        currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber);
        showMode();
        return picker;
      };

      picker.toolbarPlacement = function (toolbarPlacement) {
        if (arguments.length === 0) {
          return options.toolbarPlacement;
        }

        if (typeof toolbarPlacement !== 'string') {
          throw new TypeError('toolbarPlacement() expects a string parameter');
        }

        if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
          throw new TypeError('toolbarPlacement() parameter must be one of (' + toolbarPlacements.join(', ') + ') value');
        }

        options.toolbarPlacement = toolbarPlacement;

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.widgetPositioning = function (widgetPositioning) {
        if (arguments.length === 0) {
          return $.extend({}, options.widgetPositioning);
        }

        if ({}.toString.call(widgetPositioning) !== '[object Object]') {
          throw new TypeError('widgetPositioning() expects an object variable');
        }

        if (widgetPositioning.horizontal) {
          if (typeof widgetPositioning.horizontal !== 'string') {
            throw new TypeError('widgetPositioning() horizontal variable must be a string');
          }

          widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();

          if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
            throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + horizontalModes.join(', ') + ')');
          }

          options.widgetPositioning.horizontal = widgetPositioning.horizontal;
        }

        if (widgetPositioning.vertical) {
          if (typeof widgetPositioning.vertical !== 'string') {
            throw new TypeError('widgetPositioning() vertical variable must be a string');
          }

          widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();

          if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
            throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + verticalModes.join(', ') + ')');
          }

          options.widgetPositioning.vertical = widgetPositioning.vertical;
        }

        update();
        return picker;
      };

      picker.calendarWeeks = function (calendarWeeks) {
        if (arguments.length === 0) {
          return options.calendarWeeks;
        }

        if (typeof calendarWeeks !== 'boolean') {
          throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
        }

        options.calendarWeeks = calendarWeeks;
        update();
        return picker;
      };

      picker.showTodayButton = function (showTodayButton) {
        if (arguments.length === 0) {
          return options.showTodayButton;
        }

        if (typeof showTodayButton !== 'boolean') {
          throw new TypeError('showTodayButton() expects a boolean parameter');
        }

        options.showTodayButton = showTodayButton;

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.showClear = function (showClear) {
        if (arguments.length === 0) {
          return options.showClear;
        }

        if (typeof showClear !== 'boolean') {
          throw new TypeError('showClear() expects a boolean parameter');
        }

        options.showClear = showClear;

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.widgetParent = function (widgetParent) {
        if (arguments.length === 0) {
          return options.widgetParent;
        }

        if (typeof widgetParent === 'string') {
          widgetParent = $(widgetParent);
        }

        if (widgetParent !== null && typeof widgetParent !== 'string' && !(widgetParent instanceof $)) {
          throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
        }

        options.widgetParent = widgetParent;

        if (widget) {
          hide();
          show();
        }

        return picker;
      };

      picker.keepOpen = function (keepOpen) {
        if (arguments.length === 0) {
          return options.keepOpen;
        }

        if (typeof keepOpen !== 'boolean') {
          throw new TypeError('keepOpen() expects a boolean parameter');
        }

        options.keepOpen = keepOpen;
        return picker;
      };

      picker.focusOnShow = function (focusOnShow) {
        if (arguments.length === 0) {
          return options.focusOnShow;
        }

        if (typeof focusOnShow !== 'boolean') {
          throw new TypeError('focusOnShow() expects a boolean parameter');
        }

        options.focusOnShow = focusOnShow;
        return picker;
      };

      picker.inline = function (inline) {
        if (arguments.length === 0) {
          return options.inline;
        }

        if (typeof inline !== 'boolean') {
          throw new TypeError('inline() expects a boolean parameter');
        }

        options.inline = inline;
        return picker;
      };

      picker.clear = function () {
        clear();
        return picker;
      };

      picker.keyBinds = function (keyBinds) {
        if (arguments.length === 0) {
          return options.keyBinds;
        }

        options.keyBinds = keyBinds;
        return picker;
      };

      picker.getMoment = function (d) {
        return getMoment(d);
      };

      picker.debug = function (debug) {
        if (typeof debug !== 'boolean') {
          throw new TypeError('debug() expects a boolean parameter');
        }

        options.debug = debug;
        return picker;
      };

      picker.allowInputToggle = function (allowInputToggle) {
        if (arguments.length === 0) {
          return options.allowInputToggle;
        }

        if (typeof allowInputToggle !== 'boolean') {
          throw new TypeError('allowInputToggle() expects a boolean parameter');
        }

        options.allowInputToggle = allowInputToggle;
        return picker;
      };

      picker.showClose = function (showClose) {
        if (arguments.length === 0) {
          return options.showClose;
        }

        if (typeof showClose !== 'boolean') {
          throw new TypeError('showClose() expects a boolean parameter');
        }

        options.showClose = showClose;
        return picker;
      };

      picker.keepInvalid = function (keepInvalid) {
        if (arguments.length === 0) {
          return options.keepInvalid;
        }

        if (typeof keepInvalid !== 'boolean') {
          throw new TypeError('keepInvalid() expects a boolean parameter');
        }

        options.keepInvalid = keepInvalid;
        return picker;
      };

      picker.datepickerInput = function (datepickerInput) {
        if (arguments.length === 0) {
          return options.datepickerInput;
        }

        if (typeof datepickerInput !== 'string') {
          throw new TypeError('datepickerInput() expects a string parameter');
        }

        options.datepickerInput = datepickerInput;
        return picker;
      };

      picker.parseInputDate = function (parseInputDate) {
        if (arguments.length === 0) {
          return options.parseInputDate;
        }

        if (typeof parseInputDate !== 'function') {
          throw new TypeError('parseInputDate() sholud be as function');
        }

        options.parseInputDate = parseInputDate;
        return picker;
      };

      picker.disabledTimeIntervals = function (disabledTimeIntervals) {
        ///<signature helpKeyword="$.fn.datetimepicker.disabledTimeIntervals">
        ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
        ///<returns type="array">options.disabledTimeIntervals</returns>
        ///</signature>
        ///<signature>
        ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
        ///options.enabledDates if such exist.</summary>
        ///<param name="dates" locid="$.fn.datetimepicker.disabledTimeIntervals_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
        ///</signature>
        if (arguments.length === 0) {
          return options.disabledTimeIntervals ? $.extend({}, options.disabledTimeIntervals) : options.disabledTimeIntervals;
        }

        if (!disabledTimeIntervals) {
          options.disabledTimeIntervals = false;
          update();
          return picker;
        }

        if (!(disabledTimeIntervals instanceof Array)) {
          throw new TypeError('disabledTimeIntervals() expects an array parameter');
        }

        options.disabledTimeIntervals = disabledTimeIntervals;
        update();
        return picker;
      };

      picker.disabledHours = function (hours) {
        ///<signature helpKeyword="$.fn.datetimepicker.disabledHours">
        ///<summary>Returns an array with the currently set disabled hours on the component.</summary>
        ///<returns type="array">options.disabledHours</returns>
        ///</signature>
        ///<signature>
        ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
        ///options.enabledHours if such exist.</summary>
        ///<param name="hours" locid="$.fn.datetimepicker.disabledHours_p:hours">Takes an [ int ] of values and disallows the user to select only from those hours.</param>
        ///</signature>
        if (arguments.length === 0) {
          return options.disabledHours ? $.extend({}, options.disabledHours) : options.disabledHours;
        }

        if (!hours) {
          options.disabledHours = false;
          update();
          return picker;
        }

        if (!(hours instanceof Array)) {
          throw new TypeError('disabledHours() expects an array parameter');
        }

        options.disabledHours = indexGivenHours(hours);
        options.enabledHours = false;

        if (options.useCurrent && !options.keepInvalid) {
          var tries = 0;

          while (!isValid(date, 'h')) {
            date.add(1, 'h');

            if (tries === 24) {
              throw 'Tried 24 times to find a valid date';
            }

            tries++;
          }

          setValue(date);
        }

        update();
        return picker;
      };

      picker.enabledHours = function (hours) {
        ///<signature helpKeyword="$.fn.datetimepicker.enabledHours">
        ///<summary>Returns an array with the currently set enabled hours on the component.</summary>
        ///<returns type="array">options.enabledHours</returns>
        ///</signature>
        ///<signature>
        ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledHours if such exist.</summary>
        ///<param name="hours" locid="$.fn.datetimepicker.enabledHours_p:hours">Takes an [ int ] of values and allows the user to select only from those hours.</param>
        ///</signature>
        if (arguments.length === 0) {
          return options.enabledHours ? $.extend({}, options.enabledHours) : options.enabledHours;
        }

        if (!hours) {
          options.enabledHours = false;
          update();
          return picker;
        }

        if (!(hours instanceof Array)) {
          throw new TypeError('enabledHours() expects an array parameter');
        }

        options.enabledHours = indexGivenHours(hours);
        options.disabledHours = false;

        if (options.useCurrent && !options.keepInvalid) {
          var tries = 0;

          while (!isValid(date, 'h')) {
            date.add(1, 'h');

            if (tries === 24) {
              throw 'Tried 24 times to find a valid date';
            }

            tries++;
          }

          setValue(date);
        }

        update();
        return picker;
      };
      /**
       * Returns the component's model current viewDate, a moment object or null if not set. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.
       * @param {Takes string, viewDate, moment, null parameter.} newDate
       * @returns {viewDate.clone()}
       */


      picker.viewDate = function (newDate) {
        if (arguments.length === 0) {
          return viewDate.clone();
        }

        if (!newDate) {
          viewDate = date.clone();
          return picker;
        }

        if (typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
          throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
        }

        viewDate = parseInputDate(newDate);
        viewUpdate();
        return picker;
      }; // initializing element and component attributes


      if (element.is('input')) {
        input = element;
      } else {
        input = element.find(options.datepickerInput);

        if (input.length === 0) {
          input = element.find('input');
        } else if (!input.is('input')) {
          throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
        }
      }

      if (element.hasClass('input-group')) {
        // in case there is more then one 'input-group-addon' Issue #48
        if (element.find('.datepickerbutton').length === 0) {
          component = element.find('.input-group-append');
        } else {
          component = element.find('.datepickerbutton');
        }
      }

      if (!options.inline && !input.is('input')) {
        throw new Error('Could not initialize DateTimePicker without an input element');
      } // Set defaults for date here now instead of in var declaration


      date = getMoment();
      viewDate = date.clone();
      $.extend(true, options, dataToOptions());
      picker.options(options);
      initFormatting();
      attachDatePickerElementEvents();

      if (input.prop('disabled')) {
        picker.disable();
      }

      if (input.is('input') && input.val().trim().length !== 0) {
        setValue(parseInputDate(input.val().trim()));
      } else if (options.defaultDate && input.attr('placeholder') === undefined) {
        setValue(options.defaultDate);
      }

      if (options.inline) {
        show();
      }

      return picker;
    };
    /********************************************************************************
     *
     * jQuery plugin constructor and defaults object
     *
     ********************************************************************************/

    /**
    * See (http://jquery.com/).
    * @name jQuery
    * @class
    * See the jQuery Library  (http://jquery.com/) for full details.  This just
    * documents the function and classes that are added to jQuery by this plug-in.
    */

    /**
     * See (http://jquery.com/)
     * @name fn
     * @class
     * See the jQuery Library  (http://jquery.com/) for full details.  This just
     * documents the function and classes that are added to jQuery by this plug-in.
     * @memberOf jQuery
     */

    /**
     * Show comments
     * @class datetimepicker
     * @memberOf jQuery.fn
     */


    $.fn.datetimepicker = function (options) {
      options = options || {};
      var args = Array.prototype.slice.call(arguments, 1),
          isInstance = true,
          thisMethods = ['destroy', 'hide', 'show', 'toggle'],
          returnValue;

      if (typeof options === 'object') {
        return this.each(function () {
          var $this = $(this),
              _options;

          if (!$this.data('DateTimePicker')) {
            // create a private copy of the defaults object
            _options = $.extend(true, {}, $.fn.datetimepicker.defaults, options);
            $this.data('DateTimePicker', dateTimePicker($this, _options));
          }
        });
      } else if (typeof options === 'string') {
        this.each(function () {
          var $this = $(this),
              instance = $this.data('DateTimePicker');

          if (!instance) {
            throw new Error('bootstrap-datetimepicker("' + options + '") method was called on an element that is not using DateTimePicker');
          }

          returnValue = instance[options].apply(instance, args);
          isInstance = returnValue === instance;
        });

        if (isInstance || $.inArray(options, thisMethods) > -1) {
          return this;
        }

        return returnValue;
      }

      throw new TypeError('Invalid arguments for DateTimePicker: ' + options);
    };

    $.fn.datetimepicker.defaults = {
      timeZone: '',
      format: false,
      dayViewHeaderFormat: 'MMMM YYYY',
      extraFormats: false,
      stepping: 1,
      minDate: false,
      maxDate: false,
      useCurrent: true,
      collapse: true,
      locale: moment.locale(),
      defaultDate: false,
      disabledDates: false,
      enabledDates: false,
      icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'fas fa-calendar-check',
        clear: 'far fa-trash-alt',
        close: 'far fa-times-circle'
      },
      tooltips: {
        today: 'Go to today',
        clear: 'Clear selection',
        close: 'Close the picker',
        selectMonth: 'Select Month',
        prevMonth: 'Previous Month',
        nextMonth: 'Next Month',
        selectYear: 'Select Year',
        prevYear: 'Previous Year',
        nextYear: 'Next Year',
        selectDecade: 'Select Decade',
        prevDecade: 'Previous Decade',
        nextDecade: 'Next Decade',
        prevCentury: 'Previous Century',
        nextCentury: 'Next Century',
        pickHour: 'Pick Hour',
        incrementHour: 'Increment Hour',
        decrementHour: 'Decrement Hour',
        pickMinute: 'Pick Minute',
        incrementMinute: 'Increment Minute',
        decrementMinute: 'Decrement Minute',
        pickSecond: 'Pick Second',
        incrementSecond: 'Increment Second',
        decrementSecond: 'Decrement Second',
        togglePeriod: 'Toggle Period',
        selectTime: 'Select Time'
      },
      useStrict: false,
      sideBySide: false,
      daysOfWeekDisabled: false,
      calendarWeeks: false,
      viewMode: 'days',
      toolbarPlacement: 'default',
      showTodayButton: false,
      showClear: false,
      showClose: false,
      widgetPositioning: {
        horizontal: 'auto',
        vertical: 'auto'
      },
      widgetParent: null,
      ignoreReadonly: false,
      keepOpen: false,
      focusOnShow: true,
      inline: false,
      keepInvalid: false,
      datepickerInput: '.datepickerinput',
      keyBinds: {
        up: function up(widget) {
          if (!widget) {
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().subtract(7, 'd'));
          } else {
            this.date(d.clone().add(this.stepping(), 'm'));
          }
        },
        down: function down(widget) {
          if (!widget) {
            this.show();
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().add(7, 'd'));
          } else {
            this.date(d.clone().subtract(this.stepping(), 'm'));
          }
        },
        'control up': function controlUp(widget) {
          if (!widget) {
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().subtract(1, 'y'));
          } else {
            this.date(d.clone().add(1, 'h'));
          }
        },
        'control down': function controlDown(widget) {
          if (!widget) {
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().add(1, 'y'));
          } else {
            this.date(d.clone().subtract(1, 'h'));
          }
        },
        left: function left(widget) {
          if (!widget) {
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().subtract(1, 'd'));
          }
        },
        right: function right(widget) {
          if (!widget) {
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().add(1, 'd'));
          }
        },
        pageUp: function pageUp(widget) {
          if (!widget) {
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().subtract(1, 'M'));
          }
        },
        pageDown: function pageDown(widget) {
          if (!widget) {
            return;
          }

          var d = this.date() || this.getMoment();

          if (widget.find('.datepicker').is(':visible')) {
            this.date(d.clone().add(1, 'M'));
          }
        },
        enter: function enter() {
          this.hide();
        },
        escape: function escape() {
          this.hide();
        },
        //tab: function (widget) { //this break the flow of the form. disabling for now
        //    var toggle = widget.find('.picker-switch a[data-action="togglePicker"]');
        //    if(toggle.length > 0) toggle.click();
        //},
        'control space': function controlSpace(widget) {
          if (!widget) {
            return;
          }

          if (widget.find('.timepicker').is(':visible')) {
            widget.find('.btn[data-action="togglePeriod"]').click();
          }
        },
        t: function t() {
          this.date(this.getMoment());
        },
        'delete': function _delete() {
          this.clear();
        }
      },
      debug: false,
      allowInputToggle: false,
      disabledTimeIntervals: false,
      disabledHours: false,
      enabledHours: false,
      viewDate: false
    };
    return $.fn.datetimepicker;
  });

  var bootstrapDatetimepicker = $.fn.datetimepicker;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'dialog';
  var VERSION$2 = '0.0.1';
  var Default$2 = {
    button: {
      type: 'light',
      label: 'Cancel',
      dismiss: false,
      focus: false
    }
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dialog =
  /*#__PURE__*/
  function () {
    function Dialog(options) {
      this._confirmed = false;
      this._options = options;

      this._makeModal();

      this._showModal();
    } // Getters


    var _proto = Dialog.prototype;

    // Private
    _proto._btnOptions = function _btnOptions(btn) {
      var btns = Default$2.button;

      for (var k in btns) {
        if (typeof btn[k] === 'undefined') btn[k] = btns[k];
      }

      return btn;
    };

    _proto._getInputValue = function _getInputValue() {
      if (!this._options.input) return;
      if (this._options.val) return this._options.val.call(this, this._input);
      return $(this._input).val();
    };

    _proto._makeInput = function _makeInput() {
      var tmpl = '';
      var input = this._options.input;

      switch (input.type) {
        case 'textarea':
          tmpl = "<textarea class=\"form-control bs-dialog-input\" id=\"bs-dialog-input\" rows=\"3\" placeholder=\"" + input.label + "\"></textarea>";
          break;

        case 'select':
          var opts = '';

          for (var k in input) {
            opts += "<option value=\"" + k + "\">" + input[k] + "</option>";
          }

          tmpl = "<select class=\"custom-select my-1 mr-sm-2\" id=\"bs-dialog-input\">" + opts + "</select>";
          break;

        default:
          tmpl = "<input type=\"" + input.type + "\" class=\"form-control bs-dialog-input\" id=\"bs-dialog-input\" placeholder=\"" + input.label + "\">";
      }

      var tx = "\n            <div class=\"form-group\">\n                <label for=\"bs-dialog-input\">" + input.label + "</label>\n            </div>";
      this._input = $(tmpl).get(0);
      return $(tx).append(this._input);
    };

    _proto._makeModal = function _makeModal() {
      var _this = this;

      // headers
      var header = '';

      if (this._options.title) {
        header = "\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\">" + this._options.title + "</h5>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                </div>";
      } // message


      var message = '';
      if (this._options.message) message = "<p>" + this._options.message + "</p>"; // footer buttons

      var buttons = '';

      this._options.buttons.forEach(function (btn) {
        btn = _this._btnOptions(btn);
        var action = btn.dismiss ? ' data-dismiss="modal"' : ' data-confirm="true"';
        var focus = btn.focus ? ' btn-focus-first' : '';
        buttons += "<button type=\"button\" class=\"btn btn-" + btn.type + focus + "\"" + action + ">" + btn.label + "</button>";
      });

      var tmpl = "\n            <div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog\" role=\"document\">\n                    <div class=\"modal-content\">\n                        " + header + "\n                        <div class=\"modal-body\">\n                            " + message + "\n                        </div>\n                        <div class=\"modal-footer\">\n                            " + buttons + "\n                        </div>\n                    </div>\n                </div>\n            </div>";
      this._modal = $(tmpl).appendTo(document.body);

      if (this._options.input) {
        var form = this._makeInput();

        $(this._modal).find('.modal-body').append(form);
      }

      $(this._modal).on('click', '[data-confirm]', function (event) {
        _this._confirmed = true;
        $(_this._modal).modal('hide');
      });
      $(this._modal).on('hidden.bs.modal', function (event) {
        setTimeout(function (e) {
          return $(_this._modal).remove();
        }, 1000);
        if (!_this._options.callback) return;
        var arg = _this._confirmed;
        if (_this._confirmed && _this._options.input) arg = _this._getInputValue();

        _this._options.callback.call(_this, arg);
      });
      $(this._modal).on('shown.bs.modal', function (event) {
        if (_this._input) $(_this._input).focus();else $(_this._modal).find('.btn-focus-first').focus();
      });
    };

    _proto._showModal = function _showModal() {
      $(this._modal).modal('show');
    } // Static
    ;

    Dialog.alert = function alert(title, message, callback) {
      new Dialog({
        title: title,
        message: message,
        callback: callback,
        input: null,
        buttons: [{
          type: 'primary',
          focus: true,
          label: 'Ok'
        }]
      });
    };

    Dialog.confirm = function confirm(title, message, callback) {
      new Dialog({
        title: title,
        message: message,
        callback: callback,
        input: null,
        buttons: [{
          type: 'light',
          label: 'Cancel',
          dismiss: true
        }, {
          type: 'primary',
          focus: true,
          label: 'Ok'
        }]
      });
    };

    Dialog.prompt = function prompt(title, message, input, callback) {
      new Dialog({
        title: title,
        message: message,
        callback: callback,
        input: input,
        buttons: [{
          type: 'light',
          label: 'Cancel',
          dismiss: true
        }, {
          type: 'primary',
          focus: true,
          label: 'Ok'
        }]
      });
    };

    _createClass(Dialog, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }]);

    return Dialog;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $[NAME$2] = Dialog;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'drawer';
  var VERSION$3 = '0.0.1';
  var DATA_KEY$2 = 'bs.drawer';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$3];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$2 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$3 = {
    HIDE: "hide" + EVENT_KEY$2,
    HIDDEN: "hidden" + EVENT_KEY$2,
    SHOW: "show" + EVENT_KEY$2,
    SHOWN: "shown" + EVENT_KEY$2,
    FOCUSIN: "focusin" + EVENT_KEY$2,
    RESIZE: "resize" + EVENT_KEY$2,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$2,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$2,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$2,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName = {
    SCROLLABLE: 'drawer-content-scrollable',
    SCROLLBAR_MEASURER: 'drawer-scrollbar-measure',
    BACKDROP: 'drawer-backdrop',
    SLIDE: 'slide',
    FADE: 'fade',
    SHOW: 'show',
    OPEN: 'drawer-open'
  };
  var Selector$1 = {
    CONTENT: '.drawer-content',
    MODAL_BODY: '.drawer-body',
    DATA_TOGGLE: '[data-toggle="drawer"]',
    DATA_DISMISS: '[data-dismiss="drawer"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Drawer =
  /*#__PURE__*/
  function () {
    function Drawer(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._content = element.querySelector(Selector$1.CONTENT);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Drawer.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) return;
      if ($(this._element).hasClass(ClassName.SLIDE)) this._isTransitioning = true;
      var showEvent = $.Event(Event$3.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);
      if (this._isShown || showEvent.isDefaultPrevented()) return;
      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._setEscapeEvent();

      $(this._element).on(Event$3.CLICK_DISMISS, Selector$1.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._content).on(Event$3.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$3.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) _this._ignoreBackdropClick = true;
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) event.preventDefault();
      if (!this._isShown || this._isTransitioning) return;
      var hideEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(hideEvent);
      if (!this._isShown || hideEvent.isDefaultPrevented()) return;
      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName.SLIDE);
      if (transition) this._isTransitioning = true;

      this._setEscapeEvent();

      $(document).off(Event$3.FOCUSIN);
      $(this._element).removeClass(ClassName.SHOW);
      $(this._element).off(Event$3.CLICK_DISMISS);
      $(this._content).off(Event$3.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideDrawer(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideDrawer();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._content].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$2);
      });
      $(document).off(Event$3.FOCUSIN);
      $.removeData(this._element, DATA_KEY$2);
      this._config = null;
      this._element = null;
      this._content = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      Util.typeCheckConfig(NAME$3, config, DefaultType$2);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName.SLIDE);
      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) document.body.appendChild(this._element);
      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._content).hasClass(ClassName.SCROLLABLE)) (this._content.querySelector(Selector$1.MODAL_BODY) || {}).scrollTop = 0;else this._element.scrollTop = 0;
      if (transition) Util.reflow(this._element);
      $(this._element).addClass(ClassName.SHOW);
      if (this._config.focus) this._enforceFocus();
      var shownEvent = $.Event(Event$3.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) _this3._element.focus();
        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event$3.FOCUSIN) // Guard against infinite focus loop
      .on(Event$3.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(document.body).on(Event$3.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(document.body).off(Event$3.KEYDOWN_DISMISS);
      }
    };

    _proto._hideDrawer = function _hideDrawer() {
      var _this6 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);

        _this6._resetAdjustments();

        _this6._resetScrollbar();

        $(_this6._element).trigger(Event$3.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this7 = this;

      var animate = $(this._element).hasClass(ClassName.SLIDE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;
        if (animate) this._backdrop.classList.add(animate);
        $(this._backdrop).appendTo(document.body);
        $(this._backdrop).on(Event$3.CLICK_DISMISS, function (event) {
          if (_this7._ignoreBackdropClick) {
            _this7._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) return;
          if (_this7._config.backdrop === 'static') _this7._element.focus();else _this7.hide();
        });
        if (animate) Util.reflow(this._backdrop);
        $(this._backdrop).addClass(ClassName.SHOW);
        if (!callback) return;
        if (!animate) return callback();
        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this7._removeBackdrop();

          if (callback) callback();
        };

        if ($(this._element).hasClass(ClassName.SLIDE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this8 = this;

      if (this._isBodyOverflowing) {
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$1.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$1.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this8._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this8._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$1.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      });
      var elements = [].slice.call(document.querySelectorAll("" + Selector$1.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');
        if (typeof margin !== 'undefined') $(element).css('margin-right', margin).removeData('margin-right');
      });
      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Drawer._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Drawer(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Drawer, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Drawer;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$1.DATA_TOGGLE, function (event) {
    var _this9 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);
    if (selector) target = document.querySelector(selector);
    var config = $(target).data(DATA_KEY$2) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();
    var $target = $(target).one(Event$3.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) return;
      $target.one(Event$3.HIDDEN, function () {
        if ($(_this9).is(':visible')) _this9.focus();
      });
    });

    Drawer._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Drawer._jQueryInterface;
  $.fn[NAME$3].Constructor = Drawer;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$2;
    return Drawer._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap File Picker (v0.0.1): file-picker.js
   * --------------------------------------------------------------------------
   */
  var Default$4 = {
    multiple: false,
    type: '*/*',
    btnUpload: 'Upload',
    thumbnails: null,
    search: null,
    upload: null,
    selected: null
  };

  var FilePicker$1 =
  /*#__PURE__*/
  function () {
    function FilePicker(config) {
      this._config = this._getConfig(config);
      this._el = {};
      this._files = [];
      this._items = [];
      this._paths = [];
      this._query = '';
      this._uploader = 0;
      this._timer = null;

      this._makeDrawer();

      this._addElementsListener();

      $(this._el.drawer).drawer('show');
    } // private


    var _proto = FilePicker.prototype;

    _proto._addElementsListener = function _addElementsListener() {
      var _this = this;

      // drawer showing
      $(this._el.drawer).on('show.bs.drawer', function (e) {
        _this._footerHide();
      }); // drawer shown

      $(this._el.drawer).on('shown.bs.drawer', function (e) {
        // calculate the spinner position
        if (_this._el.dhSearchInput) {
          var inpWidth = _this._el.dhSearchInput.offsetWidth;
          var inpPadRight = parseFloat($(_this._el.dhSearchInput).css('padding-left'));
          _this._el.dhSearchSpinner.style.left = inpWidth - inpPadRight * 2.5 + 'px';

          _this._spinnerHide();

          _this._el.dhSearchInput.focus();
        } // find preset files


        _this._searchQuery('');
      }); // drawer hiding

      $(this._el.drawer).on('hide.bs.drawer', function (e) {
        if (_this._uploader) e.preventDefault();
      }); // drawer hidden

      $(this._el.drawer).on('hidden.bs.drawer', function (e) {
        $(_this._el.drawer).remove();
      }); // input search

      if (this._el.dhSearchInput) {
        $(this._el.dhSearchInput).on('input', function (e) {
          if (_this._timer) clearTimeout(_this._timer);
          _this._query = _this._el.dhSearchInput.value;
          _this._timer = setTimeout(function (q) {
            return _this._searchQuery(q);
          }, 500, _this._query);
        });
      } // file list click


      $(this._el.drawerBody).on('click', '.filepicker-item-selectable', function (e) {
        var item = e.currentTarget;

        if (!_this._config.multiple) {
          $(_this._el.drawerBody).children('.filepicker-item-active').removeClass('filepicker-item-active');
        }

        var path = $(item).data('filepicker.item').path;

        if (item.classList.toggle('filepicker-item-active')) {
          _this._paths.push(path);
        } else {
          _this._paths.splice(_this._paths.indexOf(path), 1);
        }

        _this._footerUpdate();
      }); // file list error click

      $(this._el.drawerBody).on('click', '.filepicker-item-error', function (e) {
        var item = e.currentTarget;
        item.style.opacity = 0;
        setTimeout(function (item) {
          return $(item).remove();
        }, 300, item);
      }); // clicking the select button

      $(this._el.dfBtnSelect).click(function (e) {
        var result = [];
        $(_this._el.drawerBody).children('.filepicker-item-active').each(function (i, e) {
          return result.push($(e).data('filepicker.item'));
        });
        if (_this._config.selected) _this._config.selected.call(_this, result);
        $(_this._el.drawer).drawer('hide');
      });

      if (this._el.dhUploadInput) {
        $(this._el.dhUploadInput).on('change', function (e) {
          var files = _this._el.dhUploadInput.files;
          if (!files.length) return;

          _this._clearResult();

          var _loop = function _loop(i) {
            var file = files[i];

            var el = _this._renderItem(file, true, null, false, false);

            var prog = $(el).find('.progress-bar').get(0); // start upload the file

            _this._uploader++;

            _this._footerUpdate();

            _this._config.upload.call(_this, file, prog, function (res) {
              _this._uploader--;

              if (typeof res === 'string') {
                res = _this._hs(res);
                $(prog).parent().replaceWith("<small class=\"text-danger\">" + res + "</small>");
                el.classList.add('filepicker-item-error');
              } else {
                var nel = _this._renderItem(res, false, el, false, true);

                if (nel) nel.click();else $(el).remove();
              }

              _this._footerUpdate();
            });
          };

          for (var i = 0; i < files.length; i++) {
            _loop(i);
          }

          _this._el.dhUploadForm.reset();
        });
      }
    };

    _proto._clearResult = function _clearResult() {
      $(this._el.drawerBody).find('.filepicker-item-clearable').not('.filepicker-item-active').each(function (i, e) {
        return $(e).remove();
      });

      this._footerUpdate();
    };

    _proto._getConfig = function _getConfig(config) {
      var conf = {};

      for (var k in Default$4) {
        conf[k] = typeof config[k] === 'undefined' ? Default$4[k] : config[k];
      }

      return conf;
    };

    _proto._hs = function _hs(text) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    _proto._makeDrawer = function _makeDrawer() {
      var _this2 = this;

      var header = '';
      var multiText = this._config.multiple ? ' multiple' : ''; // Searchable

      if (this._config.search) {
        var upform = ""; // Uploadable

        if (this._config.upload) {
          upform = "\n                    <form class=\"input-group-append\" data-el=\"dh-upload-form\">\n                        <label class=\"btn btn-outline-secondary\" data-el=\"dh-upload-label\">\n                            <input type=\"file\" accept=\"" + this._config.type + "\" data-el=\"dh-upload-input\"" + multiText + ">\n                        </label>\n                    </form>";
        }

        header = "\n                <div class=\"form-group\">\n                    <div class=\"input-group\">\n                        <input type=\"search\" class=\"form-control\" placeholder=\"Search\" aria-label=\"Search\" data-el=\"dh-search-input\">\n                        " + upform + "\n                    </div>\n                    <div class=\"spinner-border spinner-border-sm text-secondary\" role=\"status\" data-el=\"dh-search-spinner\"></div>\n                </div>"; // Uploadable only
      } else if (this._config.upload) {
        header = "\n                <form data-el=\"dh-upload-form\">\n                    <label class=\"btn btn-block btn-outline-primary\" data-el=\"dh-upload-label\">\n                        <input type=\"file\" accept=\"" + this._config.type + "\" data-el=\"dh-upload-input\"" + multiText + ">\n                    </label>\n                </form>";
      }

      var tmpl = "\n            <div class=\"drawer slide drawer-right filepicker-container\">\n                <div class=\"drawer-content drawer-content-scrollable\">\n                    <div class=\"drawer-header\">" + header + "</div>\n                    <div class=\"drawer-body\" data-el=\"drawer-body\"></div>\n                    <div class=\"drawer-footer\" data-el=\"drawer-footer\">\n                        <button class=\"btn btn-primary btn-block\" data-el=\"df-btn-select\">\n                            Select\n                        </button>\n                    </div>\n                </div>\n            </div>";
      this._el.drawer = $(tmpl).appendTo(document.body).get(0); // find identified elements

      $(this._el.drawer).find('[data-el]').each(function (i, e) {
        var name = e.dataset.el.replace(/\-[a-z]/g, function (m) {
          return m[1].toUpperCase();
        });
        _this2._el[name] = e;
      }); // add upload label

      $(this._el.dhUploadLabel).append(this._config.btnUpload);
    };

    _proto._renderItem = function _renderItem(item, uploader, replacer, removable, selectable) {
      if (uploader === void 0) {
        uploader = false;
      }

      if (replacer === void 0) {
        replacer = null;
      }

      if (removable === void 0) {
        removable = true;
      }

      if (selectable === void 0) {
        selectable = true;
      }

      if (!uploader) {
        if (this._paths.includes(item.path)) return;
      }

      var safe = {
        name: this._hs(item.name),
        type: this._hs(item.type),
        thumb: item.thumb || this._config.thumbnails
      };
      var clss = ' filepicker-item';
      var progress = '';

      if (uploader) {
        clss += ' filepicker-item-uploader';
        progress = "\n                <div class=\"progress\">\n                    <div class=\"progress-bar progress-bar-striped progress-bar-animated\" style=\"width:0%\"></div>\n                </div>";
      }

      if (removable) clss += ' filepicker-item-clearable';
      if (selectable) clss += ' filepicker-item-selectable';
      var tmpl = "\n            <div class=\"media" + clss + "\" title=\"" + safe.name + "\">\n                <img src=\"" + safe.thumb + "\" alt=\"#\" width=\"48\" height=\"48\">\n                <div class=\"media-body\">\n                    <h6>" + safe.name + "</h6>\n                    <small class=\"text-muted\">" + safe.type + "</small>\n                    " + progress + "\n                </div>\n            </div>";
      var el = $(tmpl).get(0);

      if (uploader) {
        var img = $(el).children('img').get(0);

        if (/image\//.test(safe.type)) {
          var reader = new FileReader();

          reader.onload = function (e) {
            return img.src = e.target.result;
          };

          reader.readAsDataURL(item);
        }
      } else {
        $(el).data('filepicker.item', item);
      }

      if (replacer) $(replacer).replaceWith(el);else $(this._el.drawerBody).append(el);
      return el;
    };

    _proto._searchQuery = function _searchQuery(query) {
      var _this3 = this;

      this._clearResult();

      this._spinnerShow();

      if (!this._config.search) return;

      this._config.search(query, this._config.type, function (res) {
        if (query != _this3._query) return;

        _this3._spinnerHide();

        if (!res) return;
        res.forEach(function (item) {
          return _this3._renderItem(item);
        });
      });
    } // Toogler
    ;

    _proto._footerHide = function _footerHide() {
      this._el.drawerFooter.style.display = 'none';
    };

    _proto._footerShow = function _footerShow() {
      this._el.drawerFooter.style.display = 'flex';
    };

    _proto._footerUpdate = function _footerUpdate() {
      if (this._uploader) return this._footerHide();
      if ($(this._el.drawerBody).children('.filepicker-item-active').length) this._footerShow();else this._footerHide();
    };

    _proto._spinnerHide = function _spinnerHide() {
      if (this._el.dhSearchSpinner) this._el.dhSearchSpinner.style.display = 'none';
    };

    _proto._spinnerShow = function _spinnerShow() {
      if (this._el.dhSearchSpinner) this._el.dhSearchSpinner.style.display = 'block';
    };

    return FilePicker;
  }();

  window.FilePicker = FilePicker$1;

  /**
   * --------------------------------------------------------------------------
   * FileUploader (v0.0.1): fileuploader.js
   * Licensed under MIT (https://github.com/iqbalfn/fileuploader/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  var FileUploader$1 =
  /*#__PURE__*/
  function () {
    function FileUploader(options) {
      var _this = this;

      this._queries = options.queries || {};
      this._fields = options.fields || {};
      this._files = options.files || {};
      this._headers = options.headers || {};
      this._url = options.url;
      this._response = null;
      this._xhr = null; // events

      var events = ['onStart', 'onProgress', 'onError', 'onSuccess', 'onComplete'];
      events.forEach(function (i) {
        if (options[i]) _this[i] = options[i];
      });
    } // events callback


    var _proto = FileUploader.prototype;

    _proto.onStart = function onStart() {};

    _proto.onProgress = function onProgress() {};

    _proto.onError = function onError() {};

    _proto.onSuccess = function onSuccess() {};

    _proto.onComplete = function onComplete() {} // public
    // actions
    ;

    _proto.getResponse = function getResponse() {
      return this._response;
    };

    _proto.send = function send() {
      var _this2 = this;

      var formData = new FormData(),
          xhr = new XMLHttpRequest();
      this._xhr = xhr;

      for (var field in this._fields) {
        formData.append(field, this._fields[field]);
      }

      for (var _field in this._files) {
        formData.append(_field, this._files[_field], this._files[_field].name);
      }

      var url = this._url;
      var usign = url.includes('?') ? '&' : '?';
      var queries = [];

      for (var k in this._queries) {
        queries.push(this._qs(k) + '=' + this._qs(this._queries[k]));
      }

      if (queries.length) url += usign + queries;
      xhr.open('POST', url, true);

      xhr.onreadystatechange = function () {
        _this2.onProgress(_this2, xhr.readyState);

        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
          _this2.onError(_this2, _this2._xhr);

          _this2.onComplete(_this2, _this2._xhr);

          return;
        }

        var res = null;

        try {
          res = JSON.parse(xhr.responseText);
        } catch (e) {
          res = xhr.responseText;
        }

        _this2.onSuccess(_this2, _this2._xhr, res);

        _this2.onComplete(_this2, _this2._xhr);
      };

      xhr.send(formData);
      this.onStart(this, this._xhr);
    } // setter & adder
    ;

    _proto.addField = function addField(name, value) {
      this._fields[name] = value;
    };

    _proto.addFile = function addFile(name, value) {
      this._files[name] = value;
    };

    _proto.addHeader = function addHeader(name, value) {
      this._headers[name] = value;
    };

    _proto.addQuery = function addQuery(name, value) {
      this._queries[name] = value;
    };

    _proto.setUrl = function setUrl(url) {
      this._url = url;
    } // getter
    ;

    _proto.getUrl = function getUrl() {
      return this._url;
    };

    _proto.getField = function getField(name) {
      return this._fields[name];
    };

    _proto.getFields = function getFields() {
      return this._fields;
    };

    _proto.getFile = function getFile(name) {
      return this._files[name];
    };

    _proto.getFiles = function getFiles() {
      return this._files;
    };

    _proto.getHeader = function getHeader(name) {
      return this._headers[name];
    };

    _proto.getHeaders = function getHeaders() {
      return this._headers;
    };

    _proto.getQuery = function getQuery(name) {
      return this._queries[name];
    };

    _proto.getQueries = function getQueries() {
      return this._queries;
    } // private
    ;

    _proto._qs = function _qs(str) {
      return encodeURIComponent(str);
    };

    return FileUploader;
  }();

  window.FileUploader = FileUploader$1;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'formerror';
  var VERSION$4 = '0.0.1';
  var DATA_KEY$3 = 'bs.formerror';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$4];
  var Default$5 = {};
  var Event$4 = {
    INPUT_DATA_API: "input" + EVENT_KEY$3 + DATA_API_KEY$3,
    INVALID_DATA_API: "invalid" + EVENT_KEY$3 + DATA_API_KEY$3,
    SUBMIT_DATA_API: "submit" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var FormError =
  /*#__PURE__*/
  function () {
    function FormError(element, config) {
      this._element = element;
      this._controls = [].slice.call(element.elements, 0);
      this._wasValidated = false;

      this._addControlListener();

      this._addFormListener();
    } // Getters


    var _proto = FormError.prototype;

    // Public
    // Private
    _proto._addControlListener = function _addControlListener() {
      var _this = this;

      this._controls.forEach(function (e) {
        var $e = $(e);
        var feedback = $e.next('.invalid-feedback').get(0);

        if (!feedback) {
          var parent = $e.closest('.form-group');
          feedback = parent.find('.invalid-feedback').get(0);
        }

        if (feedback) $e.data('feedback', feedback);
        $e.on(Event$4.INVALID_DATA_API, function (event) {
          if (_this._wasValidated && e.validationMessage && $e.data('feedback')) $e.data('feedback').innerText = e.validationMessage;
        });
        $e.on(Event$4.INPUT_DATA_API, function (event) {
          if (_this._wasValidated && e.validationMessage && $e.data('feedback')) $e.data('feedback').innerText = e.validationMessage;
        });
      });
    };

    _proto._addFormListener = function _addFormListener() {
      var _this2 = this;

      this._element.setAttribute('novalidate', '');

      $(this._element).on(Event$4.SUBMIT_DATA_API, function (e) {
        if (!_this2._element.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
        }

        _this2._controls.forEach(function (c) {
          if (!c.checkValidity()) {
            if ($(c).data('feedback')) $(c).data('feedback').innerText = c.validationMessage;
          }
        });

        _this2._element.classList.add('was-validated');

        _this2._wasValidated = true;
      });
    } // Static
    ;

    FormError._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$3);

        if (!data) {
          data = new FormError(this);
          $(this).data(DATA_KEY$3, data);
        }
      });
    };

    _createClass(FormError, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }]);

    return FormError;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$4] = FormError._jQueryInterface;
  $.fn[NAME$4].Constructor = FormError;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$3;
    return FormError._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'formfiles';
  var VERSION$5 = '0.0.3';
  var DATA_KEY$4 = 'bs.formfiles';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$5];
  var Default$6 = {
    filePicker: null,
    transform: function transform(res) {
      return res;
    }
  };
  var DefaultType$3 = {
    filePicker: '(function|string)',
    transform: '(function|string)'
  };
  var Event$5 = {
    ADD: "add" + EVENT_KEY$4,
    ADDED: "added" + EVENT_KEY$4,
    CHANGE: "change" + EVENT_KEY$4,
    DELETE: "delete" + EVENT_KEY$4,
    DELETED: "deleted" + EVENT_KEY$4,
    TRUNCATE: "truncate" + EVENT_KEY$4,
    CHANGE_DATA_API: "change" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4
  };
  var ClassName$1 = {
    ADDER: 'formfiles-btn-add',
    HIDE: 'hide',
    ITEMS: 'formfiles-items',
    REMOVER: 'formfiles-item-remove',
    SLIDEUP: 'slide-up'
  };
  var Selector$2 = {
    ITEMS: "." + ClassName$1.ITEMS,
    ADDER: "." + ClassName$1.ADDER,
    REMOVER: "." + ClassName$1.REMOVER
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var FormFiles =
  /*#__PURE__*/
  function () {
    function FormFiles(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._model = document.querySelector(this._element.dataset.model);
      this._items = $(element).children(Selector$2.ITEMS).get(0);
      this._isTransitioning = false;

      this._updateValue();

      this._addElementListener();

      this._addModelListener();

      this._drawItems();
    } // Getters


    var _proto = FormFiles.prototype;

    // Public
    _proto.addItem = function addItem(item) {
      $(this._element).trigger(Event$5.ADD, item);

      this._value.push(item);

      this._model.value = JSON.stringify(this._value);

      this._drawItem(item);

      $(this._element).trigger(Event$5.ADDED, item);
      $(this._element).trigger(Event$5.CHANGE);
    };

    _proto.removeItem = function removeItem(index) {
      var _this = this;

      var item = this._value[index];
      if (!item) return;
      if (this._isTransitioning) return;
      this._isTransitioning = true;
      $(this._element).trigger(Event$5.DELETE, item);

      this._value.splice(index, 1);

      this._model.value = this._value.length ? JSON.stringify(this._value) : '';
      var itemEl = $(this._items).children()[index];
      itemEl.classList.add(ClassName$1.HIDE);
      var transitionDuration = Util.getTransitionDurationFromElement(itemEl);
      $(itemEl).one(Util.TRANSITION_END, function (e) {
        $(itemEl).remove();
        _this._isTransitioning = false;
        $(_this._element).trigger(Event$5.DELETED, item);
        $(_this._element).trigger(Event$5.CHANGE);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto.truncate = function truncate() {
      this._model.value = '[]';
      this._value = [];
      this._items.innerHTML = '';
      $(this._element).trigger(Event$5.TRUNCATE);
      $(this._element).trigger(Event$5.CHANGE);
    } // Private
    ;

    _proto._addElementListener = function _addElementListener() {
      var _this2 = this;

      $(this._element).on(Event$5.CLICK_DATA_API, Selector$2.ADDER, function (e) {
        if (_this2._config.filePicker) {
          _this2._config.filePicker(function (res) {
            if (res) _this2.addItem(res);
          }, _this2);
        }
      });
      $(this._element).on(Event$5.CLICK_DATA_API, Selector$2.REMOVER, function (e, i) {
        var index = $(e.currentTarget.parentNode).index();

        _this2.removeItem(index);
      });
    };

    _proto._addModelListener = function _addModelListener() {
      var _this3 = this;

      $(this._model).on(Event$5.CHANGE_DATA_API, function (e) {
        _this3._updateValue();

        _this3._drawItems();

        $(_this3._element).trigger(Event$5.CHANGE);
      });
    };

    _proto._drawItem = function _drawItem(item, index) {
      item = this._config.transform(item);
      var icon = item.icon || '<i class="fa fa-file-text-o" aria-hidden="true"></i>';
      var tmpl = "\n            <li class=\"slide-up\">\n                <a href=\"" + item.url + "\" class=\"formfiles-item\" target=\"_blank\">\n                    <div class=\"formfiles-item-icon\">" + icon + "</div>\n                    <div class=\"formfiles-item-title\">" + item.name + "</div>\n                    <div class=\"formfiles-item-meta\">" + item.meta + "</div>\n                </a>\n                <button type=\"button\" class=\"close formfiles-item-remove\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </li>";
      $(tmpl).appendTo(this._items);
    };

    _proto._drawItems = function _drawItems() {
      var _this4 = this;

      this._items.innerHTML = '';

      this._value.forEach(function (e, i) {
        return _this4._drawItem(e, i);
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$6, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._updateValue = function _updateValue() {
      var val = this._model.value.trim();

      this._value = [];
      if (!val) return;

      try {
        this._value = JSON.parse(val);
      } catch (_unused) {
        console.error('The model value is not valid JSON', this._model);
      }

      if (!Array.isArray(this._value)) {
        console.error('The model value is not valid JSON Array', this._model);
        this._value = [];
      }
    } // Static
    ;

    FormFiles._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = _objectSpread({}, Default$6, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new FormFiles(this, _config);
          $(this).data(DATA_KEY$4, data);
        }
      });
    };

    _createClass(FormFiles, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return FormFiles;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$5] = FormFiles._jQueryInterface;
  $.fn[NAME$5].Constructor = FormFiles;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$4;
    return FormFiles._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'formgallery';
  var VERSION$6 = '0.0.2';
  var DATA_KEY$5 = 'bs.formgallery';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$6];
  var Default$7 = {
    imagePicker: function imagePicker(cb) {
      return cb(prompt('Image URL'));
    },
    imagePreviewer: true
  };
  var DefaultType$4 = {
    imagePicker: '(function|string)',
    imagePreviewer: '(function|string|boolean)'
  };
  var Event$6 = {
    ADD: "add" + EVENT_KEY$5,
    ADDED: "added" + EVENT_KEY$5,
    CHANGE: "change" + EVENT_KEY$5,
    CLEAR: "clear" + EVENT_KEY$5,
    CLEARED: "cleared" + EVENT_KEY$5,
    DELETE: "delete" + EVENT_KEY$5,
    DELETED: "deleted" + EVENT_KEY$5,
    CHANGE_DATA_API: "change" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5
  };
  var ClassName$2 = {
    ACTION: 'formgallery-action',
    CONTAINER: 'formgallery',
    IMAGE: 'formgallery-image',
    LIST: 'formgallery-list',
    REMOVER: 'formgallery-remove'
  };
  var Selector$3 = {
    ADDER: "." + ClassName$2.ACTION,
    CONTAINER: "." + ClassName$2.CONTAINER,
    IMAGE: "." + ClassName$2.IMAGE,
    LIST: "." + ClassName$2.LIST,
    REMOVER: "." + ClassName$2.REMOVER
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var FormGallery =
  /*#__PURE__*/
  function () {
    function FormGallery(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._list = $(element).children(Selector$3.LIST).get(0);
      this._model = document.querySelector(this._element.dataset.model);

      this._updateValue();

      if (typeof this._config.imagePicker === 'string') this._config.imagePicker = window[this._config.imagePicker];

      this._addModelListener();
    } // Getters


    var _proto = FormGallery.prototype;

    // Public
    _proto.addImage = function addImage(url) {
      $(this._element).trigger(Event$6.ADD, url);

      this._value.push(url);

      this._model.value = JSON.stringify(this._value);

      this._drawItem(url);

      $(this._element).trigger(Event$6.ADDED, url);
      $(this._element).trigger(Event$6.CHANGE);
    };

    _proto.clear = function clear() {
      $(this._element).trigger(Event$6.CLEAR);
      this._model.value = '';
      this._value = [];
      this._list.innerHTML = '';
      $(this._element).trigger(Event$6.CLEARED);
      $(this._element).trigger(Event$6.CHANGE);
    };

    _proto.preview = function preview(index) {
      if (typeof this._config.imagePreviewer === 'boolean') return;

      this._config.imagePreviewer(this._value, index);
    };

    _proto.pick = function pick() {
      var _this = this;

      if (!this._config.imagePicker) return;

      this._config.imagePicker(function (res) {
        if (res) _this.addImage(res);
      }, this);
    };

    _proto.remove = function remove(index) {
      var item = this._value[index];
      if (!item) return;
      $(this._element).trigger(Event$6.DELETE, item);

      this._value.splice(index, 1);

      this._model.value = this._value.length ? JSON.stringify(this._value) : '';
      var itemEl = $(this._list).children()[index];
      itemEl.classList.add(ClassName$2.HIDE);
      $(itemEl).remove();
      $(this._element).trigger(Event$6.DELETED, item);
      $(this._element).trigger(Event$6.CHANGE);
    } // Private
    ;

    _proto._addModelListener = function _addModelListener() {
      var _this2 = this;

      $(this._model).on(Event$6.CHANGE_DATA_API, function (e) {
        _this2._updateValue();

        _this2._drawItems();

        $(_this2._element).trigger(Event$6.CHANGE);
      });
    };

    _proto._drawItem = function _drawItem(item) {
      var tmpl = "\n            <div class=\"formgallery-item\">\n                <button type=\"button\" class=\"close formgallery-remove\" aria-label=\"Close\" title=\"Remove\">\n                    <span aria-hidden=\"true\">\xD7</span>\n                </button>\n                <a href=\"#\" class=\"formgallery-image\" style=\"background-image: url('" + item + "')\"></a>\n            </div>";
      $(tmpl).appendTo(this._list);
    };

    _proto._drawItems = function _drawItems() {
      var _this3 = this;

      this._list.innerHTML = '';

      this._value.forEach(function (e) {
        return _this3._drawItem(e);
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$7, config);
      Util.typeCheckConfig(NAME$6, config, DefaultType$4);
      return config;
    };

    _proto._updateValue = function _updateValue() {
      var val = this._model.value.trim();

      this._value = [];
      if (!val) return;

      try {
        this._value = JSON.parse(val);
      } catch (_unused) {
        console.error('The model value is not valid JSON', this._model);
      }

      if (!Array.isArray(this._value)) {
        console.error('The model value is not valid JSON Array', this._model);
        this._value = [];
      }
    } // Static
    ;

    FormGallery._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread({}, Default$7, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new FormGallery(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        }
      });
    };

    _createClass(FormGallery, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return FormGallery;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$6.CLICK_DATA_API, Selector$3.REMOVER, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormGallery._jQueryInterface.call($(target.parentNode.parentNode), 'remove', $(target).index());
  });
  $(document).on(Event$6.CLICK_DATA_API, Selector$3.IMAGE, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormGallery._jQueryInterface.call($(target.parentNode.parentNode), 'preview', $(target).index());
  });
  $(document).on(Event$6.CLICK_DATA_API, Selector$3.ADDER, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormGallery._jQueryInterface.call($(target), 'pick', target);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$6] = FormGallery._jQueryInterface;
  $.fn[NAME$6].Constructor = FormGallery;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$5;
    return FormGallery._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'formimage';
  var VERSION$7 = '0.0.1';
  var DATA_KEY$6 = 'bs.formimage';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$7];
  var Default$8 = {
    imagePicker: function imagePicker(cb) {
      return cb(prompt('Image URL'));
    },
    imagePreviewer: true
  };
  var DefaultType$5 = {
    imagePicker: '(function|string)',
    imagePreviewer: '(function|string|boolean)'
  };
  var Event$7 = {
    UPDATE: "update" + EVENT_KEY$6,
    UPDATED: "updated" + EVENT_KEY$6,
    CHANGE: "change" + EVENT_KEY$6,
    CLEAR: "clear" + EVENT_KEY$6,
    CLEARED: "cleared" + EVENT_KEY$6,
    CHANGE_DATA_API: "change" + EVENT_KEY$6,
    CLICK_DATA_API: "click" + EVENT_KEY$6
  };
  var ClassName$3 = {
    CONTAINER: 'formimage',
    EMPTY: 'empty',
    PREVIEW: 'formimage-preview',
    REMOVER: 'formimage-clear'
  };
  var Selector$4 = {
    CONTAINER: "." + ClassName$3.CONTAINER,
    PREVIEW: "." + ClassName$3.PREVIEW,
    REMOVER: "." + ClassName$3.REMOVER
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var FormImage =
  /*#__PURE__*/
  function () {
    function FormImage(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._preview = $(element).children(Selector$4.PREVIEW).get(0);
      this._model = document.querySelector(this._element.dataset.model);
      this._value = this._model.value;
      if (typeof this._config.imagePicker === 'string') this._config.imagePicker = window[this._config.imagePicker];

      this._addModelListener();
    } // Getters


    var _proto = FormImage.prototype;

    // Public
    _proto.clear = function clear() {
      this.setImage('');
    };

    _proto.pick = function pick() {
      var _this = this;

      this._config.imagePicker(function (res) {
        _this.setImage(res);
      }, this);
    };

    _proto.pickOrPreview = function pickOrPreview() {
      this._value ? this.preview() : this.pick();
    };

    _proto.preview = function preview() {
      if (typeof this._config.imagePreviewer === 'boolean') return;

      this._config.imagePreviewer(this._value);
    };

    _proto.setImage = function setImage(image) {
      if (image === null) return;
      if (this._value === image) return;
      this._model.value = this._value = image;
      if (image) this._updateImage();else this._clearImage();
    } // Private
    ;

    _proto._addModelListener = function _addModelListener() {
      var _this2 = this;

      $(this._model).on('change', function (e) {
        if (_this2._value != e.target.value) _this2._setImage(e.target.value);
      });
    };

    _proto._clearImage = function _clearImage() {
      $(this._element).trigger(Event$7.CLEAR);

      this._preview.removeAttribute('style');

      this._element.classList.add(ClassName$3.EMPTY);

      $(this._element).trigger(Event$7.CLEARED);
      $(this._element).trigger(Event$7.CHANGE);
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$8, config);
      Util.typeCheckConfig(NAME$7, config, DefaultType$5);
      return config;
    };

    _proto._updateImage = function _updateImage() {
      $(this._element).trigger(Event$7.UPDATE);

      this._element.classList.remove(ClassName$3.EMPTY);

      this._preview.style.backgroundImage = "url(" + this._value + ")";
      this._preview.href = this._value;
      $(this._element).trigger(Event$7.UPDATED);
      $(this._element).trigger(Event$7.CHANGE);
    } // Static
    ;

    FormImage._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = _objectSpread({}, Default$8, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new FormImage(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.preview) {
          data.preview(relatedTarget);
        }
      });
    };

    _createClass(FormImage, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$8;
      }
    }]);

    return FormImage;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$7.CLICK_DATA_API, Selector$4.REMOVER, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormImage._jQueryInterface.call($(target), 'clear', target);
  });
  $(document).on(Event$7.CLICK_DATA_API, Selector$4.PREVIEW, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormImage._jQueryInterface.call($(target), 'pickOrPreview', target);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$7] = FormImage._jQueryInterface;
  $.fn[NAME$7].Constructor = FormImage;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$6;
    return FormImage._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'fileurl';
  var VERSION$8 = '0.0.1';
  var DATA_KEY$7 = 'bs.fileurl';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$8];
  var Default$9 = {
    filePicker: function filePicker(cb, btn, input) {
      cb(prompt('File URL'));
    }
  };
  var DefaultType$6 = {
    filePicker: '(string|function)'
  };
  var Event$8 = {
    CLICK_DATA_API: "click" + EVENT_KEY$7 + DATA_API_KEY$4
  };
  var Selector$5 = {
    DATA_TOGGLE: '[data-toggle="fileurl"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var FileURL =
  /*#__PURE__*/
  function () {
    function FileURL(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._model = null;
      this._filePicker = this._config.filePicker;
      if (typeof this._filePicker === 'string') this._filePicker = window[this._filePicker];
      var selector = Util.getSelectorFromElement(element);
      if (selector) this._model = document.querySelector(selector);

      this._addElementListener();
    } // Getters


    var _proto = FileURL.prototype;

    // Public
    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$7);
      $.removeData(this._element, DATA_KEY$7);
      this._config = null;
      this._element = null;
      this._model = null;
    } // Private
    ;

    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      $(this._element).on(Event$8.CLICK_DATA_API, function (e) {
        _this._filePicker(function (res) {
          return $(_this._model).val(res);
        }, _this._element, _this._model);
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$9, config);
      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    } // Static
    ;

    FileURL._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = _objectSpread({}, Default$9, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new FileURL(this, _config);
          $(this).data(DATA_KEY$7, data);
        }
      });
    };

    _createClass(FileURL, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$9;
      }
    }]);

    return FileURL;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$8.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var data = $(this).data(DATA_KEY$7);
    if (data) return;
    var config = $(this).data();

    FileURL._jQueryInterface.call($(this), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = FileURL._jQueryInterface;
  $.fn[NAME$8].Constructor = FileURL;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$7;
    return FileURL._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'linkfilter';
  var VERSION$9 = '0.0.1';
  var DATA_KEY$8 = 'bs.linkfilter';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$9];
  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var KEY_ENTER = 13; // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

  var RE_KEYS = ["-", "[", "]", "/", "{", "}", "(", ")", "*", "+", "?", ".", "\\", "^", "$", "|"].join('\\');
  var RE_ESCAPE = RegExp('[' + RE_KEYS + ']', 'g');
  var Default$a = {
    active: 'active',
    delay: 300,
    input: null,
    empty: false
  };
  var DefaultType$7 = {
    active: 'string',
    delay: 'number',
    input: '(element|string)',
    empty: 'boolean'
  };
  var Event$9 = {
    FINDING: "finding" + EVENT_KEY$8 + DATA_API_KEY$5,
    FOUND: "found" + EVENT_KEY$8 + DATA_API_KEY$5,
    EMPTY: "empty" + EVENT_KEY$8 + DATA_API_KEY$5,
    KEYDOWN: "keydown" + EVENT_KEY$8 + DATA_API_KEY$5
  };
  var ClassName$4 = {
    NOT_MATCH: 'linkfilter-not-match'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var LinkFilter =
  /*#__PURE__*/
  function () {
    function LinkFilter(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._input = config.input;
      this._timer = null;
      this._lastQuery = null;
      if (typeof config.input === 'string') this._input = document.querySelector(config.input);

      this._addElementListener();

      this._findItem(this._input);
    } // Getters


    var _proto = LinkFilter.prototype;

    // Public
    _proto.dispose = function dispose() {
      [this._input].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$8);
      });
      $.removeData(this._element, DATA_KEY$8);
      this._config = null;
      this._element = null;
      this._timer = null;
      this._input = null;
    } // Private
    ;

    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      $(this._input).on(Event$9.KEYDOWN, function (e) {
        if (e.keyCode === KEY_ENTER) return _this._clickActive(e);
        if (e.keyCode === KEY_DOWN) return _this._focusNextItem(e);
        if (e.keyCode === KEY_UP) return _this._focusPrevItem(e);
        if (_this._timer) clearTimeout(_this._timer);
        _this._timer = setTimeout(function (el) {
          return _this._findItem(el);
        }, _this._config.delay, _this._input);
      });
    };

    _proto._clickActive = function _clickActive(e) {
      var el = this._element.querySelector("." + this._config.active);

      if (!el) return;
      if (el.tagName != 'A') el = el.querySelector('a');
      if (el) el.click();
      e.preventDefault();
    };

    _proto._focusNextItem = function _focusNextItem(e) {
      var next, current;

      for (var i = this._element.children.length - 1; i >= 0; i--) {
        var child = this._element.children[i];
        if (child.classList.contains(ClassName$4.NOT_MATCH)) continue;

        if (child.classList.contains(this._config.active)) {
          current = child;
          if (next) break;
          continue;
        }

        next = child;
      }

      if (next) {
        if (current) current.classList.remove(this._config.active);
        next.classList.add(this._config.active);
      }

      e.preventDefault();
    };

    _proto._focusPrevItem = function _focusPrevItem(e) {
      var prev, current;

      for (var i = 0; i < this._element.children.length; i++) {
        var child = this._element.children[i];
        if (child.classList.contains(ClassName$4.NOT_MATCH)) continue;

        if (child.classList.contains(this._config.active)) {
          current = child;
          if (prev) break;
          continue;
        }

        prev = child;
      }

      if (prev) {
        if (current) current.classList.remove(this._config.active);
        prev.classList.add(this._config.active);
      }

      e.preventDefault();
    };

    _proto._findItem = function _findItem(relatedTarget) {
      var _this2 = this;

      var findingEvent = $.Event(Event$9.FINDING, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(findingEvent);

      var val = this._input.value.trim().replace(RE_ESCAPE, "\\$&");

      var re = new RegExp(val, 'i');
      var found = 0;
      var firstItem;
      var activeFound;
      if (val === this._lastQuery) return;
      this._lastQuery = val;
      $(this._element).children().each(function (i, e) {
        var eText = e.innerText;
        if ('text' in e.dataset) eText = e.dataset.text;
        var show = false;

        if (!val) {
          show = !_this2._config.empty;
        } else if (re.test(eText)) {
          show = true;
        }

        if (show) {
          found++;
          if (!firstItem) firstItem = e;
          e.classList.remove(ClassName$4.NOT_MATCH);
          e.style.removeProperty('display');
          if (e.classList.contains(_this2._config.active)) activeFound = true;
        } else {
          e.style.display = 'none';
          e.classList.add(ClassName$4.NOT_MATCH);
          if (e.classList.contains(_this2._config.active)) e.classList.remove(_this2._config.active);
        }
      });
      var finalEvent;

      if (found) {
        if (!activeFound && found === 1) firstItem.classList.add(this._config.active);
        finalEvent = $.Event(Event$9.FOUND, {
          relatedTarget: relatedTarget
        });
      } else {
        finalEvent = $.Event(Event$9.EMPTY, {
          relatedTarget: relatedTarget
        });
      }

      $(this._element).trigger(finalEvent);
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$a, config);
      Util.typeCheckConfig(NAME$9, config, DefaultType$7);
      return config;
    } // Static
    ;

    LinkFilter._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = _objectSpread({}, Default$a, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new LinkFilter(this, _config);
          $(this).data(DATA_KEY$8, data);
        }
      });
    };

    _createClass(LinkFilter, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$a;
      }
    }]);

    return LinkFilter;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$9] = LinkFilter._jQueryInterface;
  $.fn[NAME$9].Constructor = LinkFilter;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$8;
    return LinkFilter._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap List Editor (v0.0.1): list-editor.js
   * --------------------------------------------------------------------------
   */
  var Default$b = {
    editor: null,
    list: null,
    model: null,
    items: {
      title: 'title',
      info: [],
      // [{field,icon,title},...],
      action: [] // { edit: {icon,title}, remove: {icon,title}}

    }
  };

  var ListEditor =
  /*#__PURE__*/
  function () {
    function ListEditor(config) {
      this._config = this._getConfig(config);
      this._value = '[]';
      this._el = {
        editor: document.querySelector(this._config.editor),
        list: document.querySelector(this._config.list),
        model: document.querySelector(this._config.model)
      };
      this._activeIndex = null;

      this._addElementsListener();

      this._redrawItems();
    } // private


    var _proto = ListEditor.prototype;

    _proto._addElementsListener = function _addElementsListener() {
      var _this = this;

      this._el.model.addEventListener('change', function (e) {
        return _this._redrawItems();
      });

      this._el.editor.addEventListener('submit', function (e) {
        e.preventDefault();
        var value = {};
        var fInput = null;

        for (var i = 0; i < _this._el.editor.elements.length; i++) {
          var input = _this._el.editor.elements[i];
          if (input.nodeName === 'BUTTON' || !input.name) continue;
          value[input.name] = input.value;
          input.value = '';
          if (!fInput) fInput = input;
        }

        if (_this._activeIndex) {
          _this._value[_this._activeIndex] = value;
          _this._el.model.value = JSON.stringify(_this._value);

          _this._redrawItems();
        } else {
          _this._drawItem(value, _this._value.length);

          _this._updateModel();
        }

        _this._activeIndex = null;
        if (fInput) fInput.focus();
      });

      $(this._el.list).on('click', '.btn-remove', function (e) {
        e.preventDefault();
        var list = e.target.closest('.list-editor-item');
        $(list).slideUp(function (f) {
          $(list).remove();

          _this._updateModel();
        });
      }).on('click', '.btn-edit', function (e) {
        e.preventDefault();
        var list = e.target.closest('.list-editor-item');
        var item = JSON.parse(list.dataset.object);
        _this._activeIndex = list.dataset.index;
        var fInput = null;

        for (var i = 0; i < _this._el.editor.elements.length; i++) {
          var input = _this._el.editor.elements[i];
          if (input.type === 'button') continue;
          input.value = item[input.name] || '';
          if (!fInput) fInput = input;
        }

        fInput.select();
        $('html, body').animate({
          scrollTop: $(_this._el.editor).offset().top
        });
      });
    };

    _proto._drawItem = function _drawItem(item, index) {
      var _this2 = this;

      var safe = {
        object: this._hs(JSON.stringify(item)),
        title: item[this._config.items.title]
      };
      var infos = [];

      this._config.items.info.forEach(function (info) {
        if (!item[info.field]) return;
        var safe = {
          title: _this2._hs(info.title),
          text: _this2._hs(item[info.field]),
          icon: info.icon || ''
        };
        var tmpl = "\n                <span title=\"" + safe.title + "\">\n                    " + safe.icon + "\n                    " + safe.text + "\n                </span>";
        infos.push(tmpl);
      });

      infos = infos.join('&middot;');
      var actions = [];

      for (var k in this._config.items.action) {
        var action = this._config.items.action[k];
        var _safe = {
          "class": 'btn-' + k,
          icon: action.icon || '',
          title: this._hs(action.title || '')
        };

        var _tmpl = "\n                <a href=\"#0\" class=\"btn btn-secondary " + _safe["class"] + "\" title=\"" + _safe.title + "\">\n                    " + _safe.icon + "\n                </a>";

        actions.push(_tmpl);
      }

      actions = actions.join('');
      var tmpl = "\n            <li class=\"list-group-item list-editor-item\" data-object=\"" + safe.object + "\" data-index=\"" + index + "\">\n                <div class=\"d-flex w-100 justify-content-between\">\n                    <h5 class=\"mb-1\">" + safe.title + "</h5>\n                    <div>\n                        <div class=\"btn-group btn-group-sm\" role=\"group\" aria-label=\"Action\">\n                            " + actions + "\n                        </div>\n                    </div>\n                </div>\n                <small>" + infos + "</small>\n            </li>";
      $(this._el.list).append(tmpl);
    };

    _proto._getConfig = function _getConfig(config) {
      var conf = {};

      for (var k in Default$b) {
        if ('items' === k) {
          conf[k] = {};

          if (config[k]) {
            for (var j in config[k]) {
              conf[k][j] = typeof config[k][j] === 'undefined' ? Default$b[k][j] : config[k][j];
            }
          }
        } else {
          conf[k] = typeof config[k] === 'undefined' ? Default$b[k] : config[k];
        }
      }

      return conf;
    };

    _proto._hs = function _hs(text) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    _proto._redrawItems = function _redrawItems() {
      var _this3 = this;

      this._value = this._el.model.value;

      try {
        this._value = JSON.parse(this._value);
      } catch (e) {
        this._value = [];
      }

      this._el.list.innerHTML = '';

      this._value.forEach(function (item, index) {
        return _this3._drawItem(item, index);
      });
    };

    _proto._updateModel = function _updateModel() {
      var value = [];

      for (var i = 0; i < this._el.list.children.length; i++) {
        var item = this._el.list.children[i];
        value.push(JSON.parse(item.dataset.object));
      }

      this._value = value;
      this._el.model.value = JSON.stringify(value);
    };

    return ListEditor;
  }();

  window.ListEditor = ListEditor;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'pwdstr';
  var VERSION$a = '0.0.1';
  var DATA_KEY$9 = 'bs.pwdstr';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$a];
  var Default$c = {
    progress: null,
    tester: function tester(cb, pass, input) {
      var score = 0;
      if (!pass) return cb(score); // award every unique letter until 5 repetitions

      var letters = new Object();

      for (var i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
      } // bonus points for mixing it up


      var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass)
      };
      var variationCount = 0;

      for (var check in variations) {
        variationCount += variations[check] == true ? 1 : 0;
      }

      score += (variationCount - 1) * 10;
      cb(parseInt(score));
    }
  };
  var DefaultType$8 = {
    progress: '(string|element)',
    tester: '(string|function)'
  };
  var Event$a = {
    INPUT_DATA_API: "input" + EVENT_KEY$9 + DATA_API_KEY$6,
    CHANGE_DATA_API: "change" + EVENT_KEY$9 + DATA_API_KEY$6,
    UPDATE_DATA_API: "update" + EVENT_KEY$9 + DATA_API_KEY$6
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var PasswordStrength =
  /*#__PURE__*/
  function () {
    function PasswordStrength(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._progress = this._config.progress;
      this._progress_bar = null;
      this._tester = this._config.tester;
      this._value = 0;
      if (typeof this._progress === 'string') this._progress = document.querySelector(this._progress);
      if (this._progress) this._progress_bar = $(this._progress).children('.progress-bar').get(0);
      if (typeof this._tester === 'string') this._tester = window[this._tester];

      this._addElementListener();
    } // Getters


    var _proto = PasswordStrength.prototype;

    // Public
    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$9);
      $.removeData(this._element, DATA_KEY$9);
      this._config = null;
      this._element = null;
      this._progress = null;
      this._progress_bar = null;
      this._tester = null;
      this._value = 0;
    } // Private
    ;

    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      $(this._element).on(Event$a.INPUT_DATA_API, function (e) {
        _this._calculateStrength(e);
      });
      $(this._element).on(Event$a.CHANGE_DATA_API, function (e) {
        _this._calculateStrength(e);
      });
    };

    _proto._calculateStrength = function _calculateStrength(event) {
      var _this2 = this;

      this._tester(function (res) {
        _this2._updateProgress(res);
      }, this._element.value, this._element);
    };

    _proto._updateProgress = function _updateProgress(value) {
      if (!this._progress_bar || this._value == value) return;
      this._value = value;
      if (value > 100) value = 100;
      var cls = 'progress-bar';
      if (value < 25) cls += ' bg-danger';else if (value < 50) cls += ' bg-warning';else if (value < 75) cls += ' bg-info';else cls += ' bg-success';

      this._progress_bar.setAttribute('aria-valuenow', value);

      this._progress_bar.setAttribute('class', cls);

      this._progress_bar.style.width = value + '%';
      $(this._element).trigger(Event$a.CHANGE_DATA_API, value);
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$c, config);
      Util.typeCheckConfig(NAME$a, config, DefaultType$8);
      return config;
    } // Static
    ;

    PasswordStrength._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$9);

        var _config = _objectSpread({}, Default$c, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new PasswordStrength(this, _config);
          $(this).data(DATA_KEY$9, data);
        }
      });
    };

    _createClass(PasswordStrength, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$c;
      }
    }]);

    return PasswordStrength;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = PasswordStrength._jQueryInterface;
  $.fn[NAME$a].Constructor = PasswordStrength;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$9;
    return PasswordStrength._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$b = 'pickercolor';
  var VERSION$b = '0.0.2';
  var DATA_KEY$a = 'bs.pickercolor';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$b];
  var Default$d = {
    input: null
  };
  var DefaultType$9 = {
    input: '(element|string)'
  };
  var Event$b = {
    CHANGE: "change" + EVENT_KEY$a + DATA_API_KEY$7
  };
  var COLOR_REGEX_STR = '^#[a-fA-F0-9]{6}';
  var COLOR_REGEX = new RegExp(COLOR_REGEX_STR);
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var PickerColor =
  /*#__PURE__*/
  function () {
    function PickerColor(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._input = config.input;
      if (typeof config.input === 'string') this._input = document.querySelector(config.input);

      this._modifyElement();

      this._addElementListener();

      this._input.value = this._element.value;
    } // Getters


    var _proto = PickerColor.prototype;

    // Private
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$d, config);
      Util.typeCheckConfig(NAME$b, config, DefaultType$9);
      return config;
    };

    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      $(this._element).on(Event$b.CHANGE, function (e) {
        _this._input.value = e.target.value.toUpperCase();

        _this._inputChanges();
      });
      $(this._input).on(Event$b.CHANGE, function (e) {
        return _this._inputChanges();
      });
    };

    _proto._inputChanges = function _inputChanges() {
      var val = this._input.value;

      if (COLOR_REGEX.test(val)) {
        this._input.setCustomValidity('');

        this._element.value = this._input.value;
      } else {
        this._input.setCustomValidity('Please enter valid HEX color');
      }
    };

    _proto._modifyElement = function _modifyElement() {
      var re = this._input.getAttribute('pattern');

      if (!re) this._input.setAttribute('pattern', COLOR_REGEX_STR);
    } // Static
    ;

    PickerColor._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$a);

        var _config = _objectSpread({}, Default$d, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new PickerColor(this, _config);
          $(this).data(DATA_KEY$a, data);
        }
      });
    };

    _createClass(PickerColor, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$b;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$d;
      }
    }]);

    return PickerColor;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$b] = PickerColor._jQueryInterface;
  $.fn[NAME$b].Constructor = PickerColor;

  $.fn[NAME$b].noConflict = function () {
    $.fn[NAME$b] = JQUERY_NO_CONFLICT$a;
    return PickerColor._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$c = 'rangetips';
  var VERSION$c = '0.0.1';
  var DATA_KEY$b = 'bs.rangetips';
  var EVENT_KEY$b = "." + DATA_KEY$b;
  var JQUERY_NO_CONFLICT$b = $.fn[NAME$c];
  var CLASS_PREFIX = 'bs-tooltip';
  var DefaultType$a = {
    template: 'string'
  };
  var Default$e = {
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>'
  };
  var ClassName$5 = {
    SHOW: 'show'
  };
  var Event$c = {
    FOCUSIN: "focusin" + EVENT_KEY$b,
    FOCUSOUT: "focusout" + EVENT_KEY$b,
    INPUT: "input" + EVENT_KEY$b,
    MOUSEENTER: "mouseenter" + EVENT_KEY$b,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$b
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var RangeTips =
  /*#__PURE__*/
  function () {
    function RangeTips(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._parent = element.parentNode;
      this._tooltips = this._makeTooltips();
      this._tooltipsInner = this._tooltips.querySelector('.tooltip-inner');
      this._tooltipsArrow = this._tooltips.querySelector('.arrow');
      this._isShown = false;

      this._handleParent();

      this._addElementListener();
    } // Getters


    var _proto = RangeTips.prototype;

    // Private
    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      $(this._element).on(Event$c.MOUSEENTER + " " + Event$c.FOCUSIN, function (e) {
        _this._show();
      }).on(Event$c.MOUSELEAVE, function (e) {
        if (document.activeElement !== _this._element) _this._hide();
      }).on(Event$c.FOCUSOUT, function (e) {
        if (!$(_this._element).is(':hover')) _this._hide();
      });
      $(this._element).on(Event$c.INPUT, function (e) {
        _this._updateLabel();

        _this._updatePosition();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$e, config);
      Util.typeCheckConfig(NAME$c, config, DefaultType$a);
      return config;
    };

    _proto._handleParent = function _handleParent() {
      this._parent.style.position = 'relative';
    };

    _proto._hide = function _hide() {
      if (!this._isShown) return;
      this._isShown = false;

      this._tooltips.classList.remove(ClassName$5.SHOW);
    };

    _proto._makeTooltips = function _makeTooltips() {
      var tooltips = $(this._config.template).get(0);
      tooltips.classList.add(CLASS_PREFIX + "-top");

      this._parent.appendChild(tooltips);

      return tooltips;
    };

    _proto._show = function _show() {
      if (this._isShown) return;
      this._isShown = true;

      this._updateLabel();

      this._tooltipsInner.innerText = this._element.value;
      var top = this._element.offsetTop - this._tooltips.offsetHeight;
      this._tooltips.style.top = top + 'px';

      this._tooltips.classList.add(ClassName$5.SHOW);

      this._updatePosition();
    };

    _proto._updatePosition = function _updatePosition() {
      var elValue = this._element.value;
      var elMax = this._element.max || 100;
      var elMin = this._element.min || 0;
      var elWidth = this._element.offsetWidth;
      var elWidthUsed = elWidth - 16;
      var ttWidth = this._tooltips.offsetWidth;
      var ttLeft = elValue / (elMax - elMin) * elWidthUsed - ttWidth / 2 + 8;
      if (elMin) ttLeft -= elMin / (elMax - elMin) * elWidthUsed;
      this._tooltips.style.left = ttLeft + 'px';
      var arWidth = 12.8;
      var arLeft = ttWidth / 2 - arWidth / 2;
      this._tooltipsArrow.style.left = arLeft + 'px';
    };

    _proto._updateLabel = function _updateLabel() {
      this._tooltipsInner.innerText = this._element.value;
    } // Static
    ;

    RangeTips._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$b);

        var _config = _objectSpread({}, Default$e, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new RangeTips(this, _config);
          $(this).data(DATA_KEY$b, data);
        }
      });
    };

    _createClass(RangeTips, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$c;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$e;
      }
    }]);

    return RangeTips;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$c] = RangeTips._jQueryInterface;
  $.fn[NAME$c].Constructor = RangeTips;

  $.fn[NAME$c].noConflict = function () {
    $.fn[NAME$c] = JQUERY_NO_CONFLICT$b;
    return RangeTips._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$d = 'slugify';
  var VERSION$d = '0.0.1';
  var DATA_KEY$c = 'bs.slugify';
  var EVENT_KEY$c = "." + DATA_KEY$c;
  var DATA_API_KEY$8 = '.data-api';
  var JQUERY_NO_CONFLICT$c = $.fn[NAME$d];
  var Default$f = {};
  var Event$d = {
    INPUT_DATA_API: "input" + EVENT_KEY$c + DATA_API_KEY$8,
    FOCUS_DATA_API: "focus" + EVENT_KEY$c + DATA_API_KEY$8
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Slugify =
  /*#__PURE__*/
  function () {
    function Slugify(element, config) {
      this._element = element;
      this._source = document.querySelector(config.source);
      if (this._element.value) return;

      this._addElementListener();

      this._addSourceListener();
    } // Getters


    var _proto = Slugify.prototype;

    // Public
    // Private
    _proto._addElementListener = function _addElementListener() {
      var _this = this;

      $(this._element).on(Event$d.FOCUS_DATA_API, function (e) {
        $(_this._source).off(Event$d.INPUT_DATA_API);
      });
    };

    _proto._addSourceListener = function _addSourceListener() {
      var _this2 = this;

      $(this._source).on(Event$d.INPUT_DATA_API, function (e) {
        _this2._element.value = _this2._source.value.toLowerCase().replace(/[^\w\-]/g, '-').replace(/\-+/g, '-').replace(/^\-|\-$/g, '');
      });
    } // Static
    ;

    Slugify._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$c);

        var _config = _objectSpread({}, Default$f, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Slugify(this, _config);
          $(this).data(DATA_KEY$c, data);
        }
      });
    };

    _createClass(Slugify, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$d;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$f;
      }
    }]);

    return Slugify;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$d] = Slugify._jQueryInterface;
  $.fn[NAME$d].Constructor = Slugify;

  $.fn[NAME$d].noConflict = function () {
    $.fn[NAME$d] = JQUERY_NO_CONFLICT$c;
    return Slugify._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$e = 'taginput';
  var VERSION$e = '0.0.3';
  var DATA_KEY$d = 'bs.taginput';
  var EVENT_KEY$d = "." + DATA_KEY$d;
  var JQUERY_NO_CONFLICT$d = $.fn[NAME$e];
  var ENTER_KEYCODE = 13; // KeyboardEvent.which value for Enter key
  // const COMMA_KEYCODE      = 188 // KeyboardEvent.which value for Comma (,) key

  var COMMA_KEY = ',';
  var Default$g = {};
  var DefaultType$b = {};
  var Event$e = {
    CLICK_ITEM_DISMISS: "click.dismiss" + EVENT_KEY$d,
    FILTER_KEYDOWN: "keydown.filter" + EVENT_KEY$d
  };
  var ClassName$6 = {
    CONTAINER: 'tag-input-container',
    FILTER: 'tag-input-filter',
    ITEMS: 'tag-input-items',
    VALUE: 'tag-input-value'
  };
  var Selector$6 = {
    FILTER: "." + ClassName$6.FILTER,
    ITEMS: "." + ClassName$6.ITEMS,
    VALUE: "." + ClassName$6.VALUE,
    DISMISS_ITEM: ".close"
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var TagInput =
  /*#__PURE__*/
  function () {
    function TagInput(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._parent = element.parentNode;
      this._items = this._parent.querySelector(Selector$6.ITEMS);
      this._input = this._parent.querySelector(Selector$6.VALUE);

      this._setInputListener();

      this._setFilterListener();

      this._setItemsListener();

      this._renderValue();
    } // Getters


    var _proto = TagInput.prototype;

    // Private
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$g, config);
      Util.typeCheckConfig(NAME$e, config, DefaultType$b);
      return config;
    };

    _proto._addItem = function _addItem(text) {
      if (this._values.includes(text)) return;
      var index = this._values.length;

      this._values.push(text);

      this._input.value = JSON.stringify(this._values);

      this._addListItem(text);
    };

    _proto._addListItem = function _addListItem(text) {
      var li = document.createElement('li');
      li.innerText = text;
      var btn = document.createElement('button');
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', 'Delete');
      btn.setAttribute('data-dismiss', 'tag-item');
      btn.classList.add('close');
      var span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = '&times;';
      btn.appendChild(span);
      li.appendChild(btn);

      this._items.appendChild(li);
    };

    _proto._removeItem = function _removeItem(index) {
      this._values.splice(index, 1);

      this._input.value = this._values.length ? JSON.stringify(this._values) : '';

      this._removeListItem(index);
    };

    _proto._removeListItem = function _removeListItem(index) {
      var el = this._items.querySelector('li:nth-child(' + (index + 1) + ')');

      this._items.removeChild(el);
    };

    _proto._setFilterListener = function _setFilterListener() {
      var _this = this;

      $(this._element).on(Event$e.FILTER_KEYDOWN, function (e) {
        if (e.keyCode !== ENTER_KEYCODE && e.key !== COMMA_KEY) return;
        e.preventDefault();

        var text = _this._element.value.trim();

        if (text) {
          _this._addItem(text);

          _this._element.value = '';
        }

        return false;
      });
    };

    _proto._setInputListener = function _setInputListener() {
      var _this2 = this;

      $(this._input).on('change', function () {
        _this2._renderValue();
      });
    };

    _proto._setItemsListener = function _setItemsListener() {
      var _this3 = this;

      $(this._items).on(Event$e.CLICK_ITEM_DISMISS, Selector$6.DISMISS_ITEM, function (e) {
        var index = $(_this3._items).children('li').index(e.currentTarget.parentNode);

        _this3._removeItem(index);
      });
    };

    _proto._renderValue = function _renderValue() {
      $(this._items).html('');

      try {
        this._values = JSON.parse(this._input.value);
      } catch (e) {
        this._values = [];
      }

      if (!Array.isArray(this._values)) this._values = [];

      for (var i = 0; i < this._values.length; i++) {
        this._addListItem(this._values[i]);
      }
    } // Static
    ;

    TagInput._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$d);

        var _config = _objectSpread({}, Default$g, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new TagInput(this, _config);
          $(this).data(DATA_KEY$d, data);
        }
      });
    };

    _createClass(TagInput, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$e;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$g;
      }
    }]);

    return TagInput;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$e] = TagInput._jQueryInterface;
  $.fn[NAME$e].Constructor = TagInput;

  $.fn[NAME$e].noConflict = function () {
    $.fn[NAME$e] = JQUERY_NO_CONFLICT$d;
    return TagInput._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$f = 'toaster';
  var VERSION$f = '0.0.1';
  var Default$h = {
    title: false,
    content: '<em>No content</em>',
    delay: 3000,
    position: 'top right'
  };
  var DefaultTitle = {
    text: '',
    icon: null,
    image: null,
    close: true,
    info: false
  };
  var ToasterObject;
  var ToasterContainer = {};
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toaster =
  /*#__PURE__*/
  function () {
    function Toaster(opt, title) {
      if (null === opt) return;
      if (!ToasterObject) ToasterObject = new Toaster(null);

      ToasterObject._open(opt, title);
    } // Privates


    var _proto = Toaster.prototype;

    _proto._getContainer = function _getContainer(config) {
      var position = (config.position || 'top right').split(' ');
      var ver = position[0] || 'top';
      var hor = position[1] || 'right';
      if (!['top', 'bottom'].includes(ver)) ver = 'top';
      if (!['left', 'center', 'right'].includes(hor)) hor = 'right';
      position = ver + " " + hor;
      if (ToasterContainer[position]) return ToasterContainer[position];

      var html = this._makeContainer(ver, hor);

      ToasterContainer[position] = $(html).appendTo('body');
      return ToasterContainer[position];
    };

    _proto._makeBody = function _makeBody(config) {
      return "<div class=\"toast-body\">" + config.content + "</div>";
    };

    _proto._makeContainer = function _makeContainer(ver, hor) {
      var css = "position:fixed;width:320px;" + ver + ":20px;z-index:1060;";
      if (hor === 'center') css += 'left:50%;margin-left:-160px';else css += hor + ":20px";
      return "<div aria-live=\"polite\" aria-atomic=\"true\" style=\"" + css + "\"></div>";
    };

    _proto._makeHeader = function _makeHeader(config) {
      if (!config.title) return '';
      if (typeof config.title === 'string') config.title = {
        text: config.title
      };

      var title = _objectSpread({}, DefaultTitle, config.title);

      var eImage = '';
      if (title.image) eImage = "<img src=\"" + title.image + "\" class=\"rounded mr-2\" alt=\"#\">";else if (title.icon) eImage = "<i class=\"" + title.icon + " mr-2\"></i>";
      var eTitle = !title.text ? '' : "<strong class=\"mr-auto\">" + title.text + "</strong>";
      var eInfo = !title.info ? '' : "<small>" + title.info + "</small>";
      var eClose = !title.close ? '' : " <button type=\"button\" class=\"ml-2 mb-1 close\" data-dismiss=\"toast\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>";
      return "\n            <div class=\"toast-header\">\n                " + eImage + "\n                " + eTitle + "\n                " + eInfo + "\n                " + eClose + "\n            </div>\n        ";
    };

    _proto._makeHtml = function _makeHtml(config) {
      var header = this._makeHeader(config);

      var body = this._makeBody(config);

      return "\n            <div class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n                " + header + " " + body + "\n            </div>";
    };

    _proto._open = function _open(opt, title) {
      if (typeof opt !== 'object') {
        opt = {
          content: opt
        };
        if (undefined !== title) opt.title = title;
      }

      var config = _objectSpread({}, Default$h, opt);

      var html = this._makeHtml(config);

      $(html).appendTo(this._getContainer(config)).toast({
        animation: true,
        autohide: true,
        delay: config.delay
      }).toast('show').on('hidden.bs.toast', function () {
        $(this).remove();
      });
    } // Getters
    ;

    // Static
    Toaster.setDefault = function setDefault(opts) {
      for (var k in opts) {
        Default$h[k] = opts[k];
      }
    };

    _createClass(Toaster, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$f;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$h;
      }
    }]);

    return Toaster;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $[NAME$f] = Toaster;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$g = 'vertmenu';
  var VERSION$g = '0.0.3';
  var DATA_KEY$e = 'bs.vertmenu';
  var EVENT_KEY$e = "." + DATA_KEY$e;
  var DATA_API_KEY$9 = '.data-api';
  var JQUERY_NO_CONFLICT$e = $.fn[NAME$g];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var Default$i = {
    toggle: false
  };
  var DefaultType$c = {
    toggle: 'boolean'
  };
  var Event$f = {
    SHOW: "show" + EVENT_KEY$e,
    SHOWN: "shown" + EVENT_KEY$e,
    HIDE: "hide" + EVENT_KEY$e,
    HIDDEN: "hidden" + EVENT_KEY$e,
    CLICK_DATA_API: "click" + EVENT_KEY$e + DATA_API_KEY$9,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$e + DATA_API_KEY$9
  };
  var ClassName$7 = {
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed',
    MENU: 'vertical-menu',
    MENU_PARENT: 'vertical-menu-parent',
    SHOW: 'show'
  };
  var Selector$7 = {
    DATA_TOGGLE: '[data-toggle="vertical-menu"]',
    MENU: "." + ClassName$7.MENU
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var VerticalMenu =
  /*#__PURE__*/
  function () {
    function VerticalMenu(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._parent = element.parentNode;
      if (this._config.toggle) this.toggle();
    } // Getters


    var _proto = VerticalMenu.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._parent).hasClass(ClassName$7.SHOW)) this.hide();else this.show();
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$7.SHOW)) return;
      var startEvent = $.Event(Event$f.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) return;
      var dimension = 'height';
      $(this._element).removeClass(ClassName$7.COLLAPSE).addClass(ClassName$7.COLLAPSING);
      this._element.style[dimension] = 0;
      $(this._parent).addClass(ClassName$7.SHOW);
      this._isTransitioning = true;

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$7.COLLAPSING).addClass(ClassName$7.COLLAPSE);
        _this._element.style[dimension] = '';
        _this._isTransitioning = false;
        $(_this._element).trigger(Event$f.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._parent).hasClass(ClassName$7.SHOW)) return;
      var startEvent = $.Event(Event$f.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) return;
      var dimension = 'height';
      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$7.COLLAPSING).removeClass(ClassName$7.COLLAPSE);
      this._isTransitioning = true;

      var complete = function complete() {
        _this2._isTransitioning = false;
        $(_this2._parent).removeClass(ClassName$7.SHOW);
        $(_this2._element).trigger(Event$f.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$e);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$i, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$g, config, DefaultType$c);
      return config;
    } // Static
    ;

    VerticalMenu._handleDownKey = function _handleDownKey(event) {
      //   a
      //      b
      //          c <--           ( you're here )
      //              d           ( 1 )
      //              d1
      //              d2
      //          c1              ( 2 )
      //          c2
      //      b1                  ( 3 )
      //      b2
      //   a1                     ( 4 )
      //   a2
      var target = event.target;
      var parent = target.parentNode;
      var siblingUl = target.nextElementSibling;
      var parentOpen = parent.classList.contains(ClassName$7.SHOW);
      var next; // ( 1 )

      if (siblingUl && parentOpen) next = $(parent).find('> ul >li:first-child > a').get(0); // ( 2,3,4 )

      if (!next) {
        // let find next menu item
        var cTarget = target;

        while (true) {
          var cParent = cTarget.parentNode; // li

          var CPNext = cParent.nextElementSibling; // li:next

          if (CPNext) {
            next = $(CPNext).children('a').get(0);
            break;
          }

          var cPParent = cParent.parentNode; // ul

          var cPPLi = cPParent.parentNode; // li?

          if (cPPLi.tagName != 'LI' || cPPLi.classList.contains(ClassName$7.MENU)) break;
          cTarget = $(cPPLi).children('a').get(0);
          if (cTarget) continue;
          break;
        }
      }

      if (next) next.focus();
      return true;
    };

    VerticalMenu._handleLeftKey = function _handleLeftKey(event) {
      var target = event.target;
      var parent = target.parentNode;
      var siblingUl = target.nextElementSibling;
      var parentOpen = parent.classList.contains(ClassName$7.SHOW);

      if (siblingUl && parentOpen) {
        target.click();
      } else {
        var gParent = parent.parentNode.parentNode;
        if (gParent.classList.contains(ClassName$7.MENU_PARENT)) $(gParent).children('a').focus();
      }

      return true;
    };

    VerticalMenu._handleRightKey = function _handleRightKey(event) {
      var target = event.target;
      var parent = target.parentNode;
      var siblingUl = target.nextElementSibling;
      var parentOpen = parent.classList.contains(ClassName$7.SHOW);
      if (siblingUl && !parentOpen) target.click();
      return true;
    };

    VerticalMenu._handleUpKey = function _handleUpKey(event) {
      //   a
      //   a1                             ( 5 )
      //      b
      //      b1
      //      b2                          ( 4 )
      //          c
      //          c1
      //          c2                      ( 3 )
      //              d
      //              d1
      //              d2                  ( 2 )
      //   a2                             ( 1 )
      //   a3                 <!--        ( you're here )
      var target = event.target; // a

      var parent = target.parentNode; // li

      var prev;
      var prevParent = parent.previousElementSibling;

      if (prevParent) {
        var hasChildren = prevParent.classList.contains(ClassName$7.MENU_PARENT);
        var isOpen = prevParent.classList.contains(ClassName$7.SHOW);

        if (hasChildren && isOpen) {
          var nextParent = prevParent;

          while (true) {
            var nextPUl = $(nextParent).children('ul').get(0);
            var lastNPUlLI = nextPUl.lastElementChild;
            if (!lastNPUlLI) break;

            var _hasChildren = lastNPUlLI.classList.contains(ClassName$7.MENU_PARENT);

            var _isOpen = lastNPUlLI.classList.contains(ClassName$7.SHOW);

            if (!_hasChildren || !_isOpen) {
              prev = $(lastNPUlLI).children('a').get(0);
              break;
            }

            nextParent = lastNPUlLI;
          }
        } else {
          prev = $(prevParent).children('a').get(0);
        }
      } else {
        var pParent = parent.parentNode; // ul

        var pPLi = pParent.parentNode; // li

        if (pPLi.tagName === 'LI' && !pPLi.classList.contains(ClassName$7.MENU)) prev = $(pPLi).children('a');
      }

      if (prev) prev.focus();
      return true;
    };

    VerticalMenu._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      var prevent = false;

      switch (event.keyCode) {
        case ARROW_DOWN_KEYCODE:
          prevent = VerticalMenu._handleDownKey(event);
          break;

        case ARROW_LEFT_KEYCODE:
          prevent = VerticalMenu._handleLeftKey(event);
          break;

        case ARROW_RIGHT_KEYCODE:
          prevent = VerticalMenu._handleRightKey(event);
          break;

        case ARROW_UP_KEYCODE:
          prevent = VerticalMenu._handleUpKey(event);
          break;
      }

      if (prevent) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    VerticalMenu._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$e);

        var _config = _objectSpread({}, Default$i, $this.data(), typeof config === 'object' && config ? config : {});

        if (_config.toggle && _config.toggle === 'vertical-menu') _config.toggle = false;
        if (!data && _config.toggle && /show|hide/.test(config)) _config.toggle = false;

        if (!data) {
          data = new VerticalMenu(this, _config);
          $this.data(DATA_KEY$e, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') throw new TypeError("No method named \"" + config + "\"");
          data[config]();
        }
      });
    };

    _createClass(VerticalMenu, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$g;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$i;
      }
    }]);

    return VerticalMenu;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$f.CLICK_DATA_API, Selector$7.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var $target = $trigger.next('ul');

    VerticalMenu._jQueryInterface.call($target, 'toggle');
  });
  $(document).on(Event$f.KEYDOWN_DATA_API, Selector$7.MENU, VerticalMenu._dataApiKeydownHandler);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$g] = VerticalMenu._jQueryInterface;
  $.fn[NAME$g].Constructor = VerticalMenu;

  $.fn[NAME$g].noConflict = function () {
    $.fn[NAME$g] = JQUERY_NO_CONFLICT$e;
    return VerticalMenu._jQueryInterface;
  };

  /*!
   * Viewer.js v1.3.4
   * https://fengyuanchen.github.io/viewerjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2019-06-01T03:32:35.881Z
   */
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  var DEFAULTS = {
    /**
     * Enable a modal backdrop, specify `static` for a backdrop
     * which doesn't close the modal on click.
     * @type {boolean}
     */
    backdrop: true,

    /**
     * Show the button on the top-right of the viewer.
     * @type {boolean}
     */
    button: true,

    /**
     * Show the navbar.
     * @type {boolean | number}
     */
    navbar: true,

    /**
     * Specify the visibility and the content of the title.
     * @type {boolean | number | Function | Array}
     */
    title: true,

    /**
     * Show the toolbar.
     * @type {boolean | number | Object}
     */
    toolbar: true,

    /**
     * Custom class name(s) to add to the viewer's root element.
     * @type {string}
     */
    className: '',

    /**
     * Define where to put the viewer in modal mode.
     * @type {string | Element}
     */
    container: 'body',

    /**
     * Filter the images for viewing. Return true if the image is viewable.
     * @type {Function}
     */
    filter: null,

    /**
     * Enable to request fullscreen when play.
     * @type {boolean}
     */
    fullscreen: true,

    /**
     * Define the initial index of image for viewing.
     * @type {number}
     */
    initialViewIndex: 0,

    /**
     * Enable inline mode.
     * @type {boolean}
     */
    inline: false,

    /**
     * The amount of time to delay between automatically cycling an image when playing.
     * @type {number}
     */
    interval: 5000,

    /**
     * Enable keyboard support.
     * @type {boolean}
     */
    keyboard: true,

    /**
     * Indicate if show a loading spinner when load image or not.
     * @type {boolean}
     */
    loading: true,

    /**
     * Indicate if enable loop viewing or not.
     * @type {boolean}
     */
    loop: true,

    /**
     * Min width of the viewer in inline mode.
     * @type {number}
     */
    minWidth: 200,

    /**
     * Min height of the viewer in inline mode.
     * @type {number}
     */
    minHeight: 100,

    /**
     * Enable to move the image.
     * @type {boolean}
     */
    movable: true,

    /**
     * Enable to zoom the image.
     * @type {boolean}
     */
    zoomable: true,

    /**
     * Enable to rotate the image.
     * @type {boolean}
     */
    rotatable: true,

    /**
     * Enable to scale the image.
     * @type {boolean}
     */
    scalable: true,

    /**
     * Indicate if toggle the image size between its natural size
     * and initial size when double click on the image or not.
     * @type {boolean}
     */
    toggleOnDblclick: true,

    /**
     * Show the tooltip with image ratio (percentage) when zoom in or zoom out.
     * @type {boolean}
     */
    tooltip: true,

    /**
     * Enable CSS3 Transition for some special elements.
     * @type {boolean}
     */
    transition: true,

    /**
     * Define the CSS `z-index` value of viewer in modal mode.
     * @type {number}
     */
    zIndex: 2015,

    /**
     * Define the CSS `z-index` value of viewer in inline mode.
     * @type {number}
     */
    zIndexInline: 0,

    /**
     * Define the ratio when zoom the image by wheeling mouse.
     * @type {number}
     */
    zoomRatio: 0.1,

    /**
     * Define the min ratio of the image when zoom out.
     * @type {number}
     */
    minZoomRatio: 0.01,

    /**
     * Define the max ratio of the image when zoom in.
     * @type {number}
     */
    maxZoomRatio: 100,

    /**
     * Define where to get the original image URL for viewing.
     * @type {string | Function}
     */
    url: 'src',

    /**
     * Event shortcuts.
     * @type {Function}
     */
    ready: null,
    show: null,
    shown: null,
    hide: null,
    hidden: null,
    view: null,
    viewed: null,
    zoom: null,
    zoomed: null
  };
  var TEMPLATE = '<div class="viewer-container" touch-action="none">' + '<div class="viewer-canvas"></div>' + '<div class="viewer-footer">' + '<div class="viewer-title"></div>' + '<div class="viewer-toolbar"></div>' + '<div class="viewer-navbar">' + '<ul class="viewer-list"></ul>' + '</div>' + '</div>' + '<div class="viewer-tooltip"></div>' + '<div role="button" class="viewer-button" data-viewer-action="mix"></div>' + '<div class="viewer-player"></div>' + '</div>';
  var IS_BROWSER = typeof window !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
  var NAMESPACE = 'viewer'; // Actions

  var ACTION_MOVE = 'move';
  var ACTION_SWITCH = 'switch';
  var ACTION_ZOOM = 'zoom'; // Classes

  var CLASS_ACTIVE = "".concat(NAMESPACE, "-active");
  var CLASS_CLOSE = "".concat(NAMESPACE, "-close");
  var CLASS_FADE = "".concat(NAMESPACE, "-fade");
  var CLASS_FIXED = "".concat(NAMESPACE, "-fixed");
  var CLASS_FULLSCREEN = "".concat(NAMESPACE, "-fullscreen");
  var CLASS_FULLSCREEN_EXIT = "".concat(NAMESPACE, "-fullscreen-exit");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_HIDE_MD_DOWN = "".concat(NAMESPACE, "-hide-md-down");
  var CLASS_HIDE_SM_DOWN = "".concat(NAMESPACE, "-hide-sm-down");
  var CLASS_HIDE_XS_DOWN = "".concat(NAMESPACE, "-hide-xs-down");
  var CLASS_IN = "".concat(NAMESPACE, "-in");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_LOADING = "".concat(NAMESPACE, "-loading");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move");
  var CLASS_OPEN = "".concat(NAMESPACE, "-open");
  var CLASS_SHOW = "".concat(NAMESPACE, "-show");
  var CLASS_TRANSITION = "".concat(NAMESPACE, "-transition"); // Events

  var EVENT_CLICK = 'click';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_DRAG_START = 'dragstart';
  var EVENT_HIDDEN = 'hidden';
  var EVENT_HIDE = 'hide';
  var EVENT_KEY_DOWN = 'keydown';
  var EVENT_LOAD = 'load';
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
  var EVENT_READY = 'ready';
  var EVENT_RESIZE = 'resize';
  var EVENT_SHOW = 'show';
  var EVENT_SHOWN = 'shown';
  var EVENT_TRANSITION_END = 'transitionend';
  var EVENT_VIEW = 'view';
  var EVENT_VIEWED = 'viewed';
  var EVENT_WHEEL = 'wheel';
  var EVENT_ZOOM = 'zoom';
  var EVENT_ZOOMED = 'zoomed'; // Data keys

  var DATA_ACTION = "".concat(NAMESPACE, "Action"); // RegExps

  var REGEXP_SPACES = /\s\s*/; // Misc

  var BUTTONS = ['zoom-in', 'zoom-out', 'one-to-one', 'reset', 'prev', 'play', 'next', 'rotate-left', 'rotate-right', 'flip-horizontal', 'flip-vertical'];
  /**
   * Check if the given value is a string.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a string, else `false`.
   */

  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * Check if the given value is not a number.
   */


  var isNaN$1 = Number.isNaN || WINDOW.isNaN;
  /**
   * Check if the given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
   */

  function isNumber(value) {
    return typeof value === 'number' && !isNaN$1(value);
  }
  /**
   * Check if the given value is undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
   */


  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */


  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * Check if the given value is a plain object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
   */

  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }

    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }
  /**
   * Check if the given value is a function.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
   */


  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * Iterate the given data.
   * @param {*} data - The data to iterate.
   * @param {Function} callback - The process function for each element.
   * @returns {*} The original data.
   */


  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length)
      /* array-like */
      ) {
          var length = data.length;
          var i;

          for (i = 0; i < length; i += 1) {
            if (callback.call(data, data[i], i, data) === false) {
              break;
            }
          }
        } else if (isObject(data)) {
        Object.keys(data).forEach(function (key) {
          callback.call(data, data[key], key, data);
        });
      }
    }

    return data;
  }
  /**
   * Extend the given object.
   * @param {*} obj - The object to be extended.
   * @param {*} args - The rest objects which will be merged to the first object.
   * @returns {Object} The extended object.
   */


  var assign = Object.assign || function assign(obj) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (isObject(obj) && args.length > 0) {
      args.forEach(function (arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            obj[key] = arg[key];
          });
        }
      });
    }

    return obj;
  };

  var REGEXP_SUFFIX = /^(?:width|height|left|top|marginLeft|marginTop)$/;
  /**
   * Apply styles to the given element.
   * @param {Element} element - The target element.
   * @param {Object} styles - The styles for applying.
   */

  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function (value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value += 'px';
      }

      style[property] = value;
    });
  }
  /**
   * Escape a string for using in HTML.
   * @param {String} value - The string to escape.
   * @returns {String} Returns the escaped string.
   */


  function escapeHTMLEntities(value) {
    return isString(value) ? value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : value;
  }
  /**
   * Check if the given element has a special class.
   * @param {Element} element - The element to check.
   * @param {string} value - The class to search.
   * @returns {boolean} Returns `true` if the special class was found.
   */


  function hasClass(element, value) {
    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }
  /**
   * Add classes to the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be added.
   */


  function addClass(element, value) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        addClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.add(value);
      return;
    }

    var className = element.className.trim();

    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }
  /**
   * Remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be removed.
   */


  function removeClass(element, value) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        removeClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.remove(value);
      return;
    }

    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }
  /**
   * Add or remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be toggled.
   * @param {boolean} added - Add only.
   */


  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        toggleClass(elem, value, added);
      });
      return;
    } // IE10-11 doesn't support the second parameter of `classList.toggle`


    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }

  var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
  /**
   * Transform the given string from camelCase to kebab-case
   * @param {string} value - The value to transform.
   * @returns {string} The transformed value.
   */

  function hyphenate(value) {
    return value.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
  }
  /**
   * Get data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to get.
   * @returns {string} The data value.
   */


  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }

    if (element.dataset) {
      return element.dataset[name];
    }

    return element.getAttribute("data-".concat(hyphenate(name)));
  }
  /**
   * Set data to the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to set.
   * @param {string} data - The data value.
   */


  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(hyphenate(name)), data);
    }
  }

  var onceSupported = function () {
    var supported = false;

    if (IS_BROWSER) {
      var once = false;

      var listener = function listener() {};

      var options = Object.defineProperty({}, 'once', {
        get: function get() {
          supported = true;
          return once;
        },

        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }

    return supported;
  }();
  /**
   * Remove event listener from the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */


  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (!onceSupported) {
        var listeners = element.listeners;

        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];

          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }

          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }

      element.removeEventListener(event, handler, options);
    });
  }
  /**
   * Add event listener to the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */


  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners,
            listeners = _element$listeners === void 0 ? {} : _element$listeners;

        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          listener.apply(element, args);
        };

        if (!listeners[event]) {
          listeners[event] = {};
        }

        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }

        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }

      element.addEventListener(event, _handler, options);
    });
  }
  /**
   * Dispatch event on the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Object} data - The additional event data.
   * @returns {boolean} Indicate if the event is default prevented or not.
   */


  function dispatchEvent(element, type, data) {
    var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }

    return element.dispatchEvent(event);
  }
  /**
   * Get the offset base on the document.
   * @param {Element} element - The target element.
   * @returns {Object} The offset data.
   */


  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  /**
   * Get transforms base on the given object.
   * @param {Object} obj - The target object.
   * @returns {string} A string contains transform values.
   */


  function getTransforms(_ref) {
    var rotate = _ref.rotate,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        translateX = _ref.translateX,
        translateY = _ref.translateY;
    var values = [];

    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }

    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    } // Rotate should come first before scale to match orientation transform


    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }

    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }

    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }

    var transform = values.length ? values.join(' ') : 'none';
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    };
  }
  /**
   * Get an image name from an image url.
   * @param {string} url - The target url.
   * @example
   * // picture.jpg
   * getImageNameFromURL('http://domain.com/path/to/picture.jpg?size=1280×960')
   * @returns {string} A string contains the image name.
   */


  function getImageNameFromURL(url) {
    return isString(url) ? decodeURIComponent(url.replace(/^.*\//, '').replace(/[?&#].*$/, '')) : '';
  }

  var IS_SAFARI = WINDOW.navigator && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(WINDOW.navigator.userAgent);
  /**
   * Get an image's natural sizes.
   * @param {string} image - The target image.
   * @param {Function} callback - The callback function.
   * @returns {HTMLImageElement} The new image.
   */

  function getImageNaturalSizes(image, callback) {
    var newImage = document.createElement('img'); // Modern browsers (except Safari)

    if (image.naturalWidth && !IS_SAFARI) {
      callback(image.naturalWidth, image.naturalHeight);
      return newImage;
    }

    var body = document.body || document.documentElement;

    newImage.onload = function () {
      callback(newImage.width, newImage.height);

      if (!IS_SAFARI) {
        body.removeChild(newImage);
      }
    };

    newImage.src = image.src; // iOS Safari will convert the image automatically
    // with its orientation once append it into DOM

    if (!IS_SAFARI) {
      newImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
      body.appendChild(newImage);
    }

    return newImage;
  }
  /**
   * Get the related class name of a responsive type number.
   * @param {string} type - The responsive type.
   * @returns {string} The related class name.
   */


  function getResponsiveClass(type) {
    switch (type) {
      case 2:
        return CLASS_HIDE_XS_DOWN;

      case 3:
        return CLASS_HIDE_SM_DOWN;

      case 4:
        return CLASS_HIDE_MD_DOWN;

      default:
        return '';
    }
  }
  /**
   * Get the max ratio of a group of pointers.
   * @param {string} pointers - The target pointers.
   * @returns {number} The result ratio.
   */


  function getMaxZoomRatio(pointers) {
    var pointers2 = assign({}, pointers);
    var ratios = [];
    forEach(pointers, function (pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function (pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;
        ratios.push(ratio);
      });
    });
    ratios.sort(function (a, b) {
      return Math.abs(a) < Math.abs(b);
    });
    return ratios[0];
  }
  /**
   * Get a pointer from an event object.
   * @param {Object} event - The target event object.
   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
   * @returns {Object} The result pointer contains start and/or end point coordinates.
   */


  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX,
        pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : assign({
      timeStamp: Date.now(),
      startX: pageX,
      startY: pageY
    }, end);
  }
  /**
   * Get the center point coordinate of a group of pointers.
   * @param {Object} pointers - The target pointers.
   * @returns {Object} The center point coordinate.
   */


  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function (_ref3) {
      var startX = _ref3.startX,
          startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX: pageX,
      pageY: pageY
    };
  }

  var render = {
    render: function render() {
      this.initContainer();
      this.initViewer();
      this.initList();
      this.renderViewer();
    },
    initContainer: function initContainer() {
      this.containerData = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    initViewer: function initViewer() {
      var options = this.options,
          parent = this.parent;
      var viewerData;

      if (options.inline) {
        viewerData = {
          width: Math.max(parent.offsetWidth, options.minWidth),
          height: Math.max(parent.offsetHeight, options.minHeight)
        };
        this.parentData = viewerData;
      }

      if (this.fulled || !viewerData) {
        viewerData = this.containerData;
      }

      this.viewerData = assign({}, viewerData);
    },
    renderViewer: function renderViewer() {
      if (this.options.inline && !this.fulled) {
        setStyle(this.viewer, this.viewerData);
      }
    },
    initList: function initList() {
      var _this = this;

      var element = this.element,
          options = this.options,
          list = this.list;
      var items = [];
      forEach(this.images, function (image, i) {
        var src = escapeHTMLEntities(image.src);
        var alt = escapeHTMLEntities(image.alt || getImageNameFromURL(src));
        var url = options.url;

        if (isString(url)) {
          url = escapeHTMLEntities(image.getAttribute(url));
        } else if (isFunction(url)) {
          url = escapeHTMLEntities(url.call(_this, image));
        }

        if (src || url) {
          items.push('<li>' + '<img' + " src=\"".concat(src || url, "\"") + ' role="button"' + ' data-viewer-action="view"' + " data-index=\"".concat(i, "\"") + " data-original-url=\"".concat(url || src, "\"") + " alt=\"".concat(alt, "\"") + '>' + '</li>');
        }
      });
      list.innerHTML = items.join('');
      this.items = list.getElementsByTagName('li');
      forEach(this.items, function (item) {
        var image = item.firstElementChild;
        setData(image, 'filled', true);

        if (options.loading) {
          addClass(item, CLASS_LOADING);
        }

        addListener(image, EVENT_LOAD, function (event) {
          if (options.loading) {
            removeClass(item, CLASS_LOADING);
          }

          _this.loadImage(event);
        }, {
          once: true
        });
      });

      if (options.transition) {
        addListener(element, EVENT_VIEWED, function () {
          addClass(list, CLASS_TRANSITION);
        }, {
          once: true
        });
      }
    },
    renderList: function renderList(index) {
      var i = index || this.index;
      var width = this.items[i].offsetWidth || 30;
      var outerWidth = width + 1; // 1 pixel of `margin-left` width
      // Place the active item in the center of the screen

      setStyle(this.list, assign({
        width: outerWidth * this.length
      }, getTransforms({
        translateX: (this.viewerData.width - width) / 2 - outerWidth * i
      })));
    },
    resetList: function resetList() {
      var list = this.list;
      list.innerHTML = '';
      removeClass(list, CLASS_TRANSITION);
      setStyle(list, getTransforms({
        translateX: 0
      }));
    },
    initImage: function initImage(done) {
      var _this2 = this;

      var options = this.options,
          image = this.image,
          viewerData = this.viewerData;
      var footerHeight = this.footer.offsetHeight;
      var viewerWidth = viewerData.width;
      var viewerHeight = Math.max(viewerData.height - footerHeight, footerHeight);
      var oldImageData = this.imageData || {};
      var sizingImage;
      this.imageInitializing = {
        abort: function abort() {
          sizingImage.onload = null;
        }
      };
      sizingImage = getImageNaturalSizes(image, function (naturalWidth, naturalHeight) {
        var aspectRatio = naturalWidth / naturalHeight;
        var width = viewerWidth;
        var height = viewerHeight;
        _this2.imageInitializing = false;

        if (viewerHeight * aspectRatio > viewerWidth) {
          height = viewerWidth / aspectRatio;
        } else {
          width = viewerHeight * aspectRatio;
        }

        width = Math.min(width * 0.9, naturalWidth);
        height = Math.min(height * 0.9, naturalHeight);
        var imageData = {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: aspectRatio,
          ratio: width / naturalWidth,
          width: width,
          height: height,
          left: (viewerWidth - width) / 2,
          top: (viewerHeight - height) / 2
        };
        var initialImageData = assign({}, imageData);

        if (options.rotatable) {
          imageData.rotate = oldImageData.rotate || 0;
          initialImageData.rotate = 0;
        }

        if (options.scalable) {
          imageData.scaleX = oldImageData.scaleX || 1;
          imageData.scaleY = oldImageData.scaleY || 1;
          initialImageData.scaleX = 1;
          initialImageData.scaleY = 1;
        }

        _this2.imageData = imageData;
        _this2.initialImageData = initialImageData;

        if (done) {
          done();
        }
      });
    },
    renderImage: function renderImage(done) {
      var _this3 = this;

      var image = this.image,
          imageData = this.imageData;
      setStyle(image, assign({
        width: imageData.width,
        height: imageData.height,
        // XXX: Not to use translateX/Y to avoid image shaking when zooming
        marginLeft: imageData.left,
        marginTop: imageData.top
      }, getTransforms(imageData)));

      if (done) {
        if ((this.viewing || this.zooming) && this.options.transition) {
          var onTransitionEnd = function onTransitionEnd() {
            _this3.imageRendering = false;
            done();
          };

          this.imageRendering = {
            abort: function abort() {
              removeListener(image, EVENT_TRANSITION_END, onTransitionEnd);
            }
          };
          addListener(image, EVENT_TRANSITION_END, onTransitionEnd, {
            once: true
          });
        } else {
          done();
        }
      }
    },
    resetImage: function resetImage() {
      // this.image only defined after viewed
      if (this.viewing || this.viewed) {
        var image = this.image;

        if (this.viewing) {
          this.viewing.abort();
        }

        image.parentNode.removeChild(image);
        this.image = null;
      }
    }
  };
  var events = {
    bind: function bind() {
      var options = this.options,
          viewer = this.viewer,
          canvas = this.canvas;
      var document = this.element.ownerDocument;
      addListener(viewer, EVENT_CLICK, this.onClick = this.click.bind(this));
      addListener(viewer, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
        passive: false,
        capture: true
      });
      addListener(viewer, EVENT_DRAG_START, this.onDragStart = this.dragstart.bind(this));
      addListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown = this.pointerdown.bind(this));
      addListener(document, EVENT_POINTER_MOVE, this.onPointerMove = this.pointermove.bind(this));
      addListener(document, EVENT_POINTER_UP, this.onPointerUp = this.pointerup.bind(this));
      addListener(document, EVENT_KEY_DOWN, this.onKeyDown = this.keydown.bind(this));
      addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));

      if (options.toggleOnDblclick) {
        addListener(canvas, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }
    },
    unbind: function unbind() {
      var options = this.options,
          viewer = this.viewer,
          canvas = this.canvas;
      var document = this.element.ownerDocument;
      removeListener(viewer, EVENT_CLICK, this.onClick);
      removeListener(viewer, EVENT_WHEEL, this.onWheel, {
        passive: false,
        capture: true
      });
      removeListener(viewer, EVENT_DRAG_START, this.onDragStart);
      removeListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown);
      removeListener(document, EVENT_POINTER_MOVE, this.onPointerMove);
      removeListener(document, EVENT_POINTER_UP, this.onPointerUp);
      removeListener(document, EVENT_KEY_DOWN, this.onKeyDown);
      removeListener(window, EVENT_RESIZE, this.onResize);

      if (options.toggleOnDblclick) {
        removeListener(canvas, EVENT_DBLCLICK, this.onDblclick);
      }
    }
  };
  var handlers = {
    click: function click(event) {
      var target = event.target;
      var options = this.options,
          imageData = this.imageData;
      var action = getData(target, DATA_ACTION); // Cancel the emulated click when the native click event was triggered.

      if (IS_TOUCH_DEVICE && event.isTrusted && target === this.canvas) {
        clearTimeout(this.clickCanvasTimeout);
      }

      switch (action) {
        case 'mix':
          if (this.played) {
            this.stop();
          } else if (options.inline) {
            if (this.fulled) {
              this.exit();
            } else {
              this.full();
            }
          } else {
            this.hide();
          }

          break;

        case 'hide':
          this.hide();
          break;

        case 'view':
          this.view(getData(target, 'index'));
          break;

        case 'zoom-in':
          this.zoom(0.1, true);
          break;

        case 'zoom-out':
          this.zoom(-0.1, true);
          break;

        case 'one-to-one':
          this.toggle();
          break;

        case 'reset':
          this.reset();
          break;

        case 'prev':
          this.prev(options.loop);
          break;

        case 'play':
          this.play(options.fullscreen);
          break;

        case 'next':
          this.next(options.loop);
          break;

        case 'rotate-left':
          this.rotate(-90);
          break;

        case 'rotate-right':
          this.rotate(90);
          break;

        case 'flip-horizontal':
          this.scaleX(-imageData.scaleX || -1);
          break;

        case 'flip-vertical':
          this.scaleY(-imageData.scaleY || -1);
          break;

        default:
          if (this.played) {
            this.stop();
          }

      }
    },
    dblclick: function dblclick(event) {
      event.preventDefault();

      if (this.viewed && event.target === this.image) {
        // Cancel the emulated double click when the native dblclick event was triggered.
        if (IS_TOUCH_DEVICE && event.isTrusted) {
          clearTimeout(this.doubleClickImageTimeout);
        }

        this.toggle();
      }
    },
    load: function load() {
      var _this = this;

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = false;
      }

      var element = this.element,
          options = this.options,
          image = this.image,
          index = this.index,
          viewerData = this.viewerData;
      removeClass(image, CLASS_INVISIBLE);

      if (options.loading) {
        removeClass(this.canvas, CLASS_LOADING);
      }

      image.style.cssText = 'height:0;' + "margin-left:".concat(viewerData.width / 2, "px;") + "margin-top:".concat(viewerData.height / 2, "px;") + 'max-width:none!important;' + 'position:absolute;' + 'width:0;';
      this.initImage(function () {
        toggleClass(image, CLASS_MOVE, options.movable);
        toggleClass(image, CLASS_TRANSITION, options.transition);

        _this.renderImage(function () {
          _this.viewed = true;
          _this.viewing = false;

          if (isFunction(options.viewed)) {
            addListener(element, EVENT_VIEWED, options.viewed, {
              once: true
            });
          }

          dispatchEvent(element, EVENT_VIEWED, {
            originalImage: _this.images[index],
            index: index,
            image: image
          });
        });
      });
    },
    loadImage: function loadImage(event) {
      var image = event.target;
      var parent = image.parentNode;
      var parentWidth = parent.offsetWidth || 30;
      var parentHeight = parent.offsetHeight || 50;
      var filled = !!getData(image, 'filled');
      getImageNaturalSizes(image, function (naturalWidth, naturalHeight) {
        var aspectRatio = naturalWidth / naturalHeight;
        var width = parentWidth;
        var height = parentHeight;

        if (parentHeight * aspectRatio > parentWidth) {
          if (filled) {
            width = parentHeight * aspectRatio;
          } else {
            height = parentWidth / aspectRatio;
          }
        } else if (filled) {
          height = parentWidth / aspectRatio;
        } else {
          width = parentHeight * aspectRatio;
        }

        setStyle(image, assign({
          width: width,
          height: height
        }, getTransforms({
          translateX: (parentWidth - width) / 2,
          translateY: (parentHeight - height) / 2
        })));
      });
    },
    keydown: function keydown(event) {
      var options = this.options;

      if (!this.fulled || !options.keyboard) {
        return;
      }

      switch (event.keyCode || event.which || event.charCode) {
        // Escape
        case 27:
          if (this.played) {
            this.stop();
          } else if (options.inline) {
            if (this.fulled) {
              this.exit();
            }
          } else {
            this.hide();
          }

          break;
        // Space

        case 32:
          if (this.played) {
            this.stop();
          }

          break;
        // ArrowLeft

        case 37:
          this.prev(options.loop);
          break;
        // ArrowUp

        case 38:
          // Prevent scroll on Firefox
          event.preventDefault(); // Zoom in

          this.zoom(options.zoomRatio, true);
          break;
        // ArrowRight

        case 39:
          this.next(options.loop);
          break;
        // ArrowDown

        case 40:
          // Prevent scroll on Firefox
          event.preventDefault(); // Zoom out

          this.zoom(-options.zoomRatio, true);
          break;
        // Ctrl + 0

        case 48: // Fall through
        // Ctrl + 1
        // eslint-disable-next-line no-fallthrough

        case 49:
          if (event.ctrlKey) {
            event.preventDefault();
            this.toggle();
          }

          break;
      }
    },
    dragstart: function dragstart(event) {
      if (event.target.tagName.toLowerCase() === 'img') {
        event.preventDefault();
      }
    },
    pointerdown: function pointerdown(event) {
      var options = this.options,
          pointers = this.pointers;
      var buttons = event.buttons,
          button = event.button;

      if (!this.viewed || this.showing || this.viewing || this.hiding // No primary button (Usually the left button)
      // Note that touch events have no `buttons` or `button` property
      || isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 // Open context menu
      || event.ctrlKey) {
        return;
      } // Prevent default behaviours as page zooming in touch devices.


      event.preventDefault();

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        pointers[event.pointerId || 0] = getPointer(event);
      }

      var action = options.movable ? ACTION_MOVE : false;

      if (Object.keys(pointers).length > 1) {
        action = ACTION_ZOOM;
      } else if ((event.pointerType === 'touch' || event.type === 'touchstart') && this.isSwitchable()) {
        action = ACTION_SWITCH;
      }

      if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
        removeClass(this.image, CLASS_TRANSITION);
      }

      this.action = action;
    },
    pointermove: function pointermove(event) {
      var pointers = this.pointers,
          action = this.action;

      if (!this.viewed || !action) {
        return;
      }

      event.preventDefault();

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }

      this.change(event);
    },
    pointerup: function pointerup(event) {
      var _this2 = this;

      var options = this.options,
          action = this.action,
          pointers = this.pointers;
      var pointer;

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          pointer = pointers[touch.identifier];
          delete pointers[touch.identifier];
        });
      } else {
        pointer = pointers[event.pointerId || 0];
        delete pointers[event.pointerId || 0];
      }

      if (!action) {
        return;
      }

      event.preventDefault();

      if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
        addClass(this.image, CLASS_TRANSITION);
      }

      this.action = false; // Emulate click and double click in touch devices to support backdrop and image zooming (#210).

      if (IS_TOUCH_DEVICE && action !== ACTION_ZOOM && pointer && Date.now() - pointer.timeStamp < 500) {
        clearTimeout(this.clickCanvasTimeout);
        clearTimeout(this.doubleClickImageTimeout);

        if (options.toggleOnDblclick && this.viewed && event.target === this.image) {
          if (this.imageClicked) {
            this.imageClicked = false; // This timeout will be cleared later when a native dblclick event is triggering

            this.doubleClickImageTimeout = setTimeout(function () {
              dispatchEvent(_this2.image, EVENT_DBLCLICK);
            }, 50);
          } else {
            this.imageClicked = true; // The default timing of a double click in Windows is 500 ms

            this.doubleClickImageTimeout = setTimeout(function () {
              _this2.imageClicked = false;
            }, 500);
          }
        } else {
          this.imageClicked = false;

          if (options.backdrop && options.backdrop !== 'static' && event.target === this.canvas) {
            // This timeout will be cleared later when a native click event is triggering
            this.clickCanvasTimeout = setTimeout(function () {
              dispatchEvent(_this2.canvas, EVENT_CLICK);
            }, 50);
          }
        }
      }
    },
    resize: function resize() {
      var _this3 = this;

      if (!this.isShown || this.hiding) {
        return;
      }

      this.initContainer();
      this.initViewer();
      this.renderViewer();
      this.renderList();

      if (this.viewed) {
        this.initImage(function () {
          _this3.renderImage();
        });
      }

      if (this.played) {
        if (this.options.fullscreen && this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
          this.stop();
          return;
        }

        forEach(this.player.getElementsByTagName('img'), function (image) {
          addListener(image, EVENT_LOAD, _this3.loadImage.bind(_this3), {
            once: true
          });
          dispatchEvent(image, EVENT_LOAD);
        });
      }
    },
    wheel: function wheel(event) {
      var _this4 = this;

      if (!this.viewed) {
        return;
      }

      event.preventDefault(); // Limit wheel speed to prevent zoom too fast

      if (this.wheeling) {
        return;
      }

      this.wheeling = true;
      setTimeout(function () {
        _this4.wheeling = false;
      }, 50);
      var ratio = Number(this.options.zoomRatio) || 0.1;
      var delta = 1;

      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * ratio, true, event);
    }
  };
  var methods = {
    /** Show the viewer (only available in modal mode)
     * @param {boolean} [immediate=false] - Indicates if show the viewer immediately or not.
     * @returns {Viewer} this
     */
    show: function show() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var element = this.element,
          options = this.options;

      if (options.inline || this.showing || this.isShown || this.showing) {
        return this;
      }

      if (!this.ready) {
        this.build();

        if (this.ready) {
          this.show(immediate);
        }

        return this;
      }

      if (isFunction(options.show)) {
        addListener(element, EVENT_SHOW, options.show, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_SHOW) === false || !this.ready) {
        return this;
      }

      if (this.hiding) {
        this.transitioning.abort();
      }

      this.showing = true;
      this.open();
      var viewer = this.viewer;
      removeClass(viewer, CLASS_HIDE);

      if (options.transition && !immediate) {
        var shown = this.shown.bind(this);
        this.transitioning = {
          abort: function abort() {
            removeListener(viewer, EVENT_TRANSITION_END, shown);
            removeClass(viewer, CLASS_IN);
          }
        };
        addClass(viewer, CLASS_TRANSITION); // Force reflow to enable CSS3 transition
        // eslint-disable-next-line

        viewer.offsetWidth;
        addListener(viewer, EVENT_TRANSITION_END, shown, {
          once: true
        });
        addClass(viewer, CLASS_IN);
      } else {
        addClass(viewer, CLASS_IN);
        this.shown();
      }

      return this;
    },

    /**
     * Hide the viewer (only available in modal mode)
     * @param {boolean} [immediate=false] - Indicates if hide the viewer immediately or not.
     * @returns {Viewer} this
     */
    hide: function hide() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var element = this.element,
          options = this.options;

      if (options.inline || this.hiding || !(this.isShown || this.showing)) {
        return this;
      }

      if (isFunction(options.hide)) {
        addListener(element, EVENT_HIDE, options.hide, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_HIDE) === false) {
        return this;
      }

      if (this.showing) {
        this.transitioning.abort();
      }

      this.hiding = true;

      if (this.played) {
        this.stop();
      } else if (this.viewing) {
        this.viewing.abort();
      }

      var viewer = this.viewer;

      if (options.transition && !immediate) {
        var hidden = this.hidden.bind(this);

        var hide = function hide() {
          // XXX: It seems the `event.stopPropagation()` method does not work here
          setTimeout(function () {
            addListener(viewer, EVENT_TRANSITION_END, hidden, {
              once: true
            });
            removeClass(viewer, CLASS_IN);
          }, 0);
        };

        this.transitioning = {
          abort: function abort() {
            if (this.viewed) {
              removeListener(this.image, EVENT_TRANSITION_END, hide);
            } else {
              removeListener(viewer, EVENT_TRANSITION_END, hidden);
            }
          }
        }; // Note that the `CLASS_TRANSITION` class will be removed on pointer down (#255)

        if (this.viewed && hasClass(this.image, CLASS_TRANSITION)) {
          addListener(this.image, EVENT_TRANSITION_END, hide, {
            once: true
          });
          this.zoomTo(0, false, false, true);
        } else {
          hide();
        }
      } else {
        removeClass(viewer, CLASS_IN);
        this.hidden();
      }

      return this;
    },

    /**
     * View one of the images with image's index
     * @param {number} index - The index of the image to view.
     * @returns {Viewer} this
     */
    view: function view() {
      var _this = this;

      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.initialViewIndex;
      index = Number(index) || 0;

      if (!this.isShown) {
        this.index = index;
        return this.show();
      }

      if (this.hiding || this.played || index < 0 || index >= this.length || this.viewed && index === this.index) {
        return this;
      }

      if (this.viewing) {
        this.viewing.abort();
      }

      var element = this.element,
          options = this.options,
          title = this.title,
          canvas = this.canvas;
      var item = this.items[index];
      var img = item.querySelector('img');
      var url = escapeHTMLEntities(getData(img, 'originalUrl'));
      var alt = escapeHTMLEntities(img.getAttribute('alt'));
      var image = document.createElement('img');
      image.src = url;
      image.alt = alt;

      if (isFunction(options.view)) {
        addListener(element, EVENT_VIEW, options.view, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_VIEW, {
        originalImage: this.images[index],
        index: index,
        image: image
      }) === false || !this.isShown || this.hiding || this.played) {
        return this;
      }

      this.image = image;
      removeClass(this.items[this.index], CLASS_ACTIVE);
      addClass(item, CLASS_ACTIVE);
      this.viewed = false;
      this.index = index;
      this.imageData = {};
      addClass(image, CLASS_INVISIBLE);

      if (options.loading) {
        addClass(canvas, CLASS_LOADING);
      }

      canvas.innerHTML = '';
      canvas.appendChild(image); // Center current item

      this.renderList(); // Clear title

      title.innerHTML = ''; // Generate title after viewed

      var onViewed = function onViewed() {
        var imageData = _this.imageData;
        var render = Array.isArray(options.title) ? options.title[1] : options.title;
        title.innerHTML = escapeHTMLEntities(isFunction(render) ? render.call(_this, image, imageData) : "".concat(alt, " (").concat(imageData.naturalWidth, " \xD7 ").concat(imageData.naturalHeight, ")"));
      };

      var onLoad;
      addListener(element, EVENT_VIEWED, onViewed, {
        once: true
      });
      this.viewing = {
        abort: function abort() {
          removeListener(element, EVENT_VIEWED, onViewed);

          if (image.complete) {
            if (this.imageRendering) {
              this.imageRendering.abort();
            } else if (this.imageInitializing) {
              this.imageInitializing.abort();
            }
          } else {
            // Cancel download to save bandwidth.
            image.src = '';
            removeListener(image, EVENT_LOAD, onLoad);

            if (this.timeout) {
              clearTimeout(this.timeout);
            }
          }
        }
      };

      if (image.complete) {
        this.load();
      } else {
        addListener(image, EVENT_LOAD, onLoad = this.load.bind(this), {
          once: true
        });

        if (this.timeout) {
          clearTimeout(this.timeout);
        } // Make the image visible if it fails to load within 1s


        this.timeout = setTimeout(function () {
          removeClass(image, CLASS_INVISIBLE);
          _this.timeout = false;
        }, 1000);
      }

      return this;
    },

    /**
     * View the previous image
     * @param {boolean} [loop=false] - Indicate if view the last one
     * when it is the first one at present.
     * @returns {Viewer} this
     */
    prev: function prev() {
      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var index = this.index - 1;

      if (index < 0) {
        index = loop ? this.length - 1 : 0;
      }

      this.view(index);
      return this;
    },

    /**
     * View the next image
     * @param {boolean} [loop=false] - Indicate if view the first one
     * when it is the last one at present.
     * @returns {Viewer} this
     */
    next: function next() {
      var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var maxIndex = this.length - 1;
      var index = this.index + 1;

      if (index > maxIndex) {
        index = loop ? 0 : maxIndex;
      }

      this.view(index);
      return this;
    },

    /**
     * Move the image with relative offsets.
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} offsetY - The relative offset distance on the y-axis.
     * @returns {Viewer} this
     */
    move: function move(offsetX, offsetY) {
      var imageData = this.imageData;
      this.moveTo(isUndefined(offsetX) ? offsetX : imageData.left + Number(offsetX), isUndefined(offsetY) ? offsetY : imageData.top + Number(offsetY));
      return this;
    },

    /**
     * Move the image to an absolute point.
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Viewer} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var imageData = this.imageData;
      x = Number(x);
      y = Number(y);

      if (this.viewed && !this.played && this.options.movable) {
        var changed = false;

        if (isNumber(x)) {
          imageData.left = x;
          changed = true;
        }

        if (isNumber(y)) {
          imageData.top = y;
          changed = true;
        }

        if (changed) {
          this.renderImage();
        }
      }

      return this;
    },

    /**
     * Zoom the image with a relative ratio.
     * @param {number} ratio - The target ratio.
     * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
     * @param {Event} [_originalEvent=null] - The original event if any.
     * @returns {Viewer} this
     */
    zoom: function zoom(ratio) {
      var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var imageData = this.imageData;
      ratio = Number(ratio);

      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      this.zoomTo(imageData.width * ratio / imageData.naturalWidth, hasTooltip, _originalEvent);
      return this;
    },

    /**
     * Zoom the image to an absolute ratio.
     * @param {number} ratio - The target ratio.
     * @param {boolean} [hasTooltip=false] - Indicates if it has a tooltip or not.
     * @param {Event} [_originalEvent=null] - The original event if any.
     * @param {Event} [_zoomable=false] - Indicates if the current zoom is available or not.
     * @returns {Viewer} this
     */
    zoomTo: function zoomTo(ratio) {
      var _this2 = this;

      var hasTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _originalEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _zoomable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var element = this.element,
          options = this.options,
          pointers = this.pointers,
          imageData = this.imageData;
      var width = imageData.width,
          height = imageData.height,
          left = imageData.left,
          top = imageData.top,
          naturalWidth = imageData.naturalWidth,
          naturalHeight = imageData.naturalHeight;
      ratio = Math.max(0, ratio);

      if (isNumber(ratio) && this.viewed && !this.played && (_zoomable || options.zoomable)) {
        if (!_zoomable) {
          var minZoomRatio = Math.max(0.01, options.minZoomRatio);
          var maxZoomRatio = Math.min(100, options.maxZoomRatio);
          ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
        }

        if (_originalEvent && ratio > 0.95 && ratio < 1.05) {
          ratio = 1;
        }

        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;
        var offsetWidth = newWidth - width;
        var offsetHeight = newHeight - height;
        var oldRatio = width / naturalWidth;

        if (isFunction(options.zoom)) {
          addListener(element, EVENT_ZOOM, options.zoom, {
            once: true
          });
        }

        if (dispatchEvent(element, EVENT_ZOOM, {
          ratio: ratio,
          oldRatio: oldRatio,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }

        this.zooming = true;

        if (_originalEvent) {
          var offset = getOffset(this.viewer);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          }; // Zoom from the triggering point of the event

          imageData.left -= offsetWidth * ((center.pageX - offset.left - left) / width);
          imageData.top -= offsetHeight * ((center.pageY - offset.top - top) / height);
        } else {
          // Zoom from the center of the image
          imageData.left -= offsetWidth / 2;
          imageData.top -= offsetHeight / 2;
        }

        imageData.width = newWidth;
        imageData.height = newHeight;
        imageData.ratio = ratio;
        this.renderImage(function () {
          _this2.zooming = false;

          if (isFunction(options.zoomed)) {
            addListener(element, EVENT_ZOOMED, options.zoomed, {
              once: true
            });
          }

          dispatchEvent(element, EVENT_ZOOMED, {
            ratio: ratio,
            oldRatio: oldRatio,
            originalEvent: _originalEvent
          });
        });

        if (hasTooltip) {
          this.tooltip();
        }
      }

      return this;
    },

    /**
     * Rotate the image with a relative degree.
     * @param {number} degree - The rotate degree.
     * @returns {Viewer} this
     */
    rotate: function rotate(degree) {
      this.rotateTo((this.imageData.rotate || 0) + Number(degree));
      return this;
    },

    /**
     * Rotate the image to an absolute degree.
     * @param {number} degree - The rotate degree.
     * @returns {Viewer} this
     */
    rotateTo: function rotateTo(degree) {
      var imageData = this.imageData;
      degree = Number(degree);

      if (isNumber(degree) && this.viewed && !this.played && this.options.rotatable) {
        imageData.rotate = degree;
        this.renderImage();
      }

      return this;
    },

    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Viewer} this
     */
    scaleX: function scaleX(_scaleX) {
      this.scale(_scaleX, this.imageData.scaleY);
      return this;
    },

    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Viewer} this
     */
    scaleY: function scaleY(_scaleY) {
      this.scale(this.imageData.scaleX, _scaleY);
      return this;
    },

    /**
     * Scale the image.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Viewer} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);

      if (this.viewed && !this.played && this.options.scalable) {
        var changed = false;

        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          changed = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          changed = true;
        }

        if (changed) {
          this.renderImage();
        }
      }

      return this;
    },

    /**
     * Play the images
     * @param {boolean} [fullscreen=false] - Indicate if request fullscreen or not.
     * @returns {Viewer} this
     */
    play: function play() {
      var _this3 = this;

      var fullscreen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.isShown || this.played) {
        return this;
      }

      var options = this.options,
          player = this.player;
      var onLoad = this.loadImage.bind(this);
      var list = [];
      var total = 0;
      var index = 0;
      this.played = true;
      this.onLoadWhenPlay = onLoad;

      if (fullscreen) {
        this.requestFullscreen();
      }

      addClass(player, CLASS_SHOW);
      forEach(this.items, function (item, i) {
        var img = item.querySelector('img');
        var image = document.createElement('img');
        image.src = escapeHTMLEntities(getData(img, 'originalUrl'));
        image.alt = escapeHTMLEntities(img.getAttribute('alt'));
        total += 1;
        addClass(image, CLASS_FADE);
        toggleClass(image, CLASS_TRANSITION, options.transition);

        if (hasClass(item, CLASS_ACTIVE)) {
          addClass(image, CLASS_IN);
          index = i;
        }

        list.push(image);
        addListener(image, EVENT_LOAD, onLoad, {
          once: true
        });
        player.appendChild(image);
      });

      if (isNumber(options.interval) && options.interval > 0) {
        var play = function play() {
          _this3.playing = setTimeout(function () {
            removeClass(list[index], CLASS_IN);
            index += 1;
            index = index < total ? index : 0;
            addClass(list[index], CLASS_IN);
            play();
          }, options.interval);
        };

        if (total > 1) {
          play();
        }
      }

      return this;
    },
    // Stop play
    stop: function stop() {
      var _this4 = this;

      if (!this.played) {
        return this;
      }

      var player = this.player;
      this.played = false;
      clearTimeout(this.playing);
      forEach(player.getElementsByTagName('img'), function (image) {
        removeListener(image, EVENT_LOAD, _this4.onLoadWhenPlay);
      });
      removeClass(player, CLASS_SHOW);
      player.innerHTML = '';
      this.exitFullscreen();
      return this;
    },
    // Enter modal mode (only available in inline mode)
    full: function full() {
      var _this5 = this;

      var options = this.options,
          viewer = this.viewer,
          image = this.image,
          list = this.list;

      if (!this.isShown || this.played || this.fulled || !options.inline) {
        return this;
      }

      this.fulled = true;
      this.open();
      addClass(this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(list, CLASS_TRANSITION);

        if (this.viewed) {
          removeClass(image, CLASS_TRANSITION);
        }
      }

      addClass(viewer, CLASS_FIXED);
      viewer.setAttribute('style', '');
      setStyle(viewer, {
        zIndex: options.zIndex
      });
      this.initContainer();
      this.viewerData = assign({}, this.containerData);
      this.renderList();

      if (this.viewed) {
        this.initImage(function () {
          _this5.renderImage(function () {
            if (options.transition) {
              setTimeout(function () {
                addClass(image, CLASS_TRANSITION);
                addClass(list, CLASS_TRANSITION);
              }, 0);
            }
          });
        });
      }

      return this;
    },
    // Exit modal mode (only available in inline mode)
    exit: function exit() {
      var _this6 = this;

      var options = this.options,
          viewer = this.viewer,
          image = this.image,
          list = this.list;

      if (!this.isShown || this.played || !this.fulled || !options.inline) {
        return this;
      }

      this.fulled = false;
      this.close();
      removeClass(this.button, CLASS_FULLSCREEN_EXIT);

      if (options.transition) {
        removeClass(list, CLASS_TRANSITION);

        if (this.viewed) {
          removeClass(image, CLASS_TRANSITION);
        }
      }

      removeClass(viewer, CLASS_FIXED);
      setStyle(viewer, {
        zIndex: options.zIndexInline
      });
      this.viewerData = assign({}, this.parentData);
      this.renderViewer();
      this.renderList();

      if (this.viewed) {
        this.initImage(function () {
          _this6.renderImage(function () {
            if (options.transition) {
              setTimeout(function () {
                addClass(image, CLASS_TRANSITION);
                addClass(list, CLASS_TRANSITION);
              }, 0);
            }
          });
        });
      }

      return this;
    },
    // Show the current ratio of the image with percentage
    tooltip: function tooltip() {
      var _this7 = this;

      var options = this.options,
          tooltipBox = this.tooltipBox,
          imageData = this.imageData;

      if (!this.viewed || this.played || !options.tooltip) {
        return this;
      }

      tooltipBox.textContent = "".concat(Math.round(imageData.ratio * 100), "%");

      if (!this.tooltipping) {
        if (options.transition) {
          if (this.fading) {
            dispatchEvent(tooltipBox, EVENT_TRANSITION_END);
          }

          addClass(tooltipBox, CLASS_SHOW);
          addClass(tooltipBox, CLASS_FADE);
          addClass(tooltipBox, CLASS_TRANSITION); // Force reflow to enable CSS3 transition
          // eslint-disable-next-line

          tooltipBox.offsetWidth;
          addClass(tooltipBox, CLASS_IN);
        } else {
          addClass(tooltipBox, CLASS_SHOW);
        }
      } else {
        clearTimeout(this.tooltipping);
      }

      this.tooltipping = setTimeout(function () {
        if (options.transition) {
          addListener(tooltipBox, EVENT_TRANSITION_END, function () {
            removeClass(tooltipBox, CLASS_SHOW);
            removeClass(tooltipBox, CLASS_FADE);
            removeClass(tooltipBox, CLASS_TRANSITION);
            _this7.fading = false;
          }, {
            once: true
          });
          removeClass(tooltipBox, CLASS_IN);
          _this7.fading = true;
        } else {
          removeClass(tooltipBox, CLASS_SHOW);
        }

        _this7.tooltipping = false;
      }, 1000);
      return this;
    },
    // Toggle the image size between its natural size and initial size
    toggle: function toggle() {
      if (this.imageData.ratio === 1) {
        this.zoomTo(this.initialImageData.ratio, true);
      } else {
        this.zoomTo(1, true);
      }

      return this;
    },
    // Reset the image to its initial state
    reset: function reset() {
      if (this.viewed && !this.played) {
        this.imageData = assign({}, this.initialImageData);
        this.renderImage();
      }

      return this;
    },
    // Update viewer when images changed
    update: function update() {
      var element = this.element,
          options = this.options,
          isImg = this.isImg; // Destroy viewer if the target image was deleted

      if (isImg && !element.parentNode) {
        return this.destroy();
      }

      var images = [];
      forEach(isImg ? [element] : element.querySelectorAll('img'), function (image) {
        if (options.filter) {
          if (options.filter(image)) {
            images.push(image);
          }
        } else {
          images.push(image);
        }
      });

      if (!images.length) {
        return this;
      }

      this.images = images;
      this.length = images.length;

      if (this.ready) {
        var indexes = [];
        forEach(this.items, function (item, i) {
          var img = item.querySelector('img');
          var image = images[i];

          if (image) {
            if (image.src !== img.src) {
              indexes.push(i);
            }
          } else {
            indexes.push(i);
          }
        });
        setStyle(this.list, {
          width: 'auto'
        });
        this.initList();

        if (this.isShown) {
          if (this.length) {
            if (this.viewed) {
              var index = indexes.indexOf(this.index);

              if (index >= 0) {
                this.viewed = false;
                this.view(Math.max(this.index - (index + 1), 0));
              } else {
                addClass(this.items[this.index], CLASS_ACTIVE);
              }
            }
          } else {
            this.image = null;
            this.viewed = false;
            this.index = 0;
            this.imageData = {};
            this.canvas.innerHTML = '';
            this.title.innerHTML = '';
          }
        }
      } else {
        this.build();
      }

      return this;
    },
    // Destroy the viewer
    destroy: function destroy() {
      var element = this.element,
          options = this.options;

      if (!element[NAMESPACE]) {
        return this;
      }

      this.destroyed = true;

      if (this.ready) {
        if (this.played) {
          this.stop();
        }

        if (options.inline) {
          if (this.fulled) {
            this.exit();
          }

          this.unbind();
        } else if (this.isShown) {
          if (this.viewing) {
            if (this.imageRendering) {
              this.imageRendering.abort();
            } else if (this.imageInitializing) {
              this.imageInitializing.abort();
            }
          }

          if (this.hiding) {
            this.transitioning.abort();
          }

          this.hidden();
        } else if (this.showing) {
          this.transitioning.abort();
          this.hidden();
        }

        this.ready = false;
        this.viewer.parentNode.removeChild(this.viewer);
      } else if (options.inline) {
        if (this.delaying) {
          this.delaying.abort();
        } else if (this.initializing) {
          this.initializing.abort();
        }
      }

      if (!options.inline) {
        removeListener(element, EVENT_CLICK, this.onStart);
      }

      element[NAMESPACE] = undefined;
      return this;
    }
  };
  var others = {
    open: function open() {
      var body = this.body;
      addClass(body, CLASS_OPEN);
      body.style.paddingRight = "".concat(this.scrollbarWidth + (parseFloat(this.initialBodyPaddingRight) || 0), "px");
    },
    close: function close() {
      var body = this.body;
      removeClass(body, CLASS_OPEN);
      body.style.paddingRight = this.initialBodyPaddingRight;
    },
    shown: function shown() {
      var element = this.element,
          options = this.options;
      this.fulled = true;
      this.isShown = true;
      this.render();
      this.bind();
      this.showing = false;

      if (isFunction(options.shown)) {
        addListener(element, EVENT_SHOWN, options.shown, {
          once: true
        });
      }

      if (dispatchEvent(element, EVENT_SHOWN) === false) {
        return;
      }

      if (this.ready && this.isShown && !this.hiding) {
        this.view(this.index);
      }
    },
    hidden: function hidden() {
      var element = this.element,
          options = this.options;
      this.fulled = false;
      this.viewed = false;
      this.isShown = false;
      this.close();
      this.unbind();
      addClass(this.viewer, CLASS_HIDE);
      this.resetList();
      this.resetImage();
      this.hiding = false;

      if (!this.destroyed) {
        if (isFunction(options.hidden)) {
          addListener(element, EVENT_HIDDEN, options.hidden, {
            once: true
          });
        }

        dispatchEvent(element, EVENT_HIDDEN);
      }
    },
    requestFullscreen: function requestFullscreen() {
      var document = this.element.ownerDocument;

      if (this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        var documentElement = document.documentElement; // Element.requestFullscreen()

        if (documentElement.requestFullscreen) {
          documentElement.requestFullscreen();
        } else if (documentElement.webkitRequestFullscreen) {
          documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (documentElement.mozRequestFullScreen) {
          documentElement.mozRequestFullScreen();
        } else if (documentElement.msRequestFullscreen) {
          documentElement.msRequestFullscreen();
        }
      }
    },
    exitFullscreen: function exitFullscreen() {
      var document = this.element.ownerDocument;

      if (this.fulled && (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        // Document.exitFullscreen()
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    change: function change(event) {
      var options = this.options,
          pointers = this.pointers;
      var pointer = pointers[Object.keys(pointers)[0]];
      var offsetX = pointer.endX - pointer.startX;
      var offsetY = pointer.endY - pointer.startY;

      switch (this.action) {
        // Move the current image
        case ACTION_MOVE:
          this.move(offsetX, offsetY);
          break;
        // Zoom the current image

        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), false, event);
          break;

        case ACTION_SWITCH:
          {
            this.action = 'switched';
            var absoluteOffsetX = Math.abs(offsetX);

            if (absoluteOffsetX > 1 && absoluteOffsetX > Math.abs(offsetY)) {
              // Empty `pointers` as `touchend` event will not be fired after swiped in iOS browsers.
              this.pointers = {};

              if (offsetX > 1) {
                this.prev(options.loop);
              } else if (offsetX < -1) {
                this.next(options.loop);
              }
            }

            break;
          }
      } // Override


      forEach(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    },
    isSwitchable: function isSwitchable() {
      var imageData = this.imageData,
          viewerData = this.viewerData;
      return this.length > 1 && imageData.left >= 0 && imageData.top >= 0 && imageData.width <= viewerData.width && imageData.height <= viewerData.height;
    }
  };
  var AnotherViewer = WINDOW.Viewer;

  var Viewer =
  /*#__PURE__*/
  function () {
    /**
     * Create a new Viewer.
     * @param {Element} element - The target element for viewing.
     * @param {Object} [options={}] - The configuration options.
     */
    function Viewer(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Viewer);

      if (!element || element.nodeType !== 1) {
        throw new Error('The first argument is required and must be an element.');
      }

      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.action = false;
      this.fading = false;
      this.fulled = false;
      this.hiding = false;
      this.imageClicked = false;
      this.imageData = {};
      this.index = this.options.initialViewIndex;
      this.isImg = false;
      this.isShown = false;
      this.length = 0;
      this.played = false;
      this.playing = false;
      this.pointers = {};
      this.ready = false;
      this.showing = false;
      this.timeout = false;
      this.tooltipping = false;
      this.viewed = false;
      this.viewing = false;
      this.wheeling = false;
      this.zooming = false;
      this.init();
    }

    _createClass$1(Viewer, [{
      key: "init",
      value: function init() {
        var _this = this;

        var element = this.element,
            options = this.options;

        if (element[NAMESPACE]) {
          return;
        }

        element[NAMESPACE] = this;
        var isImg = element.tagName.toLowerCase() === 'img';
        var images = [];
        forEach(isImg ? [element] : element.querySelectorAll('img'), function (image) {
          if (isFunction(options.filter)) {
            if (options.filter.call(_this, image)) {
              images.push(image);
            }
          } else {
            images.push(image);
          }
        });
        this.isImg = isImg;
        this.length = images.length;
        this.images = images;
        var ownerDocument = element.ownerDocument;
        var body = ownerDocument.body || ownerDocument.documentElement;
        this.body = body;
        this.scrollbarWidth = window.innerWidth - ownerDocument.documentElement.clientWidth;
        this.initialBodyPaddingRight = window.getComputedStyle(body).paddingRight; // Override `transition` option if it is not supported

        if (isUndefined(document.createElement(NAMESPACE).style.transition)) {
          options.transition = false;
        }

        if (options.inline) {
          var count = 0;

          var progress = function progress() {
            count += 1;

            if (count === _this.length) {
              var timeout;
              _this.initializing = false;
              _this.delaying = {
                abort: function abort() {
                  clearTimeout(timeout);
                }
              }; // build asynchronously to keep `this.viewer` is accessible in `ready` event handler.

              timeout = setTimeout(function () {
                _this.delaying = false;

                _this.build();
              }, 0);
            }
          };

          this.initializing = {
            abort: function abort() {
              forEach(images, function (image) {
                if (!image.complete) {
                  removeListener(image, EVENT_LOAD, progress);
                }
              });
            }
          };
          forEach(images, function (image) {
            if (image.complete) {
              progress();
            } else {
              addListener(image, EVENT_LOAD, progress, {
                once: true
              });
            }
          });
        } else {
          addListener(element, EVENT_CLICK, this.onStart = function (_ref) {
            var target = _ref.target;

            if (target.tagName.toLowerCase() === 'img' && (!isFunction(options.filter) || options.filter.call(_this, target))) {
              _this.view(_this.images.indexOf(target));
            }
          });
        }
      }
    }, {
      key: "build",
      value: function build() {
        if (this.ready) {
          return;
        }

        var element = this.element,
            options = this.options;
        var parent = element.parentNode;
        var template = document.createElement('div');
        template.innerHTML = TEMPLATE;
        var viewer = template.querySelector(".".concat(NAMESPACE, "-container"));
        var title = viewer.querySelector(".".concat(NAMESPACE, "-title"));
        var toolbar = viewer.querySelector(".".concat(NAMESPACE, "-toolbar"));
        var navbar = viewer.querySelector(".".concat(NAMESPACE, "-navbar"));
        var button = viewer.querySelector(".".concat(NAMESPACE, "-button"));
        var canvas = viewer.querySelector(".".concat(NAMESPACE, "-canvas"));
        this.parent = parent;
        this.viewer = viewer;
        this.title = title;
        this.toolbar = toolbar;
        this.navbar = navbar;
        this.button = button;
        this.canvas = canvas;
        this.footer = viewer.querySelector(".".concat(NAMESPACE, "-footer"));
        this.tooltipBox = viewer.querySelector(".".concat(NAMESPACE, "-tooltip"));
        this.player = viewer.querySelector(".".concat(NAMESPACE, "-player"));
        this.list = viewer.querySelector(".".concat(NAMESPACE, "-list"));
        addClass(title, !options.title ? CLASS_HIDE : getResponsiveClass(Array.isArray(options.title) ? options.title[0] : options.title));
        addClass(navbar, !options.navbar ? CLASS_HIDE : getResponsiveClass(options.navbar));
        toggleClass(button, CLASS_HIDE, !options.button);

        if (options.backdrop) {
          addClass(viewer, "".concat(NAMESPACE, "-backdrop"));

          if (!options.inline && options.backdrop !== 'static') {
            setData(canvas, DATA_ACTION, 'hide');
          }
        }

        if (isString(options.className) && options.className) {
          // In case there are multiple class names
          options.className.split(REGEXP_SPACES).forEach(function (className) {
            addClass(viewer, className);
          });
        }

        if (options.toolbar) {
          var list = document.createElement('ul');
          var custom = isPlainObject(options.toolbar);
          var zoomButtons = BUTTONS.slice(0, 3);
          var rotateButtons = BUTTONS.slice(7, 9);
          var scaleButtons = BUTTONS.slice(9);

          if (!custom) {
            addClass(toolbar, getResponsiveClass(options.toolbar));
          }

          forEach(custom ? options.toolbar : BUTTONS, function (value, index) {
            var deep = custom && isPlainObject(value);
            var name = custom ? hyphenate(index) : value;
            var show = deep && !isUndefined(value.show) ? value.show : value;

            if (!show || !options.zoomable && zoomButtons.indexOf(name) !== -1 || !options.rotatable && rotateButtons.indexOf(name) !== -1 || !options.scalable && scaleButtons.indexOf(name) !== -1) {
              return;
            }

            var size = deep && !isUndefined(value.size) ? value.size : value;
            var click = deep && !isUndefined(value.click) ? value.click : value;
            var item = document.createElement('li');
            item.setAttribute('role', 'button');
            addClass(item, "".concat(NAMESPACE, "-").concat(name));

            if (!isFunction(click)) {
              setData(item, DATA_ACTION, name);
            }

            if (isNumber(show)) {
              addClass(item, getResponsiveClass(show));
            }

            if (['small', 'large'].indexOf(size) !== -1) {
              addClass(item, "".concat(NAMESPACE, "-").concat(size));
            } else if (name === 'play') {
              addClass(item, "".concat(NAMESPACE, "-large"));
            }

            if (isFunction(click)) {
              addListener(item, EVENT_CLICK, click);
            }

            list.appendChild(item);
          });
          toolbar.appendChild(list);
        } else {
          addClass(toolbar, CLASS_HIDE);
        }

        if (!options.rotatable) {
          var rotates = toolbar.querySelectorAll('li[class*="rotate"]');
          addClass(rotates, CLASS_INVISIBLE);
          forEach(rotates, function (rotate) {
            toolbar.appendChild(rotate);
          });
        }

        if (options.inline) {
          addClass(button, CLASS_FULLSCREEN);
          setStyle(viewer, {
            zIndex: options.zIndexInline
          });

          if (window.getComputedStyle(parent).position === 'static') {
            setStyle(parent, {
              position: 'relative'
            });
          }

          parent.insertBefore(viewer, element.nextSibling);
        } else {
          addClass(button, CLASS_CLOSE);
          addClass(viewer, CLASS_FIXED);
          addClass(viewer, CLASS_FADE);
          addClass(viewer, CLASS_HIDE);
          setStyle(viewer, {
            zIndex: options.zIndex
          });
          var container = options.container;

          if (isString(container)) {
            container = element.ownerDocument.querySelector(container);
          }

          if (!container) {
            container = this.body;
          }

          container.appendChild(viewer);
        }

        if (options.inline) {
          this.render();
          this.bind();
          this.isShown = true;
        }

        this.ready = true;

        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }

        if (dispatchEvent(element, EVENT_READY) === false) {
          this.ready = false;
          return;
        }

        if (this.ready && options.inline) {
          this.view(this.index);
        }
      }
      /**
       * Get the no conflict viewer class.
       * @returns {Viewer} The viewer class.
       */

    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Viewer = AnotherViewer;
        return Viewer;
      }
      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */

    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);

    return Viewer;
  }();

  assign(Viewer.prototype, render, events, handlers, methods, others);

  /**
   * --------------------------------------------------------------------------
   * Admin UI (v0.0.1): admin.js
   * --------------------------------------------------------------------------
   */
  var NAME$h = 'admin';
  var DATA_KEY$f = 'bs.admin';
  var EVENT_KEY$f = "." + DATA_KEY$f;
  var DATA_API_KEY$a = '.data-api';
  var JQUERY_NO_CONFLICT$f = $.fn[NAME$h];
  var ARROW_DOWN_KEYCODE$1 = 40;
  var Event$g = {
    CLICK_DATA_API: "click" + EVENT_KEY$f + DATA_API_KEY$a,
    DRAWER_SHOWN: 'shown.bs.drawer',
    LOAD_DATA_API: "load" + EVENT_KEY$f + DATA_API_KEY$a
  };
  var IDName = {
    DRAWER_MAIN: 'drawer-main',
    DRAWER_MAIN_FILTER: 'drawer-main-filter',
    DRAWER_MAIN_MENU: 'drawer-main-menu',
    DRAWER_MAIN_SEARCH: 'drawer-main-search'
  };
  var Selector$8 = {
    DRAWER_MAIN: [false, "#" + IDName.DRAWER_MAIN],
    DRAWER_MAIN_FILTER: [false, "#" + IDName.DRAWER_MAIN_FILTER],
    DRAWER_MAIN_MENU: [false, "#" + IDName.DRAWER_MAIN_MENU],
    DRAWER_MAIN_SEARCH: [false, "#" + IDName.DRAWER_MAIN_SEARCH]
  };

  var Admin =
  /*#__PURE__*/
  function () {
    function Admin() {
      this._populateElements(); // drawer stuff


      this._drawerState = 'menu';

      this._drawerMainAddListener();

      this._navbarMainAddListener(); // navbar stuff


      this._imageViewer(); // image viewer


      this._inputDatetimepicker(); // datetimepicker


      this._inputFormCodeMirror(); // codemirror


      this._inputFormFiles(); // multiple files & multiple object


      this._inputFormGallery(); // multiple image


      this._inputFormFileURL(); // ipnut file url


      this._inputFormImage(); // image picker


      this._inputPasswordStrength(); // password strength


      this._inputSummernote(); // summernote
      // input autocomplete


      $('.form-autocomplete').autocomplete({
        preProcess: function preProcess(res) {
          if (res.error) return [];
          var flat = [];
          res.data.forEach(function (e) {
            return flat.push(e.label);
          });
          return flat;
        }
      }); // select ajax source

      $('.selectpicker').selectpickerAjax({
        ajaxPreProcess: function ajaxPreProcess(res) {
          if (res.error) return {};
          var flat = {};
          res.data.forEach(function (e) {
            return flat[e.id] = e.label;
          });
          return flat;
        }
      });
      $('.form-confirm').confirm(); // form confirmation

      $('.needs-validation').formerror(); // form need validation

      $('.picker-color').pickercolor(); // color picker

      $('.custom-range').rangetips(); // input range

      $('.tag-input-filter').taginput(); // tag input

      $('.slugify').slugify(); // input slugify

      $('.linkfilter').linkfilter(); // input link filter

      this._formMainAutofocus(); // autofocus form element

    } // Private 


    var _proto = Admin.prototype;

    _proto._drawerMainAddListener = function _drawerMainAddListener() {
      var _this = this;

      if (!this._el.DRAWER_MAIN) return;
      $(this._el.DRAWER_MAIN).on(Event$g.DRAWER_SHOWN, function (e) {
        return _this._el.DRAWER_MAIN_FILTER.focus();
      });
      $(this._el.DRAWER_MAIN_SEARCH).linkfilter({
        input: this._el.DRAWER_MAIN_FILTER,
        empty: true
      });
      $(this._el.DRAWER_MAIN_FILTER).on('input paste change search', function (e) {
        var nextState = _this._el.DRAWER_MAIN_FILTER.value.trim() ? 'search' : 'menu';
        if (nextState === _this._drawerState) return;

        if (_this._drawerState === 'menu') {
          _this._el.DRAWER_MAIN_MENU.style.display = 'none';

          _this._el.DRAWER_MAIN_SEARCH.style.removeProperty('display');
        } else {
          _this._el.DRAWER_MAIN_MENU.style.removeProperty('display');

          _this._el.DRAWER_MAIN_SEARCH.style.display = 'none';
        }

        _this._drawerState = nextState;
      }); // focus to menu

      $(this._el.DRAWER_MAIN_FILTER).on('keyup.admin-ui', function (e) {
        if (e.keyCode !== ARROW_DOWN_KEYCODE$1) return;
        if (_this._el.DRAWER_MAIN_FILTER.value.trim()) return;
        $(_this._el.DRAWER_MAIN_MENU).find('> ul > li:first-child > a').focus();
      });
    };

    _proto._formMainAutofocus = function _formMainAutofocus() {
      var form = document.querySelector('form.main');
      if (!form) return;
      var fElement = null;

      for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (!element.classList.contains('form-control')) continue;
        if (!fElement) fElement = element;
        var formGroup = $(element).closest('.form-group');
        if (!formGroup) continue;

        if (formGroup.hasClass('is-invalid')) {
          fElement = element;
          break;
        }
      }

      if (fElement) fElement.focus();
    };

    _proto._getViewerOption = function _getViewerOption(multiple, index) {
      var options = {
        button: false,
        navbar: false,
        loop: false,
        movable: false,
        zoomable: false,
        scalable: false
      };

      if (multiple) {
        options.navbar = true;
        options.initialViewIndex = index || 0;
      } else {
        options.toolbar = {
          reset: true,
          rotateLeft: true,
          rotateRight: true,
          prev: false,
          next: false
        };
      }

      return options;
    };

    _proto._imageViewer = function _imageViewer() {
      var options = this._getViewerOption(false); // single image


      document.querySelectorAll('.img-viewer').forEach(function (e) {
        $(e).data('viwerjs.admin-ui', new Viewer(e, options));
      });
      options = this._getViewerOption(true); // galleries

      document.querySelectorAll('.gallery-viewer').forEach(function (e) {
        $(e).data('viwerjs.admin-ui', new Viewer(e, options));
      });
    };

    _proto._inputDatetimepicker = function _inputDatetimepicker() {
      var formats = {
        'date': 'YYYY-MM-DD',
        'datetime-local': 'YYYY-MM-DDTHH:mm:ss',
        'month': 'YYYY-MM',
        'time': 'HH:mm:ss'
      };
      document.querySelectorAll('.datetimepicker').forEach(function (e) {
        var input = $(e).children('input.form-control').get(0);
        var type = input.getAttribute('type');
        if (!formats[type]) return;
        $(e).datetimepicker({
          format: formats[type]
        });
      });
    };

    _proto._inputFormCodeMirror = function _inputFormCodeMirror() {
      document.querySelectorAll('.form-codemirror').forEach(function (e) {
        var opts = {
          theme: 'default',
          indentUnit: 4,
          smartIndent: true,
          tabSize: 4,
          indentWithTabs: false,
          lineNumbers: true,
          mode: e.dataset.mode
        };
        var data = window.CodeMirror.fromTextArea(e, opts);
        $(e).data('codemirror.bs.admin', data); // now handle the label related element

        if (!e.id) return;
        var label = document.querySelector("[for=\"" + e.id + "\"");
        if (!label) return;
        $(label).data('codemirror', e);
        $(label).on('click', function (e) {
          var te = $(e.target).data('codemirror');
          if (!te) return;
          $(te).data('codemirror.bs.admin').focus();
        });
      });
    };

    _proto._inputFormFiles = function _inputFormFiles() {
      var _this2 = this;

      document.querySelectorAll('.formfiles').forEach(function (e) {
        var transform;
        var filePicker; // multiple files

        if (e.dataset.form) {
          transform = function transform(res) {
            return {
              url: res.url,
              name: res.name,
              meta: res.type || res.mime,
              icon: '<i class="fas fa-file-alt"></i>'
            };
          };

          filePicker = function filePicker(cb, plugin) {
            var opts = {
              accept: plugin._element.dataset.accept,
              multiple: true,
              maxSize: plugin._element.dataset.maxsize,
              form: plugin._element.dataset.form
            };

            _this2.pickFile(function (files) {
              return files.forEach(function (e) {
                return cb(e);
              });
            }, opts);
          }; // multiple object

        } else if (e.dataset.object) {
          transform = function transform(res) {
            return {
              value: res.value,
              url: '#0',
              name: res.name,
              meta: res.type,
              icon: res.icon || null
            };
          };

          filePicker = function filePicker(cb, plugin) {
            var opts = {
              icon: "<i class=\"" + plugin._element.dataset.icon + "\"></i>",
              type: plugin._element.dataset.object
            };

            _this2.pickObject(function (objects) {
              return objects.forEach(function (e) {
                return cb(e);
              });
            }, opts);
          };
        }

        $(e).formfiles({
          filePicker: filePicker,
          transform: transform
        });
      });
    };

    _proto._inputFormFileURL = function _inputFormFileURL() {
      var _this3 = this;

      $('.fileurl-picker').fileurl({
        filePicker: function filePicker(cb, btn, model) {
          var opts = {
            accept: btn.dataset.accept || '*/*',
            multiple: false,
            form: btn.dataset.form || ''
          };

          _this3.pickFile(function (files) {
            return files.forEach(function (e) {
              return cb(e.url);
            });
          }, opts);
        }
      });
    };

    _proto._inputFormGallery = function _inputFormGallery() {
      var _this4 = this;

      $('.formgallery').formgallery({
        imagePicker: function imagePicker(cb, plugin) {
          var opts = {
            accept: 'image/*',
            multiple: true,
            form: plugin._element.dataset.form
          };

          _this4.pickFile(function (files) {
            return files.forEach(function (e) {
              return cb(e.url);
            });
          }, opts);
        },
        imagePreviewer: function imagePreviewer(images, index) {
          _this4.viewImage(images, index);
        }
      });
    };

    _proto._inputFormImage = function _inputFormImage() {
      var _this5 = this;

      $('.formimage').formimage({
        imagePicker: function imagePicker(cb, plugin) {
          var opts = {
            accept: 'image/*',
            multiple: false,
            form: plugin._element.dataset.form
          };

          _this5.pickFile(function (files) {
            return cb(files[0].url);
          }, opts);
        },
        imagePreviewer: function imagePreviewer(url) {
          _this5.viewImage(url);
        }
      });
    };

    _proto._inputPasswordStrength = function _inputPasswordStrength() {
      document.querySelectorAll('.password-strength').forEach(function (e) {
        var parent = e.parentNode;
        var progress = $(parent).children('.progress').get(0);
        parent.classList.add('form-group-password-meter');
        $(e).pwdstr({
          progress: progress
        });
      });
    };

    _proto._inputSummernote = function _inputSummernote() {
      document.querySelectorAll('.form-summernote').forEach(function (e) {
        var toolbar = [['style', ['style']], ['font', ['bold', 'italic', 'clear']], ['para', ['ul', 'ol']], ['table', ['table']], ['insert', ['link', 'video']], ['view', ['fullscreen', 'codeview']]];
        if (e.dataset.form) toolbar[4] = ['insert', ['link', 'picture', 'video']];
        $(e).summernote({
          disableResizeEditor: true,
          placeholder: e.getAttribute('placeholder'),
          tabsize: 2,
          height: 328,
          toolbar: toolbar,
          callbacks: {
            onFocus: function onFocus(e) {
              var ctn = $(e.currentTarget).parent().parent();
              ctn.addClass('note-editor-focus');
            },
            onBlur: function onBlur(e, i) {
              var ctn = $(e.currentTarget).parent().parent();
              ctn.removeClass('note-editor-focus');
            }
          }
        });
        var id = e.id;
        $("label[for=" + id + "]").click(function (evn) {
          $(e).summernote('focus');
        });
      });
    };

    _proto._navbarMainAddListener = function _navbarMainAddListener() {
      var _this6 = this;

      this._navbar_main = document.querySelector('#navbar-main');
      if (!this._navbar_main) return;
      $(window).on("scroll" + EVENT_KEY$f + DATA_API_KEY$a, function (e) {
        if (window.pageYOffset) _this6._navbar_main.classList.add('navbar-shadow');else _this6._navbar_main.classList.remove('navbar-shadow');
      });
      $(window).scroll();
    };

    _proto._populateElements = function _populateElements() {
      this._el = {};

      for (var k in Selector$8) {
        var multiple = Selector$8[k][0],
            selector = Selector$8[k][1],
            method = multiple ? 'querySelectorAll' : 'querySelector';
        this._el[k] = document[method](selector);
      }
    } // Public
    ;

    _proto.pickFile = function pickFile(cb, opts) {
      var fpopts = {
        multiple: opts.multiple || false,
        type: opts.accept || '*/*',
        btnUpload: '<i class="fas fa-upload"></i>',
        selected: function selected(files) {
          cb(files);
        }
      };

      if (window.AConf && window.AConf.libUpload) {
        if (window.AConf.libUpload.thumbs) fpopts.thumbnails = window.AConf.libUpload.thumbs;

        if (window.AConf.libUpload.search) {
          fpopts.search = function (query, type, callback) {
            var data = {
              query: query,
              type: type
            };
            var target = window.AConf.libUpload.search;
            $.get(target, data, function (res) {
              if (res.error) return callback([]);
              var files = [];
              res.data.forEach(function (file) {
                if (/image/.test(file.type) && !file.thumb) file.thumb = file.url;
                files.push(file);
              });
              callback(files);
            }).fail(function (res) {
              $.dialog.alert('Whoops!', 'Failed to fetch data from server');
              callback([]);
            });
          };
        }

        if (window.AConf.libUpload.upload) {
          fpopts.upload = function (file, progress, callback) {
            progress.style.width = '50%';
            var uploader = new FileUploader({
              url: window.AConf.libUpload.upload,
              files: {
                file: file
              },
              fields: {
                form: opts.form
              },
              onSuccess: function onSuccess(up, xhr, res) {
                if (res.error) return callback(res.message || 'Unable to upload the file');
                var data = res.data; // add custom thumbnails

                if (/image/.test(data.type) && !data.thumb) data.thumb = data.url;
                callback(data);
              },
              onError: function onError(up) {
                callback('Failed on uploading the file');
              }
            });
            uploader.send();
          };
        }
      }

      new FilePicker(fpopts);
    };

    _proto.pickObject = function pickObject(cb, opts) {
      var fpopts = {
        multiple: true,
        type: opts.type,
        selected: function selected(objects) {
          cb(objects);
        }
      };

      if (window.AConf && window.AConf.objFilter) {
        if (window.AConf.libUpload && window.AConf.libUpload.thumbs) fpopts.thumbnails = window.AConf.libUpload.thumbs;

        if (window.AConf.objFilter.search) {
          fpopts.search = function (query, type, callback) {
            var data = {
              query: query,
              type: type
            };
            var target = window.AConf.objFilter.search;
            $.get(target, data, function (res) {
              if (res.error) return callback([]);
              var result = [];
              res.data.forEach(function (e) {
                result.push({
                  name: e.label,
                  path: '#0',
                  type: e.info,
                  thumb: e.thumb || null,
                  icon: e.icon || opts.icon || null,
                  value: e.id
                });
              });
              callback(result);
            }).fail(function (res) {
              $.dialog.alert('Whoops!', 'Failed to fetch data from server');
              callback([]);
            });
          };
        }
      }

      new FilePicker(fpopts);
    };

    _proto.viewImage = function viewImage(url, index) {
      var div = document.createElement('div');
      var main = div;

      var opts = this._getViewerOption(Array.isArray(url), index);

      if (Array.isArray(url)) {
        url.forEach(function (u) {
          var img = document.createElement('img');
          img.src = u;
          div.appendChild(img);
        });
      } else {
        var img = document.createElement('img');
        img.src = url;
        div.appendChild(img);
        main = img;
      }

      opts.hidden = function (e) {
        return viewer.destroy();
      };

      var viewer = new Viewer(main, opts);
      viewer.show();
    };

    return Admin;
  }();

  $(window).on(Event$g.LOAD_DATA_API, function () {
    if (!$(document.body).data(DATA_KEY$f)) $(document.body).data(DATA_KEY$f, new Admin());
  });
  $(document).on(Event$g.CLICK_DATA_API, 'a', function (e) {
    if (this.getAttribute('href') === '#0') e.preventDefault();
  });

  exports.Admin = Admin;
  exports.Autocomplete = Autocomplete;
  exports.BootstrapSelect = bootstrapSelect;
  exports.BootstrapSelectAjax = bootstrapSelectAjax;
  exports.Confirm = Confirm;
  exports.DateTimePicker = bootstrapDatetimepicker;
  exports.Dialog = Dialog;
  exports.Drawer = Drawer;
  exports.FilePicker = FilePicker$1;
  exports.FileUploader = FileUploader$1;
  exports.FormError = FormError;
  exports.FormFiles = FormFiles;
  exports.FormGallery = FormGallery;
  exports.FormImage = FormImage;
  exports.LinkFilter = LinkFilter;
  exports.ListEditor = ListEditor;
  exports.PasswordStrength = PasswordStrength;
  exports.PickerColor = PickerColor;
  exports.RangeTips = RangeTips;
  exports.Slugify = Slugify;
  exports.TagInput = TagInput;
  exports.Toaster = Toaster;
  exports.VerticalMenu = VerticalMenu;
  exports.Viewer = Viewer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap-plugins.js.map
