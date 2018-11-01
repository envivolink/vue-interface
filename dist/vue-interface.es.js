import moment from 'moment';
import Popper from 'popper.js';
import axios from 'axios';

function DateFilter (value, format) {
  if (value) {
    return moment(String(value)).format(format);
  }

  return '';
}

function MomentFilter (value, format) {
  return value ? moment(String(value)) : null;
}



var filters = /*#__PURE__*/Object.freeze({
    DateFilter: DateFilter,
    MomentFilter: MomentFilter
});

function camelCase(string) {
  string = string.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function (match) {
    return match.charAt(match.length - 1).toUpperCase();
  });
  return string.charAt(0).toLowerCase() + string.substring(1);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function extend() {
  return Object.assign.apply(Object, arguments);
}

function isNull(value) {
  return value === null;
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return _typeof(value) === 'object' && !isNull(value) && !isArray(value);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
*/

function deepExtend(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) return target;
  var source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) extend(target, _defineProperty({}, key, {}));
        deepExtend(target[key], source[key]);
      } else {
        extend(target, _defineProperty({}, key, source[key]));
      }
    }
  }

  return deepExtend.apply(void 0, [target].concat(sources));
}

function isNumber(value) {
  return typeof value === 'number' || (value ? value.toString() === '[object Number]' : false);
}

function isNumeric(value) {
  return isNumber(value) || !!value && !!value.toString().match(/^-?[\d.,]+$/);
}

function key(value) {
  return isNumeric(value) ? parseFloat(value) : value;
}

function each(subject, fn) {
  for (var i in subject) {
    fn(subject[i], key(i));
  }
}

function first(array) {
  return array && array.length ? array[0] : undefined;
}

function matches(properties) {
  return function (subject) {
    for (var i in properties) {
      if (isObject(properties[i])) {
        return subject[i] ? matches(properties[i])(subject[i]) : false;
      } else if (!subject || subject[i] !== properties[i]) {
        return false;
      }
    }

    return true;
  };
}

function isString(value) {
  return typeof value === 'string';
}

function get(object, path) {
  return (isString(path) ? path.split('.') : !isArray(path) ? [path] : path).reduce(function (a, b) {
    return a[b];
  }, object);
}

function property(path) {
  return function (object) {
    return get(object, path);
  };
}

function isFunction(value) {
  return value instanceof Function;
}

function matchesProperty(path, value) {
  return function (subject) {
    return get(subject, path) === value;
  };
}

function predicate(value) {
  if (isObject(value)) {
    value = matches(value);
  } else if (isArray(value)) {
    value = matchesProperty(value[0], value[1]);
  } else if (!isFunction(value)) {
    value = property(value);
  }

  return value;
}

function find(subject, value) {
  return first(subject.filter(function (object) {
    return predicate(value)(object);
  }));
}

function findIndex(subject, value) {
  for (var i in subject) {
    if (predicate(value)(subject[i])) {
      return key(i);
    }
  }

  return -1;
}

function findIndex$1(object, value) {
  return first(Object.keys(object).filter(function (key) {
    return predicate(value)(object[key]);
  }));
}

function isBoolean(value) {
  return value === true || value === false;
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').replace(/_/g, '-').toLowerCase();
}

function mapKeys(object, fn) {
  var mapped = {};
  each(object, function (value, key) {
    mapped[fn(value, key)] = value;
  });
  return mapped;
}

function negate(fn) {
  return function () {
    return isFunction(fn) ? !fn.apply(void 0, arguments) : !fn;
  };
}

function pickBy(object, match) {
  var subject = {};
  each(object, function (value, key) {
    if (predicate(match)(value)) {
      subject[key] = value;
    }
  });
  return subject;
}

function omitBy(object, fn) {
  return pickBy(object, negate(fn));
}

function remove(array, match) {
  var indexes = [];

  for (var i in array) {
    if (predicate(match)(array[i])) {
      indexes.push(key(i));
    }
  }

  return array.filter(function (value, i) {
    return indexes.indexOf(i) !== -1;
  });
}

function wrap(subject, fn) {
  return function (value) {
    return isFunction(fn) ? fn(subject, value) : value;
  };
}

function prefix(subject, prefix) {
  var delimeter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-';

  var prefixer = function prefixer(value, key$$1) {
    var string = (key$$1 || value).replace(new RegExp("^".concat(prefix).concat(delimeter, "?")), '');
    return [prefix, string].filter(function (value) {
      return !!value;
    }).join(delimeter);
  };

  if (isBoolean(subject)) {
    return subject;
  }

  if (isObject(subject)) {
    return mapKeys(subject, prefixer);
  }

  return prefixer(subject);
}

var Variant = {
  props: {
    /**
     * The variant attribute
     *
     * @property String
     */
    variant: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return this.$options.name;
    },
    variantClass: function variantClass() {
      return prefix(this.variant, this.variantClassPrefix);
    }
  }
};

var Sizeable = {
  props: {
    /**
     * The size of the form control
     *
     * @property String
     */
    size: {
      type: String,
      default: 'md',
      validate: function validate(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    sizeableClassPrefix: function sizeableClassPrefix() {
      return this.$options.name;
    },
    sizeableClass: function sizeableClass() {
      return prefix(this.size, this.sizeableClassPrefix);
    }
  }
};

var COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white', 'muted'];
var props = {};
each(['border', 'text', 'bg', 'bg-gradient'], function (namespace) {
  each(COLORS, function (color) {
    props[camelCase(prefix(color, namespace))] = Boolean;
  });
});

function classes(instance, namespace) {
  return COLORS.map(function (color) {
    return instance[camelCase(color = prefix(color, namespace))] ? color : null;
  }).filter(function (value) {
    return !!value;
  });
}

var Colorable = {
  props: props,
  methods: {
    textColor: function textColor() {
      return classes(this, 'text');
    },
    bgColor: function bgColor() {
      return classes(this, 'bg');
    },
    borderColor: function borderColor() {
      return classes(this, 'border');
    },
    bgGradientColor: function bgGradientColor() {
      return classes(this, 'bg-gradient');
    }
  },
  computed: {
    textColorClasses: function textColorClasses() {
      return this.textColor().join(' ').trim() || null;
    },
    borderColorClasses: function borderColorClasses() {
      return this.borderColor().join(' ').trim() || null;
    },
    bgColorClasses: function bgColorClasses() {
      return this.bgColor().join(' ').trim() || null;
    },
    bgGradientColorClasses: function bgGradientColorClasses() {
      return this.bgGradientColor().join(' ').trim() || null;
    },
    colorableClasses: function colorableClasses() {
      var classes = {};
      classes[this.textColorClasses] = !!this.textColorClasses;
      classes[this.borderColorClasses] = !!this.borderColorClasses;
      classes[this.bgColorClasses] = !!this.bgColorClasses;
      classes[this.bgGradientColorClasses] = !!this.bgGradientColorClasses;
      return omitBy(classes, function (key$$1, value) {
        return !key$$1 || !value;
      });
    }
  }
};

var MergeClasses = {
  methods: {
    mergeClasses: function mergeClasses() {
      var classes = {};
      each([].slice.call(arguments), function (arg) {
        if (isObject(arg)) {
          extend(classes, arg);
        } else if (isArray(arg)) {
          classes = classes.concat(arg);
        } else if (arg) {
          classes[arg] = true;
        }
      });
      return classes;
    }
  }
};

//
var script = {
  name: 'btn',
  mixins: [Variant, Sizeable, Colorable, MergeClasses],
  props: {
    /**
     * Display button with active state
     *
     * @property String
     */
    active: Boolean,

    /**
     * Display button with blocked state
     *
     * @property String
     */
    block: Boolean,

    /**
     * Display button with disabled state
     *
     * @property String
     */
    disabled: Boolean,

    /**
     * If an href is passed, button is an router-link element
     *
     * @property Boolean
     */
    href: String,

    /**
     * Should use <label> as the element for the button. Used for inputs
     * wrappers (toggles).
     *
     * @property Boolean
     */
    label: Boolean,

    /**
     * Display as an outline button
     *
     * @property String
     */
    outline: Boolean,

    /**
     * If an to is passed, button is an router-link element
     *
     * @property Boolean
     */
    to: [Object, String],

    /**
     * The type attribute for the button. Not applied if an anchor
     *
     * @property String
     */
    type: String
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return this.$options.name + (this.outline ? '-outline' : '');
    },
    classes: function classes() {
      return this.mergeClasses('btn', this.variantClass, this.sizeableClass, this.colorableClasses, this.block ? 'btn-block' : '', this.active ? 'active' : '');
    }
  }
};

/* script */
            const __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.to
    ? _c(
        "router-link",
        {
          class: _vm.classes,
          attrs: { to: _vm.to, disabled: _vm.disabled, role: "button" },
          on: { click: _vm.onClick }
        },
        [_vm._t("default")],
        2
      )
    : _vm.href
      ? _c(
          "a",
          {
            class: _vm.classes,
            attrs: { href: _vm.href, disabled: _vm.disabled, role: "button" },
            on: { click: _vm.onClick }
          },
          [_vm._t("default")],
          2
        )
      : _vm.label
        ? _c(
            "label",
            {
              class: _vm.classes,
              attrs: { disabled: _vm.disabled, role: "button" },
              on: { click: _vm.onClick }
            },
            [_vm._t("default")],
            2
          )
        : _c(
            "button",
            {
              class: _vm.classes,
              attrs: { type: _vm.type, disabled: _vm.disabled },
              on: { click: _vm.onClick }
            },
            [_vm._t("default")],
            2
          )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Btn/Btn.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Btn = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var LOADED_SCRIPTS = {};

function element(url) {
  var script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('charset', 'utf-8');
  return script;
}

function append(script) {
  if (document.querySelector('head')) {
    document.querySelector('head').appendChild(script);
  } else {
    document.querySelector('body').appendChild(script);
  }

  return script;
}

function script$1(url) {
  if (LOADED_SCRIPTS[url] instanceof Promise) {
    return LOADED_SCRIPTS[url];
  } else if (LOADED_SCRIPTS[url] || document.querySelector("script[src=\"".concat(url, "\"]"))) {
    return new Promise(function (resolve, reject) {
      resolve(LOADED_SCRIPTS[url]);
    });
  }

  LOADED_SCRIPTS[url] = new Promise(function (resolve, reject) {
    try {
      append(element(url)).addEventListener('load', function (event) {
        resolve(LOADED_SCRIPTS[url] = event);
      });
    } catch (e) {
      reject(e);
    }
  });
  return LOADED_SCRIPTS[url];
}

var VueInstaller = {
  use: use,
  script: script$1,
  plugin: plugin,
  plugins: plugins,
  filter: filter,
  filters: filters$1,
  component: component,
  components: components,
  directive: directive,
  directives: directives,
  $plugins: {},
  $filters: {},
  $directives: {},
  $components: {}
};
function use(plugin) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;
}
function plugin(Vue, name, def) {
  if (!VueInstaller.$plugins[name]) {
    Vue.use(VueInstaller.$plugins[name] = def);
  }
}
function plugins(Vue, plugins) {
  each(plugins, function (def, name) {
    plugin(Vue, name, def);
  });
}
function filter(Vue, name, def) {
  if (!VueInstaller.$filters[name]) {
    Vue.use(VueInstaller.$filters[name] = def);
  }
}
function filters$1(Vue, filters) {
  each(filters, function (def, name) {
    filter(Vue, name, def);
  });
}
function component(Vue, name, def) {
  if (!VueInstaller.$components[name]) {
    Vue.component(name, VueInstaller.$components[name] = def);
  }
}
function components(Vue, components) {
  each(components, function (def, name) {
    component(Vue, name, def);
  });
}
function directive(Vue, name, def) {
  if (!VueInstaller.$directives[name]) {
    if (isFunction(def)) {
      Vue.use(VueInstaller.$directives[name] = def);
    } else {
      Vue.directive(name, def);
    }
  }
}
function directives(Vue, directives) {
  each(directives, function (def, name) {
    directive(Vue, name, def);
  });
}

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Btn: Btn
    });
  }
});

//
//
//
//
var script$2 = {
  name: 'modal-body'
};

/* script */
            const __vue_script__$1 = script$2;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "modal-body" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/ModalBody.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalBody = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
//
//
//
var script$3 = {
  name: 'modal-dialog'
};

/* script */
            const __vue_script__$2 = script$3;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "modal-dialog", attrs: { role: "document" } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/ModalDialog.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalDialog = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
//
//
//
var script$4 = {
  name: 'modal-title'
};

/* script */
            const __vue_script__$3 = script$4;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("h5", { staticClass: "modal-title" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/ModalTitle.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalTitle = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//
var script$5 = {
  name: 'modal-header',
  components: {
    ModalTitle: ModalTitle
  },
  props: {
    ariaLabel: {
      type: String,
      default: 'Close'
    },
    closeable: {
      type: Boolean,
      default: true
    }
  }
};

/* script */
            const __vue_script__$4 = script$5;
            
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "modal-header" },
    [
      _vm._t("title", [_c("modal-title", [_vm._t("default")], 2)]),
      _vm._v(" "),
      _vm._t("close-button", [
        _vm.closeable
          ? _c(
              "button",
              {
                staticClass: "close",
                attrs: { type: "button", "aria-label": "ariaLabel" },
                on: {
                  click: function($event) {
                    _vm.$emit("close");
                  }
                }
              },
              [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
            )
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/ModalHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalHeader = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
//
//
//
var script$6 = {
  name: 'modal-footer'
};

/* script */
            const __vue_script__$5 = script$6;
            
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "modal-footer" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/ModalFooter.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalFooter = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

function unit (height) {
  return isFinite(height) ? height + 'px' : height;
}

//
//
//
//
//
//
var script$7 = {
  props: {
    nodes: {
      type: Number,
      default: 3
    },
    size: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: 'activity-indicator-'
    }
  },
  computed: {
    classes: function classes() {
      var classes = {};
      classes[this.$options.name] = !!this.$options.name;
      classes[this.prefix + this.size.replace(this.prefix, '')] = !!this.size;
      return classes;
    }
  }
};

/* script */
            const __vue_script__$6 = script$7;
            
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "activity-indicator", class: _vm.classes },
    _vm._l(_vm.nodes, function(i) {
      return _c("div")
    })
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ActivityIndicator/Types/BaseType.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BaseType = __vue_normalize__$6(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

var script$8 = {
  name: 'activity-indicator-dots',
  extends: BaseType
};

/* script */
            const __vue_script__$7 = script$8;
/* template */

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = undefined;
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ActivityIndicator/Types/Dots.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ActivityIndicatorDots = __vue_normalize__$7(
    {},
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

var script$9 = {
  name: 'activity-indicator-spinner',
  extends: BaseType,
  props: extend({}, BaseType.props, {
    nodes: {
      type: Number,
      default: 12
    }
  })
};

/* script */
            const __vue_script__$8 = script$9;
/* template */

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = undefined;
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ActivityIndicator/Types/Spinner.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ActivityIndicatorSpinner = __vue_normalize__$8(
    {},
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

//
var script$a = {
  name: 'activity-indicator',
  extends: BaseType,
  props: {
    center: Boolean,
    fixed: Boolean,
    label: String,
    relative: Boolean,
    type: {
      type: String,
      default: 'dots'
    },
    height: [String, Number],
    maxHeight: [String, Number],
    minHeight: [String, Number],
    width: [String, Number],
    maxWidth: [String, Number],
    minWidth: [String, Number]
  },
  components: {
    ActivityIndicatorDots: ActivityIndicatorDots,
    ActivityIndicatorSpinner: ActivityIndicatorSpinner
  },
  computed: {
    style: function style() {
      return {
        width: unit(this.width),
        maxWidth: unit(this.maxWidth),
        minWidth: unit(this.minWidth),
        height: unit(this.height),
        maxHeight: unit(this.maxHeight),
        minHeight: unit(this.minHeight)
      };
    },
    component: function component() {
      return kebabCase(this.prefix + this.type.replace(this.prefix, ''));
    }
  }
};

/* script */
            const __vue_script__$9 = script$a;
            
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.center
    ? _c(
        "div",
        {
          staticClass: "center-wrapper",
          class: {
            "position-relative": _vm.relative,
            "position-fixed": _vm.fixed
          },
          style: _vm.style
        },
        [
          _c(
            "div",
            {
              staticClass:
                "center-content d-flex flex-column align-items-center"
            },
            [
              _c(_vm.component, {
                tag: "component",
                attrs: { size: _vm.size, prefix: _vm.prefix }
              }),
              _vm._v(" "),
              _vm.label
                ? _c("div", {
                    staticClass: "activity-indicator-label",
                    domProps: { innerHTML: _vm._s(_vm.label) }
                  })
                : _vm._e()
            ],
            1
          )
        ]
      )
    : _c(
        "div",
        {
          staticClass:
            "d-flex flex-column justify-content-center align-items-center",
          style: _vm.style
        },
        [
          _c(_vm.component, {
            tag: "component",
            attrs: { size: _vm.size, prefix: _vm.prefix }
          }),
          _vm._v(" "),
          _vm.label
            ? _c("div", {
                staticClass: "activity-indicator-label",
                domProps: { innerHTML: _vm._s(_vm.label) }
              })
            : _vm._e()
        ],
        1
      )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* component normalizer */
  function __vue_normalize__$9(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ActivityIndicator/ActivityIndicator.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ActivityIndicator = __vue_normalize__$9(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ActivityIndicator: ActivityIndicator
    });
  }
});

//

var convertAnimationDelayToInt = function convertAnimationDelayToInt(delay) {
  var num = parseFloat(delay, 10);
  var matches = delay.match(/m?s/);
  var unit = matches ? matches[0] : false;
  var milliseconds;

  switch (unit) {
    case 's':
      // seconds
      milliseconds = num * 1000;
      break;

    case 'ms':
    default:
      milliseconds = num;
      break;
  }

  return milliseconds || 0;
};

var animated = function animated(el, callback) {
  var defaultView = (el.ownerDocument || document).defaultView;
  setTimeout(function () {
    callback.apply();
  }, convertAnimationDelayToInt(defaultView.getComputedStyle(el).animationDuration));
};

var script$b = {
  name: 'activity-button',
  components: {
    ActivityIndicator: ActivityIndicator
  },
  props: {
    /**
     * Make the button appear with the active state.
     *
     * @property {Boolea}n}
     */
    active: Boolean,

    /**
     * Show the activity indicator inside the button.
     *
     * @property {Boolea}n}
     */
    activity: Boolean,

    /**
     * Display the button as block width.
     *
     * @property {Boolea}n}
     */
    block: Boolean,

    /**
     * Make the button appear with the disabled state.
     *
     * @property {Boolea}n}
     */
    disabled: Boolean,

    /**
     * The button label. If not passed as a property, label must be passed
     * inside the element's html.
     *
     * @property {String}
     */
    label: String,

    /**
     * The button icon
     *
     * @property {String}
     */
    icon: String,

    /**
     * The `type` attribute for the button element.
     *
     * @property {String}
     */
    type: String,

    /**
     * The size of the button.
     *
     * @property {String}
     */
    size: {
      type: String,
      default: 'md'
    },

    /**
     * The variant of the button.
     *
     * @property {String}
     */
    variant: {
      type: String,
      default: 'primary'
    },

    /**
     * The type of activity indicator inside the button.
     *
     * @property {String}
     */
    indicator: {
      type: String,
      default: 'spinner'
    },

    /**
     * The orientation of the activity button inside the button.
     *
     * @property {String}
     */
    orientation: {
      type: String,
      default: 'right'
    }
  },
  methods: {
    /**
     * Disable the button.
     *
     * @return void
     */
    disable: function disable() {
      this.$el.disabled = true;
    },

    /**
     * Enable the button.
     *
     * @return void
     */
    enable: function enable() {
      this.$el.disabled = false;
    },

    /**
     * Show the activity indicator inside the button.
     *
     * @return void
     */
    showActivity: function showActivity() {
      var _this = this;

      this.disable();
      animated(this.$el, function () {
        _this.$el.classList.add('btn-activity');

        _this.$emit('activity:show');
      });
    },

    /**
     * Hide the activity indicator inside the button.
     *
     * @return void
     */
    hideActivity: function hideActivity() {
      var _this2 = this;

      this.$el.classList.add('btn-hide-activity');
      animated(this.$el, function () {
        _this2.enable();

        _this2.$el.classList.remove('btn-activity', 'btn-hide-activity');

        _this2.$emit('activity:hide');
      });
    },

    /**
     * The click callback function
     *
     * @return void
     */
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    /**
     * An object of classes to append to the button.
     *
     * @return void
     */
    classes: function classes() {
      var classes = {
        'disabled': this.disabled,
        'active': this.active,
        'btn-block': this.block,
        'btn-activity': this.activity
      };
      classes['btn-' + this.size.replace('btn-', '')] = !!this.size;
      classes['btn-' + this.variant.replace('btn-', '')] = !!this.variant;
      classes['btn-activity-' + this.orientation.replace('btn-activity-', '')] = !!this.orientation;
      classes['btn-activity-indicator-' + this.indicator.replace('btn-activity-indicator-', '')] = !!this.indicator;
      return classes;
    }
  },
  watch: {
    activity: function activity(value) {
      if (value) {
        this.showActivity();
      } else {
        this.hideActivity();
      }
    }
  }
};

/* script */
            const __vue_script__$a = script$b;
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      staticClass: "btn",
      class: _vm.classes,
      attrs: { type: _vm.type },
      on: { click: _vm.onClick }
    },
    [
      _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
      _vm._v(" " + _vm._s(_vm.label) + "\n    "),
      _vm._t("default"),
      _vm._v(" "),
      _c("activity-indicator", { attrs: { type: _vm.indicator } })
    ],
    2
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* component normalizer */
  function __vue_normalize__$a(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/BtnActivity/BtnActivity.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BtnActivity = __vue_normalize__$a(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnActivity: BtnActivity
    });
  }
});

//
//
//
//
var script$c = {
  name: 'modal-content'
};

/* script */
            const __vue_script__$b = script$c;
            
/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "modal-content" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* component normalizer */
  function __vue_normalize__$b(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/ModalContent.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalContent = __vue_normalize__$b(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$d = {
  name: 'modal-backdrop',
  props: {
    /**
     * Show the modal with a fade effect.
     *
     * @property Boolean
     */
    fade: {
      type: Boolean,
      default: true
    },

    /**
     * Is the modal showing.
     *
     * @property Boolean
     */
    show: {
      type: Boolean,
      default: true
    }
  }
};

/* script */
            const __vue_script__$c = script$d;
            
/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "modal-backdrop",
      class: { fade: _vm.fade, show: _vm.show }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* component normalizer */
  function __vue_normalize__$c(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/ModalBackdrop.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalBackdrop = __vue_normalize__$c(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

function duration(el) {
  var duration = getComputedStyle(el).transitionDuration;
  var numeric = parseFloat(duration, 10) || 0;
  var unit = duration.match(/m?s/);

  switch (unit[0]) {
    case 's':
      return numeric * 1000;

    case 'ms':
      return numeric;
  }
}

function transition(el) {
  return new Promise(function (resolve, reject) {
    try {
      var delay = duration(el);
      setTimeout(function () {
        resolve(delay);
      }, delay);
    } catch (e) {
      reject(e);
    }
  });
}

var Triggerable = {
  props: {
    /**
     * Show the triggerable element with a animated fade effect.
     *
     * @type {Boolean}
     */
    animation: {
      type: Boolean,
      default: true
    },

    /**
     * Is the triggerable element showing.
     *
     * @property Boolean
     */
    show: {
      type: Boolean,
      defaut: false
    },

    /**
     * The target element used to position the popover.
     *
     * @type {String|Element|Boolean}
     */
    target: {
      type: [String, Element, Boolean],
      default: false
    },

    /**
     * How the modal is triggered - click | hover | focus | manual. You may
     * pass multiple triggers; separate them with a space. `manual` cannot
     * be combined with any other trigger.
     *
     * @type {String}
     */
    trigger: {
      type: [String, Array],
      default: 'click'
    }
  },
  methods: {
    /**
     * Initialize the trigger event for the specified elements
     *
     * @param  {Element} el
     * @return {void}
     */
    initializeTrigger: function initializeTrigger(el) {
      var _this = this;

      each(isString(this.trigger) ? this.trigger.split(' ') : this.trigger, function (trigger) {
        el.addEventListener(trigger, function (event) {
          _this.toggle();
        });
      });
    },

    /**
     * Initialize the event triggers
     *
     * @return void
     */
    initializeTriggers: function initializeTriggers() {
      var _this2 = this;

      if (this.target && this.trigger !== 'manual') {
        if (this.target instanceof Element) {
          this.initializeTrigger(this.target);
        } else {
          document.querySelectorAll(this.target).forEach(function (el) {
            _this2.initializeTrigger(el);
          });
        }
      }

      if (this.show || !this.target) {
        this.$nextTick(function () {
          _this2.isShowing = true;
        });
      }
    },

    /**
     * Focus on the first field in the modal (if exists).
     *
     * @return this
     */
    focus: function focus() {
      var _this3 = this;

      this.$nextTick(function () {
        var el = _this3.$el.querySelector('.form-control, input, select, textarea');

        if (el) {
          el.focus();
        } else {
          _this3.$el.focus();
        }
      });
      return this;
    },

    /**
     * Open the triggereable element
     *
     * @return this
     */
    open: function open() {
      var _this4 = this;

      this.isDisplaying = true;
      this.$nextTick(function () {
        transition(_this4.$el).then(function (delay) {
          _this4.isShowing = true;

          _this4.$emit('open');
        });
      });
      return this;
    },

    /**
     * Close the triggereable element
     *
     * @return this
     */
    close: function close(event) {
      var _this5 = this;

      transition(this.$el).then(function (delay) {
        _this5.isDisplaying = false;

        _this5.$emit('close', event);
      });
      this.isShowing = false;
      return this;
    },

    /**
     * Toggle the triggereable element's open/close method.
     *
     * @return this
     */
    toggle: function toggle() {
      if (!this.isShowing) {
        this.open();
      } else {
        this.close();
      }

      return this;
    }
  },
  computed: {
    triggerableClasses: function triggerableClasses() {
      return {
        'fade': this.animation,
        'show': this.isShowing
      };
    }
  },
  watch: {
    isShowing: function isShowing(value) {
      if (value) {
        this.focus();
      }
    },
    show: function show(value) {
      this.isShowing = value;
    }
  },
  mounted: function mounted() {
    this.initializeTriggers();
  },
  data: function data() {
    return {
      isDisplaying: this.show || !this.target,
      isShowing: false
    };
  }
};

//
var script$e = {
  name: 'modal',
  components: {
    Btn: Btn,
    BtnActivity: BtnActivity,
    ModalBody: ModalBody,
    ModalBackdrop: ModalBackdrop,
    ModalContent: ModalContent,
    ModalDialog: ModalDialog,
    ModalHeader: ModalHeader,
    ModalFooter: ModalFooter
  },
  mixins: [Triggerable],
  props: {
    /**
     * Show the modal activity indicator.
     *
     * @type {Boolean}
     */
    activity: Boolean,

    /**
     * Show the modal with a backdrop.
     *
     * @type {Boolean}
     */
    backdrop: {
      type: Boolean,
      default: true
    },

    /**
     * Is the modal centered in the screen.
     *
     * @type {Boolean}
     */
    center: Boolean,

    /**
     * Is the modal content fixed position
     *
     * @type {Boolean}
     */
    closeable: {
      type: Boolean,
      default: true
    },

    /**
     * Is the modal content flush with the modal edges? If true, no modal-body
     * will be used to wrap the content.
     *
     * @type {Boolean}
     */
    flush: Boolean,

    /**
     * The ok label text.
     *
     * @type {String}
     */
    okLabel: {
      type: String,
      default: 'Ok'
    },

    /**
     * The cancel label text.
     *
     * @type {String}
     */
    cancelLabel: {
      type: String,
      default: 'Cancel'
    },

    /**
     * The modal title.
     *
     * @type {String}
     */
    title: String,

    /**
     * Is the modal type.
     *
     * @type {Boolean}
     */
    type: {
      type: [Boolean, String],
      default: false,
      validate: function validate(value) {
        return ['alert', 'confirm', 'prompt'].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    /**
     * Mount the backdrop to the document body.
     *
     * @return {void}
    mountBackdrop() {
        if(!this.backdropComponent) {
            this.backdropComponent = this.$refs.backdrop.$mount(
                document.body.appendChild(document.createElement('div'))
            );
        }
    },
    */

    /**
     * Unmount the backdrop from the document body.
     *
     * @return {void}
    unmountBackdrop() {
        if(this.backdropComponent) {
            this.backdropComponent.$destroy();
            this.backdropComponent.$el.remove();
            this.backdropComponent = null;
        }
    },
    */

    /**
     * Cancel the modal
     *
     * @return {void}
     */
    cancel: function cancel(event) {
      this.$emit('cancel', event);
      this.close(event);
    },

    /**
     * Confirm the modal
     *
     * @return {void}
     */
    confirm: function confirm(event) {
      this.$emit('confirm', event);
    },

    /**
     * A callback for the escape function.
     *
     * @return {void}
     */
    onEsc: function onEsc(event) {
      this.type === 'confirm' || this.type === 'prompt' ? this.cancel(event) : this.close(event);
    }
  },
  watch: {
    isShowing: function isShowing(value) {
      if (value) {
        document.querySelector('body').classList.add('modal-open'); // this.mountBackdrop();
      } else {
        document.querySelector('body').classList.remove('modal-open'); // this.unmountBackdrop();
      }

      this.$emit('update:show', value);
    }
  },
  data: function data() {
    return {
      backdropComponent: null,
      isDisplaying: this.show || !this.target,
      isShowing: false
    };
  },
  mounted: function mounted() {
    this.initializeTriggers();
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    this.close();
  }
};

/* script */
            const __vue_script__$d = script$e;
/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "modal",
      class: _vm.triggerableClasses,
      style: { display: _vm.isDisplaying ? "block" : "none" },
      attrs: { tabindex: "-1", role: "dialog" },
      on: {
        keydown: function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "esc", 27, $event.key, "Escape")
          ) {
            return null
          }
          return _vm.cancel($event)
        }
      }
    },
    [
      _vm.backdrop ? _c("modal-backdrop", { ref: "backdrop" }) : _vm._e(),
      _vm._v(" "),
      _c(
        "modal-dialog",
        { class: { "modal-dialog-centered": _vm.center } },
        [
          _c(
            "modal-content",
            [
              _vm._t("header", [
                _vm.title
                  ? _c("modal-header", { on: { close: _vm.cancel } }, [
                      _vm._v(_vm._s(_vm.title))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm._t("body", [
                _c(
                  !_vm.flush ? "modal-body" : "div",
                  { tag: "component", staticClass: "child-component" },
                  [_vm._t("default")],
                  2
                )
              ]),
              _vm._v(" "),
              _vm._t("footer", [
                _vm.type
                  ? _c(
                      "modal-footer",
                      [
                        _vm.type === "alert"
                          ? [
                              _c(
                                "btn-activity",
                                {
                                  attrs: {
                                    activity: _vm.activity,
                                    variant: "primary"
                                  },
                                  on: { click: _vm.confirm }
                                },
                                [_vm._v(_vm._s(_vm.okLabel))]
                              )
                            ]
                          : [
                              _c("btn", {
                                attrs: { type: "button", variant: "secondary" },
                                domProps: {
                                  innerHTML: _vm._s(_vm.cancelLabel)
                                },
                                on: { click: _vm.cancel }
                              }),
                              _vm._v(" "),
                              _c(
                                "btn-activity",
                                {
                                  attrs: {
                                    activity: _vm.activity,
                                    variant: "primary"
                                  },
                                  on: { click: _vm.confirm }
                                },
                                [_vm._v(_vm._s(_vm.okLabel))]
                              )
                            ]
                      ],
                      2
                    )
                  : _vm._e()
              ])
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* component normalizer */
  function __vue_normalize__$d(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Modal/Modal.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Modal = __vue_normalize__$d(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Modal: Modal
    });
  }
});

function instantiate(Vue, Component, options) {
  if (Component instanceof Vue) {
    return Component;
  }

  if (isObject(Component)) {
    Component = Vue.extend(Component);
  } else if (isString(Component)) {
    var text = Component;
    Component = Vue.extend({
      functional: true,
      render: function render(h, context) {
        return this._v(text);
      }
    });
  }

  return new Component(options);
}

function modal (Vue, options) {
  Vue.prototype.$modal = function (Component, options) {
    if (!isObject(options)) {
      options = {};
    }

    var instance = instantiate(Vue, Modal, options.modal);
    instance.$content = instantiate(Vue, Component, options.content);
    instance.$slots.default = [instance.$content.$mount()._vnode];
    instance.$mount(document.body.appendChild(document.createElement('div')));
    return instance;
  };

  Vue.prototype.$alert = function (title, Component, options) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var modal = _this.$modal(Component, deepExtend(options, {
        modal: {
          propsData: {
            title: title,
            type: 'alert'
          }
        }
      }));

      modal.$on('confirm', function (event) {
        modal.close();
      });
      modal.$on('close', function (event) {
        resolve(modal);
      });
    });
  };

  Vue.prototype.$confirm = function (title, Component, options) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      var modal = _this2.$modal(Component || title, deepExtend(options, {
        modal: {
          propsData: {
            title: Component ? title : null,
            type: 'confirm'
          }
        }
      }));

      modal.$on('cancel', function (event) {
        reject(modal);
      });
      modal.$on('confirm', function (event) {
        resolve(modal.close());
      });
    });
  };

  Vue.prototype.$prompt = function (title, Component, options, predicate) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      if (isFunction(options)) {
        predicate = options;
        options = {};
      } else if (isObject(options) && isFunction(options.predicate)) {
        predicate = options.predicate;
      } else if (!isFunction(predicate)) {
        predicate = function predicate() {
          return true;
        };
      }

      var modal = _this3.$modal(Component, deepExtend(options, {
        modal: {
          propsData: {
            title: title,
            type: 'prompt'
          }
        }
      }));

      modal.$on('cancel', function (event) {
        reject(modal);
      });
      modal.$on('confirm', function (event) {
        var succeed = function succeed() {
          return resolve(modal.close());
        };

        var fail = function fail() {
          return reject(modal.close());
        };

        if (predicate(modal, succeed, fail) === true) {
          succeed();
        }
      });
    });
  };
}

//
//
//
//
var script$f = {
  name: 'overlay-body'
};

/* script */
            const __vue_script__$e = script$f;
            
/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "overlay-body" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* component normalizer */
  function __vue_normalize__$e(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Overlay/OverlayBody.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var OverlayBody = __vue_normalize__$e(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$g = {
  name: 'container'
};

/* script */
            const __vue_script__$f = script$g;
            
/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "container" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* component normalizer */
  function __vue_normalize__$f(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Container/Container.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Container = __vue_normalize__$f(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Container: Container
    });
  }
});

//
var script$h = {
  name: 'overlay-content',
  components: {
    Container: Container
  }
};

/* script */
            const __vue_script__$g = script$h;
