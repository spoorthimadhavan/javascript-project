import React from "react";
import { StyleSheet, Text } from "react-native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import reducer from "./src/store/reducer";

const App = () => {
  const rootReducer = combineReducers({
    userData: reducer,
  });

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
