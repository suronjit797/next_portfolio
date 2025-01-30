import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import helperReducer from "./features/helperSlice";
import themeReducer from "./features/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import socketReducer from "./features/socketSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  helper: helperReducer,
  theme: themeReducer,
  socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export const persistor = persistStore(store);
export const persistor = persistStore(store)

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define a custom hook for useDispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
