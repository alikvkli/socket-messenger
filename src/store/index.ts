import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage/session';
import appSlice from "../features/app";

const encryptor = encryptTransform({
    secretKey: 'hVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x'
});

const reducers = combineReducers({
    app:appSlice
});

const persistConfig = {
    key: 'root',
    storage: storage,
    transforms: [encryptor]
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: typeof window !== undefined ? persistedReducer : reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: process.env.NODE_ENV === 'development'
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;