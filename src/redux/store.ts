import thunk from 'redux-thunk';
import rootReducer from 'Redux/reducers';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['authReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({ reducer: persistedReducer, middleware: (gDM) => gDM().concat(thunk) });
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const reduxConfig = { store, persistor };
export default reduxConfig;
