/** Created by ge on 5/14/16. */
import React, {Component, PropTypes} from "react";
import {parseToken} from "./../modules/dropbox";
import AccountListView from "../components/account-list-view/AccountListView";

const {any, object} = PropTypes;
export default class DropoxRedirectLanding extends Component {

  static propTypes = {
    location: any,
    params: any,
    store: any.isRequired,
    dapi: any.isRequired,
  };

  componentWillMount() {
    var {store, dapi} = this.props;
    var dispatch = store.dispatch.bind(store);

    let {hash, accessToken, tokenType, uid, state} = dapi.onRedirect();
    dispatch({
      type: "UPSERT_ACCOUNT",
      account: {service: "dropbox", uid, accessToken, tokenType}
    });
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    return (
      <div>
        <h1>Your Dropbox Account Is Linked!</h1>
        <h2>Accounts</h2>
        <p>You are now connected to the folder:&nbsp;
          <strong>
            Dropbox
            <i className="material-icons">chevron_right</i>
            Apps
            <i className="material-icons">chevron_right</i>
            Gittor
          </strong> for the following accounts: </p>
        <AccountListView {...this.props} />
      </div>
    );
  }
}
