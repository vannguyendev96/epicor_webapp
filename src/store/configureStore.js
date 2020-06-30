import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';
import { logActions, loginFlow,counter } from './../sagas';

function saveToLocalStorage(state){
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState);
  } catch (error) {
    console.log(error);
  }
}

function loadFromLocalStorage(){
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null ) return undefined;
    return JSON.parse(serializedState);
   } catch (error) {
    console.log(error);
    return undefined;
  }
}


export default function configureStore() {

  const persistedState = loadFromLocalStorage();
  
  const sagaMiddleware = createSagaMiddleware()
  const composeArgs = [
    applyMiddleware(sagaMiddleware),
  ];
  if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    rootReducer,
    persistedState,
    compose.apply(undefined, composeArgs)
  );

  store.subscribe(() => saveToLocalStorage(store.getState()));

  sagaMiddleware.run(loginFlow);
  sagaMiddleware.run(logActions);
  sagaMiddleware.run(counter);

  return store;
}