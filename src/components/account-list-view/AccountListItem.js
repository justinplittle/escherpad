/** Created by ge on 5/30/16. */
import React, {Component, PropTypes} from "react";
import MouseOver from "../mouseover/MouseOver";
import TwoColumn from "../two-column/TwoColumn";
import BadgeWithControl from "../badge/BadgeWithControl";

import dapi from "../../modules/dropbox";

require('./account-list-view.scss');

const {object, func} = PropTypes;
export default class ListItem extends Component {
  static propTypes = {
    account: object,
    post: object,
    dispatch: func
  };

  removeAccount() {
    var {post, account, dispatch} = this.props;
    var action = {
      type: "DELETE_ACCOUNT",
      account: account
    };
    dispatch(action);
  }

  selectAccount() {
    var {post, account, dispatch} = this.props;

    dapi.updateAccessToken(account.accessToken);
    dapi.list('').then(data => {
      // simple no cursor support version
      console.log(data);
      dispatch({
        type: "",
        cursor: data.cursor,
        entries: data.entries
      })
    });

    var action = {
      type: "UPSERT_BINDR",
      bindr: {
        // path: to the dropbox folder
      }
    };
    dispatch(action);
  }


  render() {
    var {post, account, dispatch} = this.props;
    return (
      <TwoColumn className="account-list-item"
                 onClick={this.selectAccount.bind(this)}
                 col1={(
                   <span>Dropbox Configured As</span>
                 )}
                 col2={(
                   <BadgeWithControl className="account-badge"
                                     style={{backgroundColor: "#23aaff", color: "white"}}
                                     text={(account.email || "email is not available")}
                                     icon={(
                                       <MouseOver>
                                         <i data-mouseOver className="material-icons"
                                            onClick={this.removeAccount.bind(this)}>cancel</i>
                                         <i data-mouseDefault className="material-icons">clear</i>
                                       </MouseOver>
                                     )}
                   ></BadgeWithControl>
                 )}
      ></TwoColumn>
    )
  }
}
