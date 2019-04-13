"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Paginate = function Paginate(_ref) {
  var children = _ref.children,
      totalResults = _ref.totalResults,
      results = _ref.results,
      page = _ref.page,
      resultsPerPage = _ref.resultsPerPage,
      fragment = _ref.fragment,
      rest = _objectWithoutProperties(_ref, ["children", "totalResults", "results", "page", "resultsPerPage", "fragment"]);

  if (!page || !resultsPerPage) return null;
  return _react.default.createElement(_Context.default.Provider, {
    value: {
      totalResults: totalResults,
      results: results,
      page: page,
      resultsPerPage: resultsPerPage,
      // Are we rendering results
      renderResults: totalResults > 0 && Array.isArray(results) && results.length > 0
    }
  }, fragment ? children : _react.default.createElement("div", rest, children));
};

var _default = Paginate;
exports.default = _default;