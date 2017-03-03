/** Created by ge on 4/18/16. */
import {dropboxAccountKey, dropboxDateStringToIntDate} from "./accounts/accounts";
export const ORDER_POSTS_BY = "ORDER_POSTS_BY";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";
export const SET_CURRENT_FOLDER = "SET_CURRENT_FOLDER";

export function postList(state = {orderBy: "modifiedAt", searchQuery: ""}, action) {
  if (action.type === ORDER_POSTS_BY) {
    return {...state, orderBy: action.orderBy};
  } else if (action.type === UPDATE_SEARCH_QUERY) {
    return {...state, searchQuery: action.query};
  } else if (action.type === SET_CURRENT_FOLDER) {
    return {
      ...state,
      accountKey: action.accountKey,
      //reminder: [Call this `currentFolder`, because it is easier to change by *replace*] should this be called `currentFolder`, or parentFolder?
      currentFolder: action.folder
    };
  } else {
    return state;
  }
}

// action creator
export function setCurrentFolder(accountKey, folder) {
  "use strict";
  return {
    type: SET_CURRENT_FOLDER,
    accountKey,
    folder
  };
}

import dapi from "../modules/dropbox";
import {createPost, PULL_POST_FROM_SERVICE} from "./posts/posts";
import {take, dispatch, call} from "luna-saga";
import {getParentFolder} from "../components/account-list-view/BrowserColumnView";

let QUERIES = ["*.md", "*.ink", "*.url", "*.txt", "*.doc", "*.pdf"];

function* listFilesByExtension(accessToken, accountKey, extension, parentFolder) {
  console.warn(`searchQuery ${extension}; parentFolder ${parentFolder}`);
  dapi.updateAccessToken(accessToken);
  let searchResponse = yield dapi.search(extension, parentFolder, 0, 100, "filename");

  if (searchResponse.matches) {
    for (let ind in searchResponse.matches) {
      const metadata = searchResponse.matches[ind].metadata;
      if (metadata) {
        console.log("metadata is", metadata);
      } else {
        console.warn('metadata is not defined.', searchResponse.matches[ind]);
      }
      const {type, post} = createPost();
      const {id, name: title, path_display: parentFolder} = metadata;
      const modifiedAt = dropboxDateStringToIntDate(metadata.client_modified || metadata.server_modified);
      yield dispatch({
        type,
        post: {
          ...post,
          //reminder: local post id is inconsistent with dropbox id.
          id,
          title,
          parentFolder: parentFolder.split('/').slice(0, -1).join('/'),
          modifiedAt,
          accountKey: accountKey
        }
      });
      // yield dispatch({type: PULL_POST_FROM_SERVICE, parentFolder, postId: id})
    }
  }
}

export function* onSetCurrentFolder() {
  "use strict";
  while (true) {
    let {state, action} = yield take(SET_CURRENT_FOLDER);
    if (!action.accountKey) {
      //notice: accountKey is not defined when at root
      console.info('accountKey is undefined. Do not download folder.');
    } else if (!action.folder) {
      console.warn('reached root folder, do NOT download search result here since there will be too many');
    } else {
      const account = state.accounts[action.accountKey];
      if (!account) {
        console.warn("account not found by key:", action.accountKey);
      } else {
        if (account.service === "dropbox") {
          for (let k in QUERIES) {
            const extension = QUERIES[k];
            yield call(listFilesByExtension, account.accessToken, action.accountKey, extension, action.folder);
          }
        }
      }
    }
  }
}
