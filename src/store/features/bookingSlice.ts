/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO:Fixe the type here
import { Flight } from "@/lib/convertToIFlight";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface PassengerInfo {
  id: string;
  type: "adult" | "child" | "infant";
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  passportNumber?: string;
  nationality: string;
  email?: string;
  phone?: string;
}

interface BookingDetails {
  flightId: string;
  passengers: PassengerInfo[];
  totalPrice: number;
  bookingReference?: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface BookingState {
  selectedFlight: Flight | null;
  bookingDetails: BookingDetails | null;
  isLoading: boolean;
  error: string | null;
  bookingHistory: BookingDetails[];
}

const initialState: BookingState = {
  selectedFlight: null,
  bookingDetails: null,
  isLoading: false,
  error: null,
  bookingHistory: [],
};

export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async (bookingData: BookingDetails) => {
    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const bookingReference =
      "TBP" + Math.random().toString(36).substr(2, 9).toUpperCase();

    return {
      ...bookingData,
      bookingReference,
      status: "confirmed" as const,
    };
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    updatePassengerInfo: (
      state,
      action: PayloadAction<{
        passengerId: string;
        field: string;
        value: string | Date | null;
      }>
    ) => {
      if (state.bookingDetails) {
        const passenger = state.bookingDetails.passengers.find(
          (p) => p.id === action.payload.passengerId
        );
        if (passenger) {
          (passenger as any)[action.payload.field] = action.payload.value;
        }
      }
    },
    initializeBooking: (
      state,
      action: PayloadAction<{
        flight: any;
        passengerCount: { adult: number; children: number; infant: number };
      }>
    ) => {
      const { flight, passengerCount } = action.payload;
      const passengers: PassengerInfo[] = [];

      // Create passenger objects
      for (let i = 0; i < passengerCount.adult; i++) {
        passengers.push({
          id: `adult_${i + 1}`,
          type: "adult",
          title: "",
          firstName: "",
          lastName: "",
          dateOfBirth: null,
          gender: "",
          passportNumber: "",
          nationality: "",
          email: "",
          phone: "",
        });
      }

      for (let i = 0; i < passengerCount.children; i++) {
        passengers.push({
          id: `child_${i + 1}`,
          type: "child",
          title: "",
          firstName: "",
          lastName: "",
          dateOfBirth: null,
          gender: "",
          nationality: "",
        });
      }

      for (let i = 0; i < passengerCount.infant; i++) {
        passengers.push({
          id: `infant_${i + 1}`,
          type: "infant",
          title: "",
          firstName: "",
          lastName: "",
          dateOfBirth: null,
          gender: "",
          nationality: "",
        });
      }

      state.selectedFlight = flight;
      state.bookingDetails = {
        flightId: flight.id,
        passengers,
        totalPrice:
          flight.price *
          (passengerCount.adult +
            passengerCount.children +
            passengerCount.infant * 0.1),
        status: "pending",
      };
    },
    clearBooking: (state) => {
      state.selectedFlight = null;
      state.bookingDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingDetails = action.payload;
        state.bookingHistory.push(action.payload);
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Booking failed";
      });
  },
});

export const {
  setSelectedFlight,
  updatePassengerInfo,
  initializeBooking,
  clearBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
