/** Created by ge on 4/18/16. */
import React from "react";
import {autobind/*, throttle*/} from "core-decorators";
import _throttle from "lodash.throttle";
import {Flex, FlexItem} from 'layout-components';
import Input from "../input/Input";
import Selector from "../../lib/Selector";

import OrderBySelection from "./OrderBySelection";
import {dropboxAccountKey} from "../../store/accounts/accounts";
require('./list-panel.scss');

function throttle(time = 300, options = {}) {
  "use strict";
  return function (target, name, descriptor) {
    descriptor.value = _throttle(descriptor.value, time, options);
    return descriptor;
  };
}

import PostListView from "./PostListView";
var {func, array, any} = React.PropTypes;
class ListPanel extends React.Component {
  static propTypes = {
    agent: any,
    user: any,
    users: any,
    posts: any,
    dispatch: func.isRequired
  };

  componentDidMount() {
    const {posts, postList} = this.props;
    this.updatePosts(posts, postList);
  }

  componentWillReceiveProps(newProp) {
    const {posts, postList} = newProp;
    if (posts !== this.props.posts || postList !== this.props.postList) this.updatePosts(posts, postList);
  }

  @throttle(400)
  updatePosts(posts, {orderBy = "modifiedAt", searchQuery = "", path = "", accountKey}={}) {
    // note: throttling is working perfectly. Otherwise searchQuery update would interrupts the
    // enter and leave animation, making the UX very very bad. This is due to limitations of the
    // animation higher component.
    let orderedPosts = Object.keys(posts)
      .map((_) => posts[_])
      .filter(function (post, index, posts) {
        return (
          !(post.path) || !(post.accountKey) || (
            post.path.match(path) &&
            ((post.accountKey && accountKey) ? post.accountKey === accountKey : true) ||
            //done: corner case: post.accountKey == "localstorage"
            (accountKey === "localstorage" && typeof post.accountKey === "undefined")
          )
        );
      })
      .filter(function (post, index, posts) {
        if (searchQuery !== "") {
          return JSON.stringify(post).toLowerCase().match(searchQuery.toLowerCase())
        } else {
          return true
        }
      })
      .sort((a, b) => (a[orderBy] - b[orderBy]))
      .reverse();
    this.setState({orderedPosts, currentSearchQuery: searchQuery});
  }

  @autobind
  onSearchInput(e) {
    let query = e.target.value;
    this.updateQuery(query);
  }

  updateQuery(query = "") {
    this.props.dispatch({
      type: "UPDATE_SEARCH_QUERY",
      query: query
    })
  }

  render() {
    let {orderedPosts = [], currentSearchQuery} = this.state || {};
    let {dispatch, postList, searchQuery} = this.props;
    return (
      <Flex column fill align="stretch" style={{padding: "0 20px"}} className="list-panel">
        <FlexItem fixed className="search-bar">
          <Input className="search-input"
                 value={postList.searchQuery} icon={"search"}
                 onChange={this.onSearchInput}
                 placeholder={"those needles in haystack..."} style={{width: "100%"}}/>
        </FlexItem>
        <FlexItem fixed>
          <div className="hero" style={{height: "100px", width: "100%"}}>
            <Flex fill row align="center" className="center">
              <FlexItem fixed>
                <button/>
              </FlexItem>
              <FlexItem fluid
                        className="header"
                        style={{textAlign: "center", fontSize: "30px", fontWeight: "500"}}
              >Notes</FlexItem>
              <FlexItem fixed>
                <button></button>
              </FlexItem>
            </Flex>
          </div>
        </FlexItem>
        <FlexItem fixed>
          <Flex row className="tab-bar">
            <FlexItem fixed/>
            <FlexItem fixed/>
            <FlexItem fluid/>
            <OrderBySelection orderBy={postList.orderBy} dispatch={dispatch}/>
          </Flex>
        </FlexItem>
        <PostListView key="list-view" posts={orderedPosts} searchQuery={currentSearchQuery} dispatch={dispatch}/>
      </Flex>
    )
  }
}

export default Selector((store) => {
  "use strict";
  let {agent, user} = store.session;
  let {users, postList, posts} = store;
  return {agent, user, users, posts, postList}
}, ListPanel)