/* template */
var __vue_render__$e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "container",
    { staticClass: "overlay-content" },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* component normalizer */
  function __vue_normalize__$g(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Overlay/OverlayContent.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var OverlayContent = __vue_normalize__$g(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    undefined,
    undefined
  );

//
var script$i = {
  name: 'overlay',
  components: {
    OverlayBody: OverlayBody,
    OverlayContent: OverlayContent
  },
  mixins: [Triggerable],
  props: {
    /**
     * The overlay background color.
     *
     * @property String
     */
    background: {
      type: String,
      default: 'rgba(255, 255, 255, .925)'
    },

    /**
     * Is the overlay content fixed position
     *
     * @property Boolean
     */
    closeable: {
      type: Boolean,
      default: true
    },

    /**
     * Center the overlay content on the screen using flex box.
     *
     * @type {Boolean}
     */
    center: {
      type: Boolean,
      default: true
    },

    /**
     * Is the overlay content fixed position
     *
     * @property Boolean
     */
    fixedContent: Boolean,

    /**
     * Is the overlay close button hidden but still closeable.
     *
     * @property Boolean
     */
    hideCloseButton: Boolean,

    /**
     * Is the overlay content minimum height.
     *
     * @property Boolean
     */
    minHeight: [String, Number]
  },
  methods: {
    /**
     * The callback for the `click` event on the close button.
     *
     * @return void
     */
    onClickClose: function onClickClose(event) {
      this.$emit('click:close', event);
      this.close();
    },
    onEsc: function onEsc(event) {
      this.closeable && this.close();
    }
  }
};

/* script */
            const __vue_script__$h = script$i;
/* template */
var __vue_render__$f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "overlay",
      class: _vm.triggerableClasses,
      style: {
        background: _vm.background,
        display: _vm.isDisplaying ? "flex" : "none"
      },
      attrs: { role: "dialog", tabindex: "-1" },
      on: {
        keydown: function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "esc", 27, $event.key, "Escape")
          ) {
            return null
          }
          return _vm.onEsc($event)
        }
      }
    },
    [
      _vm.closeable && !_vm.hideCloseButton
        ? _c(
            "button",
            {
              staticClass: "btn btn-link overlay-close",
              attrs: { type: "button" },
              on: { click: _vm.onClickClose }
            },
            [_c("i", { staticClass: "fa fa-times-circle" })]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "overlay-content",
        {
          class: {
            "overlay-content-fixed": _vm.fixedContent,
            "overlay-content-center": _vm.center
          },
          style: { minHeight: _vm.minHeight }
        },
        [
          _vm._t("body", [
            _c("overlay-body", { staticClass: "my-4" }, [_vm._t("default")], 2)
          ])
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* component normalizer */
  function __vue_normalize__$h(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Overlay/Overlay.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Overlay = __vue_normalize__$h(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Overlay: Overlay
    });
  }
});

function overlay (Vue, options) {
  Vue.prototype.$overlay = function (target, Component, options) {
    if (!isObject(options)) {
      options = {};
    }

    if (!target.$overlay) {
      target.$overlay = instantiate(Vue, Overlay, deepExtend(options.overlay, {
        propsData: {
          target: target
        }
      }));
      target.$overlay.$mount(document.body.appendChild(document.createElement('div')));
      target.$overlay.$content = instantiate(Vue, Component, options.content);
      target.$overlay.$slots.default = [target.$overlay.$content.$mount()._vnode];
      target.$overlay.$nextTick(function () {
        target.$overlay.open();
      });
    }

    return target.$overlay;
  };
}

//
var script$j = {
  name: 'popover',
  mixins: [Triggerable, MergeClasses],
  props: {
    /**
     * Apply a CSS fade transition to the popover
     *
     * @type {Boolean}
     */
    animation: {
      type: Boolean,
      default: true
    },

    /**
     * Overflow constraint boundary of the popover. Accepts the values of
     * 'viewport', 'window', 'scrollParent', or an HTMLElement reference
     * (JavaScript only). For more information refer to Popper.js's
     * preventOverflow docs.
     *
     * @type {Object}
     */
    boundary: {
      type: [String, Array],
      default: 'scrollParent',
      validate: function validate(value) {
        return ['viewport', 'window', 'viewport'].indexOf(value) !== -1;
      }
    },

    /**
     * Appends the popover to a specific element.
     *
     * Example: container: 'body'.
     *
     * This option is particularly useful in that it allows you to position
     * the popover in the flow of the document near the triggering element -
     * which will prevent the popover from floating away from thetriggering
     * element during a window resize.
     *
     * @type {String|Element|Boolean}
     */
    container: {
      type: [String, Element, Boolean],
      default: false
    },

    /**
     * Delay closeing and hiding the popover (ms) - does not apply to manual trigger type
     *
     * If a number is supplied, delay is applied to both open/close
     *
     * Object structure is: delay: { "close": 500, "open": 100 }
     *
     * @type {Number|Object}
     */
    delay: {
      type: [Number, Object],
      default: 0
    },

    /**
     * Allow to specify which position Popper will use on fallback. For more
     * information refer to Popper.js's behavior docs
     *
     * @type {String|Array}
     */
    fallbackPlacement: {
      type: [String, Array],
      default: 'flip'
    },

    /**
     * Offset of the popover relative to its target. For more information
     * refer to Popper.js's offset docs.
     *
     * @type {Number|String}
     */
    offset: {
      type: [Number, String],
      default: 0
    },

    /**
     * How to position the popover - auto | top | bottom | left | right.
     *
     * When auto is specified, it will dynamically reorient the popover.
     *
     * When a function is used to determine the placement, it is called with
     * the popover DOM node as its first argument and the triggering element
     * DOM node as its second. The this context is set to the popover
     * instance.
     *
     * @type {String|Function}
     */
    placement: {
      type: [String, Function],
      default: 'top',
      validate: function validate(value) {
        return ['auto', 'top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
      }
    },

    /**
     * If this property is passed, it will force the popover to be visible
     * by default.
     *
     * @type {Boolean}
     */
    show: Boolean,

    /**
     * If a selector is provided, popover objects will be delegated to the
     * specified targets. In practice, this is used to enable dynamic HTML
     * content to have popovers added. See this and an informative example.
     *
     * @type {Boolean|String}
     */
    selector: {
      type: [Boolean, String],
      default: false
    },

    /**
     * The target element used to position the popover.
     *
     * @type {String|Element|Boolean}
     */
    target: {
      type: [String, Element, Boolean],
      default: false
    },

    /**
     * The popover title
     *
     * @type {String}
     */
    title: String,

    /**
     * How popover is triggered - click | hover | focus | manual. You may
     * pass multiple triggers; separate them with a space. `manual` cannot
     * be combined with any other trigger.
     *
     * @type {String}
     */
    trigger: {
      type: [String, Array],
      default: 'click'
    }
  },
  methods: {
    align: function align() {
      each(this.$poppers, function (el) {
        el.popper.update();
      });
    },
    createPopper: function createPopper(el) {
      return new Popper(el, this.$el, {
        offset: this.offset,
        placement: this.placement,
        modifiers: {
          flip: {
            boundariesElement: this.container,
            behavior: this.fallbackPlacement
          },
          offset: {
            enabled: !!this.offset,
            offset: this.offset
          },
          arrow: {
            enable: true,
            element: this.$el.querySelector('.arrow')
          }
        }
      });
    },
    getArrowElement: function getArrowElement() {
      return this.$el.querySelector('.arrow');
    },

    /**
     * Initialize the trigger event for the specified elements
     *
     * @param  {Element} el
     * @return {void}
     */
    initializeTrigger: function initializeTrigger(el) {
      var _this = this;

      this.$poppers[el] = {
        trigger: isString(this.trigger) ? this.trigger.split(' ') : this.trigger,
        popper: this.createPopper(el),
        event: function event(_event) {
          _this.toggle();

          _this.$poppers[el].popper.update();
        }
      };
      each(this.$poppers[el].trigger, function (trigger) {
        el.addEventListener(trigger, _this.$poppers[el].event);
      });
    }
  },
  watch: {
    isShowing: function isShowing(value) {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.align();

        if (value) {
          _this2.focus();
        }
      });
    }
  },
  computed: {
    classes: function classes() {
      return prefix({
        'top': this.placement === 'top',
        'bottom': this.placement === 'bottom',
        'left': this.placement === 'left',
        'right': this.placement === 'right'
      }, 'bs-popover');
    }
  },
  beforeCreate: function beforeCreate() {
    if (!this.$poppers) {
      this.$poppers = {};
    }
  }
};

/* script */
            const __vue_script__$i = script$j;
            
/* template */
var __vue_render__$g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.isDisplaying,
          expression: "isDisplaying"
        }
      ],
      staticClass: "popover",
      class: _vm.mergeClasses(_vm.triggerableClasses, _vm.classes),
      attrs: { role: "tooltip" }
    },
    [
      _c("div", { staticClass: "arrow" }),
      _vm._v(" "),
      _vm.title
        ? _c("popover-header", { domProps: { innerHTML: _vm._s(_vm.title) } })
        : _vm._e(),
      _vm._v(" "),
      _c("popover-body", [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* component normalizer */
  function __vue_normalize__$i(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Popover/Popover.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Popover = __vue_normalize__$i(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$k = {
  name: 'popover-body'
};

/* script */
            const __vue_script__$j = script$k;
            
/* template */
var __vue_render__$h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "popover-body" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;

  /* style */
  const __vue_inject_styles__$j = undefined;
  /* scoped */
  const __vue_scope_id__$j = undefined;
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* component normalizer */
  function __vue_normalize__$j(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Popover/PopoverBody.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var PopoverBody = __vue_normalize__$j(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$l = {
  name: 'popover-header',
  props: {
    /**
     * The component HTML element
     *
     * @type {String}
     */
    tag: {
      type: String,
      default: 'h3'
    }
  }
};

/* script */
            const __vue_script__$k = script$l;
            
/* template */
var __vue_render__$i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.tag,
    { tag: "component", staticClass: "popover-header" },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;

  /* style */
  const __vue_inject_styles__$k = undefined;
  /* scoped */
  const __vue_scope_id__$k = undefined;
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* component normalizer */
  function __vue_normalize__$k(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Popover/PopoverHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var PopoverHeader = __vue_normalize__$k(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Popover: Popover,
      PopoverBody: PopoverBody,
      PopoverHeader: PopoverHeader
    });
  }
});

function popover (Vue, options) {
  Vue.prototype.$popover = function (target, Component, options) {
    if (!isObject(options)) {
      options = {};
    }

    if (!target.$popover) {
      target.$popover = instantiate(Vue, Popover, deepExtend(options.popover, {
        propsData: {
          target: target
        }
      }));
      target.$popover.$mount(document.body.appendChild(document.createElement('div')));
      var content = instantiate(Vue, Component, options.content);
      target.$popover.$slots.default = [content.$mount()._vnode];
      target.$popover.$nextTick(function () {
        target.$popover.open();
      });
    }

    return target.$popover;
  };
}



var plugins$1 = /*#__PURE__*/Object.freeze({
    modal: modal,
    overlay: overlay,
    popover: popover
});

//
//
//
//
//
//
var script$m = {
  name: 'alert-close',
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
};

/* script */
            const __vue_script__$l = script$m;
            
/* template */
var __vue_render__$j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      staticClass: "close",
      attrs: { type: "button", "data-dismiss": "alert", "aria-label": "Close" },
      on: { click: _vm.onClick }
    },
    [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
  )
};
var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;

  /* style */
  const __vue_inject_styles__$l = undefined;
  /* scoped */
  const __vue_scope_id__$l = undefined;
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* component normalizer */
  function __vue_normalize__$l(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Alert/AlertClose.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var AlertClose = __vue_normalize__$l(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    undefined,
    undefined
  );

//
//
//
//
var script$n = {
  name: 'alert-heading'
};

/* script */
            const __vue_script__$m = script$n;
            
/* template */
var __vue_render__$k = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("h4", { staticClass: "alert-heading" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$k = [];
__vue_render__$k._withStripped = true;

  /* style */
  const __vue_inject_styles__$m = undefined;
  /* scoped */
  const __vue_scope_id__$m = undefined;
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* component normalizer */
  function __vue_normalize__$m(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Alert/AlertHeading.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var AlertHeading = __vue_normalize__$m(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    undefined,
    undefined
  );

//
var script$o = {
  name: 'progress-bar',
  mixins: [Variant, MergeClasses],
  props: {
    /**
     * A custom color to be applied inline in the styles vs a contextual
     * variant.
     *
     * @property String
     */
    color: String,

    /**
     * The progress bar percentage value
     *
     * @property String
     */
    value: {
      type: Number,
      required: true
    },

    /**
     * The height of the progress bar
     *
     * @property String
     */
    height: [Number, String],

    /**
     * Show the progress bar value as a label inside the bar
     *
     * @property String
     */
    label: [String, Boolean],

    /**
     * Should the progress bar appear with stripes
     *
     * @property String
     */
    striped: Boolean,

    /**
     * Should the progress bar appear with animated stripes
     *
     * @property String
     */
    animated: Boolean,

    /**
     * The minimum value
     *
     * @property String
     */
    min: {
      type: Number,
      default: 0
    },

    /**
     * The max value
     *
     * @property String
     */
    max: {
      type: Number,
      default: 100
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return 'bg';
    },
    offsetValue: function offsetValue() {
      return this.value / this.max * 100;
    },
    formattedHeight: function formattedHeight() {
      return this.height ? unit(this.height) : null;
    },
    progressClasses: function progressClasses() {
      return {
        'progress-bar-striped': this.striped,
        'progress-bar-animated': this.animated
      };
    },
    styles: function styles() {
      return {
        width: "".concat(this.offsetValue, "%"),
        background: "".concat(this.color, " !important")
      };
    }
  }
};

/* script */
            const __vue_script__$n = script$o;
            
/* template */
var __vue_render__$l = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "progress", style: { height: _vm.formattedHeight } },
    [
      _c(
        "div",
        {
          staticClass: "progress-bar",
          class: _vm.mergeClasses(_vm.progressClasses, _vm.variantClass),
          style: _vm.styles,
          attrs: {
            role: "progressbar",
            "aria-valuenow": _vm.offsetValue,
            "aria-valuemin": _vm.min,
            "aria-valuemax": _vm.max
          }
        },
        [
          !!_vm.label
            ? _c(
                "span",
                [
                  _vm.label !== true ? [_vm._v(_vm._s(_vm.label))] : _vm._e(),
                  _vm._v(" " + _vm._s(_vm.offsetValue) + "%")
                ],
                2
              )
            : _c("span", [_vm._t("default")], 2)
        ]
      )
    ]
  )
};
var __vue_staticRenderFns__$l = [];
__vue_render__$l._withStripped = true;

  /* style */
  const __vue_inject_styles__$n = undefined;
  /* scoped */
  const __vue_scope_id__$n = undefined;
  /* module identifier */
  const __vue_module_identifier__$n = undefined;
  /* functional template */
  const __vue_is_functional_template__$n = false;
  /* component normalizer */
  function __vue_normalize__$n(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ProgressBar/ProgressBar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ProgressBar = __vue_normalize__$n(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ProgressBar: ProgressBar
    });
  }
});

//
var script$p = {
  name: 'alert',
  components: {
    AlertClose: AlertClose,
    AlertHeading: AlertHeading,
    ProgressBar: ProgressBar
  },
  mixins: [Variant, MergeClasses],
  props: {
    /**
     * Is the alert dismissible
     *
     * @property Boolean
     */
    dismissible: Boolean,

    /**
     * The alert's title/heading
     *
     * @property Boolean
     */
    heading: String,

    /**
     * The alert's title/heading
     *
     * @property Boolean
     */
    title: String,

    /**
     * Should the alert fade when hidden
     *
     * @property Boolean
     */
    fade: {
      type: Boolean,
      default: true
    },

    /**
     * Should the alert be visible by default. If passed a number, alert
     * will be shown for the number of seconds that are passed.
     *
     * @property Boolean
     */
    show: {
      type: [Number, Boolean],
      default: true
    }
  },
  methods: {
    dismiss: function dismiss() {
      var _this = this;

      transition(this.$el).then(function (delay) {
        _this.$emit('dismissed');
      });
      this.$emit('update:visible', this.isVisible = false);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (typeof this.show === 'number') {
      var el = this.$el.querySelector('.progress-bar');
      this.$emit('dismiss-countdown', this.dismissCount = this.show);
      var interval = setInterval(function () {
        _this2.$emit('dismiss-countdown', _this2.dismissCount -= 1);

        if (!_this2.dismissCount) {
          clearInterval(interval);
          transition(el).then(function (delay) {
            return _this2.dismiss();
          });
        }
      }, 1000);
    }
  },
  data: function data() {
    return {
      dismissCount: this.show,
      isVisible: this.show
    };
  }
};

/* script */
            const __vue_script__$o = script$p;
            
/* template */
var __vue_render__$m = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "alert",
      class: _vm.mergeClasses(_vm.variantClass, {
        show: _vm.isVisible,
        fade: _vm.fade
      }),
      attrs: { role: "alert" }
    },
    [
      _vm.title || _vm.heading
        ? _c("alert-heading", [_vm._v(_vm._s(_vm.title || _vm.heading))])
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _vm.dismissible
        ? _c("alert-close", {
            on: {
              click: function($event) {
                _vm.dismiss();
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      typeof _vm.show === "number"
        ? _c("progress-bar", {
            staticClass: "my-3",
            attrs: {
              variant: _vm.variant,
              height: 5,
              value: _vm.dismissCount,
              max: _vm.show
            }
          })
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$m = [];
__vue_render__$m._withStripped = true;

  /* style */
  const __vue_inject_styles__$o = undefined;
  /* scoped */
  const __vue_scope_id__$o = undefined;
  /* module identifier */
  const __vue_module_identifier__$o = undefined;
  /* functional template */
  const __vue_is_functional_template__$o = false;
  /* component normalizer */
  function __vue_normalize__$o(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Alert/Alert.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Alert = __vue_normalize__$o(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    undefined,
    undefined
  );

//
//
//
//
var script$q = {
  name: 'alert-link'
};

/* script */
            const __vue_script__$p = script$q;
            
/* template */
var __vue_render__$n = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("a", { staticClass: "alert-link" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$n = [];
__vue_render__$n._withStripped = true;

  /* style */
  const __vue_inject_styles__$p = undefined;
  /* scoped */
  const __vue_scope_id__$p = undefined;
  /* module identifier */
  const __vue_module_identifier__$p = undefined;
  /* functional template */
  const __vue_is_functional_template__$p = false;
  /* component normalizer */
  function __vue_normalize__$p(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Alert/AlertLink.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var AlertLink = __vue_normalize__$p(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Alert: Alert,
      AlertLink: AlertLink,
      AlertClose: AlertClose,
      AlertHeading: AlertHeading
    });
  }
});

//
var script$r = {
  name: 'badge',
  mixins: [Variant, MergeClasses],
  props: {
    /**
     * The screen reader accessibility label.
     *
     * @property String
     */
    accessibility: String,

    /**
     * If an href attribute is passed, the badge becomes an anchor.
     *
     * @property String
     */
    href: String,

    /**
     * The badge appear as pill shaped.
     *
     * @property String
     */
    pill: Boolean,

    /**
     * The badge label.
     *
     * @property String
     */
    label: [Number, String],

    /**
     * The badge appear as secondary in size to the parent element.
     *
     * @property String
     */
    secondary: Boolean
  },
  computed: {
    classes: function classes() {
      return prefix({
        'pill': this.pill,
        'secondary': this.secondary
      }, this.$options.name);
    }
  }
};

/* script */
            const __vue_script__$q = script$r;
            
/* template */
var __vue_render__$o = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.href
    ? _c(
        "a",
        {
          staticClass: "badge",
          class: _vm.mergeClasses(_vm.classes, _vm.variantClass),
          attrs: { href: _vm.href }
        },
        [
          _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
          _vm._v(" "),
          _c("span", {
            staticClass: "sr-only",
            domProps: { innerHTML: _vm._s(_vm.accessibility) }
          })
        ],
        2
      )
    : _c(
        "span",
        {
          staticClass: "badge",
          class: _vm.mergeClasses(_vm.classes, _vm.variantClass)
        },
        [
          _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
          _vm._v(" "),
          _c("span", {
            staticClass: "sr-only",
            domProps: { innerHTML: _vm._s(_vm.accessibility) }
          })
        ],
        2
      )
};
var __vue_staticRenderFns__$o = [];
__vue_render__$o._withStripped = true;

  /* style */
  const __vue_inject_styles__$q = undefined;
  /* scoped */
  const __vue_scope_id__$q = undefined;
  /* module identifier */
  const __vue_module_identifier__$q = undefined;
  /* functional template */
  const __vue_is_functional_template__$q = false;
  /* component normalizer */
  function __vue_normalize__$q(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Badge/Badge.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Badge = __vue_normalize__$q(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Badge: Badge
    });
  }
});

var BaseClass =
/*#__PURE__*/
function () {
  function BaseClass(attributes) {
    _classCallCheck(this, BaseClass);

    this.setAttribute(attributes);
  }

  _createClass(BaseClass, [{
    key: "getAttribute",
    value: function getAttribute(key$$1) {
      return this.hasOwnProperty(key$$1) ? this[key$$1] : null;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      var _this = this;

      var attributes = {};
      Object.getOwnPropertyNames(this).forEach(function (key$$1) {
        attributes[key$$1] = _this.getAttribute(key$$1);
      });
      return attributes;
    }
  }, {
    key: "getPublicAttributes",
    value: function getPublicAttributes() {
      var _this2 = this;

      return Object.keys(this.getAttributes()).filter(function (key$$1) {
        return !key$$1.match(/^\$/);
      }).reduce(function (obj, key$$1) {
        obj[key$$1] = _this2.getAttribute(key$$1);
        return obj;
      }, {});
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key$$1, value) {
      if (isObject(key$$1)) {
        this.setAttributes(key$$1);
      } else {
        this[key$$1] = value;
      }
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(values) {
      for (var i in values) {
        this.setAttribute(i, values[i]);
      }
    }
  }]);

  return BaseClass;
}();

var Response =
/*#__PURE__*/
function (_BaseClass) {
  _inherits(Response, _BaseClass);

  function Response(data) {
    _classCallCheck(this, Response);

    return _possibleConstructorReturn(this, _getPrototypeOf(Response).call(this, extend({
      date: new Date()
    }, data)));
  }

  _createClass(Response, [{
    key: "data",
    get: function get$$1() {
      return this.$data;
    },
    set: function set(value) {
      this.$data = value;
    }
  }, {
    key: "request",
    get: function get$$1() {
      return this.$request;
    },
    set: function set(value) {
      this.$request = value;
    }
  }, {
    key: "date",
    get: function get$$1() {
      return this.$date;
    },
    set: function set(value) {
      this.$date = value;
    }
  }]);

  return Response;
}(BaseClass);

var DEFAULTS = {
  transformRequest: [],
  transformResponse: []
};

var Request =
/*#__PURE__*/
function (_BaseClass) {
  _inherits(Request, _BaseClass);

  function Request(method, url, attributes) {
    var _this;

    _classCallCheck(this, Request);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Request).call(this, {
      options: {},
      data: {},
      headers: {},
      params: {},
      url: url,
      method: method
    }));

    if (isObject(attributes)) {
      _this.setAttribute(attributes);
    }

    return _this;
  }

  _createClass(Request, [{
    key: "send",
    value: function send(attributes) {
      var _this2 = this;

      this.sentAt = new Date();
      this.setAttributes(attributes);
      return new Promise(function (resolve, reject) {
        axios(_this2.options).then(function (data) {
          return resolve(_this2.response = new Response(data));
        }, function (errors) {
          return reject(_this2.errors = errors);
        });
      });
    }
  }, {
    key: "cancel",
    set: function set(value) {
      this.$cancel = value;
    },
    get: function get$$1() {
      return this.$cancel || function () {
        throw new Error('The request has not been sent yet.');
      };
    }
  }, {
    key: "options",
    get: function get$$1() {
      var _this3 = this;

      return extend({
        cancelToken: new axios.CancelToken(function (cancel) {
          _this3.cancel = cancel;
          return cancel;
        })
      }, DEFAULTS, this.getPublicAttributes());
    },
    set: function set(attributes) {
      this.setAttribute(attributes);
    }
  }, {
    key: "response",
    get: function get$$1() {
      return this.$response;
    },
    set: function set(value) {
      this.$response = value;
    }
  }, {
    key: "errors",
    get: function get$$1() {
      return this.$errors;
    },
    set: function set(value) {
      this.$errors = value;
    }
  }, {
    key: "passed",
    get: function get$$1() {
      return !!this.response && !this.errors;
    }
  }, {
    key: "failed",
    get: function get$$1() {
      return !!this.response && !!this.$error;
    }
  }], [{
    key: "transformRequest",
    value: function transformRequest(fn) {
      DEFAULTS.transformRequest.push(fn);
    }
  }, {
    key: "transformResponse",
    value: function transformResponse(fn) {
      DEFAULTS.transformResponse.push(fn);
    }
  }, {
    key: "get",
    value: function get$$1(url, attributes) {
      return this.make('get', url).send(attributes);
    }
  }, {
    key: "post",
    value: function post(url, attributes) {
      return this.make('post', url, attributes).send();
    }
  }, {
    key: "put",
    value: function put(url, attributes) {
      return this.make('put', url, attributes).send();
    }
  }, {
    key: "patch",
    value: function patch(url, data, attributes) {
      return this.make('path', url, attributes).send();
    }
  }, {
    key: "delete",
    value: function _delete(url, attributes) {
      return this.make('delete', url, attributes).send();
    }
  }, {
    key: "make",
    value: function make(method, url, attributes) {
      return new this(method, url, attributes);
    }
  }, {
    key: "transform",
    get: function get$$1() {
      return {
        request: this.transformRequest,
        response: this.transformResponse
      };
    }
  }, {
    key: "defaults",
    get: function get$$1() {
      return DEFAULTS;
    },
    set: function set(value) {
      extend(DEFAULTS, value);
    }
  }]);

  return Request;
}(BaseClass);

var Model =
/*#__PURE__*/
function () {
  /**
   * Construct the model instance
   *
   * @param data object
   * @return void
   */
  function Model() {
    var _this = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Model);

    this.$request = null;
    this.$key = this.key();
    this.$files = this.files();
    this.$properties = this.properties();
    each(params, function (value, key$$1) {
      _this[key$$1] = value;
    });
    this.initialize(data);
  }
  /**
   * Initialize the model with the given data without considering the data
   * as "changed".
   *
   * @param data object
   * @return this
   */


  _createClass(Model, [{
    key: "initialize",
    value: function initialize(data) {
      this.$exists = false;
      this.$changed = {};
      this.$attributes = {};
      this.fill(data);
      this.$initialized = true;
      return this;
    }
    /**
     * Define the corresponding API endpoint slug
     *
     * @return string
     */

  }, {
    key: "endpoint",
    value: function endpoint() {} //

    /**
     * Define the corresponding uri schema.
     *
     * @return string
     */

  }, {
    key: "uri",
    value: function uri() {
      return [this.endpoint() || '', this.exists() ? this.id() : null].filter(function (value) {
        return !!value;
      }).concat([].slice.call(arguments)).join('/');
    }
    /**
     * Return the primary key value for the model
     *
     * @return {Number}
     */

  }, {
    key: "id",
    value: function id() {
      return this.get(this.key());
    }
    /**
     * Define a primary key. This is used to determine if the model exists and
     * which endpoint to use.
     *
     * @return string
     */

  }, {
    key: "key",
    value: function key$$1() {
      return 'id';
    }
    /**
     * Return an array of properties that are sent to the API. If no properties
     * are defined, then all the attributes will be included in the request.
     *
     * @return array
     */

  }, {
    key: "properties",
    value: function properties() {
      return [];
    }
    /**
     * Return an array of file properties that are sent to the API. If no fies
     * are defined, then request will always be sent with JSON vs. multipart.
     *
     * @return array
     */

  }, {
    key: "files",
    value: function files() {
      return [];
    }
    /**
     * Set the attributes in the model with the data given.
     *
     * @param data object
     * @return this
     */

  }, {
    key: "fill",
    value: function fill(data) {
      this.setAttributes(data);
      return this;
    }
    /**
     * Get one or more attributes from the model.
     *
     * @param data string|array
     * @return array|mixed
     */

  }, {
    key: "get",
    value: function get$$1(key$$1) {
      if (isArray(key$$1)) {
        return this.getAttributes().filter(function (value, i) {
          return key$$1.indexOf(i) !== -1;
        });
      } else {
        return this.getAttribute(key$$1);
      }
    }
    /**
     * Alias for setAttributes() except this method returns `this`. This method
     * also accepts an array of values or key/value pair.
     *
     * @return this
     */

  }, {
    key: "set",
    value: function set(key$$1) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (isArray(key$$1) || isObject(key$$1)) {
        this.setAttributes(key$$1);
      } else {
        this.setAttribute(key$$1, value);
      }

      return this;
    }
    /**
     * Get all the defined attributes.
     *
     * @return array
     */

  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this.$attributes;
    }
    /**
     * Get the changed attributes
     *
     * @return array
     */

  }, {
    key: "getChangedAttributes",
    value: function getChangedAttributes() {
      return Object.keys(this.$changed);
    }
    /**
     * Get the changed attributes
     *
     * @return array
     */

  }, {
    key: "getOriginalValue",
    value: function getOriginalValue(key$$1) {
      return this.$changed[key$$1] || this.$attributes[key$$1];
    }
    /**
     * Get the Request object.
     *
     * @return {mixed}
     */

  }, {
    key: "getRequest",
    value: function getRequest() {
      return this.$request;
    }
    /**
     * Get the unchanged attributes
     *
     * @return array
     */

  }, {
    key: "getUnchangedAttributes",
    value: function getUnchangedAttributes() {
      var _this2 = this;

      return Object.keys(this.$attributes).filter(function (key$$1) {
        return !(key$$1 in _this2.$changed);
      });
    }
    /**
     * Get an attribute with a given key. If no key is defined
     *
     * @param key string
     * @param default undefined|mixed
     * @return array
     */

  }, {
    key: "getAttribute",
    value: function getAttribute(key$$1) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.$attributes[key$$1] || value;
    }
    /**
     * Set an array or object of data as attributes.
     *
     * @param attributes array|object
     * @return void
     */

  }, {
    key: "setAttributes",
    value: function setAttributes(data) {
      var _this3 = this;

      if (isArray(data) || isObject(data)) {
        each(data, function (value, key$$1) {
          _this3.setAttribute(key$$1, value);
        });
      }
    }
    /**
     * Set an attribute with a given key/value pair. This will track the changes
     * in the model within the `this.$changed` property. If the primary key
     * is set, it will also change the `this.$exists` property.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(key$$1, value) {
      if (this.getAttribute(key$$1) !== value) {
        this.handleAttributeChange(key$$1, value);

        if (isUndefined(value)) {
          delete this.$attributes[key$$1];
        } else {
          this.$attributes[key$$1] = value;
        }
      }
    }
    /**
     * Revert the model to its original state.
     *
     * @return bool
     */

  }, {
    key: "revert",
    value: function revert() {
      var _this4 = this;

      each(this.$changed, function (value, key$$1) {
        if (!isUndefined(value)) {
          _this4.$attributes[key$$1] = value;
        } else {
          delete _this4.$attributes[key$$1];
        }
      });
      this.$changed = {};
    }
    /**
     * Returns if the model has a primary key set.
     *
     * @return bool
     */

  }, {
    key: "exists",
    value: function exists() {
      return !!this.$exists;
    }
    /**
     * Returns the model been changed or not.
     *
     * @return bool
     */

  }, {
    key: "hasChanged",
    value: function hasChanged(key$$1) {
      return !key$$1 ? this.getChangedAttributes().length > 0 : !isUndefined(this.$changed[key$$1]);
    }
    /**
     * Does the model have any File objects. If so, need to send as multipart.
     *
     * @return bool
     */

  }, {
    key: "hasFiles",
    value: function hasFiles() {
      function count(files) {
        var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return files.reduce(function (carry, value) {
          if (isArray(value)) {
            return carry + count(value, total);
          } else if (value instanceof File || value instanceof FileList) {
            return carry + 1;
          } else {
            return carry;
          }
        }, total);
      }

      return count(this.toJSON()) !== 0;
    }
    /**
     * Handle settings the $changed attributes when an attribute value is set.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "handleAttributeChange",
    value: function handleAttributeChange(key$$1, value) {
      if (this.$initialized) {
        if (this.$changed[key$$1] === value) {
          delete this.$changed[key$$1];
        } else if (!(key$$1 in this.$changed)) {
          this.$changed[key$$1] = this.getAttribute(key$$1);
        }
      }

      this.handlePrimaryKeyChange(key$$1, value);
    }
    /**
     * Set an array or object of data as attributes.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "handlePrimaryKeyChange",
    value: function handlePrimaryKeyChange(key$$1, value) {
      if (this.$key === key$$1) {
        this.$exists = !isUndefined(value) && !isNull(value);
      }
    }
    /**
     * Save the model to the database
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "save",
    value: function save() {
      var _this5 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.fill(data);
      return new Promise(function (resolve, reject) {
        var data = !_this5.hasFiles() ? _this5.toJSON() : _this5.toFormData();
        var method = !_this5.exists() || _this5.hasFiles() ? 'post' : 'put';
        _this5.$request = _this5.constructor.request(method, config.uri || _this5.uri(), config);

        _this5.$request.send({
          data: data
        }).then(function (response) {
          return resolve(_this5.fill(response));
        }, reject);
      });
    }
    /**
     * Delete an existing model
     *
     * @param  {object} config
     * @return {bool}
     */

  }, {
    key: "delete",
    value: function _delete() {
      var _this6 = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        if (!_this6.exists()) {
          reject(new Error('The model must have a primary key before it can be delete.'));
        }

        _this6.$request = _this6.constructor.request('delete', config.uri || _this6.uri(), config);

        _this6.$request.send().then(function (response) {
          resolve(response);
        }, reject);
      });
    }
    /**
     * Cancel the current HTTP request if one exists.
     *
     * @return {self}
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this.$request) {
        this.$request.cancel();
      }

      return this;
    }
    /**
     * Convert the Model instance to a FormData instance
     *
     * @return Object
     */

  }, {
    key: "toFormData",
    value: function toFormData() {
      var form = new FormData();
      each(this.toJSON(), function (value, key$$1) {
        if (isArray(value)) {
          each(value, function (item) {
            if (!(item instanceof File) && (isObject(item) || isArray(item))) {
              item = JSON.stringify(item);
            }

            form.append(key$$1.replace(/(.+)(\[.+\]?)$/, '$1') + '[]', item);
          });
        } else if (!(value instanceof File) && isObject(value)) {
          form.append(key$$1, JSON.stringify(value));
        } else if (!isNull(value)) {
          form.append(key$$1, value);
        }
      });
      return form;
    }
    /**
     * Convert the instance to JSON payload
     *
     * @return Object
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var _this7 = this;

      return pickBy(this.$attributes, function (value, key$$1) {
        return !_this7.$properties.length || key$$1 === _this7.key() || _this7.$properties.indexOf(key$$1) !== -1;
      });
    }
    /**
     * Convert the model to a string
     *
     * @return String
     */

  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
    /**
     * Alias for toJSON
     *
     * @return Object
     */

  }, {
    key: "toJson",
    value: function toJson() {
      return this.toJSON();
    }
    /**
     * Search for a collection of models
     *
     * @param data object
     * @return bool
     */

  }], [{
    key: "search",
    value: function search() {
      var _this8 = this;
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var model = new this();
      return new Promise(function (resolve, reject) {
        model.$request = _this8.request('get', config.uri || model.uri(), config);
        model.$request.send().then(function (response) {
          resolve(response);
        }, function (errors) {
          reject(errors);
        });
      });
    }
    /**
     * Find an existing model by id
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "find",
    value: function find$$1(id) {
      var _this9 = this;

      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var model = new _this9();
        model.$request = _this9.request('get', config.uri || model.uri(id), config);
        model.$request.send().then(function (response) {
          resolve(model.initialize(response));
        }, function (error) {
          reject(error);
        });
      });
    }
    /**
     * Create a request from the model data
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "request",
    value: function request(method, url) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Request.make(method, url, config);
    }
  }]);

  return Model;
}();

//
var script$s = {
  props: {
    /**
     * The Model method used to send the request.
     *
     * @property Boolean
     */
    method: {
      type: String,
      default: 'save',
      validate: function validate(value) {
        return this.model && isFunction(this.model[value]);
      }
    },

    /**
     * An object of form data
     *
     * @property Object
     */
    data: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * A JSON object of request headers
     *
     * @property Object
     */
    headers: Object,

    /**
     * Display the form fields inline
     *
     * @property Object
     */
    model: {
      type: Object,
      validate: function validate(value) {
        return value instanceof Model;
      }
    },

    /**
     * Display the form fields inline
     *
     * @property Boolean
     */
    inline: Boolean,

    /**
     * A callback function for the `submit` event
     *
     * @property Boolean
     */
    novalidate: {
      type: Boolean,
      default: true
    },

    /**
     * A JSON object of key/value pairs to build the query string.
     *
     * @property Object
     */
    query: Object,

    /**
     * A URI or URL used to redirect user after form submits successfully.
     *
     * @property Function|String
     */
    redirect: [Object, String, Function],

    /**
     * A callback function for the `submit` event
     *
     * @property Function
     */
    onSubmit: {
      type: Function,
      default: function _default(event) {
        this.model && this.submit(event);
      }
    },

    /**
     * A callback function for the `submit:success` event
     *
     * @property Function
     */
    onSubmitSuccess: {
      type: Function,
      default: function _default(event, data) {
        this.$emit('submit:success', event, data);
        this.$emit('submit:complete', event, true, data);

        if (this.redirect && isFunction(this.redirect)) {
          this.redirect(this);
        } else if (this.redirect && this.$router) {
          this.$router.push(this.redirect);
        }
      }
    },

    /**
     * A callback function for the `submit:success` event
     *
     * @property Function
     */
    onSubmitFailed: {
      type: Function,
      default: function _default(event, errors) {
        this.$emit('submit:failed', event, errors);
        this.$emit('submit:complete', event, false, errors);
      }
    }
  },
  methods: {
    submit: function submit(event) {
      var _this = this;

      this.$emit('submit', event);
      return this.model[this.method](this.data, {
        query: this.query,
        headers: this.headers,
        onUploadProgress: function onUploadProgress(event) {
          _this.$emit('submit:progress', event);
        }
      }).then(function (data) {
        _this.onSubmitSuccess(event, data);
      }, function (errors) {
        _this.onSubmitFailed(event, errors);
      });
    }
  },
  data: function data() {
    return {
      errors: {}
    };
  }
};

