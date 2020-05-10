import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import {schemeChanger, quiz, userInfo} from './ReduxReducers';

const rootReducer = combineReducers({
  schemeChanger,
  quiz,
  userInfo,
});

const store = createStore(rootReducer, {});

// Init VK  Mini App
bridge.send("VKWebAppInit", {})
  .then(() => console.log('Vk app init!'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
