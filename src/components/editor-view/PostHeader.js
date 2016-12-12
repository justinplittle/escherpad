/** Created by ge on 3/23/16. */
import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Flex, FlexItem, Responsive} from 'layout-components';
import FullScreenToggleButton from "./FullScreenToggleButton";
import Button from "../form/Button";
import SaveToBackEndBadge from "./SaveToBackEndBadge";

import {createPost} from "../../store/posts/posts";

const containerStyle = {
  position: "relative",
  left: 0,
  right: 0,
  height: "50px"
};
const {any, func} = PropTypes;
export default class PostHeader extends Component {
  static propTypes = {
    style: any,
    viewMode: any,
    dispatch: func.isRequired
  };

  @autobind
  createNewNote() {
    const {dispatch} = this.props;
    const action = createPost();
    dispatch(action);
    const postId = action.post.id;
    dispatch({type: "SELECT_POST", post: postId});
  }

  render() {
    let {viewMode, dispatch, ..._props} = this.props;
    let post = _props.post;
    return (
      <Flex row fill style={containerStyle} align="center">
        <Responsive breakPoints={{sm: 979}}>
          <FullScreenToggleButton data-default viewMode={viewMode} dispatch={dispatch}/>
          <FlexItem fixed data-sm style={{"padding": "0 8px", height: "25px", width: "40px", textAlign: "center"}}>
            <i className="material-icons" style={{color: "#cfcfcf", fontSize: "25px", cursor: "pointer"}}>menu</i>
          </FlexItem>
        </Responsive>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <Button
            className="add-new-post"
            color="rgb(240, 173, 50)"
            backgroundColor="rgba(240, 173, 50, 0)"
            hoverColor="white"
            hoverBackground="rgb(240, 173, 50)"
            activeBackground="rgba(240, 173, 50, 0.5)"
            onClick={this.createNewNote}
            padding="0 28px 0 12px"
          >New Note<
            i className="material-icons"
              style={{fontSize: "18px", lineHeight: "32px", position: "absolute", marginRight: "-23px", width: "24px"}}>add</i
          ></Button>
        </FlexItem>
        <FlexItem>
          <SaveToBackEndBadge dispatch={dispatch} {..._props}/>
        </FlexItem>
        <FlexItem fixed style={{"padding": "0 5px"}}>
          <Button className="add-new-post"
                  height="25px"
                  radius="13px"
                  color="#d5d5d5"
                  backgroundColor="rgba(0, 0, 0, 0)"
                  hoverColor="white"
                  hoverBackground="#23aaff"
                  activeBackground="#23aaff"
                  padding="0 8px 0 8px">tag with bindr...</Button>
        </FlexItem>
        <FlexItem fluid/>
      </Flex>
    )
  }
}