/* script */
            const __vue_script__$r = script$s;
            
/* template */
var __vue_render__$p = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      class: { "form-inline": _vm.inline },
      attrs: { novalidate: _vm.novalidate },
      on: {
        submit: function($event) {
          $event.preventDefault();
          return _vm.onSubmit($event)
        }
      }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$p = [];
__vue_render__$p._withStripped = true;

  /* style */
  const __vue_inject_styles__$r = undefined;
  /* scoped */
  const __vue_scope_id__$r = undefined;
  /* module identifier */
  const __vue_module_identifier__$r = undefined;
  /* functional template */
  const __vue_is_functional_template__$r = false;
  /* component normalizer */
  function __vue_normalize__$r(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/BaseForm/BaseForm.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BaseForm = __vue_normalize__$r(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BaseForm: BaseForm
    });
  }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$t = {
  name: 'breadcrumb-item',
  props: {
    /**
     * Is the item active?
     *
     * @prop {Boolean}
     */
    active: Boolean,

    /**
     * An href attribute
     *
     * @prop {String}
     */
    href: String,

    /**
     * An breadcrumb label
     *
     * @prop {String}
     */
    label: String,

    /**
     * The to attribute which is passed to the <router-link> component.
     *
     * @prop {Object}
     */
    to: [String, Object]
  }
};

/* script */
            const __vue_script__$s = script$t;
            
/* template */
var __vue_render__$q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "li",
    {
      staticClass: "breadcrumb-item",
      class: { active: _vm.active },
      attrs: { "aria-current": _vm.active ? "page" : false }
    },
    [
      !_vm.active && _vm.href
        ? _c(
            "a",
            { attrs: { href: _vm.href } },
            [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
            2
          )
        : !_vm.active && _vm.to
          ? _c(
              "router-link",
              { attrs: { to: _vm.to } },
              [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
              2
            )
          : [_vm._t("default", [_vm._v(_vm._s(_vm.label))])]
    ],
    2
  )
};
var __vue_staticRenderFns__$q = [];
__vue_render__$q._withStripped = true;

  /* style */
  const __vue_inject_styles__$s = undefined;
  /* scoped */
  const __vue_scope_id__$s = undefined;
  /* module identifier */
  const __vue_module_identifier__$s = undefined;
  /* functional template */
  const __vue_is_functional_template__$s = false;
  /* component normalizer */
  function __vue_normalize__$s(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Breadcrumb/BreadcrumbItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BreadcrumbItem = __vue_normalize__$s(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    undefined,
    undefined
  );

//
var script$u = {
  name: 'breadcrumb',
  components: {
    BreadcrumbItem: BreadcrumbItem
  },
  props: {
    /**
     * An array of breadcrumbs
     *
     * @prop {Array}
     */
    items: Array
  }
};

/* script */
            const __vue_script__$t = script$u;
            
/* template */
var __vue_render__$r = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("nav", { attrs: { "aria-label": "breadcrumb" } }, [
    _c(
      "ol",
      { staticClass: "breadcrumb" },
      [
        _vm._l(_vm.items, function(item, i) {
          return _vm.items.length
            ? _c(
                "breadcrumb-item",
                _vm._b(
                  { key: i, attrs: { current: i === item.length - 1 } },
                  "breadcrumb-item",
                  item,
                  false
                )
              )
            : _vm._e()
        }),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$r = [];
__vue_render__$r._withStripped = true;

  /* style */
  const __vue_inject_styles__$t = undefined;
  /* scoped */
  const __vue_scope_id__$t = undefined;
  /* module identifier */
  const __vue_module_identifier__$t = undefined;
  /* functional template */
  const __vue_is_functional_template__$t = false;
  /* component normalizer */
  function __vue_normalize__$t(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Breadcrumb/Breadcrumb.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Breadcrumb = __vue_normalize__$t(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: BreadcrumbItem
    });
  }
});

var Screenreaders = {
  props: {
    /**
     * Should show only for screenreaders
     *
     * @property Boolean
     */
    srOnly: Boolean,

    /**
     * Should be focusable for screenreaders
     *
     * @property Boolean
     */
    srOnlyFocusable: Boolean
  },
  computed: {
    screenreaderClasses: function screenreaderClasses() {
      return {
        'sr-only': this.srOnly,
        'sr-only-focusable': this.srOnlyFocusable
      };
    }
  }
};

//
var script$v = {
  name: 'help-text',
  mixins: [Colorable, Screenreaders],
  computed: {
    classes: function classes() {
      return extend({}, this.screenreaderClasses, this.colorableClasses);
    }
  }
};

/* script */
            const __vue_script__$u = script$v;
            
/* template */
var __vue_render__$s = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "small",
    { staticClass: "form-text", class: _vm.classes },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$s = [];
__vue_render__$s._withStripped = true;

  /* style */
  const __vue_inject_styles__$u = undefined;
  /* scoped */
  const __vue_scope_id__$u = undefined;
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = false;
  /* component normalizer */
  function __vue_normalize__$u(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/HelpText/HelpText.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var HelpText = __vue_normalize__$u(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      HelpText: HelpText
    });
  }
});

//
//
//
//
//
//
var script$w = {
  name: 'form-group'
};

/* script */
            const __vue_script__$v = script$w;
            
/* template */
var __vue_render__$t = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "form-group" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$t = [];
__vue_render__$t._withStripped = true;

  /* style */
  const __vue_inject_styles__$v = undefined;
  /* scoped */
  const __vue_scope_id__$v = undefined;
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = false;
  /* component normalizer */
  function __vue_normalize__$v(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/FormGroup/FormGroup.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormGroup = __vue_normalize__$v(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormGroup: FormGroup
    });
  }
});

//
var script$x = {
  name: 'form-label',
  mixins: [Colorable, Screenreaders],
  computed: {
    classes: function classes() {
      return extend({}, this.screenreaderClasses, this.colorableClasses);
    }
  }
};

/* script */
            const __vue_script__$w = script$x;
            
/* template */
var __vue_render__$u = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { class: _vm.classes }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$u = [];
__vue_render__$u._withStripped = true;

  /* style */
  const __vue_inject_styles__$w = undefined;
  /* scoped */
  const __vue_scope_id__$w = undefined;
  /* module identifier */
  const __vue_module_identifier__$w = undefined;
  /* functional template */
  const __vue_is_functional_template__$w = false;
  /* component normalizer */
  function __vue_normalize__$w(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/FormLabel/FormLabel.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormLabel = __vue_normalize__$w(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormLabel: FormLabel
    });
  }
});

//
var script$y = {
  name: 'form-feedback',
  mixins: [Colorable],
  props: {
    /**
     * The value of label element. If no value, no label will appear.
     *
     * @property String
     */
    label: String,

    /**
     * Should the feedback marked as invalid
     *
     * @property String
     */
    invalid: Boolean,

    /**
     * Should the feedback marked as invalid
     *
     * @property String
     */
    valid: Boolean
  }
};

/* script */
            const __vue_script__$x = script$y;
            
/* template */
var __vue_render__$v = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: {
        "invalid-feedback": _vm.invalid,
        "valid-feedback": _vm.valid && !_vm.invalid
      }
    },
    [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
    2
  )
};
var __vue_staticRenderFns__$v = [];
__vue_render__$v._withStripped = true;

  /* style */
  const __vue_inject_styles__$x = undefined;
  /* scoped */
  const __vue_scope_id__$x = undefined;
  /* module identifier */
  const __vue_module_identifier__$x = undefined;
  /* functional template */
  const __vue_is_functional_template__$x = false;
  /* component normalizer */
  function __vue_normalize__$x(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/FormFeedback/FormFeedback.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormFeedback = __vue_normalize__$x(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$x,
    __vue_script__$x,
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormFeedback: FormFeedback
    });
  }
});

var FormControl = {
  props: {
    /**
     * The autocomplete attribute value.
     *
     * @property String
     */
    autocomplete: String,

    /**
     * The field id attribute value.
     *
     * @property String
     */
    id: [Number, String],

    /**
     * The value of label element. If no value, no label will appear.
     *
     * @property String
     */
    label: [Number, String],

    /**
     * The field name attribute value.
     *
     * @property String
     */
    name: String,

    /**
     * The field id attribute value.
     *
     * @property String
     */
    value: {
      default: null
    },

    /**
     * The placeholder attribute value.
     *
     * @property String
     */
    placeholder: String,

    /**
     * Is the field required.
     *
     * @property String
     */
    required: Boolean,

    /**
     * Add form-group wrapper to input
     *
     * @property String
     */
    group: {
      type: Boolean,
      value: true
    },

    /**
     * The regex pattern for validation.
     *
     * @property String
     */
    pattern: String,

    /**
     * An inline field validation error.
     *
     * @property String|Boolean
     */
    error: String,

    /**
     * An inline field validation errors passed as object with key/value
     * pairs. If errors passed as an object, the form name will be used for
     * the key.
     *
     * @property Object|Boolean
     */
    errors: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * Some feedback to add to the field once the field is successfully
     * valid.
     *
     * @property String
     */
    feedback: [String, Array],

    /**
     * An array of event names that correlate with callback functions
     *
     * @property Function
     */
    bindEvents: {
      type: Array,
      default: function _default() {
        return ['focus', 'blur', 'change', 'click', 'keyup', 'keydown', 'progress', 'paste'];
      }
    },

    /**
     * The default class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'form-control'
    },

    /**
     * Hide the label for browsers, but leave it for screen readers.
     *
     * @property String
     */
    hideLabel: Boolean,

    /**
     * Additional margin/padding classes for fine control of spacing
     *
     * @property String
     */
    spacing: String,

    /**
     * The size of the form control
     *
     * @property String
     */
    size: {
      type: String,
      default: 'md',
      validate: function validate(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    },

    /**
     * Display the form field inline
     *
     * @property String
     */
    inline: Boolean,

    /**
     * If the form control is readonly, display only as text?
     *
     * @property String
     */
    plaintext: Boolean,

    /**
     * Is the form control readonly?
     *
     * @property String
     */
    readonly: Boolean,

    /**
     * Is the form control disabled?
     *
     * @property String
     */
    disabled: Boolean,

    /**
     * Some instructions to appear under the field label
     *
     * @property String
     */
    helpText: [Number, String],

    /**
     * The maxlength attribute
     *
     * @property String
     */
    maxlength: [Number, String]
  },
  directives: {
    bindEvents: {
      bind: function bind(el, binding, vnode) {
        var events = binding.value || vnode.context.bindEvents;
        each(events, function (name) {
          el.addEventListener(name, function (event) {
            vnode.context.$emit(name, event);
          });
        });
      }
    }
  },
  methods: {
    blur: function blur() {
      if (this.getInputField()) {
        this.getInputField().blur();
      }
    },
    focus: function focus() {
      if (this.getInputField()) {
        this.getInputField().focus();
      }
    },
    getInputField: function getInputField() {
      return this.$el.querySelector('.form-control, input, select, textarea');
    },
    getFieldErrors: function getFieldErrors() {
      var errors = this.error || this.errors;

      if (isObject(this.errors)) {
        errors = this.errors[this.name || this.id];
      }

      return !errors || isArray(errors) || isObject(errors) ? errors : [errors];
    }
  },
  computed: {
    callbacks: function callbacks() {
      var _this = this;

      return this.bindEvents.map(function (event) {
        return {
          name: event,
          callback: _this[camelCase(['on', event].join(' '))]
        };
      }).filter(function (event) {
        return !isUndefined(event.callback);
      });
    },
    invalidFeedback: function invalidFeedback() {
      if (this.error) {
        return this.error;
      }

      var errors = this.getFieldErrors();
      return isArray(errors) ? errors.join('<br>') : errors;
    },
    validFeedback: function validFeedback() {
      return isArray(this.feedback) ? this.feedback.join('<br>') : this.feedback;
    },
    controlClass: function controlClass() {
      return this.defaultControlClass + (this.plaintext ? '-plaintext' : '');
    },
    controlSizeClass: function controlSizeClass() {
      return prefix(this.size, this.controlClass);
    },
    controlClasses: function controlClasses() {
      return [this.controlClass, this.controlSizeClass, this.spacing || '', this.invalidFeedback ? 'is-invalid' : ''].join(' ');
    },
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$slots.default;
    }
  }
};

//
var script$z = {
  name: 'input-field',
  mixins: [Colorable, FormControl, MergeClasses],
  components: {
    HelpText: HelpText,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    FormFeedback: FormFeedback,
    ActivityIndicator: ActivityIndicator
  },
  props: {
    /**
     * Show type activity indicator.
     *
     * @property Boolean
     */
    activity: {
      type: Boolean,
      default: false
    },

    /**
     * The type attribute
     *
     * @property String
     */
    type: {
      type: String,
      default: 'text'
    }
  }
};

/* script */
            const __vue_script__$y = script$z;
