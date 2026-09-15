import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import issuesReducer from "./issueSlice";

// Persist authentication
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist issues
const issuesPersistConfig = {
  key: "issues",
  storage,
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

const persistedIssuesReducer = persistReducer(
  issuesPersistConfig,
  issuesReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    issues: persistedIssuesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist Redux store
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;