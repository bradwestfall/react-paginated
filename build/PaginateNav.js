"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PaginateNav = function PaginateNav(_ref) {
  var children = _ref.children,
      fragment = _ref.fragment,
      range = _ref.range,
      rest = _objectWithoutProperties(_ref, ["children", "fragment", "range"]);

  var _useContext = (0, _react.useContext)(_Context.default),
      renderResults = _useContext.renderResults,
      totalResults = _useContext.totalResults,
      results = _useContext.results,
      page = _useContext.page,
      resultsPerPage = _useContext.resultsPerPage;

  if (!renderResults) return null;
  var totalPages = Math.ceil(totalResults / resultsPerPage);
  if (totalPages === 1) return null;
  var totalRange = range * 2 + 1;
  var rangeStart = page - range >= 1 ? page - range : 1;
  var rangeEnd = page + range <= totalPages ? page + range : totalPages;
  rangeStart = rangeEnd - rangeStart < totalPages && rangeEnd === totalPages ? Math.max(totalPages - totalRange, 1) : rangeStart;
  rangeEnd = rangeEnd - rangeStart < totalRange && rangeStart === 1 ? Math.min(totalRange, totalPages) : rangeEnd; // This can often times be the same as `page` but not if we're on the
  // far ends of the spectrum

  var midRange = Math.ceil(rangeEnd - totalRange / 2);
  var pages = Array.from(Array(totalPages)).map(function (x, i) {
    return {
      page: i + 1
    };
  });
  var args = {
    pages: pages,
    totalResults: totalResults,
    onPage: page,
    resultsPerPage: resultsPerPage,
    totalPages: totalPages,
    range: range,
    totalRange: totalRange,
    rangeStart: rangeStart,
    rangeEnd: rangeEnd,
    midRange: midRange
  };
  return fragment ? children(args) : _react.default.createElement("div", rest, children(args));
};

PaginateNav.defaultProps = {
  fragment: false,
  range: 2
};
PaginateNav.propTypes = {
  children: _propTypes.default.func.isRequired,
  fragment: _propTypes.default.bool,
  range: _propTypes.default.number
};
var _default = PaginateNav;
exports.default = _default;