/* template */
var __vue_render__$w = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form-group",
    { staticClass: "input-field", class: { "has-activity": _vm.activity } },
    [
      _vm._t("label", [
        _vm.label || _vm.hasDefaultSlot
          ? _c("form-label", {
              ref: "label",
              attrs: { for: _vm.id },
              domProps: { innerHTML: _vm._s(_vm.label) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "position-relative" },
        [
          _vm._t("control", [
            _c("input", {
              directives: [
                {
                  name: "bind-events",
                  rawName: "v-bind-events",
                  value: _vm.bindEvents,
                  expression: "bindEvents"
                }
              ],
              ref: "control",
              class: _vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),
              attrs: {
                id: _vm.id,
                type: _vm.type,
                name: _vm.name,
                pattern: _vm.pattern,
                readonly: _vm.readonly,
                required: _vm.required,
                maxlength: _vm.maxlength,
                placeholder: _vm.placeholder,
                disabled: _vm.disabled || _vm.readonly,
                "aria-label": _vm.label,
                "aria-describedby": _vm.id,
                autocomplete: _vm.autocomplete
              },
              domProps: { value: _vm.value },
              on: {
                input: function($event) {
                  _vm.$emit("input", $event.target.value);
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm._t("activity", [
            _c(
              "transition",
              { attrs: { name: "slide-fade" } },
              [
                _vm.activity
                  ? _c("activity-indicator", {
                      key: "test",
                      ref: "activity",
                      attrs: { type: "dots", size: _vm.size }
                    })
                  : _vm._e()
              ],
              1
            )
          ]),
          _vm._v(" "),
          _vm._t("feedback", [
            _vm.validFeedback
              ? _c("form-feedback", {
                  ref: "feedback",
                  attrs: { valid: "" },
                  domProps: { innerHTML: _vm._s(_vm.validFeedback) }
                })
              : _vm.invalidFeedback
                ? _c("form-feedback", {
                    ref: "feedback",
                    attrs: { invalid: "" },
                    domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
                  })
                : _vm._e()
          ])
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("help", [
        _vm.helpText
          ? _c("help-text", {
              ref: "help",
              domProps: { innerHTML: _vm._s(_vm.helpText) }
            })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$w = [];
__vue_render__$w._withStripped = true;

  /* style */
  const __vue_inject_styles__$y = undefined;
  /* scoped */
  const __vue_scope_id__$y = undefined;
  /* module identifier */
  const __vue_module_identifier__$y = undefined;
  /* functional template */
  const __vue_is_functional_template__$y = false;
  /* component normalizer */
  function __vue_normalize__$y(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/InputField/InputField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var InputField = __vue_normalize__$y(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$y,
    __vue_script__$y,
    __vue_scope_id__$y,
    __vue_is_functional_template__$y,
    __vue_module_identifier__$y,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      InputField: InputField
    });
  }
});

//
var script$A = {
  name: 'file-field',
  extends: InputField,
  components: {
    HelpText: HelpText,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    FormFeedback: FormFeedback,
    MergeClasses: MergeClasses
  },
  model: {
    event: 'change'
  },
  props: {
    /**
     * An array of event names that correlate with callback functions
     *
     * @property Function
     */
    bindEvents: {
      type: Array,
      default: function _default() {
        return ['focus', 'blur', 'input', 'click', 'keyup', 'keydown', 'progress'];
      }
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'custom-file-input'
    },

    /**
     * An array of valid extensions
     *
     * @property String
     */
    extensions: Array,

    /**
     * The type attribute
     *
     * @property String
     */
    multiple: Boolean,

    /**
     * The height attribute for the control element
     *
     * @property String
     */
    height: [Number, String],

    /**
     * The width attribute for the control element
     *
     * @property String
     */
    width: [Number, String]
  }
};

/* script */
            const __vue_script__$z = script$A;
            
/* template */
var __vue_render__$x = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form-group",
    [
      _vm._t("label", [
        _vm.label || _vm.hasDefaultSlot
          ? _c(
              "form-label",
              { attrs: { for: _vm.id } },
              [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
              2
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "custom-file" },
        [
          _vm._t("placeholder", [
            _c("form-label", {
              class: _vm.mergeClasses(
                _vm.colorableClasses,
                "custom-file-label"
              ),
              attrs: { for: _vm.id },
              domProps: { innerHTML: _vm._s(_vm.placeholder || "Choose file") }
            })
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [{ name: "bind-events", rawName: "v-bind-events" }],
            class: _vm.controlClasses,
            attrs: {
              type: "file",
              id: _vm.id,
              width: _vm.width,
              height: _vm.height,
              required: _vm.required,
              multiple: _vm.multiple,
              readonly: _vm.readonly
            },
            on: {
              change: function($event) {
                _vm.$emit("change", $event.target.files);
              }
            }
          }),
          _vm._v(" "),
          _vm._t("help", [
            _vm.helpText
              ? _c("help-text", {
                  domProps: { innerHTML: _vm._s(_vm.helpText) }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm._t("feedback", [
            _vm.validFeedback
              ? _c("form-feedback", {
                  attrs: { valid: "" },
                  domProps: { innerHTML: _vm._s(_vm.validFeedback) }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.invalidFeedback
              ? _c("form-feedback", {
                  attrs: { invalid: "" },
                  domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
                })
              : _vm._e()
          ])
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$x = [];
__vue_render__$x._withStripped = true;

  /* style */
  const __vue_inject_styles__$z = undefined;
  /* scoped */
  const __vue_scope_id__$z = undefined;
  /* module identifier */
  const __vue_module_identifier__$z = undefined;
  /* functional template */
  const __vue_is_functional_template__$z = false;
  /* component normalizer */
  function __vue_normalize__$z(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/FileField/FileField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var FileField = __vue_normalize__$z(
    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
    __vue_inject_styles__$z,
    __vue_script__$z,
    __vue_scope_id__$z,
    __vue_is_functional_template__$z,
    __vue_module_identifier__$z,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FileField: FileField
    });
  }
});

//
var script$B = {
  name: 'btn-file',
  mixins: [FileField],
  components: {
    Btn: Btn,
    FileField: FileField
  },
  model: {
    event: 'change'
  },
  props: {
    /**
     * The type attribute for the button. Not applied if an anchor
     *
     * @property String
     */
    type: {
      type: String,
      default: 'button'
    }
  }
};

/* script */
            const __vue_script__$A = script$B;
/* template */
var __vue_render__$y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "btn",
    {
      staticClass: "btn-file",
      attrs: {
        type: _vm.type,
        variant: _vm.variant,
        block: _vm.block,
        size: _vm.size,
        disabled: _vm.disabled,
        active: _vm.active
      }
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _c("input", {
        directives: [{ name: "bind-events", rawName: "v-bind-events" }],
        class: _vm.controlClasses,
        attrs: {
          type: "file",
          id: _vm.id,
          width: _vm.width,
          height: _vm.height,
          required: _vm.required,
          multiple: _vm.multiple,
          readonly: _vm.readonly
        },
        on: {
          change: function($event) {
            _vm.$emit(
              "change",
              _vm.multiple ? $event.target.files : $event.target.files[0]
            );
          }
        }
      })
    ],
    2
  )
};
var __vue_staticRenderFns__$y = [];
__vue_render__$y._withStripped = true;

  /* style */
  const __vue_inject_styles__$A = undefined;
  /* scoped */
  const __vue_scope_id__$A = undefined;
  /* module identifier */
  const __vue_module_identifier__$A = undefined;
  /* functional template */
  const __vue_is_functional_template__$A = false;
  /* component normalizer */
  function __vue_normalize__$A(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/BtnFile/BtnFile.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BtnFile = __vue_normalize__$A(
    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
    __vue_inject_styles__$A,
    __vue_script__$A,
    __vue_scope_id__$A,
    __vue_is_functional_template__$A,
    __vue_module_identifier__$A,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnFile: BtnFile
    });
  }
});

//
var script$C = {
  name: 'btn-group',
  components: {
    Btn: Btn
  },
  mixins: [Colorable, MergeClasses],
  props: {
    /**
     * An array of buttons
     *
     * @type {Array}
     */
    buttons: Array,

    /**
     * Denote the button group as toggle buttons
     *
     * @type {Boolean}
     */
    toggle: Boolean,

    /**
     * Display the buttons vertically
     *
     * @type {Boolean}
     */
    vertical: Boolean
  },
  computed: {
    classes: function classes() {
      return this.mergeClasses(this.colorableClasses, {
        'btn-group': !this.vertical,
        'btn-group-toggle': this.toggle,
        'btn-group-vertical': this.vertical
      });
    }
  }
};

/* script */
            const __vue_script__$B = script$C;
            
/* template */
var __vue_render__$z = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.classes,
      attrs: { "data-toggle": _vm.toggle ? "buttons" : false, role: "group" }
    },
    [
      _vm._l(_vm.buttons, function(button, i) {
        return _vm.buttons
          ? _c("btn", _vm._b({ key: i }, "btn", button, false))
          : _vm._e()
      }),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$z = [];
__vue_render__$z._withStripped = true;

  /* style */
  const __vue_inject_styles__$B = undefined;
  /* scoped */
  const __vue_scope_id__$B = undefined;
  /* module identifier */
  const __vue_module_identifier__$B = undefined;
  /* functional template */
  const __vue_is_functional_template__$B = false;
  /* component normalizer */
  function __vue_normalize__$B(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/BtnGroup/BtnGroup.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BtnGroup = __vue_normalize__$B(
    { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
    __vue_inject_styles__$B,
    __vue_script__$B,
    __vue_scope_id__$B,
    __vue_is_functional_template__$B,
    __vue_module_identifier__$B,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$D = {
  name: 'btn-group-toggle'
};

/* script */
            const __vue_script__$C = script$D;
            
/* template */
var __vue_render__$A = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "btn-group-toggle", attrs: { "data-toggle": "buttons" } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$A = [];
__vue_render__$A._withStripped = true;

  /* style */
  const __vue_inject_styles__$C = undefined;
  /* scoped */
  const __vue_scope_id__$C = undefined;
  /* module identifier */
  const __vue_module_identifier__$C = undefined;
  /* functional template */
  const __vue_is_functional_template__$C = false;
  /* component normalizer */
  function __vue_normalize__$C(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/BtnGroup/BtnGroupToggle.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BtnGroupToggle = __vue_normalize__$C(
    { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$A },
    __vue_inject_styles__$C,
    __vue_script__$C,
    __vue_scope_id__$C,
    __vue_is_functional_template__$C,
    __vue_module_identifier__$C,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$E = {
  name: 'btn-toolbar'
};

/* script */
            const __vue_script__$D = script$E;
            
/* template */
var __vue_render__$B = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "btn-toolbar", attrs: { role: "toolbar" } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$B = [];
__vue_render__$B._withStripped = true;

  /* style */
  const __vue_inject_styles__$D = undefined;
  /* scoped */
  const __vue_scope_id__$D = undefined;
  /* module identifier */
  const __vue_module_identifier__$D = undefined;
  /* functional template */
  const __vue_is_functional_template__$D = false;
  /* component normalizer */
  function __vue_normalize__$D(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/BtnGroup/BtnToolbar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BtnToolbar = __vue_normalize__$D(
    { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$B },
    __vue_inject_styles__$D,
    __vue_script__$D,
    __vue_scope_id__$D,
    __vue_is_functional_template__$D,
    __vue_module_identifier__$D,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnGroup: BtnGroup,
      BtnGroupToggle: BtnGroupToggle,
      BtnToolbar: BtnToolbar
    });
  }
});

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

var Proxy$1 = {
  methods: {
    proxy: function proxy(callback, event) {
      if (isFunction(callback)) {
        callback.apply(this, [].slice.call(arguments).splice(1));
        event.preventDefault();
      }
    }
  }
};

//
var script$F = {
  mixins: [Proxy$1],
  props: {
    /**
     * Is the menu item active.
     *
     * @property Object
     */
    active: Boolean,

    /**
     * Is the menu item a button
     *
     * @property Object
     */
    button: Boolean,

    /**
     * The `element` attribute.
     *
     * @property Object
     */
    element: String,

    /**
     * The `href` attribute.
     *
     * @property Object
     */
    href: String,

    /**
     * The icon of the dropdown menu item.
     *
     * @property Object
     */
    icon: String,

    /**
     * The label of the dropdown menu item.
     *
     * @property Object
     */
    label: String
  },
  computed: {
    component: function component() {
      return this.element || (this.button ? 'button' : 'a');
    }
  },
  methods: {
    /**
     * A callback function for the `click` event.
     *
     * @property Object
     */
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
};

/* script */
            const __vue_script__$E = script$F;
            
/* template */
var __vue_render__$C = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.component,
    {
      tag: "component",
      staticClass: "dropdown-item",
      class: { active: _vm.active },
      attrs: {
        href: _vm.href || (_vm.component === "a" ? "#" : false),
        type: _vm.component === "button" ? "button" : false
      },
      on: { click: _vm.onClick }
    },
    [
      _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
      _vm._v(" "),
      _vm._t("default", [_vm._v(_vm._s(_vm.label))])
    ],
    2
  )
};
var __vue_staticRenderFns__$C = [];
__vue_render__$C._withStripped = true;

  /* style */
  const __vue_inject_styles__$E = undefined;
  /* scoped */
  const __vue_scope_id__$E = undefined;
  /* module identifier */
  const __vue_module_identifier__$E = undefined;
  /* functional template */
  const __vue_is_functional_template__$E = false;
  /* component normalizer */
  function __vue_normalize__$E(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/DropdownMenu/DropdownMenuItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DropdownMenuItem = __vue_normalize__$E(
    { render: __vue_render__$C, staticRenderFns: __vue_staticRenderFns__$C },
    __vue_inject_styles__$E,
    __vue_script__$E,
    __vue_scope_id__$E,
    __vue_is_functional_template__$E,
    __vue_module_identifier__$E,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$G = {
  name: 'dropdown-menu-header',
  props: {
    /**
     * The value of the header
     *
     * @property Object
     */
    header: String
  }
};

/* script */
            const __vue_script__$F = script$G;
            
/* template */
var __vue_render__$D = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "h5",
    { staticClass: "dropdown-header" },
    [_vm._t("default", [_vm._v(_vm._s(_vm.header))])],
    2
  )
};
var __vue_staticRenderFns__$D = [];
__vue_render__$D._withStripped = true;

  /* style */
  const __vue_inject_styles__$F = undefined;
  /* scoped */
  const __vue_scope_id__$F = undefined;
  /* module identifier */
  const __vue_module_identifier__$F = undefined;
  /* functional template */
  const __vue_is_functional_template__$F = false;
  /* component normalizer */
  function __vue_normalize__$F(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/DropdownMenu/DropdownMenuHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DropdownMenuHeader = __vue_normalize__$F(
    { render: __vue_render__$D, staticRenderFns: __vue_staticRenderFns__$D },
    __vue_inject_styles__$F,
    __vue_script__$F,
    __vue_scope_id__$F,
    __vue_is_functional_template__$F,
    __vue_module_identifier__$F,
    undefined,
    undefined
  );

//
//
//
//
var script$H = {
  name: 'dropdown-menu-divider'
};

/* script */
            const __vue_script__$G = script$H;
            
/* template */
var __vue_render__$E = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "dropdown-divider" })
};
var __vue_staticRenderFns__$E = [];
__vue_render__$E._withStripped = true;

  /* style */
  const __vue_inject_styles__$G = undefined;
  /* scoped */
  const __vue_scope_id__$G = undefined;
  /* module identifier */
  const __vue_module_identifier__$G = undefined;
  /* functional template */
  const __vue_is_functional_template__$G = false;
  /* component normalizer */
  function __vue_normalize__$G(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/DropdownMenu/DropdownMenuDivider.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DropdownMenuDivider = __vue_normalize__$G(
    { render: __vue_render__$E, staticRenderFns: __vue_staticRenderFns__$E },
    __vue_inject_styles__$G,
    __vue_script__$G,
    __vue_scope_id__$G,
    __vue_is_functional_template__$G,
    __vue_module_identifier__$G,
    undefined,
    undefined
  );

//
var script$I = {
  components: {
    DropdownMenuItem: DropdownMenuItem,
    DropdownMenuHeader: DropdownMenuHeader,
    DropdownMenuDivider: DropdownMenuDivider
  },
  props: {
    /**
     * The `id` attribute on the toggle button and aria label. If no `id` is
     * defined, then a UUID will be generated instead.
     *
     * @property Object
     */
    id: {
      type: String,
      default: uuid
    },

    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: 'left',
      validate: function validate(value) {
        return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
      }
    },

    /**
     * The default visibility of the dropdown menu.
     *
     * @property Object
     */
    show: Boolean,

    /**
     * An array of dropdown items. If an key/value pair isn't defined, the
     * default value will be used. If no items are defined, then the slot
     * named "items" can be used to define the options with HTML.
     *
     * [{
     *      type: 'item', // String [item|header|divider]
     *      href: '#', // String
     *      label: 'Some label', // String
     *      onClick: (event) => {} // Function
     * }]
     *
     * @property Array
     */
    items: Array
  },
  methods: {
    prefix: prefix,

    /**
     * A callback function for the `click` event.
     *
     * @param Object event
     * @param Object item
     * @return void
     */
    onClick: function onClick(event) {
      this.$emit('click', event);
    },

    /**
     * A callback function for the `click` event.
     *
     * @param Object event
     * @param Object item
     * @return void
     */
    onItemClick: function onItemClick(event, item) {
      this.$emit('item:click', event, item);
    }
  },
  mounted: function mounted() {
    var _this = this;

    each(this.$children, function (child) {
      child.$on('click', function (event) {
        _this.onItemClick(event, child);
      });
    });
  }
};

/* script */
            const __vue_script__$H = script$I;
            
/* template */
var __vue_render__$F = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "dropdown-menu",
      class: { "dropdown-menu-right": _vm.align === "right", show: _vm.show },
      attrs: { "aria-labelledby": _vm.id, tabindex: "-1" },
      on: { click: _vm.onClick }
    },
    [
      _vm._l(_vm.items, function(item) {
        return [
          _c(
            _vm.prefix(item.type || "item", "dropdown-menu"),
            _vm._b({ tag: "component" }, "component", item, false)
          )
        ]
      }),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$F = [];
__vue_render__$F._withStripped = true;

  /* style */
  const __vue_inject_styles__$H = undefined;
  /* scoped */
  const __vue_scope_id__$H = undefined;
  /* module identifier */
  const __vue_module_identifier__$H = undefined;
  /* functional template */
  const __vue_is_functional_template__$H = false;
  /* component normalizer */
  function __vue_normalize__$H(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/DropdownMenu/DropdownMenu.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DropdownMenu = __vue_normalize__$H(
    { render: __vue_render__$F, staticRenderFns: __vue_staticRenderFns__$F },
    __vue_inject_styles__$H,
    __vue_script__$H,
    __vue_scope_id__$H,
    __vue_is_functional_template__$H,
    __vue_module_identifier__$H,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      DropdownMenu: DropdownMenu,
      DropdownMenuDivider: DropdownMenuDivider,
      DropdownMenuHeader: DropdownMenuHeader,
      DropdownMenuItem: DropdownMenuItem
    });
  }
});

//
var TAB_KEYCODE = 9;
var LEFT_ARROW_KEYCODE = 37;
var RIGHT_ARROW_KEYCODE = 39;
var UP_ARROW_KEYCODE = 38;
var DOWN_ARROW_KEYCODE = 40;
var ignoreBlurEvent = false;
var script$J = {
  name: 'btn-dropdown',
  extends: Btn,
  components: {
    BtnGroup: BtnGroup,
    DropdownMenu: DropdownMenu
  },
  props: {
    /**
     * The button icon that appears before the label.
     *
     * @property String
     */
    autoclose: Boolean,

    /**
     * The button icon that appears before the label.
     *
     * @property String
     */
    icon: String,

    /**
     * The toggle button's label. If not defined as an attribute,
     * you can override with the component's slot (inner html).
     *
     * @property String
     */
    label: String,

    /**
     * The `id` attribute on the toggle button and aria label. If no `id` is
     * defined, then a UUID will be generated instead.
     *
     * @property String
     */
    id: {
      type: String,
      default: uuid
    },

    /**
     * The button type attribute.
     *
     * @property String
     */
    type: {
      type: String,
      default: 'button'
    },

    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: 'left',
      validate: function validate(value) {
        return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
      }
    },

    /**
     * Display the dropdown button with a split toggle button.
     *
     * @property Boolean
     */
    split: {
      type: Boolean,
      default: false
    },

    /**
     * Display as a dropup instead of a dropdown.
     *
     * @property Boolean
     */
    dropup: {
      type: Boolean,
      default: false
    },

    /**
     * Display as a dropright instead of a dropdown.
     *
     * @property Boolean
     */
    dropright: {
      type: Boolean,
      default: false
    },

    /**
     * Display as a dropleft instead of a dropdown.
     *
     * @property Boolean
     */
    dropleft: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    focus: function focus() {
      this.$el.querySelector('.dropdown-toggle').focus();
    },

    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    queryFocusable: function queryFocusable() {
      return this.$el.querySelector('.dropdown-menu').querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    },

    /**
     * Method to check if the given element is focusable.
     *
     * @return void
     */
    isFocusable: function isFocusable(element) {
      var nodes = this.queryFocusable();

      for (var i in nodes) {
        if (element === nodes[i]) {
          return true;
        }
      }

      return false;
    },

    /**
     * Toggle the dropdown menu
     *
     * @return void
     */
    toggle: function toggle() {
      !this.isDropdownShowing ? this.show() : this.hide();
    },

    /**
     * Show the dropdown menu
     *
     * @return void
     */
    show: function show() {
      var _this = this;

      this.isDropdownShowing = true;
      this.$nextTick(function () {
        var side = 'bottom';

        if (_this.dropup) {
          side = 'top';
        } else if (_this.dropleft) {
          side = 'left';
        } else if (_this.dropright) {
          side = 'right';
        }

        var menu = _this.$el.querySelector('.dropdown-menu');

        var toggle = _this.$el.querySelector('.dropdown-toggle');

        var position = [side, _this.align === 'left' ? 'start' : 'end'];
        _this.$popper = new Popper(toggle, menu, {
          placement: position.join('-')
        });

        if (_this.queryFocusable().item(0)) {
          _this.$el.querySelector('input, select, textarea').focus();
        }

        _this.$emit('show');
      });
    },

    /**
     * Hide the dropdown menu
     *
     * @return void
     */
    hide: function hide() {
      this.$emit('toggle', this.isDropdownShowing = false);
      this.$emit('hide');
    },

    /**
     * A callback function for the `click` event for the action button
     *
     * @return void
     */
    onClick: function onClick(event) {
      this.hide();
      this.$emit('click', event);
    },

    /**
     * A callback function for the `blur` event for the action button
     *
     * @return void
     */
    onBlur: function onBlur(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.hide();
      }
    },

    /**
     * A callback function for the `item:click` event for the action button
     *
     * @return void
     */
    onMenuClick: function onMenuClick(event, item) {
      if (event.target === this.$el.querySelector('.dropdown-menu')) {
        this.focus();
      }
    },

    /**
     * A callback function for the `item:click` event for the action button
     *
     * @return void
     */
    onItemClick: function onItemClick(event, item) {
      if (!this.isFocusable(event.target)) {
        this.hide();
      }

      this.$emit('item:click', event, item);
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return 'btn' + (this.outline ? '-outline' : '');
    },
    sizeableClassPrefix: function sizeableClassPrefix() {
      return 'btn';
    },
    actionClasses: function actionClasses() {
      return ['btn', prefix(this.size, 'btn'), prefix(this.variant, 'btn')].join(' ');
    },
    toggleClasses: function toggleClasses() {
      return ['btn', 'dropdown-toggle', this.variantClass, this.sizeableClass, this.active ? 'active' : '', this.block ? 'btn-block' : '', this.split ? 'dropdown-toggle-split' : ''].join(' ');
    }
  },
  data: function data() {
    return {
      isDropdownShowing: false
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    each(this.$el.querySelectorAll('[type=submit], input, select, textarea, [tabindex]:not([tabindex="-1"]'), function (el) {
      var keydown = function keydown(event) {
        var ignore = [LEFT_ARROW_KEYCODE, RIGHT_ARROW_KEYCODE, UP_ARROW_KEYCODE, DOWN_ARROW_KEYCODE, TAB_KEYCODE];

        if (ignore.indexOf(event.keyCode) !== -1) {
          ignoreBlurEvent = true;
        }
      };

      var blur = function blur(event) {
        if (!ignoreBlurEvent) {
          _this2.focus();
        }

        ignoreBlurEvent = false;
      };

      var focus = function focus(event) {
        ignoreBlurEvent = false;
      };

      var mousedown = function mousedown(event) {
        ignoreBlurEvent = true;
      };

      el.addEventListener('blur', blur);
      el.addEventListener('focus', focus);
      el.addEventListener('keydown', keydown);
      el.addEventListener('mousedown', mousedown);
    });
  }
};

/* script */
            const __vue_script__$I = script$J;
            
/* template */
var __vue_render__$G = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.split
    ? _c(
        "btn-group",
        [
          !_vm.dropleft
            ? [
                _vm.href
                  ? _c(
                      "a",
                      {
                        class: _vm.actionClasses,
                        attrs: { href: _vm.href },
                        on: { click: _vm.onClick }
                      },
                      [
                        _vm._t("label", [
                          _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
                          _vm._v(" " + _vm._s(_vm.label))
                        ])
                      ],
                      2
                    )
                  : _c(
                      "button",
                      {
                        class: _vm.actionClasses,
                        attrs: { type: _vm.type },
                        on: { click: _vm.onClick }
                      },
                      [
                        _vm._t("label-wrapper", [
                          _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
                          _vm._v(" "),
                          _vm._t("label", [_vm._v(_vm._s(_vm.label))])
                        ])
                      ],
                      2
                    )
              ]
            : _vm._e(),
          _vm._v(" "),
          _c(
            "btn-group",
            {
              class: {
                dropup: _vm.dropup,
                dropright: _vm.dropright,
                dropleft: _vm.dropleft
              }
            },
            [
              _c("button", {
                class: _vm.toggleClasses,
                attrs: {
                  type: "button",
                  "aria-haspopup": "true",
                  "aria-expanded": _vm.isDropdownShowing,
                  id: _vm.id
                },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    !_vm.isDropdownShowing ? _vm.show() : _vm.hide();
                  },
                  blur: _vm.onBlur
                }
              }),
              _vm._v(" "),
              _c(
                "dropdown-menu",
                {
                  attrs: {
                    id: _vm.id,
                    align: _vm.align,
                    show: _vm.isDropdownShowing
                  },
                  on: {
                    "update:show": function($event) {
                      _vm.isDropdownShowing = $event;
                    },
                    click: _vm.onMenuClick,
                    "item:click": _vm.onItemClick
                  }
                },
                [_vm._t("default")],
                2
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.dropleft
            ? [
                _vm.href
                  ? _c(
                      "a",
                      {
                        class: _vm.actionClasses,
                        attrs: { href: _vm.href },
                        on: { click: _vm.onClick }
                      },
                      [
                        _vm._t("label", [
                          _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
                          _vm._v(" " + _vm._s(_vm.label))
                        ])
                      ],
                      2
                    )
                  : _c(
                      "button",
                      {
                        class: _vm.actionClasses,
                        attrs: { type: _vm.type },
                        on: { click: _vm.onClick }
                      },
                      [
                        _vm._t("label-wrapper", [
                          _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
                          _vm._v(" "),
                          _vm._t("label", [_vm._v(_vm._s(_vm.label))])
                        ])
                      ],
                      2
                    )
              ]
            : _vm._e()
        ],
        2
      )
    : _c(
        "btn-group",
        {
          class: {
            dropup: _vm.dropup,
            dropright: _vm.dropright,
            dropleft: _vm.dropleft
          },
          on: { click: _vm.onClick }
        },
        [
          _c(
            "button",
            {
              class: _vm.toggleClasses,
              attrs: {
                "aria-haspopup": "true",
                "aria-expanded": _vm.isDropdownShowing,
                type: _vm.type,
                id: _vm.id
              },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  !_vm.isDropdownShowing ? _vm.show() : _vm.hide();
                },
                blur: _vm.onBlur
              }
            },
            [
              _vm._t("label", [
                _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
                _vm._v(" " + _vm._s(_vm.label))
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "dropdown-menu",
            {
              attrs: {
                id: _vm.id,
                align: _vm.align,
                show: _vm.isDropdownShowing
              },
              on: {
                "update:show": function($event) {
                  _vm.isDropdownShowing = $event;
                },
                click: _vm.onMenuClick,
                "item:click": _vm.onItemClick
              }
            },
            [_vm._t("default")],
            2
          )
        ],
        1
      )
};
var __vue_staticRenderFns__$G = [];
__vue_render__$G._withStripped = true;

  /* style */
  const __vue_inject_styles__$I = undefined;
  /* scoped */
  const __vue_scope_id__$I = undefined;
  /* module identifier */
  const __vue_module_identifier__$I = undefined;
  /* functional template */
  const __vue_is_functional_template__$I = false;
  /* component normalizer */
  function __vue_normalize__$I(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/BtnDropdown/BtnDropdown.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var BtnDropdown = __vue_normalize__$I(
    { render: __vue_render__$G, staticRenderFns: __vue_staticRenderFns__$G },
    __vue_inject_styles__$I,
    __vue_script__$I,
    __vue_scope_id__$I,
    __vue_is_functional_template__$I,
    __vue_module_identifier__$I,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnDropdown: BtnDropdown
    });
  }
});

var HasSlots = {
  methods: {
    getSlot: function getSlot(slot) {
      return this.$slots[slot];
    },
    hasSlot: function hasSlot(slot) {
      return !!this.$slots[slot];
    },
    hasSlots: function hasSlots(slots) {
      for (var i in slots) {
        if (!this.hasSlot(slots[i])) {
          return false;
        }
      }
    }
  },
  computed: {
    hasDefaultSlot: function hasDefaultSlot() {
      return this.hasSlot('default');
    }
  }
};

//
var script$K = {
  name: 'card',
  mixins: [HasSlots, Colorable, MergeClasses],
  computed: {
    className: function className() {
      return this.$options.name;
    }
  }
};

/* script */
            const __vue_script__$J = script$K;
            
/* template */
var __vue_render__$H = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.mergeClasses(_vm.className, _vm.colorableClasses) },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$H = [];
__vue_render__$H._withStripped = true;

  /* style */
  const __vue_inject_styles__$J = undefined;
  /* scoped */
  const __vue_scope_id__$J = undefined;
  /* module identifier */
  const __vue_module_identifier__$J = undefined;
  /* functional template */
  const __vue_is_functional_template__$J = false;
  /* component normalizer */
  function __vue_normalize__$J(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/Card.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Card = __vue_normalize__$J(
    { render: __vue_render__$H, staticRenderFns: __vue_staticRenderFns__$H },
    __vue_inject_styles__$J,
    __vue_script__$J,
    __vue_scope_id__$J,
    __vue_is_functional_template__$J,
    __vue_module_identifier__$J,
    undefined,
    undefined
  );

var script$L = {
  name: 'card-body',
  extends: Card
};

/* script */
            const __vue_script__$K = script$L;
            
/* template */

  /* style */
  const __vue_inject_styles__$K = undefined;
  /* scoped */
  const __vue_scope_id__$K = undefined;
  /* module identifier */
  const __vue_module_identifier__$K = undefined;
  /* functional template */
  const __vue_is_functional_template__$K = undefined;
  /* component normalizer */
  function __vue_normalize__$K(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardBody.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardBody = __vue_normalize__$K(
    {},
    __vue_inject_styles__$K,
    __vue_script__$K,
    __vue_scope_id__$K,
    __vue_is_functional_template__$K,
    __vue_module_identifier__$K,
    undefined,
    undefined
  );

//
var script$M = {
  name: 'card-btn-group',
  extends: Card
};

/* script */
            const __vue_script__$L = script$M;
/* template */
var __vue_render__$I = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "btn-group",
    { staticClass: "card-btn-group" },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$I = [];
__vue_render__$I._withStripped = true;

  /* style */
  const __vue_inject_styles__$L = undefined;
  /* scoped */
  const __vue_scope_id__$L = undefined;
  /* module identifier */
  const __vue_module_identifier__$L = undefined;
  /* functional template */
  const __vue_is_functional_template__$L = false;
  /* component normalizer */
  function __vue_normalize__$L(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardBtnGroup.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardBtnGroup = __vue_normalize__$L(
    { render: __vue_render__$I, staticRenderFns: __vue_staticRenderFns__$I },
    __vue_inject_styles__$L,
    __vue_script__$L,
    __vue_scope_id__$L,
    __vue_is_functional_template__$L,
    __vue_module_identifier__$L,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
var script$N = {
  name: 'card-deck'
};

/* script */
            const __vue_script__$M = script$N;
            
/* template */
var __vue_render__$J = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "card-deck" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$J = [];
__vue_render__$J._withStripped = true;

  /* style */
  const __vue_inject_styles__$M = undefined;
  /* scoped */
  const __vue_scope_id__$M = undefined;
  /* module identifier */
  const __vue_module_identifier__$M = undefined;
  /* functional template */
  const __vue_is_functional_template__$M = false;
  /* component normalizer */
  function __vue_normalize__$M(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardDeck.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardDeck = __vue_normalize__$M(
    { render: __vue_render__$J, staticRenderFns: __vue_staticRenderFns__$J },
    __vue_inject_styles__$M,
    __vue_script__$M,
    __vue_scope_id__$M,
    __vue_is_functional_template__$M,
    __vue_module_identifier__$M,
    undefined,
    undefined
  );

//
var script$O = {
  name: 'card-header',
  extends: Card,
  mixins: [MergeClasses],
  props: {
    /**
     * The component's HTML tag name
     *
     * @property String
     */
    tag: {
      type: String,
      default: 'h5'
    }
  }
};

/* script */
            const __vue_script__$N = script$O;
            
/* template */
var __vue_render__$K = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.tag,
    {
      tag: "component",
      class: _vm.mergeClasses(_vm.className, _vm.colorableClasses)
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$K = [];
__vue_render__$K._withStripped = true;

  /* style */
  const __vue_inject_styles__$N = undefined;
  /* scoped */
  const __vue_scope_id__$N = undefined;
  /* module identifier */
  const __vue_module_identifier__$N = undefined;
  /* functional template */
  const __vue_is_functional_template__$N = false;
  /* component normalizer */
  function __vue_normalize__$N(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardHeader = __vue_normalize__$N(
    { render: __vue_render__$K, staticRenderFns: __vue_staticRenderFns__$K },
    __vue_inject_styles__$N,
    __vue_script__$N,
    __vue_scope_id__$N,
    __vue_is_functional_template__$N,
    __vue_module_identifier__$N,
    undefined,
    undefined
  );

var script$P = {
  name: 'card-footer',
  extends: CardHeader,
  props: {
    /**
     * The component's HTML tag name
     *
     * @property String
     */
    tag: {
      type: String,
      default: 'div'
    }
  }
};

/* script */
            const __vue_script__$O = script$P;
            
/* template */

  /* style */
  const __vue_inject_styles__$O = undefined;
  /* scoped */
  const __vue_scope_id__$O = undefined;
  /* module identifier */
  const __vue_module_identifier__$O = undefined;
  /* functional template */
  const __vue_is_functional_template__$O = undefined;
  /* component normalizer */
  function __vue_normalize__$O(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardFooter.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardFooter = __vue_normalize__$O(
    {},
    __vue_inject_styles__$O,
    __vue_script__$O,
    __vue_scope_id__$O,
    __vue_is_functional_template__$O,
    __vue_module_identifier__$O,
    undefined,
    undefined
  );

//
var script$Q = {
  name: 'card-img',
  extends: Card,
  mixins: [MergeClasses],
  props: {
    /**
     * The alt attribute
     *
     * @property String
     */
    alt: String,

    /**
     * Display the image as a background image fit with CSS cover.
     *
     * @property String
     */
    background: Boolean,

    /**
     * The amount to blur the background image.
     *
     * @property String
     */
    blur: [Number, String],

    /**
     * The height attribute
     *
     * @property String
     */
    height: [Number, String],

    /**
     * Truncate the text in the content
     *
     * @property String
     */
    textTruncate: Boolean,

    /**
     * The src attribute
     *
     * @property String
     */
    src: String
  },
  methods: {
    unit: function unit$$1(value) {
      return unit(value);
    }
  }
};

/* script */
            const __vue_script__$P = script$Q;
/* template */
var __vue_render__$L = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "d-flex justify-content-center align-items-center",
      class: _vm.mergeClasses(_vm.className),
      style: { height: _vm.unit(_vm.height) }
    },
    [
      _vm.background
        ? _c("div", {
            staticClass: "card-img-bg",
            style: {
              background: _vm.background ? "url(" + this.src + ")" : null,
              overflow: _vm.blur ? "hidden" : "inherit",
              filter: _vm.blur ? "blur(" + _vm.unit(_vm.blur) + ")" : null
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.background && _vm.src
        ? _c("img", {
            staticClass: "img-fluid",
            attrs: { src: _vm.src, alt: _vm.alt }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "card-img-content",
          class: { "text-truncate": _vm.textTruncate }
        },
        [_vm._t("default")],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$L = [];
__vue_render__$L._withStripped = true;

  /* style */
  const __vue_inject_styles__$P = undefined;
  /* scoped */
  const __vue_scope_id__$P = undefined;
  /* module identifier */
  const __vue_module_identifier__$P = undefined;
  /* functional template */
  const __vue_is_functional_template__$P = false;
  /* component normalizer */
  function __vue_normalize__$P(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardImg.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardImg = __vue_normalize__$P(
    { render: __vue_render__$L, staticRenderFns: __vue_staticRenderFns__$L },
    __vue_inject_styles__$P,
    __vue_script__$P,
    __vue_scope_id__$P,
    __vue_is_functional_template__$P,
    __vue_module_identifier__$P,
    undefined,
    undefined
  );

var script$R = {
  name: 'card-img-top',
  extends: CardImg
};

/* script */
            const __vue_script__$Q = script$R;
            
/* template */

  /* style */
  const __vue_inject_styles__$Q = undefined;
  /* scoped */
  const __vue_scope_id__$Q = undefined;
  /* module identifier */
  const __vue_module_identifier__$Q = undefined;
  /* functional template */
  const __vue_is_functional_template__$Q = undefined;
  /* component normalizer */
  function __vue_normalize__$Q(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardImgTop.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardImgTop = __vue_normalize__$Q(
    {},
    __vue_inject_styles__$Q,
    __vue_script__$Q,
    __vue_scope_id__$Q,
    __vue_is_functional_template__$Q,
    __vue_module_identifier__$Q,
    undefined,
    undefined
  );

var script$S = {
  name: 'card-img-bottom',
  extends: CardImg
};

/* script */
            const __vue_script__$R = script$S;
            
/* template */

  /* style */
  const __vue_inject_styles__$R = undefined;
  /* scoped */
  const __vue_scope_id__$R = undefined;
  /* module identifier */
  const __vue_module_identifier__$R = undefined;
  /* functional template */
  const __vue_is_functional_template__$R = undefined;
  /* component normalizer */
  function __vue_normalize__$R(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardImgBottom.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardImgBottom = __vue_normalize__$R(
    {},
    __vue_inject_styles__$R,
    __vue_script__$R,
    __vue_scope_id__$R,
    __vue_is_functional_template__$R,
    __vue_module_identifier__$R,
    undefined,
    undefined
  );

var script$T = {
  name: 'card-img-overlay',
  extends: Card
};

/* script */
            const __vue_script__$S = script$T;
            
/* template */

  /* style */
  const __vue_inject_styles__$S = undefined;
  /* scoped */
  const __vue_scope_id__$S = undefined;
  /* module identifier */
  const __vue_module_identifier__$S = undefined;
  /* functional template */
  const __vue_is_functional_template__$S = undefined;
  /* component normalizer */
  function __vue_normalize__$S(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardImgOverlay.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardImgOverlay = __vue_normalize__$S(
    {},
    __vue_inject_styles__$S,
    __vue_script__$S,
    __vue_scope_id__$S,
    __vue_is_functional_template__$S,
    __vue_module_identifier__$S,
    undefined,
    undefined
  );

//
var script$U = {
  name: 'card-link',
  extends: Card,
  mixins: [MergeClasses],
  props: {
    /**
     * The alt attribute
     *
     * @property String
     */
    alt: String,

    /**
     * The href attribute
     *
     * @property String
     */
    href: String,

    /**
     * The to attribute
     *
     * @property String
     */
    to: [Object, String]
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
};

/* script */
            const __vue_script__$T = script$U;
            
/* template */
var __vue_render__$M = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "router-link",
    {
      class: _vm.mergeClasses(_vm.className, _vm.colorableClasses),
      attrs: { to: _vm.href },
      on: { click: _vm.onClick }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$M = [];
__vue_render__$M._withStripped = true;

  /* style */
  const __vue_inject_styles__$T = undefined;
  /* scoped */
  const __vue_scope_id__$T = undefined;
  /* module identifier */
  const __vue_module_identifier__$T = undefined;
  /* functional template */
  const __vue_is_functional_template__$T = false;
  /* component normalizer */
  function __vue_normalize__$T(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardLink.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardLink = __vue_normalize__$T(
    { render: __vue_render__$M, staticRenderFns: __vue_staticRenderFns__$M },
    __vue_inject_styles__$T,
    __vue_script__$T,
    __vue_scope_id__$T,
    __vue_is_functional_template__$T,
    __vue_module_identifier__$T,
    undefined,
    undefined
  );

//
var script$V = {
  name: 'card-subtitle',
  extends: Card,
  mixins: [MergeClasses]
};

/* script */
            const __vue_script__$U = script$V;
            
/* template */
var __vue_render__$N = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "h6",
    { class: _vm.mergeClasses(_vm.className, _vm.colorableClasses) },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$N = [];
__vue_render__$N._withStripped = true;

  /* style */
  const __vue_inject_styles__$U = undefined;
  /* scoped */
  const __vue_scope_id__$U = undefined;
  /* module identifier */
  const __vue_module_identifier__$U = undefined;
  /* functional template */
  const __vue_is_functional_template__$U = false;
  /* component normalizer */
  function __vue_normalize__$U(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardSubtitle.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardSubtitle = __vue_normalize__$U(
    { render: __vue_render__$N, staticRenderFns: __vue_staticRenderFns__$N },
    __vue_inject_styles__$U,
    __vue_script__$U,
    __vue_scope_id__$U,
    __vue_is_functional_template__$U,
    __vue_module_identifier__$U,
    undefined,
    undefined
  );

//
var script$W = {
  name: 'card-title',
  mixins: [Card, MergeClasses]
};

/* script */
            const __vue_script__$V = script$W;
            
/* template */
var __vue_render__$O = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "h5",
    { class: _vm.mergeClasses(_vm.className, _vm.colorableClasses) },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$O = [];
__vue_render__$O._withStripped = true;

  /* style */
  const __vue_inject_styles__$V = undefined;
  /* scoped */
  const __vue_scope_id__$V = undefined;
  /* module identifier */
  const __vue_module_identifier__$V = undefined;
  /* functional template */
  const __vue_is_functional_template__$V = false;
  /* component normalizer */
  function __vue_normalize__$V(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Card/CardTitle.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CardTitle = __vue_normalize__$V(
    { render: __vue_render__$O, staticRenderFns: __vue_staticRenderFns__$O },
    __vue_inject_styles__$V,
    __vue_script__$V,
    __vue_scope_id__$V,
    __vue_is_functional_template__$V,
    __vue_module_identifier__$V,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Card: Card,
      CardBody: CardBody,
      CardBtnGroup: CardBtnGroup,
      CardDeck: CardDeck,
      CardFooter: CardFooter,
      CardHeader: CardHeader,
      CardImg: CardImg,
      CardImgTop: CardImgTop,
      CardImgBottom: CardImgBottom,
      CardImgOverlay: CardImgOverlay,
      CardLink: CardLink,
      CardSubtitle: CardSubtitle,
      CardTitle: CardTitle
    });
  }
});

//
var script$X = {
  name: 'radio-field',
  components: {
    HelpText: HelpText,
    FormFeedback: FormFeedback
  },
  mixins: [Colorable, FormControl, MergeClasses],
  model: {
    event: 'change',
    prop: 'checkedValue'
  },
  props: {
    /**
     * An array of event names that correlate with callback functions
     *
     * @property Function
     */
    bindEvents: {
      type: Array,
      default: function _default() {
        return ['focus', 'blur', 'input', 'click', 'keyup', 'keydown', 'progress'];
      }
    },

    /**
     * Is this a custom element
     *
     * @property String
     */
    custom: Boolean,

    /**
     * Display the form field and label inline
     *
     * @property Function
     */
    inline: Boolean,

    /**
     * The checked values
     *
     * @property String
     */
    checked: Boolean,

    /**
     * The checked value
     *
     * @property String
     */
    checkedValue: [Boolean, Number, String, Object],

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'form-check'
    }
  },
  computed: {
    labelClass: function labelClass() {
      return prefix('label', this.controlClass);
    },
    inputClass: function inputClass() {
      return prefix('input', this.controlClass);
    },
    inlineClass: function inlineClass() {
      return prefix('inline', this.controlClass);
    },
    controlClass: function controlClass() {
      return this.custom ? 'custom-control' : this.defaultControlClass;
    },
    customControlClass: function customControlClass() {
      return this.custom ? prefix(this.$options.name.replace('-field', ''), 'custom') : '';
    },
    sizeableClass: function sizeableClass() {
      return prefix(this.size, 'form-control');
    }
  }
};

/* script */
            const __vue_script__$W = script$X;
            
/* template */
var __vue_render__$P = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.mergeClasses(
        _vm.controlClass,
        _vm.customControlClass,
        _vm.sizeableClass,
        _vm.inline ? _vm.inlineClass : ""
      )
    },
    [
      _vm.custom && _vm.id
        ? [
            _c("input", {
              directives: [{ name: "bind-events", rawName: "v-bind-events" }],
              class: _vm.mergeClasses(
                _vm.inputClass,
                _vm.invalidFeedback ? "is-invalid" : ""
              ),
              attrs: {
                type: "radio",
                name: _vm.name,
                id: _vm.id,
                required: _vm.required,
                disabled: _vm.disabled || _vm.readonly,
                readonly: _vm.readonly,
                pattern: _vm.pattern
              },
              domProps: {
                value: _vm.value,
                checked: _vm.checkedValue === _vm.value || _vm.checked
              },
              on: {
                change: function($event) {
                  _vm.$emit("change", $event.target.value);
                }
              }
            }),
            _vm._v(" "),
            _c(
              "label",
              {
                class: _vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),
                attrs: { for: _vm.id }
              },
              [
                _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
                _vm._v(" "),
                _vm._t("feedback", [
                  _vm.validFeedback
                    ? _c("form-feedback", {
                        attrs: { valid: "" },
                        domProps: { innerHTML: _vm._s(_vm.validFeedback) }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.invalidFeedback
                    ? _c("form-feedback", {
                        attrs: { invalid: "" },
                        domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
                      })
                    : _vm._e()
                ])
              ],
              2
            )
          ]
        : [
            _c(
              "label",
              {
                class: _vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),
                attrs: { for: _vm.id }
              },
              [
                _c("input", {
                  directives: [
                    { name: "bind-events", rawName: "v-bind-events" }
                  ],
                  class: _vm.mergeClasses(
                    _vm.inputClass,
                    _vm.invalidFeedback ? "is-invalid" : ""
                  ),
                  attrs: {
                    type: "radio",
                    name: _vm.name,
                    id: _vm.id,
                    required: _vm.required,
                    disabled: _vm.disabled || _vm.readonly,
                    readonly: _vm.readonly,
                    pattern: _vm.pattern
                  },
                  domProps: {
                    value: _vm.value,
                    checked: _vm.checkedValue === _vm.value || _vm.checked
                  },
                  on: {
                    change: function($event) {
                      _vm.$emit("change", $event.target.value);
                    }
                  }
                }),
                _vm._v(" "),
                _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
                _vm._v(" "),
                _vm._t("feedback", [
                  _vm.validFeedback
                    ? _c("form-feedback", {
                        attrs: { valid: "" },
                        domProps: { innerHTML: _vm._s(_vm.validFeedback) }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.invalidFeedback
                    ? _c("form-feedback", {
                        attrs: { invalid: "" },
                        domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
                      })
                    : _vm._e()
                ])
              ],
              2
            )
          ],
      _vm._v(" "),
      _vm._t("help", [
        _vm.helpText
          ? _c("help-text", { domProps: { innerHTML: _vm._s(_vm.helpText) } })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$P = [];
__vue_render__$P._withStripped = true;

  /* style */
  const __vue_inject_styles__$W = undefined;
  /* scoped */
  const __vue_scope_id__$W = undefined;
  /* module identifier */
  const __vue_module_identifier__$W = undefined;
  /* functional template */
  const __vue_is_functional_template__$W = false;
  /* component normalizer */
  function __vue_normalize__$W(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/RadioField/RadioField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var RadioField = __vue_normalize__$W(
    { render: __vue_render__$P, staticRenderFns: __vue_staticRenderFns__$P },
    __vue_inject_styles__$W,
    __vue_script__$W,
    __vue_scope_id__$W,
    __vue_is_functional_template__$W,
    __vue_module_identifier__$W,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      RadioField: RadioField
    });
  }
});

//
var script$Y = {
  name: 'checkbox-field',
  extends: RadioField,
  mixins: [MergeClasses],
  model: {
    event: 'change',
    prop: 'checkedValues'
  },
  props: {
    /**
     * The checked values
     *
     * @property String
     */
    checkedValues: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  methods: {
    update: function update(value) {
      var checked = this.checkedValues.slice(0);
      var index = this.checkedValues.indexOf(value);

      if (index === -1) {
        checked.push(value);
      } else {
        checked.splice(index, 1);
      }

      this.$emit('change', checked);
    }
  }
};

/* script */
            const __vue_script__$X = script$Y;
            
/* template */
var __vue_render__$Q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.mergeClasses(
        _vm.controlClass,
        _vm.customControlClass,
        _vm.sizeableClass,
        _vm.inline ? _vm.inlineClass : ""
      )
    },
    [
      _vm.custom && _vm.id
        ? [
            _c("input", {
              directives: [{ name: "bind-events", rawName: "v-bind-events" }],
              class: _vm.mergeClasses(
                _vm.inputClass,
                _vm.invalidFeedback ? "is-invalid" : ""
              ),
              attrs: {
                type: "checkbox",
                name: _vm.name,
                id: _vm.id,
                required: _vm.required,
                disabled: _vm.disabled || _vm.readonly,
                readonly: _vm.readonly,
                pattern: _vm.pattern
              },
              domProps: {
                value: _vm.value,
                checked:
                  _vm.checkedValues.indexOf(_vm.value) !== -1 || _vm.checked
              },
              on: {
                change: function($event) {
                  _vm.update($event.target.value);
                }
              }
            }),
            _vm._v(" "),
            _c(
              "label",
              {
                class: _vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),
                attrs: { for: _vm.id }
              },
              [
                _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
                _vm._v(" "),
                _vm._t("feedback", [
                  _vm.validFeedback
                    ? _c("form-feedback", {
                        attrs: { valid: "" },
                        domProps: { innerHTML: _vm._s(_vm.validFeedback) }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.invalidFeedback
                    ? _c("form-feedback", {
                        attrs: { invalid: "" },
                        domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
                      })
                    : _vm._e()
                ])
              ],
              2
            )
          ]
        : [
            _c(
              "label",
              {
                class: _vm.mergeClasses(_vm.labelClass, _vm.colorableClasses),
                attrs: { for: _vm.id }
              },
              [
                _c("input", {
                  directives: [
                    { name: "bind-events", rawName: "v-bind-events" }
                  ],
                  class: _vm.mergeClasses(
                    _vm.inputClass,
                    _vm.invalidFeedback ? "is-invalid" : ""
                  ),
                  attrs: {
                    type: "checkbox",
                    name: _vm.name,
                    id: _vm.id,
                    required: _vm.required,
                    disabled: _vm.disabled || _vm.readonly,
                    readonly: _vm.readonly,
                    pattern: _vm.pattern
                  },
                  domProps: {
                    value: _vm.value,
                    checked:
                      _vm.checkedValues.indexOf(_vm.value) !== -1 || _vm.checked
                  },
                  on: {
                    change: function($event) {
                      _vm.update($event.target.value);
                    }
                  }
                }),
                _vm._v(" "),
                _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
                _vm._v(" "),
                _vm._t("feedback", [
                  _vm.validFeedback
                    ? _c("form-feedback", {
                        attrs: { valid: "" },
                        domProps: { innerHTML: _vm._s(_vm.validFeedback) }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.invalidFeedback
                    ? _c("form-feedback", {
                        attrs: { invalid: "" },
                        domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
                      })
                    : _vm._e()
                ])
              ],
              2
            )
          ],
      _vm._v(" "),
      _vm._t("help", [
        _vm.helpText
          ? _c("help-text", { domProps: { innerHTML: _vm._s(_vm.helpText) } })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$Q = [];
__vue_render__$Q._withStripped = true;

  /* style */
  const __vue_inject_styles__$X = undefined;
  /* scoped */
  const __vue_scope_id__$X = undefined;
  /* module identifier */
  const __vue_module_identifier__$X = undefined;
  /* functional template */
  const __vue_is_functional_template__$X = false;
  /* component normalizer */
  function __vue_normalize__$X(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/CheckboxField/CheckboxField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var CheckboxField = __vue_normalize__$X(
    { render: __vue_render__$Q, staticRenderFns: __vue_staticRenderFns__$Q },
    __vue_inject_styles__$X,
    __vue_script__$X,
    __vue_scope_id__$X,
    __vue_is_functional_template__$X,
    __vue_module_identifier__$X,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      CheckboxField: CheckboxField
    });
  }
});

//
var script$Z = {
  name: 'dropzone',
  components: {
    Card: Card,
    CardBody: CardBody
  },
  methods: {
    onDrop: function onDrop(event) {
      this.isDragging = false;
      this.$emit('drop', event);
    },
    onDragover: function onDragover(event) {
      this.isDragging = true;
      this.$emit('dragover', event);
    },
    onDragenter: function onDragenter(event) {
      this.isDragging = true;
      this.$emit('dragenter', event);
      this.onDragover(event);
    },
    onDragleave: function onDragleave(event) {
      this.isDragging = false;
      this.$emit('dragleave', event);
    }
  },
  data: function data() {
    return {
      files: null,
      isDragging: false
    };
  }
};

/* script */
            const __vue_script__$Y = script$Z;
/* template */
var __vue_render__$R = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "dropzone",
      class: { "is-dragging": _vm.isDragging },
      on: {
        drop: function($event) {
          $event.preventDefault();
          return _vm.onDrop($event)
        },
        dragover: function($event) {
          $event.preventDefault();
          return _vm.onDragover($event)
        },
        dragenter: function($event) {
          $event.preventDefault();
          return _vm.onDragenter($event)
        },
        dragleave: function($event) {
          $event.preventDefault();
          return _vm.onDragleave($event)
        }
      }
    },
    [
      _vm._t("placeholder", [
        _c(
          "div",
          { staticClass: "dropzone-placeholder text-center" },
          [
            _c(
              "card",
              [
                _c("card-body", [
                  _c("h1", { staticClass: "mt-4" }, [_vm._v("Drag & Drop")]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v("Drag and drop your files here to upload them!")
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mt-3" }, [
                    _c("i", { staticClass: "fa fa-image" })
                  ])
                ])
              ],
              1
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$R = [];
__vue_render__$R._withStripped = true;

  /* style */
  const __vue_inject_styles__$Y = undefined;
  /* scoped */
  const __vue_scope_id__$Y = undefined;
  /* module identifier */
  const __vue_module_identifier__$Y = undefined;
  /* functional template */
  const __vue_is_functional_template__$Y = false;
  /* component normalizer */
  function __vue_normalize__$Y(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Dropzone/Dropzone.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Dropzone = __vue_normalize__$Y(
    { render: __vue_render__$R, staticRenderFns: __vue_staticRenderFns__$R },
    __vue_inject_styles__$Y,
    __vue_script__$Y,
    __vue_scope_id__$Y,
    __vue_is_functional_template__$Y,
    __vue_module_identifier__$Y,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Dropzone: Dropzone
    });
  }
});

function readFile(file, progress) {
  if (!(file instanceof File)) {
    throw new Error('The first argument be an instance of File object.');
  }

  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    if (isFunction(progress)) {
      reader.onprogress = function (e) {
        return progress(e, reader);
      };
    }

    reader.onload = function (e) {
      return resolve(e);
    };

    reader.onerror = function (e) {
      return reject(e);
    };

    reader.onabort = function (e) {
      return reject(e);
    };

    reader.readAsDataURL(file);
  });
}

//
var script$_ = {
  name: 'file-preview',
  components: {
    ProgressBar: ProgressBar
  },
  directives: {
    ready: {
      inserted: function inserted(el, binding, vnode) {
        if (isFunction(binding.value)) {
          vnode.context.$nextTick(binding.value);
        }
      }
    }
  },
  props: {
    /**
     * Hide the close button for the preview
     *
     * @property Object
     */
    hideClose: Boolean,

    /**
     * The uploaded File object
     *
     * @property Object
     */
    file: {
      type: [Object, File],
      required: true
    },

    /**
     * An image URL to instead of using the file reader.
     * @property {String}
     */
    poster: String,

    /**
     * Progress that can be passed from a parent comparent, for instance
     * use to show an ajax request with a single progress bar. If a progress
     * value is passed, even a 0, the progress bar will not be used to show
     * the progress of the file reader.
     * @property {Number}
     */
    progress: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    /**
     * Get the file name
     *
     * @property String
     */
    name: function name() {
      return this.file instanceof File ? this.file.name : this.file.orig_filename;
    },

    /**
     * Get the file extension
     *
     * @property String
     */
    extension: function extension() {
      return this.file instanceof File ? this.file.name.split('.').pop().toLowerCase() : this.file.extension;
    },

    /**
     * Get the file formatted size
     *
     * @property String
     */
    size: function size() {
      return this.bytesToSize(this.file.size);
    },

    /**
     * Get the file type
     *
     * @property String
     */
    type: function type() {
      return this.file instanceof File ? this.file.type : this.file.mime;
    },

    /**
     * Check to see if the file is an image.
     *
     * @property String
     */
    isImage: function isImage() {
      return !!this.type.match(/^image/);
    },

    /**
     * Check to see if the file is a video.
     *
     * @property String
     */
    isVideo: function isVideo() {
      return !!this.type.match(/^video/);
    },

    /**
     * Get the last time the file was modified (as timestamp)
     *
     * @property String
     */
    lastModified: function lastModified() {
      return this.file instanceof File ? this.file.lastModified : null;
    },

    /**
     * Get the last time the file was modified (as Date)
     *
     * @property String
     */
    lastModifiedDate: function lastModifiedDate() {
      return this.file instanceof File ? this.file.lastModifiedDate : null;
    }
  },
  methods: {
    readFile: function readFile$$1() {
      var _this = this;

      if (this.file instanceof File) {
        var start = moment();
        this.loaded = 0;
        this.$nextTick(function () {
          readFile(_this.file, function (e) {
            if (e.lengthComputable) {
              _this.$emit('progress', _this.loaded = parseInt(e.loaded / e.total * 100, 10));
            }
          }).then(function (event) {
            _this.$emit('read', event);

            setTimeout(function () {
              _this.image = event.target.result;

              _this.$nextTick(function () {
                _this.loaded = false;
              });
            }, 500 - moment().diff(start));
          }, function (error) {
            _this.$emit('error', error);
          });
        });
      }
    },
    bytesToSize: function bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    onLoad: function onLoad(event) {
      this.$emit('loaded');
    }
  },
  data: function data() {
    return {
      image: this.file.url,
      loaded: this.file instanceof File ? 0 : false
    };
  }
};

/* script */
            const __vue_script__$Z = script$_;
/* template */
var __vue_render__$S = function() {
  var this$1 = this;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "file-preview", class: { "has-image": !!_vm.image } },
    [
      _c(
        "div",
        { staticClass: "file-preview-inner" },
        [
          !_vm.hideClose
            ? _c(
                "a",
                {
                  staticClass: "file-preview-close",
                  attrs: { href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault();
                      _vm.$emit("close", _vm.file);
                    }
                  }
                },
                [_c("i", { staticClass: "fa fa-times-circle" })]
              )
            : _vm._e(),
          _vm._v(" "),
          !!_vm.poster || _vm.isImage
            ? _c("div", { staticClass: "file-preview-image" }, [
                !!_vm.poster || !!_vm.image
                  ? _c("img", {
                      staticClass: "file-preview-thumbnail",
                      attrs: { src: _vm.poster || _vm.image },
                      on: { load: _vm.onLoad }
                    })
                  : _vm._e()
              ])
            : _c(
                "div",
                {
                  directives: [
                    {
                      name: "ready",
                      rawName: "v-ready",
                      value: function() {
                        return this$1.$emit("loaded")
                      },
                      expression: "() => this.$emit('loaded')"
                    }
                  ],
                  staticClass: "file-preview-icon"
                },
                [
                  _c("i", {
                    staticClass: "fa",
                    class: {
                      "fa-file-video-o": _vm.isVideo,
                      "fa-file-o": !_vm.isVideo
                    }
                  })
                ]
              ),
          _vm._v(" "),
          _vm.progress || (_vm.isImage && _vm.loaded !== false)
            ? _c("progress-bar", {
                directives: [
                  {
                    name: "ready",
                    rawName: "v-ready",
                    value: _vm.readFile,
                    expression: "readFile"
                  }
                ],
                staticClass: "mt-3",
                attrs: { value: _vm.progress || _vm.loaded || 0, height: 10 }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("div", {
            staticClass: "file-preview-filename",
            domProps: { innerHTML: _vm._s(_vm.name) }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "file-preview-filesize" }, [
            _vm._v("(" + _vm._s(_vm.size) + ")")
          ])
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$S = [];
__vue_render__$S._withStripped = true;

  /* style */
  const __vue_inject_styles__$Z = undefined;
  /* scoped */
  const __vue_scope_id__$Z = undefined;
  /* module identifier */
  const __vue_module_identifier__$Z = undefined;
  /* functional template */
  const __vue_is_functional_template__$Z = false;
  /* component normalizer */
  function __vue_normalize__$Z(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/FilePreview/FilePreview.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var FilePreview = __vue_normalize__$Z(
    { render: __vue_render__$S, staticRenderFns: __vue_staticRenderFns__$S },
    __vue_inject_styles__$Z,
    __vue_script__$Z,
    __vue_scope_id__$Z,
    __vue_is_functional_template__$Z,
    __vue_module_identifier__$Z,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FilePreview: FilePreview
    });
  }
});

//
var script$10 = {
  name: 'form-control',
  mixins: [Colorable, FormControl, MergeClasses],
  props: {
    /**
     * Is the element a select?
     *
     * @property String
     */
    select: Boolean,

    /**
     * The type attribute
     *
     * @property String
     */
    type: {
      type: String,
      default: 'text'
    }
  }
};

/* script */
            const __vue_script__$_ = script$10;
            
/* template */
var __vue_render__$T = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(!_vm.select ? "input" : "select", {
    directives: [
      {
        name: "bind-events",
        rawName: "v-bind-events",
        value: _vm.bindEvents,
        expression: "bindEvents"
      }
    ],
    tag: "component",
    class: _vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),
    attrs: {
      name: _vm.name,
      id: _vm.id,
      type: !_vm.select ? _vm.type : false,
      value: _vm.value,
      pattern: _vm.pattern,
      required: _vm.required,
      readonly: _vm.readonly,
      placeholder: _vm.placeholder,
      disabled: _vm.disabled || _vm.readonly,
      "aria-label": _vm.label,
      "aria-describedby": _vm.id
    }
  })
};
var __vue_staticRenderFns__$T = [];
__vue_render__$T._withStripped = true;

  /* style */
  const __vue_inject_styles__$_ = undefined;
  /* scoped */
  const __vue_scope_id__$_ = undefined;
  /* module identifier */
  const __vue_module_identifier__$_ = undefined;
  /* functional template */
  const __vue_is_functional_template__$_ = false;
  /* component normalizer */
  function __vue_normalize__$_(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/FormControl/FormControl.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormControl$1 = __vue_normalize__$_(
    { render: __vue_render__$T, staticRenderFns: __vue_staticRenderFns__$T },
    __vue_inject_styles__$_,
    __vue_script__$_,
    __vue_scope_id__$_,
    __vue_is_functional_template__$_,
    __vue_module_identifier__$_,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormControl: FormControl$1
    });
  }
});

//
var script$11 = {
  name: 'infinite-scrolling',
  components: {
    ActivityIndicator: ActivityIndicator
  },
  props: {
    /**
     * Is the activity indicator showing
     *
     * @property String
     */
    activity: Boolean,

    /**
     * The activity indicator background style
     *
     * @property String
     */
    background: String,

    /**
     * The activity indicator size
     *
     * @property String
     */
    height: {
      type: Number,
      default: 100
    },

    /**
     * The activity indicator size
     *
     * @property String
     */
    size: String,

    /**
     * The activity indicator type
     *
     * @property String
     */
    type: String,

    /**
     * The scroll observer threshold for when an element is considered
     * into view. Must be a validate between 0 and 1, and is a percentage.
     *
     * @property Number
     */
    threshold: {
      type: Number,
      default: 0.75,
      validate: function validate(value) {
        return value >= 0 && value <= 1;
      }
    }
  },
  methods: {
    scrollIntoViewport: function scrollIntoViewport(entry) {
      this.$emit('scroll:in', entry);

      if (!this.activity) {
        this.$emit('load', entry);
      }
    },
    scrollOutViewport: function scrollOutViewport(entry) {
      this.$emit('scroll:out', entry);
    }
  },
  computed: {
    heightUnit: function heightUnit() {
      return unit(this.height);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !_this.hasScrolledIntoViewport) {
            _this.scrollIntoViewport(entry, observer);

            _this.hasScrolledIntoViewport = true;
          } else if (_this.hasScrolledIntoViewport) {
            _this.scrollOutViewport(entry, observer);

            _this.hasScrolledIntoViewport = false;
          }
        });
      }, {
        threshold: _this.threshold
      }).observe(_this.$el);
    });
  },
  data: function data() {
    return {
      hasScrolledIntoViewport: false
    };
  }
};

/* script */
            const __vue_script__$10 = script$11;
/* template */
var __vue_render__$U = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "infinite-scrolling",
      style: { height: _vm.heightUnit, background: _vm.background }
    },
    [
      _vm.activity
        ? _c("activity-indicator", {
            attrs: { size: _vm.size, type: _vm.type, center: "" }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$U = [];
__vue_render__$U._withStripped = true;

  /* style */
  const __vue_inject_styles__$10 = undefined;
  /* scoped */
  const __vue_scope_id__$10 = undefined;
  /* module identifier */
  const __vue_module_identifier__$10 = undefined;
  /* functional template */
  const __vue_is_functional_template__$10 = false;
  /* component normalizer */
  function __vue_normalize__$10(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/InfiniteScrolling/InfiniteScrolling.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var InfiniteScrolling = __vue_normalize__$10(
    { render: __vue_render__$U, staticRenderFns: __vue_staticRenderFns__$U },
    __vue_inject_styles__$10,
    __vue_script__$10,
    __vue_scope_id__$10,
    __vue_is_functional_template__$10,
    __vue_module_identifier__$10,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
var script$12 = {
  name: 'input-group-text',
  props: {
    /**
     * The id attribute
     *
     * @property String
     */
    id: String,

    /**
     * The type attribute
     *
     * @property String
     */
    text: [Array, Number, String]
  }
};

/* script */
            const __vue_script__$11 = script$12;
            
/* template */
var __vue_render__$V = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    { staticClass: "input-group-text", attrs: { id: _vm.id } },
    [_vm._t("default", [_vm._v(_vm._s(_vm.text))])],
    2
  )
};
var __vue_staticRenderFns__$V = [];
__vue_render__$V._withStripped = true;

  /* style */
  const __vue_inject_styles__$11 = undefined;
  /* scoped */
  const __vue_scope_id__$11 = undefined;
  /* module identifier */
  const __vue_module_identifier__$11 = undefined;
  /* functional template */
  const __vue_is_functional_template__$11 = false;
  /* component normalizer */
  function __vue_normalize__$11(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/InputGroup/InputGroupText.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var InputGroupText = __vue_normalize__$11(
    { render: __vue_render__$V, staticRenderFns: __vue_staticRenderFns__$V },
    __vue_inject_styles__$11,
    __vue_script__$11,
    __vue_scope_id__$11,
    __vue_is_functional_template__$11,
    __vue_module_identifier__$11,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
var script$13 = {
  name: 'input-group-append',
  props: {
    /**
     * The type attribute
     *
     * @property String
     */
    text: Boolean
  }
};

/* script */
            const __vue_script__$12 = script$13;
            
/* template */
var __vue_render__$W = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "input-group-append" },
    [
      _vm.text
        ? _c("input-group-text", [_vm._t("default")], 2)
        : _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$W = [];
__vue_render__$W._withStripped = true;

  /* style */
  const __vue_inject_styles__$12 = undefined;
  /* scoped */
  const __vue_scope_id__$12 = undefined;
  /* module identifier */
  const __vue_module_identifier__$12 = undefined;
  /* functional template */
  const __vue_is_functional_template__$12 = false;
  /* component normalizer */
  function __vue_normalize__$12(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/InputGroup/InputGroupAppend.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var InputGroupAppend = __vue_normalize__$12(
    { render: __vue_render__$W, staticRenderFns: __vue_staticRenderFns__$W },
    __vue_inject_styles__$12,
    __vue_script__$12,
    __vue_scope_id__$12,
    __vue_is_functional_template__$12,
    __vue_module_identifier__$12,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
var script$14 = {
  name: 'input-group-prepend',
  props: {
    /**
     * The type attribute
     *
     * @property String
     */
    text: Boolean
  }
};

/* script */
            const __vue_script__$13 = script$14;
            
/* template */
var __vue_render__$X = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "input-group-prepend" },
    [
      _vm.text
        ? _c("input-group-text", [_vm._t("default")], 2)
        : _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$X = [];
__vue_render__$X._withStripped = true;

  /* style */
  const __vue_inject_styles__$13 = undefined;
  /* scoped */
  const __vue_scope_id__$13 = undefined;
  /* module identifier */
  const __vue_module_identifier__$13 = undefined;
  /* functional template */
  const __vue_is_functional_template__$13 = false;
  /* component normalizer */
  function __vue_normalize__$13(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/InputGroup/InputGroupPrepend.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var InputGroupPrepend = __vue_normalize__$13(
    { render: __vue_render__$X, staticRenderFns: __vue_staticRenderFns__$X },
    __vue_inject_styles__$13,
    __vue_script__$13,
    __vue_scope_id__$13,
    __vue_is_functional_template__$13,
    __vue_module_identifier__$13,
    undefined,
    undefined
  );

//
var script$15 = {
  name: 'input-group',
  components: {
    InputGroupText: InputGroupText,
    InputGroupAppend: InputGroupAppend,
    InputGroupPrepend: InputGroupPrepend
  },
  mixins: [HasSlots, Sizeable, Colorable, MergeClasses],
  props: {
    append: [Array, Number, String],
    prepend: [Array, Number, String]
  }
};

/* script */
            const __vue_script__$14 = script$15;
            
/* template */
var __vue_render__$Y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "input-group",
      class: _vm.mergeClasses(_vm.colorableClasses, _vm.sizeableClass)
    },
    [
      _vm._t("prepend", [
        _vm.prepend instanceof Array
          ? [
              _c(
                "input-group-prepend",
                _vm._l(_vm.prepend, function(value) {
                  return _c("input-group-text", {
                    key: value,
                    attrs: { text: value }
                  })
                })
              )
            ]
          : _vm.prepend
            ? [
                _c("input-group-prepend", { attrs: { text: "" } }, [
                  _vm._v(_vm._s(_vm.prepend))
                ])
              ]
            : _vm._e()
      ]),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _vm._t("append", [
        _vm.append instanceof Array
          ? [
              _c(
                "input-group-append",
                _vm._l(_vm.append, function(value) {
                  return _c("input-group-text", {
                    key: value,
                    attrs: { text: value }
                  })
                })
              )
            ]
          : _vm.append
            ? [
                _c("input-group-append", { attrs: { text: "" } }, [
                  _vm._v(_vm._s(_vm.append))
                ])
              ]
            : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$Y = [];
__vue_render__$Y._withStripped = true;

  /* style */
  const __vue_inject_styles__$14 = undefined;
  /* scoped */
  const __vue_scope_id__$14 = undefined;
  /* module identifier */
  const __vue_module_identifier__$14 = undefined;
  /* functional template */
  const __vue_is_functional_template__$14 = false;
  /* component normalizer */
  function __vue_normalize__$14(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/InputGroup/InputGroup.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var InputGroup = __vue_normalize__$14(
    { render: __vue_render__$Y, staticRenderFns: __vue_staticRenderFns__$Y },
    __vue_inject_styles__$14,
    __vue_script__$14,
    __vue_scope_id__$14,
    __vue_is_functional_template__$14,
    __vue_module_identifier__$14,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      InputGroup: InputGroup,
      InputGroupAppend: InputGroupAppend,
      InputGroupPrepend: InputGroupPrepend,
      InputGroupText: InputGroupText
    });
  }
});

//
var script$16 = {
  name: 'light-switch-field',
  components: {
    HelpText: HelpText,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    FormControl: FormControl$1,
    FormFeedback: FormFeedback
  },
  mixins: [FormControl],
  props: {
    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'form-control light-switch'
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    activeClass: {
      type: String,
      default: 'on'
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    onValue: {
      default: 1
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    offValue: {
      default: 0
    }
  },
  computed: {
    isActive: function isActive() {
      return this.value === this.onValue;
    },
    controlClasses: function controlClasses() {
      return [this.controlClass, this.controlSizeClass, this.spacing || '', this.invalidFeedback ? 'is-invalid' : '', this.dragging ? 'is-dragging' : '', this.isActive ? 'is-active' : ''].join(' ');
    }
  },
  methods: {
    getTransitionInMilliseconds: function getTransitionInMilliseconds() {
      var duration = getComputedStyle(this.$el.querySelector('.light-switch-handle')).transitionDuration;
      var numeric = parseFloat(duration, 10);
      var unit = duration.match(/m?s/);

      switch (unit[0]) {
        case 's':
          return numeric * 1000;

        case 'ms':
          return numeric;
      }

      throw new Error("\"".concat(unit[0], "\" is not a valid unit of measure. Unit must be \"s\" (seconds) or \"ms\" (milliseconds)."));
    },
    toggle: function toggle(value) {
      this.$emit('input', !isUndefined(value) ? value : this.isActive ? this.offValue : this.onValue);
    }
  },
  watch: {
    value: function value() {
      var _this = this;

      this.dragging = true;
      setTimeout(function () {
        _this.dragging = false;
      }, this.getTransitionInMilliseconds());
    }
  },
  data: function data() {
    return {
      dragging: false
    };
  }
};

/* script */
            const __vue_script__$15 = script$16;
/* template */
var __vue_render__$Z = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form-group",
    [
      _vm._t("label", [
        _vm.label
          ? _c("form-label", {
              attrs: { for: _vm.id },
              domProps: { innerHTML: _vm._s(_vm.label) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          class: _vm.controlClasses,
          attrs: { tabindex: "0" },
          on: {
            click: function($event) {
              _vm.toggle();
            },
            keyup: [
              function($event) {
                if (!("button" in $event) && $event.keyCode !== 32) {
                  return null
                }
                _vm.toggle();
              },
              function($event) {
                if (!("button" in $event) && $event.keyCode !== 37) {
                  return null
                }
                _vm.toggle(_vm.offValue);
              },
              function($event) {
                if (!("button" in $event) && $event.keyCode !== 39) {
                  return null
                }
                _vm.toggle(_vm.onValue);
              }
            ]
          }
        },
        [
          _c("div", { staticClass: "light-switch-handle" }),
          _vm._v(" "),
          _c("div", { staticClass: "light-switch-container" }, [
            _c("div", { staticClass: "light-switch-label on-value" }),
            _vm._v(" "),
            _c("div", { staticClass: "light-switch-label off-value" })
          ])
        ]
      ),
      _vm._v(" "),
      _c("form-control", {
        staticClass: "d-none",
        attrs: { name: _vm.name, value: _vm.value, id: _vm.id }
      }),
      _vm._v(" "),
      _vm._t("feedback", [
        _vm.validFeedback
          ? _c("form-feedback", {
              attrs: { valid: "" },
              domProps: { innerHTML: _vm._s(_vm.validFeedback) }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.invalidFeedback
          ? _c("form-feedback", {
              attrs: { invalid: "" },
              domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm._t("help", [
        _vm.helpText
          ? _c("help-text", { domProps: { innerHTML: _vm._s(_vm.helpText) } })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$Z = [];
__vue_render__$Z._withStripped = true;

  /* style */
  const __vue_inject_styles__$15 = undefined;
  /* scoped */
  const __vue_scope_id__$15 = undefined;
  /* module identifier */
  const __vue_module_identifier__$15 = undefined;
  /* functional template */
  const __vue_is_functional_template__$15 = false;
  /* component normalizer */
  function __vue_normalize__$15(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/LightSwitchField/LightSwitchField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var LightSwitchField = __vue_normalize__$15(
    { render: __vue_render__$Z, staticRenderFns: __vue_staticRenderFns__$Z },
    __vue_inject_styles__$15,
    __vue_script__$15,
    __vue_scope_id__$15,
    __vue_is_functional_template__$15,
    __vue_module_identifier__$15,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      LightSwitchField: LightSwitchField
    });
  }
});

//
var script$17 = {
  components: {
    Badge: Badge
  },
  props: {
    /**
     * The badge label (if number or string) or object of options to pass to
     * the component.
     *
     * @property String|Object
     */
    badge: [Number, String, Object],

    /**
     * The list group item href attribute.
     *
     * @property String
     */
    href: String,

    /**
     * The list group item variant.
     *
     * @property String
     */
    variant: String,

    /**
     * Optionally pass the item as a object to use programmatically later.
     *
     * @property String
     */
    item: Object,

    /**
     * The list group item an action, or clickable item.
     *
     * @property Boolean
     */
    action: {
      type: Boolean,
      default: false
    },

    /**
     * The list group item active.
     *
     * @property Boolean
     */
    active: {
      type: Boolean,
      default: false
    },

    /**
     * The list group item disabled.
     *
     * @property Boolean
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * The list item label.
     *
     * @property Object
     */
    label: {
      type: [Number, String],
      value: null
    },

    /**
     * The to attribute to be passed to a <router-link> component.
     *
     * @property String
     */
    to: [String, Object]
  },
  computed: {
    classes: function classes() {
      var classes = prefix({
        'action': this.action
      }, 'list-group-item');
      classes['list-group-item'] = true;
      classes['active'] = this.active;
      classes['disabled'] = this.disabled;

      if (this.variant) {
        classes[prefix(this.variant, 'list-group-item')] = true;
      }

      return classes;
    },
    badgeOptions: function badgeOptions() {
      return isObject(this.badge) ? this.badge : {
        label: this.badge
      };
    }
  },
  watch: {
    active: function active(value, prevValue) {
      this.$emit('toggle', value);
      this.$emit(value ? 'activate' : 'deactivate');
    }
  }
};

/* script */
            const __vue_script__$16 = script$17;
            
/* template */
var __vue_render__$_ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.to
    ? _c(
        "router-link",
        {
          class: _vm.classes,
          attrs: { to: _vm.to },
          on: {
            click: function($event) {
              _vm.$emit("click", $event);
            }
          }
        },
        [
          _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
          _vm._v(" "),
          _vm.badge
            ? _c("badge", _vm._b({}, "badge", _vm.badgeOptions, false))
            : _vm._e()
        ],
        2
      )
    : _vm.href
      ? _c(
          "a",
          {
            class: _vm.classes,
            attrs: { href: _vm.href },
            on: {
              click: function($event) {
                _vm.$emit("click", $event);
              }
            }
          },
          [
            _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
            _vm._v(" "),
            _vm.badge
              ? _c("badge", _vm._b({}, "badge", _vm.badgeOptions, false))
              : _vm._e()
          ],
          2
        )
      : _vm.action
        ? _c(
            "button",
            {
              class: _vm.classes,
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  _vm.$emit("click", $event);
                }
              }
            },
            [
              _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
              _vm._v(" "),
              _vm.badge
                ? _c("badge", _vm._b({}, "badge", _vm.badgeOptions, false))
                : _vm._e()
            ],
            2
          )
        : _c(
            "div",
            {
              class: _vm.classes,
              on: {
                click: function($event) {
                  _vm.$emit("click", $event);
                }
              }
            },
            [
              _vm._t("default", [_vm._v(_vm._s(_vm.label))]),
              _vm._v(" "),
              _vm.badge
                ? _c("badge", _vm._b({}, "badge", _vm.badgeOptions, false))
                : _vm._e()
            ],
            2
          )
};
var __vue_staticRenderFns__$_ = [];
__vue_render__$_._withStripped = true;

  /* style */
  const __vue_inject_styles__$16 = undefined;
  /* scoped */
  const __vue_scope_id__$16 = undefined;
  /* module identifier */
  const __vue_module_identifier__$16 = undefined;
  /* functional template */
  const __vue_is_functional_template__$16 = false;
  /* component normalizer */
  function __vue_normalize__$16(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ListGroup/ListGroupItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ListGroupItem = __vue_normalize__$16(
    { render: __vue_render__$_, staticRenderFns: __vue_staticRenderFns__$_ },
    __vue_inject_styles__$16,
    __vue_script__$16,
    __vue_scope_id__$16,
    __vue_is_functional_template__$16,
    __vue_module_identifier__$16,
    undefined,
    undefined
  );

//
var script$18 = {
  components: {
    ListGroupItem: ListGroupItem
  },
  props: {
    /**
     * The list group appear flush (without some borders).
     *
     * @property Boolean
     */
    flush: {
      type: Boolean,
      default: false
    },

    /**
     * Can activate multiple list items
     *
     * @property Boolean
     */
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function classes() {
      return prefix({
        'flush': this.flush
      }, 'list-group');
    }
  },
  methods: {
    bindEventsToChildren: function bindEventsToChildren() {
      var _this = this;

      each(this.$children, function (child) {
        child.$off('click', function (event) {
          return _this.onClickItem(event, child);
        });
        child.$on('click', function (event) {
          return _this.onClickItem(event, child);
        });
      });
    },

    /**
     * The callback function for the `click` event.
     *
     * @return void
     */
    onClick: function onClick(event) {
      this.$emit('click', event);
    },

    /**
     * The callback function for the child `click` events.
     *
     * @return void
     */
    onClickItem: function onClickItem(event, child) {
      this.$emit('item:click', event, child);
    }
  },
  mounted: function mounted() {
    this.bindEventsToChildren();
  },
  updated: function updated() {
    this.bindEventsToChildren();
  }
};

/* script */
            const __vue_script__$17 = script$18;
            
/* template */
var __vue_render__$10 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "list-group", class: _vm.classes },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$10 = [];
__vue_render__$10._withStripped = true;

  /* style */
  const __vue_inject_styles__$17 = undefined;
  /* scoped */
  const __vue_scope_id__$17 = undefined;
  /* module identifier */
  const __vue_module_identifier__$17 = undefined;
  /* functional template */
  const __vue_is_functional_template__$17 = false;
  /* component normalizer */
  function __vue_normalize__$17(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ListGroup/ListGroup.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ListGroup = __vue_normalize__$17(
    { render: __vue_render__$10, staticRenderFns: __vue_staticRenderFns__$10 },
    __vue_inject_styles__$17,
    __vue_script__$17,
    __vue_scope_id__$17,
    __vue_is_functional_template__$17,
    __vue_module_identifier__$17,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ListGroup: ListGroup
    });
  }
});

//
var script$19 = {
  props: {
    /**
     * The img `alt` attribute. `src` must be define before this prop has
     * any affect.
     *
     * @property Object
     */
    alt: String,

    /**
     * The HTML wrapping tag.
     *
     * @property Object
     */
    tag: String,

    /**
     * The img `width` attribute. `src` must be define before this prop has
     * any affect.
     *
     * @property Object
     */
    width: [Number, String],

    /**
     * The img `height` attribute. `src` must be define before this prop has
     * any affect.
     *
     * @property Object
     */
    height: [Number, String],

    /**
     * The `to` attribute that is passed to the component.
     *
     * @property Object
     */
    to: [Object, String],

    /**
     * The `href` attribute that is passed to the component.
     *
     * @property Object
     */
    href: String,

    /**
     * Append the `h1` class to increase the display size
     *
     * @property Object
     */
    h1: Boolean,

    /**
     * If a `src` attribute is passed, then use it to add an img tag
     *
     * @property Object
     */
    src: String
  },
  computed: {
    component: function component() {
      return this.tag || (this.to ? 'router-link' : this.href ? 'a' : 'span');
    }
  },
  methods: {
    unit: function unit$$1(value) {
      return unit(value);
    }
  }
};

/* script */
            const __vue_script__$18 = script$19;
            
/* template */
var __vue_render__$11 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.component,
    {
      tag: "component",
      staticClass: "navbar-brand",
      class: { h1: _vm.h1 },
      attrs: { to: _vm.to, href: _vm.href || _vm.to ? "#" : null }
    },
    [
      _vm.src
        ? _c("img", {
            staticClass: "d-inline-block align-center",
            attrs: {
              src: _vm.src,
              width: _vm.unit(_vm.width),
              height: _vm.unit(_vm.height),
              alt: _vm.alt
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$11 = [];
__vue_render__$11._withStripped = true;

  /* style */
  const __vue_inject_styles__$18 = undefined;
  /* scoped */
  const __vue_scope_id__$18 = undefined;
  /* module identifier */
  const __vue_module_identifier__$18 = undefined;
  /* functional template */
  const __vue_is_functional_template__$18 = false;
  /* component normalizer */
  function __vue_normalize__$18(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navbar/NavbarBrand.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavbarBrand = __vue_normalize__$18(
    { render: __vue_render__$11, staticRenderFns: __vue_staticRenderFns__$11 },
    __vue_inject_styles__$18,
    __vue_script__$18,
    __vue_scope_id__$18,
    __vue_is_functional_template__$18,
    __vue_module_identifier__$18,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$1a = {
  name: 'navbar-collapse',
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  }
};

/* script */
            const __vue_script__$19 = script$1a;
            
/* template */
var __vue_render__$12 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "navbar-collapse",
      class: { collapse: _vm.collapse },
      attrs: { id: "navbarCollapse" }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$12 = [];
__vue_render__$12._withStripped = true;

  /* style */
  const __vue_inject_styles__$19 = undefined;
  /* scoped */
  const __vue_scope_id__$19 = undefined;
  /* module identifier */
  const __vue_module_identifier__$19 = undefined;
  /* functional template */
  const __vue_is_functional_template__$19 = false;
  /* component normalizer */
  function __vue_normalize__$19(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navbar/NavbarCollapse.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavbarCollapse = __vue_normalize__$19(
    { render: __vue_render__$12, staticRenderFns: __vue_staticRenderFns__$12 },
    __vue_inject_styles__$19,
    __vue_script__$19,
    __vue_scope_id__$19,
    __vue_is_functional_template__$19,
    __vue_module_identifier__$19,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$1b = {
  name: 'navbar-text'
};

/* script */
            const __vue_script__$1a = script$1b;
            
/* template */
var __vue_render__$13 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "navbar-text" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$13 = [];
__vue_render__$13._withStripped = true;

  /* style */
  const __vue_inject_styles__$1a = undefined;
  /* scoped */
  const __vue_scope_id__$1a = undefined;
  /* module identifier */
  const __vue_module_identifier__$1a = undefined;
  /* functional template */
  const __vue_is_functional_template__$1a = false;
  /* component normalizer */
  function __vue_normalize__$1a(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navbar/NavbarText.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavbarText = __vue_normalize__$1a(
    { render: __vue_render__$13, staticRenderFns: __vue_staticRenderFns__$13 },
    __vue_inject_styles__$1a,
    __vue_script__$1a,
    __vue_scope_id__$1a,
    __vue_is_functional_template__$1a,
    __vue_module_identifier__$1a,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$1c = {
  name: 'navbar-toggler-icon'
};

/* script */
            const __vue_script__$1b = script$1c;
            
/* template */
var __vue_render__$14 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    { staticClass: "navbar-toggler-icon" },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$14 = [];
__vue_render__$14._withStripped = true;

  /* style */
  const __vue_inject_styles__$1b = undefined;
  /* scoped */
  const __vue_scope_id__$1b = undefined;
  /* module identifier */
  const __vue_module_identifier__$1b = undefined;
  /* functional template */
  const __vue_is_functional_template__$1b = false;
  /* component normalizer */
  function __vue_normalize__$1b(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navbar/NavbarTogglerIcon.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavbarTogglerIcon = __vue_normalize__$1b(
    { render: __vue_render__$14, staticRenderFns: __vue_staticRenderFns__$14 },
    __vue_inject_styles__$1b,
    __vue_script__$1b,
    __vue_scope_id__$1b,
    __vue_is_functional_template__$1b,
    __vue_module_identifier__$1b,
    undefined,
    undefined
  );

//
var script$1d = {
  name: 'navbar-toggler',
  components: {
    NavbarTogglerIcon: NavbarTogglerIcon
  },
  props: {
    expanded: Boolean,
    label: {
      type: String,
      default: 'Toggle navigation'
    },
    target: {
      type: String,
      default: '.navbar-collapse'
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
};

/* script */
            const __vue_script__$1c = script$1d;
            
/* template */
var __vue_render__$15 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      staticClass: "navbar-toggler",
      attrs: {
        type: "button",
        "data-toggle": "collapse",
        "data-target": _vm.target,
        "aria-controls": _vm.target,
        "aria-expanded": _vm.expanded,
        "aria-label": _vm.label
      },
      on: { click: _vm.onClick }
    },
    [_vm._t("default", [_c("navbar-toggler-icon")])],
    2
  )
};
var __vue_staticRenderFns__$15 = [];
__vue_render__$15._withStripped = true;

  /* style */
  const __vue_inject_styles__$1c = undefined;
  /* scoped */
  const __vue_scope_id__$1c = undefined;
  /* module identifier */
  const __vue_module_identifier__$1c = undefined;
  /* functional template */
  const __vue_is_functional_template__$1c = false;
  /* component normalizer */
  function __vue_normalize__$1c(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navbar/NavbarToggler.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavbarToggler = __vue_normalize__$1c(
    { render: __vue_render__$15, staticRenderFns: __vue_staticRenderFns__$15 },
    __vue_inject_styles__$1c,
    __vue_script__$1c,
    __vue_scope_id__$1c,
    __vue_is_functional_template__$1c,
    __vue_module_identifier__$1c,
    undefined,
    undefined
  );

//
var script$1e = {
  name: 'navbar',
  components: {
    NavbarBrand: NavbarBrand,
    NavbarCollapse: NavbarCollapse,
    NavbarText: NavbarText,
    NavbarToggler: NavbarToggler,
    NavbarTogglerIcon: NavbarTogglerIcon
  },
  mixins: [Variant, Colorable, MergeClasses],
  props: {
    /**
     * Expand the navbar. If true, applies to all size, otherwise pass a string.
     *
     * @property Object
     */
    expand: {
      type: [Boolean, String],
      default: 'lg',
      validate: function validate(value) {
      }
    },

    /**
     * The should the navbar be fixed at the top.
     *
     * @property String
     */
    fixed: {
      type: [String, Boolean],
      validate: function validate(value) {
      }
    },

    /**
     * The should the navbar be stickied at the top.
     *
     * @property String
     */
    sticky: {
      type: [String, Boolean],
      validate: function validate(value) {
      }
    },

    /**
     * The variant attribute
     *
     * @property String
     */
    variant: {
      type: String,
      default: 'light',
      validate: function validate(value) {
        return ['light', 'dark'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    expandedClass: function expandedClass() {
      if (isBoolean(this.expand)) {
        return this.expand;
      }

      return prefix(prefix(this.expand, 'expand'), 'navbar');
    },
    classes: function classes() {
      return this.mergeClasses('navbar', prefix(this.sticky === true ? 'top' : this.sticky, 'sticky'), prefix(this.fixed === true ? 'top' : this.fixed, 'fixed'), this.expandedClass, this.variantClass, this.colorableClasses);
    }
  },
  data: function data() {
    return {};
  }
};

/* script */
            const __vue_script__$1d = script$1e;
            
/* template */
var __vue_render__$16 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("nav", { class: _vm.classes }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$16 = [];
__vue_render__$16._withStripped = true;

  /* style */
  const __vue_inject_styles__$1d = undefined;
  /* scoped */
  const __vue_scope_id__$1d = undefined;
  /* module identifier */
  const __vue_module_identifier__$1d = undefined;
  /* functional template */
  const __vue_is_functional_template__$1d = false;
  /* component normalizer */
  function __vue_normalize__$1d(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navbar/Navbar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Navbar = __vue_normalize__$1d(
    { render: __vue_render__$16, staticRenderFns: __vue_staticRenderFns__$16 },
    __vue_inject_styles__$1d,
    __vue_script__$1d,
    __vue_scope_id__$1d,
    __vue_is_functional_template__$1d,
    __vue_module_identifier__$1d,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
var script$1f = {
  name: 'navigation-error',
  props: {
    error: {
      type: String,
      required: true
    }
  }
};

/* script */
            const __vue_script__$1e = script$1f;
/* template */
var __vue_render__$17 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    {
      staticClass: "navigation-error fa-stack fa-md",
      attrs: { title: _vm.error }
    },
    [
      _c("i", { staticClass: "fa fa-stack-2x fa-certificate" }),
      _vm._v(" "),
      _c("i", { staticClass: "fa fa-stack-1x fa-exclamation fa-inverse" })
    ]
  )
};
var __vue_staticRenderFns__$17 = [];
__vue_render__$17._withStripped = true;

  /* style */
  const __vue_inject_styles__$1e = undefined;
  /* scoped */
  const __vue_scope_id__$1e = undefined;
  /* module identifier */
  const __vue_module_identifier__$1e = undefined;
  /* functional template */
  const __vue_is_functional_template__$1e = false;
  /* component normalizer */
  function __vue_normalize__$1e(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navigation/NavigationError.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavigationError = __vue_normalize__$1e(
    { render: __vue_render__$17, staticRenderFns: __vue_staticRenderFns__$17 },
    __vue_inject_styles__$1e,
    __vue_script__$1e,
    __vue_scope_id__$1e,
    __vue_is_functional_template__$1e,
    __vue_module_identifier__$1e,
    undefined,
    undefined
  );

//
var script$1g = {
  name: 'navigation-link',
  components: {
    NavigationError: NavigationError
  },
  props: {
    /**
     * Is the navigation item active
     *
     * @prop {Boolean}
     */
    active: Boolean,

    /**
     * Is the navigation item disabled
     *
     * @prop {Boolean}
     */
    disabled: Boolean,

    /**
     * The error string.
     *
     * @prop {String}
     */
    error: String,

    /**
     * The href attribute
     *
     * @prop {String}
     */
    href: String,

    /**
     * The component HTML tag
     *
     * @prop {String}
     */
    tag: String,

    /**
     * The to attribute, will be passed to router-link.
     *
     * @prop {String}
     */
    to: [Object, String],

    /**
     * Add the nav-item class to the link
     *
     * @prop {Boolean}
     */
    item: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    component: function component() {
      return this.tag || (this.to ? 'router-link' : 'a');
    },
    classes: function classes() {
      var _this = this;

      this.$nextTick(function () {
        if (!_this.isItem) {
          _this.isItem = !_this.$parent.$el.classList.contains('nav-item');
        }
      });
      return {
        'nav-link': !!this.href || !!this.to,
        'nav-item': !!this.item,
        'active': this.active,
        'disabled': this.disabled
      };
    }
  }
};

/* script */
            const __vue_script__$1f = script$1g;
            
/* template */
var __vue_render__$18 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.component,
    {
      tag: "component",
      class: _vm.classes,
      attrs: { href: _vm.href || (_vm.to ? "#" : null), to: _vm.to },
      on: {
        click: function($event) {
          _vm.$emit("click", $event);
        }
      }
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm.error
        ? _c("navigation-error", { attrs: { error: _vm.error } })
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$18 = [];
__vue_render__$18._withStripped = true;

  /* style */
  const __vue_inject_styles__$1f = undefined;
  /* scoped */
  const __vue_scope_id__$1f = undefined;
  /* module identifier */
  const __vue_module_identifier__$1f = undefined;
  /* functional template */
  const __vue_is_functional_template__$1f = false;
  /* component normalizer */
  function __vue_normalize__$1f(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navigation/NavigationLink.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavigationLink = __vue_normalize__$1f(
    { render: __vue_render__$18, staticRenderFns: __vue_staticRenderFns__$18 },
    __vue_inject_styles__$1f,
    __vue_script__$1f,
    __vue_scope_id__$1f,
    __vue_is_functional_template__$1f,
    __vue_module_identifier__$1f,
    undefined,
    undefined
  );

//
var script$1h = {
  name: 'navigation-item',
  extends: NavigationLink,
  props: {
    /**
     * The HTML element
     *
     * @prop {String}
     */
    element: String,

    /**
     * Is the component a list element
     *
     * @prop {Boolean}
     */
    list: Boolean,

    /**
     * Add the nav-item class to the link
     *
     * @prop {Boolean}
     */
    item: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    component: function component() {
      if (this.element) {
        return this.element;
      } else if (this.href) {
        return 'a';
      } else if (this.list) {
        return 'li';
      }

      return 'div';
    }
  }
};

/* script */
            const __vue_script__$1g = script$1h;
            
/* template */
var __vue_render__$19 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.component,
    {
      tag: "component",
      class: _vm.classes,
      on: {
        click: function($event) {
          _vm.$emit("click", $event);
        }
      }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$19 = [];
__vue_render__$19._withStripped = true;

  /* style */
  const __vue_inject_styles__$1g = undefined;
  /* scoped */
  const __vue_scope_id__$1g = undefined;
  /* module identifier */
  const __vue_module_identifier__$1g = undefined;
  /* functional template */
  const __vue_is_functional_template__$1g = false;
  /* component normalizer */
  function __vue_normalize__$1g(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navigation/NavigationItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavigationItem = __vue_normalize__$1g(
    { render: __vue_render__$19, staticRenderFns: __vue_staticRenderFns__$19 },
    __vue_inject_styles__$1g,
    __vue_script__$1g,
    __vue_scope_id__$1g,
    __vue_is_functional_template__$1g,
    __vue_module_identifier__$1g,
    undefined,
    undefined
  );

//
var script$1i = {
  name: 'navigation',
  components: {
    NavigationItem: NavigationItem
  },
  mixins: [Colorable, MergeClasses],
  props: {
    /**
     * Helper to add the justify-content-X class.
     *
     * @prop {Array}
     */
    align: String,

    /**
     * An array of buttons
     *
     * @prop {Array}
     */
    buttons: Array,

    /**
     * The navigation inside a card
     *
     * @prop {Boolean}
     */
    card: Boolean,

    /**
     * Justify nav items to fill the width equally (using flex).
     *
     * @prop {Array}
     */
    fill: Boolean,

    /**
     * Add `nav-justified` class to the component.
     *
     * @prop {Array}
     */
    justified: Boolean,

    /**
     * Display items as pill shapes
     *
     * @prop {Array}
     */
    pills: Boolean,

    /**
     * Display items as tab shapes
     *
     * @prop {Array}
     */
    tabs: Boolean,

    /**
     * Display the buttons vertically
     *
     * @prop {Boolean}
     */
    vertical: Boolean,

    /**
     * The role attribute
     *
     * @prop {String}
     */
    role: String
  },
  computed: {
    classes: function classes() {
      var _this = this;

      this.$nextTick(function () {
        if (!_this.isCard) {
          _this.isCard = _this.$parent.$el.classList.contains('card-header');
        }
      });
      return this.mergeClasses(prefix(this.align, 'justify-content'), this.colorableClasses, {
        'card-header-tabs': this.isCard && this.tabs,
        'card-header-pills': this.isCard && this.pills,
        'nav-justified': this.justified,
        'nav-fill': this.fill,
        'nav-pills': this.pills,
        'nav-tabs': this.tabs,
        'flex-column': this.vertical
      });
    }
  },
  data: function data() {
    return {
      isCard: this.card
    };
  }
};

/* script */
            const __vue_script__$1h = script$1i;
            
/* template */
var __vue_render__$1a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "nav",
    { staticClass: "nav", class: _vm.classes, attrs: { role: _vm.role } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$1a = [];
__vue_render__$1a._withStripped = true;

  /* style */
  const __vue_inject_styles__$1h = undefined;
  /* scoped */
  const __vue_scope_id__$1h = undefined;
  /* module identifier */
  const __vue_module_identifier__$1h = undefined;
  /* functional template */
  const __vue_is_functional_template__$1h = false;
  /* component normalizer */
  function __vue_normalize__$1h(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navigation/Navigation.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Navigation = __vue_normalize__$1h(
    { render: __vue_render__$1a, staticRenderFns: __vue_staticRenderFns__$1a },
    __vue_inject_styles__$1h,
    __vue_script__$1h,
    __vue_scope_id__$1h,
    __vue_is_functional_template__$1h,
    __vue_module_identifier__$1h,
    undefined,
    undefined
  );

//
var script$1j = {
  name: 'navigation-dropdown',
  extends: BtnDropdown,
  components: {
    BtnDropdown: BtnDropdown,
    DropdownMenu: DropdownMenu,
    NavigationItem: NavigationItem,
    NavigationLink: NavigationLink
  }
};

/* script */
            const __vue_script__$1i = script$1j;
            
/* template */
var __vue_render__$1b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "navigation-item",
    { staticClass: "dropdown" },
    [
      _vm._t("toggle-button", [
        _c(
          "navigation-link",
          {
            staticClass: "dropdown-toggle",
            attrs: {
              href: "#",
              "data-toggle": "dropdown",
              role: "button",
              "aria-haspopup": "true",
              "aria-expanded": _vm.isDropdownShowing
            },
            on: { blur: _vm.onBlur },
            nativeOn: {
              click: function($event) {
                $event.preventDefault();
                _vm.toggle();
              }
            }
          },
          [_vm._v("\n            " + _vm._s(_vm.label) + "\n        ")]
        )
      ]),
      _vm._v(" "),
      _vm._t("dropdown-menu", [
        _c(
          "dropdown-menu",
          {
            attrs: {
              id: _vm.id,
              items: _vm.items,
              align: _vm.align,
              show: _vm.isDropdownShowing
            },
            on: {
              "update:show": function($event) {
                _vm.isDropdownShowing = $event;
              },
              "item:click": _vm.onItemClick
            }
          },
          [_vm._t("default")],
          2
        )
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$1b = [];
__vue_render__$1b._withStripped = true;

  /* style */
  const __vue_inject_styles__$1i = undefined;
  /* scoped */
  const __vue_scope_id__$1i = undefined;
  /* module identifier */
  const __vue_module_identifier__$1i = undefined;
  /* functional template */
  const __vue_is_functional_template__$1i = false;
  /* component normalizer */
  function __vue_normalize__$1i(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navigation/NavigationDropdown.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavigationDropdown = __vue_normalize__$1i(
    { render: __vue_render__$1b, staticRenderFns: __vue_staticRenderFns__$1b },
    __vue_inject_styles__$1i,
    __vue_script__$1i,
    __vue_scope_id__$1i,
    __vue_is_functional_template__$1i,
    __vue_module_identifier__$1i,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Navigation: Navigation,
      NavigationError: NavigationError,
      NavigationItem: NavigationItem,
      NavigationLink: NavigationLink,
      NavigationDropdown: NavigationDropdown
    });
  }
});

//
var script$1k = {
  name: 'navbar-nav',
  components: {
    Navigation: Navigation
  }
};

/* script */
            const __vue_script__$1j = script$1k;
            
/* template */
var __vue_render__$1c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ul",
    {
      staticClass: "navbar-nav",
      class: _vm.classes,
      attrs: { role: _vm.role }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$1c = [];
__vue_render__$1c._withStripped = true;

  /* style */
  const __vue_inject_styles__$1j = undefined;
  /* scoped */
  const __vue_scope_id__$1j = undefined;
  /* module identifier */
  const __vue_module_identifier__$1j = undefined;
  /* functional template */
  const __vue_is_functional_template__$1j = false;
  /* component normalizer */
  function __vue_normalize__$1j(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Navbar/NavbarNav.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var NavbarNav = __vue_normalize__$1j(
    { render: __vue_render__$1c, staticRenderFns: __vue_staticRenderFns__$1c },
    __vue_inject_styles__$1j,
    __vue_script__$1j,
    __vue_scope_id__$1j,
    __vue_is_functional_template__$1j,
    __vue_module_identifier__$1j,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Navbar: Navbar,
      NavbarBrand: NavbarBrand,
      NavbarCollapse: NavbarCollapse,
      NavbarNav: NavbarNav,
      NavbarText: NavbarText,
      NavbarToggler: NavbarToggler,
      NavbarTogglerIcon: NavbarTogglerIcon
    });
  }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1l = {
  name: 'pagination',
  props: {
    /**
     * The alignment of the pagination component.
     *
     * @prop String
     */
    align: {
      type: String,
      validate: function validate(value) {
        return ['start', 'end', 'center'].indexOf(value) !== -1;
      }
    },

    /**
     * The page on which the paginator should start.
     *
     * @prop String
     */
    page: {
      type: Number,
      default: 1
    },

    /**
     * The total number of pages in the paginator.
     *
     * @prop String
     */
    totalPages: {
      type: Number,
      default: 1
    },

    /**
     * The number of pages to show when the total number of pages is
     * greater than the number of pages that should be shown.
     *
     * @prop String
     */
    showPages: {
      type: Number,
      default: 6
    }
  },
  methods: {
    next: function next(event) {
      this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, event);
    },
    prev: function prev(event) {
      this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, event);
    },
    paginate: function paginate(page, event) {
      if (event.currentTarget.parentNode.classList.contains('disabled')) {
        return;
      }

      this.setActivePage(page);
      this.$emit('paginate', page, event);
    },
    setActivePage: function setActivePage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
      }
    },
    generate: function generate() {
      var pages = [];
      var showPages = this.showPages % 2 ? this.showPages + 1 : this.showPages;
      var startPage = this.currentPage >= showPages ? this.currentPage - showPages / 2 : 1;
      var startOffset = showPages + startPage;
      var endPage = this.totalPages < startOffset ? this.totalPages : startOffset;
      var diff = startPage - endPage + showPages;
      startPage -= startPage - diff > 0 ? diff : 0;

      if (startPage > 1) {
        pages.push({
          page: 1
        });
      }

      if (startPage > 2) {
        pages.push({
          divider: true
        });
      }

      for (var i = startPage; i < endPage; i++) {
        pages.push({
          page: i
        });
      }

      if (endPage <= this.totalPages) {
        if (this.totalPages - 1 > endPage) {
          pages.push({
            divider: true
          });
        }

        pages.push({
          page: this.totalPages
        });
      }

      return pages;
    }
  },
  computed: {
    pages: function pages() {
      return this.generate();
    },
    classes: function classes() {
      var classes = {};
      classes['justify-content-' + this.align] = true;
      return classes;
    }
  },
  data: function data() {
    return {
      currentPage: this.page
    };
  }
};

/* script */
            const __vue_script__$1k = script$1l;
            
/* template */
var __vue_render__$1d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("nav", { attrs: { "aria-label": "Page navigation example" } }, [
    _c(
      "ul",
      { staticClass: "pagination", class: _vm.classes },
      [
        _c(
          "li",
          {
            staticClass: "page-item",
            class: { disabled: _vm.currentPage === 1 }
          },
          [
            _c(
              "a",
              {
                staticClass: "page-link",
                attrs: { href: "#", "aria-label": "Previous" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    _vm.prev($event);
                  }
                }
              },
              [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("«")])]
            )
          ]
        ),
        _vm._v(" "),
        _vm._l(_vm.pages, function(item) {
          return _c(
            "li",
            {
              staticClass: "page-item",
              class: {
                active: item.page === _vm.currentPage,
                disabled: !!item.divider
              },
              attrs: { "data-page": item.page }
            },
            [
              _vm._t(
                "default",
                [
                  item.divider
                    ? _c("a", { staticClass: "page-link" }, [_vm._v("…")])
                    : _c(
                        "a",
                        {
                          staticClass: "page-link",
                          class: item.class,
                          attrs: { href: "#", "data-label": item.label },
                          on: {
                            click: function($event) {
                              $event.preventDefault();
                              _vm.paginate(item.page, $event);
                            }
                          }
                        },
                        [
                          item.label
                            ? _c("span", {
                                attrs: { "aria-hidden": "true" },
                                domProps: { innerHTML: _vm._s(item.label) }
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          item.page
                            ? _c("span", {
                                attrs: { "aria-hidden": "true" },
                                domProps: { innerHTML: _vm._s(item.page) }
                              })
                            : _vm._e()
                        ]
                      )
                ],
                { item: item }
              )
            ],
            2
          )
        }),
        _vm._v(" "),
        _c(
          "li",
          {
            staticClass: "page-item",
            class: { disabled: _vm.currentPage >= _vm.totalPages }
          },
          [
            _c(
              "a",
              {
                staticClass: "page-link",
                attrs: { href: "#", "aria-label": "Next" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    _vm.next($event);
                  }
                }
              },
              [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("»")])]
            )
          ]
        )
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$1d = [];
__vue_render__$1d._withStripped = true;

  /* style */
  const __vue_inject_styles__$1k = undefined;
  /* scoped */
  const __vue_scope_id__$1k = undefined;
  /* module identifier */
  const __vue_module_identifier__$1k = undefined;
  /* functional template */
  const __vue_is_functional_template__$1k = false;
  /* component normalizer */
  function __vue_normalize__$1k(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Pagination/Pagination.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Pagination = __vue_normalize__$1k(
    { render: __vue_render__$1d, staticRenderFns: __vue_staticRenderFns__$1d },
    __vue_inject_styles__$1k,
    __vue_script__$1k,
    __vue_scope_id__$1k,
    __vue_is_functional_template__$1k,
    __vue_module_identifier__$1k,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Pagination: Pagination
    });
  }
});

//
var CUSTOM_SELECT_PREFIX = 'custom-select-';
var script$1m = {
  name: 'select-field',
  components: {
    HelpText: HelpText,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    FormFeedback: FormFeedback
  },
  extends: FormControl,
  mixins: [Colorable, FormControl, MergeClasses],
  props: {
    /**
     * Add `custom-select` to the form control if true.
     *
     * @property String
     */
    custom: Boolean
  },
  computed: {
    controlClass: function controlClass() {
      var controlClass = this.custom ? 'custom-select' : this.defaultControlClass;
      return this.plaintext ? "".concat(controlClass, "-plaintext") : controlClass;
    },
    customSelectClasses: function customSelectClasses() {
      return [CUSTOM_SELECT_PREFIX.replace(/-$/, '') + (this.plaintext ? '-plaintext' : ''), this.customSelectSizeClass, this.spacing || ''].join(' ');
    }
  }
};

/* script */
            const __vue_script__$1l = script$1m;
            
/* template */
var __vue_render__$1e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form-group",
    [
      _vm._t("label", [
        _vm.label
          ? _c("form-label", {
              attrs: { for: _vm.id },
              domProps: { innerHTML: _vm._s(_vm.label) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm._t("control", [
        _c(
          "select",
          {
            class: _vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),
            attrs: {
              id: _vm.id,
              name: _vm.name,
              required: _vm.required,
              disabled: _vm.disabled || _vm.readonly,
              readonly: _vm.readonly,
              pattern: _vm.pattern
            },
            domProps: { value: _vm.value },
            on: {
              input: function($event) {
                _vm.$emit("input", $event.target.value);
              }
            }
          },
          [_vm._t("default")],
          2
        )
      ]),
      _vm._v(" "),
      _vm._t("help", [
        _vm.helpText
          ? _c("help-text", { domProps: { innerHTML: _vm._s(_vm.helpText) } })
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm._t("feedback", [
        _vm.validFeedback
          ? _c("form-feedback", {
              attrs: { valid: "" },
              domProps: { innerHTML: _vm._s(_vm.validFeedback) }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.invalidFeedback
          ? _c("form-feedback", {
              attrs: { invalid: "" },
              domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
            })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$1e = [];
__vue_render__$1e._withStripped = true;

  /* style */
  const __vue_inject_styles__$1l = undefined;
  /* scoped */
  const __vue_scope_id__$1l = undefined;
  /* module identifier */
  const __vue_module_identifier__$1l = undefined;
  /* functional template */
  const __vue_is_functional_template__$1l = false;
  /* component normalizer */
  function __vue_normalize__$1l(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/SelectField/SelectField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SelectField = __vue_normalize__$1l(
    { render: __vue_render__$1e, staticRenderFns: __vue_staticRenderFns__$1e },
    __vue_inject_styles__$1l,
    __vue_script__$1l,
    __vue_scope_id__$1l,
    __vue_is_functional_template__$1l,
    __vue_module_identifier__$1l,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      SelectField: SelectField
    });
  }
});

var script$1n = {
  name: 'slides',
  props: {
    /**
     * The active slide index or key.
     *
     * @type {String|Number}
     */
    active: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    active: function active(value, oldValue) {
      this.lastSlide = oldValue;
      this.currentSlide = value;
    }
  },
  methods: {
    /**
     * Get the HTML nodes from the default slots (exluding children without tags).
     *
     * @return {Array}
     */
    slides: function slides() {
      return this.$slots.default.filter(function (vnode, i) {
        return !!vnode.tag;
      }).map(function (vnode, i) {
        if (!vnode.key || !vnode.data && !vnode.data.key) {
          vnode.data = extend(vnode.data, {
            key: vnode.key = i
          });
        }

        return vnode;
      });
    },

    /**
     * Get a slide by index.
     *
     * @return {Array}
     */
    slide: function slide(index) {
      return this.findSlideByKey(index) || this.findSlideByIndex(index) || this.findSlideByIndex(0);
    },

    /**
     * Find a slide by a given key or return null if non found.
     *
     * @param  {Number|String} key
     * @return {VNode|null}
     */
    findSlideByKey: function findSlideByKey(key$$1) {
      return first(this.slides().filter(function (vnode, i) {
        if (vnode.key === key$$1) {
          return vnode;
        } else if (vnode.data && vnode.data.key === key$$1) {
          return vnode;
        }

        return null;
      }));
    },

    /**
     * Find a slide by a given index or return null if non found.
     *
     * @param  {Number|String} key
     * @return {VNode|null}
     */
    findSlideByIndex: function findSlideByIndex(index) {
      return this.slides()[index] || null;
    },

    /**
     * Get the slide index for a give slide object or key
     *
     * @param  {Number|String} slide
     * @return {VNode|null}
     */
    getSlideIndex: function getSlideIndex(slide) {
      var key$$1 = !isUndefined(slide.data) ? slide.data.key : slide.key || slide;
      return findIndex(this.slides(), function (vnode, i) {
        if (slide === vnode) {
          return true;
        } else if (vnode.data && vnode.data.key === key$$1) {
          return true;
        } else if (vnode.key && vnode.key === key$$1) {
          return true;
        } else if (i === slide) {
          return true;
        }

        return false;
      });
    }
  },
  data: function data() {
    return {
      lastSlide: null,
      currentSlide: this.active
    };
  },
  render: function render(h) {
    return this.slide(this.currentSlide);
  }
};

/* script */
            const __vue_script__$1m = script$1n;
            
/* template */

  /* style */
  const __vue_inject_styles__$1m = undefined;
  /* scoped */
  const __vue_scope_id__$1m = undefined;
  /* module identifier */
  const __vue_module_identifier__$1m = undefined;
  /* functional template */
  const __vue_is_functional_template__$1m = undefined;
  /* component normalizer */
  function __vue_normalize__$1m(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/SlideDeck/Slides.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Slides = __vue_normalize__$1m(
    {},
    __vue_inject_styles__$1m,
    __vue_script__$1m,
    __vue_scope_id__$1m,
    __vue_is_functional_template__$1m,
    __vue_module_identifier__$1m,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
var script$1o = {
  name: 'slide-deck-controls',
  props: {
    /**
     * The slide key or index that should show.
     *
     * @type {Number}
     */
    active: {
      type: [String, Number],
      default: 0
    },

    /**
     * An array of slide vnodes
     *
     * @type {Number}
     */
    slides: {
      type: Array,
      required: true
    }
  },
  methods: {
    onClick: function onClick(event, slide) {
      this.$emit('click', event, slide);
    }
  },
  computed: {},
  data: function data() {
    return {};
  }
};

/* script */
            const __vue_script__$1n = script$1o;
/* template */
var __vue_render__$1f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "slide-deck-controls" },
    _vm._l(_vm.slides, function(slide) {
      return _c(
        "a",
        {
          staticClass: "slide-deck-control-icon",
          class: {
            "is-active":
              (slide.data ? slide.data.key : slide.key) === _vm.active
          },
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault();
              _vm.onClick($event, slide);
            }
          }
        },
        [_c("i", { staticClass: "fa fa-circle" })]
      )
    })
  )
};
var __vue_staticRenderFns__$1f = [];
__vue_render__$1f._withStripped = true;

  /* style */
  const __vue_inject_styles__$1n = undefined;
  /* scoped */
  const __vue_scope_id__$1n = undefined;
  /* module identifier */
  const __vue_module_identifier__$1n = undefined;
  /* functional template */
  const __vue_is_functional_template__$1n = false;
  /* component normalizer */
  function __vue_normalize__$1n(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/SlideDeck/SlideDeckControls.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SlideDeckControls = __vue_normalize__$1n(
    { render: __vue_render__$1f, staticRenderFns: __vue_staticRenderFns__$1f },
    __vue_inject_styles__$1n,
    __vue_script__$1n,
    __vue_scope_id__$1n,
    __vue_is_functional_template__$1n,
    __vue_module_identifier__$1n,
    undefined,
    undefined
  );

//
var script$1p = {
  name: 'slide-deck',
  components: {
    Slides: Slides,
    SlideDeckControls: SlideDeckControls
  },
  props: {
    /**
     * The slide key or index that should show.
     *
     * @type {Number}
     */
    active: {
      type: [String, Number],
      default: 0
    },

    /**
     * Center the slide-deck.
     *
     * @type Boolean
     */
    center: {
      type: Boolean,
      default: true
    },

    /**
     * Show the slide-deck controls to change the slide.
     *
     * @type Boolean
     */
    controls: Boolean,

    /**
     * Flex the content within the popover.
     *
     * @type Boolean
     */
    flex: {
      type: Boolean,
      default: true
    },

    /**
     * Give a selector or Element to use apply a hidden overflow. If false,
     * no overflow will be applied. Defaults to the slide deck's container.
     *
     * @type {String|Element|Boolean}
     */
    overflow: {
      type: [Object, String, Element, Boolean],
      default: true
    },

    /**
     * The mode determines how the popover content will flex based on the
     * varying heights of the slides.
     *
     * @type Boolean
     */
    resizeMode: {
      type: [Function, Boolean, String],
      default: 'auto',
      validate: function validate(value) {
        return ['auto', 'initial', 'inherit'].indexOf(value) !== 1;
      }
    }
  },
  watch: {
    active: function active(value, oldValue) {
      this.lastSlide = oldValue;
      this.currentSlide = value;
    },
    currentSlide: function currentSlide(value, oldValue) {
      this.direction = this.$refs.slides.getSlideIndex(oldValue) > this.$refs.slides.getSlideIndex(value) ? 'backward' : 'forward';
    }
  },
  methods: {
    resize: function resize(el) {
      if (isFunction(this.resizeMode)) {
        this.resizeMode(el || this.$el);
      } else {
        var style = getComputedStyle(el);

        if (!el.style.width) {
          el.width = el.style.width = "calc(".concat(style.width, " + ").concat(style.marginLeft, " + ").concat(style.marginRight, ")");
        }

        if (!el.style.height) {
          el.height = el.style.height = "calc(".concat(style.height, " + ").concat(style.marginTop, " + ").concat(style.marginBottom, ")");
        }
      }
    },
    slide: function slide(index) {
      return this.$refs.slides ? this.$refs.slides.slide(index || this.active) : null;
    },
    slides: function slides() {
      return this.$refs.slides ? this.$refs.slides.slides() : [];
    },
    onClickControl: function onClickControl(event, vnode) {
      this.currentSlide = vnode.data ? vnode.data.key : vnode.key;
    },
    onSlideAfterEnter: function onSlideAfterEnter(el) {
      if (el.width) {
        el.width = el.style.width = null;
      }

      if (el.height) {
        el.height = el.style.height = null;
      }

      this.width = null;
      this.height = null;
      this.$emit('after-enter', this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide));
    },
    onSlideBeforeEnter: function onSlideBeforeEnter(el) {
      this.$emit('before-enter', this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide));
    },
    onSlideEnter: function onSlideEnter(el, done) {
      var _this = this;

      this.resize(el);
      this.width = el.style.width;
      this.height = el.style.height;
      transition(el).then(function (delay) {
        _this.$nextTick(done);
      });
      this.$emit('enter', this.$refs.slides.slide(this.currentSlide), this.$refs.slides.slide(this.lastSlide));
    },
    onSlideAfterLeave: function onSlideAfterLeave(el) {
      var _this2 = this;

      if (el.width) {
        el.width = el.style.width = null;
      }

      if (el.height) {
        el.height = el.style.height = null;
      }

      this.$nextTick(function () {
        _this2.$emit('after-leave', _this2.$refs.slides.slide(_this2.lastSlide), _this2.$refs.slides.slide(_this2.currentSlide));
      });
    },
    onSlideBeforeLeave: function onSlideBeforeLeave(el) {
      this.resize(el);
      this.$emit('before-leave', this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide));
    },
    onSlideLeave: function onSlideLeave(el, done) {
      var _this3 = this;

      transition(el).then(function (delay) {
        _this3.$nextTick(done);
      });
      this.$emit('leave', this.$refs.slides.slide(this.lastSlide), this.$refs.slides.slide(this.currentSlide));
    }
  },
  computed: {
    overflowElement: function overflowElement() {
      if (this.overflow === true) {
        return this.$el;
      } else if (this.overflow instanceof Element) {
        return this.overflow;
      } else if (this.overflow && this.overflow.elm) {
        return this.overflow.elm;
      } else if (this.overflow) {
        return document.querySelector(this.overflow);
      }

      return null;
    },
    nodes: function nodes() {
      return this.$slots.default;
    }
  },
  mounted: function mounted() {
    if (this.overflowElement) {
      this.overflowElement.style.overflow = 'hidden';
    }
  },
  data: function data() {
    return {
      height: null,
      width: null,
      lastSlide: null,
      currentSlide: this.active,
      direction: 'forward'
    };
  }
};

/* script */
            const __vue_script__$1o = script$1p;
/* template */
var __vue_render__$1g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "slide-deck", class: { "slide-deck-flex": _vm.center } },
    [
      _c(
        "div",
        {
          ref: "content",
          staticClass: "slide-deck-content",
          style: { width: _vm.width, height: _vm.height }
        },
        [
          _c(
            "keep-alive",
            [
              _c(
                "transition",
                {
                  attrs: { name: "slide-" + _vm.direction },
                  on: {
                    "after-enter": _vm.onSlideAfterEnter,
                    "before-enter": _vm.onSlideBeforeEnter,
                    enter: _vm.onSlideEnter,
                    "after-leave": _vm.onSlideAfterLeave,
                    "before-leave": _vm.onSlideBeforeLeave,
                    leave: _vm.onSlideLeave
                  }
                },
                [
                  _c(
                    "slides",
                    {
                      key: _vm.currentSlide,
                      ref: "slides",
                      attrs: { active: _vm.currentSlide }
                    },
                    [_vm._t("default")],
                    2
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm._t("controls", [
        _vm.controls
          ? _c("slide-deck-controls", {
              ref: "controls",
              attrs: { slides: _vm.slides(), active: _vm.currentSlide },
              on: { click: _vm.onClickControl }
            })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$1g = [];
__vue_render__$1g._withStripped = true;

  /* style */
  const __vue_inject_styles__$1o = undefined;
  /* scoped */
  const __vue_scope_id__$1o = undefined;
  /* module identifier */
  const __vue_module_identifier__$1o = undefined;
  /* functional template */
  const __vue_is_functional_template__$1o = false;
  /* component normalizer */
  function __vue_normalize__$1o(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/SlideDeck/SlideDeck.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SlideDeck = __vue_normalize__$1o(
    { render: __vue_render__$1g, staticRenderFns: __vue_staticRenderFns__$1g },
    __vue_inject_styles__$1o,
    __vue_script__$1o,
    __vue_scope_id__$1o,
    __vue_is_functional_template__$1o,
    __vue_module_identifier__$1o,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Slides: Slides,
      SlideDeck: SlideDeck
    });
  }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1q = {
  name: 'table-view-header',
  props: {
    id: [Number, String],
    label: [Number, String],
    name: [Number, String],
    request: Object
  }
};

/* script */
            const __vue_script__$1p = script$1q;
            
/* template */
var __vue_render__$1h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "th",
    { attrs: { scope: "col" } },
    [
      _vm.id && _vm.request
        ? [
            _c(
              "a",
              {
                staticClass: "sort",
                attrs: { href: "#", "data-id": _vm.id },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    _vm.$emit("order", _vm.id);
                  }
                }
              },
              [
                !_vm.$slots.default
                  ? [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.label || _vm.name || _vm.id) +
                          "\n                "
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm._t("default")
              ],
              2
            ),
            _vm._v(" "),
            _vm.request.params.order === _vm.id &&
            _vm.request.params.sort === "asc"
              ? _c("i", { staticClass: "sort-icon fa fa-sort-asc" })
              : _vm._e(),
            _vm._v(" "),
            _vm.request.params.order === _vm.id &&
            _vm.request.params.sort === "desc"
              ? _c("i", { staticClass: "sort-icon fa fa-sort-desc" })
              : _vm._e()
          ]
        : [
            !_vm.$slots.default
              ? [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.label || _vm.name || _vm.id) +
                      "\n            "
                  )
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm._t("default")
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$1h = [];
__vue_render__$1h._withStripped = true;

  /* style */
  const __vue_inject_styles__$1p = undefined;
  /* scoped */
  const __vue_scope_id__$1p = undefined;
  /* module identifier */
  const __vue_module_identifier__$1p = undefined;
  /* functional template */
  const __vue_is_functional_template__$1p = false;
  /* component normalizer */
  function __vue_normalize__$1p(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/TableView/TableViewHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TableViewHeader = __vue_normalize__$1p(
    { render: __vue_render__$1h, staticRenderFns: __vue_staticRenderFns__$1h },
    __vue_inject_styles__$1p,
    __vue_script__$1p,
    __vue_scope_id__$1p,
    __vue_is_functional_template__$1p,
    __vue_module_identifier__$1p,
    undefined,
    undefined
  );

//
var script$1r = {
  components: {
    Alert: Alert,
    Pagination: Pagination,
    TableViewHeader: TableViewHeader,
    ActivityIndicator: ActivityIndicator
  },
  props: {
    // (array) An array of table column
    // [{id: 'database_id', name: 'Database id', width: '20%'}]
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    data: {
      type: Array,
      required: true
    },
    // (string) Add table-hover to the table element
    hover: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    // (integer) The minimum height of the row when loading data
    minHeight: {
      type: Number,
      default: 400
    },
    // (bool) Should show the pagination for this table
    paginate: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    height: function height(min) {
      var elements = [// this.$el.querySelector('thead'),
      this.$el.querySelector('tbody')];
      var height = 0;
      each(elements, function (el) {
        height += el.getBoundingClientRect().height;
      });
      return unit(Math.max(min, height));
    }
  },
  computed: {
    tableColumns: function tableColumns() {
      var columns = this.columns;

      if (!columns || !columns.length) {
        columns = Object.keys(this.data[0]);
      }

      return columns.map(function (column) {
        return isObject(column) ? column : {
          name: column
        };
      });
    }
  }
};

/* script */
            const __vue_script__$1q = script$1r;
            
/* template */
var __vue_render__$1i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "table",
    {
      staticClass: "table",
      class: { "table-hover": _vm.hover && !_vm.loading && _vm.data.length }
    },
    [
      _c("thead", { attrs: { slot: "thead" }, slot: "thead" }, [
        _vm.columns.length || _vm.$slots.columns
          ? _c(
              "tr",
              { attrs: { slot: "columns" }, slot: "columns" },
              _vm._l(_vm.tableColumns, function(column, key) {
                return _c(
                  "table-view-header",
                  _vm._g(
                    _vm._b(
                      {
                        key: key,
                        attrs: { request: _vm.request },
                        on: {
                          order: function(id) {
                            return _vm.$emit("order", id)
                          }
                        }
                      },
                      "table-view-header",
                      column.props || column,
                      false
                    ),
                    column.events
                  )
                )
              })
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "tbody",
        [
          _vm.loading
            ? _c("tr", [
                _c(
                  "td",
                  {
                    staticClass: "position-relative",
                    style: { height: _vm.height(_vm.minHeight) },
                    attrs: { colspan: _vm.tableColumns.length }
                  },
                  [_c("activity-indicator", { attrs: { center: true } })],
                  1
                )
              ])
            : !_vm.data.length
              ? _c("tr", [
                  _c(
                    "td",
                    {
                      staticClass: "position-relative",
                      attrs: { colspan: _vm.tableColumns.length }
                    },
                    [
                      _c(
                        "alert",
                        { staticClass: "my-3", attrs: { variant: "warning" } },
                        [
                          _c("i", { staticClass: "fa fa-warning" }),
                          _vm._v(
                            " There are no results found.\n                "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ])
              : _vm._t(
                  "default",
                  _vm._l(_vm.data, function(row, i) {
                    return _c(
                      "tr",
                      _vm._l(_vm.tableColumns, function(column) {
                        return _c("td", {
                          domProps: {
                            innerHTML: _vm._s(
                              row[column.id] || row[column.name]
                            )
                          }
                        })
                      })
                    )
                  }),
                  { data: _vm.data, columns: _vm.tableColumns }
                )
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("tfoot", [
        _vm.paginate && _vm.response
          ? _c("tfoot", [
              _c(
                "td",
                {
                  staticClass: "table-view-footer",
                  attrs: { colspan: _vm.tableColumns.length || 1 }
                },
                [
                  _vm._t("pagination", [
                    _c("pagination", {
                      attrs: {
                        align: "center",
                        page: _vm.response.current_page,
                        "total-pages": _vm.response.last_page
                      },
                      on: {
                        paginate: function($event) {
                          _vm.$emit("paginate");
                        }
                      }
                    })
                  ])
                ],
                2
              )
            ])
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$1i = [];
__vue_render__$1i._withStripped = true;

  /* style */
  const __vue_inject_styles__$1q = undefined;
  /* scoped */
  const __vue_scope_id__$1q = undefined;
  /* module identifier */
  const __vue_module_identifier__$1q = undefined;
  /* functional template */
  const __vue_is_functional_template__$1q = false;
  /* component normalizer */
  function __vue_normalize__$1q(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/TableView/Table.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTable = __vue_normalize__$1q(
    { render: __vue_render__$1i, staticRenderFns: __vue_staticRenderFns__$1i },
    __vue_inject_styles__$1q,
    __vue_script__$1q,
    __vue_scope_id__$1q,
    __vue_is_functional_template__$1q,
    __vue_module_identifier__$1q,
    undefined,
    undefined
  );

var Transformer =
/*#__PURE__*/
function () {
  /**
   * Initialize the transformer instance using an HTTP response object.
   *
   * @param data object
   * @return void
   */
  function Transformer(response) {
    _classCallCheck(this, Transformer);

    if (!isObject(this.$originalResponse = response)) {
      throw new Error('The transformer must be instantiated with a response object.');
    }

    if (!isArray(this.$required = this.required()) || !this.$required.length) {
      throw new Error('A transformer must have at least one required property.');
    }

    this.$transformedResponse = this.transform(response);
    this.validate();
    this.initialize();
  }
  /**
   * A method to override to perform logic to finished initializing.
   *
   * @return void
   */


  _createClass(Transformer, [{
    key: "initialize",
    value: function initialize() {} //

    /**
     * Define an array of required properties with at least one value.
     *
     * @return void
     */

  }, {
    key: "required",
    value: function required() {} //

    /**
     * Tranform the Response object
     *
     * @property String
     */

  }, {
    key: "transform",
    value: function transform(response) {
      return response.data;
    }
    /**
     * Get the tranformed response
     *
     * @property String
     */

  }, {
    key: "response",
    value: function response() {
      return this.$transformedResponse;
    }
    /**
     * Validate the tranformed response.
     *
     * @return void
     */

  }, {
    key: "validate",
    value: function validate() {
      var _this = this;

      if (!isObject(this.$transformedResponse)) {
        throw new Error('The transformed response must be an object.');
      }

      each(this.$required, function (key$$1) {
        if (!(key$$1 in _this.$transformedResponse)) {
          throw new Error("\"".concat(key$$1, "\" is a required property and does not exist in the tranformed response."));
        }
      });
    }
  }]);

  return Transformer;
}();

var TableViewTransformer =
/*#__PURE__*/
function (_Transformer) {
  _inherits(TableViewTransformer, _Transformer);

  function TableViewTransformer() {
    _classCallCheck(this, TableViewTransformer);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableViewTransformer).apply(this, arguments));
  }

  _createClass(TableViewTransformer, [{
    key: "required",
    value: function required() {
      return [// The end of the count of the paginated list.
      'to', // The start of the count of the paginated list.
      'from', // The total number of items (not just included in the pagination)
      'total', // The number of items per page
      'per_page', // The last page number (or total pages)
      'last_page', // The current page number
      'current_page', // The actual response data to appear in the table
      'data'];
    }
  }, {
    key: "data",
    value: function data() {
      return this.$transformedResponse.data;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      if (!isArray(this.data())) {
        throw new Error('The data property must be an array.');
      }
    }
  }]);

  return TableViewTransformer;
}(Transformer);

//
var script$1s = {
  name: 'table-view',
  mixins: [Proxy$1],
  components: {
    Card: Card,
    DataTable: DataTable,
    TableViewHeader: TableViewHeader
  },
  props: {
    // (boolean) Show the table in a card.
    card: Boolean,
    // (string) A relative or absolute endpoint URL used to fetch data
    url: {
      type: String,
      required: true
    },
    // (integer) The starting page of the table
    page: {
      type: Number,
      default: 1
    },
    // (integer) The total number of results per page
    limit: {
      type: Number,
      default: 20
    },
    // (string) The column used to order the data
    order: String,
    // (string) The sort direction (asc|desc)
    sort: {
      type: String,
      validate: function validate(value) {
        return ['asc', 'desc'].indexOf(value) !== -1;
      }
    },
    // (integer) The minimum height of the row when loading data
    minHeight: {
      type: Number,
      default: 400
    },
    // (array) An array of button objects
    // [{href: 'test-123', label: 'Test 123'}]
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // (array) An array of table column
    // [{id: 'database_id', name: 'Database id', width: '20%'}]
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // (string) The table heading
    heading: String,
    // (string) Add table-hover to the table element
    hover: {
      type: Boolean,
      default: true
    },
    // (string) The table description
    description: String,
    // (bool) Should show the pagination for this table
    paginate: {
      type: Boolean,
      default: true
    },
    // (object) The HTTP response transformer instance
    transformer: {
      type: Object,
      validate: function validate(value) {
        return value instanceof TableViewTransformer;
      }
    }
  },
  methods: {
    orderBy: function orderBy(order) {
      var defaultSort = 'desc';
      var currentSort = this.getRequestParam('sort');
      var currentOrder = this.getRequestParam('order');
      this.addRequestParam('order', order);
      this.addRequestParam('sort', currentOrder !== order || !currentSort ? defaultSort : currentSort === defaultSort ? 'asc' : null);
      this.fetch();
    },
    getRequestHeader: function getRequestHeader(key$$1, value) {
      return this.request.headers[key$$1] || value;
    },
    addRequestHeader: function addRequestHeader(key$$1, value) {
      if (!this.request.headers) {
        this.request.headers = {};
      }

      this.request.headers[key$$1] = value;
    },
    getRequestParam: function getRequestParam(key$$1, value) {
      return this.request.params[key$$1] || value;
    },
    addRequestParam: function addRequestParam(key$$1, value) {
      if (!this.request.params) {
        this.request.params = {};
      }

      this.request.params[key$$1] = value;
    },
    fetch: function fetch() {
      var _this = this;

      this.loading = true;
      return Request.get(this.url, this.request).then(function (response) {
        var transformer = _this.transformer || new TableViewTransformer(response);
        _this.response = transformer.response();
        _this.data = transformer.data();
        _this.loading = false;
      }, function (errors) {
        _this.loading = false;
      });
    },
    onPaginate: function onPaginate(page, event) {
      if (!this.request.params) {
        this.request.params = {};
      }

      this.request.params.page = page;
      this.fetch();
    }
  },
  data: function data() {
    return {
      // (array) The dataset for the table
      data: this.$attrs.data || [],
      // (bool) Is the table currently loading data
      loading: false,
      // (null|object) The response object
      response: null,
      // (object) The HTTP request object
      request: extend({
        headers: {},
        params: {
          page: this.page,
          limit: this.limit,
          order: this.order,
          sort: this.sort
        }
      }, this.$attrs.request)
    };
  },
  mounted: function mounted() {
    this.fetch();
  },
  beforeDestroy: function beforeDestroy() {
    this.$off();
  }
};

/* script */
            const __vue_script__$1r = script$1s;
/* template */
var __vue_render__$1j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "table-view" },
    [
      _vm.heading || _vm.description || _vm.$slots.buttons
        ? _c(
            "div",
            {
              staticClass: "d-flex justify-content-between align-items-center"
            },
            [
              _vm._t("heading", [
                _vm.heading
                  ? _c("h2", { domProps: { innerHTML: _vm._s(_vm.heading) } })
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm._t("description", [
                _vm.description
                  ? _c("p", {
                      domProps: { innerHTML: _vm._s(_vm.description) }
                    })
                  : _vm._e()
              ]),
              _vm._v(" "),
              _vm.$slots.buttons
                ? _c(
                    "div",
                    { staticClass: "ml-auto my-3" },
                    [_vm._t("buttons")],
                    2
                  )
                : _vm._e()
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.card
        ? _c(
            "card",
            [
              _c(
                "data-table",
                {
                  attrs: {
                    columns: _vm.columns,
                    data: _vm.data,
                    hover: _vm.hover,
                    loading: _vm.loading,
                    "min-height": _vm.minHeight,
                    paginate: _vm.paginate
                  },
                  on: {
                    paginate: _vm.onPaginate,
                    order: function(id) {
                      return _vm.orderBy(id)
                    }
                  }
                },
                [
                  _vm._t("default", null, {
                    data: _vm.data,
                    columns: _vm.columns
                  })
                ],
                2
              )
            ],
            1
          )
        : _c(
            "data-table",
            {
              attrs: {
                columns: _vm.columns,
                data: _vm.data,
                hover: _vm.hover,
                loading: _vm.loading,
                "min-height": _vm.minHeight,
                paginate: _vm.paginate
              },
              on: {
                paginate: _vm.onPaginate,
                order: function(id) {
                  return _vm.orderBy(id)
                }
              }
            },
            [_vm._t("default", null, { data: _vm.data, columns: _vm.columns })],
            2
          )
    ],
    1
  )
};
var __vue_staticRenderFns__$1j = [];
__vue_render__$1j._withStripped = true;

  /* style */
  const __vue_inject_styles__$1r = undefined;
  /* scoped */
  const __vue_scope_id__$1r = undefined;
  /* module identifier */
  const __vue_module_identifier__$1r = undefined;
  /* functional template */
  const __vue_is_functional_template__$1r = false;
  /* component normalizer */
  function __vue_normalize__$1r(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/TableView/TableView.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TableView = __vue_normalize__$1r(
    { render: __vue_render__$1j, staticRenderFns: __vue_staticRenderFns__$1j },
    __vue_inject_styles__$1r,
    __vue_script__$1r,
    __vue_scope_id__$1r,
    __vue_is_functional_template__$1r,
    __vue_module_identifier__$1r,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      TableView: TableView
    });
  }
});

//
var script$1t = {
  name: 'textarea-field',
  components: {
    HelpText: HelpText,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    FormFeedback: FormFeedback
  },
  mixins: [Colorable, FormControl, MergeClasses],
  props: {
    /**
     * The type attribute
     *
     * @property String
     */
    type: {
      type: String,
      default: 'text'
    },

    /**
     * The rows attribute
     *
     * @property String
     */
    rows: [Number, String]
  }
};

/* script */
            const __vue_script__$1s = script$1t;
            
/* template */
var __vue_render__$1k = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form-group",
    [
      _vm._t("label", [
        _vm.label || _vm.hasDefaultSlot
          ? _c(
              "form-label",
              { attrs: { for: _vm.id } },
              [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
              2
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm._t("control", [
        _c(
          "div",
          { staticClass: "position-relative" },
          [
            _c("textarea", {
              directives: [
                {
                  name: "bind-events",
                  rawName: "v-bind-events",
                  value: _vm.bindEvents,
                  expression: "bindEvents"
                }
              ],
              class: _vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),
              attrs: {
                id: _vm.id,
                rows: _vm.rows,
                errors: _vm.errors,
                pattern: _vm.pattern,
                readonly: _vm.readonly,
                required: _vm.required,
                maxlength: _vm.maxlength,
                placeholder: _vm.placeholder,
                disabled: _vm.disabled || _vm.readonly
              },
              domProps: { value: _vm.value },
              on: {
                input: function($event) {
                  _vm.$emit("input", $event.target.value);
                }
              }
            }),
            _vm._v(" "),
            _vm._t("feedback", [
              _vm.validFeedback
                ? _c("form-feedback", {
                    attrs: { valid: "" },
                    domProps: { innerHTML: _vm._s(_vm.validFeedback) }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.invalidFeedback
                ? _c("form-feedback", {
                    attrs: { invalid: "" },
                    domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
                  })
                : _vm._e()
            ])
          ],
          2
        )
      ]),
      _vm._v(" "),
      _vm._t("help", [
        _vm.helpText
          ? _c("help-text", { domProps: { innerHTML: _vm._s(_vm.helpText) } })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$1k = [];
__vue_render__$1k._withStripped = true;

  /* style */
  const __vue_inject_styles__$1s = undefined;
  /* scoped */
  const __vue_scope_id__$1s = undefined;
  /* module identifier */
  const __vue_module_identifier__$1s = undefined;
  /* functional template */
  const __vue_is_functional_template__$1s = false;
  /* component normalizer */
  function __vue_normalize__$1s(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/TextareaField/TextareaField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TextareaField = __vue_normalize__$1s(
    { render: __vue_render__$1k, staticRenderFns: __vue_staticRenderFns__$1k },
    __vue_inject_styles__$1s,
    __vue_script__$1s,
    __vue_scope_id__$1s,
    __vue_is_functional_template__$1s,
    __vue_module_identifier__$1s,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      TextareaField: TextareaField
    });
  }
});

//
var script$1u = {
  props: {
    alt: String,
    src: String,
    width: [String, Number],
    height: [String, Number],
    minHeight: [String, Number],
    maxHeight: [String, Number],
    minWidth: [String, Number],
    maxWidth: [String, Number],
    fluid: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    unit: unit
  }
};

/* script */
            const __vue_script__$1t = script$1u;
/* template */
var __vue_render__$1l = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "thumbnail-list-item",
      style: {
        height: _vm.unit(_vm.height),
        width: _vm.unit(_vm.width),
        minHeight: _vm.unit(_vm.minHeight),
        maxHeight: _vm.unit(_vm.maxHeight),
        minWidth: _vm.unit(_vm.minWidth),
        maxWidth: _vm.unit(_vm.maxWidth)
      }
    },
    [
      _vm.src
        ? _c("img", {
            class: { "img-fluid": _vm.fluid },
            attrs: { src: _vm.src, alt: _vm.alt }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$1l = [];
__vue_render__$1l._withStripped = true;

  /* style */
  const __vue_inject_styles__$1t = undefined;
  /* scoped */
  const __vue_scope_id__$1t = undefined;
  /* module identifier */
  const __vue_module_identifier__$1t = undefined;
  /* functional template */
  const __vue_is_functional_template__$1t = false;
  /* component normalizer */
  function __vue_normalize__$1t(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ThumbnailList/ThumbnailListItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ThumbnailListItem = __vue_normalize__$1t(
    { render: __vue_render__$1l, staticRenderFns: __vue_staticRenderFns__$1l },
    __vue_inject_styles__$1t,
    __vue_script__$1t,
    __vue_scope_id__$1t,
    __vue_is_functional_template__$1t,
    __vue_module_identifier__$1t,
    undefined,
    undefined
  );

//
var script$1v = {
  components: {
    ThumbnailListItem: ThumbnailListItem
  },
  props: {
    fill: Boolean,
    flex: Boolean,
    noFlex: Boolean,
    grid: Boolean,
    wrap: Boolean,
    images: Array,
    width: {
      type: [String, Number],
      default: 75
    }
  },
  computed: {
    classes: function classes() {
      return {
        'thumbnail-list-fill': this.fill,
        'thumbnail-list-flex': this.flex,
        'thumbnail-list-noflex': this.noFlex,
        'thumbnail-list-grid': this.grid,
        'thumbnail-list-wrap': this.wrap
      };
    }
  }
};

/* script */
            const __vue_script__$1u = script$1v;
/* template */
var __vue_render__$1m = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "thumbnail-list", class: _vm.classes },
    [
      _vm._l(_vm.images, function(image) {
        return !!_vm.images
          ? _c("thumbnail-list-item", {
              key: image,
              attrs: { src: image, width: _vm.width }
            })
          : _vm._e()
      }),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$1m = [];
__vue_render__$1m._withStripped = true;

  /* style */
  const __vue_inject_styles__$1u = undefined;
  /* scoped */
  const __vue_scope_id__$1u = undefined;
  /* module identifier */
  const __vue_module_identifier__$1u = undefined;
  /* functional template */
  const __vue_is_functional_template__$1u = false;
  /* component normalizer */
  function __vue_normalize__$1u(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/ThumbnailList/ThumbnailList.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ThumbnailList = __vue_normalize__$1u(
    { render: __vue_render__$1m, staticRenderFns: __vue_staticRenderFns__$1m },
    __vue_inject_styles__$1u,
    __vue_script__$1u,
    __vue_scope_id__$1u,
    __vue_is_functional_template__$1u,
    __vue_module_identifier__$1u,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ThumbnailList: ThumbnailList
    });
  }
});

//
var script$1w = {
  name: 'upload-field',
  mixins: [FormControl],
  components: {
    Dropzone: Dropzone,
    FormGroup: FormGroup,
    FileField: FileField,
    FilePreview: FilePreview,
    ThumbnailList: ThumbnailList,
    ThumbnailListItem: ThumbnailListItem
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * Can user upload multiple files
     *
     * @property String
     */
    multiple: Boolean,

    /**
     * The maximum number of files that a user can upload
     *
     * @property String
     */
    maxUploads: Number,

    /**
     * The height attribute for the control element
     *
     * @property String
     */
    height: [Number, String],

    /**
     * The minimum height attribute for the control element
     *
     * @property String
     */
    minHeight: [Number, String],

    /**
     * The maximum height attribute for the control element
     *
     * @property String
     */
    maxHeight: [Number, String],

    /**
     * The width attribute for the control element
     *
     * @property String
     */
    width: [Number, String],

    /**
     * The minimum width attribute for the control element
     *
     * @property String
     */
    minWidth: [Number, String],

    /**
     * The maximum width attribute for the control element
     *
     * @property String
     */
    maxWidth: [Number, String],

    /**
     * Can user drag/drop files into browser to upload them.
     *
     * @property String
     */
    dropzoneMinHeight: [Number, String],

    /**
     * Is the user dragging a file over the dropzone
     *
     * @property String
     */
    dragging: {
      type: [String, Boolean],
      default: function _default() {
        return undefined;
      }
    },

    /**
     * Can user drag/drop files into browser to upload them.
     *
     * @property String
     */
    dropzone: {
      type: Boolean,
      default: true
    },

    /**
     * The data attribute
     *
     * @property File|FileList|Array
     */
    value: {
      type: [Object, File, FileList, Array],
      default: function _default() {
        return !this.multiple ? null : [];
      }
    },

    /**
     * An HTTP Model used to send the request
     *
     * @type Model
     */
    model: [Model, Function],
    request: Object
  },
  methods: {
    removeFile: function removeFile(data) {
      if (this.multiple) {
        var files = isArray(this.value) ? this.value.slice(0) : [];

        if (data instanceof File) {
          if (data.request && data.request.cancel) {
            data.request.cancel();
          }

          remove(files, {
            name: data.name,
            size: data.size,
            lastModified: data.lastModified
          });
        } else {
          remove(files, data);
        }

        this.$emit('change', files);
      } else {
        if (data.request && data.request.cancel) {
          data.request.cancel();
        }

        this.$emit('change', null);
      }
    },
    addFile: function addFile(file, subject) {
      var data = {
        name: file.name,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        size: file.size,
        type: file.type
      };

      if (this.multiple) {
        var files = subject || (isArray(this.value) ? this.value.slice(0) : []);

        if ((!this.maxUploads || this.maxUploads > files.length) && files.indexOf(data) === -1) {
          files.push(file);
          this.$emit('change', files);
          this.upload(file);
        }
      } else {
        this.$emit('change', file);
        this.upload(file);
      }
    },
    addFiles: function addFiles(files) {
      var _this = this;

      var subject = isArray(this.value) ? this.value.slice(0) : [];
      each(files, function (file) {
        _this.addFile(file, subject);
      });
      event.target.value = null;
    },

    /**
     * Upload function that handles auto-uploading fields asynchronously.
     * This is designed to work with REST API's and replace the file Object
     * with the RESTful returned by the server.
     *
     * @type Object
     */
    upload: function upload(file) {
      var _this2 = this;

      // Stop upload silently if no model is defined.
      if (!this.model) {
        return Promise.resolve();
      }

      var model = this.model;

      if (!(this.model instanceof Model)) {
        var _Model = this.model;
        model = new _Model();
      }

      model.set(this.name, file);
      this.$emit('uploading', model);
      this.$set(this.progressBars, this.multiple ? this.value ? this.value.length : 0 : 0, 0);
      return model.save(null, extend({
        onUploadProgress: function onUploadProgress(e) {
          if (!file.index) {
            file.index = _this2.files.indexOf(file);
          }

          if (!file.request) {
            file.request = model.getRequest();
          }

          _this2.$set(_this2.progressBars, file.index, parseInt(e.loaded / e.total * 100, 10));

          _this2.$emit('progress', model, _this2.progressBars[file.index]);
        }
      }, this.request)).then(function (response) {
        _this2.$nextTick(function () {
          _this2.$emit('upload', model);

          _this2.progressBars[file.index] = false;
        });

        return response;
      });
    },

    /**
     * The `change` event callback.
     *
     * @type Object
     */
    onChange: function onChange(files) {
      if (files instanceof FileList) {
        this.addFiles(files);
      } else {
        this.addFile(files);
      }
    },

    /**
     * The `dragover` event callback.
     *
     * @type Object
     */
    onDragOver: function onDragOver(event) {
      this.isDraggingInside = true;
      this.$emit('update:dragging', true);
      this.$emit('drag:over', event);
    },

    /**
     * The `dragover` event callback.
     *
     * @type Object
     */
    onDragEnter: function onDragEnter(event) {
      this.isDraggingInside = true;
      this.$emit('update:dragging', true);
      this.$emit('drag:enter', event);
    },

    /**
     * The `dragleave` event callback.
     *
     * @type Object
     */
    onDragLeave: function onDragLeave(event) {
      this.isDraggingInside = false;
      this.$emit('update:dragging', false);
      this.$emit('drag:leave', event);
    },

    /**
     * The `drop` event callback.
     *
     * @property String
     */
    onDrop: function onDrop(event) {
      this.isDraggingInside = false;
      this.addFiles(event.dataTransfer.files);
      this.$emit('update:dragging', false);
      this.$emit('drop', event);
    },

    /**
     * The `loaded` event callback.
     *
     * @type Object
     */
    onLoadedPreview: function onLoadedPreview(event) {
      this.$emit('loaded', event);
    }
  },
  computed: {
    files: function files() {
      return this.multiple ? this.value : this.value ? [this.value] : [];
    },
    showDropElement: function showDropElement() {
      return !isUndefined(this.dragging) ? this.dragging : this.isDraggingInside;
    }
  },
  data: function data() {
    return {
      progressBars: {},
      isDraggingInside: false
    };
  }
};

/* script */
            const __vue_script__$1v = script$1w;
/* template */
var __vue_render__$1n = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form-group",
    {
      staticClass: "upload-field",
      class: {
        "enable-dropzone": _vm.dropzone,
        "enable-multiple": _vm.multiple
      }
    },
    [
      _c(
        "dropzone",
        { on: { drop: _vm.onDrop } },
        [
          (_vm.multiple &&
            (!_vm.maxUploads || _vm.maxUploads > _vm.value.length)) ||
          (!_vm.multiple && !_vm.value)
            ? _c("file-field", {
                attrs: {
                  name: _vm.name,
                  label: _vm.label,
                  placeholder: _vm.placeholder,
                  "help-text": _vm.helpText,
                  multiple: _vm.multiple,
                  errors: _vm.errors
                },
                on: { change: _vm.onChange }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.files && _vm.files.length
            ? _c(
                "thumbnail-list",
                { staticClass: "mt-4", attrs: { wrap: "" } },
                _vm._l(_vm.files, function(file, key) {
                  return _c(
                    "thumbnail-list-item",
                    {
                      key:
                        file.lastModified +
                        "-" +
                        file.lastModifiedDate +
                        "-" +
                        file.size +
                        "-" +
                        file.type +
                        "-" +
                        file.name,
                      class: { uploading: !!_vm.progressBars[key] },
                      attrs: {
                        width: _vm.width,
                        "min-width": _vm.minWidth,
                        "max-width": _vm.maxWidth,
                        height: _vm.height,
                        "min-height": _vm.minHeight,
                        "max-height": _vm.maxHeight
                      }
                    },
                    [
                      _c("file-preview", {
                        attrs: {
                          file: file,
                          progress: _vm.progressBars[key] || 0
                        },
                        on: {
                          loaded: _vm.onLoadedPreview,
                          close: function($event) {
                            _vm.removeFile(file);
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm._t("default", null, { file: file })
                    ],
                    2
                  )
                })
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.showDropElement
            ? _c(
                "div",
                {
                  staticClass: "upload-field-dropzone",
                  style: { "min-height": _vm.dropzoneMinHeight },
                  on: {
                    drop: function($event) {
                      $event.preventDefault();
                      return _vm.onDrop($event)
                    }
                  }
                },
                [
                  _c("i", { staticClass: "fa fa-cloud-upload" }),
                  _vm._v(" "),
                  _c("div", [_vm._v("Drag and drop files to upload")])
                ]
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1n = [];
__vue_render__$1n._withStripped = true;

  /* style */
  const __vue_inject_styles__$1v = undefined;
  /* scoped */
  const __vue_scope_id__$1v = undefined;
  /* module identifier */
  const __vue_module_identifier__$1v = undefined;
  /* functional template */
  const __vue_is_functional_template__$1v = false;
  /* component normalizer */
  function __vue_normalize__$1v(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/UploadField/UploadField.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var UploadField = __vue_normalize__$1v(
    { render: __vue_render__$1n, staticRenderFns: __vue_staticRenderFns__$1n },
    __vue_inject_styles__$1v,
    __vue_script__$1v,
    __vue_scope_id__$1v,
    __vue_is_functional_template__$1v,
    __vue_module_identifier__$1v,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      UploadField: UploadField
    });
  }
});

//
var script$1x = {
  name: 'wizard-buttons',
  mixins: [Sizeable],
  components: {
    Btn: Btn,
    BtnGroup: BtnGroup,
    BtnActivity: BtnActivity
  },
  props: {
    /**
     * The index or key of the active step.
     *
     * @type {String|Number}
     */
    active: {
      type: [String, Number],
      default: 0
    },

    /**
     * Show the activity indicator in the next or finish button.
     *
     * @type {Boolean}
     */
    activity: Boolean,

    /**
     * Show should the "Back" button.
     *
     * @type {Boolean}
     */
    backButton: Boolean,

    /**
     * Show should the "Finish" button.
     *
     * @type {Boolean}
     */
    finishButton: Boolean,

    /**
     * Show should the "Next" button.
     *
     * @type {Boolean}
     */
    nextButton: Boolean,

    /**
     * An array of steps passed from the parent.
     *
     * @type {Array}
     */
    steps: {
      type: Array,
      required: true
    }
  },
  computed: {
    /**
     * Override the class prefix with an empty string...
     * @return {String}
     */
    sizeableClassPrefix: function sizeableClassPrefix() {
      return '';
    }
  },
  methods: {
    onClickBack: function onClickBack(event) {
      if (this.backButton !== false) {
        this.$emit('click:back', event);
      }
    },
    onClickFinish: function onClickFinish(event) {
      if (this.finishButton !== false) {
        this.$emit('click:finish', event);
      }
    },
    onClickNext: function onClickNext(event) {
      if (this.nextButton !== false) {
        this.$emit('click:next', event);
      }
    }
  }
};

/* script */
            const __vue_script__$1w = script$1x;
/* template */
var __vue_render__$1o = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "wizard-buttons" },
    [
      _c(
        "btn-group",
        { ref: "left", staticClass: "wizard-buttons-left" },
        [
          _vm._t("buttons-left"),
          _vm._v(" "),
          _c(
            "btn",
            {
              ref: "back",
              attrs: {
                type: "button",
                variant: "secondary",
                disabled:
                  _vm.backButton === false ||
                  (_vm.active === 0 && _vm.backButton !== true),
                size: _vm.sizeableClass
              },
              on: { click: _vm.onClickBack }
            },
            [
              _c("i", { staticClass: "fa fa-long-arrow-left" }),
              _vm._v(" Back\n        ")
            ]
          )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "btn-group",
        { ref: "right", staticClass: "wizard-buttons-right" },
        [
          _vm._t("buttons-right"),
          _vm._v(" "),
          _vm.active === _vm.steps.length - 1
            ? _c(
                "btn-activity",
                {
                  ref: "finish",
                  attrs: {
                    activity: _vm.activity,
                    size: _vm.sizeableClass,
                    disabled: _vm.finishButton === false,
                    type: "button",
                    variant: "success"
                  },
                  on: { click: _vm.onClickFinish }
                },
                [_vm._v("\n            Finish\n        ")]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.active < _vm.steps.length - 1
            ? _c(
                "btn-activity",
                {
                  ref: "next",
                  attrs: {
                    activity: _vm.activity,
                    size: _vm.sizeableClass,
                    disabled: _vm.nextButton === false,
                    type: "button",
                    variant: "primary"
                  },
                  on: { click: _vm.onClickNext }
                },
                [
                  _vm._v("\n            Next "),
                  _c("i", { staticClass: "fa fa-long-arrow-right" })
                ]
              )
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1o = [];
__vue_render__$1o._withStripped = true;

  /* style */
  const __vue_inject_styles__$1w = undefined;
  /* scoped */
  const __vue_scope_id__$1w = undefined;
  /* module identifier */
  const __vue_module_identifier__$1w = undefined;
  /* functional template */
  const __vue_is_functional_template__$1w = false;
  /* component normalizer */
  function __vue_normalize__$1w(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Wizard/WizardButtons.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var WizardButtons = __vue_normalize__$1w(
    { render: __vue_render__$1o, staticRenderFns: __vue_staticRenderFns__$1o },
    __vue_inject_styles__$1w,
    __vue_script__$1w,
    __vue_scope_id__$1w,
    __vue_is_functional_template__$1w,
    __vue_module_identifier__$1w,
    undefined,
    undefined
  );

var script$1y = {
  name: 'wizard-step',
  props: {
    /**
     * The parent wizard component instance.
     *
     * @type {String}
    wizard: {
        //required: true,
        type: Object
    },
    */

    /**
     * The step's label in the progress bar.
     *
     * @type {String}
     */
    label: String,

    /**
     * A predicate function to determine if the back button should show.
     * Can also be a boolean value.
     *
     * @type {Function|Boolean}
     */
    backButton: {
      type: [Function, Boolean],
      default: function _default() {
        return null;
      }
    },

    /**
     * Validate if the data input for the step is valid. Required Boolean
     * or a predicate function.
     *
     * @type {Function|Boolean}
     */
    validate: {
      type: [Function, Boolean],
      default: function _default() {
        return true;
      }
    }
  },
  methods: {
    checkValidity: function checkValidity(prop) {
      // Validate the property for the step first.
      if (isFunction(this[prop]) ? this[prop](this) === false : this[prop] === false) {
        return false;
      } // Then validate the property of the wizard, this is the global validator


      if (this.$refs.wizard) {
        if (isFunction(this.$refs.wizard[prop]) ? this.$refs.wizard[prop](this) === false : this.$refs.wizard[prop] === false) {
          return false;
        }
      }

      return true;
    },
    performValidityChecks: function performValidityChecks() {
      if (this.$refs.wizard) {
        this.checkValidity('validate') ? this.enable() : this.disable();
        this.checkValidity('backButton') ? this.$refs.wizard.enableBackButton() : this.$refs.wizard.disableBackButton();
      }
    },
    disable: function disable() {
      if (this.$refs.wizard) {
        this.$refs.wizard.disableNextButton();
        this.$refs.wizard.disableFinishButton();
      }
    },
    enable: function enable() {
      if (this.$refs.wizard) {
        this.$refs.wizard.enableNextButton();
        this.$refs.wizard.enableFinishButton();
      }
    }
  },
  updated: function updated() {
    this.performValidityChecks();
  },
  mounted: function mounted() {
    this.$nextTick(this.performValidityChecks);
  },
  render: function render(h) {
    if (this.$slots.default.length !== 1) {
      throw new Error('The <wizard-slot> must contain a single parent DOM node.');
    }

    return this.$slots.default[0];
  }
};

/* script */
            const __vue_script__$1x = script$1y;
            
/* template */

  /* style */
  const __vue_inject_styles__$1x = undefined;
  /* scoped */
  const __vue_scope_id__$1x = undefined;
  /* module identifier */
  const __vue_module_identifier__$1x = undefined;
  /* functional template */
  const __vue_is_functional_template__$1x = undefined;
  /* component normalizer */
  function __vue_normalize__$1x(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Wizard/WizardStep.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var WizardStep = __vue_normalize__$1x(
    {},
    __vue_inject_styles__$1x,
    __vue_script__$1x,
    __vue_scope_id__$1x,
    __vue_is_functional_template__$1x,
    __vue_module_identifier__$1x,
    undefined,
    undefined
  );

//
var script$1z = {
  name: 'wizard-error',
  extends: WizardStep,
  components: {
    Btn: Btn
  },
  props: {
    icon: {
      type: String,
      default: 'fa fa-3x fa-check'
    },
    title: {
      type: String,
      default: 'Error!'
    },
    errors: [Array, Object]
  }
};

/* script */
            const __vue_script__$1y = script$1z;
/* template */
var __vue_render__$1p = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "wizard-error" },
    [
      _vm.icon
        ? _c("div", { staticClass: "wizard-error-icon" }, [
            _c("i", { class: _vm.icon })
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.title
        ? _c("h3", {
            staticClass: "wizard-error-title",
            domProps: { innerHTML: _vm._s(_vm.title) }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _c("div", { staticClass: "row justify-content-center" }, [
        _c(
          "div",
          { staticClass: "col-sm-6" },
          [
            _vm.errors
              ? _c("div", { staticClass: "my-5" }, [
                  _c(
                    "ul",
                    { staticClass: "mb-0 text-left" },
                    _vm._l(_vm.errors, function(error, i) {
                      return _c("li", { key: i }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(error[0]) +
                            "\n                    "
                        )
                      ])
                    })
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "btn",
              {
                attrs: { size: "lg", variant: "danger", block: "" },
                on: {
                  click: function($event) {
                    _vm.$emit("back");
                  }
                }
              },
              [
                _c("i", { staticClass: "fa fa-long-arrow-left" }),
                _vm._v(" Go Back\n            ")
              ]
            )
          ],
          1
        )
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$1p = [];
__vue_render__$1p._withStripped = true;

  /* style */
  const __vue_inject_styles__$1y = undefined;
  /* scoped */
  const __vue_scope_id__$1y = undefined;
  /* module identifier */
  const __vue_module_identifier__$1y = undefined;
  /* functional template */
  const __vue_is_functional_template__$1y = false;
  /* component normalizer */
  function __vue_normalize__$1y(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Wizard/WizardError.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var WizardError = __vue_normalize__$1y(
    { render: __vue_render__$1p, staticRenderFns: __vue_staticRenderFns__$1p },
    __vue_inject_styles__$1y,
    __vue_script__$1y,
    __vue_scope_id__$1y,
    __vue_is_functional_template__$1y,
    __vue_module_identifier__$1y,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$1A = {
  name: 'wizard-header',
  props: {
    center: {
      type: Boolean,
      default: true
    },

    /**
     * The HTML tag
     *
     * @type {String}
     */
    tag: {
      type: String,
      default: 'h2'
    }
  }
};

/* script */
            const __vue_script__$1z = script$1A;
/* template */
var __vue_render__$1q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.tag,
    {
      tag: "component",
      staticClass: "wizard-header",
      class: { "text-center": _vm.center }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$1q = [];
__vue_render__$1q._withStripped = true;

  /* style */
  const __vue_inject_styles__$1z = undefined;
  /* scoped */
  const __vue_scope_id__$1z = undefined;
  /* module identifier */
  const __vue_module_identifier__$1z = undefined;
  /* functional template */
  const __vue_is_functional_template__$1z = false;
  /* component normalizer */
  function __vue_normalize__$1z(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Wizard/WizardHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var WizardHeader = __vue_normalize__$1z(
    { render: __vue_render__$1q, staticRenderFns: __vue_staticRenderFns__$1q },
    __vue_inject_styles__$1z,
    __vue_script__$1z,
    __vue_scope_id__$1z,
    __vue_is_functional_template__$1z,
    __vue_module_identifier__$1z,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1B = {
  name: 'wizard-progress',
  props: {
    /**
     * The index or key of the active step.
     *
     * @type {String|Number}
     */
    active: {
      type: [String, Number],
      default: 0
    },

    /**
     * The wizard highest available to the user.
     *
     * @type {Array}
     */
    highestStep: {
      type: Number,
      required: true
    },

    /**
     * The wizard steps
     *
     * @type {Array}
     */
    steps: {
      type: Array,
      required: true
    }
  },
  methods: {
    onClick: function onClick(event, step) {
      if (!event.target.classList.contains('disabled')) {
        this.$emit('click', event, step);
      }
    }
  },
  data: function data() {
    return {
      isActive: false
    };
  }
};

/* script */
            const __vue_script__$1A = script$1B;
/* template */
var __vue_render__$1r = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "wizard-progress" },
    _vm._l(_vm.steps, function(step, i) {
      return _c(
        "a",
        {
          staticClass: "wizard-step",
          class: {
            active: i === _vm.active,
            disabled: i > _vm.highestStep,
            complete: i + 1 <= _vm.highestStep
          },
          style: { width: 100 / _vm.steps.length + "%" },
          attrs: { href: "#", "data-step": i, title: step.label || step.title },
          on: {
            click: function($event) {
              $event.preventDefault();
              _vm.onClick($event, step);
            }
          }
        },
        [
          step.componentOptions && step.componentOptions.propsData.label
            ? _c("span", {
                staticClass: "wizard-step-label",
                domProps: {
                  innerHTML: _vm._s(step.componentOptions.propsData.label)
                }
              })
            : step.componentOptions && step.componentOptions.propsData.title
              ? _c("span", {
                  staticClass: "wizard-step-label",
                  domProps: {
                    innerHTML: _vm._s(step.componentOptions.propsData.title)
                  }
                })
              : _vm._e()
        ]
      )
    })
  )
};
var __vue_staticRenderFns__$1r = [];
__vue_render__$1r._withStripped = true;

  /* style */
  const __vue_inject_styles__$1A = undefined;
  /* scoped */
  const __vue_scope_id__$1A = undefined;
  /* module identifier */
  const __vue_module_identifier__$1A = undefined;
  /* functional template */
  const __vue_is_functional_template__$1A = false;
  /* component normalizer */
  function __vue_normalize__$1A(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Wizard/WizardProgress.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var WizardProgress = __vue_normalize__$1A(
    { render: __vue_render__$1r, staticRenderFns: __vue_staticRenderFns__$1r },
    __vue_inject_styles__$1A,
    __vue_script__$1A,
    __vue_scope_id__$1A,
    __vue_is_functional_template__$1A,
    __vue_module_identifier__$1A,
    undefined,
    undefined
  );

//
var script$1C = {
  name: 'wizard-success',
  extends: WizardStep,
  props: {
    icon: {
      type: String,
      default: 'fa fa-check'
    },
    title: {
      type: String,
      default: 'Success!'
    }
  }
};

/* script */
            const __vue_script__$1B = script$1C;
/* template */
var __vue_render__$1s = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "wizard-success" },
    [
      _vm.icon
        ? _c("div", { staticClass: "wizard-success-icon" }, [
            _c("i", { class: _vm.icon })
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.title
        ? _c("h3", {
            staticClass: "wizard-success-title",
            domProps: { innerHTML: _vm._s(_vm.title) }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$1s = [];
__vue_render__$1s._withStripped = true;

  /* style */
  const __vue_inject_styles__$1B = undefined;
  /* scoped */
  const __vue_scope_id__$1B = undefined;
  /* module identifier */
  const __vue_module_identifier__$1B = undefined;
  /* functional template */
  const __vue_is_functional_template__$1B = false;
  /* component normalizer */
  function __vue_normalize__$1B(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Wizard/WizardSuccess.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var WizardSuccess = __vue_normalize__$1B(
    { render: __vue_render__$1s, staticRenderFns: __vue_staticRenderFns__$1s },
    __vue_inject_styles__$1B,
    __vue_script__$1B,
    __vue_scope_id__$1B,
    __vue_is_functional_template__$1B,
    __vue_module_identifier__$1B,
    undefined,
    undefined
  );

//
var script$1D = {
  name: 'wizard',
  components: {
    SlideDeck: SlideDeck,
    WizardButtons: WizardButtons,
    WizardError: WizardError,
    WizardHeader: WizardHeader,
    WizardProgress: WizardProgress,
    WizardSuccess: WizardSuccess
  },
  props: {
    /**
     * The index or key of the active step.
     *
     * @type {String|Number}
     */
    active: {
      type: [String, Number],
      default: 0
    },

    /**
     * The the index or key of the max completed step.
     *
     * @type {String|Number}
     */
    completed: [String, Number],

    /**
     * Show the activity indicator in the next or finish button.
     *
     * @type {Boolean}
     */
    activity: Boolean,

    /**
     * Show should the "Back" button.
     *
     * @type {Boolean}
     */
    backButton: {
      type: [Function, Boolean],
      default: function _default() {
        return this.currentStep > 0;
      }
    },

    /**
     * Show should the "Finish" button.
     *
     * @type {Boolean}
     */
    finishButton: {
      type: Boolean,
      default: true
    },

    /**
     * Pass a header as a string.
     *
     * @type {String}
     */
    header: String,

    /**
     * Show should the "Next" button.
     *
     * @type {Boolean}
     */
    nextButton: {
      type: Boolean,
      default: true
    },

    /**
     * The mode determines how the popover content will flex based on the
     * varying heights of the slides.
     *
     * @type Boolean
     */
    resizeMode: {
      type: [Function, Boolean, String],
      default: 'auto',
      validate: function validate(value) {
        return ['auto', 'initial', 'inherit'].indexOf(value) !== 1;
      }
    },

    /**
     * Validate if the data input for the step is valid. Required Boolean
     * or a predicate function.
     *
     * @type {Function|Boolean}
     */
    validate: {
      type: [Function, Boolean],
      default: function _default() {
        return true;
      }
    }
  },
  watch: {
    active: function active() {
      this.currentStep = this.index();
    }
  },
  methods: {
    back: function back() {
      this.$emit('update:step', this.currentStep = Math.max(this.currentStep - 1, 0));
    },
    disableButtons: function disableButtons() {
      this.isBackButtonDisabled = true;
      this.isFinishButtonDisabled = true;
      this.isNextButtonDisabled = true;
    },
    disableBackButton: function disableBackButton() {
      this.isBackButtonDisabled = true;
    },
    disableFinishButton: function disableFinishButton() {
      this.isFinishButtonDisabled = true;
    },
    disableNextButton: function disableNextButton() {
      this.isNextButtonDisabled = true;
    },
    emitBubbleEvent: function emitBubbleEvent(key$$1) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.$refs.slideDeck.slide(this.currentStep).componentInstance.$emit.apply(this.$refs.slideDeck.slide(this.currentStep).componentInstance, args = [key$$1].concat(args));
      this.$emit.apply(this, args);
    },
    enableButtons: function enableButtons() {
      this.isBackButtonDisabled = false;
      this.isFinishButtonDisabled = false;
      this.isNextButtonDisabled = false;
    },
    enableBackButton: function enableBackButton() {
      this.isBackButtonDisabled = false;
    },
    enableFinishButton: function enableFinishButton() {
      this.isFinishButtonDisabled = false;
    },
    enableNextButton: function enableNextButton() {
      this.isNextButtonDisabled = false;
    },
    finish: function finish(status) {
      var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.errors = errors;
      this.hasFailed = status === false;
      this.isFinished = true;
    },
    index: function index() {
      var key$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return Math.max(0, this.$slots.default.indexOf(find(this.$slots.default, ['key', key$$1 || this.active]) || this.$slots.default[key$$1 || this.active]));
    },
    next: function next() {
      this.$emit('update:step', this.currentStep = Math.min(this.currentStep + 1, this.$refs.slideDeck.slides().length - 1));
    },
    onBeforeEnter: function onBeforeEnter(slide, prev) {
      slide.context.$emit('before-enter', slide, prev);
      this.$emit('before-enter', slide, prev);
    },
    onClickTest: function onClickTest(event) {
      this.isFinished = false;
    },
    onClickBack: function onClickBack(event) {
      this.emitBubbleEvent('back', event);

      if (event.defaultPrevented !== true) {
        this.back();
      }
    },
    onClickFinish: function onClickFinish(event) {
      this.emitBubbleEvent('finish', event);

      if (event.defaultPrevented !== true) {
        this.finish(true);
      }
    },
    onClickNext: function onClickNext(event) {
      this.emitBubbleEvent('next', event);

      if (event.defaultPrevented !== true) {
        this.next();
      }
    },
    onEnter: function onEnter(slide, prev) {
      this.highestStep = Math.max(this.highestStep, this.$refs.slideDeck.$refs.slides.getSlideIndex(slide));
      slide.componentInstance.$refs.wizard = this;
      slide.context.$emit('enter', slide, prev);
      this.$emit('enter', slide, prev);
    },
    onLeave: function onLeave(slide, prev) {
      slide.context.$emit('leave', slide, prev);
      this.$emit('leave', slide, prev);
    },
    onProgressClick: function onProgressClick(event, slide) {
      if (this.$refs.slideDeck) {
        this.currentStep = this.$refs.slideDeck.$refs.slides.getSlideIndex(slide);
      } else {
        this.isFinished = false;
        this.currentStep = this.index(slide.key);
      }
    }
  },
  mounted: function mounted() {
    var slide = this.$refs.slideDeck.slide(this.currentStep);

    if (slide) {
      (slide.componentInstance || slide.context).$refs.wizard = this;
      (slide.componentInstance || slide.context).$emit('enter');
      this.$emit('enter', slide);
    }

    this.steps = this.$refs.slideDeck.slides();
  },
  data: function data() {
    return {
      steps: [],
      errors: null,
      hasFailed: false,
      isFinished: false,
      currentStep: this.index(),
      highestStep: this.index(this.completed),
      isBackButtonDisabled: this.backButton === false,
      isNextButtonDisabled: this.nextButton === false,
      isFinishButtonDisabled: this.finishButton === false
    };
  }
};

/* script */
            const __vue_script__$1C = script$1D;
/* template */
var __vue_render__$1t = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "wizard" },
    [
      _vm.header && !_vm.isFinished
        ? _c("wizard-header", {
            ref: "header",
            domProps: { innerHTML: _vm._s(_vm.header) }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.isFinished
        ? _c("wizard-progress", {
            ref: "progress",
            attrs: {
              active: _vm.currentStep,
              "highest-step": _vm.highestStep,
              steps: _vm.steps
            },
            on: { click: _vm.onProgressClick }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { ref: "content", staticClass: "wizard-content" },
        [
          !_vm.isFinished ? _vm._t("content") : _vm._e(),
          _vm._v(" "),
          !_vm.isFinished
            ? _c(
                "slide-deck",
                {
                  ref: "slideDeck",
                  attrs: {
                    active: _vm.currentStep,
                    "resize-model": _vm.resizeMode
                  },
                  on: {
                    "before-enter": _vm.onBeforeEnter,
                    enter: _vm.onEnter,
                    leave: _vm.onLeave
                  }
                },
                [_vm._t("default")],
                2
              )
            : _vm.isFinished && !_vm.hasFailed
              ? _vm._t("success", [_c("wizard-success", { ref: "success" })])
              : _vm.isFinished && _vm.hasFailed
                ? _vm._t("error", [
                    _c("wizard-error", {
                      ref: "error",
                      attrs: { errors: _vm.errors },
                      on: { back: _vm.onClickTest }
                    })
                  ])
                : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      !_vm.isFinished
        ? _vm._t("buttons", [
            _c("hr"),
            _vm._v(" "),
            _c("wizard-buttons", {
              ref: "buttons",
              attrs: {
                size: "lg",
                steps: _vm.steps,
                active: _vm.currentStep,
                activity: _vm.activity,
                "back-button": !_vm.isBackButtonDisabled,
                "next-button": !_vm.isNextButtonDisabled,
                "finish-button": !_vm.isFinishButtonDisabled
              },
              on: {
                "click:back": _vm.onClickBack,
                "click:finish": _vm.onClickFinish,
                "click:next": _vm.onClickNext
              }
            })
          ])
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$1t = [];
__vue_render__$1t._withStripped = true;

  /* style */
  const __vue_inject_styles__$1C = undefined;
  /* scoped */
  const __vue_scope_id__$1C = undefined;
  /* module identifier */
  const __vue_module_identifier__$1C = undefined;
  /* functional template */
  const __vue_is_functional_template__$1C = false;
  /* component normalizer */
  function __vue_normalize__$1C(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/justinkimbrell/Github/vue-interface/src/Components/Wizard/Wizard.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Wizard = __vue_normalize__$1C(
    { render: __vue_render__$1t, staticRenderFns: __vue_staticRenderFns__$1t },
    __vue_inject_styles__$1C,
    __vue_script__$1C,
    __vue_scope_id__$1C,
    __vue_is_functional_template__$1C,
    __vue_module_identifier__$1C,
    undefined,
    undefined
  );

VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Wizard: Wizard,
      WizardButtons: WizardButtons,
      WizardHeader: WizardHeader,
      WizardProgress: WizardProgress,
      WizardStep: WizardStep,
      WizardSuccess: WizardSuccess,
      WizardError: WizardError
    });
  }
});



var components$1 = /*#__PURE__*/Object.freeze({
    ActivityIndicator: ActivityIndicator,
    Alert: Alert,
    AlertClose: AlertClose,
    AlertHeading: AlertHeading,
    AlertLink: AlertLink,
    Badge: Badge,
    BaseForm: BaseForm,
    Breadcrumb: Breadcrumb,
    BreadcrumbItem: BreadcrumbItem,
    Btn: Btn,
    BtnActivity: BtnActivity,
    BtnFile: BtnFile,
    BtnGroup: BtnGroup,
    BtnGroupToggle: BtnGroupToggle,
    BtnToolbar: BtnToolbar,
    BtnDropdown: BtnDropdown,
    Card: Card,
    CardBody: CardBody,
    CardBtnGroup: CardBtnGroup,
    CardDeck: CardDeck,
    CardFooter: CardFooter,
    CardHeader: CardHeader,
    CardImg: CardImg,
    CardImgTop: CardImgTop,
    CardImgBottom: CardImgBottom,
    CardImgOverlay: CardImgOverlay,
    CardLink: CardLink,
    CardSubtitle: CardSubtitle,
    CardTitle: CardTitle,
    CheckboxField: CheckboxField,
    Container: Container,
    DropdownMenu: DropdownMenu,
    DropdownMenuItem: DropdownMenuItem,
    DropdownMenuHeader: DropdownMenuHeader,
    DropdownMenuDivider: DropdownMenuDivider,
    Dropzone: Dropzone,
    FileField: FileField,
    FilePreview: FilePreview,
    FormControl: FormControl$1,
    FormFeedback: FormFeedback,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    HelpText: HelpText,
    InfiniteScrolling: InfiniteScrolling,
    InputField: InputField,
    InputGroup: InputGroup,
    InputGroupAppend: InputGroupAppend,
    InputGroupPrepend: InputGroupPrepend,
    InputGroupText: InputGroupText,
    LightSwitchField: LightSwitchField,
    ListGroup: ListGroup,
    ListGroupItem: ListGroupItem,
    Navbar: Navbar,
    NavbarBrand: NavbarBrand,
    NavbarCollapse: NavbarCollapse,
    NavbarNav: NavbarNav,
    NavbarText: NavbarText,
    NavbarToggler: NavbarToggler,
    NavbarTogglerIcon: NavbarTogglerIcon,
    Modal: Modal,
    ModalBackdrop: ModalBackdrop,
    ModalBody: ModalBody,
    ModalContent: ModalContent,
    ModalDialog: ModalDialog,
    ModalFooter: ModalFooter,
    ModalHeader: ModalHeader,
    ModalTitle: ModalTitle,
    Navigation: Navigation,
    NavigationError: NavigationError,
    NavigationItem: NavigationItem,
    NavigationLink: NavigationLink,
    NavigationDropdown: NavigationDropdown,
    Overlay: Overlay,
    Pagination: Pagination,
    Popover: Popover,
    PopoverBody: PopoverBody,
    PopoverHeader: PopoverHeader,
    ProgressBar: ProgressBar,
    RadioField: RadioField,
    SelectField: SelectField,
    SlideDeck: SlideDeck,
    Slides: Slides,
    TableView: TableView,
    TextareaField: TextareaField,
    ThumbnailList: ThumbnailList,
    ThumbnailListItem: ThumbnailListItem,
    UploadField: UploadField,
    Wizard: Wizard,
    WizardButtons: WizardButtons,
    WizardHeader: WizardHeader,
    WizardProgress: WizardProgress,
    WizardStep: WizardStep,
    WizardSuccess: WizardSuccess
});

var STYLE_ATTRIBUTES = ['font', 'fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontVariantCaps', 'fontVariantNumeric', 'fontVariantEastAsian', 'fontWeight', 'lineHeight', 'letterSpacing', 'padding', 'margin', 'textAlign', 'textAlignLast', 'textDecoration', 'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'textDecorationSkipInk', 'textDecorationPosition', 'textIndent', 'textRendering', 'textShadow', 'textSizeAdjust', 'textOverflow', 'textTransform', 'width', 'wordBreak', 'wordSpacing', 'wordWrap'];

function int(str) {
  if (typeof str === 'number') {
    return str;
  } else if (!str || !str.replace) {
    return 0;
  }

  return parseInt(str.replace(/[^\d.]+/g, ''));
}

function input(div, el) {
  div.innerHTML = el.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function height(el) {
  return int(el.getBoundingClientRect().height);
}

function style(el, attr) {
  return window.getComputedStyle(el)[attr];
}

function resize(target, div, minHeight, maxHeight) {
  var dynamicHeight = Math.max(height(div) + int(style(div, 'lineHeight')), minHeight);
  target.style.height = (!maxHeight || dynamicHeight < maxHeight ? dynamicHeight : maxHeight) + 'px';
}
/*
function setMinHeight(div, el) {
    div.style.minHeight = height(el) + 'px';
}
*/


function mimic(el) {
  var div = document.createElement('div');
  var styles = window.getComputedStyle(el);

  for (var i in STYLE_ATTRIBUTES) {
    var key = STYLE_ATTRIBUTES[i];
    div.style[key] = styles[key];
  }

  div.style.position = 'absolute';
  div.style.bottom = '100%';
  div.style.zIndex = -1;
  div.style.visibility = 'hidden';
  return div;
}

function init(el, maxHeight) {
  var div = mimic(el);
  var minHeight = height(el);
  el.addEventListener('input', function (event) {
    input(div, event.target);
    resize(el, div, minHeight, maxHeight);
  });
  document.body.appendChild(div);
  input(div, el);
  resize(el, div, minHeight, maxHeight);
}

var Autogrow = {
  inserted: function inserted(el, binding, vnode) {
    if (el.tagName.toLowerCase() !== 'textarea') {
      el = el.querySelector('textarea');
    }

    if (!el) {
      throw new Error('A textarea is required for the v-autogrow directive.');
    }

    init(el, binding.value);
  }
};

function show(el, target, vnode) {
  target.classList.remove('collapse');
  target.classList.add('show');
  target.$collapsedHeight = getComputedStyle(target).height;
  target.classList.add('collapsing');
  vnode.context.$nextTick(function () {
    target.style.height = target.$collapsedHeight;
  });
  transition(target).then(function (delay) {
    target.style.height = null;
    target.classList.add('collapse');
    target.classList.remove('collapsing');
    el.classList.remove('collapsed');
  });
}

function hide(el, target, vnode) {
  target.style.height = target.$collapsedHeight;
  target.classList.add('collapsing');
  target.classList.remove('collapse');
  vnode.context.$nextTick(function () {
    target.style.height = 0;
  });
  transition(target).then(function (delay) {
    target.style.height = null;
    target.classList.add('collapse');
    target.classList.remove('show', 'collapsing');
    el.classList.add('collapsed');
  });
}

var Collapse = {
  inserted: function inserted(el, binding, vnode) {
    if (isUndefined(binding.value) || binding.value === true) {
      el.classList.add('collapsed');
      el.setAttribute('data-toggle', 'collapse');
      var target = el.getAttribute('data-target') || el.getAttribute('href');
      var elements = document.querySelectorAll(target);
      el.addEventListener('click', function (event) {
        elements.forEach(function (element) {
          if (!element.classList.contains('show')) {
            show(el, element, vnode);
          } else {
            hide(el, element, vnode);
          }
        });
        event.preventDefault();
      });
      elements.forEach(function (element) {
        /*
        if(!element.$collapsedHeight) {
            element.$collapsedHeight = getComputedStyle(element).height;
        }
        */
        if (!element.classList.contains('collapse')) {
          element.classList.add('collapse');
        }
      });
    }
  }
};

var Slug = {
  inserted: function inserted(el, binding, vnode) {
    var input = el.querySelector('input, textarea') || el;
    var value = get(vnode.context, binding.expression);
    var editable = !input.value;

    var update = function update(value) {
      if (editable) {
        input.value = kebabCase(value);
        input.dispatchEvent(new Event('input'));
      }
    };

    vnode.context.$watch(binding.expression, update);
    input.addEventListener('keyup', function (event) {
      input.value = kebabCase(event.target.value) + (event.target.value.match(/\s$/) ? ' ' : '');
    });
    input.addEventListener('input', function (event) {
      if (event instanceof InputEvent) {
        editable = !event.target.value;
      }
    });
    input.addEventListener('blur', function (event) {
      input.value = kebabCase(event.target.value || binding.expression.split('.').reduce(function (o, i) {
        return o[i];
      }, vnode.context));
      input.dispatchEvent(new Event('input'));
    });
    !input.value && update(value);
  }
};



var directives$1 = /*#__PURE__*/Object.freeze({
    Autogrow: Autogrow,
    Collapse: Collapse,
    Slug: Slug
});

function blob(url, progress) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    if (isFunction(progress)) {
      xhr.onprogress = function (e) {
        return progress(e, xhr);
      };
    }

    xhr.onerror = function (e) {
      return reject(e);
    };

    xhr.onabort = function (e) {
      return reject(e);
    };

    xhr.onload = function (e) {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(e);
      }
    };

    xhr.send();
  });
}

function elapsed(milliseconds, callback, elapsedCallback) {
  var hasElapsed = false;

  function start() {
    return setTimeout(function () {
      hasElapsed = true;

      if (isFunction(elapsedCallback)) {
        elapsedCallback();
      }
    }, milliseconds);
  }

  function stop() {
    clearTimeout(interval);
  }

  var interval = start();
  var promise = new Promise(function (resolve, reject) {
    function resolver(resolver, response) {
      return resolver(response || hasElapsed);
    }
    callback(wrap(resolve, resolver), wrap(reject, resolver));
  });
  return promise.finally(stop, stop);
}

var easings = {
  linear: function linear(t) {
    return t;
  },
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
function scrollTo(destination) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'easeInQuad';
  var viewport = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!viewport) {
    viewport = document.querySelector('body');
  }

  var viewportBounds = viewport.getBoundingClientRect();
  var destinationBounds = destination.getBoundingClientRect();
  var destinationOffsetToScroll = Math.ceil(destinationBounds.top + document.documentElement.scrollTop);

  function isScrollBottom() {
    return document.documentElement.scrollTop >= Math.floor(viewportBounds.height) - window.innerHeight;
  }

  return new Promise(function (resolve, reject) {
    var startTime = performance.now();
    var isStartingBottom = isScrollBottom();

    function scroll() {
      var start = document.documentElement.scrollTop;
      var time = Math.min(1, (performance.now() - startTime) / duration);
      var timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

      if (document.documentElement.scrollTop === destinationOffsetToScroll || isScrollBottom() && !isStartingBottom) {
        resolve();
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
  });
}

var CALLBACKS = {};

function id$1(callback) {
  return findIndex$1(CALLBACKS, function (compare) {
    return callback.toString() === compare.toString();
  });
}

function restart(callback, milliseconds) {
  stop(id$1(callback));
  start(callback, milliseconds);
}

function stop(id) {
  clearTimeout(id);
  delete CALLBACKS[id];
}

function start(callback, milliseconds) {
  CALLBACKS[setTimeout(callback, milliseconds)] = callback;
}

function wait(milliseconds, callback) {
  return new Promise(function (resolve, reject) {
    function resolver(resolver, response) {
      return resolver(response);
    }
    restart(wrap(callback, function (callback) {
      return callback(wrap(resolve, resolver), wrap(reject, resolver));
    }), milliseconds);
  });
}

var main = VueInstaller.use({
  install: function install(Vue) {
    VueInstaller.plugins(Vue, plugins$1);
    VueInstaller.filters(Vue, filters);
    VueInstaller.directives(Vue, directives$1);
    VueInstaller.components(Vue, components$1);
  }
});

export default main;
export { Model, Request, Response, Colorable, FormControl as FormControlMixin, HasSlots, MergeClasses, Proxy$1 as Proxy, Screenreaders, Sizeable, Triggerable, Variant, blob, elapsed, instantiate, prefix, readFile, script$1 as script, scrollTo, transition, unit, uuid, wait, modal, overlay, popover, ActivityIndicator, Alert, AlertClose, AlertHeading, AlertLink, Badge, BaseForm, Breadcrumb, BreadcrumbItem, Btn, BtnActivity, BtnFile, BtnGroup, BtnGroupToggle, BtnToolbar, BtnDropdown, Card, CardBody, CardBtnGroup, CardDeck, CardFooter, CardHeader, CardImg, CardImgTop, CardImgBottom, CardImgOverlay, CardLink, CardSubtitle, CardTitle, CheckboxField, Container, DropdownMenu, DropdownMenuItem, DropdownMenuHeader, DropdownMenuDivider, Dropzone, FileField, FilePreview, FormControl$1 as FormControl, FormFeedback, FormGroup, FormLabel, HelpText, InfiniteScrolling, InputField, InputGroup, InputGroupAppend, InputGroupPrepend, InputGroupText, LightSwitchField, ListGroup, ListGroupItem, Navbar, NavbarBrand, NavbarCollapse, NavbarNav, NavbarText, NavbarToggler, NavbarTogglerIcon, Modal, ModalBackdrop, ModalBody, ModalContent, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Navigation, NavigationError, NavigationItem, NavigationLink, NavigationDropdown, Overlay, Pagination, Popover, PopoverBody, PopoverHeader, ProgressBar, RadioField, SelectField, SlideDeck, Slides, TableView, TextareaField, ThumbnailList, ThumbnailListItem, UploadField, Wizard, WizardButtons, WizardHeader, WizardProgress, WizardStep, WizardSuccess, Autogrow, Collapse, Slug, DateFilter, MomentFilter };
//# sourceMappingURL=vue-interface.es.js.map
