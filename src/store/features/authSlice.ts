/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/firebase";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// 🔐 Sign in
export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(res);

      return {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || "",
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 📝 Sign up
export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (
    {
      email,
      password,
      displayName,
    }: { email: string; password: string; displayName: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Update the display name
      await updateProfile(res.user, {
        displayName,
      });

      return {
        uid: res.user.uid,
        email: res.user.email!,
        displayName,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🚪 Sign out
export const signOutUser = createAsyncThunk("auth/signOut", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Sign in failed. Please try again.";
      })

      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Sign up failed. Please try again.";
      })

      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
