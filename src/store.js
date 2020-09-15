import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Reducers/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    blacklist: ['form', 'drawerReducer'],
    storage: storage,
}

let middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(...middlewares))
    let persistor = persistStore(store)
    return { store, persistor }
}
