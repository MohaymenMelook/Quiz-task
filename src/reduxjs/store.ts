import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./features/quizzez/quizSlice";

export const store = configureStore({
  reducer: { quizzes: quizSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
