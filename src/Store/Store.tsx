import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ApiSlice } from "./ApiSlice";
import { useDispatch } from "react-redux";
import CustomerListSlice from "./Reducer/CustomerListSlice";
import CustomerAnalystSlice from "./Reducer/CustomerAnalystSlice";
import AuthSlice from "./Reducer/AuthSlice";
import CustomerSupportSlice from "./Reducer/CustomerSupportSlice";

const reducers: any = combineReducers({
  // [ApiSlice.reducerPath] : ApiSlice.reducer,
  customersList:CustomerListSlice,
  customerAnalyst:CustomerAnalystSlice,
  authentication: AuthSlice,
  customerSupport: CustomerSupportSlice
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }).concat(ApiSlice.middleware),
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;