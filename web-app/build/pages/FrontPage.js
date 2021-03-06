'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    font-family: \'Lato\', sans-serif;\n    background-color: #efefef\n'], ['\n    font-family: \'Lato\', sans-serif;\n    background-color: #efefef\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    cursor: pointer;\n    > span {\n        flex: 0 0 auto;\n        margin: 0 13px;\n        font-size: 15px;\n        padding: 4px 2;\n        border-top: solid 3px transparent;\n        border-bottom: solid 3px transparent;\n    }\n    :hover > span {\n        border-bottom: solid 3px #23aaff\n    }\n'], ['\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    cursor: pointer;\n    > span {\n        flex: 0 0 auto;\n        margin: 0 13px;\n        font-size: 15px;\n        padding: 4px 2;\n        border-top: solid 3px transparent;\n        border-bottom: solid 3px transparent;\n    }\n    :hover > span {\n        border-bottom: solid 3px #23aaff\n    }\n']);

exports.default = FrontPage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFade = require('react-fade');

var _reactFade2 = _interopRequireDefault(_reactFade);

var _layoutComponents = require('layout-components');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styled = (0, _styledComponents2.default)(_layoutComponents.Flex)(_templateObject);
var HeaderButton = (0, _styledComponents2.default)(_layoutComponents.FlexItem)(_templateObject2);
function FrontPage(props) {
    var listSections = [];
    return _react2.default.createElement(
        Styled,
        { fill: true, column: true, style: { backgroundImage: "linear-gradient(-40deg, #FF008C, #E1FF00)" } },
        _react2.default.createElement(
            _layoutComponents.FlexItem,
            { fixed: true, component: _layoutComponents.Flex, row: true, align: 'stretch', height: 70,
                style: { backgroundColor: 'transparent', padding: "0 400px" } },
            _react2.default.createElement(
                HeaderButton,
                { style: { fontSize: "19px" } },
                'Escherpad'
            ),
            _react2.default.createElement(_layoutComponents.FlexSpacer, null),
            _react2.default.createElement(
                HeaderButton,
                null,
                _react2.default.createElement(
                    'span',
                    null,
                    'Beta'
                )
            ),
            _react2.default.createElement(
                HeaderButton,
                null,
                _react2.default.createElement(
                    'span',
                    null,
                    'Sign In'
                )
            ),
            _react2.default.createElement(
                HeaderButton,
                null,
                _react2.default.createElement(
                    'span',
                    null,
                    'Your Teams'
                )
            )
        )
    );
}
//# sourceMappingURL=FrontPage.js.map