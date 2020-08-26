import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './RootReducer';

const middlewares = [thunk];
const enhancers = applyMiddleware(...middlewares);

const store = createStore(
    rootReducer,
    compose(enhancers)
);

export default store;
