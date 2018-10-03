import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { todoReducer, authReducer } from "./reducers";

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      todo: todoReducer,
      auth: authReducer
    }),
    applyMiddleware(
      logger,
    )
  );

	// const store = reduxCreateStore(todoReducer,
 //    applyMiddleware(
 //      logger,
 //    )
 //  );

  return store;
}