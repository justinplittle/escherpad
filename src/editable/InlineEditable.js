/** Created by ge on 4/10/16. */
import React from 'react';
import ReactDOM from "react-dom";
import Radium from 'radium';

const styles = {
  default: {
    overflowY: "auto", // needed for the auto-resize
    ":focus": {
      outline: "none"
    }
  }
};
@Radium
export default class InlineEditable extends React.Component {
  static propTypes = {
    tagName: React.PropTypes.string,
    style: React.PropTypes.any,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  render() {
    let tagName = this.props.tagName || "div";
    let style = [styles.default, this.props.style];
    let className = this.props.className;
    let isEditable = !(this.props.readOnly);
    let placeholder = this.props.placeholder || "placeholder";
    let props = {
      style: style,
      className: className,
      contentEditable: isEditable,
      onBlur: this.onBlur.bind(this),
      onFocus: this.onFocus.bind(this),
      onInput: this.onInput.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onKeyPress: this.onKeyPress.bind(this),
      onMouseDown: this.onMouseDown.bind(this),
      onTouchStart: this.onTouchStart.bind(this),
      onCopy: this.onCopy.bind(this),
      onPaste: this.onPaste.bind(this),
      onDrag: this.onDrag.bind(this),
      onDrop: this.onDrop.bind(this),
      autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false"
    };
    return React.createElement(tagName, props)
  }

  componentDidMount() {
    this.nativeElement = ReactDOM.findDOMNode(this);
    this.value = this.props.value;
    // console.log(this.value);
  }

  set value(value) {
    this._value = value;
    // processing should happen here.
    let content = this.isEmpty() ? "<br>" : value;
    if (this.nativeElement) this.nativeElement.innerHTML = content;
    this.onChangeValue(this.value);
  }

  get value() {
    // get processing
    return this._value
  }

  // return both value and cursor position together.
  onChangeValue(value) {
    if (!this.props || !this.props.onChange) return;
    let cursor;
    this.props.onChange(value, cursor);
  }

  isEmpty() {
    let value = this.value;
    if (!value || value == "<br>" || value === "<br/>" || value === "<br><br>" || value === "<br/><br/>" || value === "\n" || value === "\n\n") {
      return true
    } else return false;
  }

  resize() {
    let inputElem = ReactDOM.findDOMNode(this);
    let height = inputElem.scrollHeight;
    let originalHeight = inputElem.clientHeight;
    inputElem.style.height = (height - 1 ) + "px";
    while (inputElem.scrollHeight <= height || inputElem.scrollHeight < 1) {
      height--;
      inputElem.style.height = (height - 1 ) + "px";
    }
    inputElem.style.height = inputElem.scrollHeight + "px";
    if (inputElem.clientHeight !== originalHeight) {
      this.nativeElement.dispatchEvent(new CustomEvent("reflow", {target: this.nativeElement}));
    }
  }

  onBlur() {
    this.resize();
  }

  onFocus() {
    this.resize();
  }

  onInput(e) {
    let value = e.target.innerHTML;
    if (this.props.onChange) this.props.onChange(value);
    this.resize();
  }

  onKeyDown() {
    this.resize();
  }

  onKeyUp() {
  }

  onKeyPress() {
  }

  onMouseDown() {
  }

  onTouchStart() {
  }

  onCopy() {
  }

  onPaste() {
  }

  onDrag() {
  }

  onDrop() {
  }
}


