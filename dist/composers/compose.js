"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

var _flowRight = _interopRequireDefault(require("lodash/flowRight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Compose a module with actions, getters and additional or custom mutations.
 * @example return compose(composeActions(myActions), composeGetters(myGetters), composeMutations(myCustomMutations)(customModule)
 * @param fns
 * @returns {function(*=)}
 */
function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (moduleObject) {
    return _flowRight.default.apply(void 0, fns)(moduleObject);
  };
}