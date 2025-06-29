"use client";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@/store/features/searchSlice";
import authReducer from "@/store/features/authSlice";
import bookingReducer from "@/store/features/bookingSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    booking: bookingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
