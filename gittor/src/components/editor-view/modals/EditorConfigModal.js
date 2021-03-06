/** Created by ge on 5/8/16. */
import React, {Component, PropTypes} from "react";
import {Flex, FlexItem} from 'layout-components';
import SimpleModal from "../../modal/SimpleModal";
import Input from "../../form/Input";
import Select from "../../form/Select";

var ace = require('brace');
require('brace/ext/themelist');
require('brace/ext/modelist');
const {themes} = ace.acequire("ace/ext/themelist");
const {modes} = ace.acequire('ace/ext/modelist');

require('./modal-form.scss');
var {any, func} = PropTypes;
export default class EditorConfigModal extends Component {
  static propTypes = {
    options: any,
    dispatch: func.isRequired
  };

  onChange(key) {
    var {options, dispatch} = this.props;
    return function (value) {
      var action = {
        type: "UPDATE_EDITOR_OPTIONS",
        options: {}
      };
      action.options[key] = value;
      dispatch(action);
    }
  }

  render() {
    var {value, onClose, options={}, dispatch, ...props} = this.props;
    return (
      <SimpleModal value={value} onClose={onClose}>
        <Flex column fill>
          <FlexItem fixed>
            <div className="modal-header">
              <h2>
                Editor Settings&nbsp;
                <span className="hint">where you make Gittor your own...</span>
                {/*Settings for:&nbsp;
                 <span style={{color: "#23aaff"}}>{title}</span>*/}
              </h2>
            </div>
          </FlexItem>
          <FlexItem fluid component="form" className="modal-body" onSubmit={e=>e.preventDefault()}>
            <fieldset>
              <legend>Code Editor</legend>
              <div className="control-group">
                <label className="sm-40 right">Editor Key Binding</label>
                <Select className="sm-60" value={options.keyboardHandler} onChange={this.onChange('keyboardHandler')}>
                  <option value="">default</option>
                  <option value="vim">vim</option>
                  <option value="emacs">emacs</option>
                </Select>
              </div>
              <div className="control-group">
                <label className="sm-40 right"><del>file type</del></label>
                <Select className="sm-60" value={options.mode} onChange={this.onChange('mode')}>
                  {modes.map(mode=>(<option key={mode.name} value={mode.name}>{mode.caption}</option>))}
                </Select>
              </div>
              <div className="control-group">
                <label className="sm-40 right">syntax highlighting themes</label>
                <Select className="sm-60" value={options.theme} onChange={this.onChange('theme')}>
                  {themes.map(theme=>(<option key={theme.name} value={theme.name}>{theme.caption}</option>))}
                </Select>
              </div>
              <div className="control-group">
                <label className="sm-40 right">font size</label>
                <Input type="number" className="sm-60" value={options.fontSize} onChange={this.onChange('fontSize')}/>
              </div>
              <div className="control-group">
                <label className="sm-40 right">line height</label>
                <Input type="number" className="sm-60" value={options.lineHeight} onChange={this.onChange('lineHeight')}/>
              </div>
            </fieldset>
            <fieldset>
              <legend>Markdown Preview Settings</legend>
              <div className="control-group">
                <label className="sm-50 right">math deliminator (experimental)</label>
              </div>

            </fieldset>
          </FlexItem>
        </Flex>
      </SimpleModal>);
  }
}
const editorConfig = {
  keyboardHandler: {
    options: ['', 'vim', 'emacs']
  },
  theme: {
    options: ['']
  },
  lineNumber: {
    type: "toggle",
    label: {
      true: "Show",
      false: "hide"
    }
  },
  mode: {
    options: ['markdown']
  },
  fontSize: {
    type: "string"
  },
  autocompletion: {}
};

const markdownConfig = {
  emoji: {
    type: "boolean",
  }
};

