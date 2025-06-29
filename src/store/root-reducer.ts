import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import searchReducer from "@/store/features/searchSlice";
import authReducer from "@/store/features/authSlice";
import bookingReducer from "@/store/features/bookingSlice";

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
