import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { todoReducer } from "./reducers";

export default function createStore() {
  // const store = reduxCreateStore(
  //   combineReducers({
  //     todo: todoReducer,
  //   }),
  //   applyMiddleware(
  //     logger,
  //   )
  // );

	const store = reduxCreateStore(todoReducer,
    applyMiddleware(
      logger,
    )
  );

  return store;
}