import { persistReducer } from "redux-persist";

import searchReducer from "@/store/features/searchSlice";
import authReducer from "@/store/features/authSlice";
import bookingReducer from "@/store/features/bookingSlice";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

export const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersist = {
  key: "auth",
  storage,
};

const searchReducerPersist = {
  key: "search",
  storage,
};
const bookingReducerPersist = {
  key: "booking",
  storage,
};
const persistedAuthReducer = persistReducer(authPersist, authReducer);
const persistedSearchReducer = persistReducer(
  searchReducerPersist,
  searchReducer
);
const persistedBookingReducer = persistReducer(
  bookingReducerPersist,
  bookingReducer
);

export const reducer = {
  auth: persistedAuthReducer,
  search: persistedSearchReducer,
  booking: persistedBookingReducer,
};
