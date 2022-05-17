import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/appSlice";

const store = configureStore({
  reducer: {
    app: counterReducer,
  },
});

export default store;
