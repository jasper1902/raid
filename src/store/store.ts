import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import itemReducer from "./slices/itemSlice";

const reducer = {
  itemReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
