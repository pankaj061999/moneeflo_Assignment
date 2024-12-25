import { combineReducers } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import user from "./slices/user";

export type RootState = ReturnType<typeof rootReducer>;

const rootPersistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["user"], 
};

const rootReducer = combineReducers({
  user, 
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
